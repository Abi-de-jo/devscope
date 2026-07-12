import { NextRequest, NextResponse } from "next/server";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { compareProfiles } from "@/lib/compare-engine";

/**
 * POST /api/compare
 *
 * Body: { usernames: string[] }  (2–4 GitHub usernames)
 *
 * No login required — this is the free "Quick Score" comparison engine.
 * Each username is fetched from the public GitHub REST API, scored from
 * repo metadata only (no AI), and compared side-by-side.
 *
 * Rate limit: 10 requests per minute per anonymous IP.
 * Results are cached per username for 24 hours.
 */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const rl = await rateLimit(`compare:${ip}`, {
    windowMs: 60_000,
    max: 10,
  });

  if (!rl.success) {
    return NextResponse.json(
      { success: false, error: "Rate limit exceeded. Try again shortly." },
      { status: 429, headers: rateLimitHeaders(rl) }
    );
  }

  try {
    const body = await req.json();
    const { usernames } = body as { usernames?: unknown };

    if (!Array.isArray(usernames) || usernames.length < 2) {
      return NextResponse.json(
        { success: false, error: "Provide at least 2 usernames" },
        { status: 400, headers: rateLimitHeaders(rl) }
      );
    }

    // Sanitise: trim, lowercase, dedupe, drop empty
    const clean = [
      ...new Set(
        usernames
          .map((u: unknown) =>
            typeof u === "string" ? u.trim().toLowerCase() : ""
          )
          .filter(Boolean)
      ),
    ];

    if (clean.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Provide at least 2 valid (non-empty) usernames",
        },
        { status: 400, headers: rateLimitHeaders(rl) }
      );
    }

    if (clean.length > 4) {
      return NextResponse.json(
        { success: false, error: "Maximum 4 usernames per comparison" },
        { status: 400, headers: rateLimitHeaders(rl) }
      );
    }

    const result = await compareProfiles(clean);

    return NextResponse.json(result, {
      headers: rateLimitHeaders(rl),
    });
  } catch (err) {
    console.error("Compare error:", err);
    return NextResponse.json(
      { success: false, error: "Internal error" },
      { status: 500, headers: rateLimitHeaders(rl) }
    );
  }
}
