"use client";

import { Github, Search, Code2, BarChart3, Check } from "lucide-react";

const STEPS = [
  { icon: Github, label: "Connecting to GitHub" },
  { icon: Search, label: "Scanning repositories" },
  { icon: Code2, label: "Analyzing your codebase" },
  { icon: BarChart3, label: "Computing your Engineering Score" },
];

/**
 * Centered loading overlay with premium visual polish:
 * ambient glow, floating dashed ring, pulsing dot, sweep glow,
 * gradient progress bar, animated checkmark pop-in.
 * All CSS-driven (transform, opacity, box-shadow) — GPU-accelerated.
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
    <>
      <style>{`
        /* ── Floating dashed ring ── */
        @keyframes ring-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .loader-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 420px;
          height: 420px;
          border: 2px dashed var(--accent);
          border-radius: 50%;
          opacity: 0.18;
          animation: ring-rotate 6s linear infinite;
          pointer-events: none;
        }

        /* ── Ambient glow behind card ── */
        .loader-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 440px;
          height: 440px;
          background: radial-gradient(circle, rgba(34,211,238,0.13) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* ── Pulsing center dot ── */
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; box-shadow: 0 0 6px rgba(34,211,238,0.4); }
          50%      { transform: scale(1.4); opacity: 1;   box-shadow: 0 0 14px rgba(34,211,238,0.7); }
        }
        .loader-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
          animation: dot-pulse 1.4s ease-in-out infinite;
        }

        /* ── Checkmark pop-in ── */
        @keyframes check-pop {
          0%   { transform: scale(0.5); opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .check-done {
          animation: check-pop 350ms ease-out forwards;
        }

        /* ── Step pulse (active) ── */
        @keyframes step-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(0,194,209,0); }
          50%      { box-shadow: 0 0 12px rgba(0,194,209,0.35); }
        }
        .step-active {
          animation: step-glow 1.4s ease-in-out infinite;
        }
      `}</style>

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
        {/* Ambient glow */}
        <div className="loader-glow" />

        {/* Floating dashed ring */}
        <div className="loader-ring" />

        {/* Card */}
        <div
          className="card"
          style={{
            borderRadius: 0,
            padding: "2rem 2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            minWidth: "340px",
            position: "relative",
            boxShadow:
              "0 7px 0 var(--ink), 0 0 40px rgba(34,211,238,0.13)",
          }}
        >
          {/* Steps */}
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
                  className={
                    isActive
                      ? "step-active"
                      : isDone
                        ? "check-done"
                        : undefined
                  }
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
                    transition: "background 0.25s ease",
                  }}
                >
                  {isDone ? (
                    <Check size={15} strokeWidth={2.5} />
                  ) : (
                    <Icon size={15} />
                  )}
                </span>
                {s.label}
              </div>
            );
          })}

          {/* Progress bar */}
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
                  background: "linear-gradient(90deg, #22D3EE, #5EEAD4)",
                  boxShadow: "0 0 10px rgba(34,211,238,0.4)",
                  transition: "width 0.15s linear",
                }}
              />
            </div>
          </div>

          {/* Pulsing center dot */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "0.5rem",
            }}
          >
            <div className="loader-dot" />
          </div>
        </div>
      </div>
    </>
  );
}
