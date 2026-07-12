import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { DEVELOPER_AXES } from "@/server/scoring";
import { PrintButton } from "@/components/print-button";

export const metadata: Metadata = {
  title: "GitRating Report",
  robots: { index: false, follow: false },
};

/* ─── Report CSS (print-optimized) ─────────────────────────────────── */

const REPORT_CSS = `
  :root {
    --ink: #1a1a1a;
    --muted: #666;
    --line: #ddd;
    --bg: #fff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: var(--ink);
    background: var(--bg);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  .report-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 40px;
  }

  /* ── Page breaks ── */
  .page-break { page-break-before: always; break-before: page; }
  .no-break   { page-break-inside: avoid; break-inside: avoid; }

  /* ── Header ── */
  .report-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid var(--ink);
    padding-bottom: 16px;
    margin-bottom: 32px;
  }
  .report-header h1 {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-top: 4px;
  }
  .report-meta {
    font-size: 13px;
    color: var(--muted);
    margin-top: 2px;
  }
  .report-score-block {
    text-align: right;
  }
  .report-score-big {
    font-size: 56px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
  }
  .report-confidence {
    font-size: 12px;
    color: var(--muted);
    margin-top: 4px;
  }

  /* ── Section titles ── */
  .section-title {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink);
    border-bottom: 1.5px solid var(--ink);
    padding-bottom: 6px;
    margin: 36px 0 16px;
  }

  /* ── Summary ── */
  .summary-text {
    font-size: 15px;
    line-height: 1.7;
    color: var(--ink);
    margin-bottom: 24px;
  }

  /* ── Score bars ── */
  .axis-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
  }
  .axis-label {
    width: 140px;
    font-size: 13px;
    font-weight: 600;
    flex-shrink: 0;
  }
  .axis-bar {
    flex: 1;
    height: 10px;
    background: #f0f0f0;
    border: 1px solid var(--ink);
    overflow: hidden;
  }
  .axis-bar-fill {
    height: 100%;
    background: var(--ink);
  }
  .axis-score {
    width: 36px;
    text-align: right;
    font-size: 14px;
    font-weight: 700;
  }

  /* ── Lists ── */
  .detail-list {
    list-style: none;
    padding: 0;
  }
  .detail-list li {
    font-size: 14px;
    line-height: 1.7;
    padding: 4px 0;
    padding-left: 16px;
    position: relative;
  }
  .detail-list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 12px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ink);
  }
  .detail-list.green li::before { background: #22863a; }
  .detail-list.red li::before   { background: #cb2431; }

  /* ── Recommendations ── */
  .rec-item {
    padding: 10px 0;
    border-bottom: 1px solid var(--line);
  }
  .rec-item:last-child { border-bottom: none; }
  .rec-header {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
  .rec-title {
    font-size: 14px;
    font-weight: 700;
  }
  .rec-impact {
    font-size: 12px;
    font-weight: 700;
    color: #22863a;
    border: 1px solid #22863a;
    padding: 1px 6px;
    white-space: nowrap;
  }
  .rec-reason {
    font-size: 13px;
    color: var(--muted);
    margin-top: 2px;
  }

  /* ── Repo cards ── */
  .repo-card {
    border: 1px solid var(--ink);
    padding: 16px;
    margin-bottom: 12px;
    page-break-inside: avoid;
  }
  .repo-name {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .repo-overall {
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 10px;
  }
  .repo-bars {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .repo-bar-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .repo-bar-label {
    width: 110px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    flex-shrink: 0;
  }
  .repo-bar {
    flex: 1;
    height: 6px;
    background: #f0f0f0;
    border: 1px solid var(--ink);
    overflow: hidden;
  }
  .repo-bar-fill {
    height: 100%;
    background: var(--ink);
  }
  .repo-bar-val {
    width: 28px;
    text-align: right;
    font-size: 11px;
    font-weight: 700;
  }
  .repo-note {
    font-size: 12px;
    color: var(--muted);
    margin-top: 8px;
    line-height: 1.5;
  }
  .repo-note strong { color: var(--ink); font-weight: 600; }

  /* ── Footer ── */
  .report-footer {
    margin-top: 48px;
    padding-top: 16px;
    border-top: 1px solid var(--ink);
    font-size: 12px;
    color: var(--muted);
    line-height: 1.6;
  }

  /* ── Print ── */
  @media print {
    *, *::before, *::after {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    body { background: white; }
    .report-page { padding: 0; max-width: none; }
    .page-break { page-break-before: always; }
    .no-break   { page-break-inside: avoid; }
    .print-hide { display: none !important; }
  }

  /* ── Responsive (screen only) ── */
  @media screen and (max-width: 600px) {
    .report-page { padding: 24px 16px; }
    .report-header { flex-direction: column; align-items: flex-start; gap: 16px; }
    .report-score-block { text-align: left; }
    .axis-label { width: 100px; font-size: 11px; }
  }
`;

/* ─── Helpers ──────────────────────────────────────────────────────── */

function scoreColor(n: number): string {
  if (n >= 80) return "#22863a";
  if (n >= 60) return "var(--ink)";
  if (n >= 40) return "#b08800";
  return "#cb2431";
}

function scoreGrade(n: number): string {
  if (n >= 90) return "Elite";
  if (n >= 80) return "Strong";
  if (n >= 70) return "Solid";
  if (n >= 60) return "Good";
  if (n >= 50) return "Fair";
  if (n >= 40) return "Needs Work";
  return "Critical";
}

/* ─── Page ─────────────────────────────────────────────────────────── */

export default async function ReportPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
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
      <div
        style={{
          maxWidth: 600,
          margin: "4rem auto",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Profile not found
        </h1>
        <Link
          href="/"
          style={{ color: "#22863a", textDecoration: "underline" }}
        >
          ← Back to GitRating
        </Link>
      </div>
    );
  }

  const displayName =
    profile.displayName ?? profile.user.name ?? profile.login;

  const analysis = await prisma.analysis.findFirst({
    where: { userId: profile.userId, status: "completed" },
    orderBy: { createdAt: "desc" },
    include: { scores: true, repoScores: { include: { repository: true } } },
  });

  if (!analysis) {
    return (
      <div
        style={{
          maxWidth: 600,
          margin: "4rem auto",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          No analysis yet
        </h1>
        <Link
          href="/"
          style={{ color: "#22863a", textDecoration: "underline" }}
        >
          ← Back to GitRating
        </Link>
      </div>
    );
  }

  const scores = analysis.scores ?? [];
  const repoScores = analysis.repoScores ?? [];
  const overall = analysis.overallScore ?? 0;
  const confidence = analysis.confidence ?? analysis.confidenceScore ?? 0;
  const shareUrl = `${proto}://${host}/u/${profile.login}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: REPORT_CSS }} />

      <div className="report-page">
        {/* ── PAGE 1: Cover + Summary ─────────────────────────── */}

        <div className="report-header">
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--muted)",
              }}
            >
              GitRating Engineering Report
            </div>
            <h1>{displayName}</h1>
            <div className="report-meta">
              @{profile.login} · Generated{" "}
              {analysis.createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="report-score-block">
            <div
              className="report-score-big"
              style={{ color: scoreColor(overall) }}
            >
              {overall}
            </div>
            <div className="report-confidence">
              {scoreGrade(overall)} · Confidence {Math.round(confidence)}%
            </div>
          </div>
        </div>

        <div className="section-title">Executive Summary</div>
        <p className="summary-text">{analysis.summary}</p>

        {/* ── PAGE 2: Score Breakdown ─────────────────────────── */}
        <div className="page-break" />

        <div className="section-title">Score Breakdown</div>

        {DEVELOPER_AXES.map((axis) => {
          const s = scores.find((x) => x.category === axis);
          if (!s) return null;
          return (
            <div key={axis} className="axis-row no-break">
              <div className="axis-label">{axis}</div>
              <div className="axis-bar">
                <div
                  className="axis-bar-fill"
                  style={{
                    width: `${s.score}%`,
                    background: scoreColor(s.score),
                  }}
                />
              </div>
              <div
                className="axis-score"
                style={{ color: scoreColor(s.score) }}
              >
                {s.score}
              </div>
            </div>
          );
        })}

        {/* Strengths + Weaknesses */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "24px" }}>
          <div className="no-break">
            <div className="section-title" style={{ marginTop: 0, color: "#22863a", borderColor: "#22863a" }}>
              Strengths
            </div>
            <ul className="detail-list green">
              {(analysis.strengths as string[] | null)?.map((s, i) => (
                <li key={i}>{s}</li>
              )) ?? <li>—</li>}
            </ul>
          </div>

          <div className="no-break">
            <div className="section-title" style={{ marginTop: 0, color: "#cb2431", borderColor: "#cb2431" }}>
              Weaknesses
            </div>
            <ul className="detail-list red">
              {(analysis.weaknesses as string[] | null)?.map((s, i) => (
                <li key={i}>{s}</li>
              )) ?? <li>—</li>}
            </ul>
          </div>
        </div>

        {/* ── PAGE 3: Recommendations ─────────────────────────── */}
        <div className="page-break" />

        <div className="section-title">Recommendations</div>

        {scores.flatMap(
          (s) =>
            (s.suggestions as
              | { title: string; impact: string; reason: string }[]
              | null) ?? []
        ).length > 0 ? (
          scores.flatMap((s) =>
            (
              (s.suggestions as
                | { title: string; impact: string; reason: string }[]
                | null) ?? []
            ).map((r, i) => (
              <div key={`${s.category}-${i}`} className="rec-item no-break">
                <div className="rec-header">
                  <span className="rec-title">{r.title}</span>
                  <span className="rec-impact">{r.impact}</span>
                </div>
                <div className="rec-reason">{r.reason}</div>
              </div>
            ))
          )
        ) : (
          <p style={{ fontSize: "14px", color: "var(--muted)" }}>
            No specific recommendations at this time.
          </p>
        )}

        {/* ── PAGE 4: Repository Intelligence ─────────────────── */}
        {repoScores.length > 0 && (
          <>
            <div className="page-break" />

            <div className="section-title">Repository Intelligence</div>

            {repoScores.map((r) => {
              const subScores = [
                { label: "Architecture", value: r.architecture },
                { label: "Documentation", value: r.documentation },
                { label: "Testing", value: r.testing },
                { label: "Deployment", value: r.deployment },
                { label: "Security", value: r.security },
                { label: "Complexity", value: r.complexity },
                { label: "Maintainability", value: r.maintainability },
              ];
              return (
                <div key={r.id} className="repo-card">
                  <div className="repo-name">{r.repository.fullName}</div>
                  <div className="repo-overall">
                    Overall: {r.overall}/100
                  </div>
                  <div className="repo-bars">
                    {subScores.map((ss) => (
                      <div key={ss.label} className="repo-bar-row">
                        <div className="repo-bar-label">{ss.label}</div>
                        <div className="repo-bar">
                          <div
                            className="repo-bar-fill"
                            style={{
                              width: `${ss.value ?? 0}%`,
                              background: scoreColor(ss.value ?? 0),
                            }}
                          />
                        </div>
                        <div className="repo-bar-val">
                          {ss.value ?? "—"}
                        </div>
                      </div>
                    ))}
                  </div>
                  {(r.strengths ?? []).length > 0 && (
                    <div className="repo-note">
                      <strong>Strengths:</strong>{" "}
                      {(r.strengths as string[]).join(" · ")}
                    </div>
                  )}
                  {(r.weaknesses ?? []).length > 0 && (
                    <div className="repo-note">
                      <strong>Weaknesses:</strong>{" "}
                      {(r.weaknesses as string[]).join(" · ")}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* ── Footer ──────────────────────────────────────────── */}
        <div className="report-footer">
          <p>
            This report is an AI estimate based on public GitHub evidence — not
            a hiring decision. Scores reflect patterns in publicly visible
            repositories and do not account for private work, team dynamics, or
            domain expertise.
          </p>
          <p style={{ marginTop: "8px" }}>
            View online:{" "}
            <a
              href={shareUrl}
              style={{ color: "var(--ink)", textDecoration: "underline" }}
            >
              {shareUrl}
            </a>
          </p>
        </div>

        {/* Print button (hidden in print) */}
        <div
          className="print-hide"
          style={{ marginTop: "32px", textAlign: "center" }}
        >
          <PrintButton />
        </div>
      </div>
    </>
  );
}
