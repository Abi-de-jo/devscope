/**
 * One-off seed script: fetches Abi-de-jo's GitHub profile, runs it through
 * the quick-score pipeline (compare-engine), and writes the result to
 * src/data/hero-profile.json for static import in the hero component.
 *
 * Usage:  npm run seed:hero
 *         bun run scripts/seed-hero-profile.ts
 *
 * Requires GITHUB_TOKEN in .env for authenticated API calls (avoids the
 * unauthenticated 60/hour rate limit).
 */

import "dotenv/config";
import { fetchAndScore } from "../src/lib/compare-engine";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const USERNAME = "Abi-de-jo";

async function main() {
  console.log(`Fetching profile for ${USERNAME}…`);
  const result = await fetchAndScore(USERNAME);

  if (result.error) {
    console.error(`Error: ${result.error}`);
    process.exit(1);
  }

  // Map the 6 quick-score categories into a flat skills object
  // for the hero card display
  const cat = result.categories;
  const skills: Record<string, number> = {};

  // Map quick-score category keys to readable skill names
  const CATEGORY_MAP: Record<string, string> = {
    "code-activity": "activity",
    "repository-quality": "quality",
    "technical-stack": "stack",
    "engineering-practices": "practices",
    "collaboration": "collaboration",
    "project-maturity": "maturity",
  };

  for (const [key, label] of Object.entries(CATEGORY_MAP)) {
    skills[label] = cat[key]?.score ?? 0;
  }

  // Compute language byte distribution from repos for display
  const langDist = await fetchLanguageDistribution(USERNAME);

  const heroProfile = {
    login: result.username,
    name: result.displayName ?? result.username,
    avatarUrl: result.avatarUrl,
    htmlUrl: `https://github.com/${result.username}`,
    score: result.overallScore,
    level: result.rating,
    ratingStars: result.ratingStars,
    followers: result.followers,
    following: result.following,
    publicRepos: result.publicRepos,
    totalStars: Object.values(cat).reduce(
      (sum, c) => sum + (c.strengths?.length ?? 0),
      0
    ),
    skills,
    languages: langDist,
    fetchedAt: new Date().toISOString(),
  };

  // Write to src/data/hero-profile.json
  const outDir = join(import.meta.dir, "..", "src", "data");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "hero-profile.json");
  writeFileSync(outPath, JSON.stringify(heroProfile, null, 2));

  console.log(`\nSaved hero profile to ${outPath}`);
  console.log(`  Score: ${heroProfile.score}/100 (${heroProfile.level})`);
  console.log(`  Repos: ${heroProfile.publicRepos}`);
  console.log(`  Followers: ${heroProfile.followers}`);
  console.log(`  Languages: ${Object.keys(heroProfile.languages).join(", ")}`);
}

/**
 * Fetch language byte distribution across all public repos.
 * Uses the GitHub languages API (per-repo) and aggregates.
 */
async function fetchLanguageDistribution(
  username: string
): Promise<Record<string, number>> {
  const token = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GitRating-Seed/1.0",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Fetch repos list
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    { headers }
  );
  if (!reposRes.ok) {
    console.warn("Failed to fetch repos for language distribution");
    return {};
  }
  const repos = (await reposRes.json()) as Array<{
    full_name: string;
    private: boolean;
  }>;

  const publicRepos = repos.filter((r) => !r.private);

  // Aggregate language bytes across top repos (limit to 20 to stay under rate limit)
  const langTotals: Record<string, number> = {};
  const limit = Math.min(publicRepos.length, 20);

  for (let i = 0; i < limit; i++) {
    const [owner, name] = publicRepos[i].full_name.split("/");
    try {
      const langRes = await fetch(
        `https://api.github.com/repos/${owner}/${name}/languages`,
        { headers }
      );
      if (!langRes.ok) continue;
      const langs = (await langRes.json()) as Record<string, number>;
      for (const [lang, bytes] of Object.entries(langs)) {
        langTotals[lang] = (langTotals[lang] ?? 0) + bytes;
      }
    } catch {
      // skip failed repos
    }
  }

  // Sort by bytes desc, take top 6, compute percentages
  const sorted = Object.entries(langTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const totalBytes = sorted.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (totalBytes === 0) return {};

  const result: Record<string, number> = {};
  for (const [lang, bytes] of sorted) {
    result[lang] = Math.round((bytes / totalBytes) * 100);
  }

  return result;
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
