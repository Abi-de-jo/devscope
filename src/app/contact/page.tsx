"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MessageSquare, ArrowRight, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/brand-icons";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const CHANNELS = [
  { icon: Mail, title: "Email", handle: "hello@mozen.in", href: "mailto:hello@mozen.in", desc: "General inquiries, feedback, partnerships." },
  { icon: GithubIcon, title: "GitHub Issues", handle: "Abi-de-jo/GitRating", href: "https://github.com/Abi-de-jo/GitRating/issues", desc: "Bug reports, feature requests, technical issues." },
  { icon: MessageSquare, title: "Twitter / X", handle: "@mozen_in", href: "https://x.com/mozen_in", desc: "Quick questions, announcements, memes." },
];

const SOCIALS = [
  { Icon: GithubIcon, label: "GitHub", href: "https://github.com/Abi-de-jo", handle: "@Abi-de-jo" },
  { Icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/codebyabisheik", handle: "codebyabisheik" },
  { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/codebyabi", handle: "@codebyabi" },
];

const MARQUEE = ["HELLO", "REACH OUT", "BUILD TOGETHER", "FEEDBACK", "COLLABORATE", "CONNECT"];

export default function ContactPage() {
  return (
    <main style={{ overflow: "hidden" }}>
      {/* Hero */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: "-20%", right: "10%", width: "400px", height: "400px", borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.07, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2.5rem, 6vw, 5rem) 1.5rem", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Mail size={14} />
            Contact
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em", margin: 0, maxWidth: "20ch" }}>
            We&apos;d love to{" "}
            <span style={{ color: "var(--accent)" }}>hear</span>{" "}
            from you.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--muted)", marginTop: "1rem", maxWidth: "45ch" }}>
            Whether you have a question about features, pricing, or just want to say hello — pick a channel below.
          </motion.p>
        </div>
      </div>

      {/* Marquee */}
      <div style={{ backgroundColor: "var(--ink)", borderTop: "var(--border-width) solid var(--ink)", borderBottom: "var(--border-width) solid var(--ink)", overflow: "hidden", whiteSpace: "nowrap", padding: "0.55rem 0" }}>
        <div style={{ display: "inline-flex", animation: "marquee 20s linear infinite" }}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--paper)", padding: "0 1.75rem", display: "inline-flex", alignItems: "center", gap: "1.25rem" }}>
              {item}
              <span style={{ width: 3, height: 3, backgroundColor: "var(--accent)", borderRadius: "50%", flexShrink: 0 }} />
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } } @media (prefers-reduced-motion: reduce) { @keyframes marquee { from, to { transform: translateX(0); } } }`}</style>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2rem, 5vw, 4rem) 1.5rem" }}>
        {/* Spec strip */}
        <div className="spec-keys" style={{ justifyContent: "flex-start", marginBottom: "3rem" }}>
          <div className="keycap"><span className="keycap-legend">Response Time</span><span className="keycap-text" style={{ color: "var(--accent)" }}>24–48h</span></div>
          <div className="keycap"><span className="keycap-legend">Fastest Channel</span><span className="keycap-text">GitHub Issues</span></div>
          <div className="keycap"><span className="keycap-legend">Availability</span><span className="keycap-text">Business Days</span></div>
        </div>

        {/* Channels */}
        <div className="uppercase-label" style={{ marginBottom: "1rem" }}>Channels</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "3.5rem" }}>
          {CHANNELS.map((ch, i) => {
            const Icon = ch.icon;
            const isGithub = ch.icon === GithubIcon;
            return (
              <motion.a key={ch.title} custom={i} initial="hidden" animate="show" variants={fadeUp} href={ch.href} target={ch.href.startsWith("mailto:") ? undefined : "_blank"} rel={ch.href.startsWith("mailto:") ? undefined : "noopener noreferrer"} className="card card-hover" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "1.25rem", padding: "1.25rem 1.5rem", textDecoration: "none", color: "var(--ink)" }}>
                <div style={{ width: "2.75rem", height: "2.75rem", border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--paper)", boxShadow: "var(--shadow-xs)", flexShrink: 0 }}>
                  {isGithub ? <Icon size={16} /> : <Icon size={18} />}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem" }}>{ch.title}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--muted)", marginTop: "0.15rem" }}>{ch.desc}</div>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  {ch.handle}<ArrowRight size={12} />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Social */}
        <div className="uppercase-label" style={{ marginBottom: "1rem" }}>Find us elsewhere</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }} className="contact-social">
          {SOCIALS.map((s, i) => (
            <motion.a key={s.label} custom={i} initial="hidden" animate="show" variants={fadeUp} href={s.href} target="_blank" rel="noopener noreferrer" className="card card-hover" style={{ textDecoration: "none", color: "var(--ink)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "1.75rem 1rem", gap: "0.6rem" }}>
              <div style={{ width: "2.5rem", height: "2.5rem", border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--paper)", boxShadow: "var(--shadow-xs)" }}>
                <s.Icon size={16} />
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem" }}>{s.label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--muted)" }}>{s.handle}</div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} style={{ marginTop: "3.5rem", textAlign: "center", padding: "3rem 0 1rem" }}>
          <Link href="/" className="btn-primary">Get your Engineering Score <ArrowRight size={15} /></Link>
        </motion.div>
      </div>

      <style>{`@media (max-width: 768px) { .contact-social { grid-template-columns: 1fr !important; } }`}</style>
    </main>
  );
}
