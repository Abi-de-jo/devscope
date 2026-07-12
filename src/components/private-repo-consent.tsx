"use client";

import { useState } from "react";

interface PrivateRepoConsentProps {
  onAllow: () => void;
  onDeny: () => void;
}

/**
 * Consent prompt shown before first analysis.
 * Asks user whether to include private & org repos in the analysis.
 * - Allow → re-auth with `repo` scope, sync all repos, analyze
 * - Deny → analyze public repos only (default, current behavior)
 *
 * Once decided, the preference is stored — never shown again.
 */
export function PrivateRepoConsent({ onAllow, onDeny }: PrivateRepoConsentProps) {
  const [loading, setLoading] = useState(false);

  const handleAllow = () => {
    setLoading(true);
    onAllow();
  };

  const handleDeny = () => {
    setLoading(true);
    onDeny();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(245, 244, 240, 0.88)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          background: "var(--paper)",
          border: "1.5px solid var(--ink)",
          boxShadow: "4px 4px 0 var(--ink)",
          borderRadius: "2px",
          padding: "2rem",
          maxWidth: "480px",
          width: "90%",
          fontFamily: "var(--font-mono)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "var(--accent)",
              border: "1.5px solid var(--ink)",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
              boxShadow: "2px 2px 0 var(--ink)",
            }}
          >
            🔒
          </div>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: 0,
                color: "var(--ink)",
              }}
            >
              Private Repo Access
            </h3>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--muted)",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Optional — your choice
            </p>
          </div>
        </div>

        {/* Body */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            lineHeight: "1.6",
            color: "var(--ink)",
            marginBottom: "1rem",
          }}
        >
          We can analyze your <strong>private &amp; organization repos</strong> for
          a more accurate engineering score.
        </p>

        <div
          style={{
            background: "var(--surface-1)",
            border: "1.5px solid var(--ink)",
            borderRadius: "2px",
            padding: "0.75rem 1rem",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              lineHeight: "1.5",
              color: "var(--ink)",
              margin: 0,
            }}
          >
            <strong>What we access if you allow:</strong>
            <br />
            • Repository names, languages, stars, forks
            <br />
            • README files &amp; file structure
            <br />
            • CI/CD config, Dockerfiles, test directories
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              lineHeight: "1.5",
              color: "var(--muted)",
              margin: "0.5rem 0 0 0",
            }}
          >
            <strong>We never access:</strong> source code contents, issues, PRs,
            or secrets.
          </p>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
          }}
        >
          <button
            onClick={handleDeny}
            disabled={loading}
            style={{
              flex: 1,
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "0.75rem 1rem",
              background: "var(--paper)",
              color: "var(--ink)",
              border: "1.5px solid var(--ink)",
              borderRadius: "2px",
              boxShadow: "3px 3px 0 var(--ink)",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "all 0.15s",
            }}
          >
            {loading ? "..." : "Public Only"}
          </button>

          <button
            onClick={handleAllow}
            disabled={loading}
            style={{
              flex: 1,
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "0.75rem 1rem",
              background: "var(--accent)",
              color: "var(--ink)",
              border: "1.5px solid var(--ink)",
              borderRadius: "2px",
              boxShadow: "3px 3px 0 var(--ink)",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "all 0.15s",
            }}
          >
            {loading ? "..." : "Allow Private & Org"}
          </button>
        </div>

        {/* Fine print */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--muted)",
            marginTop: "1rem",
            textAlign: "center",
            lineHeight: "1.4",
          }}
        >
          You can change this anytime in Settings. Your preference is stored
          securely and never shared.
        </p>
      </div>
    </div>
  );
}
