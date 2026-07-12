"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Search,
  Trophy,
  EyeOff,
  Eye,
  AlertTriangle,
  ExternalLink,
  Star,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getLocationSuggestions } from "@/lib/location-data";
import type { LocationSuggestion } from "@/lib/location-data";
import type { LeaderboardEntry, LeaderboardScope } from "@/lib/leaderboard";
import { LockedPreview } from "@/components/locked-preview";
import { LockedLeaderboardContent } from "@/components/locked-leaderboard-content";

/* ─── Constants ─────────────────────────────────────────────────────── */

const SCOPES: { key: LeaderboardScope; label: string }[] = [
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "country", label: "Country" },
];

const PAGE_SIZE = 25;

const TROPHY_COLORS: Record<number, string> = {
  1: "#FFD700", // gold
  2: "#C0C0C0", // silver
  3: "#CD7F32", // bronze
};

/* ─── Skeleton Row ──────────────────────────────────────────────────── */

const SKELETON_COUNT = 8;

function SkeletonRow({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.35, 0.6, 0.35] }}
      transition={{
        duration: 1.4,
        repeat: Infinity,
        delay: index * 0.08,
        ease: "easeInOut",
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.85rem 1.75rem",
        borderBottom: "1px solid var(--surface-2, #e0e0d8)",
      }}
    >
      {/* Rank placeholder */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "var(--radius)",
          backgroundColor: "var(--surface-1)",
          border: "1.5px solid var(--surface-2, #ddd)",
          flexShrink: 0,
        }}
      />
      {/* Avatar placeholder */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "var(--radius)",
          backgroundColor: "var(--surface-1)",
          border: "1.5px solid var(--surface-2, #ddd)",
          flexShrink: 0,
        }}
      />
      {/* Name + username */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
        <div
          style={{
            width: "60%",
            height: "14px",
            borderRadius: "2px",
            backgroundColor: "var(--surface-1)",
          }}
        />
        <div
          style={{
            width: "35%",
            height: "10px",
            borderRadius: "2px",
            backgroundColor: "var(--surface-1)",
          }}
        />
      </div>
      {/* Top skill */}
      <div
        style={{
          width: "60px",
          height: "28px",
          borderRadius: "2px",
          backgroundColor: "var(--surface-1)",
          flexShrink: 0,
        }}
      />
      {/* Score */}
      <div
        style={{
          width: "36px",
          height: "20px",
          borderRadius: "2px",
          backgroundColor: "var(--surface-1)",
          flexShrink: 0,
        }}
      />
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function LeaderboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // URL-synced state
  const [location, setLocation] = useState(
    searchParams.get("location") ?? ""
  );
  const [scope, setScope] = useState<LeaderboardScope>(
    (searchParams.get("scope") as LeaderboardScope) ?? "city"
  );

  // UI state
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [cached, setCached] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [hideFromLeaderboards, setHideFromLeaderboards] = useState(false);
  const [showOptOut, setShowOptOut] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);

  // Server-side pagination
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalEntries / PAGE_SIZE);

  // Client-side page cache — avoids re-fetching already-loaded pages
  const pageCacheRef = useRef(new Map<number, LeaderboardEntry[]>());
  const cacheKeyRef = useRef("");

  /* ── Fetch user profile on mount ─────────────────────────────── */
  useEffect(() => {
    fetch("/api/leaderboard", { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        if (data.location && !searchParams.get("location")) {
          setLocation(data.location);
        }
        setUserLocation(data.location);
        setHideFromLeaderboards(data.hideFromLeaderboards ?? false);
        setShowOptOut(data.loggedIn ?? false);
      })
      .catch(() => { });
  }, [searchParams]);

  /* ── Sync URL ────────────────────────────────────────────────── */
  const syncURL = useCallback(
    (loc: string, sc: LeaderboardScope, p: number) => {
      const params = new URLSearchParams();
      if (loc) params.set("location", loc);
      params.set("scope", sc);
      if (p > 1) params.set("page", String(p));
      router.push(`/leaderboard?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  /* ── Fetch a specific page — checks client cache first ──────── */
  const fetchPage = useCallback(
    async (loc: string, sc: LeaderboardScope, p: number) => {
      if (!loc.trim()) {
        setError("Enter a location to see rankings.");
        return;
      }

      const key = `${loc.trim().toLowerCase()}:${sc}`;

      // If location or scope changed, clear the client cache
      if (cacheKeyRef.current !== key) {
        pageCacheRef.current.clear();
        cacheKeyRef.current = key;
      }

      // Check client-side cache — instant if already fetched
      const cachedPage = pageCacheRef.current.get(p);
      if (cachedPage) {
        setEntries(cachedPage);
        setPage(p);
        setError(null);
        syncURL(loc.trim(), sc, p);
        return;
      }

      // Not in client cache — fetch from API
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          location: loc.trim(),
          scope: sc,
          page: String(p),
          limit: String(PAGE_SIZE),
        });
        const res = await fetch(`/api/leaderboard?${params}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error ?? "Failed to load leaderboard.");
          return;
        }

        const pageEntries: LeaderboardEntry[] = data.entries ?? [];

        // Store in client cache
        pageCacheRef.current.set(p, pageEntries);

        // Update display + metadata
        setEntries(pageEntries);
        setTotalEntries(data.totalEntries ?? 0);
        setTotalCandidates(data.totalCandidates ?? 0);
        setCached(data.cached ?? false);
        setHasSearched(true);
        setPage(data.page ?? p);
        syncURL(loc.trim(), sc, data.page ?? p);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    },
    [syncURL]
  );

  /* ── Search handler — clears client cache for new searches ─── */
  const handleSearch = () => {
    // Always clear cache on explicit search (fresh start)
    pageCacheRef.current.clear();
    cacheKeyRef.current = `${location.trim().toLowerCase()}:${scope}`;
    fetchPage(location, scope, 1);
  };

  /* ── Page change — uses client cache if available ──────────── */
  const handlePageChange = (newPage: number) => {
    fetchPage(location, scope, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Scope change ───────────────────────────────────────────── */
  const handleScopeChange = (newScope: LeaderboardScope) => {
    setScope(newScope);
    if (location.length >= 2) {
      const results = getLocationSuggestions(location, newScope);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    }
    if (hasSearched && location.trim()) {
      fetchPage(location, newScope, 1);
    }
  };

  /* ── Opt-out toggle ─────────────────────────────────────────── */
  const toggleOptOut = async () => {
    const next = !hideFromLeaderboards;
    setHideFromLeaderboards(next);
    await fetch("/api/leaderboard", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hideFromLeaderboards: next }),
    });
  };

  /* ── Render ─────────────────────────────────────────────────── */
  // Locked preview: show blurred dummy content when not logged in
  if (!session && !isPending) {
    return (
      <LockedPreview page="leaderboard" statNumber="127" statDetail="developers ranked">
        <LockedLeaderboardContent />
      </LockedPreview>
    );
  }

  // Still loading session — render nothing
  if (isPending) return null;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "4rem 1.5rem 6rem",
      }}
    >
      {/* ── Header ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "2.5rem" }}
      >
        <div
          className="uppercase-label"
          style={{ marginBottom: "0.75rem" }}
        >
          Leaderboard
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          Developer Rankings
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.15rem",
            color: "var(--muted)",
            lineHeight: 1.6,
            maxWidth: "600px",
          }}
        >
          Discover top developers by location. Ranked by public GitHub profile
          data — real AI scores where available, metadata proxy where not.
        </p>
      </motion.div>

      {/* ── Location Selector ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
        style={{
          borderRadius: 0,
          padding: "1.5rem 2rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--muted)",
            marginBottom: "1rem",
          }}
        >
          {userLocation
            ? `Your GitHub location: ${userLocation}`
            : "Type a location to get started"}
        </div>

        {/* Input + search button */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              flex: 1,
              position: "relative",
            }}
          >
            <MapPin
              size={18}
              style={{
                position: "absolute",
                left: "12px",
                top: "12px",
                color: "var(--muted)",
                zIndex: 1,
              }}
            />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                const val = e.target.value;
                setLocation(val);
                setHighlightIdx(-1);
                const results = getLocationSuggestions(val, scope);
                setSuggestions(results);
                setShowSuggestions(results.length > 0 && val.length >= 2);
              }}
              onKeyDown={(e) => {
                if (showSuggestions && suggestions.length > 0) {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setHighlightIdx((prev) =>
                      prev < suggestions.length - 1 ? prev + 1 : 0
                    );
                    return;
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setHighlightIdx((prev) =>
                      prev > 0 ? prev - 1 : suggestions.length - 1
                    );
                    return;
                  }
                  if (
                    e.key === "Tab" ||
                    (e.key === "Enter" && highlightIdx >= 0)
                  ) {
                    e.preventDefault();
                    const pick =
                      suggestions[highlightIdx >= 0 ? highlightIdx : 0];
                    setLocation(pick.label);
                    setShowSuggestions(false);
                    setHighlightIdx(-1);
                    return;
                  }
                }
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              onFocus={() => {
                if (suggestions.length > 0 && location.length >= 2) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 150);
              }}
              placeholder="e.g. Chennai, Tamil Nadu, India"
              style={{
                width: "100%",
                padding: "0.8rem 1rem 0.8rem 2.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "1rem",
                border: "1.5px solid var(--ink)",
                borderRadius: showSuggestions
                  ? "var(--radius) var(--radius) 0 0"
                  : "var(--radius)",
                borderBottom: showSuggestions ? "none" : undefined,
                backgroundColor: "var(--paper-alt)",
                boxShadow: "var(--shadow-xs)",
                outline: "none",
              }}
            />

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  zIndex: 20,
                  border: "1.5px solid var(--ink)",
                  borderTop: "none",
                  borderRadius: "0 0 var(--radius) var(--radius)",
                  backgroundColor: "var(--paper)",
                  boxShadow: "var(--shadow-sm)",
                  maxHeight: "220px",
                  overflowY: "auto",
                }}
              >
                {suggestions.map((s, i) => (
                  <button
                    key={`${s.label}-${s.scope}`}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setLocation(s.label);
                      setShowSuggestions(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      width: "100%",
                      padding: "0.6rem 0.85rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      textAlign: "left",
                      border: "none",
                      borderBottom:
                        i < suggestions.length - 1
                          ? "1px solid var(--surface-2, #e0e0d8)"
                          : "none",
                      backgroundColor:
                        i === highlightIdx
                          ? "var(--accent-light)"
                          : "transparent",
                      cursor: "pointer",
                      color: "var(--ink)",
                    }}
                    onMouseEnter={() => setHighlightIdx(i)}
                  >
                    <MapPin
                      size={13}
                      style={{ color: "var(--muted)", flexShrink: 0 }}
                    />
                    <span style={{ flex: 1 }}>{s.label}</span>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--muted)",
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {s.scope}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSearch}
            disabled={loading || !location.trim()}
            className="btn-primary"
            style={{
              padding: "0.8rem 1.5rem",
              fontSize: "0.85rem",
            }}
          >
            <Search size={16} />
            {loading ? "SEARCHING…" : "SEARCH"}
          </button>
        </div>

        {/* Scope toggles */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--muted)",
              marginRight: "0.25rem",
            }}
          >
            View as:
          </span>
          {SCOPES.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => handleScopeChange(s.key)}
              style={{
                padding: "0.4rem 0.9rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: scope === s.key ? 700 : 400,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                border: "1.5px solid var(--ink)",
                borderRadius: "var(--radius)",
                backgroundColor:
                  scope === s.key ? "var(--ink)" : "var(--paper-alt)",
                color: scope === s.key ? "var(--paper)" : "var(--ink)",
                boxShadow: "var(--shadow-xs)",
                cursor: "pointer",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Opt-out banner ────────────────────────────────────── */}
      {showOptOut && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            padding: "0.8rem 1.75rem",
            marginBottom: "1.5rem",
            border: "1.5px solid var(--surface-3, #ddd)",
            borderRadius: "var(--radius)",
            backgroundColor: "var(--paper-alt)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--muted)",
            }}
          >
            {hideFromLeaderboards ? (
              <EyeOff size={14} />
            ) : (
              <Eye size={14} />
            )}
            {hideFromLeaderboards
              ? "You are hidden from leaderboards"
              : "Visible on leaderboards"}
          </div>
          <button
            type="button"
            onClick={toggleOptOut}
            style={{
              padding: "0.4rem 0.8rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              border: "1.5px solid var(--ink)",
              borderRadius: "var(--radius)",
              backgroundColor: hideFromLeaderboards
                ? "var(--accent)"
                : "var(--paper)",
              boxShadow: "var(--shadow-xs)",
              cursor: "pointer",
            }}
          >
            {hideFromLeaderboards ? "SHOW ME" : "HIDE ME"}
          </button>
        </motion.div>
      )}

      {/* ── Error ──────────────────────────────────────────────── */}
      {error && (
        <div
          style={{
            padding: "0.85rem 1.1rem",
            marginBottom: "1.5rem",
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
          {error}
        </div>
      )}

      {/* ── Results ─────────────────────────────────────────── */}
      {hasSearched && !loading && entries.length === 0 && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            color: "var(--muted)",
          }}
        >
          <Trophy size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.95rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            No results found for &quot;{location}&quot;
          </div>
        </motion.div>
      )}

      {/* ── Loading skeleton ────────────────────────────────── */}
      {hasSearched && loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "1rem" }}
        >
          {/* Skeleton meta bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "220px",
                height: "12px",
                borderRadius: "2px",
                backgroundColor: "var(--surface-1)",
              }}
            />
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              style={{
                width: "100px",
                height: "12px",
                borderRadius: "2px",
                backgroundColor: "var(--surface-1)",
              }}
            />
          </div>

          {/* Skeleton rows */}
          <div
            className="card"
            style={{
              borderRadius: 0,
              padding: 0,
              overflow: "hidden",
            }}
          >
            {Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <SkeletonRow key={i} index={i} />
            ))}
          </div>

          {/* Loading text */}
          <div
            style={{
              marginTop: "1rem",
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--muted)",
            }}
          >
            Loading rankings…
          </div>
        </motion.div>
      )}

      {/* ── Actual results ──────────────────────────────────── */}
      {entries.length > 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {/* Meta bar — Showing X–Y of Z */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--muted)",
              }}
            >
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, totalEntries)} of {totalEntries}
              {cached && " (cached)"}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--muted)",
              }}
            >
              {totalCandidates} candidates searched
            </div>
          </div>

          {/* Ranked list */}
          <div
            className="card"
            style={{
              borderRadius: 0,
              padding: 0,
              overflow: "hidden",
            }}
          >
            {entries.map((entry, idx) => (
              <RankRow
                key={entry.username}
                entry={entry}
                delay={idx * 0.03}
              />
            ))}
          </div>

          {/* Pagination — simple sequential page numbers */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.4rem",
                marginTop: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              {page > 1 && (
                <button
                  type="button"
                  onClick={() => handlePageChange(page - 1)}
                  className="btn-primary"
                  style={{
                    padding: "0.5rem 0.9rem",
                    fontSize: "0.8rem",
                  }}
                >
                  ← PREV
                </button>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    padding: "0.4rem 0.7rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    fontWeight: pageNum === page ? 700 : 400,
                    border: "1.5px solid var(--ink)",
                    borderRadius: "var(--radius)",
                    backgroundColor:
                      pageNum === page ? "var(--ink)" : "var(--paper-alt)",
                    color: pageNum === page ? "var(--paper)" : "var(--ink)",
                    boxShadow: "var(--shadow-xs)",
                    cursor: "pointer",
                    minWidth: "32px",
                    textAlign: "center",
                  }}
                >
                  {pageNum}
                </button>
              ))}

              {page < totalPages && (
                <button
                  type="button"
                  onClick={() => handlePageChange(page + 1)}
                  className="btn-primary"
                  style={{
                    padding: "0.5rem 0.9rem",
                    fontSize: "0.8rem",
                  }}
                >
                  NEXT →
                </button>
              )}
            </div>
          )}

          {/* Footnote */}
          <div
            style={{
              marginTop: "2rem",
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
              Rankings use a composite score blending primary skill assessment
              with social and activity signals. Rows tagged{" "}
              <strong>AI VERIFIED</strong> include a real GitRating analysis;
              <strong> QUICK SCORE</strong> rows use metadata-proxy scoring from
              public repo data. Profile locations are self-reported and
              unverified.
            </p>
          </div>
        </motion.div>
      )}

      {/* ── Empty state ────────────────────────────────────────── */}
      {!hasSearched && !loading && (
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
          <Trophy
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
            Enter a location and hit search
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ─── Rank Row ──────────────────────────────────────────────────────── */

function RankRow({
  entry,
  delay,
}: {
  entry: LeaderboardEntry;
  delay: number;
}) {
  const rank = entry.rank;
  const isTop3 = rank <= 3;
  const isTop100 = rank <= 100;

  const rankBg = isTop3 ? "var(--accent-light)" : "transparent";
  const rankBorder = isTop3 ? "var(--accent)" : "transparent";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.85rem 1.75rem",
        borderBottom: "1px solid var(--surface-2, #e0e0d8)",
        backgroundColor: rankBg,
        borderLeft: `3px solid ${rankBorder}`,
      }}
    >
      {/* ── Rank badge ─────────────────────────────────────── */}
      {isTop3 ? (
        // Gold / Silver / Bronze trophy badge
        <div
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1.5px solid var(--ink)",
            borderRadius: "var(--radius)",
            backgroundColor: TROPHY_COLORS[rank],
            flexShrink: 0,
            boxShadow: "var(--shadow-xs)",
          }}
        >
          <Trophy size={18} color="var(--ink)" />
        </div>
      ) : isTop100 ? (
        // Trophy icon + rank number for 4-100
        <div
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2px",
            border: "1.5px solid var(--ink)",
            borderRadius: "var(--radius)",
            backgroundColor: "var(--accent-light)",
            flexShrink: 0,
            boxShadow: "var(--shadow-xs)",
          }}
        >
          <Trophy size={12} color="var(--accent)" />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.8rem",
              color: "var(--ink)",
            }}
          >
            {rank}
          </span>
        </div>
      ) : (
        // Plain numeric rank for 101+
        <div
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "var(--muted)",
            border: "1.5px solid var(--surface-3, #ccc)",
            borderRadius: "var(--radius)",
            backgroundColor: "var(--paper-alt)",
            flexShrink: 0,
          }}
        >
          {rank}
        </div>
      )}

      {/* ── Avatar ─────────────────────────────────────────── */}
      {entry.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={entry.avatarUrl}
          alt={entry.username}
          width={40}
          height={40}
          style={{
            border: "1.5px solid var(--ink)",
            borderRadius: "var(--radius)",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      ) : (
        <div
          style={{
            width: 40,
            height: 40,
            border: "1.5px solid var(--ink)",
            borderRadius: "var(--radius)",
            backgroundColor: "var(--surface-1)",
            flexShrink: 0,
          }}
        />
      )}

      {/* ── Name + username + score type badge ─────────────── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href={entry.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--ink)",
              textDecoration: "none",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {entry.displayName || entry.username}
          </a>
          <ExternalLink
            size={12}
            style={{ color: "var(--muted)", flexShrink: 0 }}
          />
          {/* Score type badge */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: entry.scoreType === "ai" ? "var(--accent)" : "var(--muted)",
              border: `1px solid ${entry.scoreType === "ai" ? "var(--accent)" : "var(--surface-3, #ccc)"}`,
              borderRadius: "2px",
              padding: "0.1rem 0.4rem",
              lineHeight: 1.6,
              flexShrink: 0,
            }}
          >
            {entry.scoreType === "ai" ? "AI VERIFIED" : "QUICK SCORE"}
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--muted)",
            marginTop: "2px",
          }}
        >
          @{entry.username}
        </div>
      </div>

      {/* ── Stats (repos / stars) ─────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "2px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "var(--muted)",
          }}
        >
          {entry.topSkill}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            gap: "3px",
          }}
        >
          <Star size={10} fill="var(--ink)" color="var(--ink)" />
          {entry.totalStars.toLocaleString()}
        </span>
      </div>

      {/* ── Score ──────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "var(--ink)",
            minWidth: "36px",
            textAlign: "right",
          }}
        >
          {entry.score}
        </span>
      </div>
    </motion.div>
  );
}
