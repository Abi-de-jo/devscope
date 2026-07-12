import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const profile = await prisma.githubProfile.findFirst({
    where: { login: username },
  });

  if (!profile) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            backgroundColor: "#F5F4F0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#0B0C0E",
              marginBottom: "16px",
            }}
          >
            GitRating
          </div>
          <div style={{ fontSize: "24px", color: "#6B6F76" }}>
            @{username} hasn&apos;t been scored yet
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  // Track shares — the OG image is fetched by social crawlers when the card
  // is shared/previewed. Best-effort so a DB hiccup never breaks the image.
  await prisma.githubProfile
    .update({
      where: { id: profile.id },
      data: { shareCount: { increment: 1 } },
    })
    .catch(() => { });

  const analysis = await prisma.analysis.findFirst({
    where: { userId: profile.userId, status: "completed" },
    orderBy: { completedAt: "desc" },
    include: { scores: true },
  });

  if (!analysis) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            backgroundColor: "#F5F4F0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#0B0C0E",
              marginBottom: "16px",
            }}
          >
            GitRating
          </div>
          <div style={{ fontSize: "24px", color: "#6B6F76" }}>
            @{profile.login} hasn&apos;t been scored yet
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  const score = analysis.overallScore ?? 0;
  const level = analysis.engineerLevel ?? "Unknown";

  // Get top 3 scores for mini radar
  const topScores = [...analysis.scores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#F5F4F0",
          display: "flex",
          flexDirection: "row",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left side — score */}
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "80px",
            borderRight: "3px solid #0B0C0E",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "#00C2D1",
              marginBottom: "16px",
            }}
          >
            Engineering Score
          </div>
          <div
            style={{
              fontSize: "120px",
              fontWeight: 800,
              color: score >= 70 ? "#00C2D1" : score >= 40 ? "#0B0C0E" : "#E74C3C",
              lineHeight: 1,
              marginBottom: "8px",
            }}
          >
            {score}
          </div>
          <div
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "#6B6F76",
              marginBottom: "24px",
            }}
          >
            out of 100
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#0B0C0E",
              marginBottom: "8px",
            }}
          >
            {level}
          </div>
          <div
            style={{
              fontSize: "18px",
              fontFamily: "monospace",
              color: "#6B6F76",
            }}
          >
            @{profile.login}
          </div>
        </div>

        {/* Right side — breakdown */}
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "60px",
            paddingRight: "80px",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "#6B6F76",
              marginBottom: "32px",
            }}
          >
            Top Skills
          </div>
          {topScores.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontFamily: "monospace",
                  color: "#00C2D1",
                  marginRight: "16px",
                  width: "30px",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#0B0C0E",
                    }}
                  >
                    {s.category}
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: s.score >= 70 ? "#00C2D1" : "#0B0C0E",
                    }}
                  >
                    {s.score}
                  </span>
                </div>
                <div
                  style={{
                    height: "6px",
                    backgroundColor: "#E5E5E0",
                    borderRadius: "0px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${s.score}%`,
                      backgroundColor:
                        s.score >= 70 ? "#00C2D1" : "#0B0C0E",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: "24px",
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#6B6F76",
              borderTop: "2px solid #0B0C0E",
              paddingTop: "16px",
            }}
          >
            GitRating.mozen.in
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    }
  );
}
