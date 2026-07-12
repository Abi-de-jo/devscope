"use client";

import { FAKE_ROWS, FAKE_LOCATION, FAKE_TOTAL } from "@/components/locked-leaderboard-data";

const TROPHY_COLORS: Record<number, string> = {
  1: "#FFD700",
  2: "#C0C0C0",
  3: "#CD7F32",
};

/**
 * Fake leaderboard table for the locked preview.
 * Row #2 (rank 2) has reduced blur to create a "partially legible" pull.
 */
export function LockedLeaderboardContent() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
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
          Leaderboard
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 5vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
          Developer Rankings
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", color: "var(--muted)", lineHeight: 1.6, maxWidth: "600px" }}>
          Discover top developers by location. Ranked by public GitHub profile data.
        </p>
      </div>

      {/* Location selector (dummy) */}
      <div style={{ border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", padding: "1.5rem 2rem", marginBottom: "1.5rem", backgroundColor: "var(--paper-alt)", boxShadow: "var(--shadow-md)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "1rem" }}>
          Your GitHub location: {FAKE_LOCATION}
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <div style={{ flex: 1, padding: "0.8rem 1rem", fontFamily: "var(--font-mono)", fontSize: "1rem", border: "1.5px solid var(--ink)", borderRadius: "var(--radius)", backgroundColor: "var(--paper-alt)", boxShadow: "var(--shadow-xs)", color: "var(--muted)" }}>
            {FAKE_LOCATION}, Tamil Nadu, India
          </div>
          <div style={{ padding: "0.8rem 1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", backgroundColor: "var(--ink)", color: "var(--paper)", border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)" }}>
            Search
          </div>
        </div>
        {/* Scope toggles */}
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          {["City", "State", "Country"].map((label, i) => (
            <div key={label} style={{ padding: "0.4rem 0.85rem", fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-xs)", backgroundColor: i === 0 ? "var(--accent)" : "var(--paper)", color: "var(--ink)", cursor: "default" }}>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Meta */}
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Showing 1–10 of {FAKE_TOTAL}
      </div>

      {/* Table */}
      <div style={{ border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        {/* Header row */}
        <div style={{ display: "grid", gridTemplateColumns: "40px 44px 1fr 90px 55px", gap: "0.75rem", alignItems: "center", padding: "0.65rem 1.25rem", backgroundColor: "var(--surface-1)", borderBottom: "var(--border-width) solid var(--ink)", fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>
          <span>#</span>
          <span />
          <span>Developer</span>
          <span>Top Skill</span>
          <span style={{ textAlign: "right" }}>Score</span>
        </div>

        {/* Rows */}
        {FAKE_ROWS.map((row) => {
          const isPartiallyLegible = row.partiallyLegible;
          const rowBlur = isPartiallyLegible ? "blur(2px)" : "blur(0px)";
          const trophyColor = TROPHY_COLORS[row.rank];

          return (
            <div
              key={row.rank}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 44px 1fr 90px 55px",
                gap: "0.75rem",
                alignItems: "center",
                padding: "0.85rem 1.25rem",
                borderTop: "var(--border-width) solid var(--surface-2, #e0e0d8)",
                backgroundColor: row.rank % 2 === 0 ? "var(--paper-alt)" : "var(--paper)",
                filter: rowBlur,
              }}
            >
              {/* Rank */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: trophyColor ?? "var(--ink)" }}>
                {trophyColor ? (
                  <span style={{ fontSize: "1rem" }}>
                    {row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : "🥉"}
                  </span>
                ) : row.rank}
              </div>

              {/* Avatar placeholder */}
              <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius)", backgroundColor: "var(--surface-1)", border: "var(--border-width) solid var(--ink)" }} />

              {/* Name + username */}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {row.name}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--muted)" }}>
                  @{row.username}
                </div>
              </div>

              {/* Top skill */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", padding: "0.2rem 0.5rem", border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", backgroundColor: "var(--paper)", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {row.topSkill}
              </div>

              {/* Score */}
              <div style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 700, textAlign: "right", color: row.score >= 85 ? "var(--accent)" : "var(--ink)" }}>
                {row.score}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination (dummy) */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
        {[1, 2, 3, 4, 5].map((p) => (
          <div key={p} style={{ width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 600, border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-xs)", backgroundColor: p === 1 ? "var(--accent)" : "var(--paper)", color: "var(--ink)" }}>
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
