"use client";

/**
 * Fake dashboard for the locked preview.
 * Score number (84) is rendered SHARP (no blur).
 * Everything else — radar chart, skill bars, history — is blurred.
 */

const FAKE_SCORE = 84;
const FAKE_LEVEL = "Senior Engineer";

const FAKE_AXES = [
  { name: "Architecture", score: 92 },
  { name: "Backend", score: 88 },
  { name: "Frontend", score: 76 },
  { name: "Code Quality", score: 85 },
  { name: "Testing", score: 71 },
  { name: "Security", score: 80 },
  { name: "DevOps", score: 68 },
  { name: "Documentation", score: 62 },
  { name: "Maintainability", score: 78 },
  { name: "Complexity", score: 74 },
];

const FAKE_LANGUAGES = [
  { name: "TypeScript", pct: 42 },
  { name: "Python", pct: 28 },
  { name: "Go", pct: 15 },
  { name: "Rust", pct: 9 },
  { name: "Other", pct: 6 },
];

export function LockedDashboardContent() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "4rem" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <span style={{ width: 20, height: 2, backgroundColor: "var(--accent)" }} />
          Dashboard
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Your Engineering Score
        </h1>
      </div>

      {/* Score Card — score is SHARP, rest is blurred */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "4rem" }} className="dash-locked-grid">
        {/* Left: Score — SHARP */}
        <div style={{ border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-lg)", backgroundColor: "var(--paper-alt)", padding: "2.5rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: "0.75rem" }}>
            Engineering Score
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "5rem", fontWeight: 700, lineHeight: 1, color: "var(--accent)" }}>
            {FAKE_SCORE}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.35rem" }}>
            out of 100
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, marginTop: "0.75rem" }}>
            {FAKE_LEVEL}
          </div>
        </div>

        {/* Right: Skill bars — BLURRED */}
        <div style={{ border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-md)", backgroundColor: "var(--paper-alt)", padding: "2rem 1.5rem", filter: "blur(4px)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "1.25rem" }}>
            Skill Breakdown
          </div>
          {FAKE_AXES.slice(0, 6).map((axis) => (
            <div key={axis.name} style={{ marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>{axis.name}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700, color: axis.score >= 70 ? "var(--accent)" : "var(--ink)" }}>{axis.score}</span>
              </div>
              <div style={{ height: "6px", backgroundColor: "var(--surface-1)", borderRadius: "var(--radius)", overflow: "hidden", border: "var(--border-width) solid var(--ink)" }}>
                <div style={{ width: `${axis.score}%`, height: "100%", backgroundColor: axis.score >= 70 ? "var(--accent)" : "var(--ink)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar placeholder — BLURRED */}
      <div style={{ border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-md)", backgroundColor: "var(--paper-alt)", padding: "2rem", marginBottom: "4rem", filter: "blur(5px)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "1rem" }}>
          Radar Chart
        </div>
        {/* Fake radar: a centered circle with radiating lines */}
        <div style={{ width: "200px", height: "200px", margin: "0 auto", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, border: "var(--border-width) solid var(--surface-1)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", inset: "20%", border: "var(--border-width) solid var(--surface-1)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", inset: "40%", border: "var(--border-width) solid var(--surface-1)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", top: "50%", left: "10%", right: "10%", height: "var(--border-width)", backgroundColor: "var(--surface-1)" }} />
          <div style={{ position: "absolute", left: "50%", top: "10%", bottom: "10%", width: "var(--border-width)", backgroundColor: "var(--surface-1)" }} />
        </div>
      </div>

      {/* Language bars — BLURRED */}
      <div style={{ border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-md)", backgroundColor: "var(--paper-alt)", padding: "1.5rem", filter: "blur(4px)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "1rem" }}>
          Language Capabilities
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end", height: "80px" }}>
          {FAKE_LANGUAGES.map((lang) => (
            <div key={lang.name} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 700 }}>{lang.pct}%</div>
              <div style={{ width: "100%", height: `${lang.pct * 1.5}px`, backgroundColor: "var(--ink)", border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)" }} />
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--muted)", textTransform: "uppercase" }}>{lang.name}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dash-locked-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
