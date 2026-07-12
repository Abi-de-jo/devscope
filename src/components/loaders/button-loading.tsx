"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

/** Three-dot pulse for inline button loading. Inherits text color via currentColor. */
export function LoadingDots() {
  return (
    <span style={{ display: "inline-flex", gap: "3px", alignItems: "center" }} aria-hidden="true">
      <span className="dot-pulse" />
      <span className="dot-pulse" />
      <span className="dot-pulse" />
    </span>
  );
}

type Variant = "primary" | "secondary" | "accent";

/**
 * Button that keeps its keycap/neobrutalist style while loading — never
 * grayed out. Swaps the label for `loadingText` + a three-dot pulse and
 * becomes non-interactive. Use for OAuth redirects, re-analyze, etc.
 */
export function LoadingButton({
  loading,
  loadingText,
  variant = "primary",
  children,
  className,
  disabled,
  type = "button",
  ...rest
}: {
  loading?: boolean;
  loadingText?: string;
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `btn-${variant}${className ? ` ${className}` : ""}`;
  return (
    <button className={cls} disabled={disabled || loading} aria-busy={loading || undefined} type={type} {...rest}>
      {loading ? (
        <>
          {loadingText ?? "Loading…"}
          <LoadingDots />
        </>
      ) : (
        children
      )}
    </button>
  );
}
