"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from "react";
import heroProfile from "@/data/hero-profile.json";
import { ShieldCheck, ExternalLink } from "lucide-react";

/* ─── Constants ──────────────────────────────────────────────────── */

const CYCLE_MS = 4000;
const FADE_MS = 380;
const SCORE_ANIM_MS = 850;
const SKILL_STAGGER_MS = 100;

const SKILL_KEYS = [
  "activity",
  "quality",
  "stack",
  "practices",
  "collaboration",
  "maturity",
] as const;

const SKILL_LABELS: Record<string, string> = {
  activity: "Activity",
  quality: "Quality",
  stack: "Stack",
  practices: "Practices",
  collaboration: "Collab",
  maturity: "Maturity",
};

/* ─── Types ──────────────────────────────────────────────────────── */

interface ProfileSlot {
  type: "real" | "anon";
  displayName: string;
  score: number;
  level: string;
  skills: Record<string, number>;
  avatarUrl?: string;
  login?: string;
  htmlUrl?: string;
}

/* ─── Slots (anon first, real last → climax of each cycle) ──────── */

const SLOTS: ProfileSlot[] = [
  {
    type: "anon",
    displayName: "dev_4f3a",
    score: 72,
    level: "Solid Contributor",
    skills: {
      activity: 68,
      quality: 74,
      stack: 65,
      practices: 80,
      collaboration: 70,
      maturity: 75,
    },
  },
  {
    type: "anon",
    displayName: "k_ravi",
    score: 85,
    level: "Senior Engineer",
    skills: {
      activity: 82,
      quality: 88,
      stack: 79,
      practices: 91,
      collaboration: 85,
      maturity: 86,
    },
  },
  {
    type: "real",
    displayName: (heroProfile as { name: string }).name ?? "Abi-de-jo",
    score: (heroProfile as { score: number }).score ?? 0,
    level: (heroProfile as { level: string }).level ?? "Engineer",
    skills: (heroProfile as { skills: Record<string, number> }).skills ?? {},
    avatarUrl: (heroProfile as { avatarUrl: string }).avatarUrl,
    login: (heroProfile as { login: string }).login,
    htmlUrl: (heroProfile as { htmlUrl: string }).htmlUrl,
  },
];

/* ─── Hooks ──────────────────────────────────────────────────────── */

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ─── Component ──────────────────────────────────────────────────── */

export function HeroScoreCard() {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  /* State */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedSlot, setDisplayedSlot] = useState<ProfileSlot>(SLOTS[0]);
  const [opacity, setOpacity] = useState(1);
  const [displayedScore, setDisplayedScore] = useState(0);
  const [skillWidths, setSkillWidths] = useState<number[]>(
    SKILL_KEYS.map(() => 0),
  );
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  /* Refs for cleanup */
  const animFrameRef = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const mountedRef = useRef(true);

  /* ─── Cycle slots ────────────────────────────────────────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLOTS.length);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  /* ─── Animate score count-up ────────────────────────────────── */
  const animateScore = useCallback(
    (target: number) => {
      if (reduced || !mountedRef.current) {
        setDisplayedScore(target);
        return;
      }
      cancelAnimationFrame(animFrameRef.current);
      const start = performance.now();
      const step = (now: number) => {
        if (!mountedRef.current) return;
        const elapsed = now - start;
        const progress = Math.min(elapsed / SCORE_ANIM_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayedScore(Math.round(eased * target));
        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        }
      };
      animFrameRef.current = requestAnimationFrame(step);
    },
    [reduced],
  );

  /* ─── Animate skill bars (staggered) ────────────────────────── */
  const animateSkills = useCallback(
    (skills: Record<string, number>) => {
      if (reduced || !mountedRef.current) {
        setSkillWidths(SKILL_KEYS.map((k) => skills[k] ?? 0));
        return;
      }
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      setSkillWidths(SKILL_KEYS.map(() => 0));
      SKILL_KEYS.forEach((key, i) => {
        const t = setTimeout(() => {
          if (!mountedRef.current) return;
          setSkillWidths((prev) => {
            const next = [...prev];
            next[i] = skills[key] ?? 0;
            return next;
          });
        }, i * SKILL_STAGGER_MS);
        timeoutsRef.current.push(t);
      });
    },
    [reduced],
  );

  /* ─── Handle slot change ────────────────────────────────────── */
  useEffect(() => {
    const slot = SLOTS[currentIndex];
    if (reduced) {
      setDisplayedSlot(slot);
      setDisplayedScore(slot.score);
      setSkillWidths(SKILL_KEYS.map((k) => slot.skills[k] ?? 0));
      setOpacity(1);
      return;
    }
    setOpacity(0.3);
    const t = setTimeout(() => {
      if (!mountedRef.current) return;
      setDisplayedSlot(slot);
      animateScore(slot.score);
      animateSkills(slot.skills);
      setOpacity(1);
    }, FADE_MS / 2);
    return () => clearTimeout(t);
  }, [currentIndex, reduced, animateScore, animateSkills]);

  /* ─── Mouse tilt ────────────────────────────────────────────── */
  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -10,
      y: (x - 0.5) * 10,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  /* ─── Cleanup ────────────────────────────────────────────────── */
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const isReal = displayedSlot.type === "real";

  return (
    <>
      {/* Keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes heroScanline {
              0%   { top: -2px; }
              100% { top: calc(100% + 2px); }
            }
            @keyframes cursorBlink {
              0%, 49%  { opacity: 1; }
              50%, 100% { opacity: 0; }
            }
            @media (max-width: 600px) {
              .hero-score-grid { grid-template-columns: 1fr !important; }
              .hero-score-grid > div:first-child {
                border-right: none !important;
                border-bottom: var(--border-width) solid var(--ink) !important;
              }
            }
          `,
        }}
      />

      {/* Outer wrapper (perspective host) */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ maxWidth: "680px", width: "100%" }}
      >
        {/* Card (receives tilt transform) */}
        <div
          style={{
            transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: reduced ? "none" : "transform 0.15s ease-out",
            border: "var(--border-width) solid var(--ink)",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-xl)",
            overflow: "hidden",
            backgroundColor: "var(--paper-alt)",
            position: "relative",
          }}
        >
          {/* ── Scan-line ─────────────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 3,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, var(--accent), transparent)",
                opacity: 0.35,
                animation: reduced
                  ? "none"
                  : "heroScanline 3s linear infinite",
              }}
            />
          </div>

          {/* ── Identity Row (real-profile only) ──────────────── */}
          <div
            style={{
              height: "64px",
              opacity: isReal ? 1 : 0,
              transition: "opacity 0.4s ease",
              pointerEvents: isReal ? "auto" : "none",
              borderBottom: "var(--border-width) solid var(--ink)",
              padding: "0 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              overflow: "hidden",
              position: "relative",
              zIndex: 1,
            }}
          >
            {isReal && (
              <>
                {/* Avatar */}
                <img
                  src={displayedSlot.avatarUrl}
                  alt={displayedSlot.displayName}
                  width={36}
                  height={36}
                  style={{
                    borderRadius: "50%",
                    border: "var(--border-width) solid var(--ink)",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                {/* Name + handle + link */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {displayedSlot.displayName}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: "var(--muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      marginTop: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <span>@{displayedSlot.login}</span>
                    <span
                      style={{
                        width: "1px",
                        height: "10px",
                        backgroundColor: "var(--muted-light)",
                        flexShrink: 0,
                      }}
                    />
                    <a
                      href={displayedSlot.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--accent)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "3px",
                        textDecoration: "none",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {displayedSlot.htmlUrl?.replace("https://", "")}
                      <ExternalLink size={9} style={{ flexShrink: 0 }} />
                    </a>
                  </div>
                </div>
                {/* AI Verified badge */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5rem",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.08em",
                    color: "#16a34a",
                    backgroundColor: "#16a34a12",
                    border: "1.5px solid #16a34a",
                    borderRadius: "var(--radius)",
                    padding: "0.2rem 0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={11} />
                  AI Verified
                </div>
              </>
            )}
          </div>

          {/* ── Main Content (score + skill bars) ─────────────── */}
          <div
            className="hero-score-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              opacity,
              transition: "opacity 0.4s ease",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Left — Score */}
            <div
              style={{
                padding: "2.5rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "var(--border-width) solid var(--ink)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.12em",
                  color: "var(--accent)",
                  marginBottom: "0.75rem",
                }}
              >
                Engineering Score
              </div>

              {/* Score number + blinking cursor */}
              <div
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "baseline",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "5rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "var(--accent)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {displayedScore}
                </div>
                <div
                  style={{
                    width: "3px",
                    height: "3.2rem",
                    backgroundColor: "var(--accent)",
                    marginLeft: "4px",
                    alignSelf: "center",
                    animation: reduced
                      ? "none"
                      : "cursorBlink 1s step-end infinite",
                  }}
                />
              </div>

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--muted)",
                  marginTop: "0.35rem",
                }}
              >
                out of 100
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  marginTop: "0.75rem",
                }}
              >
                {displayedSlot.level}
              </div>
            </div>

            {/* Right — Skill Bars */}
            <div style={{ padding: "2rem 1.5rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.1em",
                  color: "var(--muted)",
                  marginBottom: "1rem",
                }}
              >
                Skill Breakdown
              </div>
              {SKILL_KEYS.map((key, i) => {
                const value = displayedSlot.skills[key] ?? 0;
                const width = skillWidths[i] ?? 0;
                return (
                  <div key={key} style={{ marginBottom: "0.65rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          fontWeight: 500,
                          textTransform: "uppercase" as const,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {SKILL_LABELS[key]}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          color:
                            value >= 70 ? "var(--accent)" : "var(--ink)",
                        }}
                      >
                        {value}
                      </span>
                    </div>
                    <div className="score-bar">
                      <div
                        className="score-bar-fill"
                        style={{
                          width: `${width}%`,
                          backgroundColor:
                            value >= 70 ? "var(--accent)" : "var(--ink)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
