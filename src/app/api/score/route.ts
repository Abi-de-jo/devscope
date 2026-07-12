import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { scoreDeveloper } from "@/server/scoring";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { cacheGet, cacheSet, cacheDelete, TTL } from "@/lib/cache";
import { logScoreRun, logCacheEvent } from "@/lib/activity-log";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Rate limit: 30 reads / minute per user
    const rl = await rateLimit(`score:get:${userId}`, { windowMs: 60_000, max: 30 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Rate limited. Slow down." },
        { status: 429, headers: rateLimitHeaders(rl) }
      );
    }

    // Serve stashed data instantly until a refetch invalidates it
    const cacheKey = `score:${userId}`;
    const cached = await cacheGet(cacheKey);
    if (cached) {
      logCacheEvent(userId, "hit", cacheKey);
      return NextResponse.json(
        { success: true, analysis: cached, cached: true },
        { headers: rateLimitHeaders(rl) }
      );
    }

    const analysis = await prisma.analysis.findFirst({
      where: { userId: userId, status: "completed" },
      orderBy: { completedAt: "desc" },
      include: {
        scores: true,
        repoScores: { include: { repository: true } },
      },
    });

    if (!analysis) {
      // Don't cache null — DB query for "no analysis" is fast (indexed).
      // Caching null wastes Redis space since callers check `if (cached)`
      // which is falsy for null, so it never actually short-circuits.
      return NextResponse.json(
        { success: true, analysis: null, cached: false },
        { headers: rateLimitHeaders(rl) }
      );
    }

    const profile = await prisma.githubProfile.findUnique({
      where: { userId: userId },
      select: { login: true, privateRepoConsent: true },
    });

    const payload = {
      ...analysis,
      username: profile?.login ?? null,
      privateRepoConsent: profile?.privateRepoConsent ?? false,
    };
    // Stash for 10 minutes; invalidated on POST score
    await cacheSet(cacheKey, payload, TTL.SCORE_READ);

    return NextResponse.json(
      { success: true, analysis: payload, cached: false },
      { headers: rateLimitHeaders(rl) }
    );
  } catch (error) {
    console.error("Analysis load error:", error);
    return NextResponse.json(
      { error: "Failed to load analysis" },
      { status: 500 }
    );
  }
}

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

    // Rate limit: 10 scoring requests / minute per user (LLM cost guard)
    const rl = await rateLimit(`score:post:${userId}`, { windowMs: 60_000, max: 10 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Rate limited. Slow down." },
        { status: 429, headers: rateLimitHeaders(rl) }
      );
    }

    // Check if profile exists
    const profile = await prisma.githubProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "GitHub profile not synced. Run /api/sync first." },
        { status: 400 }
      );
    }

    // Check if user has any repos — can't score with 0 repos
    const repoCount = await prisma.repository.count({
      where: { profileId: profile.id },
    });

    if (repoCount === 0) {
      return NextResponse.json(
        { error: "No public repositories found. Make sure your GitHub account has public repos." },
        { status: 400 }
      );
    }

    // TEMP RATE LIMIT: if user already has any completed analysis,
    // return it instead of calling the AI API again.
    const existingAnalysis = await prisma.analysis.findFirst({
      where: {
        userId: session.user.id,
        status: "completed",
      },
      orderBy: { completedAt: "desc" },
    });

    if (existingAnalysis) {
      // Serve the existing analysis via GET path (cache + username attach)
      await cacheDelete(`score:${userId}`);
      logScoreRun(userId, { repoCount: 0, cached: true, costCents: 0 });
      return NextResponse.json({
        success: true,
        analysisId: existingAnalysis.id,
        message: "Returning existing analysis. One AI score per account for now.",
      });
    }

    // Run scoring
    const result = await scoreDeveloper(userId, profile.id);

    logScoreRun(userId, { repoCount: 0, cached: false, costCents: 0 });

    // Invalidate stashed data so the next read returns the fresh snapshot
    await cacheDelete(`score:${userId}`);
    await cacheDelete(`analyses:${userId}`);

    return NextResponse.json({
      success: true,
      score: result.overallScore,
      level: result.engineerLevel,
      summary: result.summary,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("Score POST error:", detail, error);
    return NextResponse.json(
      { error: detail || "Scoring failed" },
      { status: 500 }
    );
  }
}
