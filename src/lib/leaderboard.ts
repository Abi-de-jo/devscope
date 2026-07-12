// ─── Leaderboard Engine ───────────────────────────────────────────────
//
// Fetches GitHub users by location, checks for existing AI Analysis scores,
// computes composite ranking scores, and caches the result.
// Filters out opted-out users. Paginated results derived from cached set.

import { prisma } from "./db";
import { cacheGet, cacheSet } from "./cache";
import {
  getCityVariants,
  getStateCities,
  getCountryVariants,
} from "./location-data";

/* ─── Constants ─────────────────────────────────────────────────────── */

const GITHUB_API = "https://api.github.com";
const SERVER_TOKEN = process.env.GITHUB_TOKEN ?? undefined;

/** Max users to keep after ranking. */
const RANKED_KEEP = 100;

/** Leaderboard cache TTL — 36 hours. */
const CACHE_TTL_MS = 36 * 60 * 60 * 1000;

/* ─── Types ─────────────────────────────────────────────────────────── */

export type LeaderboardScope = "city" | "state" | "country";

export interface LeaderboardEntry {
  rank: number;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  htmlUrl: string;
  /** AI score if available, else quick-score (0-100). */
  score: number;
  /** Whether the score came from a real AI Analysis or the metadata proxy. */
  scoreType: "ai" | "quick";
  topSkill: string;
  topScore: number;
  location: string | null;
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
}

export interface LeaderboardResult {
  location: string;
  scope: LeaderboardScope;
  entries: LeaderboardEntry[];
  totalEntries: number;
  totalCandidates: number;
  page: number;
  limit: number;
  cached: boolean;
}

/** Internal format stored in cache — all ranked entries, no pagination. */
interface CachedLeaderboard {
  entries: LeaderboardEntry[];
  totalCandidates: number;
}

/* ─── GitHub API helpers ────────────────────────────────────────────── */

interface GhSearchUser {
  login: string;
  avatar_url: string | null;
  html_url: string;
}

interface GhUser {
  login: string;
  name: string | null;
  avatar_url: string | null;
  html_url: string;
  location: string | null;
  public_repos: number;
  followers: number;
  created_at: string;
}

interface RepoInfo {
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string | null;
}

/**
 * Log auth diagnostics before every GitHub API call.
 * Token value is redacted — only presence + first/last 4 chars shown.
 */
function logAuth(url: string) {
  const present = !!SERVER_TOKEN;
  const preview = SERVER_TOKEN
    ? `${SERVER_TOKEN.slice(0, 4)}…${SERVER_TOKEN.slice(-4)}`
    : "NONE";
  console.log(`[LB] GET ${url}`);
  console.log(`[LB] GITHUB_TOKEN: ${present ? `present (${preview})` : "MISSING"}`);
}

/**
 * Fetch from GitHub API with full diagnostic logging.
 * Returns null on any non-200 or network error — never caches bad responses.
 */
async function ghFetch<T>(url: string): Promise<T | null> {
  try {
    logAuth(url);
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "DevScope-Leaderboard/1.0",
    };
    if (SERVER_TOKEN) {
      headers["Authorization"] = `Bearer ${SERVER_TOKEN}`;
    }
    const res = await fetch(url, { headers });
    console.log(`[LB] ← ${res.status} ${res.statusText}`);
    if (!res.ok) {
      const body = await res.text().catch(() => "<unreadable>");
      console.error(`[LB] non-200 body (first 500 chars): ${body.slice(0, 500)}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[LB] fetch error:`, err);
    return null;
  }
}

/**
 * Search GitHub for users matching a location query string.
 * Uses GitHub's search qualifiers: location:CityName type:user
 * For multi-word locations, quotes ensure proper matching.
 * Returns full search items (login + avatar + html_url).
 */
async function searchUsersByLocation(
  locationQuery: string
): Promise<GhSearchUser[]> {
  const needsQuotes = locationQuery.includes(" ");
  const locPart = needsQuotes
    ? `location:"${locationQuery}"`
    : `location:${locationQuery}`;
  const query = `${locPart} type:user`;
  const url = `${GITHUB_API}/search/users?q=${encodeURIComponent(query)}&per_page=100&sort=followers&order=desc`;

  const data = await ghFetch<{ items: GhSearchUser[]; total_count: number }>(
    url
  );
  if (!data?.items) {
    console.warn(`[LB] empty search response for "${locationQuery}"`);
    return [];
  }
  console.log(
    `[LB] "${locationQuery}": ${data.total_count} total, ${data.items.length} returned`
  );
  return data.items;
}

async function fetchUserRepos(username: string): Promise<RepoInfo[]> {
  const repos = await ghFetch<RepoInfo[]>(
    `${GITHUB_API}/users/${username}/repos?per_page=30&sort=updated`
  );
  return repos ?? [];
}

/* ─── Quick Score (metadata-proxy, no AI) ───────────────────────────── */

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
]);

function computeQuickScore(
  user: GhUser,
  repos: RepoInfo[]
): {
  score: number;
  categories: Record<string, number>;
  totalStars: number;
  totalForks: number;
} {
  const n = repos.length;
  if (n === 0)
    return { score: 0, categories: {}, totalStars: 0, totalForks: 0 };

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);

  // Code Activity — recency
  const recentRepos = repos.filter(
    (r) =>
      r.pushed_at &&
      Date.now() - new Date(r.pushed_at).getTime() < 90 * 86_400_000
  );
  const codeActivity = Math.round((recentRepos.length / n) * 100);

  // Technical Stack — language diversity
  const langs = new Set(repos.map((r) => r.language).filter(Boolean));
  const hasBoth =
    repos.some((r) => r.language && FRONTEND_LANGS.has(r.language)) &&
    repos.some((r) => r.language && BACKEND_LANGS.has(r.language));
  const technicalStack = Math.min(
    100,
    Math.round(langs.size * 15 + (hasBoth ? 25 : 0))
  );

  // Collaboration — stars + forks
  const collaboration = Math.min(
    100,
    Math.round(10 * Math.log2(1 + totalStars + totalForks))
  );

  // Project Maturity — account age + repo count
  const ageYears =
    (Date.now() - new Date(user.created_at).getTime()) / (365 * 86_400_000);
  const maturity = Math.min(
    100,
    Math.round(ageYears * 5 + 4 * Math.log2(1 + n))
  );

  // Repository Quality — rough proxy
  const repoQuality = Math.min(100, Math.round(n * 3 + totalStars * 2));

  // Engineering Practices — rough proxy
  const engineeringPractices = Math.min(
    100,
    Math.round(langs.size * 10 + (hasBoth ? 20 : 0))
  );

  const categories: Record<string, number> = {
    "Code Activity": codeActivity,
    "Technical Stack": technicalStack,
    Collaboration: collaboration,
    "Project Maturity": maturity,
    "Repository Quality": repoQuality,
    "Engineering Practices": engineeringPractices,
  };

  const scores = Object.values(categories);
  const score = Math.round(
    scores.reduce((a, b) => a + b, 0) / scores.length
  );

  return { score, categories, totalStars, totalForks };
}

/* ─── Composite Score ───────────────────────────────────────────────── */

/**
 * Weighted composite that blends the primary score (AI or quick) with
 * social (followers) and activity (repos/stars/forks) signals.
 * Primary dominates at 60%, social 20%, activity 20%.
 */
function computeCompositeScore(
  primaryScore: number,
  followers: number,
  totalStars: number,
  totalForks: number,
  repoCount: number
): number {
  const socialScore = Math.min(
    100,
    Math.round(10 * Math.log2(1 + followers))
  );
  const activityScore = Math.min(
    100,
    Math.round(repoCount * 3 + totalStars * 2 + totalForks * 1.5)
  );
  return Math.round(
    primaryScore * 0.6 + socialScore * 0.2 + activityScore * 0.2
  );
}

/* ─── DB Lookup for AI Scores + Opt-Out ─────────────────────────────── */

/**
 * Batch-lookup existing GitRating profiles + analyses for a set of logins.
 * Returns a Map of login → { aiScore | null, optedOut }.
 * Two queries total regardless of login count.
 */
async function lookupAIScores(
  logins: string[]
): Promise<Map<string, { aiScore: number | null; optedOut: boolean }>> {
  const result = new Map<
    string,
    { aiScore: number | null; optedOut: boolean }
  >();

  if (logins.length === 0) return result;

  // Default: not found → no AI score, not opted out
  for (const login of logins) {
    result.set(login, { aiScore: null, optedOut: false });
  }

  try {
    // 1. Find all profiles matching these logins
    const profiles = await prisma.githubProfile.findMany({
      where: { login: { in: logins } },
      select: {
        login: true,
        hideFromLeaderboards: true,
        userId: true,
      },
    });

    // 2. Mark opted-out users
    for (const p of profiles) {
      if (p.hideFromLeaderboards) {
        result.set(p.login, { aiScore: null, optedOut: true });
      }
    }

    // 3. Look up analyses for non-opted-out users
    const visibleUserIds = profiles
      .filter((p) => !p.hideFromLeaderboards)
      .map((p) => p.userId);

    if (visibleUserIds.length > 0) {
      const analyses = await prisma.analysis.findMany({
        where: {
          userId: { in: visibleUserIds },
          status: "completed",
        },
        orderBy: { completedAt: "desc" },
        select: {
          userId: true,
          overallScore: true,
        },
      });

      // Build userId → login lookup
      const userIdToLogin = new Map(profiles.map((p) => [p.userId, p.login]));

      // Keep latest analysis per user (rows already ordered desc)
      const seen = new Set<string>();
      for (const a of analyses) {
        const login = userIdToLogin.get(a.userId);
        if (login && !seen.has(login)) {
          seen.add(login);
          const existing = result.get(login);
          if (existing && !existing.optedOut) {
            result.set(login, { aiScore: a.overallScore, optedOut: false });
          }
        }
      }

      console.log(
        `[LB] DB: ${profiles.length} profiles found, ${visibleUserIds.length} visible, ${seen.size} with AI scores`
      );
    }
  } catch (err) {
    console.error("[LB] DB lookup error:", err);
    // On error, treat all as quick-score (fail-open — don't block leaderboard)
    for (const login of logins) {
      const prev = result.get(login);
      if (!prev?.optedOut) {
        result.set(login, { aiScore: null, optedOut: false });
      }
    }
  }

  return result;
}

/* ─── Main entry point ──────────────────────────────────────────────── */

export async function getLeaderboard(
  location: string,
  scope: LeaderboardScope,
  page: number = 1,
  limit: number = 25
): Promise<LeaderboardResult> {
  // 1. Check cache — full ranked set stored, paginated on return
  const cacheKey = `leaderboard:${scope}:${location.trim().toLowerCase()}`;
  const cached = cacheGet<CachedLeaderboard>(cacheKey);
  if (cached) {
    const totalEntries = cached.entries.length;
    const start = (page - 1) * limit;
    const pagedEntries = cached.entries.slice(start, start + limit);
    console.log(
      `[LB] Cache hit for ${cacheKey} (${totalEntries} entries, page ${page})`
    );
    return {
      location,
      scope,
      entries: pagedEntries,
      totalEntries,
      totalCandidates: cached.totalCandidates,
      page,
      limit,
      cached: true,
    };
  }

  console.log(`[LB] Cache miss for ${cacheKey} — fetching from GitHub`);

  // 2. Build search queries based on scope
  let searchQueries: string[] = [];
  if (scope === "city") {
    searchQueries = getCityVariants(location);
  } else if (scope === "state") {
    const cities =
      getStateCities("India", location) ?? getStateCities("USA", location);
    searchQueries = cities ? cities.slice(0, 10) : [location];
  } else {
    searchQueries = getCountryVariants(location);
  }

  console.log(`[LB] Search queries: ${searchQueries.join(", ")}`);

  // 3. Search GitHub for users in parallel (deduplicate)
  const searchResults = await Promise.all(
    searchQueries.map((q) => searchUsersByLocation(q))
  );

  const allSearchUsers = new Map<string, GhSearchUser>();
  for (const results of searchResults) {
    for (const u of results) {
      if (!allSearchUsers.has(u.login)) {
        allSearchUsers.set(u.login, u);
      }
    }
  }

  const logins = [...allSearchUsers.keys()];
  console.log(`[LB] ${logins.length} unique logins from search`);

  if (logins.length === 0) {
    // Cache empty result so we don't re-hit GitHub on every request
    const emptyResult: CachedLeaderboard = {
      entries: [],
      totalCandidates: 0,
    };
    cacheSet(cacheKey, emptyResult, CACHE_TTL_MS);
    return {
      location,
      scope,
      entries: [],
      totalEntries: 0,
      totalCandidates: 0,
      page,
      limit,
      cached: false,
    };
  }

  // 4. Look up opted-out users + AI scores from DB
  const dbLookup = await lookupAIScores(logins);
  const visibleLogins = logins.filter(
    (l) => !dbLookup.get(l)?.optedOut
  );
  console.log(
    `[LB] ${visibleLogins.length}/${logins.length} visible after opt-out filter`
  );

  // 5. Fetch user profiles + repos + compute scores (batched)
  const BATCH_SIZE = 10;
  const entries: (Omit<LeaderboardEntry, "rank"> & { compositeScore: number })[] = [];

  for (let i = 0; i < visibleLogins.length; i += BATCH_SIZE) {
    const batch = visibleLogins.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(async (login) => {
        try {
          const user = await ghFetch<GhUser>(
            `${GITHUB_API}/users/${login}`
          );

          // Fallback to search data if detail fetch fails
          const searchUser = allSearchUsers.get(login);
          if (!user && !searchUser) return null;

          const effectiveUser = user ?? {
            login,
            name: null,
            avatar_url: searchUser?.avatar_url ?? null,
            html_url: searchUser?.html_url ?? `https://github.com/${login}`,
            location: null,
            public_repos: 0,
            followers: 0,
            created_at: new Date().toISOString(),
          };

          // Fetch repos (only if we got a full user object)
          const repos = user ? await fetchUserRepos(login) : [];
          const { score: quickScore, categories, totalStars, totalForks } =
            computeQuickScore(effectiveUser, repos);

          const topCategory = Object.entries(categories).sort(
            ([, a], [, b]) => b - a
          )[0];

          // Use AI score if available, else quick-score
          const dbInfo = dbLookup.get(login);
          const aiScore = dbInfo?.aiScore;
          const score = aiScore ?? quickScore;
          const scoreType: "ai" | "quick" = aiScore != null ? "ai" : "quick";

          // Composite score for ranking (primary + social + activity)
          const compositeScore = computeCompositeScore(
            score,
            effectiveUser.followers,
            totalStars,
            totalForks,
            repos.length
          );

          return {
            username: effectiveUser.login,
            displayName: effectiveUser.name,
            avatarUrl:
              effectiveUser.avatar_url ??
              searchUser?.avatar_url ??
              null,
            htmlUrl:
              effectiveUser.html_url ??
              searchUser?.html_url ??
              `https://github.com/${login}`,
            score,
            scoreType,
            compositeScore,
            topSkill: topCategory?.[0] ?? "N/A",
            topScore: topCategory?.[1] ?? 0,
            location: effectiveUser.location,
            publicRepos: effectiveUser.public_repos,
            followers: effectiveUser.followers,
            totalStars,
            totalForks,
          };
        } catch (err) {
          console.error(`[LB] Error processing ${login}:`, err);
          return null;
        }
      })
    );

    for (const entry of results) {
      if (entry) entries.push(entry);
    }
  }

  console.log(`[LB] ${entries.length} entries scored`);

  // 6. Sort by composite score desc, assign ranks, strip internal field
  entries.sort((a, b) => b.compositeScore - a.compositeScore);
  const ranked: LeaderboardEntry[] = entries
    .slice(0, RANKED_KEEP)
    .map((e, i) => {
      const { compositeScore: _, ...rest } = e as typeof e & {
        compositeScore: number;
      };
      return { ...rest, rank: i + 1 } as LeaderboardEntry;
    });

  // 7. Cache full ranked set — only cache when we have real results
  const cachedData: CachedLeaderboard = {
    entries: ranked,
    totalCandidates: logins.length,
  };
  cacheSet(cacheKey, cachedData, CACHE_TTL_MS);

  console.log(
    `[LB] Cached ${ranked.length} ranked entries for ${cacheKey}`
  );

  // 8. Return paginated slice
  const start = (page - 1) * limit;
  const pagedEntries = ranked.slice(start, start + limit);

  return {
    location,
    scope,
    entries: pagedEntries,
    totalEntries: ranked.length,
    totalCandidates: logins.length,
    page,
    limit,
    cached: false,
  };
}
