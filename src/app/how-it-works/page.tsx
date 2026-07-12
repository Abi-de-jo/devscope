"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const STEPS = [
  { num: "01", title: "Connect GitHub", desc: "Sign in with GitHub OAuth. We request read-only access to your public profile and repositories. No private repos, no code access, no token stored.", color: "var(--accent)" },
  { num: "02", title: "We Analyze", desc: "Our AI engine examines your public GitHub data — repositories, languages, commit patterns, stars, forks, and documentation — across ten engineering dimensions.", color: "var(--paper)" },
  { num: "03", title: "Get Your Score", desc: "Receive your score across 10 axes: Architecture, Backend, Frontend, Code Quality, Testing, Security, DevOps, Docs, Maintainability, and Complexity.", color: "var(--accent)" },
  { num: "04", title: "Share It", desc: "Your public profile at /u/[username] is shareable on LinkedIn, Twitter, or anywhere. Show your engineering credibility with a link.", color: "var(--paper)" },
];

const AXES = [
  { name: "Architecture", weight: 17, desc: "Project structure, modularity" },
  { name: "Backend", weight: 14, desc: "API design, data modeling" },
  { name: "Frontend", weight: 13, desc: "Component architecture, UX" },
  { name: "Code Quality", weight: 12, desc: "Clean code, consistency" },
  { name: "Testing", weight: 12, desc: "Coverage, quality, strategy" },
  { name: "Security", weight: 11, desc: "Auth, validation, awareness" },
  { name: "DevOps", weight: 9, desc: "CI/CD, deployment, infra" },
  { name: "Documentation", weight: 5, desc: "README, inline docs" },
  { name: "Maintainability", weight: 4, desc: "Long-term code health" },
  { name: "Complexity", weight: 3, desc: "Problem-solving patterns" },
];

const FAQS = [
  { q: "Is my GitHub data safe?", a: "We only access public data and never store OAuth tokens. See our Security page for full details." },
  { q: "How accurate is the score?", a: "Scores are directional signals, not definitive assessments. They reflect patterns in your public GitHub activity — not your full engineering ability." },
  { q: "Can I re-analyze my profile?", a: "Yes — you can re-analyze from your dashboard anytime. Scores update based on your latest GitHub activity." },
  { q: "Is there a free tier?", a: "Yes. Basic scoring and your public profile are free. Advanced features may be introduced later." },
  { q: "Can I compare profiles without signing in?", a: "Yes — the Battle page lets you compare any two GitHub profiles side-by-side without logging in." },
  { q: "How do I opt out of the leaderboard?", a: "From your dashboard, toggle the 'Hide from Leaderboard' setting. Removed within one cache cycle (up to 36 hours)." },
];

const MARQUEE = ["ARCHITECTURE", "BACKEND", "FRONTEND", "CODE QUALITY", "TESTING", "SECURITY", "DEVOPS", "DOCS", "MAINTAINABILITY", "COMPLEXITY"];

export default function HowItWorksPage() {
  return (
    <main style={{ overflow: "hidden" }}>
      {/* ─── Hero ────────────────────────────────────────────────── */}
      <div style={{ position: "relative" }}>
        {/* Large accent circle decoration */}
        <div style={{ position: "absolute", top: "-30%", left: "60%", width: "500px", height: "500px", borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.07, filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2.5rem, 6vw, 5rem) 1.5rem", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--accent)",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Zap size={14} />
            How It Works
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              margin: 0,
              maxWidth: "20ch",
            }}
          >
            GitHub Wrapped for{" "}
            <span style={{ color: "var(--accent)" }}>engineering credibility.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "var(--muted)",
              marginTop: "1rem",
              maxWidth: "45ch",
            }}
          >
            Connect your GitHub. Get a score in 60 seconds. Share it everywhere.
          </motion.p>
        </div>
      </div>

      {/* ─── Marquee Strip ────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--ink)",
          borderTop: "var(--border-width) solid var(--ink)",
          borderBottom: "var(--border-width) solid var(--ink)",
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "0.55rem 0",
        }}
      >
        <div style={{ display: "inline-flex", animation: "marquee 25s linear infinite" }}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "var(--paper)",
                padding: "0 1.75rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "1.25rem",
              }}
            >
              {item}
              <span style={{ width: 3, height: 3, backgroundColor: "var(--accent)", borderRadius: "50%", flexShrink: 0 }} />
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @media (prefers-reduced-motion: reduce) { @keyframes marquee { from, to { transform: translateX(0); } } }
        `}</style>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2rem, 5vw, 4rem) 1.5rem" }}>
        {/* ─── Steps Bento ─────────────────────────────────────────── */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "4rem" }} className="hiw-steps">
          {STEPS.map((step, i) => {
            const isAccent = step.color === "var(--accent)";
            return (
              <motion.div
                key={step.num}
                custom={i}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="card"
                style={{
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  backgroundColor: isAccent ? "var(--accent)" : "var(--paper-alt)",
                  boxShadow: isAccent ? "var(--shadow-accent)" : undefined,
                  ...(i === 0 ? { gridColumn: "span 2" } : {}),
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: i === 0 ? "2.5rem" : "1.8rem",
                      color: isAccent ? "var(--ink)" : "var(--accent)",
                      lineHeight: 1,
                      opacity: 0.3,
                    }}
                  >
                    {step.num}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem", color: isAccent ? "var(--ink)" : "var(--ink)" }}>
                    {step.title}
                  </h3>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: isAccent ? "var(--ink)" : "var(--muted)", lineHeight: 1.65, opacity: isAccent ? 0.8 : 1, maxWidth: i === 0 ? "60ch" : undefined }}>
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </section>

        {/* ─── 10 Axes ────────────────────────────────────────────── */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: 20, height: 2, backgroundColor: "var(--accent)" }} />
            The 10 Axes
          </div>

          {/* Visual bar chart */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {AXES.map((axis, i) => (
              <motion.div
                key={axis.name}
                custom={i}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr 50px",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.6rem 0",
                  borderBottom: "var(--border-width) solid var(--surface-1)",
                }}
              >
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600 }}>
                  {axis.name}
                </div>
                <div style={{ height: "1.5rem", backgroundColor: "var(--surface-1)", borderRadius: "var(--radius)", overflow: "hidden", border: "var(--border-width) solid var(--ink)", position: "relative" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${axis.weight * 5.5}%` }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      height: "100%",
                      backgroundColor: i < 3 ? "var(--accent)" : "var(--ink)",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "0.5rem",
                    }}
                  />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 700, textAlign: "right" }}>
                  {axis.weight}%
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <Link
              href="/methodology"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--accent)",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              Full methodology <ArrowRight size={13} />
            </Link>
          </div>
        </section>

        {/* ─── FAQ ────────────────────────────────────────────────── */}
        <section>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: 20, height: 2, backgroundColor: "var(--accent)" }} />
            FAQ
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }} className="hiw-faq">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                custom={i}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="card card-hover"
                style={{ padding: "1.5rem" }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <ChevronRight size={14} style={{ color: "var(--accent)" }} />
                  {faq.q}
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.65 }}>
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── CTA ────────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            marginTop: "3.5rem",
            padding: "clamp(2rem, 4vw, 4rem)",
            border: "var(--border-width) solid var(--ink)",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-xl)",
            backgroundColor: "var(--accent)",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 1.8rem)", marginBottom: "0.5rem" }}>
            Ready to check your score?
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--ink)", marginBottom: "1.5rem", opacity: 0.7, maxWidth: "40ch", margin: "0 auto 1.5rem" }}>
            Connect your GitHub and get your engineering credibility score in 60 seconds.
          </p>
          <Link
            href="/"
            className="btn-primary"
            style={{ fontSize: "0.85rem", padding: "0.85rem 2rem" }}
          >
            Get Your Score <ArrowRight size={15} />
          </Link>
        </motion.section>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hiw-steps { grid-template-columns: 1fr !important; }
          .hiw-steps > div:first-child { grid-column: auto !important; }
          .hiw-faq { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
