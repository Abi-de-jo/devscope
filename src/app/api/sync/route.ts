import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { fullSync } from "@/lib/github";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { logSyncEvent, logGitHubCall } from "@/lib/activity-log";

export async function POST() {
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Rate limit: 5 syncs / minute per user (GitHub API + DB writes are costly)
    const rl = await rateLimit(`sync:post:${userId}`, { windowMs: 60_000, max: 5 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Rate limited. Slow down." },
        { status: 429, headers: rateLimitHeaders(rl) }
      );
    }

    // Get GitHub account with access token
    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        providerId: "github",
      },
    });

    if (!account?.accessToken) {
      return NextResponse.json(
        { error: "GitHub account not connected" },
        { status: 400 }
      );
    }

    // Check consent flag — only fetch private + org repos if user allowed
    const profile = await prisma.githubProfile.findUnique({
      where: { userId: session.user.id },
      select: { privateRepoConsent: true },
    });
    const includePrivate = profile?.privateRepoConsent ?? false;

    // Run full sync
    const syncStart = Date.now();
    const result = await fullSync(session.user.id, account.accessToken, includePrivate);

    logGitHubCall(userId, "github.com/user/repos", 200, { login: result.profile.login, repoCount: result.repos.length });
    logSyncEvent(userId, result.repos.length, "success", `Synced ${result.repos.length} repos for ${result.profile.login}`);

    return NextResponse.json({
      success: true,
      profile: {
        login: result.profile.login,
        repos: result.repos.length,
      },
    });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json(
      { error: "Sync failed" },
      { status: 500 }
    );
  }
}
