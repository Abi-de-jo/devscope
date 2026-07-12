// Upstash Ratelimit — sliding-window rate limiting backed by Redis.
//
// Two limiters:
// 1. Per-user limiter — protects /api/score, /api/sync from abuse
// 2. Global limiter — protects shared GitHub token from burst exhaustion
//
// Falls back to in-memory sliding window if Redis is unavailable.

import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

/* ─── In-memory fallback ────────────────────────────────────────────── */

type Bucket = number[];
const buckets = new Map<string, Bucket>();

function memRateLimit(
  key: string,
  windowMs: number,
  max: number
): RateLimitResult {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  const success = hits.length < max;
  if (success) hits.push(now);
  buckets.set(key, hits);
  const oldest = hits[0] ?? now;
  return {
    success,
    limit: max,
    remaining: Math.max(0, max - hits.length),
    resetAt: oldest + windowMs,
  };
}

/* ─── Types ─────────────────────────────────────────────────────────── */

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number; // epoch ms when the window resets
}

/* ─── Upstash ratelimit instances ───────────────────────────────────── */

/**
 * Per-user limiter — 10 score requests / min, 5 sync requests / min.
 * Keyed by userId.
 */
const perUserLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  analytics: true,
  prefix: "rl:user",
});

/**
 * Global limiter — 30 compare requests / min across all users.
 * Protects the shared GitHub token from burst exhaustion.
 */
const globalCompareLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "60 s"),
  analytics: true,
  prefix: "rl:global",
});

/* ─── Public API ────────────────────────────────────────────────────── */

/**
 * Sliding-window rate limiter with Redis backing.
 * Falls back to in-memory if Redis is unavailable.
 */
export async function rateLimit(
  key: string,
  opts: { windowMs?: number; max?: number } = {}
): Promise<RateLimitResult> {
  const windowMs = opts.windowMs ?? 60_000;
  const max = opts.max ?? 20;

  try {
    // Convert windowMs to "X s" format for Upstash
    const windowSec = Math.max(1, Math.ceil(windowMs / 1000));
    const window = `${windowSec} s` as `${number} s`;

    // Create a per-key limiter with the requested window/max
    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(max, window),
      analytics: false,
      prefix: `rl:${key}`,
    });

    const result = await limiter.limit(key);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      resetAt: result.reset,
    };
  } catch (err) {
    console.error(`[RATELIMIT] Redis error for ${key}, falling back to memory:`, err);
    return memRateLimit(key, windowMs, max);
  }
}

/**
 * Per-user rate limit — use for score/sync routes.
 */
export async function perUserRateLimit(
  userId: string,
  max: number = 10
): Promise<RateLimitResult> {
  try {
    const result = await perUserLimiter.limit(userId, { rate: max });
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      resetAt: result.reset,
    };
  } catch (err) {
    console.error(`[RATELIMIT] Redis error for user ${userId}, falling back to memory:`, err);
    return memRateLimit(`user:${userId}`, 60_000, max);
  }
}

/**
 * Global rate limit — use for compare/leaderboard routes
 * to protect the shared GitHub token.
 */
export async function globalRateLimit(
  ip: string,
  max: number = 30
): Promise<RateLimitResult> {
  try {
    const result = await globalCompareLimiter.limit(ip, { rate: max });
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      resetAt: result.reset,
    };
  } catch (err) {
    console.error(`[RATELIMIT] Redis error for global, falling back to memory:`, err);
    return memRateLimit(`global:${ip}`, 60_000, max);
  }
}

/**
 * Build standard rate-limit response headers.
 */
export function rateLimitHeaders(rl: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(rl.limit),
    "X-RateLimit-Remaining": String(rl.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rl.resetAt / 1000)),
  };
  if (!rl.success) {
    headers["Retry-After"] = String(
      Math.ceil((rl.resetAt - Date.now()) / 1000)
    );
  }
  return headers;
}
