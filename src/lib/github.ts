import { prisma } from "./db";

/* ─── GitHub REST API helpers ────────────────────────────────────────── */

const GITHUB_API = "https://api.github.com";

interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  blog: string | null;
  location: string | null;
  company: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  private: boolean;
  fork: boolean;
  topics: string[];
  license: { spdx_id: string } | null;
  has_wiki: boolean;
  has_pages: boolean;
  has_issues: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string | null;
}

interface GitHubTreeItem {
  path: string;
  type: string;
  size?: number;
}

interface ReadmeResponse {
  content: string;
  encoding: string;
}

/* ─── Fetch with token rotation ──────────────────────────────────────── */

const KEYS = [
  process.env.OPENROUTER_KEY_1,
  process.env.OPENROUTER_KEY_2,
  process.env.OPENROUTER_KEY_3,
  process.env.OPENROUTER_KEY_4,
].filter(Boolean);

let keyIndex = 0;

function getNextKey(): string | undefined {
  if (KEYS.length === 0) return undefined;
  const key = KEYS[keyIndex % KEYS.length];
  keyIndex++;
  return key;
}

async function githubFetch<T>(url: string, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "DevScope/1.0",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

/* ─── Sync user profile ─────────────────────────────────────────────── */

export async function syncGitHubProfile(userId: string, accessToken: string) {
  const user = await githubFetch<GitHubUser>(`${GITHUB_API}/user`, accessToken);

  const profile = await prisma.githubProfile.upsert({
    where: { userId },
    update: {
      githubId: user.id,
      login: user.login,
      displayName: user.name,
      bio: user.bio,
      avatarUrl: user.avatar_url,
      blog: user.blog,
      location: user.location,
      company: user.company,
      publicRepos: user.public_repos,
      publicGists: user.public_gists,
      followers: user.followers,
      following: user.following,
      lastSyncedAt: new Date(),
    },
    create: {
      userId,
      githubId: user.id,
      login: user.login,
      displayName: user.name,
      bio: user.bio,
      avatarUrl: user.avatar_url,
      blog: user.blog,
      location: user.location,
      company: user.company,
      publicRepos: user.public_repos,
      publicGists: user.public_gists,
      followers: user.followers,
      following: user.following,
    },
  });

  return profile;
}

/* ─── Sync public repos ─────────────────────────────────────────────── */

export async function syncPublicRepos(profileId: string, accessToken: string) {
  const repos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const batch = await githubFetch<GitHubRepo[]>(
      `${GITHUB_API}/user/repos?visibility=public&sort=pushed&direction=desc&per_page=${perPage}&page=${page}`,
      accessToken
    );
    repos.push(...batch);
    if (batch.length < perPage) break;
    page++;
  }

  const upserted = await Promise.all(
    repos.map((repo) =>
      prisma.repository.upsert({
        where: { githubId: repo.id },
        update: {
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          htmlUrl: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stargazersCount: repo.stargazers_count,
          forksCount: repo.forks_count,
          openIssuesCount: repo.open_issues_count,
          watchersCount: repo.watchers_count,
          size: repo.size,
          defaultBranch: repo.default_branch,
          isPrivate: repo.private,
          isFork: repo.fork,
          topics: repo.topics,
          license: repo.license?.spdx_id ?? null,
          hasReadme: false, // updated below
          hasIssues: repo.has_issues,
          hasWiki: repo.has_wiki,
          hasPages: repo.has_pages,
          createdAt: new Date(repo.created_at),
          lastPushedAt: repo.pushed_at ? new Date(repo.pushed_at) : null,
        },
        create: {
          githubId: repo.id,
          profileId,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          htmlUrl: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stargazersCount: repo.stargazers_count,
          forksCount: repo.forks_count,
          openIssuesCount: repo.open_issues_count,
          watchersCount: repo.watchers_count,
          size: repo.size,
          defaultBranch: repo.default_branch,
          isPrivate: repo.private,
          isFork: repo.fork,
          topics: repo.topics,
          license: repo.license?.spdx_id ?? null,
          hasIssues: repo.has_issues,
          hasWiki: repo.has_wiki,
          hasPages: repo.has_pages,
          createdAt: new Date(repo.created_at),
          lastPushedAt: repo.pushed_at ? new Date(repo.pushed_at) : null,
        },
      })
    )
  );

  return upserted;
}

/* ─── Fetch repo tree (for structure analysis) ───────────────────────── */

export async function fetchRepoTree(
  owner: string,
  repo: string,
  branch: string = "main",
  token?: string
): Promise<GitHubTreeItem[]> {
  try {
    const data = await githubFetch<{ tree: GitHubTreeItem[] }>(
      `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
      token
    );
    return data.tree.filter((item) => item.type === "blob");
  } catch {
    // Branch might be "master" instead of "main"
    if (branch === "main") {
      return fetchRepoTree(owner, repo, "master", token);
    }
    return [];
  }
}

/* ─── Fetch README content ───────────────────────────────────────────── */

export async function fetchReadme(
  owner: string,
  repo: string,
  token?: string
): Promise<string | null> {
  try {
    const data = await githubFetch<ReadmeResponse>(
      `${GITHUB_API}/repos/${owner}/${repo}/readme`,
      token
    );
    if (data.encoding === "base64") {
      return Buffer.from(data.content, "base64").toString("utf-8");
    }
    return data.content;
  } catch {
    return null;
  }
}

/* ─── Full sync orchestrator ─────────────────────────────────────────── */

export async function fullSync(userId: string, accessToken: string) {
  // 1. Sync profile
  const profile = await syncGitHubProfile(userId, accessToken);

  // 2. Sync repos
  const repos = await syncPublicRepos(profile.id, accessToken);

  // 3. Check READMEs for top repos (by stars, limit 20)
  const topRepos = repos
    .sort((a, b) => b.stargazersCount - a.stargazersCount)
    .slice(0, 20);

  for (const repo of topRepos) {
    const [owner, name] = repo.fullName.split("/");
    const readme = await fetchReadme(owner, name, accessToken);
    if (readme && readme.length > 0) {
      await prisma.repository.update({
        where: { id: repo.id },
        data: { hasReadme: true },
      });
    }
  }

  return { profile, repos };
}
