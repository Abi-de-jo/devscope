"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Lock } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { signInWithGithub, useSession, signOut } from "@/lib/auth-client";

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

  const LOCKED_PAGES = new Set(["/leaderboard", "/dashboard"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close modal on escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <style>{`
        .nav-desktop { display: flex; }
        .nav-hamburger { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

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
              fontSize: "1.75rem",
              color: "var(--ink)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            GitRating
          </Link>

          {/* Desktop Nav */}
          <div
            className="nav-desktop"
            style={{
              alignItems: "center",
              gap: "2rem",
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
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: isLocked ? "var(--muted)" : "var(--ink)",
                    textDecoration: "none",
                    padding: "0.25rem 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isLocked ? "var(--muted)" : "var(--ink)";
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
                Loading…
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
                onClick={handleConnect}
                disabled={connecting}
                className="btn-primary"
                style={{
                  padding: "0.625rem 1.75rem",
                  fontSize: "0.75rem",
                  opacity: connecting ? 0.7 : 1,
                  pointerEvents: connecting ? "none" : "auto",
                }}
              >
                <GithubIcon size={15} />
                {connecting ? "CONNECTING…" : "Connect GitHub"}
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="nav-hamburger"
            style={{
              background: "none",
              border: "var(--border-width) solid var(--ink)",
              borderRadius: "var(--radius)",
              cursor: "pointer",
              padding: "0.5rem",
              boxShadow: "var(--shadow-xs)",
              backgroundColor: "var(--paper-alt)",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      {/* Mobile Nav — full-screen modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(245, 244, 240, 0.88)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: "relative",
                width: "calc(100vw - 3rem)",
                maxWidth: "360px",
                backgroundColor: "var(--paper)",
                border: "var(--border-width) solid var(--ink)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-xl)",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "0.75rem",
                  background: "none",
                  border: "var(--border-width) solid var(--ink)",
                  borderRadius: "var(--radius)",
                  cursor: "pointer",
                  padding: "0.35rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--paper-alt)",
                }}
              >
                <X size={16} />
              </button>

              {/* Logo */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  marginBottom: "0.75rem",
                }}
              >
                GitRating
              </div>

              {/* Links */}
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
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: isLocked ? "var(--muted)" : "var(--ink)",
                      textDecoration: "none",
                      padding: "0.65rem 0.75rem",
                      borderRadius: "var(--radius)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "background 0.12s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--paper-alt)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {link.label}
                    {isLocked && (
                      <Lock size={11} strokeWidth={2.5} style={{ opacity: 0.55, flexShrink: 0 }} />
                    )}
                  </Link>
                );
              })}

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  backgroundColor: "var(--ink)",
                  opacity: 0.15,
                  margin: "0.5rem 0",
                }}
              />

              {/* Auth section */}
              {isPending ? (
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    textAlign: "center",
                    padding: "0.5rem 0",
                  }}
                >
                  Loading…
                </div>
              ) : session ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.65rem 0.75rem",
                      borderRadius: "var(--radius)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--ink)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--paper-alt)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <User size={16} /> Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            window.location.href = "/";
                          },
                        },
                      });
                    }}
                    className="btn-secondary"
                    style={{ justifyContent: "center", marginTop: "0.25rem" }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    handleConnect();
                  }}
                  disabled={connecting}
                  className="btn-primary"
                  style={{
                    justifyContent: "center",
                    marginTop: "0.25rem",
                    opacity: connecting ? 0.7 : 1,
                    pointerEvents: connecting ? "none" : "auto",
                  }}
                >
                  <GithubIcon size={16} />
                  {connecting ? "CONNECTING…" : "Connect GitHub"}
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
