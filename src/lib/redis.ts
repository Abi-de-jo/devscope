// Upstash Redis — REST-based client for serverless/edge.
//
// Singleton pattern matching db.ts — one client per process, reused
// across API routes. REST transport means no long-lived TCP connections,
// which is critical for Vercel serverless cold starts.
//
// Lazy initialization: the client is created on first use, not at import
// time. This prevents crashing the entire module tree if env vars are
// missing (e.g. during build without .env).

import { Redis } from "@upstash/redis";

const globalForRedis = globalThis as unknown as {
  __upstash_redis: Redis | undefined;
};

let _redis: Redis | null = null;

/**
 * Shared Redis singleton. Safe to import anywhere — won't initialize
 * until first `.get()`/`.set()` call. Throws on first use if env vars
 * are missing (not at import time).
 */
export function getRedis(): Redis {
  if (_redis) return _redis;
  if (globalForRedis.__upstash_redis) {
    _redis = globalForRedis.__upstash_redis;
    return _redis;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN env vars"
    );
  }

  _redis = new Redis({ url, token });
  globalForRedis.__upstash_redis = _redis;
  return _redis;
}

/**
 * @deprecated Use getRedis() instead. Kept for backward compatibility
 * during migration — will be removed once all callers are updated.
 */
export const redis = new Proxy({} as Redis, {
  get(_, prop) {
    return Reflect.get(getRedis(), prop);
  },
});
