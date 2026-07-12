"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Shield,
  GitBranch,
  FileText,
  Boxes,
  Lock,
  TestTube,
  Layout,
  ChevronDown,
  Cpu,
  Code,
  Wrench,
} from "lucide-react";

const AXES = [
  { name: "Architecture", weight: 17, icon: Boxes, desc: "Project structure, modularity, separation of concerns, dependency direction, and how well the codebase scales. We look at directory layout, coupling, and design patterns." },
  { name: "Backend", weight: 14, icon: GitBranch, desc: "API design, database usage, server patterns, and authentication. Evaluated from server code, schema files, and route handlers." },
  { name: "Frontend", weight: 13, icon: Layout, desc: "UI frameworks, component quality, CSS architecture, and responsive design. Judged from component files and styling approach." },
  { name: "Code Quality", weight: 12, icon: Code, desc: "Naming (descriptive vs x2/temp), function/file size (no 500-line god-functions), DRY (reused utilities vs copy-paste), real error handling with recovery, and real type safety (no `any` everywhere)." },
  { name: "Testing", weight: 12, icon: TestTube, desc: "Presence of tests at all, edge-case coverage (not just happy-path), unit/integration/e2e mix, and CI actually running the tests. A repo with zero tests scores low here regardless of features." },
  { name: "Security", weight: 11, icon: Lock, desc: "Auth patterns, secrets handling, dependency hygiene (CVEs), and input validation. We flag risky patterns and committed secrets — not just count files." },
  { name: "DevOps", weight: 9, icon: Shield, desc: "CI/CD configs, Docker, deployment files, and infrastructure-as-code. Shows whether the project is shippable, not just buildable." },
  { name: "Documentation", weight: 5, icon: FileText, desc: "README quality, inline docs explaining why, JSDoc/TSDoc, and contributing guides. Low weight, but it multiplies trust in the other signals." },
  { name: "Maintainability", weight: 4, icon: Wrench, desc: "Commit message quality (meaningful vs 'fix'/'wip'), PR discipline (small reviewable vs giant dumps), refactoring evidence over time, and no dead or commented-out code left lying around." },
  { name: "Complexity & Judgment", weight: 3, icon: Cpu, desc: "Right-sized solutions (no Kubernetes for a todo app, no hand-rolled auth when a library exists), tradeoff awareness, and original problem-solving vs tutorial-following. The hardest signal to detect — we score it conservatively and say so." },
];

const STEPS = [
  { n: "01", title: "Connect GitHub", desc: "One OAuth click. Public repos only. No private code is ever read or stored on our servers." },
  { n: "02", title: "Sync signals", desc: "We pull repositories, languages, topics, READMEs, file structures, and activity — then normalize them." },
  { n: "03", title: "AI analysis", desc: "A model scores 10 axes, per-repository, with evidence, missing signals, and recommendations for each." },
  { n: "04", title: "Explainable score", desc: "You get a number, the confidence behind it, and exactly why — every single time. No black boxes." },
];

const ANALYZE = [
  "Repositories", "Commit history", "Project complexity", "Architecture",
  "Code quality", "Documentation", "Testing", "Deployment config",
  "Tech debt", "Open-source activity", "Dependency health", "CI/CD pipelines",
  "Security posture", "Language mix",
];

type TabId = "how" | "what" | "weights" | "confidence" | "disclaimer";

const TABS: { id: TabId; label: string }[] = [
  { id: "how", label: "How it works" },
  { id: "what", label: "What we analyze" },
  { id: "weights", label: "Score weights" },
  { id: "confidence", label: "Confidence" },
  { id: "disclaimer", label: "Important" },
];

export function MethodologyInteractive() {
  const [tab, setTab] = useState<TabId>("how");
  const [openAxis, setOpenAxis] = useState<string | null>("Architecture");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleChip = (item: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  return (
    <div>
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "2.5rem",
        }}
      >
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                padding: "0.6rem 1rem",
                border: "var(--border-width) solid var(--ink)",
                background: active ? "var(--accent)" : "var(--paper)",
                color: active ? "var(--paper)" : "var(--ink)",
                cursor: "pointer",
                boxShadow: active ? "var(--shadow-md)" : "none",
                transform: active ? "translate(-2px, -2px)" : "none",
                transition: "all 0.12s ease",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = "var(--paper-alt)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "var(--paper)";
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {tab === "how" && (
          <motion.div
            key="how"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 0, border: "var(--border-width) solid var(--ink)", borderRadius: "2px", overflow: "hidden" }}
          >
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="card"
                style={{ borderRadius: 0, borderBottom: "var(--border-width) solid var(--ink)", borderRight: i < STEPS.length - 1 ? "var(--border-width) solid var(--ink)" : "none", padding: "1.75rem", cursor: "default" }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "2.5rem", fontWeight: 700, color: "var(--accent)", opacity: 0.4, lineHeight: 1, marginBottom: "1rem" }}>{s.n}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>{s.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </motion.div>
        )}

        {tab === "what" && (
          <motion.div
            key="what"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <p className="uppercase-label" style={{ marginBottom: "1rem" }}>Tap a signal to inspect it</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {ANALYZE.map((item) => {
                const on = selected.has(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleChip(item)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                      padding: "0.6rem 1rem",
                      border: "var(--border-width) solid var(--ink)",
                      background: on ? "var(--ink)" : "var(--paper)",
                      color: on ? "var(--paper)" : "var(--ink)",
                      cursor: "pointer",
                      boxShadow: on ? "var(--shadow-md)" : "none",
                      transform: on ? "translate(-2px, -2px)" : "none",
                      transition: "all 0.12s ease",
                    }}
                  >
                    {on ? "◆ " : "◇ "}{item}
                  </button>
                );
              })}
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--muted)", marginTop: "1.5rem", lineHeight: 1.6 }}>
              {selected.size === 0
                ? "Select any signal above to see how it feeds into your score. Each one maps to one or more of the ten engineering axes."
                : `Selected ${selected.size} signal${selected.size > 1 ? "s" : ""}. These combine across the ten axes using a confidence-weighted blend — not a flat average.`}
            </p>
          </motion.div>
        )}

        {tab === "weights" && (
          <motion.div
            key="weights"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="card"
            style={{ borderRadius: 0, padding: "1.5rem" }}
          >
            {AXES.map((axis) => {
              const Icon = axis.icon;
              const open = openAxis === axis.name;
              return (
                <div key={axis.name} style={{ borderBottom: "1px dashed var(--border)" }}>
                  <button
                    type="button"
                    onClick={() => setOpenAxis(open ? null : axis.name)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem", background: "none", border: "none", cursor: "pointer", padding: "1rem 0.25rem", textAlign: "left" }}
                  >
                    <div style={{ width: "2.25rem", height: "2.25rem", border: "var(--border-width) solid var(--ink)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "var(--paper-alt)" }}>
                      <Icon size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem" }}>{axis.name}</div>
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 700, width: "48px", textAlign: "right" }}>{axis.weight}%</div>
                    <ChevronDown size={16} style={{ transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "none", color: "var(--accent)" }} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ padding: "0 0.25rem 1rem 3.25rem" }}>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "0.75rem" }}>{axis.desc}</p>
                          <div style={{ height: "10px", background: "var(--paper)", border: "1.5px solid var(--ink)" }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${axis.weight}%` }} transition={{ duration: 0.5, ease: "easeOut" }} style={{ height: "100%", background: "var(--accent)" }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)", marginTop: "1rem", lineHeight: 1.6 }}>
              The overall score is a confidence-weighted blend of the ten axes — not a simple average. Axes with low confidence pull the score down rather than inflating it.
            </p>
          </motion.div>
        )}

        {tab === "confidence" && (
          <motion.div
            key="confidence"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="card"
            style={{ borderRadius: 0, padding: "2rem", borderLeft: "6px solid var(--accent)" }}
          >
            <div className="uppercase-label" style={{ marginBottom: "1rem" }}>Confidence, not certainty</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Every axis and the overall score carries a <strong>confidence</strong> value. If we only detected two backend repositories, the Backend score is marked <em>Low confidence</em> — we say so explicitly instead of pretending certainty. A lower score with clear evidence is more valuable than a generous score with vague praise.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              {[["High", "var(--accent)"], ["Medium", "var(--ink)"], ["Low", "#E74C3C"]].map(([label, color]) => (
                <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color, border: `1.5px solid ${color}`, borderRadius: "2px", padding: "0.15rem 0.5rem", background: "var(--paper)" }}>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {tab === "disclaimer" && (
          <motion.div
            key="disclaimer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="card"
            style={{ borderRadius: 0, padding: "2rem", background: "var(--paper-alt)" }}
          >
            <div className="uppercase-label" style={{ marginBottom: "1rem", color: "#E74C3C" }}>Important</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.7, color: "var(--ink)" }}>
              GitRating scores are <strong>AI estimates based on repository evidence</strong>. They are a tool for self-improvement and signaling — <strong>not hiring decisions</strong>, and not a substitute for human judgment. Your code remains yours; we only ever read public repository metadata.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
