import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { cacheGet, cacheSet } from "@/lib/cache";

// GET /api/analyses — list the current user's analyses (for timeline / compare).
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // Rate limit: 30 reads / minute per user
  const rl = rateLimit(`analyses:get:${userId}`, { windowMs: 60_000, max: 30 });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Rate limited. Slow down." },
      { status: 429, headers: rateLimitHeaders(rl) }
    );
  }

  // Serve stashed list instantly until a refetch invalidates it
  const cacheKey = `analyses:${userId}`;
  const cached = cacheGet(cacheKey);
  if (cached) {
    return NextResponse.json(
      { analyses: cached, cached: true },
      { headers: rateLimitHeaders(rl) }
    );
  }

  const analyses = await prisma.analysis.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      createdAt: true,
      status: true,
      overallScore: true,
      confidenceScore: true,
      confidence: true,
      costCents: true,
    },
  });

  // Stash for 30 seconds; invalidated on POST score
  cacheSet(cacheKey, analyses, 30_000);

  return NextResponse.json(
    { analyses, cached: false },
    { headers: rateLimitHeaders(rl) }
  );
}
