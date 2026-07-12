import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MethodologyInteractive } from "@/components/methodology-interactive";

export const metadata: Metadata = {
  title: "Methodology — GitRating",
  description:
    "How GitRating analyzes your GitHub and generates an explainable Engineering Score. Score weights, what we analyze, and why our scores are estimates — not hiring decisions.",
  openGraph: {
    title: "Methodology — GitRating",
    description: "How GitRating generates an explainable Engineering Score.",
    type: "article",
  },
};

export default function MethodologyPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      {/* Hero */}
      <div style={{ marginBottom: "3rem" }}>
        <div className="uppercase-label" style={{ marginBottom: "1rem", color: "var(--accent)" }}>Methodology</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.5rem", maxWidth: "800px" }}>
          We show our work.
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", color: "var(--muted)", maxWidth: "640px", lineHeight: 1.7 }}>
          GitRating analyzes your repositories across ten engineering axes and produces a structured,
          evidence-based assessment. Every score comes with the evidence, what&apos;s missing, and how to improve.
          Tap through the sections below to see exactly how it works.
        </p>
      </div>

      <MethodologyInteractive />

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "3rem 0 1rem" }}>
        <Link href="/" className="btn-primary">
          Get your Engineering Score
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
