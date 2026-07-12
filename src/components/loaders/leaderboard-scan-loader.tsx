"use client";

import { MapPin, Search, GitBranch, BarChart3, Check } from "lucide-react";

const STEPS = [
  { icon: MapPin, label: "Searching developers in your area" },
  { icon: Search, label: "Scanning public profiles" },
  { icon: GitBranch, label: "Checking repositories & skills" },
  { icon: BarChart3, label: "Computing rankings" },
];

/**
 * Leaderboard scan overlay — same premium visual language as CenterLoader
 * (ambient glow, floating dashed ring, pulsing dot, sweep glow,
 * gradient progress bar, animated checkmark pop-in) but with
 * leaderboard-specific step labels.
 * All CSS-driven (transform, opacity, box-shadow) — GPU-accelerated.
 */
export function LeaderboardScanLoader({
  progress = 0,
  step = 0,
  location = "",
}: {
  progress?: number;
  step?: number;
  location?: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <>
      <style>{`
        /* ── Floating dashed ring ── */
        @keyframes lb-ring-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .lb-loader-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 420px;
          height: 420px;
          border: 2px dashed var(--accent);
          border-radius: 50%;
          opacity: 0.18;
          animation: lb-ring-rotate 6s linear infinite;
          pointer-events: none;
        }

        /* ── Ambient glow behind card ── */
        .lb-loader-glow {
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
        @keyframes lb-dot-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; box-shadow: 0 0 6px rgba(34,211,238,0.4); }
          50%      { transform: scale(1.4); opacity: 1;   box-shadow: 0 0 14px rgba(34,211,238,0.7); }
        }
        .lb-loader-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
          animation: lb-dot-pulse 1.4s ease-in-out infinite;
        }

        /* ── Checkmark pop-in ── */
        @keyframes lb-check-pop {
          0%   { transform: scale(0.5); opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .lb-check-done {
          animation: lb-check-pop 350ms ease-out forwards;
        }

        /* ── Step pulse (active) ── */
        @keyframes lb-step-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(0,194,209,0); }
          50%      { box-shadow: 0 0 12px rgba(0,194,209,0.35); }
        }
        .lb-step-active {
          animation: lb-step-glow 1.4s ease-in-out infinite;
        }

        /* ── Sweep line glow ── */
        @keyframes lb-sweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .lb-sweep-line {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 160px;
          height: 2px;
          margin-top: -1px;
          margin-left: 0;
          background: linear-gradient(90deg, var(--accent), transparent);
          transform-origin: 0% 50%;
          animation: lb-sweep 3s linear infinite;
          opacity: 0.5;
          box-shadow: 0 0 8px rgba(34,211,238,0.5);
          pointer-events: none;
        }

        /* ── Radar circle rings ── */
        .lb-radar-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid rgba(34,211,238,0.1);
          pointer-events: none;
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
        <div className="lb-loader-glow" />

        {/* Floating dashed ring */}
        <div className="lb-loader-ring" />

        {/* Radar concentric rings */}
        <div className="lb-radar-ring" style={{ width: 120, height: 120 }} />
        <div className="lb-radar-ring" style={{ width: 240, height: 240 }} />
        <div className="lb-radar-ring" style={{ width: 340, height: 340 }} />

        {/* Sweep line */}
        <div className="lb-sweep-line" />

        {/* Card */}
        <div
          className="card"
          style={{
            borderRadius: 0,
            padding: "2rem 2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            minWidth: "360px",
            maxWidth: "420px",
            position: "relative",
            boxShadow:
              "0 7px 0 var(--ink), 0 0 40px rgba(34,211,238,0.13)",
          }}
        >
          {/* Location label */}
          {location && (
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--muted)",
                marginBottom: "0.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <MapPin size={12} />
              Scanning {location}
            </div>
          )}

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
                  fontSize: "0.78rem",
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
                      ? "lb-step-active"
                      : isDone
                        ? "lb-check-done"
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
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--muted)",
                marginBottom: "0.35rem",
              }}
            >
              <span>Scanning</span>
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
            <div className="lb-loader-dot" />
          </div>
        </div>
      </div>
    </>
  );
}
