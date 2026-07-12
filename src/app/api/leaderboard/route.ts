import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { getLeaderboard } from "@/lib/leaderboard";
import type { LeaderboardScope } from "@/lib/leaderboard";

/**
 * GET /api/leaderboard?location=Chennai&scope=city&page=1&limit=25
 *
 * Returns a ranked, paginated leaderboard of GitHub users matching the given
 * location + scope.  Optionally pre-fills from the logged-in user's
 * GitHub profile location.
 *
 * Rate limit: 20 requests per minute per user/IP.
 * Results are cached per (location, scope) for 36 hours.
 */

const VALID_SCOPES: LeaderboardScope[] = ["city", "state", "country"];

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const rl = rateLimit(`leaderboard:${ip}`, {
    windowMs: 60_000,
    max: 20,
  });

  if (!rl.success) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again shortly." },
      { status: 429, headers: rateLimitHeaders(rl) }
    );
  }

  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location")?.trim() ?? "";
  const scope = searchParams.get("scope")?.trim() ?? "city";

  // Validate scope
  if (!VALID_SCOPES.includes(scope as LeaderboardScope)) {
    return NextResponse.json(
      { error: `Invalid scope. Must be one of: ${VALID_SCOPES.join(", ")}` },
      { status: 400, headers: rateLimitHeaders(rl) }
    );
  }

  if (!location) {
    return NextResponse.json(
      { error: "Location parameter is required" },
      { status: 400, headers: rateLimitHeaders(rl) }
    );
  }

  // Pagination params
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(
    50,
    Math.max(1, parseInt(searchParams.get("limit") ?? "25", 10))
  );

  try {
    const result = await getLeaderboard(
      location,
      scope as LeaderboardScope,
      page,
      limit
    );

    return NextResponse.json(result, {
      headers: rateLimitHeaders(rl),
    });
  } catch (err) {
    console.error("Leaderboard error:", err);
    return NextResponse.json(
      { error: "Failed to build leaderboard" },
      { status: 500, headers: rateLimitHeaders(rl) }
    );
  }
}

/**
 * POST /api/leaderboard — returns the logged-in user's location
 * for pre-filling the selector, plus their opt-out status.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { location: null, hideFromLeaderboards: false, loggedIn: false }
      );
    }

    const profile = await prisma.githubProfile.findUnique({
      where: { userId: session.user.id },
      select: {
        location: true,
        hideFromLeaderboards: true,
      },
    });

    return NextResponse.json({
      location: profile?.location ?? null,
      hideFromLeaderboards: profile?.hideFromLeaderboards ?? false,
      loggedIn: true,
    });
  } catch {
    return NextResponse.json({
      location: null,
      hideFromLeaderboards: false,
      loggedIn: false,
    });
  }
}

/**
 * PATCH /api/leaderboard — toggle opt-out
 */
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { hideFromLeaderboards } = body as {
      hideFromLeaderboards?: boolean;
    };

    if (typeof hideFromLeaderboards !== "boolean") {
      return NextResponse.json(
        { error: "hideFromLeaderboards must be a boolean" },
        { status: 400 }
      );
    }

    await prisma.githubProfile.update({
      where: { userId: session.user.id },
      data: { hideFromLeaderboards },
    });

    return NextResponse.json({ success: true, hideFromLeaderboards });
  } catch {
    return NextResponse.json(
      { error: "Failed to update setting" },
      { status: 500 }
    );
  }
}
