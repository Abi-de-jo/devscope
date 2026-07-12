import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateActivityToken } from "@/lib/activity-log";

/**
 * GET /api/activity-log
 * Returns the user's activity log entries + their opaque URL token.
 * Session auth required — userId enforced server-side.
 */
export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch paginated log entries — strict userId filter
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") ?? "50", 10)));
    const skip = (page - 1) * limit;

    const [entries, total] = await Promise.all([
      prisma.activityLog.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          action: true,
          detail: true,
          meta: true,
          status: true,
          costCents: true,
          createdAt: true,
        },
      }),
      prisma.activityLog.count({ where: { userId } }),
    ]);

    // Ensure user has an opaque token (generate if missing)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { activityToken: true },
    });

    let token = user?.activityToken;
    if (!token) {
      token = generateActivityToken();
      await prisma.user.update({
        where: { id: userId },
        data: { activityToken: token },
      });
    }

    return NextResponse.json({
      entries,
      token,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Activity log error:", err);
    return NextResponse.json(
      { error: "Failed to load activity log" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/activity-log — regenerate the opaque URL token.
 * Returns the new token.
 */
export async function POST() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newToken = generateActivityToken();
    await prisma.user.update({
      where: { id: session.user.id },
      data: { activityToken: newToken },
    });

    return NextResponse.json({ token: newToken });
  } catch (err) {
    console.error("Token regeneration error:", err);
    return NextResponse.json(
      { error: "Failed to regenerate token" },
      { status: 500 }
    );
  }
}
