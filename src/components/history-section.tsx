"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AnalysisListItem {
  id: string;
  createdAt: string;
  overallScore: number | null;
  confidence: number | null;
  confidenceScore: number | null;
  costCents: number | null;
}

export function HistorySection() {
  const [items, setItems] = useState<AnalysisListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [aId, setAId] = useState<string>("");
  const [bId, setBId] = useState<string>("");
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    fetch("/api/analyses")
      .then(async (r) => {
        if (!r.ok) {
          const { handleApiResponse } = await import("@/lib/errors");
          await handleApiResponse(r);
          setLoading(false);
          return;
        }
        const d = await r.json();
        const arr: AnalysisListItem[] = d.analyses ?? [];
        setItems(arr);
        if (arr.length >= 2) {
          setBId(arr[0].id);
          setAId(arr[arr.length - 1].id);
        }
        setLoading(false);
      })
      .catch(async () => {
        const { showErrorToast } = await import("@/lib/errors");
        showErrorToast(null);
        setLoading(false);
      });
  }, []);

  const a = items.find((x) => x.id === aId);
  const b = items.find((x) => x.id === bId);

  const fmt = (n: number | null) => (n == null ? "—" : Math.round(n));

  const scoreDiff =
    a && b ? (b.overallScore ?? 0) - (a.overallScore ?? 0) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{ marginTop: "3rem" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
        }}
      >
        <div
          className="uppercase-label"
          style={{ marginBottom: 0 }}
        >
          Analysis History
        </div>
        {items.length >= 2 && (
          <button
            onClick={() => setShowCompare((s) => !s)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--accent)",
              background: "none",
              border: "1.5px solid var(--accent)",
              borderRadius: 0,
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
            }}
          >
            {showCompare ? "Hide compare" : "Compare snapshots"}
          </button>
        )}
      </div>

      {/* Timeline */}
      <div
        style={{
          border: "var(--border-width) solid var(--ink)",
          overflow: "hidden",
        }}
      >
        {loading && (
          <div
            className="card"
            style={{
              borderRadius: 0,
              padding: "1.25rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--muted)",
            }}
          >
            Loading history…
          </div>
        )}
        {!loading && items.length === 0 && (
          <div
            className="card"
            style={{
              borderRadius: 0,
              padding: "1.5rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.88rem",
              color: "var(--muted)",
              textAlign: "center",
            }}
          >
            No past analyses yet. Re-run scoring over time to build your
            engineering timeline.
          </div>
        )}
        {items.map((it, i) => (
          <div
            key={it.id}
            className="card"
            style={{
              borderRadius: 0,
              borderBottom:
                i < items.length - 1
                  ? "var(--border-width) solid var(--ink)"
                  : "none",
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "1.75rem",
                  height: "1.75rem",
                  border: "var(--border-width) solid var(--ink)",
                  borderRadius: "var(--radius)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--paper)",
                  flexShrink: 0,
                }}
              >
                <Clock size={12} strokeWidth={2} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                  }}
                >
                  Snapshot {items.length - i}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {new Date(it.createdAt).toLocaleDateString()} ·{" "}
                  {new Date(it.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1.25rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
              }}
            >
              <span>
                Score{" "}
                <strong style={{ color: "var(--ink)" }}>
                  {fmt(it.overallScore)}
                </strong>
              </span>
              <span>
                Conf{" "}
                <strong>
                  {fmt(it.confidence ?? it.confidenceScore)}%
                </strong>
              </span>
              {it.costCents != null && (
                <span>
                  Cost{" "}
                  <strong>${(it.costCents / 100).toFixed(2)}</strong>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Snapshot Compare (F9) */}
      {showCompare && items.length >= 2 && a && b && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="card"
          style={{
            borderRadius: 0,
            padding: "1.5rem",
            marginTop: "1rem",
            borderLeft: "5px solid var(--accent)",
          }}
        >
          <div
            className="uppercase-label"
            style={{ marginBottom: "1rem" }}
          >
            Compare Snapshots
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              marginBottom: "1rem",
              alignItems: "center",
            }}
          >
            <select
              value={aId}
              onChange={(e) => setAId(e.target.value)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                padding: "0.4rem 0.6rem",
                border: "var(--border-width) solid var(--ink)",
                borderRadius: 0,
                background: "var(--paper)",
              }}
            >
              {items.map((it, i) => (
                <option key={it.id} value={it.id}>
                  Snapshot {items.length - i}
                </option>
              ))}
            </select>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--muted)",
              }}
            >
              vs
            </span>
            <select
              value={bId}
              onChange={(e) => setBId(e.target.value)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                padding: "0.4rem 0.6rem",
                border: "var(--border-width) solid var(--ink)",
                borderRadius: 0,
                background: "var(--paper)",
              }}
            >
              {items.map((it, i) => (
                <option key={it.id} value={it.id}>
                  Snapshot {items.length - i}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>Score:</span>
              <strong>{fmt(a.overallScore)}</strong>
              <ArrowRight size={14} color="var(--muted)" />
              <strong style={{ color: "var(--accent)" }}>
                {fmt(b.overallScore)}
              </strong>
              <span
                style={{
                  color:
                    scoreDiff > 0
                      ? "var(--accent)"
                      : scoreDiff < 0
                        ? "#E74C3C"
                        : "var(--muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.2rem",
                }}
              >
                {scoreDiff > 0 ? (
                  <TrendingUp size={12} />
                ) : scoreDiff < 0 ? (
                  <TrendingDown size={12} />
                ) : (
                  <Minus size={12} />
                )}
                {scoreDiff >= 0 ? "+" : ""}
                {Math.round(scoreDiff)}
              </span>
            </div>
            <div>
              Confidence:{" "}
              <strong>
                {fmt(a.confidence ?? a.confidenceScore)}%
              </strong>{" "}
              →{" "}
              <strong style={{ color: "var(--accent)" }}>
                {fmt(b.confidence ?? b.confidenceScore)}%
              </strong>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
