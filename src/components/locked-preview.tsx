"use client";

import { signInWithGithub } from "@/lib/auth-client";
import { GithubIcon } from "@/components/brand-icons";

interface LockedPreviewProps {
  page: "leaderboard" | "dashboard";
  children: React.ReactNode;
  /** Number visible in the dummy data to reference in the overlay copy */
  statNumber?: string;
  /** Extra stat detail for the overlay body */
  statDetail?: string;
}

/**
 * Wraps any page content with:
 *  1. The real layout rendered with dummy data (`children`)
 *  2. A semi-transparent blur filter over it
 *  3. A centered keycap-styled unlock card on top
 *
 * The overlay is NOT dismissible — it's the entire gate.
 */
export function LockedPreview({
  page,
  children,
  statNumber = "127",
  statDetail = "developers ranked",
}: LockedPreviewProps) {
  const headlines: Record<string, string> = {
    leaderboard: "See where you rank",
    dashboard: "This is your score, unlocked",
  };

  const bodies: Record<string, string> = {
    leaderboard: `${statNumber} ${statDetail}. Connect GitHub to see your position.`,
    dashboard: `Your score is waiting — ${statNumber} out of 100. Connect GitHub to unlock the full breakdown.`,
  };

  const handleConnect = () => {
    // Store current path so post-auth redirect goes here
    try {
      localStorage.setItem("devscope:returnTo", window.location.pathname);
    } catch { /* noop */ }
    signInWithGithub(window.location.pathname);
  };

  return (
    <div style={{ position: "relative", minHeight: "80vh" }}>
      {/* ── Blurred content layer ────────────────────────────────── */}
      <div
        style={{
          filter: "blur(6px)",
          opacity: 0.45,
          pointerEvents: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
        aria-hidden="true"
      >
        {children}
      </div>

      {/* ── Unlock overlay ───────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "var(--paper-alt)",
            border: "var(--border-width) solid var(--ink)",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-xl)",
            padding: "2.5rem 2rem",
            maxWidth: "400px",
            width: "90%",
            textAlign: "center",
          }}
        >
          {/* Lock icon */}
          <div
            style={{
              width: "3rem",
              height: "3rem",
              margin: "0 auto 1.25rem",
              border: "var(--border-width) solid var(--ink)",
              borderRadius: "var(--radius)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--surface-1)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.35rem",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "0.6rem",
            }}
          >
            {headlines[page]}
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.92rem",
              color: "var(--muted)",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
            }}
          >
            {bodies[page]}
          </p>

          {/* CTA */}
          <button
            type="button"
            onClick={handleConnect}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "var(--ink)",
              color: "var(--paper)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              border: "var(--border-width) solid var(--ink)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-md)",
              cursor: "pointer",
              transition: "all 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              width: "100%",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              e.currentTarget.style.transform = "translate(2px, 2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.transform = "none";
            }}
          >
            <GithubIcon size={15} />
            Connect GitHub
          </button>

          {/* Trust line */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--muted)",
              marginTop: "0.85rem",
              letterSpacing: "0.04em",
            }}
          >
            Free · Public repos only · 60 seconds
          </div>
        </div>
      </div>
    </div>
  );
}
