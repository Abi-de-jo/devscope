// ─── Quick Compare / Battle Engine ─────────────────────────────────────
//
// No-AI metadata-proxy scoring.  Fetches whatever the GitHub REST API
// gives us per public profile, computes proxy signals from that metadata,
// and compares profiles side-by-side.
//
// Categories (6):
//   1. Code Activity        — commit/push frequency, repo recency
//   2. Repository Quality    — README, tests, docs presence
//   3. Technical Stack       — language diversity, frontend/backend breadth
//   4. Engineering Practices — CI/CD, Docker, test infrastructure
//   5. Collaboration         — followers, forks received, community signal
//   6. Project Maturity      — account age, repo count, star accumulation
//
// Each category: score 0–100, reason string, strengths[], weaknesses[].
// Final overall score = average of all 6. Star rating maps to that average.
//
// This is explicitly NOT a quality assessment — every UI element that
// displays these scores must carry the label "QUICK SCORE" with the
// footnote: "Based on file presence and public stats, not a review of
// your actual code."

import { cacheGet, cacheSet, TTL } from "./cache";
import { redis } from "./redis";

/* ─── Constants ─────────────────────────────────────────────────────── */

const GITHUB_API = "https://api.github.com";

/** Only inspect the top N repos (by stars / recency) to control API usage. */
const REPO_CHECK_LIMIT = 8;

/** Below this many public repos the result is flagged low-confidence. */
const MIN_REPOS_FOR_CONFIDENCE = 3;

/** README must be at least this many bytes to count as "has docs". */
const README_MIN_BYTES = 500;

/* ─── Language classification (proxy only — not a quality claim) ─────── */

const FRONTEND_LANGS = new Set([
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "SCSS",
  "Sass",
  "Less",
  "Vue",
  "Svelte",
  "JSX",
  "TSX",
  "CoffeeScript",
  "WebAssembly",
]);

const BACKEND_LANGS = new Set([
  "Python",
  "Go",
  "Rust",
  "Java",
  "Ruby",
  "PHP",
  "C",
  "C++",
  "C#",
  "Scala",
  "Kotlin",
  "Swift",
  "Elixir",
  "Haskell",
  "Lua",
  "Perl",
  "Shell",
  "Bash",
  "PowerShell",
  "Dart",
  "Julia",
  "R",
  "SQL",
  "Groovy",
  "Clojure",
  "OCaml",
  "F#",
  "Nim",
  "Zig",
  "Crystal",
  "Assembly",
  "Fortran",
  "COBOL",
  "V",
]);

/* ─── Public types ──────────────────────────────────────────────────── */

export interface CategoryScore {
  score: number; // 0–100
  reason: string;
  strengths: string[];
  weaknesses: string[];
}

export interface CompareResult {
  username: string;
  avatarUrl: string | null;
  displayName: string | null;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  accountAgeDays: number;
  fetchedRepos: number;
  totalPublicRepos: number;
  lowConfidence: boolean;
  categories: Record<string, CategoryScore>;
  overallScore: number; // average of all 6
  rating: string; // e.g. "Strong", "Elite"
  ratingStars: number; // 1–5
  error?: string;
}

export interface CompareResponse {
  success: boolean;
  profiles: CompareResult[];
  winners: Record<string, string | null>;
  overallWinner: string | null;
  error?: string;
}

/* ─── Rating system ─────────────────────────────────────────────────── */

function getRating(score: number): { rating: string; stars: number } {
  if (score >= 95) return { rating: "Elite", stars: 5 };
  if (score >= 85) return { rating: "Strong", stars: 4 };
  if (score >= 70) return { rating: "Capable", stars: 3 };
  if (score >= 50) return { rating: "Developing", stars: 2 };
  return { rating: "Needs Work", stars: 1 };
}

/* ─── Internal helpers ──────────────────────────────────────────────── */

const SERVER_TOKEN = process.env.GITHUB_TOKEN ?? undefined;

async function ghFetch<T>(url: string): Promise<T | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "GitRating-Compare/1.0",
    };
    if (SERVER_TOKEN) {
      headers["Authorization"] = `Bearer ${SERVER_TOKEN}`;
    }
    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Cached GitHub fetch for compare-engine.
 * Checks Redis before hitting the API. Same cache keys as github.ts
 * so both engines share cached data.
 */
async function cachedGhFetch<T>(
  cacheKey: string,
  url: string,
  ttlSec: number
): Promise<T | null> {
  const hit = await cacheGet<T>(cacheKey);
  if (hit !== undefined) return hit;

  const data = await ghFetch<T>(url);
  if (data !== null) {
    await cacheSet(cacheKey, data, ttlSec);
  }
  return data;
}

interface RootItem {
  name: string;
  type: string;
  size?: number;
}

interface RepoCheckResult {
  hasDockerfile: boolean;
  hasCI: boolean;
  hasTestDir: boolean;
  hasReadme: boolean;
  readmeSize: number;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string | null;
  pushedDaysAgo: number | null;
}

/**
 * Fetch the root directory listing for a repo and check for proxy signals
 * (Dockerfile, CI configs, test dirs, README).  One API call per repo.
 */
async function checkRepoRoot(
  owner: string,
  repo: string,
  pushedAt: string | null
): Promise<RepoCheckResult> {
  const pushedDaysAgo =
    pushedAt !== null
      ? Math.floor(
          (Date.now() - new Date(pushedAt).getTime()) / 86_400_000
        )
      : null;

  try {
    const items = await cachedGhFetch<RootItem[]>(
      `gh:contents:${owner}:${repo}`,
      `${GITHUB_API}/repos/${owner}/${repo}/contents`,
      TTL.GH_CONTENTS
    );
    if (!items) {
      return {
        hasDockerfile: false,
        hasCI: false,
        hasTestDir: false,
        hasReadme: false,
        readmeSize: 0,
        language: null,
        stars: 0,
        forks: 0,
        pushedAt,
        pushedDaysAgo,
      };
    }

    const names = new Set(items.map((i) => i.name));
    const readme = items.find(
      (i) => i.name === "README.md" && i.type === "file"
    );

    return {
      hasDockerfile: names.has("Dockerfile"),
      hasCI:
        names.has(".github") ||
        names.has(".gitlab-ci.yml") ||
        names.has("Jenkinsfile") ||
        names.has("docker-compose.yml"),
      hasTestDir: [
        "test",
        "tests",
        "__tests__",
        "__test__",
        "spec",
        "specs",
      ].some((d) => names.has(d)),
      hasReadme: !!readme && (readme.size ?? 0) > README_MIN_BYTES,
      readmeSize: readme?.size ?? 0,
      language: null,
      stars: 0,
      forks: 0,
      pushedAt,
      pushedDaysAgo,
    };
  } catch {
    return {
      hasDockerfile: false,
      hasCI: false,
      hasTestDir: false,
      hasReadme: false,
      readmeSize: 0,
      language: null,
      stars: 0,
      forks: 0,
      pushedAt,
      pushedDaysAgo,
    };
  }
}

/* ─── Category scoring ──────────────────────────────────────────────── */

function scoreCodeActivity(
  checks: RepoCheckResult[],
  n: number
): CategoryScore {
  if (n === 0) {
    return {
      score: 0,
      reason: "No repositories found to evaluate.",
      strengths: [],
      weaknesses: ["No public repositories detected."],
    };
  }

  const activeRepos = checks.filter(
    (c) => c.pushedDaysAgo !== null && c.pushedDaysAgo < 90
  );
  const veryRecent = checks.filter(
    (c) => c.pushedDaysAgo !== null && c.pushedDaysAgo < 14
  );
  const staleRepos = checks.filter(
    (c) => c.pushedDaysAgo !== null && c.pushedDaysAgo > 365
  );

  const recentPct = activeRepos.length / n;
  const veryRecentPct = veryRecent.length / n;
  const stalePct = staleRepos.length / n;

  // Score: 60% recency, 20% very-recent bonus, -20% stale penalty
  let score = Math.round(
    recentPct * 60 + veryRecentPct * 20 + (1 - stalePct) * 20
  );
  score = Math.max(0, Math.min(100, score));

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (veryRecentPct > 0.5)
    strengths.push(
      `${veryRecent.length}/${n} repos pushed in the last 2 weeks`
    );
  else if (recentPct > 0.5)
    strengths.push(`${activeRepos.length}/${n} repos active in the last 90 days`);

  if (staleRepos.length > 0)
    weaknesses.push(
      `${staleRepos.length} repo(s) untouched for over a year`
    );
  if (activeRepos.length === 0)
    weaknesses.push("No repos pushed in the last 90 days");

  const avgDays =
    checks
      .filter((c) => c.pushedDaysAgo !== null)
      .reduce((s, c) => s + (c.pushedDaysAgo ?? 0), 0) /
    (checks.filter((c) => c.pushedDaysAgo !== null).length || 1);

  const reason =
    recentPct >= 0.7
      ? `Active contributor — ${Math.round(recentPct * 100)}% of repos updated recently.`
      : recentPct >= 0.3
        ? `Moderate activity — ${Math.round(recentPct * 100)}% of repos updated in the last 90 days.`
        : `Low activity — most repos haven't been updated recently.`;

  return { score, reason, strengths, weaknesses };
}

function scoreRepositoryQuality(
  checks: RepoCheckResult[],
  n: number
): CategoryScore {
  if (n === 0) {
    return {
      score: 0,
      reason: "No repositories found.",
      strengths: [],
      weaknesses: ["No public repositories detected."],
    };
  }

  const hasReadmeCount = checks.filter((c) => c.hasReadme).length;
  const hasTestCount = checks.filter((c) => c.hasTestDir).length;

  const readmePct = hasReadmeCount / n;
  const testPct = hasTestCount / n;

  // Score: 50% README, 50% tests
  const score = Math.round(readmePct * 50 + testPct * 50);

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (readmePct >= 0.7)
    strengths.push(`${hasReadmeCount}/${n} repos have substantial READMEs`);
  if (testPct >= 0.5)
    strengths.push(`${hasTestCount}/${n} repos contain test directories`);

  if (readmePct < 0.3 && n > 1)
    weaknesses.push(`Only ${hasReadmeCount}/${n} repos have a README`);
  if (testPct < 0.3 && n > 1)
    weaknesses.push(`Only ${hasTestCount}/${n} repos have test directories`);
  if (readmePct === 0)
    weaknesses.push("No repos have a substantial README");
  if (testPct === 0)
    weaknesses.push("No repos contain test directories");

  const reason =
    score >= 70
      ? "Good documentation and testing hygiene across repos."
      : score >= 40
        ? "Some repos have READMEs and tests, but coverage is uneven."
        : "Most repos lack documentation or test infrastructure.";

  return { score, reason, strengths, weaknesses };
}

function scoreTechnicalStack(
  checks: RepoCheckResult[],
  n: number
): CategoryScore {
  if (n === 0) {
    return {
      score: 0,
      reason: "No repositories found.",
      strengths: [],
      weaknesses: ["No public repositories detected."],
    };
  }

  const languages = new Set(
    checks.map((c) => c.language).filter(Boolean) as string[]
  );

  const frontendCount = checks.filter(
    (c) => c.language !== null && FRONTEND_LANGS.has(c.language)
  ).length;
  const backendCount = checks.filter(
    (c) => c.language !== null && BACKEND_LANGS.has(c.language)
  ).length;

  const hasBoth = frontendCount > 0 && backendCount > 0;
  const langDiversity = languages.size;

  // Score: 40% language diversity (log scaled), 30% full-stack signal, 30% breadth
  const diversityScore = Math.min(40, Math.round(12 * Math.log2(1 + langDiversity)));
  const fullstackScore = hasBoth ? 30 : backendCount > 0 ? 20 : frontendCount > 0 ? 15 : 0;
  const breadthScore = Math.min(30, Math.round(langDiversity * 5));

  const score = Math.min(100, diversityScore + fullstackScore + breadthScore);

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (hasBoth)
    strengths.push("Full-stack signal — both frontend and backend languages");
  if (langDiversity >= 4)
    strengths.push(`${langDiversity} different languages across repos`);
  if (langDiversity === 1)
    weaknesses.push("Single language across all repos — limited breadth");
  if (!hasBoth && frontendCount === 0 && backendCount === 0)
    weaknesses.push("No recognized programming languages detected");

  const primaryLang = [...languages][0] ?? "unknown";

  const reason =
    hasBoth
      ? `Full-stack developer working with ${langDiverseString(languages)}.`
      : langDiversity >= 3
        ? `Diverse stack with ${langDiverseString(languages)}.`
        : `Primarily ${primaryLang} with ${langDiverseString(languages)}.`;

  return { score, reason, strengths, weaknesses };
}

function langDiverseString(langs: Set<string>): string {
  const arr = [...langs];
  if (arr.length <= 3) return arr.join(", ");
  return `${arr.slice(0, 3).join(", ")} +${arr.length - 3} more`;
}

function scoreEngineeringPractices(
  checks: RepoCheckResult[],
  n: number
): CategoryScore {
  if (n === 0) {
    return {
      score: 0,
      reason: "No repositories found.",
      strengths: [],
      weaknesses: ["No public repositories detected."],
    };
  }

  const hasCIDevopsCount = checks.filter(
    (c) => c.hasCI || c.hasDockerfile
  ).length;
  const hasTestCount = checks.filter((c) => c.hasTestDir).length;
  const hasDockerCount = checks.filter((c) => c.hasDockerfile).length;

  const ciPct = hasCIDevopsCount / n;
  const testPct = hasTestCount / n;
  const dockerPct = hasDockerCount / n;

  // Score: 35% CI, 35% tests, 30% Docker
  const score = Math.round(ciPct * 35 + testPct * 35 + dockerPct * 30);

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (ciPct >= 0.5)
    strengths.push(`${hasCIDevopsCount}/${n} repos have CI/CD or Docker configs`);
  if (testPct >= 0.5)
    strengths.push(`${hasTestCount}/${n} repos have test directories`);
  if (dockerPct > 0)
    strengths.push(`${hasDockerCount}/${n} repos have Dockerfiles`);

  if (ciPct < 0.2)
    weaknesses.push("Little or no CI/CD configuration detected");
  if (testPct < 0.2)
    weaknesses.push("Minimal test infrastructure");
  if (dockerPct === 0)
    weaknesses.push("No Dockerfiles detected");

  const reason =
    score >= 60
      ? "Strong engineering practices — CI, tests, and containers."
      : score >= 30
        ? "Some engineering infrastructure present, but inconsistent."
        : "Limited CI/CD, testing, or containerization signals.";

  return { score, reason, strengths, weaknesses };
}

function scoreCollaboration(
  checks: RepoCheckResult[],
  n: number,
  followers: number,
  following: number,
  totalForks: number
): CategoryScore {
  const totalStars = checks.reduce((s, c) => s + c.stars, 0);

  // Score: 40% stars (log), 30% followers (log), 30% forks (log)
  const starScore = Math.min(40, Math.round(10 * Math.log2(1 + totalStars)));
  const followerScore = Math.min(30, Math.round(10 * Math.log2(1 + followers)));
  const forkScore = Math.min(30, Math.round(10 * Math.log2(1 + totalForks)));

  const score = Math.min(100, starScore + followerScore + forkScore);

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (totalStars >= 10) strengths.push(`${totalStars} total stars across repos`);
  if (followers >= 10) strengths.push(`${followers} followers on GitHub`);
  if (totalForks >= 5) strengths.push(`${totalForks} forks received`);
  if (following > 0 && followers > 0) {
    const ratio = followers / following;
    if (ratio > 2) strengths.push("High follower-to-following ratio");
  }

  if (totalStars < 3) weaknesses.push("Very few stars received");
  if (followers < 3) weaknesses.push("Minimal follower base");
  if (totalForks < 1) weaknesses.push("No forks received from other developers");

  const reason =
    score >= 60
      ? `Active community presence — ${totalStars} stars, ${followers} followers.`
      : score >= 30
        ? `Some community signal with ${totalStars} stars and ${followers} followers.`
        : "Limited community engagement detected.";

  return { score, reason, strengths, weaknesses };
}

function scoreProjectMaturity(
  checks: RepoCheckResult[],
  n: number,
  accountAgeDays: number,
  publicRepos: number
): CategoryScore {
  const totalStars = checks.reduce((s, c) => s + c.stars, 0);
  const totalForks = checks.reduce((s, c) => s + c.forks, 0);

  // Score: 35% account age, 35% repo count, 30% star accumulation
  const ageYears = accountAgeDays / 365;
  const ageScore = Math.min(35, Math.round(ageYears * 5)); // ~7 years = max
  const repoScore = Math.min(35, Math.round(4 * Math.log2(1 + publicRepos)));
  const starScore = Math.min(
    30,
    Math.round(8 * Math.log2(1 + totalStars + totalForks))
  );

  const score = Math.min(100, ageScore + repoScore + starScore);

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (ageYears >= 3) strengths.push(`${Math.round(ageYears)}-year GitHub account`);
  if (publicRepos >= 20) strengths.push(`${publicRepos} public repositories`);
  if (totalStars >= 5) strengths.push(`${totalStars} stars across repos`);

  if (ageYears < 1) weaknesses.push("Account less than 1 year old");
  if (publicRepos < 5) weaknesses.push(`Only ${publicRepos} public repos`);
  if (totalStars < 2) weaknesses.push("Minimal star accumulation");

  const reason =
    score >= 60
      ? `Established developer — ${Math.round(ageYears)} years on GitHub with ${publicRepos} repos.`
      : score >= 30
        ? `Growing presence — ${Math.round(ageYears)} years, ${publicRepos} repos.`
        : "Relatively new or low-activity GitHub presence.";

  return { score, reason, strengths, weaknesses };
}

/* ─── Error/empty helpers ───────────────────────────────────────────── */

function errResult(username: string, msg: string): CompareResult {
  return {
    username,
    avatarUrl: null,
    displayName: null,
    bio: null,
    followers: 0,
    following: 0,
    publicRepos: 0,
    accountAgeDays: 0,
    fetchedRepos: 0,
    totalPublicRepos: 0,
    lowConfidence: false,
    categories: {},
    overallScore: 0,
    rating: "N/A",
    ratingStars: 0,
    error: msg,
  };
}

function emptyCategories(): Record<string, CategoryScore> {
  return {};
}

/* ─── Per-user fetch + scoring ──────────────────────────────────────── */

export async function fetchAndScore(username: string): Promise<CompareResult> {
  // 1. Check cache
  const cached = await cacheGet<CompareResult>(`compare:${username}`);
  if (cached) return cached;

  // 2. Fetch user profile (cached)
  const user = await cachedGhFetch<{
    login: string;
    avatar_url: string | null;
    name: string | null;
    bio: string | null;
    followers: number;
    following: number;
    public_repos: number;
    created_at: string;
  }>(
    `gh:user:${username}`,
    `${GITHUB_API}/users/${username}`,
    TTL.GH_USER
  );

  if (!user) return errResult(username, `User "${username}" not found`);

  // 3. Fetch repos (cached)
  const repos = await cachedGhFetch<
    Array<{
      full_name: string;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      pushed_at: string | null;
      private: boolean;
    }>
  >(
    `gh:repos:${username}`,
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`,
    TTL.GH_REPOS
  );

  const publicRepos = (repos ?? []).filter((r) => !r.private);

  // Sort by stars desc, then recency desc
  const sorted = publicRepos.sort(
    (a, b) =>
      b.stargazers_count - a.stargazers_count ||
      new Date(b.pushed_at ?? 0).getTime() -
        new Date(a.pushed_at ?? 0).getTime()
  );

  const topRepos = sorted.slice(0, REPO_CHECK_LIMIT);
  const lowConfidence = publicRepos.length < MIN_REPOS_FOR_CONFIDENCE;

  // 4. Parallel per-repo root content checks
  const checks = await Promise.all(
    topRepos.map(async (repo) => {
      const [owner, name] = repo.full_name.split("/");
      const root = await checkRepoRoot(owner, name, repo.pushed_at);
      return {
        ...root,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      };
    })
  );

  const n = checks.length;

  if (n === 0) {
    const { rating, stars } = getRating(0);
    const result: CompareResult = {
      username: user.login,
      avatarUrl: user.avatar_url,
      displayName: user.name,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      accountAgeDays: Math.floor(
        (Date.now() - new Date(user.created_at).getTime()) / 86_400_000
      ),
      fetchedRepos: 0,
      totalPublicRepos: publicRepos.length,
      lowConfidence,
      categories: emptyCategories(),
      overallScore: 0,
      rating,
      ratingStars: stars,
    };
    await cacheSet(`compare:${user.login}`, result, TTL.QUICK_SCORE);
    return result;
  }

  // 5. Compute aggregate data
  const totalForks = checks.reduce((s, c) => s + c.forks, 0);

  // 6. Score all 6 categories
  const categories: Record<string, CategoryScore> = {
    "code-activity": scoreCodeActivity(checks, n),
    "repository-quality": scoreRepositoryQuality(checks, n),
    "technical-stack": scoreTechnicalStack(checks, n),
    "engineering-practices": scoreEngineeringPractices(checks, n),
    "collaboration": scoreCollaboration(
      checks,
      n,
      user.followers,
      user.following,
      totalForks
    ),
    "project-maturity": scoreProjectMaturity(
      checks,
      n,
      Math.floor(
        (Date.now() - new Date(user.created_at).getTime()) / 86_400_000
      ),
      user.public_repos
    ),
  };

  // 7. Overall = average of all 6
  const scores = Object.values(categories).map((c) => c.score);
  const overallScore = Math.round(
    scores.reduce((a, b) => a + b, 0) / scores.length
  );
  const { rating, stars } = getRating(overallScore);

  const result: CompareResult = {
    username: user.login,
    avatarUrl: user.avatar_url,
    displayName: user.name,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    accountAgeDays: Math.floor(
      (Date.now() - new Date(user.created_at).getTime()) / 86_400_000
    ),
    fetchedRepos: n,
    totalPublicRepos: publicRepos.length,
    lowConfidence,
    categories,
    overallScore,
    rating,
    ratingStars: stars,
  };

  await cacheSet(`compare:${user.login}`, result, TTL.QUICK_SCORE);
  return result;
}

/* ─── Main entry point ──────────────────────────────────────────────── */

const CATEGORY_KEYS = [
  "code-activity",
  "repository-quality",
  "technical-stack",
  "engineering-practices",
  "collaboration",
  "project-maturity",
] as const;

export async function compareProfiles(
  usernames: string[]
): Promise<CompareResponse> {
  if (usernames.length < 2) {
    return {
      success: false,
      profiles: [],
      winners: {},
      overallWinner: null,
      error: "At least 2 usernames required",
    };
  }
  if (usernames.length > 4) {
    return {
      success: false,
      profiles: [],
      winners: {},
      overallWinner: null,
      error: "Maximum 4 usernames per comparison",
    };
  }

  // Fetch all profiles in parallel
  const profiles = await Promise.all(usernames.map(fetchAndScore));

  // Per-category winner (exclude profiles with errors)
  const winners: Record<string, string | null> = {};

  for (const key of CATEGORY_KEYS) {
    let best = -1;
    let winner: string | null = null;
    let anyData = false;

    for (const p of profiles) {
      if (p.error) continue;
      const cat = p.categories[key];
      if (!cat) continue;
      anyData = true;
      if (cat.score > best) {
        best = cat.score;
        winner = p.username;
      }
    }

    winners[key] = anyData ? winner : null;
  }

  // Overall winner
  let overallBest = -1;
  let overallWinner: string | null = null;
  for (const p of profiles) {
    if (p.error) continue;
    if (p.overallScore > overallBest) {
      overallBest = p.overallScore;
      overallWinner = p.username;
    }
  }

  return { success: true, profiles, winners, overallWinner };
}
