"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Github,
  Brain,
  Database,
  LogIn,
  RefreshCw,
  Swords,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Shield,
  RotateCcw,
} from "lucide-react";

/* ─── Types ───────────────────────────────────────────────────────── */

interface LogEntry {
  id: string;
  action: string;
  detail: string | null;
  meta: Record<string, unknown> | null;
  status: string;
  costCents: number | null;
  createdAt: string;
}

interface LogResponse {
  entries: LogEntry[];
  token: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/* ─── Action metadata ─────────────────────────────────────────────── */

const ACTION_META: Record<
  string,
  { icon: typeof Github; label: string; color: string }
> = {
  github_api: { icon: Github, label: "GitHub API", color: "var(--ink)" },
  score_run: { icon: Brain, label: "AI Score", color: "var(--accent)" },
  cache_hit: { icon: Database, label: "Cache Hit", color: "#6BCB77" },
  cache_write: { icon: Database, label: "Cache Write", color: "#FFD93D" },
  auth_login: { icon: LogIn, label: "Sign In", color: "#6BCB77" },
  auth_refresh: { icon: RefreshCw, label: "Session Refresh", color: "var(--muted)" },
  sync: { icon: RefreshCw, label: "GitHub Sync", color: "var(--accent)" },
  compare: { icon: Swords, label: "Profile Compare", color: "#FF6B6B" },
};

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  success: { bg: "#6BCB7715", color: "#2D8A3E", label: "OK" },
  cached: { bg: "#FFD93D15", color: "#B8860B", label: "CACHED" },
  error: { bg: "#E74C3C15", color: "#E74C3C", label: "ERROR" },
};

/* ─── Component ───────────────────────────────────────────────────── */

export function ActivityLogView({ token }: { token: string }) {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const fetchLogs = useCallback(
    async (p: number) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/activity-log?page=${p}&limit=30`);
        if (res.ok) {
          const data: LogResponse = await res.json();
          setEntries(data.entries);
          setTotalPages(data.pagination.totalPages);
          setTotal(data.pagination.total);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchLogs(page);
  }, [page, fetchLogs]);

  const handleResetToken = async () => {
    const res = await fetch("/api/activity-log", { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      // Redirect to new URL
      window.location.href = `/account/activity/${data.token}`;
    }
    setShowResetConfirm(false);
  };

  const fmtTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "clamp(2rem, 6vw, 4rem) 1.5rem" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "2.5rem" }}
      >
        <div className="uppercase-label" style={{ marginBottom: "0.75rem" }}>
          <Shield size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: "0.4rem" }} />
          Transparency
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
          Activity Log
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--muted)", maxWidth: "600px", lineHeight: 1.6 }}>
          Every server-side action DevScope took on your behalf. GitHub API calls, AI scoring runs, cache events — nothing hidden.
        </p>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
          padding: "1rem 1.5rem",
          border: "1.5px solid var(--ink)",
          borderRadius: "2px",
          background: "var(--paper-alt)",
        }}
      >
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
            Total Events
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700 }}>
            {total}
          </div>
        </div>
        <div style={{ borderLeft: "1.5px solid var(--surface-1)" }} />
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
            Page
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700 }}>
            {page} / {totalPages || 1}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          style={{
            alignSelf: "center",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--muted)",
            background: "none",
            border: "1.5px solid var(--surface-1)",
            borderRadius: "2px",
            padding: "0.4rem 0.8rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <RotateCcw size={12} /> Reset Link
        </button>
      </motion.div>

      {/* Reset confirmation */}
      {showResetConfirm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          style={{
            marginBottom: "1.5rem",
            padding: "1rem 1.5rem",
            border: "1.5px solid #E74C3C",
            borderRadius: "2px",
            background: "#E74C3C08",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <AlertTriangle size={15} color="#E74C3C" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", color: "#E74C3C" }}>
              Reset activity log link?
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
            This will generate a new URL. The old link will stop working immediately.
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={handleResetToken}
              className="btn-primary"
              style={{ fontSize: "0.75rem", padding: "0.4rem 1rem" }}
            >
              Yes, Reset
            </button>
            <button
              type="button"
              onClick={() => setShowResetConfirm(false)}
              className="btn-secondary"
              style={{ fontSize: "0.75rem", padding: "0.4rem 1rem" }}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Log entries */}
      <div
        style={{
          border: "1.5px solid var(--ink)",
          borderRadius: "2px",
          overflow: "hidden",
          background: "var(--paper-alt)",
        }}
      >
        {/* Column header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "140px 120px 1fr 90px",
            gap: "1rem",
            padding: "0.75rem 1.5rem",
            borderBottom: "1.5px solid var(--ink)",
            background: "var(--ink)",
            color: "var(--paper)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          <span>Time</span>
          <span>Action</span>
          <span>Detail</span>
          <span style={{ textAlign: "right" }}>Status</span>
        </div>

        {loading ? (
          // Skeleton rows
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`skel-${i}`}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 120px 1fr 90px",
                gap: "1rem",
                padding: "0.85rem 1.5rem",
                borderBottom: "1px solid var(--surface-1, #e0e0d8)",
                opacity: 0.4,
              }}
            >
              <div style={{ height: 14, background: "var(--surface-1)", borderRadius: "2px", animation: "pulse 1.4s ease-in-out infinite" }} />
              <div style={{ height: 14, background: "var(--surface-1)", borderRadius: "2px", animation: "pulse 1.4s ease-in-out infinite 0.1s" }} />
              <div style={{ height: 14, background: "var(--surface-1)", borderRadius: "2px", animation: "pulse 1.4s ease-in-out infinite 0.2s" }} />
              <div style={{ height: 14, background: "var(--surface-1)", borderRadius: "2px", animation: "pulse 1.4s ease-in-out infinite 0.3s", justifySelf: "end" }} />
            </div>
          ))
        ) : entries.length === 0 ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
            <Clock size={32} color="var(--muted)" style={{ marginBottom: "1rem" }} />
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              No activity yet
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--muted)" }}>
              Actions will appear here once you sync GitHub or run a score.
            </p>
          </div>
        ) : (
          entries.map((entry, i) => {
            const meta = ACTION_META[entry.action] ?? {
              icon: Clock,
              label: entry.action,
              color: "var(--muted)",
            };
            const statusStyle = STATUS_STYLES[entry.status] ?? STATUS_STYLES.success;
            const Icon = meta.icon;

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 120px 1fr 90px",
                  gap: "1rem",
                  padding: "0.85rem 1.5rem",
                  borderBottom: "1px solid var(--surface-1, #e0e0d8)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  alignItems: "center",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "var(--paper)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "transparent";
                }}
              >
                {/* Time */}
                <span style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>
                  {fmtTime(entry.createdAt)}
                </span>

                {/* Action */}
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: meta.color, fontWeight: 600 }}>
                  <Icon size={13} />
                  {meta.label}
                </span>

                {/* Detail */}
                <span style={{ color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {entry.detail ?? "—"}
                </span>

                {/* Status + cost */}
                <span style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.15rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: statusStyle.color,
                      background: statusStyle.bg,
                      border: `1px solid ${statusStyle.color}30`,
                      borderRadius: "2px",
                      padding: "0.1rem 0.4rem",
                    }}
                  >
                    {statusStyle.label}
                  </span>
                  {entry.costCents != null && entry.costCents > 0 && (
                    <span style={{ fontSize: "0.65rem", color: "var(--muted)" }}>
                      ${(entry.costCents / 100).toFixed(3)}
                    </span>
                  )}
                </span>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="btn-secondary"
            style={{
              fontSize: "0.75rem",
              padding: "0.4rem 0.8rem",
              opacity: page <= 1 ? 0.4 : 1,
              cursor: page <= 1 ? "default" : "pointer",
            }}
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--muted)" }}>
            {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="btn-secondary"
            style={{
              fontSize: "0.75rem",
              padding: "0.4rem 0.8rem",
              opacity: page >= totalPages ? 0.4 : 1,
              cursor: page >= totalPages ? "default" : "pointer",
            }}
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
