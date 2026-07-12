"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Server, Trash2, AlertTriangle, ArrowRight, Check, X } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const PRACTICES = [
  { icon: Lock, title: "OAuth Tokens Are Ephemeral", desc: "We never store your GitHub OAuth token. Authentication happens via Better Auth, tokens are session-scoped, and we never persist them." },
  { icon: Eye, title: "Read-Only Access", desc: "We request read-only GitHub OAuth scope. We cannot push code, modify repos, or access private data beyond what you authorize." },
  { icon: Server, title: "Server-Side Scoring Only", desc: "All AI analysis runs on our servers. Your GitHub data is never sent to third-party AI providers in raw form — we extract metrics, not content." },
  { icon: Trash2, title: "Delete Anytime", desc: "Delete your GitRating account and all associated data from the dashboard. No hidden copies, no retention." },
  { icon: Shield, title: "No Ads, No Tracking", desc: "We don't run ads, embed tracking pixels, or sell data. Analytics are minimal and aggregate only." },
  { icon: AlertTriangle, title: "Responsible Disclosure", desc: "Found a vulnerability? Email security@mozen.in. We respond within 48 hours and work with you before public disclosure." },
];

const WE_ACCESS = [
  { item: "Public GitHub profile", reason: "Display name, avatar, bio" },
  { item: "Public repositories", reason: "Names, descriptions, languages, stars, forks" },
  { item: "Commit metadata", reason: "Recency, frequency, patterns — never diffs" },
  { item: "Repository languages", reason: "Per-repo language breakdown for stack analysis" },
];

const WE_DONT = ["Private repositories", "Source code or file contents", "Email addresses", "GitHub OAuth tokens", "Pull request or issue content"];

const MARQUEE = ["ZERO TOKENS STORED", "READ-ONLY ACCESS", "NO TRACKING", "DELETE ANYTIME", "RESPONSIBLE DISCLOSURE", "SERVER-SIDE SCORING"];

export default function SecurityPage() {
  return (
    <main style={{ overflow: "hidden" }}>
      {/* Hero */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: "-20%", left: "60%", width: "400px", height: "400px", borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.07, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2.5rem, 6vw, 5rem) 1.5rem", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Shield size={14} />
            Security
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em", margin: 0, maxWidth: "20ch" }}>
            Your data.{" "}
            <span style={{ color: "var(--accent)" }}>Your control.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--muted)", marginTop: "1rem", maxWidth: "45ch" }}>
            We take security seriously — not just because we have to, but because we&apos;re developers too.
          </motion.p>
        </div>
      </div>

      {/* Marquee */}
      <div style={{ backgroundColor: "var(--ink)", borderTop: "var(--border-width) solid var(--ink)", borderBottom: "var(--border-width) solid var(--ink)", overflow: "hidden", whiteSpace: "nowrap", padding: "0.55rem 0" }}>
        <div style={{ display: "inline-flex", animation: "marquee 22s linear infinite" }}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--paper)", padding: "0 1.75rem", display: "inline-flex", alignItems: "center", gap: "1.75rem" }}>
              {item}
              <span style={{ width: 3, height: 3, backgroundColor: "var(--accent)", borderRadius: "50%", flexShrink: 0 }} />
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } } @media (prefers-reduced-motion: reduce) { @keyframes marquee { from, to { transform: translateX(0); } } }`}</style>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2rem, 5vw, 4rem) 1.5rem" }}>
        {/* Spec strip */}
        <div className="spec-keys" style={{ justifyContent: "flex-start", marginBottom: "4rem" }}>
          <div className="keycap"><span className="keycap-legend">Tokens Stored</span><span className="keycap-text" style={{ color: "var(--accent)" }}>0</span></div>
          <div className="keycap"><span className="keycap-legend">OAuth Scope</span><span className="keycap-text">Read-Only</span></div>
          <div className="keycap"><span className="keycap-legend">Disclosure Response</span><span className="keycap-text" style={{ color: "var(--accent)" }}>48h</span></div>
          <div className="keycap"><span className="keycap-legend">Data Selling</span><span className="keycap-text">Never</span></div>
        </div>

        {/* Practices Grid */}
        <div className="uppercase-label" style={{ marginBottom: "1rem" }}>What We Do</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "3.5rem" }} className="sec-grid">
          {PRACTICES.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} custom={i} initial="hidden" animate="show" variants={fadeUp} className="card card-hover" style={{ padding: "1.5rem" }}>
                <div style={{ width: "2.25rem", height: "2.25rem", border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--paper)", boxShadow: "var(--shadow-xs)", marginBottom: "0.85rem" }}>
                  <Icon size={14} />
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", marginBottom: "0.35rem" }}>{p.title}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.65 }}>{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Data Access */}
        <div className="uppercase-label" style={{ marginBottom: "1rem" }}>Data Transparency</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }} className="sec-grid">
          {/* We DO */}
          <div style={{ border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
            <div style={{ backgroundColor: "var(--accent)", padding: "0.65rem 1.75rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Check size={12} /> We Access
            </div>
            {WE_ACCESS.map((d, i) => (
              <div key={d.item} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.6rem", padding: "0.7rem 1.75rem", borderTop: "var(--border-width) solid var(--ink)", backgroundColor: i % 2 === 0 ? "var(--paper-alt)" : "var(--paper)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--accent)", fontWeight: 700 }}>✓</div>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600 }}>{d.item}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.1rem" }}>{d.reason}</div>
                </div>
              </div>
            ))}
          </div>
          {/* We DON'T */}
          <div style={{ border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
            <div style={{ backgroundColor: "var(--surface-1)", padding: "0.65rem 1.75rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <X size={12} /> We Never Access
            </div>
            {WE_DONT.map((item, i) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.7rem 1.75rem", borderTop: i > 0 ? "var(--border-width) solid var(--ink)" : undefined, backgroundColor: i % 2 === 0 ? "var(--paper-alt)" : "var(--paper)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--danger)", fontWeight: 700 }}>✕</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>{item}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} style={{ marginTop: "3.5rem", textAlign: "center", padding: "4rem 0 1rem" }}>
          <Link href="/" className="btn-primary">Get your Engineering Score <ArrowRight size={15} /></Link>
        </motion.div>
      </div>

      <style>{`@media (max-width: 768px) { .sec-grid { grid-template-columns: 1fr !important; } }`}</style>
    </main>
  );
}
