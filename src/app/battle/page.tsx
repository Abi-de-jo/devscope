"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Swords,
  Plus,
  X,
  AlertTriangle,
  Trophy,
  Star,
  Zap,
  LinkIcon,
} from "lucide-react";
import type {
  CompareResponse,
  CompareResult,
} from "@/lib/compare-engine";
import { buildCompareResponse } from "@/lib/compare-engine";
import { handleApiResponse } from "@/lib/errors";
import { BattleCompareLoader } from "@/components/loaders/battle-compare-loader";

/* ─── Category metadata ─────────────────────────────────────────────── */

const CATEGORIES = [
  "code-activity",
  "repository-quality",
  "technical-stack",
  "engineering-practices",
  "collaboration",
  "project-maturity",
] as const;

const CATEGORY_LABEL: Record<string, string> = {
  "code-activity": "Code Activity",
  "repository-quality": "Repository Quality",
  "technical-stack": "Technical Stack",
  "engineering-practices": "Engineering Practices",
  "collaboration": "Collaboration",
  "project-maturity": "Project Maturity",
};

const CATEGORY_ICON: Record<string, string> = {
  "code-activity": "⚡",
  "repository-quality": "📦",
  "technical-stack": "🛠",
  "engineering-practices": "⚙",
  "collaboration": "🤝",
  "project-maturity": "🏛",
};

const BAR_COLORS = ["var(--accent)", "#FF6B6B", "#FFD93D", "#6BCB77"];

/* ─── Helpers ───────────────────────────────────────────────────────── */

function renderStars(count: number, size = 16) {
  return (
    <span style={{ display: "inline-flex", gap: "1px" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < count ? "var(--ink)" : "none"}
          color="var(--ink)"
          strokeWidth={i < count ? 0 : 1.5}
          style={{
            opacity: i < count ? 1 : 0.25,
          }}
        />
      ))}
    </span>
  );
}

function scoreColor(score: number): string {
  if (score >= 80) return "var(--accent)";
  if (score >= 50) return "var(--ink)";
  return "var(--muted)";
}

/* ─── Page component ────────────────────────────────────────────────── */

export default function BattlePage() {
  const [usernames, setUsernames] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CompareResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Battle compare loader state
  const [showLoader, setShowLoader] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [loaderStep, setLoaderStep] = useState(0);
  const [loaderUsernames, setLoaderUsernames] = useState<string[]>([]);
  const [loaderAvatars, setLoaderAvatars] = useState<Record<string, string>>({});
  const loaderIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loaderStartRef = useRef(0);

  // Client-side profile cache — instant re-compare for same usernames
  const profileCacheRef = useRef(new Map<string, CompareResult>());

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loaderIntervalRef.current) clearInterval(loaderIntervalRef.current);
    };
  }, []);

  /* ── Username field management ──────────────────────────────────── */

  const addField = () => {
    if (usernames.length < 4) setUsernames([...usernames, ""]);
  };

  const removeField = (idx: number) => {
    if (usernames.length <= 2) return;
    setUsernames(usernames.filter((_, i) => i !== idx));
  };

  const updateField = (idx: number, val: string) => {
    const next = [...usernames];
    next[idx] = val;
    setUsernames(next);
  };

  /* ── Compare handler ────────────────────────────────────────────── */

  const handleCompare = async () => {
    const valid = usernames.map((u) => u.trim()).filter(Boolean);
    if (valid.length < 2) {
      setError("Enter at least 2 GitHub usernames.");
      return;
    }

    // Split into cached vs uncached (for instant all-cached path)
    const allCached = valid.every(
      (u) => profileCacheRef.current.has(u) && !profileCacheRef.current.get(u)!.error
    );

    // ── All cached → instant results, no loader, no API call ──
    if (allCached) {
      setLoading(true);
      setError(null);
      setResults(null);

      const profiles = valid.map(
        (u) => profileCacheRef.current.get(u)!
      );
      const response = buildCompareResponse(profiles);
      setResults(response);
      setLoading(false);
      return;
    }

    // ── Some uncached → show loader, send ALL usernames ──
    // Server Redis cache handles fast hits for already-cached users.
    // This keeps the loader/UI consistent — always shows all usernames.
    setLoaderUsernames(valid);
    setLoaderAvatars({});
    setShowLoader(true);
    setLoaderProgress(0);
    setLoaderStep(0);
    loaderStartRef.current = Date.now();

    // Drive progress with exponential curve + step advancement
    if (loaderIntervalRef.current) clearInterval(loaderIntervalRef.current);
    loaderIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - loaderStartRef.current;
      const raw = 92 * (1 - Math.exp(-elapsed / 3000));
      setLoaderProgress(Math.min(raw, 92));
      if (elapsed > 7000) setLoaderStep(3);
      else if (elapsed > 4500) setLoaderStep(2);
      else if (elapsed > 1800) setLoaderStep(1);
      else setLoaderStep(0);
    }, 80);

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernames: valid }),
      });
      if (await handleApiResponse(res)) return;
      const data: CompareResponse = await res.json();

      if (!data.success) {
        setError(data.error ?? "Comparison failed.");
        if (loaderIntervalRef.current) clearInterval(loaderIntervalRef.current);
        setShowLoader(false);
        return;
      }

      // Store freshly fetched profiles in client cache
      for (const p of data.profiles) {
        if (!p.error) profileCacheRef.current.set(p.username, p);
      }

      // Server returns profiles in the same order as requested — use directly
      const profiles = valid.map(
        (u) => data.profiles.find((p) => p.username === u) ?? profileCacheRef.current.get(u)!
      );
      const mergedResponse = buildCompareResponse(profiles);

      // Extract avatars for loader reveal
      const avatarMap: Record<string, string> = {};
      for (const p of profiles) {
        if (p.avatarUrl) avatarMap[p.username] = p.avatarUrl;
      }

      // Snap progress to 100%, advance all steps, inject avatars
      if (loaderIntervalRef.current) clearInterval(loaderIntervalRef.current);
      setLoaderAvatars(avatarMap);
      setLoaderStep(4);
      setLoaderProgress(100);

      // Pause to let avatars pop in
      await new Promise((r) => setTimeout(r, 1200));
      setShowLoader(false);

      setResults(mergedResponse);
    } catch (err) {
      const { showErrorToast } = await import("@/lib/errors");
      showErrorToast(err instanceof Error ? err : null);
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
      if (loaderIntervalRef.current) clearInterval(loaderIntervalRef.current);
      setShowLoader(false);
    } finally {
      setLoading(false);
      if (loaderIntervalRef.current) clearInterval(loaderIntervalRef.current);
    }
  };

  /* ── Derived ────────────────────────────────────────────────────── */

  const profiles = results?.profiles ?? [];
  const winners = results?.winners ?? {};
  const validProfiles = profiles.filter((p) => !p.error);
  const overallWinner = results?.overallWinner ?? null;

  /* ── Render ─────────────────────────────────────────────────────── */

  return (
    <div
      style={{
        maxWidth: "1080px",
        margin: "0 auto",
        padding: "4rem 1.5rem 6rem",
      }}
    >
      {/* ── Mobile responsive styles ───────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .battle-input-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .battle-input-row .battle-input-field {
            width: 100% !important;
          }
          .battle-cards-wrap {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            padding-top: 1.5rem !important;
            padding-bottom: 0.5rem !important;
            gap: 1rem !important;
          }
          .battle-cards-wrap .battle-user-card {
            min-width: 82vw !important;
            flex-shrink: 0 !important;
            scroll-snap-align: start !important;
          }
          .battle-category-card {
            padding: 1rem !important;
          }
          .battle-cat-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.3rem !important;
          }
          .battle-cat-label {
            width: auto !important;
            font-size: 0.75rem !important;
          }
          .battle-cat-score {
            width: auto !important;
            text-align: left !important;
            font-size: 0.75rem !important;
          }
          .battle-cat-reason {
            margin-left: 0 !important;
            font-size: 0.72rem !important;
          }
          .battle-cat-tags {
            margin-left: 0 !important;
          }
          .battle-user-card .battle-avatar {
            width: 56px !important;
            height: 56px !important;
          }
          .battle-user-card .battle-name {
            font-size: 1.1rem !important;
          }
          .battle-user-card .battle-score-num {
            font-size: 2.5rem !important;
            min-width: 50px !important;
          }
          .battle-user-card .battle-score-block {
            padding: 0.75rem 1rem !important;
          }
          .battle-user-card .battle-stats {
            grid-template-columns: 1fr !important;
            gap: 0.3rem !important;
            font-size: 0.75rem !important;
          }
          .battle-cta-btns {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .battle-cta-btns a,
          .battle-cta-btns .btn-primary {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>

      {/* ── Battle compare loader ─────────────────────────────── */}
      {showLoader && (
        <BattleCompareLoader
          progress={loaderProgress}
          step={loaderStep}
          usernames={loaderUsernames}
          avatars={loaderAvatars}
        />
      )}

      {/* ── Header ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "2.5rem" }}
      >
        <div className="uppercase-label" style={{ marginBottom: "0.75rem" }}>
          Battle
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          Quick Compare
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.2rem",
            color: "var(--muted)",
            lineHeight: 1.6,
            maxWidth: "620px",
          }}
        >
          Compare GitHub profiles side-by-side using public repo metadata.
          Scored across 6 categories — no AI, just observable signals.
        </p>
      </motion.div>

      {/* ── Input section ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
        style={{
          borderRadius: 0,
          padding: "1.5rem 2rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--muted)",
            marginBottom: "1rem",
          }}
        >
          Enter 2–4 GitHub usernames
        </div>

        <div
          className="battle-input-row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          {usernames.map((u, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <input
                type="text"
                value={u}
                onChange={(e) => updateField(i, e.target.value)}
                placeholder={`username ${i + 1}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCompare();
                }}
                className="battle-input-field"
                style={{
                  width: "220px",
                  padding: "0.8rem 1.1rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "1rem",
                  border: "1.5px solid var(--ink)",
                  borderRadius: "var(--radius)",
                  backgroundColor: "var(--paper-alt)",
                  boxShadow: "var(--shadow-xs)",
                  outline: "none",
                }}
              />
              {usernames.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeField(i)}
                  style={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1.5px solid var(--ink)",
                    borderRadius: "var(--radius)",
                    backgroundColor: "var(--paper-alt)",
                    boxShadow: "var(--shadow-xs)",
                    cursor: "pointer",
                  }}
                  aria-label={`Remove username ${i + 1}`}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}

          {usernames.length < 4 && (
            <button
              type="button"
              onClick={addField}
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px dashed var(--muted)",
                borderRadius: "var(--radius)",
                backgroundColor: "transparent",
                cursor: "pointer",
                color: "var(--muted)",
              }}
              aria-label="Add username"
            >
              <Plus size={16} />
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              marginTop: "1rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.95rem",
              color: "var(--danger)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        {/* Compare button */}
        <button
          type="button"
          onClick={handleCompare}
          disabled={loading}
          className="btn-primary"
          style={{
            marginTop: "1.75rem",
            padding: "1rem 2rem",
            fontSize: "1rem",
          }}
        >
          <Swords size={18} />
          {loading ? "COMPARING…" : "COMPARE"}
        </button>
      </motion.div>

      {/* ── Results ───────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {validProfiles.length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.15 }}
          >
            {/* QUICK SCORE badge + footnote */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--accent)",
                  border: "1.5px solid var(--accent)",
                  borderRadius: "var(--radius)",
                  padding: "0.35rem 0.8rem",
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                QUICK SCORE
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  color: "var(--muted)",
                }}
              >
                Based on public repo metadata — not AI Verified, not Quality
                Score.
              </span>
            </div>

            {/* Overall winner banner */}
            {overallWinner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.5rem",
                  marginBottom: "2rem",
                  border: "2px solid var(--ink)",
                  borderRadius: "var(--radius)",
                  backgroundColor: "var(--accent-light)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Trophy
                    size={28}
                    style={{ color: "var(--accent)", fill: "var(--accent)" }}
                  />
                </motion.div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--muted)",
                      marginBottom: "0.15rem",
                    }}
                  >
                    Overall Winner
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.35rem",
                      fontWeight: 700,
                    }}
                  >
                    @{overallWinner}
                  </div>
                </div>
              </motion.div>
            )}

            {/* User cards — bigger */}
            <div
              className="battle-cards-wrap"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${validProfiles.length}, 1fr)`,
                gap: "1.75rem",
                marginBottom: "2.5rem",
                paddingTop: "1rem",
              }}
            >
              {validProfiles.map((p, i) => (
                <UserCard
                  key={p.username}
                  profile={p}
                  colorIndex={i}
                  isWinner={overallWinner === p.username}
                />
              ))}
            </div>

            {/* Error profiles */}
            {profiles
              .filter((p) => p.error)
              .map((p) => (
                <div
                  key={p.username}
                  style={{
                    padding: "0.85rem 1.1rem",
                    marginBottom: "0.5rem",
                    border: "1.5px solid var(--danger)",
                    borderRadius: "var(--radius)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    color: "var(--danger)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <AlertTriangle size={16} />
                  <strong>{p.username}</strong>: {p.error}
                </div>
              ))}

            {/* ── Per-category breakdown ──────────────────────────── */}
            <div
              className="card battle-category-card"
              style={{
                borderRadius: 0,
                padding: "1.75rem 2rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Category Breakdown
              </div>

              {CATEGORIES.map((catKey, catIdx) => {
                const label = CATEGORY_LABEL[catKey];
                const icon = CATEGORY_ICON[catKey];
                const winner = winners[catKey];

                return (
                  <motion.div
                    key={catKey}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * catIdx }}
                    style={{
                      marginBottom:
                        catIdx < CATEGORIES.length - 1 ? "2rem" : 0,
                      padding: "1.75rem",
                      border: "1.5px solid var(--surface-3, #ddd)",
                      borderRadius: "var(--radius)",
                      backgroundColor: "var(--paper-alt)",
                    }}
                  >
                    {/* Category header */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        marginBottom: "0.6rem",
                      }}
                    >
                      <span style={{ fontSize: "1.4rem" }}>{icon}</span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {label}
                      </span>
                      {winner && (
                        <motion.span
                          animate={{
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.8rem",
                            color: "var(--accent)",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          <Zap size={12} />
                          {winner} leads
                        </motion.span>
                      )}
                    </div>

                    {/* Scores per profile */}
                    {validProfiles.map((p, pi) => {
                      const cat = p.categories[catKey];
                      const score = cat?.score ?? 0;
                      const isCatWinner = winner === p.username;

                      return (
                        <div
                          key={p.username}
                          style={{
                            marginBottom: "0.75rem",
                          }}
                        >
                          {/* Username + score + bar */}
                          <div
                            className="battle-cat-row"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.7rem",
                              marginBottom: "0.4rem",
                            }}
                          >
                            <span
                              className="battle-cat-label"
                              style={{
                                width: "110px",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.9rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.03em",
                                color: isCatWinner
                                  ? "var(--ink)"
                                  : "var(--muted)",
                                fontWeight: isCatWinner ? 700 : 400,
                                flexShrink: 0,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {p.username}
                            </span>

                            <div
                              style={{
                                flex: 1,
                                height: "22px",
                                border: "1.5px solid var(--ink)",
                                borderRadius: "var(--radius)",
                                backgroundColor: "var(--surface-1, #E5E5E0)",
                                overflow: "hidden",
                              }}
                            >
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${score}%` }}
                                transition={{
                                  duration: 0.6,
                                  delay: 0.1 * pi,
                                  ease: "easeOut",
                                }}
                                style={{
                                  height: "100%",
                                  backgroundColor: isCatWinner
                                    ? BAR_COLORS[pi % BAR_COLORS.length]
                                    : "var(--muted-light)",
                                  borderRadius: "calc(var(--radius) - 1px)",
                                }}
                              />
                            </div>

                            <span
                              style={{
                                width: "52px",
                                textAlign: "right",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                color: scoreColor(score),
                                flexShrink: 0,
                              }}
                            >
                              {score}
                            </span>
                          </div>

                          {/* Reason (only for winner) */}
                          {isCatWinner && cat?.reason && (
                            <div
                              className="battle-cat-reason"
                              style={{
                                marginLeft: "108px",
                                fontFamily: "var(--font-body)",
                                fontSize: "0.78rem",
                                color: "var(--muted)",
                                lineHeight: 1.5,
                                marginBottom: "0.2rem",
                              }}
                            >
                              {cat.reason}
                            </div>
                          )}

                          {/* Strengths/weaknesses (winner only) */}
                          {isCatWinner && cat && (
                            <div
                              className="battle-cat-tags"
                              style={{
                                marginLeft: "108px",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0.5rem",
                                marginTop: "0.2rem",
                              }}
                            >
                              {cat.strengths.map((s, si) => (
                                <span
                                  key={`s-${si}`}
                                  style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.65rem",
                                    padding: "0.15rem 0.5rem",
                                    borderRadius: "var(--radius)",
                                    border: "1px solid var(--accent)",
                                    color: "var(--accent)",
                                    backgroundColor: "var(--accent-light)",
                                  }}
                                >
                                  + {s}
                                </span>
                              ))}
                              {cat.weaknesses.map((w, wi) => (
                                <span
                                  key={`w-${wi}`}
                                  style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.65rem",
                                    padding: "0.15rem 0.5rem",
                                    borderRadius: "var(--radius)",
                                    border: "1px solid var(--muted-light, #ccc)",
                                    color: "var(--muted)",
                                    backgroundColor: "var(--paper-alt)",
                                  }}
                                >
                                  − {w}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                );
              })}
            </div>

            {/* ── CTA / For More About You ────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                marginTop: "2.5rem",
                padding: "2rem",
                border: "2px solid var(--ink)",
                borderRadius: "var(--radius)",
                backgroundColor: "var(--paper)",
                boxShadow: "var(--shadow-md)",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginBottom: "0.6rem",
                  letterSpacing: "-0.02em",
                }}
              >
                For More About You
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  maxWidth: "500px",
                  margin: "0 auto 1.5rem",
                }}
              >
                Get a deep AI-powered analysis of your code quality,
                architecture, and engineering credibility — not just file
                presence.
              </p>

              <div
                className="battle-cta-btns"
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* Connect GitHub — primary CTA */}
                <a
                  href="/dashboard"
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.85rem 2rem",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <LinkIcon size={18} />
                  CONNECT GITHUB
                </a>

                {/* Flash card preview — secondary */}
                <a
                  href="/methodology"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.85rem 2rem",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    textDecoration: "none",
                    color: "var(--ink)",
                    border: "1.5px solid var(--ink)",
                    borderRadius: "var(--radius)",
                    boxShadow: "var(--shadow-sm)",
                    backgroundColor: "var(--paper-alt)",
                  }}
                >
                  See How It Works →
                </a>
              </div>
            </motion.div>

            {/* Footnote */}
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem 1.75rem",
                borderLeft: "4px solid var(--accent)",
                backgroundColor: "var(--accent-light)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: "var(--ink)" }}>QUICK SCORE</strong> —
                based on file presence and public stats, not a review of your
                actual code. Get the full AI analysis for a code-quality read.{" "}
                <a
                  href="/dashboard"
                  style={{
                    color: "var(--accent)",
                    fontWeight: 600,
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Connect GitHub →
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Empty state (no results yet) ─────────────────────────── */}
      {!results && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            color: "var(--muted)",
          }}
        >
          <Swords
            size={56}
            style={{ marginBottom: "1rem", opacity: 0.3 }}
          />
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.95rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Enter usernames above to start comparing
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ─── User Card (bigger avatar, star rating) ────────────────────────── */

function UserCard({
  profile,
  colorIndex,
  isWinner,
}: {
  profile: CompareResult;
  colorIndex: number;
  isWinner: boolean;
}) {
  return (
    <motion.div
      className="card battle-user-card"
      initial={{ opacity: 0, y: 15 }}
      animate={
        isWinner
          ? { opacity: 1, y: 0, scale: [1, 1.012, 1] }
          : { opacity: 1, y: 0 }
      }
      transition={
        isWinner
          ? { opacity: { duration: 0.4 }, y: { duration: 0.4 }, scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }
          : { delay: colorIndex * 0.08, duration: 0.4 }
      }
      style={{
        borderRadius: 0,
        padding: "1.75rem 1.5rem 1.5rem",
        borderTop: `6px solid ${BAR_COLORS[colorIndex % BAR_COLORS.length]}`,
        position: "relative",
        overflow: "visible",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Winner badge */}
      {isWinner && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          style={{
            position: "absolute",
            top: "-14px",
            right: "14px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--accent)",
            border: "2px solid var(--ink)",
            borderRadius: "50%",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <Trophy size={16} style={{ color: "var(--ink)" }} />
        </motion.div>
      )}

      {/* Avatar + name row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.75rem",
        }}
      >
        {profile.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="battle-avatar"
            src={profile.avatarUrl}
            alt={profile.username}
            width={80}
            height={80}
            style={{
              border: "2px solid var(--ink)",
              borderRadius: "var(--radius)",
              objectFit: "cover",
              boxShadow: "var(--shadow-xs)",
            }}
          />
        ) : (
          <div
            className="battle-avatar"
            style={{
              width: 80,
              height: 80,
              border: "2px solid var(--ink)",
              borderRadius: "var(--radius)",
              backgroundColor: "var(--surface-1)",
            }}
          />
        )}
        <div>
          <div
            className="battle-name"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.4rem",
            }}
          >
            {profile.displayName || profile.username}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--muted)",
            }}
          >
            @{profile.username}
          </div>
        </div>
      </div>

      {/* Score block — big number + stars + rating label */}
      <div
        className="battle-score-block"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
          padding: "1rem 1.75rem",
          border: "1.5px solid var(--ink)",
          borderRadius: "var(--radius)",
          backgroundColor: isWinner ? "var(--accent-light)" : "var(--paper-alt)",
          boxShadow: isWinner ? "var(--shadow-xs)" : "none",
        }}
      >
        {/* Animated score number */}
        <motion.span
          className="battle-score-num"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 + colorIndex * 0.1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3.5rem",
            fontWeight: 700,
            lineHeight: 1,
            color: scoreColor(profile.overallScore),
            minWidth: "80px",
            textAlign: "center",
          }}
        >
          {profile.overallScore}
        </motion.span>

        {/* Stars + rating */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {renderStars(profile.ratingStars, 18)}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--ink)",
              fontWeight: 700,
            }}
          >
            {profile.rating}
          </span>
        </div>
      </div>

      {profile.lowConfidence && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--danger)",
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <AlertTriangle size={13} />
          Low confidence — fewer than 3 public repos
        </div>
      )}

      {/* Stats grid */}
      <div
        className="battle-stats"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          color: "var(--muted)",
        }}
      >
        <div>
          <span style={{ color: "var(--ink)", fontWeight: 600 }}>
            {profile.followers}
          </span>{" "}
          followers
        </div>
        <div>
          <span style={{ color: "var(--ink)", fontWeight: 600 }}>
            {profile.publicRepos}
          </span>{" "}
          repos
        </div>
        <div>
          <span style={{ color: "var(--ink)", fontWeight: 600 }}>
            {profile.fetchedRepos}
          </span>{" "}
          checked
        </div>
        <div>
          <span style={{ color: "var(--ink)", fontWeight: 600 }}>
            {profile.accountAgeDays}
          </span>{" "}
          days old
        </div>
      </div>
    </motion.div>
  );
}
