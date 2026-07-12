"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Tag, ArrowRight, Rocket } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  LATEST: { bg: "var(--ink)", color: "var(--paper)" },
  FEATURE: { bg: "var(--accent)", color: "var(--ink)" },
  IMPROVEMENT: { bg: "var(--surface-1)", color: "var(--ink)" },
  INITIAL: { bg: "var(--paper)", color: "var(--ink)" },
};

const ENTRIES = [
  { date: "July 2026", tag: "LATEST", title: "Leaderboard", items: ["User-driven location search with city, state, and country scope", "Progressive scope narrowing — drill down from country to city", "GitHub profile links on every leaderboard row", "Opt-out setting — hide your profile anytime", "Trophy system — gold, silver, bronze for top 3", "Shareable leaderboard URLs via query parameters"] },
  { date: "July 2026", tag: "FEATURE", title: "Battle — Quick Compare", items: ["Compare any two GitHub profiles side-by-side", "6 category breakdown with star rating system", "No login required — enter any two usernames"] },
  { date: "July 2026", tag: "FEATURE", title: "Language Capabilities", items: ["Byte-weighted language breakdown across all public repos", "Top language identification with percentage bars", "Shows up on dashboard, public profile, and report pages"] },
  { date: "July 2026", tag: "FEATURE", title: "10-Axis Scoring", items: ["Expanded from 7 to 10 scoring axes", "New: Code Quality, Maintainability, Complexity & Judgment", "Interactive methodology page with weight visualization"] },
  { date: "July 2026", tag: "IMPROVEMENT", title: "Dashboard Redesign", items: ["CenterLoader with 4-step cycling progress stepper", "Real-time progress tracking", "LoadingButton with three-dot pulse"] },
  { date: "June 2026", tag: "FEATURE", title: "Public Profiles & Reports", items: ["Public profile pages at /u/[username]", "Shareable report pages at /report/[username]", "Social sharing with Open Graph meta tags"] },
  { date: "June 2026", tag: "INITIAL", title: "Launch", items: ["GitHub OAuth authentication", "AI-powered 10-axis engineering credibility scoring", "ZenMux (free) + OpenRouter (paid) fallback chain"] },
];

const MARQUEE = ["LEADERBOARD", "BATTLE", "LANGUAGE CAPABILITIES", "10-AXIS SCORING", "DASHBOARD", "PUBLIC PROFILES", "LAUNCH"];

export default function ChangelogPage() {
  return (
    <main style={{ overflow: "hidden" }}>
      {/* Hero */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: "-20%", right: "20%", width: "400px", height: "400px", borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.07, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2.5rem, 6vw, 5rem) 1.5rem", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Clock size={14} />
            Changelog
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em", margin: 0 }}>
            What&apos;s{" "}
            <span style={{ color: "var(--accent)" }}>new</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--muted)", marginTop: "1rem", maxWidth: "40ch" }}>
            Every feature, improvement, and fix — in order.
          </motion.p>
        </div>
      </div>

      {/* Marquee */}
      <div style={{ backgroundColor: "var(--ink)", borderTop: "var(--border-width) solid var(--ink)", borderBottom: "var(--border-width) solid var(--ink)", overflow: "hidden", whiteSpace: "nowrap", padding: "0.55rem 0" }}>
        <div style={{ display: "inline-flex", animation: "marquee 25s linear infinite" }}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--paper)", padding: "0 1.75rem", display: "inline-flex", alignItems: "center", gap: "1.75rem" }}>
              {item}
              <span style={{ width: 3, height: 3, backgroundColor: "var(--accent)", borderRadius: "50%", flexShrink: 0 }} />
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } } @media (prefers-reduced-motion: reduce) { @keyframes marquee { from, to { transform: translateX(0); } } }`}</style>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2rem, 5vw, 4rem) 1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {ENTRIES.map((entry, i) => {
            const tagStyle = TAG_STYLES[entry.tag] || TAG_STYLES.FEATURE;
            const isLatest = entry.tag === "LATEST";
            return (
              <motion.div key={`${entry.date}-${entry.title}`} custom={i} initial="hidden" animate="show" variants={fadeUp} className="card card-hover" style={{ padding: 0, overflow: "hidden" }}>
                {/* Header strip */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1.5rem", borderBottom: "var(--border-width) solid var(--ink)", backgroundColor: "var(--paper)", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    {isLatest && <Rocket size={13} style={{ color: "var(--accent)" }} />}
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>{entry.date}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "0.15rem 0.5rem", border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", backgroundColor: tagStyle.bg, color: tagStyle.color, display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                      <Tag size={9} />{entry.tag}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem" }}>{entry.title}</h3>
                </div>
                {/* Items */}
                <ul style={{ listStyle: "none", padding: "1.75rem 1.5rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {entry.items.map((item) => (
                    <li key={item} style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.55, color: "var(--muted)", paddingLeft: "1.75rem", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, top: "0.1em", color: "var(--accent)", fontWeight: 700, fontSize: "0.75rem" }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} style={{ marginTop: "4rem", textAlign: "center", padding: "2rem 0 1rem" }}>
          <Link href="/" className="btn-primary">Get your Engineering Score <ArrowRight size={15} /></Link>
        </motion.div>
      </div>
    </main>
  );
}
