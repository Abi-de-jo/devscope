"use client";

import { Github, Search, Code2, BarChart3, Check } from "lucide-react";

const STEPS = [
  { icon: Github, label: "Connecting to GitHub" },
  { icon: Search, label: "Scanning repositories" },
  { icon: Code2, label: "Analyzing your codebase" },
  { icon: BarChart3, label: "Computing your Engineering Score" },
];

/**
 * Centered loading overlay: dims the whole screen and shows a stepper
 * whose steps advance based on the caller's `step` prop (0-3), not a
 * timer. The `progress` bar (0-100) is also driven by the caller.
 *
 * Flow driven by the dashboard:
 *   step 0 → /api/sync in flight
 *   step 1 → /api/score POST in flight
 *   step 2 → loadAnalysis in flight
 *   step 3 → finalizing
 */
export function CenterLoader({
  progress = 0,
  step = 0,
}: {
  progress?: number;
  step?: number;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(245, 244, 240, 0.72)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="card"
        style={{
          borderRadius: 0,
          padding: "2rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
          minWidth: "340px",
        }}
      >
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === step;
          const isDone = i < step;
          return (
            <div
              key={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: isActive ? "var(--ink)" : "var(--muted)",
                opacity: isActive ? 1 : isDone ? 0.7 : 0.4,
                transition: "opacity 0.3s ease, color 0.3s ease",
              }}
            >
              <span
                className={isActive ? "loader-pulse" : undefined}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  flexShrink: 0,
                  border: "1.5px solid var(--ink)",
                  borderRadius: "2px",
                  background: isActive
                    ? "var(--accent)"
                    : isDone
                      ? "var(--accent)"
                      : "transparent",
                }}
              >
                {isDone ? (
                  <Check size={15} />
                ) : (
                  <Icon size={15} />
                )}
              </span>
              {s.label}
            </div>
          );
        })}

        <div style={{ marginTop: "0.75rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--muted)",
              marginBottom: "0.35rem",
            }}
          >
            <span>Progress</span>
            <span style={{ color: "var(--ink)" }}>{pct}%</span>
          </div>
          <div
            style={{
              height: 12,
              border: "1.5px solid var(--ink)",
              borderRadius: "2px",
              background: "var(--paper-alt)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: "var(--accent)",
                transition: "width 0.15s linear",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
