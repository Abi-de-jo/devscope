"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SkillRadar } from "@/components/skill-radar";
import { motion } from "framer-motion";
import {
  ArrowRight,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface AnalysisData {
  id: string;
  overallScore: number;
  engineerLevel: string;
  confidenceScore: number;
  strengths: string[];
  gaps: string[];
  summary: string;
  completedAt: string;
  scores: Array<{
    category: string;
    score: number;
    confidence: number;
    evidence: string[];
    suggestions: string[];
  }>;
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [scoring, setScoring] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/sync", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        // Auto-score after sync
        handleScore();
      }
    } catch (err) {
      console.error("Sync failed:", err);
    } finally {
      setSyncing(false);
    }
  };

  const handleScore = async () => {
    setScoring(true);
    try {
      const res = await fetch("/api/score", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        // Reload page to show results
        window.location.reload();
      }
    } catch (err) {
      console.error("Score failed:", err);
    } finally {
      setScoring(false);
    }
  };

  if (isPending) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--muted)",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "3rem 1.5rem",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "3rem" }}
      >
        <div className="uppercase-label" style={{ marginBottom: "0.75rem" }}>
          Dashboard
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}
        >
          Your Engineering Score
        </h1>

        {!analysis && (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="btn-primary"
            >
              <RefreshCw size={16} className={syncing ? "animate-spin" : ""} />
              {syncing ? "Syncing GitHub..." : "Sync GitHub Repos"}
            </button>
          </div>
        )}
      </motion.div>

      {analysis ? (
        <>
          {/* Score + Radar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "0",
              marginBottom: "3rem",
            }}
          >
            {/* Score Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
              style={{
                borderRadius: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "3rem",
                borderRight:
                  "var(--border-width) solid var(--ink)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "6rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  color:
                    analysis.overallScore >= 70
                      ? "var(--accent)"
                      : analysis.overallScore >= 40
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
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--muted)",
                  marginTop: "0.5rem",
                }}
              >
                Confidence: {Math.round(analysis.confidenceScore * 100)}%
              </div>

              <button
                onClick={handleScore}
                disabled={scoring}
                className="btn-secondary"
                style={{ marginTop: "2rem" }}
              >
                <RefreshCw
                  size={14}
                  className={scoring ? "animate-spin" : ""}
                />
                {scoring ? "Re-scoring..." : "Re-analyze"}
              </button>
            </motion.div>

            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
              style={{
                borderRadius: 0,
                padding: "2rem",
              }}
            >
              <div
                className="uppercase-label"
                style={{ marginBottom: "1rem" }}
              >
                Skill Radar
              </div>
              <SkillRadar scores={analysis.scores} />
            </motion.div>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
                color: "var(--ink)",
              }}
            >
              {analysis.summary}
            </p>
          </motion.div>

          {/* Strengths & Gaps */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "0",
              marginBottom: "3rem",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
              style={{
                borderRadius: 0,
                borderRight: "var(--border-width) solid var(--ink)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <CheckCircle size={18} color="var(--accent)" />
                <span className="uppercase-label">Top Strengths</span>
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
                {analysis.strengths.map((s, i) => (
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
                        top: "0.2rem",
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
              style={{ borderRadius: 0 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <AlertTriangle size={18} color="#E74C3C" />
                <span className="uppercase-label">Gaps to Fix</span>
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
                {analysis.gaps.map((g, i) => (
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
                        top: "0.2rem",
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
            </motion.div>
          </div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="uppercase-label" style={{ marginBottom: "1.5rem" }}>
              Category Breakdown
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "0",
              }}
            >
              {analysis.scores.map((s, i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    borderRadius: 0,
                    borderBottom: "var(--border-width) solid var(--ink)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {s.category}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color:
                          s.score >= 70
                            ? "var(--accent)"
                            : s.score >= 40
                            ? "var(--ink)"
                            : "#E74C3C",
                      }}
                    >
                      {s.score}
                    </span>
                  </div>

                  {/* Score bar */}
                  <div
                    style={{
                      height: "4px",
                      backgroundColor: "var(--paper)",
                      border: "var(--border-width) solid var(--ink)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${s.score}%`,
                        backgroundColor:
                          s.score >= 70
                            ? "var(--accent)"
                            : s.score >= 40
                            ? "var(--ink)"
                            : "#E74C3C",
                      }}
                    />
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.evidence[0] || "No evidence available"}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      ) : (
        /* No analysis yet */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
            No analysis yet
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--muted)",
              maxWidth: "400px",
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            Connect your GitHub account and sync your public repos to get your
            Engineering Score.
          </p>
          <button onClick={handleSync} disabled={syncing} className="btn-primary">
            <RefreshCw size={16} className={syncing ? "animate-spin" : ""} />
            {syncing ? "Syncing..." : "Sync & Score"}
            <ArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
}
