"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  useEffect(() => {
    fetch("/api/analyses")
      .then((r) => r.json())
      .then((d) => {
        const arr: AnalysisListItem[] = d.analyses ?? [];
        setItems(arr);
        if (arr.length >= 2) {
          setBId(arr[0].id);
          setAId(arr[arr.length - 1].id);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const a = items.find((x) => x.id === aId);
  const b = items.find((x) => x.id === bId);

  const fmt = (n: number | null) => (n == null ? "—" : Math.round(n));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: "4rem" }}>
      <div className="uppercase-label" style={{ marginBottom: "1.5rem" }}>Analysis History</div>

      {/* Timeline (F8) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "var(--border-width) solid var(--ink)", borderRadius: "2px", overflow: "hidden", marginBottom: "2rem" }}>
        {loading && <div className="card" style={{ borderRadius: 0, padding: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--muted)" }}>Loading history…</div>}
        {!loading && items.length === 0 && (
          <div className="card" style={{ borderRadius: 0, padding: "1.5rem", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--muted)" }}>
            No past analyses yet. Re-run scoring over time to build your engineering timeline.
          </div>
        )}
        {items.map((it, i) => (
          <div key={it.id} className="card" style={{ borderRadius: 0, borderBottom: i < items.length - 1 ? "var(--border-width) solid var(--ink)" : "none", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem" }}>Snapshot {items.length - i}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{new Date(it.createdAt).toLocaleDateString()} · {new Date(it.createdAt).toLocaleTimeString()}</div>
            </div>
            <div style={{ display: "flex", gap: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
              <span>Score <strong>{fmt(it.overallScore)}</strong></span>
              <span>Conf <strong>{fmt(it.confidence ?? it.confidenceScore)}%</strong></span>
              {it.costCents != null && <span>Cost <strong>${(it.costCents / 100).toFixed(2)}</strong></span>}
            </div>
          </div>
        ))}
      </div>

      {/* Snapshot Compare (F9) */}
      {items.length >= 2 && a && b && (
        <div className="card" style={{ borderRadius: 0, padding: "1.5rem" }}>
          <div className="uppercase-label" style={{ marginBottom: "1rem" }}>Compare Snapshots</div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <select value={aId} onChange={(e) => setAId(e.target.value)} style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", padding: "0.4rem", border: "var(--border-width) solid var(--ink)" }}>
              {items.map((it, i) => <option key={it.id} value={it.id}>Snapshot {items.length - i}</option>)}
            </select>
            <span style={{ alignSelf: "center", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--muted)" }}>vs</span>
            <select value={bId} onChange={(e) => setBId(e.target.value)} style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", padding: "0.4rem", border: "var(--border-width) solid var(--ink)" }}>
              {items.map((it, i) => <option key={it.id} value={it.id}>Snapshot {items.length - i}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", gap: "2rem", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
            <div>Score: <strong>{fmt(a.overallScore)}</strong> → <strong style={{ color: "var(--accent)" }}>{fmt(b.overallScore)}</strong>{" "}
              <span style={{ color: "var(--accent)" }}>
                ({((b.overallScore ?? 0) - (a.overallScore ?? 0)) >= 0 ? "+" : ""}{Math.round((b.overallScore ?? 0) - (a.overallScore ?? 0))})
              </span>
            </div>
            <div>Confidence: <strong>{fmt(a.confidence ?? a.confidenceScore)}%</strong> → <strong style={{ color: "var(--accent)" }}>{fmt(b.confidence ?? b.confidenceScore)}%</strong></div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
