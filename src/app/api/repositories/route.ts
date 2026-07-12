import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { cacheGet, cacheSet } from "@/lib/cache";

// GET /api/repositories — list the current user's repos (for language
// capability analysis). Stashed + rate-limited like the other data routes.
export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const rl = rateLimit(`repos:get:${userId}`, { windowMs: 60_000, max: 30 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Rate limited. Slow down." },
        { status: 429, headers: rateLimitHeaders(rl) }
      );
    }

    const cacheKey = `repos:${userId}`;
    const cached = cacheGet(cacheKey);
    if (cached) {
      return NextResponse.json(
        { repositories: cached, cached: true },
        { headers: rateLimitHeaders(rl) }
      );
    }

    const profile = await prisma.githubProfile.findUnique({
      where: { userId: userId },
      select: { id: true },
    });

    if (!profile) {
      return NextResponse.json(
        { repositories: [], cached: false },
        { headers: rateLimitHeaders(rl) }
      );
    }

    const repositories = await prisma.repository.findMany({
      where: { profileId: profile.id },
      orderBy: { stargazersCount: "desc" },
      select: {
        id: true,
        name: true,
        fullName: true,
        description: true,
        htmlUrl: true,
        language: true,
        languages: true,
        stargazersCount: true,
        forksCount: true,
        size: true,
      },
    });

    cacheSet(cacheKey, repositories, 30_000);

    return NextResponse.json(
      { repositories, cached: false },
      { headers: rateLimitHeaders(rl) }
    );
  } catch (error) {
    console.error("Get repositories error:", error);
    return NextResponse.json(
      { error: "Failed to get repositories" },
      { status: 500 }
    );
  }
}
