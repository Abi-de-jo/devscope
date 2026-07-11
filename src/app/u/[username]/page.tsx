import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { SkillRadar } from "@/components/skill-radar";
import type { Metadata } from "next";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await prisma.githubProfile.findFirst({
    where: { login: username },
  });

  if (!profile) {
    return { title: `${username} — DevScope` };
  }

  const analysis = await prisma.analysis.findFirst({
    where: { userId: profile.userId, status: "completed" },
    orderBy: { completedAt: "desc" },
  });

  if (!analysis) {
    return {
      title: `${profile.displayName || profile.login} — DevScope`,
      openGraph: {
        title: `${profile.displayName || profile.login} — DevScope`,
        type: "profile",
        images: [`/api/og/${username}`],
      },
    };
  }

  return {
    title: `${profile.displayName || profile.login} — Engineering Score: ${analysis.overallScore}/100 (${analysis.engineerLevel})`,
    description: analysis.summary || `Engineering Score: ${analysis.overallScore}/100`,
    openGraph: {
      title: `${profile.displayName || profile.login} — DevScope Engineering Score`,
      description: analysis.summary || `Engineering Score: ${analysis.overallScore}/100`,
      type: "profile",
      images: [`/api/og/${username}`],
    },
    twitter: {
      card: "summary_large_image",
      images: [`/api/og/${username}`],
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const profile = await prisma.githubProfile.findFirst({
    where: { login: username },
    include: {
      repositories: {
        orderBy: { stargazersCount: "desc" },
        take: 10,
      },
    },
  });

  if (!profile) notFound();

  // Track profile views (best-effort so a DB hiccup never breaks the page)
  await prisma.githubProfile
    .update({
      where: { id: profile.id },
      data: { viewCount: { increment: 1 } },
    })
    .catch(() => {});

  const analysis = await prisma.analysis.findFirst({
    where: { userId: profile.userId, status: "completed" },
    orderBy: { completedAt: "desc" },
    include: { scores: true },
  });

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "3rem 1.5rem",
      }}
    >
      {/* Profile Header */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "flex-start",
          marginBottom: "3rem",
          flexWrap: "wrap",
        }}
      >
        {profile.avatarUrl && (
          <img
            src={profile.avatarUrl}
            alt={profile.login}
            width={96}
            height={96}
            style={{
              border: "var(--border-width) solid var(--ink)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-md)",
            }}
          />
        )}
        <div>
          <div className="uppercase-label" style={{ marginBottom: "0.5rem" }}>
            Public Profile
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            {profile.displayName || profile.login}
          </h1>
          {profile.bio && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--muted)",
                maxWidth: "500px",
                lineHeight: 1.6,
              }}
            >
              {profile.bio}
            </p>
          )}

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginTop: "1rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Repos", value: profile.publicRepos },
              { label: "Followers", value: profile.followers },
              { label: "Following", value: profile.following },
            ].map((stat) => (
              <div key={stat.label}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--muted)",
                    marginLeft: "0.4rem",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {analysis ? (
        <>
          {/* Score Card */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "0",
              marginBottom: "3rem",
            }}
          >
            <div
              className="card"
              style={{
                borderRadius: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "3rem",
                borderRight: "var(--border-width) solid var(--ink)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "6rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  color:
                    (analysis.overallScore ?? 0) >= 70
                      ? "var(--accent)"
                      : (analysis.overallScore ?? 0) >= 40
                      ? "var(--ink)"
                      : "#E74C3C",
                }}
              >
                {analysis.overallScore}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--muted)",
                  marginTop: "0.5rem",
                }}
              >
                out of 100
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginTop: "1rem",
                }}
              >
                {analysis.engineerLevel}
              </div>
            </div>

            <div
              className="card"
              style={{
                borderRadius: 0,
                padding: "2rem",
              }}
            >
              <div className="uppercase-label" style={{ marginBottom: "1rem" }}>
                Skill Radar
              </div>
              <SkillRadar scores={analysis.scores} />
            </div>
          </div>

          {/* Summary */}
          {analysis.summary && (
            <div
              className="card"
              style={{
                borderRadius: 0,
                marginBottom: "3rem",
                padding: "2rem",
              }}
            >
              <div className="uppercase-label" style={{ marginBottom: "1rem" }}>
                Summary
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                }}
              >
                {analysis.summary}
              </p>
            </div>
          )}

          {/* Strengths & Gaps */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "0",
              marginBottom: "3rem",
            }}
          >
            <div
              className="card"
              style={{
                borderRadius: 0,
                borderRight: "var(--border-width) solid var(--ink)",
              }}
            >
              <div
                className="uppercase-label"
                style={{ marginBottom: "1.5rem" }}
              >
                Strengths
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {analysis.strengths.map((s: string, i: number) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      paddingLeft: "1.5rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "var(--accent)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card" style={{ borderRadius: 0 }}>
              <div
                className="uppercase-label"
                style={{ marginBottom: "1.5rem" }}
              >
                Gaps
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {analysis.gaps.map((g: string, i: number) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      paddingLeft: "1.5rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#E74C3C",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Top Repos */}
          <div>
            <div className="uppercase-label" style={{ marginBottom: "1.5rem" }}>
              Top Repositories
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "0",
              }}
            >
              {profile.repositories.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover"
                  style={{
                    borderRadius: 0,
                    textDecoration: "none",
                    color: "inherit",
                    borderBottom: "var(--border-width) solid var(--ink)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--muted)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {repo.language || "N/A"}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {repo.name}
                  </div>
                  {repo.description && (
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.85rem",
                        color: "var(--muted)",
                        lineHeight: 1.5,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {repo.description}
                    </p>
                  )}
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                      }}
                    >
                      ★ {repo.stargazersCount}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                      }}
                    >
                      Fork {repo.forksCount}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div
          className="card"
          style={{
            borderRadius: 0,
            textAlign: "center",
            padding: "6rem 2rem",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            No score yet
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--muted)",
              maxWidth: "400px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            This developer hasn&apos;t been scored yet. Ask them to connect their
            GitHub on DevScope!
          </p>
        </div>
      )}
    </div>
  );
}
