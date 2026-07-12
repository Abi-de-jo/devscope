"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  Zap,
  Shield,
  BarChart3,
  Share2,
  Globe,
  Sparkles,
  FileText,
  Bug,
  GitBranch,
  Layers,
  Quote,
} from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { signInWithGithub, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { LoadingButton } from "@/components/loaders/button-loading";
import { HeroScoreCard } from "@/components/hero-score-card";

/* ─── Kinetic Hero ─────────────────────────────────────────────────── */

const heroLines = [
  { words: ["Everyone's a \" 10x engineer \" on LinkedIn."], accent: false, small: true },
  { words: ["Let's check GitHub."], accent: true, small: false },
];

function KineticHero() {
  return (
    <h1
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(4rem, 8vw, 6.5rem)",
        fontWeight: 700,
        lineHeight: 1.02,
        letterSpacing: "-0.04em",
        color: "var(--ink)",
        marginBottom: "1.75rem",
      }}
    >
      {heroLines.map((line, li) => (
        <span key={li} style={{ display: "block" }}>
          {line.words.map((word, wi) => (
            <motion.span
              key={`${li}-${wi}`}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.4 + li * 0.9 + wi * 0.15,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                display: "inline-block",
                marginRight: "0.3em",
                fontSize: line.small
                  ? "clamp(1.5rem, 3vw, 2.25rem)"
                  : undefined,
                lineHeight: line.small ? 1.15 : 1.02,
                color: line.accent ? "var(--accent)" : "var(--ink)",
              }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

/* ─── Score Ring (SVG arc) ────────────────────────────────────────── */

/* ─── Spec Table ───────────────────────────────────────────────────── */

const specData = [
  { key: "Repos Scanned", value: "14,200+" },
  { key: "Devs Scored", value: "3,100+" },
  { key: "Avg Time", value: "47 sec" },
  { key: "Accuracy", value: "Senior-reviewed" },
  { key: "Status", value: "Live", live: true },
];

function SpecTable() {
  const copy = (value: string) => {
    navigator.clipboard?.writeText(value);
    toast.success(`Copied ${value}`);
  };

  return (
    <div className="spec-keys">
      {specData.map((item, i) => (
        <motion.button
          key={i}
          type="button"
          className="keycap"
          onClick={() => copy(item.value)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 + i * 0.08 }}
          aria-label={`Copy ${item.value}`}
          title={`Copy ${item.value}`}
        >
          <span className="keycap-legend">{item.key}</span>
          <span className="keycap-text">
            {item.live && <span className="accent-dot" />}
            {item.value}
          </span>
        </motion.button>
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
  "Shareable Card",
  "OpenRouter",
  "Next.js",
  "Prisma",
  "Neon Postgres",
  "Better Auth",
  "TypeScript",
  "Public Profiles",
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
    icon: Zap,
    stat: "60s",
    title: "Score & Share",
    desc: "Connect GitHub, get your Engineering Score in under a minute.",
    tags: ["GitHub OAuth", "One Click"],
  },
  {
    icon: BarChart3,
    stat: "0–100",
    title: "Engineering Score",
    desc: "A defensible number backed by a visible breakdown — not a black box.",
    tags: ["AI Analysis", "Evidence-Based"],
  },
  {
    icon: Shield,
    stat: "10-axis",
    title: "Skill Radar",
    desc: "Architecture · Backend · Frontend · Code Quality · Testing · Security · DevOps · Docs · Maintainability · Judgment.",
    tags: ["Radar Chart", "Visual"],
  },
  {
    icon: Share2,
    stat: "100%",
    title: "Shareable",
    desc: "Auto-generated OG card. Post it to X, LinkedIn, Reddit. Watch it spread.",
    tags: ["OG Image", "Viral Loop"],
  },
  {
    icon: Sparkles,
    stat: "$0",
    title: "Free Tier",
    desc: "Full score + radar + shareable card. No credit card. No BS.",
    tags: ["Free", "No Friction"],
  },
  {
    icon: Globe,
    stat: "∞",
    title: "Public Profile",
    desc: "Your GitRating.mozen.in/u/username — SEO-optimized, backlink engine.",
    tags: ["SEO", "Portfolio"],
  },
];

function MetricsGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
      className="metrics-grid"
    >
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="card card-hover"
            style={{
              borderRadius: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.75rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  lineHeight: 1,
                }}
              >
                {m.stat}
              </div>
              <Icon
                size={20}
                strokeWidth={1.5}
                style={{ color: "var(--muted)" }}
              />
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
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
                fontSize: "0.875rem",
                color: "var(--muted)",
                lineHeight: 1.6,
                marginBottom: "1rem",
                flex: 1,
              }}
            >
              {m.desc}
            </p>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {m.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}

      <style>{`
        @media (max-width: 900px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .metrics-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── How It Works ─────────────────────────────────────────────────── */

const steps = [
  {
    num: "01",
    title: "Connect GitHub",
    desc: "One OAuth click. Public repos only. No private data touched.",
    icon: GithubIcon,
  },
  {
    num: "02",
    title: "Get Scored",
    desc: "AI analyzes your repos across 10 axes. Real evidence, not vibes.",
    icon: BarChart3,
  },
  {
    num: "03",
    title: "Share & Compare",
    desc: "Post your score card. Watch others run theirs. Growth loop.",
    icon: Share2,
  },
];

function HowItWorks() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
      className="steps-grid"
    >
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            style={{ padding: "2rem", position: "relative" }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "4rem",
                fontWeight: 700,
                color: "var(--accent)",
                opacity: 0.3,
                lineHeight: 1,
                marginBottom: "1rem",
              }}
            >
              {s.num}
            </div>
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                border: "var(--border-width) solid var(--ink)",
                borderRadius: "var(--radius)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.75rem",
                boxShadow: "var(--shadow-sm)",
                backgroundColor: "var(--paper-alt)",
              }}
            >
              <Icon size={20} strokeWidth={2} />
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.75rem",
                fontWeight: 700,
                marginBottom: "0.5rem",
                letterSpacing: "-0.01em",
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
        );
      })}

      <style>{`
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── What I Actually Do ───────────────────────────────────────────── */

const proofPoints = [
  {
    icon: FileText,
    problem: "Your README is 14 months stale.",
    detail: "Nobody reads docs that don't exist. We count them.",
    axis: "Docs",
    weight: "5%",
    score: 23,
    color: "#E74C3C",
  },
  {
    icon: Bug,
    problem: "70 repos. 3 have tests.",
    detail: "Zero coverage means zero confidence. We measure the gap.",
    axis: "Testing",
    weight: "12%",
    score: 12,
    color: "#E74C3C",
  },
  {
    icon: GitBranch,
    problem: "One PR. 2,400 lines. No reviews.",
    detail: "Merge-and-pray is not a workflow. We track the pattern.",
    axis: "Judgment",
    weight: "3%",
    score: 8,
    color: "#E74C3C",
  },
  {
    icon: Layers,
    problem: "Monolith with no module boundaries.",
    detail: "Spaghetti architecture costs you hires and velocity.",
    axis: "Architecture",
    weight: "17%",
    score: 31,
    color: "#E74C3C",
  },
];

function WhatIDo() {
  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "5rem 1.5rem",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "3.5rem",
        }}
      >
        <div
          className="uppercase-label"
          style={{ marginBottom: "1rem", justifyContent: "center" }}
        >
          What GitRating actually does
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            marginBottom: "1rem",
            textWrap: "balance",
          }}
        >
          We find what&apos;s costing you —{" "}
          <span style={{ color: "var(--accent)" }}>and we quantify it.</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.05rem",
            color: "var(--muted)",
            lineHeight: 1.6,
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          Real problems. Real numbers. Every score is backed by evidence from
          your actual GitHub repos.
        </p>
      </div>

      {/* Proof-point cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.75rem",
        }}
        className="proof-grid"
      >
        {proofPoints.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.button
              key={i}
              type="button"
              className="card card-hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onClick={() => {
                document
                  .getElementById("proof")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                borderRadius: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                textAlign: "left",
                cursor: "pointer",
                width: "100%",
                border: "var(--border-width) solid var(--ink)",
                backgroundColor: "var(--paper-alt)",
                padding: "1.75rem",
                fontFamily: "inherit",
              }}
            >
              {/* Icon + Axis label row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    border: "var(--border-width) solid var(--ink)",
                    borderRadius: "var(--radius)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "var(--shadow-sm)",
                    backgroundColor: "var(--paper)",
                  }}
                >
                  <Icon size={15} strokeWidth={2} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    fontWeight: 600,
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.08em",
                    color: "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  {p.axis}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5rem",
                      color: "var(--muted-light)",
                    }}
                  >
                    {p.weight}
                  </span>
                </div>
              </div>

              {/* Problem headline */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                {p.problem}
              </div>

              {/* Detail line */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                  lineHeight: 1.5,
                  margin: 0,
                  flex: 1,
                }}
              >
                {p.detail}
              </p>

              {/* Score + bar */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.4rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      lineHeight: 1,
                      color: p.color,
                    }}
                  >
                    {p.score}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      color: "var(--muted-light)",
                      textTransform: "uppercase" as const,
                    }}
                  >
                    / 100
                  </span>
                </div>
                <div className="score-bar">
                  <div
                    className="score-bar-fill"
                    style={{
                      width: `${p.score}%`,
                      backgroundColor: p.color,
                    }}
                  />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .proof-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── Testimonial ──────────────────────────────────────────────────── */

const testimonials = [
  {
    quote:
      "I had no idea my Backend score was that low until GitRating showed me the exact repo that dragged it down. Fixed it in a weekend.",
    name: "Priya Venkatesh",
    role: "Senior Backend Engineer",
    initials: "PV",
    avatarBg: "#E8F5E9",
  },
  {
    quote:
      "Used to think my GitHub looked solid. GitRating exposed zero test coverage across three repos I was most proud of. Now they all have green bars.",
    name: "Marcus Chen",
    role: "Full-Stack Developer",
    initials: "MC",
    avatarBg: "#E3F2FD",
  },
  {
    quote:
      "Shared my score on LinkedIn and it started more conversations than any side project ever did. Recruiters actually reply now.",
    name: "Anjali Deshmukh",
    role: "Software Engineer",
    initials: "AD",
    avatarBg: "#FFF3E0",
  },
];

function Testimonial() {
  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "4rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div className="uppercase-label" style={{ marginBottom: "2rem", justifyContent: "center" }}>
        What people are saying
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
        }}
        className="testimonial-grid"
      >
        {testimonials.map((t, i) => {
          const Icon = Quote;
          return (
            <motion.button
              key={i}
              type="button"
              className="card card-hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.12,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                borderRadius: 0,
                padding: "1.75rem",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                cursor: "pointer",
                width: "100%",
                border: "var(--border-width) solid var(--ink)",
                backgroundColor: "var(--paper-alt)",
                fontFamily: "inherit",
              }}
            >
              {/* Quote icon */}
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  border: "var(--border-width) solid var(--ink)",
                  borderRadius: "var(--radius)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--shadow-sm)",
                  backgroundColor: "var(--paper)",
                }}
              >
                <Icon size={13} strokeWidth={2} />
              </div>

              {/* Quote */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  lineHeight: 1.45,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                  fontStyle: "italic",
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </div>

              {/* Author row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "var(--radius)",
                    border: "var(--border-width) solid var(--ink)",
                    backgroundColor: t.avatarBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    color: "var(--ink)",
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      color: "var(--muted)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 820px) {
          .testimonial-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── Final CTA ────────────────────────────────────────────────────── */

function CTASection() {
  const { data: session } = useSession();
  const [connecting, setConnecting] = useState(false);
  const handleConnect = () => {
    setConnecting(true);
    signInWithGithub();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        textAlign: "center",
        padding: "5rem 1.5rem",
        borderTop: "var(--border-width) solid var(--ink)",
        borderBottom: "var(--border-width) solid var(--ink)",
        backgroundColor: "var(--paper-alt)",
      }}
    >
      <div
        className="uppercase-label"
        style={{
          marginBottom: "1rem",
          color: "var(--accent)",
          justifyContent: "center",
        }}
      >
        {session ? "Welcome back" : "Ready?"}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          marginBottom: "1rem",
        }}
      >
        {session ? "Your score is live. Check your dashboard or share your card." : "Know your engineering score."}
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1.1rem",
          color: "var(--muted)",
          maxWidth: "480px",
          margin: "0 auto 2.5rem",
          lineHeight: 1.6,
        }}
      >
        {session
          ? "Your dashboard, radar, and shareable card are ready."
          : "Connect your GitHub. Get a shareable score card in 60 seconds. No credit card. No commitment."}
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {session ? (
          <>
            <Link href="/dashboard" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", fontSize: "0.85rem" }}>
              <BarChart3 size={16} />
              View Dashboard
              <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <Share2 size={14} />
              Share Score
            </Link>
          </>
        ) : (
          <>
            <LoadingButton
              variant="accent"
              loading={connecting}
              loadingText="CONNECTING…"
              onClick={handleConnect}
            >
              <GithubIcon size={18} />
              Connect GitHub
              <ArrowRight size={16} />
            </LoadingButton>
            <Link href="/dashboard" className="btn-secondary">
              See Demo
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Hero CTA (auth-aware) ───────────────────────────────────────── */

function HeroCtaLoggedOut() {
  const [connecting, setConnecting] = useState(false);
  const handleConnect = () => {
    setConnecting(true);
    signInWithGithub();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
      style={{
        display: "flex",
        gap: "1.75rem",
        marginBottom: "0",
        flexWrap: "wrap",
      }}
    >
      <LoadingButton
        variant="primary"
        loading={connecting}
        loadingText="CONNECTING…"
        onClick={handleConnect}
      >
        <GithubIcon size={18} />
        Connect GitHub
        <ArrowRight size={16} />
      </LoadingButton>
      <a href="#proof" className="btn-ghost">
        See the proof
        <ArrowDown size={14} />
      </a>
    </motion.div>
  );
}

function HeroCtaLoggedIn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
      style={{
        display: "flex",
        gap: "1.75rem",
        marginBottom: "0",
        flexWrap: "wrap",
      }}
    >
      <Link href="/dashboard" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", fontSize: "0.85rem" }}>
        <BarChart3 size={16} />
        View My Dashboard
        <ArrowRight size={16} />
      </Link>
      <Link href="/dashboard" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
        <Share2 size={14} />
        Share My Score
      </Link>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: "clamp(2.5rem, 4vw, 5rem) 1.5rem 4rem",
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "#f3f3ee",
          borderRadius: "var(--radius)",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="uppercase-label"
              style={{ marginBottom: "1rem", color: "var(--accent)" }}
            >
              GitHub Wrapped · For Engineers
            </motion.div>

            <KineticHero />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                color: "var(--muted)",
                maxWidth: "480px",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              {session
                ? "Your Engineering Score is ready — 10 axes of real signal from your code, not vanity stars."
                : "Connect your GitHub and get a credible Engineering Score across 10 skill axes — real signal from your code, not vanity stars."}
            </motion.p>

            {session ? <HeroCtaLoggedIn /> : <HeroCtaLoggedOut />}
          </div>

          {/* Right — Score Preview */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <HeroScoreCard />
          </div>
        </motion.div>

        {/* Spec strip — full width below the hero grid */}
        <div
          style={{
            marginTop: "6.1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SpecTable />
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>

      {/* Marquee */}
      <TechMarquee />

      {/* What I do */}
      <WhatIDo />

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
            marginBottom: "4rem",
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
          backgroundColor: "var(--paper-alt)",
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
              marginBottom: "4rem",
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
