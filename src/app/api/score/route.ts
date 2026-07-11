import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { scoreDeveloper } from "@/server/scoring";

export async function POST() {
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    const result = await scoreDeveloper(session.user.id, profile.id);

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
