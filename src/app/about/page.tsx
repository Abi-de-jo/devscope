import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Youtube, Instagram, Github, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About — GitRating",
  description: "Abisheik — full-stack developer, project manager, and tech content creator. Co-founder of Mozen. Building GitRating and Fahh.",
};

const ROLES = [
  { title: "Full-Stack Developer", desc: "Next.js, Prisma, AI, and everything in between — shipping production SaaS, web, and mobile apps." },
  { title: "Project Manager", desc: "Outcome-focused delivery for international clients, remote-first, from spec to launch." },
  { title: "Tech Content Creator", desc: "6,000+ subscribers on YouTube teaching code — primarily in Tamil — from CSS to React to SQL to AI." },
  { title: "Co-founder, Mozen", desc: "A remote-first software studio building SaaS, web, and mobile products for global clients." },
];

const PROJECTS = [
  {
    name: "GitRating",
    desc: "A “GitHub Wrapped” for engineering credibility — an AI that scores your GitHub across ten axes with full evidence and recommendations.",
    href: "/",
    cta: "Try GitRating",
  },
  {
    name: "Fahh — Error Sound",
    desc: "The viral VS Code extension that plays the “FAHH” sound on code errors and terminal failures. Built for developers who want feedback they can hear.",
    href: "https://github.com/Abi-de-jo/Fahh",
    cta: "View on GitHub",
  },
];

const SOCIALS = [
  { icon: Youtube, label: "YouTube", sub: "6,000+ subs · Tamil coding", href: "https://www.youtube.com/@codebyabi" },
  { icon: Instagram, label: "Instagram", sub: "@codebyabi · dev lifestyle", href: "https://www.instagram.com/codebyabi" },
  { icon: Github, label: "GitHub", sub: "@Abi-de-jo", href: "https://github.com/Abi-de-jo" },
  { icon: Globe, label: "Portfolio", sub: "codebyabi.dev", href: "https://codebyabi.dev" },
];

export default function AboutPage() {
  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2rem, 6vw, 5rem) 1.5rem" }}>
      {/* Row 1: name + summary */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 700, lineHeight: 1.05, margin: 0 }}>
          Abisheik
        </h1>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: "0.4rem" }}>
          @codebyabi · @Abi-de-jo
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.7, marginTop: "1rem", maxWidth: "60ch" }}>
          Full-stack developer, project manager & tech content creator. Co-founder of Mozen — building SaaS, web, and mobile products for global clients.
        </p>
      </section>

      {/* Row 2: photo (left) + What I do vertically (right) */}
      <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 440px) 1fr", gap: "2.5rem", alignItems: "stretch", marginBottom: "4rem" }}>
        {/* Left column: photo, stretched to match right column height */}
        <div style={{ position: "relative", minHeight: "420px", border: "var(--border-width) solid var(--ink)", borderRadius: "2px", boxShadow: "var(--shadow-md)", overflow: "hidden", background: "var(--paper-alt)" }}>
          <Image src="/about.jpg" alt="Abisheik" fill style={{ objectFit: "cover", display: "block" }} priority sizes="(max-width: 768px) 100vw, 400px" />
        </div>

        {/* Right column: What I do, vertical stack */}
        <div>
          <div className="uppercase-label" style={{ marginBottom: "1.5rem" }}>What I do</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {ROLES.map((r) => (
              <div key={r.title} className="card" style={{ borderRadius: 0, padding: "1.5rem", cursor: "pointer" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem" }}>{r.title}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "0.5rem" }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Things I've built */}
      <section style={{ marginBottom: "4rem" }}>
        <div className="uppercase-label" style={{ marginBottom: "1.5rem" }}>Things I&apos;ve built</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {PROJECTS.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="card card-hover" style={{ borderRadius: 0, padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem", textDecoration: "none", color: "var(--ink)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700 }}>{p.name}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.6, flex: 1 }}>{p.desc}</p>
              <span className="btn-secondary" style={{ alignSelf: "flex-start", fontSize: "0.8rem" }}>{p.cta} <ArrowRight size={14} /></span>
            </a>
          ))}
        </div>
      </section>

      {/* Where to find me */}
      <section style={{ marginBottom: "4rem" }}>
        <div className="uppercase-label" style={{ marginBottom: "1.5rem" }}>Where to find me</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 0, border: "var(--border-width) solid var(--ink)", borderRadius: "2px", overflow: "hidden" }}>
          {SOCIALS.map((s, i) => {
            const Icon = s.icon;
            return (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="card" style={{ borderRadius: 0, borderBottom: i < SOCIALS.length - 1 ? "var(--border-width) solid var(--ink)" : "none", padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "center", textDecoration: "none", color: "var(--ink)" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "var(--paper-alt)" }}>
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem" }}>{s.label}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.03em" }}>{s.sub}</div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ border: "var(--border-width) solid var(--ink)", borderRadius: "2px", boxShadow: "var(--shadow-md)", padding: "2.5rem", textAlign: "center", background: "var(--paper-alt)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, margin: 0 }}>Curious what your GitHub says about you?</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--muted)", marginTop: "0.75rem" }}>Run GitRating on your profile — free, no signup required.</p>
        <Link href="/" className="btn-primary" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
          Score my GitHub <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
