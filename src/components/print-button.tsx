"use client";

import { useState } from "react";

export function PrintButton() {
  const [generating, setGenerating] = useState(false);

  const handle = () => {
    setGenerating(true);
    setTimeout(() => {
      window.print();
      setGenerating(false);
    }, 600);
  };

  if (generating) {
    return (
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: "13px",
          color: "#666",
          padding: "10px 20px",
        }}
      >
        Preparing PDF…
      </div>
    );
  }

  return (
    <button
      onClick={handle}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: "13px",
        fontWeight: 600,
        padding: "10px 24px",
        border: "1.5px solid #1a1a1a",
        background: "#1a1a1a",
        color: "#fff",
        cursor: "pointer",
        letterSpacing: "0.02em",
      }}
    >
      Download PDF
    </button>
  );
}
