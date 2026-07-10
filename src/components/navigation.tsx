"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "var(--paper)",
        borderBottom: "var(--border-width) solid var(--ink)",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1rem 1.5rem",
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
              padding: "0.25rem 0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
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
          <Link
            href="/dashboard"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            About
          </Link>
          <Link href="/api/auth/signin" className="btn-primary">
            Connect GitHub →
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
          }}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div
          style={{
            padding: "1rem 1.5rem",
            borderTop: "var(--border-width) solid var(--ink)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
          className="md:hidden"
        >
          <Link
            href="/dashboard"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            About
          </Link>
          <Link href="/api/auth/signin" className="btn-primary">
            Connect GitHub →
          </Link>
        </div>
      )}
    </header>
  );
}
