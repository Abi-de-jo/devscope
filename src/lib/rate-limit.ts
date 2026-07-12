// Sliding-window rate limiter (in-memory).
//
// NOTE: in-memory state is per-process. On multi-instance / serverless
// (Vercel) deployments each instance keeps its own counters, so this is a
// best-effort guard against abuse and accidental LLM cost spikes. For
// cross-instance enforcement, back `buckets` with Redis or a DB table.

type Bucket = number[];
const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number; // epoch ms when the window resets
}

export function rateLimit(
  key: string,
  opts: { windowMs?: number; max?: number } = {}
): RateLimitResult {
  const windowMs = opts.windowMs ?? 60_000;
  const max = opts.max ?? 20;
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

export function rateLimitHeaders(rl: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(rl.limit),
    "X-RateLimit-Remaining": String(rl.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rl.resetAt / 1000)),
  };
  if (!rl.success) {
    headers["Retry-After"] = String(Math.ceil((rl.resetAt - Date.now()) / 1000));
  }
  return headers;
}
