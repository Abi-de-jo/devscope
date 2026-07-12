"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Lock } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { signInWithGithub, useSession, signOut } from "@/lib/auth-client";
import { LoadingButton } from "@/components/loaders/button-loading";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const { data: session, isPending } = useSession();

  const handleConnect = () => {
    setConnecting(true);
    try {
      localStorage.setItem("devscope:returnTo", window.location.pathname);
    } catch { /* noop */ }
    signInWithGithub(window.location.pathname);
  };

  /* Locked pages — show lock icon when user is logged out */
  const LOCKED_PAGES = new Set(["/leaderboard", "/dashboard"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? "rgba(245, 244, 240, 0.85)" : "var(--paper)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: "var(--border-width) solid var(--ink)",
        transition: "background-color 0.2s, backdrop-filter 0.2s",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0.875rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "var(--ink)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              backgroundColor: "var(--ink)",
              color: "var(--paper)",
              padding: "0.2rem 0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            DS
          </span>
          GitRating
        </Link>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
          className="hidden md:flex"
        >
          {[
            { href: "/battle", label: "Battle" },
            { href: "/leaderboard", label: "Leaderboard" },
            { href: "/dashboard", label: "Dashboard" },
            { href: "/methodology", label: "Methodology" },
            { href: "/about", label: "About" },
          ].map((link) => {
            const isLocked = !session && LOCKED_PAGES.has(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: isLocked ? "var(--muted)" : "var(--ink)",
                  textDecoration: "none",
                  position: "relative",
                  padding: "0.25rem 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  target.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.color = isLocked ? "var(--muted)" : "var(--ink)";
                }}
              >
                {link.label}
                {isLocked && (
                  <Lock size={11} strokeWidth={2.5} style={{ opacity: 0.55, flexShrink: 0 }} />
                )}
              </Link>
            );
          })}
          {isPending ? (
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)" }}>
              Loading...
            </div>
          ) : session ? (
            <Link
              href="/profile"
              aria-label="Profile"
              className="icon-btn"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <User size={18} />
              )}
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => signInWithGithub()}
              className="btn-primary"
              style={{ padding: "0.625rem 1.25rem", fontSize: "0.75rem" }}
            >
              <GithubIcon size={15} />
              Connect GitHub
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "none",
            background: "none",
            border: "var(--border-width) solid var(--ink)",
            borderRadius: "var(--radius)",
            cursor: "pointer",
            padding: "0.5rem",
            boxShadow: "var(--shadow-xs)",
            backgroundColor: "var(--paper-alt)",
          }}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
            className="md:hidden"
          >
            <div
              style={{
                padding: "1rem 1.5rem 1.5rem",
                borderTop: "var(--border-width) solid var(--ink)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                backgroundColor: "var(--paper-alt)",
              }}
            >
              {[
                { href: "/battle", label: "Battle" },
                { href: "/leaderboard", label: "Leaderboard" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/methodology", label: "Methodology" },
                { href: "/about", label: "About" },
              ].map((link) => {
                const isLocked = !session && LOCKED_PAGES.has(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: isLocked ? "var(--muted)" : "var(--ink)",
                      textDecoration: "none",
                      padding: "0.5rem 0",
                      borderBottom: "var(--border-width) solid var(--ink)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    {link.label}
                    {isLocked && (
                      <Lock size={11} strokeWidth={2.5} style={{ opacity: 0.55, flexShrink: 0 }} />
                    )}
                  </Link>
                );
              })}
              {isPending ? (
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--muted)", textAlign: "center", padding: "0.5rem 0" }}>
                  Loading...
                </div>
              ) : session ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0", borderBottom: "var(--border-width) solid var(--ink)", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink)", textDecoration: "none" }}
                  >
                    <User size={18} /> Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } });
                    }}
                    className="btn-secondary"
                    style={{ justifyContent: "center" }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    signInWithGithub();
                  }}
                  className="btn-primary"
                  style={{ marginTop: "0.5rem", justifyContent: "center" }}
                >
                  <GithubIcon size={16} />
                  Connect GitHub
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
