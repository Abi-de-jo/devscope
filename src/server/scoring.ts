import { prisma } from "@/lib/db";

/* ─── OpenRouter client with key rotation ────────────────────────────── */

const OPENROUTER_API = "https://openrouter.ai/api/v1/chat/completions";

const KEYS = [
  process.env.OPENROUTER_KEY_1,
  process.env.OPENROUTER_KEY_2,
  process.env.OPENROUTER_KEY_3,
  process.env.OPENROUTER_KEY_4,
].filter(Boolean);

let keyIndex = 0;

function getNextKey(): string {
  if (KEYS.length === 0) throw new Error("No OpenRouter API keys configured");
  const key = KEYS[keyIndex % KEYS.length]!;
  keyIndex++;
  return key;
}

/* ─── Types ──────────────────────────────────────────────────────────── */

export interface ScoreResult {
  overallScore: number;
  engineerLevel: string;
  confidenceScore: number;
  strengths: string[];
  gaps: string[];
  summary: string;
  scores: Array<{
    category: string;
    score: number;
    confidence: number;
    evidence: string[];
    suggestions: string[];
  }>;
}

/* ─── Build analysis prompt from repo data ───────────────────────────── */

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
    .slice(0, 30) // limit to top 30 repos
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
          .slice(0, 50)
          .join("\n  ");
        lines.push(`- File structure:\n  ${structure}`);
      }
      if (r.readme) {
        lines.push(`- README (first 500 chars):\n  ${r.readme.slice(0, 500)}`);
      }
      return lines.join("\n");
    })
    .join("\n\n");

  return `You are an expert engineering hiring manager and technical architect. Analyze this GitHub profile and produce a rigorous, evidence-based engineering assessment.

## Developer Profile
- Username: ${profile.login}
- Name: ${profile.displayName || "N/A"}
- Bio: ${profile.bio || "N/A"}
- Public Repos: ${profile.publicRepos}
- Followers: ${profile.followers}

## Repositories
${repoSummaries}

## Assessment Criteria (6 axes, each 0-100)

1. **Frontend** — UI frameworks, component quality, CSS/architecture, responsive design signals
2. **Backend** — API design, database usage, server patterns, authentication
3. **DevOps** — CI/CD configs, Docker, deployment files, infrastructure-as-code
4. **Testing** — Test files present, test frameworks, coverage signals
5. **Documentation** — README quality, inline docs, JSDoc/TSDoc, contributing guides
6. **Architecture** — Project structure, modularity, separation of concerns, scalability patterns

## Output Format (strict JSON)
{
  "overallScore": <0-100>,
  "engineerLevel": "<Beginner|Junior|Mid-Level|Senior|Lead|Principal>",
  "confidenceScore": <0.0-1.0>,
  "strengths": ["<specific strength citing a repo>", "...", "..."],
  "gaps": ["<specific gap citing evidence>", "...", "..."],
  "summary": "<2-3 sentence punchy summary of this developer's engineering profile>",
  "scores": [
    {
      "category": "Frontend",
      "score": <0-100>,
      "confidence": <0.0-1.0>,
      "evidence": ["<specific evidence>"],
      "suggestions": ["<actionable suggestion>"]
    },
    ... repeat for Backend, DevOps, Testing, Documentation, Architecture
  ]
}

## Rules
- Be honest. A low score with clear evidence is more valuable than a generous score with vague praise.
- Cite SPECIFIC repos/files for every finding. "Nice code" is useless. "src/components/Button.tsx shows clean prop typing" is useful.
- Confidence below 0.5 means you don't have enough data — say so.
- The overall score is NOT a simple average. Weight by signal strength.
- Engineer level mapping: 0-20 Beginner, 21-40 Junior, 41-60 Mid-Level, 61-80 Senior, 81-95 Lead, 96-100 Principal.
- Return ONLY valid JSON. No markdown, no explanation outside the JSON.`;
}

/* ─── Call OpenRouter ─────────────────────────────────────────────────── */

async function callOpenRouter(prompt: string): Promise<string> {
  const key = getNextKey();

  const res = await fetch(OPENROUTER_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
      "X-Title": "DevScope Engineering Score",
    },
    body: JSON.stringify({
      model: "anthropic/claude-sonnet-4-20250514",
      messages: [
        {
          role: "system",
          content:
            "You are DevScope's engineering analysis engine. Return only valid JSON. No markdown fences, no explanation.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 4000,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

/* ─── Main scoring function ──────────────────────────────────────────── */

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

  // Build repo data for prompt
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

  // Create analysis record
  const analysis = await prisma.analysis.create({
    data: {
      userId,
      status: "processing",
    },
  });

  try {
    // Build prompt and call AI
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

    const raw = await callOpenRouter(prompt);

    // Parse response — strip markdown fences if present
    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const result: ScoreResult = JSON.parse(cleaned);

    // Save scores to DB
    await prisma.analysis.update({
      where: { id: analysis.id },
      data: {
        status: "completed",
        overallScore: result.overallScore,
        engineerLevel: result.engineerLevel,
        confidenceScore: result.confidenceScore,
        strengths: result.strengths,
        gaps: result.gaps,
        summary: result.summary,
        costCents: 5, // rough estimate — track actual cost
        completedAt: new Date(),
      },
    });

    // Save category scores
    for (const score of result.scores) {
      await prisma.analysisScore.create({
        data: {
          analysisId: analysis.id,
          category: score.category,
          score: score.score,
          confidence: score.confidence,
          evidence: JSON.stringify(score.evidence),
          suggestions: JSON.stringify(score.suggestions),
        },
      });
    }

    // Link repos to analysis
    for (const repo of repos) {
      await prisma.analysis.update({
        where: { id: analysis.id },
        data: {
          repositories: { connect: { id: repo.id } },
        },
      });
    }

    return result;
  } catch (err) {
    await prisma.analysis.update({
      where: { id: analysis.id },
      data: { status: "failed" },
    });
    throw err;
  }
}
