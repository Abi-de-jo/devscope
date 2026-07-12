// Redis-backed cache with in-memory fallback.
//
// Primary: Upstash Redis (shared across serverless instances).
// Fallback: in-memory Map (for local dev without Redis, or if Redis is down).
//
// Every SET has an explicit TTL — never cache forever.
// All values are JSON-serialized for cross-instance compatibility.

import { redis } from "./redis";

/* ─── In-memory fallback (same as old cache.ts) ────────────────────── */

interface MemEntry {
  value: unknown;
  expires: number;
}

const memStore = new Map<string, MemEntry>();

function memGet<T>(key: string): T | undefined {
  const entry = memStore.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expires) {
    memStore.delete(key);
    return undefined;
  }
  return entry.value as T;
}

function memSet(key: string, value: unknown, ttlMs: number): void {
  memStore.set(key, { value, expires: Date.now() + ttlMs });
}

function memDelete(key: string): void {
  memStore.delete(key);
}

/* ─── Timing helper ─────────────────────────────────────────────────── */

function logTiming(label: string, start: number, hit: boolean) {
  const ms = Date.now() - start;
  if (ms > 50 || !hit) {
    console.log(`[CACHE] ${label}: ${hit ? "HIT" : "MISS"} (${ms}ms)`);
  }
}

/* ─── Public API (async, Redis-backed) ──────────────────────────────── */

/**
 * Get a cached value. Checks Redis first, falls back to in-memory.
 * Returns `undefined` on miss (both layers).
 */
export async function cacheGet<T>(key: string): Promise<T | undefined> {
  const start = Date.now();

  // 1. Try Redis
  try {
    const raw = await redis.get<string>(key);
    if (raw !== null) {
      logTiming(`redis:${key}`, start, true);
      return JSON.parse(raw) as T;
    }
  } catch (err) {
    console.error(`[CACHE] Redis GET error for ${key}:`, err);
  }

  // 2. Fallback to in-memory
  const mem = memGet<T>(key);
  if (mem !== undefined) {
    logTiming(`mem:${key}`, start, true);
    return mem;
  }

  logTiming(key, start, false);
  return undefined;
}

/**
 * Set a cached value in BOTH Redis and in-memory.
 * @param ttlSec TTL in seconds (not ms!) — explicit on every write.
 */
export async function cacheSet<T>(
  key: string,
  value: T,
  ttlSec: number
): Promise<void> {
  const serialized = JSON.stringify(value);

  // 1. Write to in-memory (instant, sync)
  memSet(key, value, ttlSec * 1000);

  // 2. Write to Redis (async, fire-and-forget)
  try {
    await redis.set(key, serialized, { ex: ttlSec });
  } catch (err) {
    console.error(`[CACHE] Redis SET error for ${key}:`, err);
  }
}

/**
 * Delete a cached value from both Redis and in-memory.
 */
export async function cacheDelete(key: string): Promise<void> {
  memDelete(key);
  try {
    await redis.del(key);
  } catch (err) {
    console.error(`[CACHE] Redis DEL error for ${key}:`, err);
  }
}

/**
 * Invalidate all keys matching a prefix.
 * Useful for invalidating e.g. all "score:userId:*" keys after a re-score.
 */
export async function cacheDeletePattern(pattern: string): Promise<void> {
  try {
    // Upstash supports SCAN via KEYS for small datasets
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (err) {
    console.error(`[CACHE] Redis DEL pattern error for ${pattern}:`, err);
  }
}

/* ─── TTL constants (seconds) ───────────────────────────────────────── */

export const TTL = {
  /** Score GET — 10 min (invalidated on POST) */
  SCORE_READ: 10 * 60,
  /** Null score (no analysis yet) — 10 min */
  SCORE_NULL: 10 * 60,
  /** Quick-score / compare result — 24 hours */
  QUICK_SCORE: 24 * 60 * 60,
  /** Leaderboard — 36 hours */
  LEADERBOARD: 36 * 60 * 60,
  /** GitHub user profile — 2 hours */
  GH_USER: 2 * 60 * 60,
  /** GitHub repos list — 1 hour */
  GH_REPOS: 1 * 60 * 60,
  /** GitHub repo languages — 6 hours */
  GH_LANGUAGES: 6 * 60 * 60,
  /** GitHub repo root contents — 6 hours */
  GH_CONTENTS: 6 * 60 * 60,
  /** Analysis full payload (for public profile pages) — 24 hours */
  ANALYSIS: 24 * 60 * 60,
} as const;
