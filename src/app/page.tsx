"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Github, ExternalLink } from "lucide-react";

/* ─── Kinetic Hero ─────────────────────────────────────────────────── */

const heroWords = ["You have a GitHub.", "We score it."];

function KineticHero() {
  return (
    <h1
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2.5rem, 8vw, 6rem)",
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: "-0.03em",
        color: "var(--ink)",
        marginBottom: "1.5rem",
      }}
    >
      {heroWords.map((sentence, si) => (
        <span key={si} style={{ display: "block" }}>
          {sentence.split(" ").map((word, wi) => (
            <motion.span
              key={`${si}-${wi}`}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.3 + si * 0.8 + wi * 0.12,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{ display: "inline-block", marginRight: "0.3em" }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

/* ─── Spec Table ───────────────────────────────────────────────────── */

const specData = [
  { key: "Product", value: "DevScope" },
  { key: "Brand", value: "Mozen.in" },
  { key: "Mode", value: "Free + Pro" },
  { key: "Stack", value: "Next · Prisma · AI" },
  { key: "Status", value: "Live" },
];

function SpecTable() {
  return (
    <div className="spec-table" style={{ maxWidth: "700px" }}>
      {specData.map((item, i) => (
        <div key={i} className="spec-cell">
          <div className="spec-key">{item.key}</div>
          <div className="spec-value">
            {item.value === "Live" ? (
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span className="accent-dot" />
                {item.value}
              </span>
            ) : (
              item.value
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Marquee ──────────────────────────────────────────────────────── */

const techStack = [
  "GitHub Analysis",
  "AI Scoring",
  "Skill Radar",
  "Engineering Score",
  "Public Profile",
  "Shareable Card",
  "OpenRouter",
  "Next.js",
  "Prisma",
  "Neon Postgres",
  "Better Auth",
  "TypeScript",
];

function TechMarquee() {
  const doubled = [...techStack, ...techStack];
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {doubled.map((tech, i) => (
          <span key={i} style={{ paddingRight: "2rem" }}>
            {tech} <span className="accent-diamond">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Metrics Grid ─────────────────────────────────────────────────── */

const metrics = [
  {
    stat: "60s",
    title: "Score & Share",
    desc: "Connect GitHub, get your Engineering Score in under a minute.",
    tags: ["GitHub OAuth", "One Click"],
  },
  {
    stat: "0–100",
    title: "Engineering Score",
    desc: "A defensible number backed by a visible breakdown — not a black box.",
    tags: ["AI Analysis", "Evidence-Based"],
  },
  {
    stat: "6-axis",
    title: "Skill Radar",
    desc: "Frontend · Backend · DevOps · Testing · Docs · Architecture.",
    tags: ["Radar Chart", "Visual"],
  },
  {
    stat: "100%",
    title: "Shareable",
    desc: "Auto-generated OG card. Post it to X, LinkedIn, Reddit. Watch it spread.",
    tags: ["OG Image", "Viral Loop"],
  },
  {
    stat: "$0",
    title: "Free Tier",
    desc: "Full score + radar + shareable card. No credit card. No BS.",
    tags: ["Free", "No Friction"],
  },
  {
    stat: "∞",
    title: "Public Profile",
    desc: "Your devscope.mozen.in/u/username — SEO-optimized, backlink engine.",
    tags: ["SEO", "Portfolio"],
  },
];

function MetricsGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "0",
      }}
    >
      {metrics.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="card card-hover"
          style={{
            borderRadius: 0,
            borderRight:
              (i + 1) % 3 !== 0 ? undefined : "var(--border-width) solid var(--ink)",
            borderBottom: "var(--border-width) solid var(--ink)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "var(--accent)",
              marginBottom: "0.75rem",
              lineHeight: 1,
            }}
          >
            {m.stat}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "0.5rem",
            }}
          >
            {m.title}
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "var(--muted)",
              lineHeight: 1.6,
              marginBottom: "0.75rem",
            }}
          >
            {m.desc}
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {m.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  padding: "0.2rem 0.5rem",
                  border: "var(--border-width) solid var(--ink)",
                  borderRadius: "var(--radius)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── How It Works ─────────────────────────────────────────────────── */

const steps = [
  {
    num: "01",
    title: "Connect GitHub",
    desc: "One OAuth click. Public repos only. No private data touched.",
  },
  {
    num: "02",
    title: "Get Scored",
    desc: "AI analyzes your repos across 6 axes. Real evidence, not vibes.",
  },
  {
    num: "03",
    title: "Share & Compare",
    desc: "Post your score card. Watch others run theirs. Growth loop.",
  },
];

function HowItWorks() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "0",
      }}
    >
      {steps.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          style={{
            padding: "2rem",
            borderRight:
              i < steps.length - 1
                ? "var(--border-width) solid var(--ink)"
                : undefined,
            borderBottom: "var(--border-width) solid var(--ink)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--accent)",
              marginBottom: "1rem",
            }}
          >
            {s.num}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            {s.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "var(--muted)",
              lineHeight: 1.6,
            }}
          >
            {s.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Testimonial ──────────────────────────────────────────────────── */

function Testimonial() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        maxWidth: "640px",
        margin: "0 auto",
        textAlign: "center",
        padding: "3rem 1.5rem",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
          fontWeight: 600,
          lineHeight: 1.4,
          color: "var(--ink)",
          marginBottom: "1.5rem",
          fontStyle: "italic",
        }}
      >
        &ldquo;I had no idea my Backend score was that low until DevScope showed me
        the exact repo that dragged it down. Fixed it in a weekend.&rdquo;
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--muted)",
        }}
      >
        DevScope Beta User
      </div>
    </motion.div>
  );
}

/* ─── CTA Section ──────────────────────────────────────────────────── */

function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        textAlign: "center",
        padding: "4rem 1.5rem",
        borderTop: "var(--border-width) solid var(--ink)",
        borderBottom: "var(--border-width) solid var(--ink)",
      }}
    >
      <div
        className="uppercase-label"
        style={{ marginBottom: "1rem", color: "var(--accent)" }}
      >
        Ready?
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "1rem",
        }}
      >
        Know your engineering score.
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1.1rem",
          color: "var(--muted)",
          maxWidth: "520px",
          margin: "0 auto 2rem",
          lineHeight: 1.6,
        }}
      >
        Connect your GitHub. Get a shareable score card in 60 seconds.
        No credit card. No commitment.
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/api/auth/signin/github" className="btn-primary">
          <Github size={18} />
          Connect GitHub
          <ArrowRight size={16} />
        </Link>
        <Link href="/dashboard" className="btn-secondary">
          See Demo
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: "6rem 1.5rem 4rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="uppercase-label"
            style={{ marginBottom: "1.5rem", color: "var(--accent)" }}
          >
            GitHub Wrapped · For Engineers
          </div>

          <KineticHero />

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--muted)",
              maxWidth: "600px",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            DevScope analyzes your public GitHub repositories and produces a
            credible Engineering Score — not vanity metrics, but real signal
            about your skills. Share it. Improve it. Watch your career grow.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "3rem",
              flexWrap: "wrap",
            }}
          >
            <Link href="/api/auth/signin/github" className="btn-primary">
              <Github size={18} />
              Connect GitHub
              <ArrowRight size={16} />
            </Link>
            <a href="#proof" className="btn-secondary">
              See the proof
              <ArrowDown size={16} />
            </a>
          </div>

          <SpecTable />
        </motion.div>
      </section>

      {/* Marquee */}
      <TechMarquee />

      {/* Proof, not adjectives */}
      <section
        id="proof"
        style={{
          padding: "5rem 1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div className="uppercase-label" style={{ marginBottom: "0.75rem" }}>
          Proof, not adjectives
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "3rem",
            maxWidth: "500px",
          }}
        >
          What you get in 60 seconds.
        </h2>
        <MetricsGrid />
      </section>

      {/* How it works */}
      <section
        style={{
          borderTop: "var(--border-width) solid var(--ink)",
          borderBottom: "var(--border-width) solid var(--ink)",
        }}
      >
        <div
          style={{
            padding: "5rem 1.5rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div className="uppercase-label" style={{ marginBottom: "0.75rem" }}>
            How it works
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "3rem",
              maxWidth: "400px",
            }}
          >
            Three steps. Zero friction.
          </h2>
          <HowItWorks />
        </div>
      </section>

      {/* Testimonial */}
      <Testimonial />

      {/* Final CTA */}
      <CTASection />
    </>
  );
}
