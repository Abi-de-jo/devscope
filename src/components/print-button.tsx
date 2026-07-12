"use client";

import { useState } from "react";
import { ShareCardLoader } from "@/components/loaders/share-card-loader";

export function PrintButton() {
  const [generating, setGenerating] = useState(false);

  const handle = () => {
    setGenerating(true);
    // Brief beat so the "generating card" state is visible before the
    // print dialog takes over the thread.
    setTimeout(() => {
      window.print();
      setGenerating(false);
    }, 800);
  };

  if (generating) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
        <ShareCardLoader label="GENERATING CARD" />
      </div>
    );
  }

  return (
    <button
      onClick={handle}
      style={{
        fontFamily: "monospace",
        padding: "0.6rem 1.2rem",
        border: "2px solid #111",
        background: "#111",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      Print / Save as PDF
    </button>
  );
}
