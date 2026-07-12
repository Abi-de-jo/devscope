"use client";

import { useEffect, useState } from "react";
import { Github, Search, Code2, BarChart3, Check } from "lucide-react";

const STEPS = [
  { icon: Github, label: "Connecting to GitHub" },
  { icon: Search, label: "Scanning repositories" },
  { icon: Code2, label: "Analyzing your codebase" },
  { icon: BarChart3, label: "Computing your Engineering Score" },
];

/**
 * Centered loading overlay: dims the whole screen (low-opacity backdrop)
 * and shows an animated stepper (text + icons cycling through stages) plus
 * a 0–100 progress bar driven by the caller's `progress` value, which the
 * dashboard updates from the real request elapsed time.
 */
export function CenterLoader({ progress = 0 }: { progress?: number }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length);
    }, 1100);
    return () => clearInterval(id);
  }, []);

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
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === active;
          const isDone = i < active;
          return (
            <div
              key={step.label}
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
                  background: isActive ? "var(--accent)" : "transparent",
                }}
              >
                {isDone ? <Check size={15} /> : <Icon size={15} />}
              </span>
              {step.label}
            </div>
          );
        })}

        <div style={{ marginTop: "0.75rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
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
