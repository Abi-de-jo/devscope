"use client";

import { useState } from "react";
import Link from "next/link";
import { SkillRadar } from "@/components/skill-radar";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ChevronDown,
  ArrowRight,
  RefreshCw,
  TrendingUp,
  Shield,
  Target,
  Zap,
} from "lucide-react";

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
  confidenceScore: number | null; // 0-1
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

function scoreColor(n: number): string {
  if (n >= 80) return "var(--accent)";
  if (n >= 60) return "var(--ink)";
  if (n >= 40) return "#D4A017";
  return "#E74C3C";
}

function scoreGrade(n: number): string {
  if (n >= 90) return "Elite";
  if (n >= 80) return "Strong";
  if (n >= 70) return "Solid";
  if (n >= 60) return "Good";
  if (n >= 50) return "Fair";
  if (n >= 40) return "Needs work";
  return "Critical";
}

function confidenceLabel(c: number): { label: string; color: string } {
  if (c >= 75) return { label: "High", color: "var(--accent)" };
  if (c >= 50) return { label: "Medium", color: "var(--ink)" };
  return { label: "Low", color: "#E74C3C" };
}

/* ─── Reusable sub-components ──────────────────────────────────────── */

function SectionLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="uppercase-label" style={{ marginBottom: "1.25rem", ...style }}>
      {children}
    </div>
  );
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
        fontSize: "0.65rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color,
        border: `1.5px solid ${color}`,
        borderRadius: 0,
        padding: "0.2rem 0.55rem",
        background: "var(--paper)",
      }}
    >
      {label} · {value}%
    </span>
  );
}

/* ─── Score Hero ───────────────────────────────────────────────────── */

function ScoreHero({
  analysis,
  onReanalyze,
}: {
  analysis: AnalysisData;
  onReanalyze?: () => void;
}) {
  const overallConf =
    analysis.confidence ??
    (analysis ? Math.round((analysis.confidenceScore ?? 0) * 100) : 0);
  const color = scoreColor(analysis.overallScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        border: "var(--border-width) solid var(--ink)",
        boxShadow: "var(--shadow-md)",
        marginBottom: "3rem",
        overflow: "hidden",
      }}
      className="score-hero-grid"
    >
      {/* Left: Score + Level + Actions */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 2rem",
          background: "var(--paper-alt)",
          position: "relative",
        }}
      >
        {/* Score number */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 10vw, 7rem)",
            fontWeight: 700,
            lineHeight: 1,
            color,
            letterSpacing: "-0.04em",
          }}
        >
          {analysis.overallScore}
        </div>

        {/* Grade label */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--muted)",
            marginTop: "0.3rem",
          }}
        >
          out of 100 · {scoreGrade(analysis.overallScore)}
        </div>

        {/* Engineer level */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.35rem",
            fontWeight: 700,
            marginTop: "1rem",
            letterSpacing: "-0.01em",
          }}
        >
          {analysis.engineerLevel}
        </div>

        {/* Confidence */}
        <div style={{ marginTop: "0.75rem" }}>
          <ConfidenceBadge value={overallConf} />
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "0.6rem",
            marginTop: "1.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {onReanalyze && (
            <button
              onClick={onReanalyze}
              className="btn-secondary"
              style={{
                fontSize: "0.72rem",
                padding: "0.5rem 0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <RefreshCw size={12} />
              Re-analyze
            </button>
          )}
          {analysis.username && (
            <>
              <Link
                href={`/u/${analysis.username}`}
                className="btn-secondary"
                style={{ fontSize: "0.72rem", padding: "0.5rem 0.9rem" }}
              >
                Public profile
              </Link>
              <Link
                href={`/report/${analysis.username}`}
                className="btn-secondary"
                style={{ fontSize: "0.72rem", padding: "0.5rem 0.9rem" }}
              >
                Report
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Right: Skill Radar */}
      <div
        style={{
          padding: "1.5rem",
          background: "var(--paper)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SectionLabel style={{ marginBottom: "0.5rem" }}>
          Skill Radar
        </SectionLabel>
        <div style={{ flex: 1, minHeight: "300px" }}>
          <SkillRadar scores={analysis.scores} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .score-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

/* ─── Summary Section ──────────────────────────────────────────────── */

function SummarySection({ analysis }: { analysis: AnalysisData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      style={{ marginBottom: "3rem" }}
    >
      <SectionLabel>Overall Summary</SectionLabel>

      {/* Summary text */}
      <div
        className="card"
        style={{
          borderRadius: 0,
          padding: "1.75rem",
          marginBottom: "1.25rem",
          fontFamily: "var(--font-body)",
          fontSize: "1.05rem",
          lineHeight: 1.7,
          color: "var(--ink)",
        }}
      >
        {analysis.summary}
      </div>

      {/* Strengths + Weaknesses side by side */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
          marginBottom: "1.25rem",
        }}
        className="summary-cols"
      >
        {/* Strengths */}
        <div
          className="card"
          style={{
            borderRadius: 0,
            borderLeft: "5px solid var(--accent)",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <CheckCircle size={16} color="var(--accent)" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--accent)",
              }}
            >
              Strengths
            </span>
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {(analysis.strengths ?? []).map((s, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  lineHeight: 1.5,
                }}
              >
                <CheckCircle
                  size={14}
                  color="var(--accent)"
                  style={{ flexShrink: 0, marginTop: "3px" }}
                />
                <span>{s}</span>
              </li>
            ))}
            {(analysis.strengths ?? []).length === 0 && (
              <li
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  color: "var(--muted)",
                }}
              >
                No strengths detected.
              </li>
            )}
          </ul>
        </div>

        {/* Weaknesses */}
        <div
          className="card"
          style={{
            borderRadius: 0,
            borderLeft: "5px solid #E74C3C",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <AlertTriangle size={16} color="#E74C3C" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#E74C3C",
              }}
            >
              Weaknesses
            </span>
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {(analysis.weaknesses ?? []).map((w, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    color: "#E74C3C",
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  •
                </span>
                <span>{w}</span>
              </li>
            ))}
            {(analysis.weaknesses ?? []).length === 0 && (
              <li
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  color: "var(--muted)",
                }}
              >
                Nothing notable missing.
              </li>
            )}
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .summary-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Recommendations */}
      {(analysis.recommendations ?? []).length > 0 && (
        <div
          className="card"
          style={{
            borderRadius: 0,
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem",
            }}
          >
            <Sparkles size={16} color="var(--accent)" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Top Recommendations
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {analysis.recommendations.map((r, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.85rem",
                  border: "var(--border-width) solid var(--ink)",
                  borderRadius: 0,
                  padding: "1rem 1.25rem",
                  background: "var(--paper-alt)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    border: "1.5px solid var(--accent)",
                    borderRadius: 0,
                    padding: "0.15rem 0.5rem",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.impact}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    {r.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.82rem",
                      color: "var(--muted)",
                      marginTop: "0.2rem",
                    }}
                  >
                    {r.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Improvement Impact ───────────────────────────────────────────── */

function ImpactProjection({
  scores,
  overall,
}: {
  scores: AxisScore[];
  overall: number;
}) {
  const projections = scores
    .map((s) => {
      const gain = (s.suggestions ?? []).reduce(
        (acc, r) => acc + parseImpact(r.impact),
        0
      );
      return {
        category: s.category,
        current: s.score,
        projected: clamp(s.score + gain),
        gain,
      };
    })
    .filter((p) => p.gain > 0);

  if (projections.length === 0) return null;

  const totalGain = Math.min(
    20,
    projections.reduce((acc, p) => acc + p.gain, 0)
  );
  const projectedOverall = clamp(overall + totalGain);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="card"
      style={{
        borderRadius: 0,
        marginBottom: "3rem",
        padding: "2rem",
        borderLeft: "6px solid var(--accent)",
      }}
    >
      <SectionLabel>Improvement Impact</SectionLabel>

      {/* Now → Potential hero */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          padding: "1rem 0",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Now
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.75rem",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {overall}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ flex: 1, minWidth: "120px", position: "relative" }}>
          <div
            style={{
              height: "8px",
              background: "var(--paper)",
              border: "1.5px solid var(--ink)",
              borderRadius: 0,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${overall}%`,
                background: "var(--ink)",
                transition: "width 0.6s ease",
              }}
            />
          </div>
          <div
            style={{
              height: "8px",
              marginTop: "4px",
              background: "var(--paper)",
              border: "1.5px solid var(--accent)",
              borderRadius: 0,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${projectedOverall}%`,
                background: "var(--accent)",
                transition: "width 0.6s ease",
              }}
            />
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Potential
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.75rem",
              fontWeight: 700,
              lineHeight: 1,
              color: "var(--accent)",
            }}
          >
            {projectedOverall}
          </div>
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--accent)",
            border: "1.5px solid var(--accent)",
            borderRadius: 0,
            padding: "0.4rem 0.75rem",
          }}
        >
          +{totalGain}
        </div>
      </div>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.88rem",
          color: "var(--muted)",
          marginBottom: "1.5rem",
        }}
      >
        Act on the recommendations below to climb across these axes:
      </p>

      {/* Per-axis gains as mini bars */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        {projections.map((p) => (
          <div
            key={p.category}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span
              style={{
                width: "120px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                flexShrink: 0,
              }}
            >
              {p.category}
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.95rem",
                width: "28px",
                textAlign: "right",
              }}
            >
              {p.current}
            </span>
            <div
              style={{
                flex: 1,
                height: "6px",
                background: "var(--paper)",
                border: "1.5px solid var(--ink)",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${p.current}%`,
                  background: "var(--ink)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
              <div
                style={{
                  height: "100%",
                  width: `${p.projected}%`,
                  background: "var(--accent)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: 0.5,
                }}
              />
            </div>
            <ArrowRight size={12} color="var(--muted)" />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "var(--accent)",
                width: "28px",
              }}
            >
              {p.projected}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--accent)",
                fontWeight: 700,
                marginLeft: "auto",
              }}
            >
              +{p.gain}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Axis Score Cards (replaces old accordion) ────────────────────── */

function AxisScoreCard({ axis, index }: { axis: AxisScore; index: number }) {
  const [open, setOpen] = useState(false);
  const conf = Math.round((axis.confidence ?? 0) * 100);
  const color = scoreColor(axis.score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="card card-hover"
      style={{
        borderRadius: 0,
        padding: "1.25rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
      onClick={() => setOpen((o) => !o)}
    >
      {/* Header: category + score */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {axis.category}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.75rem",
            fontWeight: 700,
            color,
            lineHeight: 1,
          }}
        >
          {axis.score}
        </span>
      </div>

      {/* Score bar */}
      <div
        style={{
          height: "8px",
          background: "var(--paper)",
          border: "1.5px solid var(--ink)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${axis.score}%`,
            background: color,
            transition: "width 0.6s ease",
          }}
        />
      </div>

      {/* Confidence + expand hint */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ConfidenceBadge value={conf} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          Why?{" "}
          <ChevronDown
            size={12}
            style={{
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform 0.15s",
            }}
          />
        </span>
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              borderTop: "1px dashed var(--border)",
              paddingTop: "1rem",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1rem",
              }}
              className="axis-detail-grid"
            >
              {/* Evidence */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--accent)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Evidence
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.35rem",
                  }}
                >
                  {(axis.evidence ?? []).map((e, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: "0.4rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        lineHeight: 1.4,
                      }}
                    >
                      <CheckCircle
                        size={12}
                        color="var(--accent)"
                        style={{ flexShrink: 0, marginTop: "2px" }}
                      />
                      <span>{e}</span>
                    </li>
                  ))}
                  {(axis.evidence ?? []).length === 0 && (
                    <li
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                      }}
                    >
                      No strong evidence detected.
                    </li>
                  )}
                </ul>
              </div>

              {/* Missing */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#E74C3C",
                    marginBottom: "0.5rem",
                  }}
                >
                  Missing
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.35rem",
                  }}
                >
                  {(axis.missing ?? []).map((m, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: "0.4rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        lineHeight: 1.4,
                      }}
                    >
                      <span
                        style={{
                          color: "#E74C3C",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        •
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                  {(axis.missing ?? []).length === 0 && (
                    <li
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                      }}
                    >
                      Nothing notable missing.
                    </li>
                  )}
                </ul>
              </div>

              {/* Recommendations */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.5rem",
                  }}
                >
                  Suggestions
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {(axis.suggestions ?? []).map((r, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        lineHeight: 1.4,
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>{r.title}</span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: "var(--accent)",
                          marginLeft: "0.35rem",
                        }}
                      >
                        {r.impact}
                      </span>
                      <div style={{ color: "var(--muted)", fontSize: "0.72rem" }}>
                        {r.reason}
                      </div>
                    </li>
                  ))}
                  {(axis.suggestions ?? []).length === 0 && (
                    <li
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                      }}
                    >
                      No specific suggestions.
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <style>{`
              @media (max-width: 700px) {
                .axis-detail-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AxisBreakdown({ scores }: { scores: AxisScore[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{ marginBottom: "3rem" }}
    >
      <SectionLabel>Category Breakdown — tap any card for details</SectionLabel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1rem",
        }}
      >
        {scores.map((s, i) => (
          <AxisScoreCard key={i} axis={s} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Repository Intelligence ──────────────────────────────────────── */

function RepoIntelligence({ repoScores }: { repoScores: RepoScoreData[] }) {
  if (repoScores.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      style={{ marginBottom: "3rem" }}
    >
      <SectionLabel>Repository Intelligence</SectionLabel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 0,
          border: "var(--border-width) solid var(--ink)",
          overflow: "hidden",
        }}
      >
        {repoScores.map((rs, i) => {
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
            <div
              key={i}
              className="card"
              style={{
                borderRadius: 0,
                borderBottom: "var(--border-width) solid var(--ink)",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
                }}
              >
                <a
                  href={rs.repository.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "var(--ink)",
                    textDecoration: "none",
                  }}
                >
                  {rs.repository.fullName}
                </a>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: scoreColor(rs.overall ?? 0),
                  }}
                >
                  {rs.overall}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--muted)",
                  marginBottom: "1rem",
                }}
              >
                Estimated Repository Score
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  marginBottom: "1rem",
                }}
              >
                {subScores.map((ss) => (
                  <div
                    key={ss.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        width: "110px",
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                        flexShrink: 0,
                      }}
                    >
                      {ss.label}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: "6px",
                        background: "var(--paper)",
                        border: "1.5px solid var(--ink)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${ss.value ?? 0}%`,
                          background: scoreColor(ss.value ?? 0),
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        width: "28px",
                        textAlign: "right",
                      }}
                    >
                      {ss.value ?? "—"}
                    </span>
                  </div>
                ))}
              </div>
              {(rs.strengths ?? []).length > 0 && (
                <div style={{ marginBottom: "0.5rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--accent)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Strengths
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {(rs.strengths ?? []).join(" · ")}
                  </div>
                </div>
              )}
              {(rs.weaknesses ?? []).length > 0 && (
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "#E74C3C",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Weaknesses
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {(rs.weaknesses ?? []).join(" · ")}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── AnalysisView (full publicly-available analysis) ──────────────── */

export function AnalysisView({
  analysis,
  onReanalyze,
}: {
  analysis: AnalysisData;
  onReanalyze?: () => void;
}) {
  return (
    <>
      {/* 1. Score Hero — score number + radar side-by-side */}
      <ScoreHero analysis={analysis} onReanalyze={onReanalyze} />

      {/* 2. Summary — text + strengths/weaknesses cards + recommendations */}
      <SummarySection analysis={analysis} />

      {/* 3. Improvement Impact — Now → Potential */}
      <ImpactProjection
        scores={analysis.scores}
        overall={analysis.overallScore}
      />

      {/* 4. Category Breakdown — visual grid of axis cards */}
      <AxisBreakdown scores={analysis.scores} />

      {/* 5. Repository Intelligence */}
      <RepoIntelligence repoScores={analysis.repoScores ?? []} />
    </>
  );
}
