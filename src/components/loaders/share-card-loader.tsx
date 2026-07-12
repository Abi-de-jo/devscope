"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Loading variant of the share / score card. Keycap-styled box whose score
 * number is replaced by a counter climbing to a placeholder value (or a
 * static placeholder under prefers-reduced-motion). Label reads GENERATING CARD.
 */
export function ShareCardLoader({
  placeholderScore = 88,
  label = "GENERATING CARD",
}: {
  placeholderScore?: number;
  label?: string;
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? placeholderScore : 0);

  useEffect(() => {
    if (reduce) {
      setValue(placeholderScore);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(p * placeholderScore));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, placeholderScore]);

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        padding: "1.5rem 2rem",
        background: "var(--paper)",
        border: "var(--border-width) solid var(--ink)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow-md)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "4rem",
          fontWeight: 700,
          lineHeight: 1,
          color: "var(--accent)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--muted)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
