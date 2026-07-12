import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

/**
 * POST /api/consent
 *
 * Body: { privateRepo: boolean }
 *
 * Saves the user's consent choice for private + org repo analysis.
 * Once saved, the preference is never re-asked.
 */
export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { privateRepo } = body as { privateRepo?: unknown };

    if (typeof privateRepo !== "boolean") {
      return NextResponse.json(
        { error: "Invalid value. Must be true or false." },
        { status: 400 }
      );
    }

    // Update the consent flag on GithubProfile
    const profile = await prisma.githubProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "GitHub profile not synced." },
        { status: 400 }
      );
    }

    await prisma.githubProfile.update({
      where: { id: profile.id },
      data: { privateRepoConsent: privateRepo },
    });

    return NextResponse.json({
      success: true,
      privateRepoConsent: privateRepo,
    });
  } catch (error) {
    console.error("Consent update error:", error);
    return NextResponse.json(
      { error: "Failed to update consent" },
      { status: 500 }
    );
  }
}
