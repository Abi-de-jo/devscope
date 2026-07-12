/**
 * Friendly error messages for system-level failures.
 * Maps HTTP status codes and error types to human-readable text + action links.
 * Only covers errors that affect the whole system — not field validation.
 */

import { toast } from "sonner";

interface FriendlyError {
  title: string;
  message: string;
  /** Where the "What happened" / action button sends the user */
  actionLabel: string;
  actionHref: string;
}

const ERROR_MAP: Record<number, FriendlyError> = {
  401: {
    title: "Session expired",
    message: "Your login session has ended. Please sign in again to continue.",
    actionLabel: "Go to Home",
    actionHref: "/",
  },
  403: {
    title: "Access denied",
    message:
      "You don't have permission to access this resource. If you think this is a mistake, reach out to us.",
    actionLabel: "Contact Support",
    actionHref: "/contact",
  },
  404: {
    title: "Page not found",
    message:
      "The page you're looking for doesn't exist or may have been moved.",
    actionLabel: "Back to Home",
    actionHref: "/",
  },
  429: {
    title: "Slow down",
    message:
      "You're making too many requests. Take a short break and try again in a minute.",
    actionLabel: "Back to Home",
    actionHref: "/",
  },
  500: {
    title: "Something went wrong",
    message:
      "Our server hit an unexpected error. We've been notified and are looking into it.",
    actionLabel: "Back to Home",
    actionHref: "/",
  },
  502: {
    title: "Service temporarily down",
    message:
      "Our servers are briefly unreachable. This usually resolves within a few minutes.",
    actionLabel: "Back to Home",
    actionHref: "/",
  },
  503: {
    title: "Maintenance in progress",
    message:
      "We're currently performing maintenance. Please check back shortly.",
    actionLabel: "Back to Home",
    actionHref: "/",
  },
};

/** Catch-all for network / unknown errors */
const NETWORK_ERROR: FriendlyError = {
  title: "Connection lost",
  message:
    "Could not reach our servers. Check your internet connection and try again.",
  actionLabel: "Back to Home",
  actionHref: "/",
};

/* ─── Public API ──────────────────────────────────────────────────────── */

/**
 * Show a branded, user-friendly error toast for system-level errors.
 *
 * @param input - HTTP status code, Error object, or string message.
 *                If it's a number ≥ 400, it maps to a friendly error.
 *                If it's a string, it wraps it as an unknown error.
 * @returns The resolved FriendlyError (useful if caller needs it).
 */
export function showErrorToast(
  input: number | Error | string | null | undefined
): FriendlyError {
  let info: FriendlyError;
  let consoleError: unknown;

  if (typeof input === "number" && input >= 400) {
    info = ERROR_MAP[input] ?? {
      title: "Unexpected error",
      message: `Something went wrong (error code: ${input}). Please try again later.`,
      actionLabel: "Back to Home",
      actionHref: "/",
    };
    consoleError = `HTTP ${input}`;
  } else if (input instanceof Error) {
    // Network errors, AbortError, etc.
    if (input.name === "AbortError") {
      info = {
        title: "Request timed out",
        message: "The request took too long. Please try again.",
        actionLabel: "Back to Home",
        actionHref: "/",
      };
    } else {
      info = NETWORK_ERROR;
    }
    consoleError = input;
  } else if (typeof input === "string" && input.length > 0) {
    // A raw error string from the API (e.g. data.error)
    info = {
      title: "Something went wrong",
      message: input,
      actionLabel: "Back to Home",
      actionHref: "/",
    };
    consoleError = input;
  } else {
    info = NETWORK_ERROR;
    consoleError = input;
  }

  // Log for debugging
  console.error("[ErrorToast]", info.title, consoleError);

  // Show toast with action button
  toast.error(info.title, {
    description: info.message,
    duration: 8000,
    action: {
      label: info.actionLabel,
      onClick: () => {
        window.location.href = info.actionHref;
      },
    },
    style: {
      fontFamily: "var(--font-mono)",
      border: "1.5px solid var(--ink)",
      borderRadius: "2px",
      boxShadow: "3px 3px 0 var(--ink)",
      background: "var(--paper)",
      color: "var(--ink)",
    },
  });

  return info;
}

/**
 * Show a user-friendly toast for API error responses.
 * Checks `res.ok` and maps the status code.
 * Returns `true` if an error toast was shown (caller should bail).
 */
export async function handleApiResponse(
  res: Response,
  fallbackMessage?: string
): Promise<boolean> {
  if (res.ok) return false;

  // Try to extract a server-provided error message
  let serverMessage: string | undefined;
  try {
    const body = await res.json();
    serverMessage = body?.error;
  } catch {
    // Body isn't JSON — use status code mapping
  }

  // If server gave a specific message AND it's not a system error (≥500),
  // show the server message directly — it's more specific.
  if (res.status < 500 && serverMessage) {
    toast.error(serverMessage, {
      duration: 6000,
      style: {
        fontFamily: "var(--font-mono)",
        border: "1.5px solid var(--ink)",
        borderRadius: "2px",
        boxShadow: "3px 3px 0 var(--ink)",
        background: "var(--paper)",
        color: "var(--ink)",
      },
    });
    return true;
  }

  // System-level error → show mapped friendly message
  showErrorToast(res.status);
  return true;
}
