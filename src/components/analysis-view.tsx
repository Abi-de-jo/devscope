"use client";

import { useState } from "react";
import Link from "next/link";
import { SkillRadar } from "@/components/skill-radar";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Sparkles, ChevronDown, ArrowRight, RefreshCw } from "lucide-react";

/* ─── Types (mirror the GET /api/score payload) ────────────────────── */

export interface Recommendation {
  title: string;
  impact: string;
  reason: string;
}

export interface AxisScore {
  category: string;
  score: number;
  confidence: number; // 0-1
  evidence: string[];
  missing: string[];
  suggestions: Recommendation[]; // prisma field is `suggestions`
}

export interface RepoScoreData {
  overall: number;
  architecture: number;
  documentation: number;
  testing: number;
  deployment: number;
  security: number;
  complexity: number;
  maintainability: number;
  confidence: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: Recommendation[];
  repository: { fullName: string; htmlUrl: string };
}

export interface AnalysisData {
  id: string;
  overallScore: number;
  engineerLevel: string;
  confidence: number | null; // 0-100
  confidenceScore: number | null; // 0-1 (fallback)
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: Recommendation[];
  completedAt: string;
  scores: AxisScore[];
  repoScores: RepoScoreData[];
  username: string | null;
}

/* ─── Helpers ──────────────────────────────────────────────────────── */

function parseImpact(s: string): number {
  const m = s.match(/-?\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

function clamp(n: number, lo = 0, hi = 100): number {
  return Math.max(lo, Math.min(hi, n));
}

function confidenceLabel(c: number): { label: string; color: string } {
  if (c >= 75) return { label: "High", color: "var(--accent)" };
  if (c >= 50) return { label: "Medium", color: "var(--ink)" };
  return { label: "Low", color: "#E74C3C" };
}

function ConfidenceBadge({ value, note }: { value: number; note?: string }) {
  const { label, color } = confidenceLabel(value);
  return (
    <span
      title={note}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
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

/* ─── Why panel (Feature 2) ────────────────────────────────────────── */

function WhyPanel({ axis }: { axis: AxisScore }) {
  const [open, setOpen] = useState(false);
  const conf = Math.round((axis.confidence ?? 0) * 100);

  return (
    <div className="card" style={{ borderRadius: 0, borderBottom: "var(--border-width) solid var(--ink)" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "1.25rem 1.5rem",
          textAlign: "left",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {axis.category}
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: axis.score >= 70 ? "var(--accent)" : axis.score >= 40 ? "var(--ink)" : "#E74C3C",
            }}
          >
            {axis.score}
          </span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <ConfidenceBadge value={conf} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--accent)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            Why? <ChevronDown size={14} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
          </span>
        </span>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          style={{ padding: "0 1.5rem 1.5rem", borderTop: "1px dashed var(--border)" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginTop: "1.25rem" }}>
            <div>
              <div className="uppercase-label" style={{ marginBottom: "0.75rem", color: "var(--accent)" }}>Evidence</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {(axis.evidence ?? []).map((e, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                    <CheckCircle size={15} color="var(--accent)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>{e}</span>
                  </li>
                ))}
                {(axis.evidence ?? []).length === 0 && <li style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)" }}>No strong evidence detected.</li>}
              </ul>
            </div>

            <div>
              <div className="uppercase-label" style={{ marginBottom: "0.75rem", color: "#E74C3C" }}>Missing</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {(axis.missing ?? []).map((m, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                    <span style={{ color: "#E74C3C", fontWeight: 700 }}>•</span>
                    <span>{m}</span>
                  </li>
                ))}
                {(axis.missing ?? []).length === 0 && <li style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)" }}>Nothing notable missing.</li>}
              </ul>
            </div>

            <div>
              <div className="uppercase-label" style={{ marginBottom: "0.75rem" }}>Recommendations</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {(axis.suggestions ?? []).map((r, i) => (
                  <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700, color: "var(--ink)" }}>{r.title}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", marginLeft: "0.4rem" }}>{r.impact}</span>
                    <div style={{ color: "var(--muted)", fontSize: "0.8rem", marginTop: "0.15rem" }}>{r.reason}</div>
                  </li>
                ))}
                {(axis.suggestions ?? []).length === 0 && <li style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)" }}>No specific recommendations.</li>}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ─── Improvement Impact (Feature 7) ──────────────────────────────── */

function ImpactProjection({ scores, overall }: { scores: AxisScore[]; overall: number }) {
  const projections = scores
    .map((s) => {
      const gain = (s.suggestions ?? []).reduce((acc, r) => acc + parseImpact(r.impact), 0);
      return { category: s.category, current: s.score, projected: clamp(s.score + gain), gain };
    })
    .filter((p) => p.gain > 0);

  if (projections.length === 0) return null;

  const totalGain = Math.min(20, projections.reduce((acc, p) => acc + p.gain, 0));
  const projectedOverall = clamp(overall + totalGain);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ borderRadius: 0, marginBottom: "3rem", padding: "2rem", borderLeft: "6px solid var(--accent)" }}>
      <div className="uppercase-label" style={{ marginBottom: "1.25rem" }}>Improvement Impact</div>

      {/* Now → Potential */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Now</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, lineHeight: 1 }}>{overall}</div>
        </div>
        <ArrowRight size={24} color="var(--accent)" />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Potential</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, lineHeight: 1, color: "var(--accent)" }}>{projectedOverall}</div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--accent)",
            border: "1.5px solid var(--accent)",
            borderRadius: "2px",
            padding: "0.3rem 0.7rem",
          }}
        >
          +{totalGain}
        </div>
      </div>

      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--muted)", marginBottom: "1.25rem" }}>
        If you act on the recommendations below, your score could climb across these axes:
      </p>

      {/* Per-axis gains */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {projections.map((p) => (
          <div key={p.category} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ width: "130px", fontFamily: "var(--font-mono)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.03em", flexShrink: 0 }}>{p.category}</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem" }}>{p.current}</span>
            <ArrowRight size={12} color="var(--muted)" />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: "var(--accent)" }}>{p.projected}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent)", marginLeft: "auto" }}>+{p.gain}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── AnalysisView (full publicly-available analysis) ──────────────── */

export function AnalysisView({ analysis, onReanalyze }: { analysis: AnalysisData; onReanalyze?: () => void }) {
  const overallConf = analysis.confidence ?? (analysis ? Math.round((analysis.confidenceScore ?? 0) * 100) : 0);

  return (
    <>
      {/* Score + Radar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 0, marginBottom: "3rem" }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ borderRadius: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "3rem", borderRight: "var(--border-width) solid var(--ink)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "6rem", fontWeight: 700, lineHeight: 1, color: analysis.overallScore >= 70 ? "var(--accent)" : analysis.overallScore >= 40 ? "var(--ink)" : "#E74C3C" }}>
            {analysis.overallScore}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginTop: "0.5rem" }}>out of 100</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, marginTop: "1rem" }}>{analysis.engineerLevel}</div>
          <div style={{ marginTop: "1rem" }}><ConfidenceBadge value={overallConf} /></div>
          {onReanalyze && (
            <button onClick={onReanalyze} className="btn-secondary" style={{ marginTop: "2rem" }}>
              <RefreshCw size={14} />
              Re-analyze
            </button>
          )}
          {analysis.username && (
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", justifyContent: "center" }}>
              <Link href={`/u/${analysis.username}`} className="btn-secondary" style={{ fontSize: "0.78rem", padding: "0.5rem 0.9rem" }}>
                View public profile
              </Link>
              <Link href={`/report/${analysis.username}`} className="btn-secondary" style={{ fontSize: "0.78rem", padding: "0.5rem 0.9rem" }}>
                Download report
              </Link>
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card" style={{ borderRadius: 0, padding: "2rem" }}>
          <div className="uppercase-label" style={{ marginBottom: "1rem" }}>Skill Radar</div>
          <SkillRadar scores={analysis.scores} />
        </motion.div>
      </div>

      {/* Explanation (Feature 1) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ borderRadius: 0, marginBottom: "3rem", padding: "2rem" }}>
        <div className="uppercase-label" style={{ marginBottom: "1rem" }}>Overall Summary</div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.7, color: "var(--ink)", marginBottom: "1.5rem" }}>{analysis.summary}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          <div>
            <div className="uppercase-label" style={{ marginBottom: "0.75rem", color: "var(--accent)" }}><CheckCircle size={14} style={{ display: "inline" }} /> Strengths</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {(analysis.strengths ?? []).map((s, i) => (
                <li key={i} style={{ display: "flex", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                  <CheckCircle size={15} color="var(--accent)" style={{ flexShrink: 0, marginTop: "2px" }} /><span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="uppercase-label" style={{ marginBottom: "0.75rem", color: "#E74C3C" }}><AlertTriangle size={14} style={{ display: "inline" }} /> Missing</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {(analysis.weaknesses ?? []).map((w, i) => (
                <li key={i} style={{ display: "flex", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                  <span style={{ color: "#E74C3C", fontWeight: 700 }}>•</span><span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {(analysis.recommendations ?? []).length > 0 && (
          <div style={{ marginTop: "1.5rem" }}>
            <div className="uppercase-label" style={{ marginBottom: "0.75rem" }}><Sparkles size={14} style={{ display: "inline" }} /> Recommendations</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {analysis.recommendations.map((r, i) => (
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
      </motion.div>

      {/* Improvement Impact (Feature 7) */}
      <ImpactProjection scores={analysis.scores} overall={analysis.overallScore} />

      {/* Why panels (Feature 2 + 5) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="uppercase-label" style={{ marginBottom: "1.5rem" }}>Category Breakdown — tap Why? for evidence</div>
        <div style={{ border: "var(--border-width) solid var(--ink)", borderRadius: "2px", overflow: "hidden" }}>
          {analysis.scores.map((s, i) => (
            <WhyPanel key={i} axis={s} />
          ))}
        </div>
      </motion.div>

      {/* Repository Intelligence (Feature 3) */}
      {(analysis.repoScores ?? []).length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: "3rem" }}>
          <div className="uppercase-label" style={{ marginBottom: "1.5rem" }}>Repository Intelligence</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 0, border: "var(--border-width) solid var(--ink)", borderRadius: "2px", overflow: "hidden" }}>
            {analysis.repoScores.map((rs, i) => {
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
                    <a href={rs.repository.htmlUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)", textDecoration: "none" }}>{rs.repository.fullName}</a>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: (rs.overall ?? 0) >= 70 ? "var(--accent)" : (rs.overall ?? 0) >= 40 ? "var(--ink)" : "#E74C3C" }}>{rs.overall}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", marginBottom: "1rem" }}>Estimated Repository Score</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
                    {subScores.map((ss) => (
                      <div key={ss.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", width: "110px", textTransform: "uppercase", letterSpacing: "0.03em" }}>{ss.label}</span>
                        <div style={{ flex: 1, height: "6px", background: "var(--paper)", border: "1.5px solid var(--ink)" }}>
                          <div style={{ height: "100%", width: `${ss.value ?? 0}%`, background: (ss.value ?? 0) >= 70 ? "var(--accent)" : (ss.value ?? 0) >= 40 ? "var(--ink)" : "#E74C3C" }} />
                        </div>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700, width: "28px", textAlign: "right" }}>{ss.value ?? "—"}</span>
                      </div>
                    ))}
                  </div>
                  {(rs.strengths ?? []).length > 0 && (
                    <div style={{ marginBottom: "0.5rem" }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent)", marginBottom: "0.3rem" }}>Strengths</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.4 }}>{(rs.strengths ?? []).join(" · ")}</div>
                    </div>
                  )}
                  {(rs.weaknesses ?? []).length > 0 && (
                    <div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "#E74C3C", marginBottom: "0.3rem" }}>Weaknesses</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.4 }}>{(rs.weaknesses ?? []).join(" · ")}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </>
  );
}
