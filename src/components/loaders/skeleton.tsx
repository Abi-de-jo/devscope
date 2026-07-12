"use client";

import type { CSSProperties } from "react";

/** Generic flat, hard-edged, pulsing skeleton block. */
export function SkeletonBlock({
  width,
  height,
  radius,
  style,
  className,
}: {
  width?: string | number;
  height?: string | number;
  radius?: string;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`skeleton${className ? ` ${className}` : ""}`}
      style={{ width, height, borderRadius: radius ?? "var(--radius)", ...style }}
    />
  );
}

/**
 * Skeleton for the public profile page (/u/[username]).
 * Mirrors the real layout: header, score circle + radar, summary + strengths/gaps.
 */
export function SkeletonProfile() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      {/* Profile header */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", marginBottom: "4rem", flexWrap: "wrap" }}>
        <SkeletonBlock width={96} height={96} />
        <div style={{ flex: 1, minWidth: 240 }}>
          <SkeletonBlock width={140} height={14} radius={2} style={{ marginBottom: "0.75rem" }} />
          <SkeletonBlock width="60%" height={36} radius={2} style={{ marginBottom: "0.75rem" }} />
          <SkeletonBlock width="80%" height={16} radius={2} style={{ marginBottom: "0.5rem" }} />
          <SkeletonBlock width="50%" height={16} radius={2} style={{ marginBottom: "1.75rem" }} />
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[0, 1, 2].map((i) => (
              <SkeletonBlock key={i} width={70} height={28} radius={2} />
            ))}
          </div>
        </div>
      </div>

      {/* Score card + radar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 0, marginBottom: "4rem" }}>
        <div className="card" style={{ borderRadius: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "4rem", borderRight: "var(--border-width) solid var(--ink)" }}>
          <SkeletonBlock width={140} height={140} radius="50%" />
          <SkeletonBlock width={90} height={12} radius={2} style={{ marginTop: "1rem" }} />
          <SkeletonBlock width={120} height={24} radius={2} style={{ marginTop: "1rem" }} />
          <SkeletonBlock width={100} height={22} radius={2} style={{ marginTop: "1rem" }} />
        </div>
        <div className="card" style={{ borderRadius: 0, padding: "2rem" }}>
          <SkeletonBlock width={120} height={14} radius={2} style={{ marginBottom: "1rem" }} />
          <SkeletonBlock width="100%" height={280} radius={2} />
        </div>
      </div>

      {/* Summary + strengths/gaps */}
      <div className="card" style={{ borderRadius: 0, marginBottom: "4rem", padding: "2rem" }}>
        <SkeletonBlock width={140} height={14} radius={2} style={{ marginBottom: "1rem" }} />
        <SkeletonBlock width="100%" height={16} radius={2} style={{ marginBottom: "0.6rem" }} />
        <SkeletonBlock width="92%" height={16} radius={2} style={{ marginBottom: "0.6rem" }} />
        <SkeletonBlock width="96%" height={16} radius={2} style={{ marginBottom: "1.5rem" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {[0, 1].map((col) => (
            <div key={col}>
              <SkeletonBlock width={100} height={14} radius={2} style={{ marginBottom: "0.75rem" }} />
              {[0, 1, 2].map((i) => (
                <SkeletonBlock key={i} width="100%" height={14} radius={2} style={{ marginBottom: "0.5rem" }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const BAR_WIDTHS = ["82%", "64%", "73%", "45%", "90%", "58%"];

/**
 * Skeleton for the logged-in dashboard.
 * Mirrors: score circle + radar, skill breakdown bars, recent activity/repo rows.
 */
export function SkeletonDashboard() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <SkeletonBlock width={120} height={14} radius={2} style={{ marginBottom: "0.75rem" }} />
      <SkeletonBlock width="40%" height={40} radius={2} style={{ marginBottom: "4rem" }} />

      {/* Score card + radar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 0, marginBottom: "4rem" }}>
        <div className="card" style={{ borderRadius: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "4rem", borderRight: "var(--border-width) solid var(--ink)" }}>
          <SkeletonBlock width={140} height={140} radius="50%" />
          <SkeletonBlock width={90} height={12} radius={2} style={{ marginTop: "1rem" }} />
          <SkeletonBlock width={120} height={24} radius={2} style={{ marginTop: "1rem" }} />
        </div>
        <div className="card" style={{ borderRadius: 0, padding: "2rem" }}>
          <SkeletonBlock width={120} height={14} radius={2} style={{ marginBottom: "1rem" }} />
          <SkeletonBlock width="100%" height={280} radius={2} />
        </div>
      </div>

      {/* Skill breakdown bars */}
      <div className="card" style={{ borderRadius: 0, marginBottom: "4rem", padding: "2rem" }}>
        <SkeletonBlock width={160} height={14} radius={2} style={{ marginBottom: "1.5rem" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {BAR_WIDTHS.map((w, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <SkeletonBlock width={110} height={12} radius={2} />
              <div style={{ flex: 1, height: 10, border: "var(--border-width) solid var(--ink)", borderRadius: 0, overflow: "hidden" }}>
                <SkeletonBlock width={w} height="100%" radius={0} style={{ border: "none", boxShadow: "none" }} />
              </div>
              <SkeletonBlock width={28} height={12} radius={2} />
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity / repo list */}
      <div className="card" style={{ borderRadius: 0, padding: "2rem" }}>
        <SkeletonBlock width={160} height={14} radius={2} style={{ marginBottom: "1.5rem" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                border: "var(--border-width) solid var(--ink)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-sm)",
                padding: "0.9rem 1rem",
                background: "var(--paper-alt)",
              }}
            >
              <SkeletonBlock width={20} height={20} radius={2} />
              <SkeletonBlock width="30%" height={14} radius={2} />
              <SkeletonBlock width="45%" height={12} radius={2} style={{ marginLeft: "auto" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
