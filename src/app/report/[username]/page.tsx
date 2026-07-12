import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { DEVELOPER_AXES } from "@/server/scoring";
import { LanguageCapabilities } from "@/components/language-capabilities";
import { PrintButton } from "@/components/print-button";

export const metadata: Metadata = {
  title: "GitRating Report",
  robots: { index: false, follow: false },
};

function parseImpact(s: string): number {
  const m = s.match(/-?\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

export default async function ReportPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const h = await headers();
  const host = h.get("host") ?? "GitRating.mozen.in";
  const proto = h.get("x-forwarded-proto") ?? "https";

  const profile = await prisma.githubProfile.findFirst({
    where: { login: username },
    include: { user: true },
  });

  if (!profile) {
    return (
      <div style={{ maxWidth: 600, margin: "4rem auto", fontFamily: "monospace", textAlign: "center" }}>
        <h1>Profile not found</h1>
        <Link href="/">← Back to GitRating</Link>
      </div>
    );
  }

  const displayName = profile.displayName ?? profile.user.name ?? profile.login;

  const analysis = await prisma.analysis.findFirst({
    where: { userId: profile.userId, status: "completed" },
    orderBy: { createdAt: "desc" },
    include: { scores: true, repoScores: { include: { repository: true } } },
  });

  if (!analysis) {
    return (
      <div style={{ maxWidth: 600, margin: "4rem auto", fontFamily: "monospace", textAlign: "center" }}>
        <h1>No analysis yet</h1>
        <Link href="/">← Back to GitRating</Link>
      </div>
    );
  }

  const scores = analysis.scores ?? [];
  const repoScores = analysis.repoScores ?? [];
  const overall = analysis.overallScore ?? 0;
  const confidence = analysis.confidence ?? analysis.confidenceScore ?? 0;

  const shareUrl = `${proto}://${host}/u/${profile.login}`;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "4rem 1.5rem", fontFamily: "Georgia, serif", color: "#111", background: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "3px solid #111", paddingBottom: "1rem", marginBottom: "2rem" }}>
        <div>
          <div style={{ fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>GitRating Engineering Report</div>
          <h1 style={{ fontSize: "2rem", margin: "0.25rem 0 0" }}>{displayName}</h1>
          <div style={{ fontSize: "0.9rem", color: "#555" }}>@{profile.login} · Generated {analysis.createdAt.toLocaleDateString()}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "4rem", fontWeight: 700, lineHeight: 1 }}>{overall}</div>
          <div style={{ fontSize: "0.75rem", color: "#555" }}>Confidence {Math.round(confidence)}%</div>
        </div>
      </div>

      <p style={{ fontSize: "1.05rem", lineHeight: 1.6 }}>{analysis.summary}</p>

      <h2 style={{ fontSize: "1.1rem", borderBottom: "1px solid #111", paddingBottom: "0.25rem", marginTop: "2rem" }}>Score Breakdown</h2>
      {DEVELOPER_AXES.map((axis) => {
        const s = scores.find((x) => x.category === axis);
        if (!s) return null;
        return (
          <div key={axis} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.4rem 0" }}>
            <div style={{ width: "130px", fontWeight: 600 }}>{axis}</div>
            <div style={{ flex: 1, height: "12px", background: "#eee", border: "1px solid #111" }}>
              <div style={{ height: "100%", width: `${s.score}%`, background: "#111" }} />
            </div>
            <div style={{ width: "40px", textAlign: "right", fontWeight: 700 }}>{s.score}</div>
          </div>
        );
      })}

      <h2 style={{ fontSize: "1.1rem", borderBottom: "1px solid #111", paddingBottom: "0.25rem", marginTop: "2rem" }}>Strengths</h2>
      <ul style={{ lineHeight: 1.7 }}>{(analysis.strengths as string[] | null)?.map((s, i) => <li key={i}>{s}</li>) ?? <li>—</li>}</ul>

      <h2 style={{ fontSize: "1.1rem", borderBottom: "1px solid #111", paddingBottom: "0.25rem", marginTop: "2rem" }}>Weaknesses</h2>
      <ul style={{ lineHeight: 1.7 }}>{(analysis.weaknesses as string[] | null)?.map((s, i) => <li key={i}>{s}</li>) ?? <li>—</li>}</ul>

      <h2 style={{ fontSize: "1.1rem", borderBottom: "1px solid #111", paddingBottom: "0.25rem", marginTop: "2rem" }}>Recommendations</h2>
      <ul style={{ lineHeight: 1.7 }}>
        {scores.flatMap((s) => (s.suggestions as { title: string; impact: string; reason: string }[] | null) ?? []).map((r, i) => (
          <li key={i}><strong>{r.title}</strong> <em>({r.impact})</em> — {r.reason}</li>
        ))}
      </ul>

      {repoScores.length > 0 && (
        <>
          <h2 style={{ fontSize: "1.1rem", borderBottom: "1px solid #111", paddingBottom: "0.25rem", marginTop: "2rem" }}>Repository Intelligence</h2>
          {repoScores.map((r) => (
            <div key={r.id} style={{ padding: "0.5rem 0", borderBottom: "1px dotted #999" }}>
              <div style={{ fontWeight: 700 }}>{r.repository.fullName} <span style={{ fontWeight: 400, color: "#555" }}>· {r.overall}/100</span></div>
              <div style={{ fontSize: "0.85rem", color: "#555" }}>
                Arch {r.architecture} · Docs {r.documentation} · Tests {r.testing} · Deploy {r.deployment} · Sec {r.security} · Cplx {r.complexity} · Maint {r.maintainability}
              </div>
            </div>
          ))}
        </>
      )}

      <div style={{ marginTop: "4rem", paddingTop: "1rem", borderTop: "1px solid #111", fontSize: "0.8rem", color: "#555" }}>
        This report is an AI estimate based on public GitHub evidence — not a hiring decision. View online: {shareUrl}
      </div>

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <PrintButton />
      </div>
    </div>
  );
}
