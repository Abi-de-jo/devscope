"use client";

import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"),
});

export const { signIn, signOut, useSession } = authClient;

/**
 * Friendly error mapping for Better Auth errors.
 * Maps raw error codes/messages to human-readable strings.
 */
function friendlyAuthError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  const lower = raw.toLowerCase();

  if (lower.includes("invalid_origin") || lower.includes("invalid origin")) {
    return "Authentication service misconfiguration. Please try again in a moment.";
  }
  if (lower.includes("csrf") || lower.includes("token mismatch")) {
    return "Session expired. Please refresh the page and try again.";
  }
  if (lower.includes("oauth") || lower.includes("provider")) {
    return "GitHub sign-in encountered an issue. Please try again.";
  }
  if (lower.includes("network") || lower.includes("fetch")) {
    return "Network error. Please check your connection and try again.";
  }
  return "Something went wrong with authentication. Please try again.";
}

export function signInWithGithub(callbackURL?: string) {
  return signIn.social({
    provider: "github",
    callbackURL: callbackURL ?? "/dashboard",
  }).catch((err) => {
    // Show a friendly toast instead of a silent console error
    const msg = friendlyAuthError(err);
    console.error("Auth error:", err);

    // Dynamic import to avoid SSR issues with sonner
    import("sonner").then(({ toast }) => {
      toast.error(msg, {
        duration: 6000,
        style: {
          background: "var(--surface-1)",
          border: "1.5px solid var(--ink)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          textTransform: "none",
        },
      });
    });

    // Re-throw so callers can still handle if they want
    throw err;
  });
}
