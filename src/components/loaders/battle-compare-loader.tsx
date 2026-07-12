"use client";

import { Swords, Users, GitBranch, BarChart3, Trophy, Check } from "lucide-react";

const STEPS = [
  { icon: Users, label: "Fetching profiles" },
  { icon: GitBranch, label: "Analyzing repositories" },
  { icon: BarChart3, label: "Comparing skills" },
  { icon: Trophy, label: "Building results" },
];

/**
 * Battle compare loader — clash-versus style.
 *
 * Phase 1 (avatars empty): just usernames + VS badge + loader steps
 * Phase 2 (avatars populated): real profile photos pop in centered in the modal
 *
 * All CSS-driven — GPU-accelerated.
 */
export function BattleCompareLoader({
  progress = 0,
  step = 0,
  usernames = [],
  avatars = {},
}: {
  progress?: number;
  step?: number;
  usernames?: string[];
  avatars?: Record<string, string>;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(progress)));
  const left = usernames[0] ?? "user_a";
  const right = usernames[1] ?? "user_b";
  const leftAvatar = avatars[left];
  const rightAvatar = avatars[right];
  const hasAvatars = !!(leftAvatar && rightAvatar);

  return (
    <>
      <style>{`
        /* ── VS badge pulse ── */
        @keyframes bv-vs-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(34,211,238,0); }
          50%      { transform: scale(1.1); box-shadow: 0 0 28px rgba(34,211,238,0.6); }
        }
        .bv-vs-badge { animation: bv-vs-pulse 1.2s ease-in-out infinite; }

        /* ── Avatar pop-in ── */
        @keyframes bv-avatar-pop {
          0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
          60%  { transform: scale(1.12) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .bv-avatar-img { animation: bv-avatar-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        /* ── Name style ── */
        .bv-panel-name { transition: opacity 0.4s ease; }

        /* ── Electric sparks ── */
        @keyframes bv-spark-left {
          0%   { transform: scaleX(0); opacity: 0; }
          20%  { transform: scaleX(1); opacity: 1; }
          40%  { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(0); opacity: 0; }
        }
        @keyframes bv-spark-right {
          0%   { transform: scaleX(0); opacity: 0; }
          20%  { transform: scaleX(1); opacity: 1; }
          40%  { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(0); opacity: 0; }
        }
        .bv-spark {
          position: absolute;
          top: 50%;
          height: 2px;
          width: 50px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          pointer-events: none;
        }
        .bv-spark-l {
          right: calc(50% + 38px);
          transform-origin: right center;
          animation: bv-spark-left 1.8s ease-in-out infinite;
        }
        .bv-spark-r {
          left: calc(50% + 38px);
          transform-origin: left center;
          animation: bv-spark-right 1.8s ease-in-out infinite 0.4s;
        }
        .bv-spark-l2 {
          right: calc(50% + 38px);
          transform-origin: right center;
          animation: bv-spark-left 1.8s ease-in-out infinite 0.9s;
          top: calc(50% + 8px);
          width: 35px;
          opacity: 0.5;
        }
        .bv-spark-r2 {
          left: calc(50% + 38px);
          transform-origin: left center;
          animation: bv-spark-right 1.8s ease-in-out infinite 1.3s;
          top: calc(50% - 8px);
          width: 35px;
          opacity: 0.5;
        }

        /* ── Swords cross ── */
        @keyframes bv-swords-clash {
          0%, 100% { transform: rotate(0deg); }
          25%      { transform: rotate(5deg); }
          75%      { transform: rotate(-5deg); }
        }
        .bv-swords { animation: bv-swords-clash 2s ease-in-out infinite; }

        /* ── Panel slide-in ── */
        @keyframes bv-slide-left  { from { transform: translateX(-30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes bv-slide-right { from { transform: translateX(30px); opacity: 0; }  to { transform: translateX(0); opacity: 1; } }
        .bv-panel-l { animation: bv-slide-left 0.5s ease-out forwards; }
        .bv-panel-r { animation: bv-slide-right 0.5s ease-out forwards; }

        /* ── Floating dashed ring ── */
        @keyframes bv-ring-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .bv-loader-ring {
          position: absolute;
          top: 50%; left: 50%;
          width: 460px; height: 460px;
          border: 2px dashed var(--accent);
          border-radius: 50%;
          opacity: 0.12;
          animation: bv-ring-rotate 8s linear infinite;
          pointer-events: none;
        }

        /* ── Ambient glow ── */
        .bv-loader-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* ── Step glow ── */
        @keyframes bv-step-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(34,211,238,0); }
          50%      { box-shadow: 0 0 12px rgba(34,211,238,0.35); }
        }
        .bv-step-active { animation: bv-step-glow 1.4s ease-in-out infinite; }

        /* ── Checkmark pop-in ── */
        @keyframes bv-check-pop {
          0%   { transform: scale(0.5); opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .bv-check-done { animation: bv-check-pop 350ms ease-out forwards; }

        /* ── Pulsing dot ── */
        @keyframes bv-dot-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; box-shadow: 0 0 6px rgba(34,211,238,0.4); }
          50%      { transform: scale(1.4); opacity: 1;   box-shadow: 0 0 14px rgba(34,211,238,0.7); }
        }
        .bv-loader-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--accent);
          animation: bv-dot-pulse 1.4s ease-in-out infinite;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .bv-main-card { min-width: 90vw !important; padding: 1.5rem 1rem !important; }
          .bv-vs-badge { width: 44px !important; height: 44px !important; }
          .bv-panel-name { font-size: 0.85rem !important; }
          .bv-spark { display: none !important; }
          .bv-avatar { width: 72px !important; height: 72px !important; }
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
          background: "rgba(245, 244, 240, 0.82)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
        }}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        {/* Ambient glow */}
        <div className="bv-loader-glow" />

        {/* Floating dashed ring */}
        <div className="bv-loader-ring" />

        {/* Main card */}
        <div
          className="card bv-main-card"
          style={{
            borderRadius: 0,
            padding: "2rem 2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
            minWidth: "440px",
            maxWidth: "520px",
            position: "relative",
            boxShadow: "0 7px 0 var(--ink), 0 0 40px rgba(34,211,238,0.1)",
          }}
        >
          {/* ── Versus row ──────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
              justifyContent: "center",
              position: "relative",
              marginBottom: "0.25rem",
            }}
          >
            {/* Left panel */}
            <div
              className="bv-panel-l"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "0.5rem",
                minWidth: 0,
              }}
            >
              {/* Avatar — only shows after API response */}
              {leftAvatar && (
                <img
                  className="bv-avatar-img bv-avatar"
                  src={leftAvatar}
                  alt={left}
                  width={hasAvatars ? 88 : 64}
                  height={hasAvatars ? 88 : 64}
                  style={{
                    border: "2.5px solid var(--ink)",
                    borderRadius: "var(--radius)",
                    objectFit: "cover",
                    boxShadow: "0 4px 0 var(--ink)",
                    transition: "width 0.3s ease, height 0.3s ease",
                  }}
                />
              )}
              <div
                className="bv-panel-name"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {left}
              </div>
            </div>

            {/* Electric sparks */}
            <div className="bv-spark bv-spark-l" />
            <div className="bv-spark bv-spark-r" />
            <div className="bv-spark bv-spark-l2" />
            <div className="bv-spark bv-spark-r2" />

            {/* VS badge */}
            <div
              className="bv-vs-badge"
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2.5px solid var(--ink)",
                backgroundColor: "var(--accent)",
                flexShrink: 0,
                position: "relative",
                zIndex: 2,
              }}
            >
              <div className="bv-swords">
                <Swords size={22} color="var(--ink)" />
              </div>
            </div>

            {/* Right panel */}
            <div
              className="bv-panel-r"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0.5rem",
                minWidth: 0,
              }}
            >
              {/* Avatar — only shows after API response */}
              {rightAvatar && (
                <img
                  className="bv-avatar-img bv-avatar"
                  src={rightAvatar}
                  alt={right}
                  width={hasAvatars ? 88 : 64}
                  height={hasAvatars ? 88 : 64}
                  style={{
                    border: "2.5px solid var(--ink)",
                    borderRadius: "var(--radius)",
                    objectFit: "cover",
                    boxShadow: "0 4px 0 var(--ink)",
                    transition: "width 0.3s ease, height 0.3s ease",
                  }}
                />
              )}
              <div
                className="bv-panel-name"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {right}
              </div>
            </div>
          </div>

          {/* ── Steps + progress (only while loading, hidden when avatars arrive) ── */}
          {!hasAvatars && (
            <>
              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: "1.5px",
                  background: "linear-gradient(90deg, transparent, var(--surface-3, #ddd), transparent)",
                }}
              />

              {/* Steps */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  width: "100%",
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
                        gap: "0.65rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: isActive ? "var(--ink)" : "var(--muted)",
                        opacity: isActive ? 1 : isDone ? 0.7 : 0.35,
                        transition: "opacity 0.3s ease, color 0.3s ease",
                      }}
                    >
                      <span
                        className={
                          isActive ? "bv-step-active" : isDone ? "bv-check-done" : undefined
                        }
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 26,
                          height: 26,
                          flexShrink: 0,
                          border: "1.5px solid var(--ink)",
                          borderRadius: "2px",
                          background: isActive ? "var(--accent)" : isDone ? "var(--accent)" : "transparent",
                          transition: "background 0.25s ease",
                        }}
                      >
                        {isDone ? <Check size={14} strokeWidth={2.5} /> : <Icon size={14} />}
                      </span>
                      {s.label}
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--muted)",
                    marginBottom: "0.35rem",
                  }}
                >
                  <span>Comparing</span>
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

              {/* Pulsing dot */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "0.25rem" }}>
                <div className="bv-loader-dot" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
