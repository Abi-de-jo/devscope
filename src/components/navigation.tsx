"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          DevScope
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
            { href: "/dashboard", label: "Dashboard" },
            { href: "/about", label: "About" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--ink)",
                textDecoration: "none",
                position: "relative",
                padding: "0.25rem 0",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.color = "var(--ink)";
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/api/auth/signin/github"
            className="btn-primary"
            style={{ padding: "0.625rem 1.25rem", fontSize: "0.75rem" }}
          >
            <Github size={15} />
            Connect GitHub
          </Link>
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
                { href: "/dashboard", label: "Dashboard" },
                { href: "/about", label: "About" },
              ].map((link) => (
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
                    color: "var(--ink)",
                    textDecoration: "none",
                    padding: "0.5rem 0",
                    borderBottom: "var(--border-width) solid var(--ink)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/api/auth/signin/github"
                className="btn-primary"
                style={{ marginTop: "0.5rem", justifyContent: "center" }}
                onClick={() => setIsOpen(false)}
              >
                <Github size={16} />
                Connect GitHub
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
