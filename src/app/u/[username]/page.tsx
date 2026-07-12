import { prisma } from "@/lib/db";
import { cacheGet, cacheSet, TTL } from "@/lib/cache";
import { notFound } from "next/navigation";
import { SkillRadar } from "@/components/skill-radar";
import { LanguageCapabilities, type RepoLang } from "@/components/language-capabilities";
import { CheckCircle, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

interface Rec {
  title: string;
  impact: string;
  reason: string;
}

function asRecs(v: unknown): Rec[] {
  return Array.isArray(v) ? (v as Rec[]) : [];
}
function asStr(v: unknown): string[] {
  return Array.isArray(v) ? (v as string[]) : [];
}
function confLabel(c: number): { label: string; color: string } {
  if (c >= 75) return { label: "High", color: "var(--accent)" };
  if (c >= 50) return { label: "Medium", color: "var(--ink)" };
  return { label: "Low", color: "#E74C3C" };
}

function ConfidenceTag({ value }: { value: number }) {
  const { label, color } = confLabel(value);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.8rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        color,
        border: `1.5px solid ${color}`,
        borderRadius: "2px",
        padding: "0.15rem 0.5rem",
        background: "var(--paper)",
      }}
    >
      <span style={{ opacity: 0.6 }}>Confidence</span>
      {value}% · {label}
    </span>
  );
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await prisma.githubProfile.findFirst({
    where: { login: username },
  });

  if (!profile) {
    return { title: `${username} — GitRating` };
  }

  const analysis = await prisma.analysis.findFirst({
    where: { userId: profile.userId, status: "completed" },
    orderBy: { completedAt: "desc" },
  });

  if (!analysis) {
    return {
      title: `${profile.displayName || profile.login} — GitRating`,
      openGraph: {
        title: `${profile.displayName || profile.login} — GitRating`,
        type: "profile",
        images: [`/api/og/${username}`],
      },
    };
  }

  return {
    title: `${profile.displayName || profile.login} — Engineering Score: ${analysis.overallScore}/100 (${analysis.engineerLevel})`,
    description: analysis.summary || `Engineering Score: ${analysis.overallScore}/100`,
    openGraph: {
      title: `${profile.displayName || profile.login} — GitRating Engineering Score`,
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

/* ─── DB helpers (extracted for caching) ──────────────────────────── */

async function loadProfile(username: string) {
  return prisma.githubProfile.findFirst({
    where: { login: username },
    include: {
      repositories: {
        orderBy: { stargazersCount: "desc" },
        take: 10,
      },
    },
  });
}

async function loadAnalysis(username: string) {
  const profile = await prisma.githubProfile.findFirst({
    where: { login: username },
    select: { userId: true },
  });
  if (!profile) return null;
  return prisma.analysis.findFirst({
    where: { userId: profile.userId, status: "completed" },
    orderBy: { completedAt: "desc" },
    include: {
      scores: true,
      repoScores: { include: { repository: true } },
    },
  });
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  // Check Redis cache first — avoids DB round-trip on repeat views
  const cacheKey = `profile:${username}`;
  const cached = await cacheGet<{
    profile: Awaited<ReturnType<typeof loadProfile>>;
    analysis: Awaited<ReturnType<typeof loadAnalysis>>;
  }>(cacheKey);

  let profile: Awaited<ReturnType<typeof loadProfile>>;
  let analysis: Awaited<ReturnType<typeof loadAnalysis>>;

  if (cached) {
    profile = cached.profile;
    analysis = cached.analysis;
  } else {
    [profile, analysis] = await Promise.all([
      loadProfile(username),
      loadAnalysis(username),
    ]);
    if (profile) {
      await cacheSet(cacheKey, { profile, analysis }, TTL.ANALYSIS);
    }
  }

  if (!profile) notFound();

  // Track profile views (best-effort so a DB hiccup never breaks the page)
  await prisma.githubProfile
    .update({
      where: { id: profile.id },
      data: { viewCount: { increment: 1 } },
    })
    .catch(() => { });

  const overallConf = analysis?.confidence ?? (analysis ? Math.round((analysis.confidenceScore ?? 0) * 100) : 0);
  const weaknesses = analysis ? asStr(analysis.weaknesses).length > 0 ? asStr(analysis.weaknesses) : asStr(analysis.gaps) : [];
  const recommendations = analysis ? asRecs(analysis.recommendations) : [];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      {/* Profile Header */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", marginBottom: "4rem", flexWrap: "wrap" }}>
        {profile.avatarUrl && (
          <img
            src={profile.avatarUrl}
            alt={profile.login}
            width={96}
            height={96}
            style={{ border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-md)" }}
          />
        )}
        <div>
          <div className="uppercase-label" style={{ marginBottom: "0.5rem" }}>Public Profile</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            {profile.displayName || profile.login}
          </h1>
          {profile.bio && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--muted)", maxWidth: "500px", lineHeight: 1.6 }}>{profile.bio}</p>
          )}
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
            {[
              { label: "Repos", value: profile.publicRepos },
              { label: "Followers", value: profile.followers },
              { label: "Following", value: profile.following },
            ].map((stat) => (
              <div key={stat.label}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" }}>{stat.value}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", marginLeft: "0.4rem" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {analysis ? (
        <>
          {/* Score Card + Radar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 0, marginBottom: "4rem" }}>
            <div className="card" style={{ borderRadius: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "4rem", borderRight: "var(--border-width) solid var(--ink)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "6rem", fontWeight: 700, lineHeight: 1, color: (analysis.overallScore ?? 0) >= 70 ? "var(--accent)" : (analysis.overallScore ?? 0) >= 40 ? "var(--ink)" : "#E74C3C" }}>
                {analysis.overallScore}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginTop: "0.5rem" }}>out of 100</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, marginTop: "1rem" }}>{analysis.engineerLevel}</div>
              <div style={{ marginTop: "1rem" }}><ConfidenceTag value={overallConf} /></div>
            </div>
            <div className="card" style={{ borderRadius: 0, padding: "2rem" }}>
              <div className="uppercase-label" style={{ marginBottom: "1rem" }}>Skill Radar</div>
              <SkillRadar scores={analysis.scores.map((s) => ({ category: s.category, score: s.score }))} />
            </div>
          </div>

          {/* Language Capabilities */}
          {profile.repositories.length > 0 && (
            <div style={{ marginBottom: "4rem" }}>
              <LanguageCapabilities repositories={profile.repositories as RepoLang[]} />
            </div>
          )}

          {/* Explanation (Feature 1) */}
          <div className="card" style={{ borderRadius: 0, marginBottom: "4rem", padding: "2rem" }}>
            <div className="uppercase-label" style={{ marginBottom: "1rem" }}>Overall Summary</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.7, color: "var(--ink)", marginBottom: "1.5rem" }}>{analysis.summary}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
              <div>
                <div className="uppercase-label" style={{ marginBottom: "0.75rem", color: "var(--accent)" }}><CheckCircle size={14} style={{ display: "inline" }} /> Strengths</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {asStr(analysis.strengths).map((s, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                      <CheckCircle size={15} color="var(--accent)" style={{ flexShrink: 0, marginTop: "2px" }} /><span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="uppercase-label" style={{ marginBottom: "0.75rem", color: "#E74C3C" }}><AlertTriangle size={14} style={{ display: "inline" }} /> Missing</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {weaknesses.map((w, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                      <span style={{ color: "#E74C3C", fontWeight: 700 }}>•</span><span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {recommendations.length > 0 && (
              <div style={{ marginTop: "1.5rem" }}>
                <div className="uppercase-label" style={{ marginBottom: "0.75rem" }}><Sparkles size={14} style={{ display: "inline" }} /> Recommendations</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {recommendations.map((r, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", border: "var(--border-width) solid var(--ink)", borderRadius: "2px", padding: "0.75rem 1rem", background: "var(--paper)" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 700, color: "var(--accent)", border: "1.5px solid var(--accent)", borderRadius: "2px", padding: "0.1rem 0.4rem", flexShrink: 0 }}>{r.impact}</span>
                      <div>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem" }}>{r.title}</div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.15rem" }}>{r.reason}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Category breakdown with evidence (Feature 2 + 5) */}
          <div style={{ marginBottom: "4rem" }}>
            <div className="uppercase-label" style={{ marginBottom: "1.5rem" }}>Category Breakdown — evidence for every score</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 0, border: "var(--border-width) solid var(--ink)", borderRadius: "2px", overflow: "hidden" }}>
              {analysis.scores.map((s, i) => {
                const conf = Math.round((s.confidence ?? 0) * 100);
                const evidence = asStr(s.evidence);
                const missing = asStr(s.missing);
                const recs = asRecs(s.suggestions);
                return (
                  <div key={i} className="card" style={{ borderRadius: 0, borderBottom: "var(--border-width) solid var(--ink)", borderRight: i % 2 === 0 ? "var(--border-width) solid var(--ink)" : "none", padding: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        {s.category} <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: s.score >= 70 ? "var(--accent)" : s.score >= 40 ? "var(--ink)" : "#E74C3C" }}>{s.score}</span>
                      </span>
                      <ConfidenceTag value={conf} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent)", marginBottom: "0.4rem" }}>Evidence</div>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                          {evidence.map((e, j) => (
                            <li key={j} style={{ display: "flex", gap: "0.4rem", fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.4 }}>
                              <CheckCircle size={13} color="var(--accent)" style={{ flexShrink: 0, marginTop: "2px" }} /><span>{e}</span>
                            </li>
                          ))}
                          {evidence.length === 0 && <li style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--muted)" }}>No strong evidence.</li>}
                        </ul>
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "#E74C3C", marginBottom: "0.4rem" }}>Missing</div>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                          {missing.map((m, j) => (
                            <li key={j} style={{ display: "flex", gap: "0.4rem", fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.4 }}>
                              <span style={{ color: "#E74C3C", fontWeight: 700 }}>•</span><span>{m}</span>
                            </li>
                          ))}
                          {missing.length === 0 && <li style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--muted)" }}>Nothing notable missing.</li>}
                        </ul>
                      </div>
                    </div>
                    {recs.length > 0 && (
                      <div style={{ marginTop: "1rem", borderTop: "1px dashed var(--border)", paddingTop: "0.75rem" }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", marginBottom: "0.4rem" }}>Recommendations</div>
                        {recs.map((r, j) => (
                          <div key={j} style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.4, marginBottom: "0.4rem" }}>
                            <span style={{ fontWeight: 700 }}>{r.title}</span> <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)" }}>{r.impact}</span>
                            <div style={{ color: "var(--muted)", fontSize: "0.75rem" }}>{r.reason}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Repository Intelligence (Feature 3) */}
          {analysis.repoScores.length > 0 && (
            <div style={{ marginBottom: "4rem" }}>
              <div className="uppercase-label" style={{ marginBottom: "1.5rem" }}>Repository Intelligence</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 0, border: "var(--border-width) solid var(--ink)", borderRadius: "2px", overflow: "hidden" }}>
                {analysis.repoScores.map((rs, i) => {
                  const repo = rs.repository;
                  const subScores = [
                    { label: "Architecture", value: rs.architecture },
                    { label: "Documentation", value: rs.documentation },
                    { label: "Testing", value: rs.testing },
                    { label: "Deployment", value: rs.deployment },
                    { label: "Security", value: rs.security },
                    { label: "Complexity", value: rs.complexity },
                    { label: "Maintainability", value: rs.maintainability },
                  ];
                  return (
                    <div key={i} className="card" style={{ borderRadius: 0, borderBottom: "var(--border-width) solid var(--ink)", padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                        <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)", textDecoration: "none" }}>{repo.fullName}</a>
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: (rs.overall ?? 0) >= 70 ? "var(--accent)" : (rs.overall ?? 0) >= 40 ? "var(--ink)" : "#E74C3C" }}>{rs.overall}</span>
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", marginBottom: "1rem" }}>Estimated Repository Score</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
                        {subScores.map((ss) => (
                          <div key={ss.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", width: "110px", textTransform: "uppercase", letterSpacing: "0.03em" }}>{ss.label}</span>
                            <div style={{ flex: 1, height: "6px", background: "var(--paper)", border: "1.5px solid var(--ink)" }}>
                              <div style={{ height: "100%", width: `${ss.value ?? 0}%`, background: (ss.value ?? 0) >= 70 ? "var(--accent)" : (ss.value ?? 0) >= 40 ? "var(--ink)" : "#E74C3C" }} />
                            </div>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 700, width: "28px", textAlign: "right" }}>{ss.value ?? "—"}</span>
                          </div>
                        ))}
                      </div>
                      {asStr(rs.strengths).length > 0 && (
                        <div style={{ marginBottom: "0.5rem" }}>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent)", marginBottom: "0.4rem" }}>Strengths</div>
                          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.4 }}>{asStr(rs.strengths).join(" · ")}</div>
                        </div>
                      )}
                      {asStr(rs.weaknesses).length > 0 && (
                        <div>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "#E74C3C", marginBottom: "0.4rem" }}>Weaknesses</div>
                          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.4 }}>{asStr(rs.weaknesses).join(" · ")}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Viral CTA */}
          <div className="card" style={{ borderRadius: 0, textAlign: "center", padding: "4rem 2rem", background: "var(--paper-alt)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 700, marginBottom: "0.75rem" }}>Know your own score.</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--muted)", maxWidth: "420px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
              Connect GitHub and get your explainable Engineering Score in 60 seconds. Free.
            </p>
            <a href="/" className="btn-primary">
              Get your GitRating
              <ArrowRight size={16} />
            </a>
            <div style={{ marginTop: "1rem" }}>
              <a href={`/report/${profile.login}`} className="btn-secondary" style={{ fontSize: "0.8rem" }}>
                Download this report
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="card" style={{ borderRadius: 0, textAlign: "center", padding: "6rem 2rem" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>No score yet</div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--muted)", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>
            This developer hasn&apos;t been scored yet. Ask them to connect their GitHub on GitRating!
          </p>
        </div>
      )}
    </div>
  );
}
