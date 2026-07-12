"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Eye, Server, Trash2, Shield, MapPin, AlertTriangle, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const SECTIONS = [
  { icon: Eye, title: "What We Collect", body: "When you sign in with GitHub OAuth, we access your public GitHub profile (username, display name, avatar, bio) and your public repositories (names, descriptions, languages, stars, forks, commit metadata). We do not access private repos, source code, file contents, email addresses, or OAuth tokens.", featured: true },
  { icon: Server, title: "How We Use Your Data", body: "We use your GitHub data solely to generate your engineering credibility score and shareable report. The data is processed on our servers and is not used for advertising, profiling, or any purpose other than providing the Service." },
  { icon: Trash2, title: "Data Storage and Retention", body: "Your GitHub profile and scoring results are stored in our database to power your public profile page and leaderboard participation. You may delete your account and all data at any time. Deleted data is permanently removed within 30 days." },
  { icon: Shield, title: "Third-Party Services", body: "We use: Vercel (hosting), Neon (database), GitHub OAuth (authentication), and AI language models (scoring). Your GitHub data is never sent to AI providers in raw form — we extract aggregate metrics only." },
  { icon: Lock, title: "Cookies", body: "We use only essential session cookies required for authentication. We do not use tracking cookies, advertising cookies, or third-party analytics cookies." },
  { icon: AlertTriangle, title: "Data Sharing", body: "We do not sell, rent, or share your personal data with third parties for marketing purposes. Your public profile page is visible by design — you control leaderboard visibility via the opt-out setting." },
  { icon: MapPin, title: "Leaderboard", body: "Your leaderboard entry uses your GitHub username, display name, avatar, and aggregate scores — all derived from your public GitHub profile. You may opt out at any time. Opting out removes your entry within one cache cycle (up to 36 hours)." },
  { icon: Shield, title: "Security", body: "We implement industry-standard security practices including HTTPS encryption, secure session management, and minimal data collection. We do not store OAuth tokens. See our Security page for full details." },
  { icon: Eye, title: "Children's Privacy", body: "The Service is not intended for users under 13 years of age. We do not knowingly collect data from children." },
  { icon: AlertTriangle, title: "Changes to This Policy", body: "We may update this policy at any time. Material changes will be communicated via email or a notice on the Service. Continued use after changes constitutes acceptance." },
];

const MARQUEE = ["PRIVACY", "YOUR DATA", "NO TRACKING", "DELETE ANYTIME", "TRANSPARENCY", "SECURITY"];

export default function PrivacyPage() {
  const featured = SECTIONS[0];
  const FeaturedIcon = featured.icon;

  return (
    <main style={{ overflow: "hidden" }}>
      {/* Hero */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: "-20%", left: "10%", width: "400px", height: "400px", borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.07, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2.5rem, 6vw, 5rem) 1.5rem", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Lock size={14} />
            Legal
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em", margin: 0 }}>
            Privacy{" "}
            <span style={{ color: "var(--accent)" }}>Policy</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.75rem" }}>
            Last updated: July 2026
          </motion.p>
        </div>
      </div>

      {/* Marquee */}
      <div style={{ backgroundColor: "var(--ink)", borderTop: "var(--border-width) solid var(--ink)", borderBottom: "var(--border-width) solid var(--ink)", overflow: "hidden", whiteSpace: "nowrap", padding: "0.55rem 0" }}>
        <div style={{ display: "inline-flex", animation: "marquee 18s linear infinite" }}>
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
        {/* Featured first section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="card" style={{ marginBottom: "1.75rem", backgroundColor: "var(--accent)", boxShadow: "var(--shadow-accent)", padding: "2rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <div style={{ width: "2.25rem", height: "2.25rem", border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--ink)", color: "var(--accent)", flexShrink: 0 }}>
              <FeaturedIcon size={14} />
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>{featured.title}</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.75, color: "var(--ink)", opacity: 0.8 }}>{featured.body}</p>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }} className="priv-grid">
          {SECTIONS.slice(1).map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} custom={i} initial="hidden" animate="show" variants={fadeUp} className="card card-hover" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "2rem", height: "2rem", border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--paper)", boxShadow: "var(--shadow-xs)", flexShrink: 0 }}>
                    <Icon size={12} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem" }}>{s.title}</h3>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.65 }}>{s.body}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} style={{ marginTop: "4rem", textAlign: "center", padding: "2rem 0 1rem" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--muted)", marginBottom: "1rem" }}>
            Privacy questions? Email <strong style={{ color: "var(--ink)" }}>privacy@mozen.in</strong>
          </p>
          <Link href="/" className="btn-primary">Get your Engineering Score <ArrowRight size={15} /></Link>
        </motion.div>
      </div>

      <style>{`@media (max-width: 768px) { .priv-grid { grid-template-columns: 1fr !important; } }`}</style>
    </main>
  );
}
