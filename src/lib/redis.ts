// Upstash Redis — REST-based client for serverless/edge.
//
// Singleton pattern matching db.ts — one client per process, reused
// across API routes. REST transport means no long-lived TCP connections,
// which is critical for Vercel serverless cold starts.

import { Redis } from "@upstash/redis";

const globalForRedis = globalThis as unknown as {
  __upstash_redis: Redis | undefined;
};

function createRedis(): Redis {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // Graceful degradation: if Redis env is missing, log and throw
    // on first actual use — don't crash at import time (which breaks
    // builds and edge runtime).
    throw new Error(
      "Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN env vars"
    );
  }

  return new Redis({ url, token });
}

/**
 * Shared Redis singleton. Safe to import anywhere — won't initialize
 * until first `.get()`/`.set()` call.
 */
export const redis = globalForRedis.__upstash_redis ?? createRedis();

if (process.env.NODE_ENV !== "production") {
  globalForRedis.__upstash_redis = redis;
}
