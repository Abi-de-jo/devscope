/**
 * Activity Log — server-side transparency logging.
 *
 * Every log entry is sanitized BEFORE it hits the database.
 * Secrets are stripped at write time, not read time.
 */

import { prisma } from "@/lib/db";
import { randomBytes } from "crypto";

/* ─── Secret Redaction ─────────────────────────────────────────────── */

/** Key names that should never appear in log metadata */
const SENSITIVE_KEYS = new Set([
  "token",
  "tokens",
  "apikey",
  "api_key",
  "api-key",
  "secret",
  "secretkey",
  "secret_key",
  "password",
  "passwd",
  "credential",
  "credentials",
  "authorization",
  "auth",
  "bearer",
  "accesstoken",
  "access_token",
  "access-token",
  "refreshtoken",
  "refresh_token",
  "refresh-token",
  "idtoken",
  "id_token",
  "privatekey",
  "private_key",
  "session",
  "cookie",
  "cookies",
]);

/** Regex matching JWT-like tokens (three base64 segments separated by dots) */
const JWT_RE = /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g;

/** Regex matching typical API key shapes (ghp_, sk_, fc-, etc.) */
const API_KEY_RE = /\b(ghp_[A-Za-z0-9]{36}|sk-[A-Za-z0-9]{20,}|fc-[a-f0-9]{32}|xoxb-[A-Za-z0-9-]+|PMAK-[A-Za-z0-9-]+)\b/g;

/** Regex matching Bearer tokens */
const BEARER_RE = /Bearer\s+[A-Za-z0-9._-]{20,}/gi;

/** Combined regex for value-level redaction */
const SECRET_VALUE_RE = new RegExp(
  `(${JWT_RE.source})|(${API_KEY_RE.source})|(${BEARER_RE.source})`,
  "g"
);

const REDACTED = "[REDACTED]";

/**
 * Sanitize a value — recursively walks objects/arrays and redacts
 * sensitive keys and secret-shaped values.
 * Runs on WRITE, not on read.
 */
function sanitizeValue(input: unknown): unknown {
  if (input === null || input === undefined) return input;

  if (typeof input === "string") {
    // Redact secret-shaped values in strings
    return input.replace(SECRET_VALUE_RE, REDACTED);
  }

  if (Array.isArray(input)) {
    return input.map(sanitizeValue);
  }

  if (typeof input === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(input as Record<string, unknown>)) {
      const lower = key.toLowerCase().replace(/[-_ ]/g, "");
      if (SENSITIVE_KEYS.has(lower) || SENSITIVE_KEYS.has(key.toLowerCase())) {
        // Entire value is sensitive — replace with redacted marker
        out[key] = REDACTED;
      } else {
        out[key] = sanitizeValue(val);
      }
    }
    return out;
  }

  return input;
}

/**
 * Sanitize a full log entry before persistence.
 * Strips/.masks any field containing secrets — keys or values.
 * This is the SINGLE GATE: nothing reaches the DB unsanitized.
 */
export function sanitizeLogEntry(entry: {
  action: string;
  detail?: string;
  meta?: Record<string, unknown>;
  status?: string;
  costCents?: number;
}): {
  action: string;
  detail: string | null;
  meta: Record<string, unknown> | null;
  status: string;
  costCents: number | null;
} {
  return {
    action: entry.action,
    detail: entry.detail ? String(sanitizeValue(entry.detail)) : null,
    meta: entry.meta ? (sanitizeValue(entry.meta) as Record<string, unknown>) : null,
    status: entry.status ?? "success",
    costCents: entry.costCents ?? null,
  };
}

/* ─── Opaque Token ─────────────────────────────────────────────────── */

/** Generate a random opaque token for activity log URLs */
export function generateActivityToken(): string {
  return randomBytes(24).toString("base64url");
}

/* ─── Log Writers ──────────────────────────────────────────────────── */

/**
 * Core write function — all log entries go through here.
 * Sanitizes BEFORE hitting the DB. Never stores raw secrets.
 */
async function writeLog(
  userId: string,
  entry: {
    action: string;
    detail?: string;
    meta?: Record<string, unknown>;
    status?: string;
    costCents?: number;
  }
) {
  try {
    const sanitized = sanitizeLogEntry(entry);
    await prisma.activityLog.create({
      data: {
        userId,
        action: sanitized.action,
        detail: sanitized.detail,
        meta: sanitized.meta,
        status: sanitized.status,
        costCents: sanitized.costCents,
      },
    });
  } catch {
    // Logging must never break the main flow — silent failure
  }
}

/** Log a GitHub API call */
export async function logGitHubCall(
  userId: string,
  endpoint: string,
  status: number,
  meta?: Record<string, unknown>
) {
  await writeLog(userId, {
    action: "github_api",
    detail: `GitHub API → ${endpoint}`,
    status: status >= 200 && status < 300 ? "success" : "error",
    meta: { endpoint, httpStatus: status, ...meta },
  });
}

/** Log an AI scoring run */
export async function logScoreRun(
  userId: string,
  opts: {
    repoCount: number;
    cached: boolean;
    costCents: number;
    repos?: string[];
  }
) {
  await writeLog(userId, {
    action: "score_run",
    detail: opts.cached
      ? `AI score loaded from cache (${opts.repoCount} repos)`
      : `AI score computed (${opts.repoCount} repos, $${(opts.costCents / 100).toFixed(3)})`,
    status: opts.cached ? "cached" : "success",
    costCents: opts.costCents,
    meta: {
      repoCount: opts.repoCount,
      cached: opts.cached,
      repos: opts.repos,
    },
  });
}

/** Log a cache read/write */
export async function logCacheEvent(
  userId: string,
  type: "hit" | "write",
  key: string
) {
  await writeLog(userId, {
    action: type === "hit" ? "cache_hit" : "cache_write",
    detail: `Cache ${type === "hit" ? "hit" : "write"}: ${key}`,
    status: type === "hit" ? "cached" : "success",
    meta: { cacheKey: key },
  });
}

/** Log an auth event */
export async function logAuthEvent(
  userId: string,
  type: "login" | "refresh"
) {
  await writeLog(userId, {
    action: type === "login" ? "auth_login" : "auth_refresh",
    detail: type === "login" ? "Signed in via GitHub" : "Session refreshed",
    status: "success",
  });
}

/** Log a sync event */
export async function logSyncEvent(
  userId: string,
  repoCount: number,
  status: "success" | "error",
  detail?: string
) {
  await writeLog(userId, {
    action: "sync",
    detail: detail ?? `Synced ${repoCount} repositories from GitHub`,
    status,
    meta: { repoCount },
  });
}

/** Log a compare/battle event */
export async function logCompareEvent(
  userId: string,
  usernames: string[],
  status: "success" | "error"
) {
  await writeLog(userId, {
    action: "compare",
    detail: `Compared ${usernames.length} profiles: ${usernames.join(", ")}`,
    status,
    meta: { usernames },
  });
}
