import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

/**
 * GET /api/profile
 *
 * Returns the user's GitHub profile data.
 */
export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.githubProfile.findUnique({
      where: { userId: session.user.id },
      select: {
        login: true,
        displayName: true,
        avatarUrl: true,
        hideFromLeaderboards: true,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { success: true, profile: null },
      );
    }

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Profile load error:", error);
    return NextResponse.json(
      { error: "Failed to load profile" },
      { status: 500 }
    );
  }
}
