import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { scoreDeveloper } from "@/server/scoring";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { cacheGet, cacheSet, cacheDelete } from "@/lib/cache";

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
    const rl = rateLimit(`score:get:${userId}`, { windowMs: 60_000, max: 30 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Rate limited. Slow down." },
        { status: 429, headers: rateLimitHeaders(rl) }
      );
    }

    // Serve stashed data instantly until a refetch invalidates it
    const cacheKey = `score:${userId}`;
    const cached = cacheGet(cacheKey);
    if (cached) {
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
      cacheSet(cacheKey, null, 10 * 60_000);
      return NextResponse.json(
        { success: true, analysis: null, cached: false },
        { headers: rateLimitHeaders(rl) }
      );
    }

    const profile = await prisma.githubProfile.findUnique({
      where: { userId: userId },
      select: { login: true },
    });

    const payload = { ...analysis, username: profile?.login ?? null };
    // Stash for 10 minutes; invalidated on POST score
    cacheSet(cacheKey, payload, 10 * 60_000);

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
    const rl = rateLimit(`score:post:${userId}`, { windowMs: 60_000, max: 10 });
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

    // Check for existing recent analysis (within 24 hours for free tier)
    const recentAnalysis = await prisma.analysis.findFirst({
      where: {
        userId: session.user.id,
        status: "completed",
        completedAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });

    if (recentAnalysis) {
      return NextResponse.json({
        success: true,
        analysisId: recentAnalysis.id,
        message: "Recent analysis exists. Re-analysis available after 24h (free tier).",
      });
    }

    // Run scoring
    const result = await scoreDeveloper(userId, profile.id);

    // Invalidate stashed data so the next read returns the fresh snapshot
    cacheDelete(`score:${userId}`);
    cacheDelete(`analyses:${userId}`);

    return NextResponse.json({
      success: true,
      score: result.overallScore,
      level: result.engineerLevel,
      summary: result.summary,
    });
  } catch (error) {
    console.error("Score error:", error);
    return NextResponse.json(
      { error: "Scoring failed" },
      { status: 500 }
    );
  }
}
