import { prisma } from "@/lib/db";
import type { Prisma } from "../generated/client";

/* ─── LLM client (NVIDIA NIM, OpenAI-compatible) ──────────────────── */

const LLM_BASE = process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1";
const LLM_KEY = process.env.NVIDIA_API_KEY || "";
const LLM_MODEL = process.env.NVIDIA_MODEL || "z-ai/glm-5.2";

// NVIDIA NIM is free — costCents is always 0.
function estimateCostCents(): number {
  return 0;
}

// Extract the first balanced JSON object from a model response. Handles
// markdown fences, surrounding prose, and reasoning models that emit the
// JSON inside a `reasoning` field rather than `content`.
function extractJson(text: string): unknown {
  const cleaned = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .replace(/```/g, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) {
    throw new Error("No JSON object found in model response");
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

/* ─── Types ────────────────────────────────────────────────────────── */

export interface RepoRecommendation {
  title: string;
  impact: string; // e.g. "+7"
  reason: string; // must reference actual repo evidence
}

export interface AxisScore {
  category: string;
  score: number; // 0-100
  confidence: number; // 0-100
  evidence: string[];
  missing: string[]; // signals NOT detected
  recommendations: RepoRecommendation[];
}

export interface RepoScore {
  name: string; // full_name, e.g. "owner/repo"
  overall: number;
  architecture: number;
  documentation: number;
  testing: number;
  deployment: number;
  security: number;
  complexity: number;
  maintainability: number;
  confidence: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: RepoRecommendation[];
}

export interface ScoreResult {
  overallScore: number;
  confidence: number; // 0-100
  engineerLevel: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: RepoRecommendation[];
  scores: AxisScore[];
  repositories: RepoScore[];
}

// Developer-level axes (Feature 2 requires Security as a first-class metric).
// The first 7 are the original axes; Code Quality, Maintainability, and
// Complexity & Judgment were added to cover signals an AI can detect from
// repos that the original set missed.
export const DEVELOPER_AXES = [
  "Architecture",
  "Backend",
  "Frontend",
  "Code Quality",
  "Testing",
  "Security",
  "DevOps",
  "Documentation",
  "Maintainability",
  "Complexity & Judgment",
];

/* ─── Build analysis prompt from repo data ─────────────────────────── */

interface RepoData {
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  topics: string[];
  license: string | null;
  hasReadme: boolean;
  hasIssues: boolean;
  hasWiki: boolean;
  hasPages: boolean;
  tree?: Array<{ path: string; type: string }>;
  readme?: string | null;
}

function buildAnalysisPrompt(
  profile: {
    login: string;
    displayName: string | null;
    bio: string | null;
    publicRepos: number;
    followers: number;
  },
  repos: RepoData[]
): string {
  const repoSummaries = repos
    .map((r) => {
      const lines = [
        `### ${r.fullName}`,
        `- Language: ${r.language || "N/A"}`,
        `- Stars: ${r.stargazersCount} | Forks: ${r.forksCount} | Issues: ${r.openIssuesCount}`,
        `- Topics: ${r.topics.join(", ") || "none"}`,
        `- License: ${r.license || "none"}`,
        `- Has README: ${r.hasReadme ? "yes" : "NO"}`,
        `- Has Issues: ${r.hasIssues ? "yes" : "no"}`,
      ];
      if (r.description) lines.push(`- Description: ${r.description}`);
      if (r.tree && r.tree.length > 0) {
        const structure = r.tree
          .map((t) => t.path)
          .slice(0, 40)
          .join("\n  ");
        lines.push(`- File structure:\n  ${structure}`);
      }
      if (r.readme) {
        lines.push(`- README (first 400 chars):\n  ${r.readme.slice(0, 400)}`);
      }
      return lines.join("\n");
    })
    .join("\n\n");

  return `You are GitRating's engineering analysis engine. You produce rigorous, evidence-based, explainable engineering assessments. Every number must be defensible; every recommendation must cite specific repositories.

## Developer Profile
- Username: ${profile.login}
- Name: ${profile.displayName || "N/A"}
- Bio: ${profile.bio || "N/A"}
- Public Repos: ${profile.publicRepos}
- Followers: ${profile.followers}

## Repositories (scored individually below)
${repoSummaries}

## Developer-level Assessment (10 axes, each 0-100)
1. **Architecture** (Architecture & System Design) — separation of concerns, dependency direction (abstractions vs spaghetti imports), scalability signals (caching/queueing/pagination/rate-limiting), config/secrets handling, consistent patterns across the codebase.
2. **Backend** — API design, database usage, server patterns, authentication.
3. **Frontend** — UI frameworks, component quality, CSS architecture, responsive design.
4. **Code Quality** — naming (descriptive vs x2/temp), function/file size (no 500-line god-functions), DRY (reused utilities vs copy-pasted logic), real error handling with meaningful recovery (not swallowed), real type safety (no 'any' everywhere defeating the purpose).
5. **Testing** — presence of tests at all (a strong filter), edge-case coverage (not just happy-path), unit/integration/e2e mix, and CI actually RUNNING the tests (not just a test script nobody calls).
6. **Security** — auth quality (proper hashing/sessions, no homegrown JWT mistakes), input validation/sanitization, dependency hygiene (outdated packages with known CVEs), and NO committed secrets (checkable, a strong negative signal when violated).
7. **DevOps** (DevOps / Deployment Readiness) — CI/CD pipeline presence and health, Dockerfile/IaC quality if present, environment separation (dev/staging/prod discipline), monitoring/logging hooks (not console.log debugging left in).
8. **Documentation** — README quality (setup that actually works, not a placeholder), inline comments explaining WHY (not restating what), API docs / type exports for consumable code, changelog / versioning discipline.
9. **Maintainability** (Tech Debt) — commit message quality (meaningful vs "fix"/"wip wip wip"), PR discipline (small reviewable PRs vs giant unreviewable dumps), refactoring evidence over time (revisiting and improving, not just adding), and no dead/commented-out code left lying around.
10. **Complexity & Judgment** — right-sized solutions (no Kubernetes for a todo app, no hand-rolled auth when a battle-tested library exists), tradeoff awareness (comments/docs explaining WHY this approach), and original problem-solving vs tutorial-following. THIS AXIS IS THE HARDEST TO DETECT RELIABLY — score it conservatively and state its confidence honestly; do not overclaim.

## Per-Repository Assessment
For EACH repository listed above, score these 0-100: overall, architecture, documentation, testing, deployment, security, complexity, maintainability. Also list strengths, weaknesses, and recommendations (each recommendation MUST name the specific repo and cite missing evidence, e.g. "Docker not detected in inventory-api").

## Output Format (strict JSON, no markdown, no explanation outside JSON)
{
  "overallScore": <0-100>,
  "confidence": <0-100>,
  "engineerLevel": "<Beginner|Junior|Mid-Level|Senior|Lead|Principal>",
  "summary": "<2-3 sentence punchy, honest summary>",
  "strengths": ["<specific strength citing a repo>", "..."],
  "weaknesses": ["<specific weakness citing evidence>", "..."],
  "recommendations": [
    { "title": "<actionable improvement>", "impact": "<+N estimated score increase>", "reason": "<why, citing specific repos>" }
  ],
  "scores": [
    {
      "category": "Frontend",
      "score": <0-100>,
      "confidence": <0-100>,
      "evidence": ["<specific evidence with repo/file>", "..."],
      "missing": ["<signal NOT detected, e.g. 'Dependency injection'>", "..."],
      "recommendations": [ { "title": "...", "impact": "+N", "reason": "..." } ]
    }
      // repeat for Backend, Frontend, Code Quality, Testing, Security, DevOps, Documentation, Maintainability, Complexity & Judgment
   ],
  "repositories": [
    {
      "name": "<full_name e.g. owner/repo>",
      "overall": <0-100>,
      "architecture": <0-100>,
      "documentation": <0-100>,
      "testing": <0-100>,
      "deployment": <0-100>,
      "security": <0-100>,
      "complexity": <0-100>,
      "maintainability": <0-100>,
      "confidence": <0-100>,
      "strengths": ["<specific>", "..."],
      "weaknesses": ["<specific>", "..."],
      "recommendations": [ { "title": "...", "impact": "+N", "reason": "..." } ]
    }
    // repeat for every repository provided
  ]
}

## Rules
- Be honest. A lower score with clear evidence beats a generous score with vague praise.
- Cite SPECIFIC repos/files for every finding. "Nice code" is useless; "src/components/Button.tsx shows clean prop typing" is useful.
- Confidence below 50 means insufficient data — say so explicitly in the reason.
- The overall score is NOT a simple average; weight by signal strength and confidence.
- Engineer level mapping: 0-20 Beginner, 21-40 Junior, 41-60 Mid-Level, 61-80 Senior, 81-95 Lead, 96-100 Principal.
- Recommendations' "impact" must be a realistic estimated delta like "+2" or "+7".
- Complexity & Judgment is the LEAST reliable signal to detect from repos. If you cannot find clear evidence, score it conservatively and set its confidence low. Never invent evidence for this axis — overclaiming here is the worst failure mode.
- Return ONLY valid JSON. No markdown fences, no explanation outside the JSON.`;
}

/* ─── Call NVIDIA NIM with 429 retry ──────────────────────────────── */

interface LLMResult {
  content: string;
  usage: { prompt_tokens?: number; completion_tokens?: number };
}

async function callLLM(prompt: string, attempt = 0): Promise<LLMResult> {
  if (!LLM_KEY) throw new Error("NVIDIA_API_KEY is not configured");

  const res = await fetch(`${LLM_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LLM_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are GitRating's engineering analysis engine. Return only valid JSON. No markdown fences, no explanation.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 16384,
      seed: 42,
    }),
  });

  // Rate limited — retry with backoff.
  if (res.status === 429 && attempt < 3) {
    await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    return callLLM(prompt, attempt + 1);
  }

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`NVIDIA NIM API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  const msg = data.choices?.[0]?.message ?? {};
  // Some reasoning models may emit the JSON in `reasoning`.
  const combined = `${msg.content ?? ""}\n${msg.reasoning ?? ""}`.trim();
  return {
    content: combined,
    usage: data.usage ?? {},
  };
}

/* ─── Main scoring function ────────────────────────────────────────── */

export async function scoreDeveloper(
  userId: string,
  profileId: string
): Promise<ScoreResult> {
  const profile = await prisma.githubProfile.findUnique({
    where: { id: profileId },
  });
  if (!profile) throw new Error("Profile not found");

  const repos = await prisma.repository.findMany({
    where: { profileId },
    orderBy: { stargazersCount: "desc" },
    take: 30,
  });

  // Build repo data for prompt (bound token cost: top 20 get per-repo scoring)
  const repoData: RepoData[] = repos.map((r) => ({
    name: r.name,
    fullName: r.fullName,
    description: r.description,
    language: r.language,
    stargazersCount: r.stargazersCount,
    forksCount: r.forksCount,
    openIssuesCount: r.openIssuesCount,
    topics: r.topics,
    license: r.license,
    hasReadme: r.hasReadme,
    hasIssues: r.hasIssues,
    hasWiki: r.hasWiki,
    hasPages: r.hasPages,
  }));

  // Clean up any orphaned non-completed analyses from failed runs.
  await prisma.analysis.updateMany({
    where: { userId, status: { in: ["pending", "processing"] } },
    data: { status: "failed" },
  });

  const analysis = await prisma.analysis.create({
    data: { userId, status: "processing" },
  });

  try {
    // Early check: NVIDIA API key must be configured
    if (!LLM_KEY) {
      throw new Error(
        "No AI provider configured. Set NVIDIA_API_KEY in your environment."
      );
    }

    const prompt = buildAnalysisPrompt(
      {
        login: profile.login,
        displayName: profile.displayName,
        bio: profile.bio,
        publicRepos: profile.publicRepos,
        followers: profile.followers,
      },
      repoData
    );

    // Call NVIDIA NIM and parse the JSON response
    let result: ScoreResult | null = null;
    let usage: { prompt_tokens?: number; completion_tokens?: number } = {};
    let lastErr: unknown;

    try {
      const r = await callLLM(prompt);
      result = extractJson(r.content) as ScoreResult;
      usage = r.usage;
    } catch (e) {
      lastErr = e;
    }

    if (!result) {
      throw lastErr ?? new Error("NVIDIA NIM failed to return valid JSON");
    }

    // NVIDIA NIM is free — costCents is always 0
    const costCents = 0;

    // Persist Analysis (transparency fields)
    await prisma.analysis.update({
      where: { id: analysis.id },
      data: {
        status: "completed",
        overallScore: result.overallScore,
        engineerLevel: result.engineerLevel,
        confidenceScore: (result.confidence ?? 0) / 100,
        confidence: result.confidence ?? null,
        strengths: result.strengths ?? [],
        gaps: result.weaknesses ?? [],
        weaknesses: (result.weaknesses ?? []) as unknown as Prisma.InputJsonValue,
        recommendations: (result.recommendations ??
          []) as unknown as Prisma.InputJsonValue,
        summary: result.summary,
        costCents,
        completedAt: new Date(),
      },
    });

    // Persist per-axis scores (evidence / missing / recommendations)
    for (const score of result.scores) {
      await prisma.analysisScore.create({
        data: {
          analysisId: analysis.id,
          category: score.category,
          score: score.score,
          confidence: (score.confidence ?? 0) / 100,
          evidence: (score.evidence ?? []) as unknown as Prisma.InputJsonValue,
          missing: (score.missing ?? []) as unknown as Prisma.InputJsonValue,
          suggestions: (score.recommendations ??
            []) as unknown as Prisma.InputJsonValue,
        },
      });
    }

    // Persist per-repository scores (Repository Intelligence)
    const repoByFullName = new Map(repos.map((r) => [r.fullName, r]));
    for (const repo of result.repositories ?? []) {
      const matched = repoByFullName.get(repo.name);
      if (!matched) continue;
      await prisma.repositoryScore.create({
        data: {
          repositoryId: matched.id,
          analysisId: analysis.id,
          overall: repo.overall,
          architecture: repo.architecture,
          documentation: repo.documentation,
          testing: repo.testing,
          deployment: repo.deployment,
          security: repo.security,
          complexity: repo.complexity,
          maintainability: repo.maintainability,
          confidence: repo.confidence,
          strengths: (repo.strengths ?? []) as unknown as Prisma.InputJsonValue,
          weaknesses: (repo.weaknesses ?? []) as unknown as Prisma.InputJsonValue,
          recommendations: (repo.recommendations ??
            []) as unknown as Prisma.InputJsonValue,
        },
      });
    }

    // Link repos to analysis
    await prisma.analysis.update({
      where: { id: analysis.id },
      data: {
        repositories: { connect: repos.map((r) => ({ id: r.id })) },
      },
    });

    return result;
  } catch (err) {
    await prisma.analysis.update({
      where: { id: analysis.id },
      data: { status: "failed" },
    });
    // Preserve the original error message for debugging
    const msg = err instanceof Error ? err.message : "Scoring failed";
    throw new Error(`Scoring failed: ${msg}`);
  }
}
