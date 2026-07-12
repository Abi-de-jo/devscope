"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Github, ArrowRight, RefreshCw, TrendingUp } from "lucide-react";
import { HistorySection } from "@/components/history-section";

interface ProfileAnalysis {
  overallScore: number;
  engineerLevel: string;
  confidence: number | null;
  confidenceScore: number | null;
  username: string | null;
  summary: string;
}

type Tab = "profile" | "history";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("profile");
  const [analysis, setAnalysis] = useState<ProfileAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
      return;
    }
    if (session) {
      fetch("/api/score")
        .then((r) => r.json())
        .then((d) => {
          if (d.success) setAnalysis(d.analysis as ProfileAnalysis | null);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isPending, router]);

  if (isPending || loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>
          Loading…
        </div>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;
  const conf = analysis?.confidence ?? (analysis ? Math.round((analysis.confidenceScore ?? 0) * 100) : 0);
  const handle = analysis?.username;

  const handleSignOut = () => {
    signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } });
  };

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(2rem, 6vw, 4rem) 1.5rem" }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", border: "var(--border-width) solid var(--ink)", boxShadow: "var(--shadow-xs)", background: "var(--paper-alt)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name || "User"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <User size={32} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.1, margin: 0 }}>{user.name || "GitRating User"}</h1>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: "0.35rem" }}>{user.email}</div>
          {handle && (
            <a href={`https://github.com/${handle}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--ink)", textDecoration: "none", marginTop: "0.4rem" }}>
              <Github size={14} /> @{handle}
            </a>
          )}
        </div>
        <button type="button" onClick={handleSignOut} className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <LogOut size={15} /> Sign Out
        </button>
      </motion.div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", borderBottom: "var(--border-width) solid var(--ink)", marginBottom: "2.5rem" }}>
        {([
          { id: "profile" as Tab, label: "Profile", icon: User },
          { id: "history" as Tab, label: "History", icon: TrendingUp },
        ]).map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                padding: "0.75rem 1.25rem",
                cursor: "pointer",
                background: active ? "var(--ink)" : "transparent",
                color: active ? "var(--paper)" : "var(--ink)",
                border: "var(--border-width) solid var(--ink)",
                borderBottom: active ? "var(--border-width) solid var(--ink)" : "none",
                marginBottom: "-1px",
              }}
            >
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {tab === "profile" ? (
          <motion.div key="profile" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
            {analysis ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 0, border: "var(--border-width) solid var(--ink)", borderRadius: "2px", overflow: "hidden" }}>
                <div className="card" style={{ borderRadius: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "4rem", borderRight: "var(--border-width) solid var(--ink)" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "6rem", fontWeight: 700, lineHeight: 1, color: analysis.overallScore >= 70 ? "var(--accent)" : analysis.overallScore >= 40 ? "var(--ink)" : "#E74C3C" }}>
                    {analysis.overallScore}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginTop: "0.5rem" }}>Engineering Score</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, marginTop: "1rem" }}>{analysis.engineerLevel}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: "1rem", color: conf >= 75 ? "var(--accent)" : conf >= 50 ? "var(--ink)" : "#E74C3C", border: "1.5px solid currentColor", borderRadius: "2px", padding: "0.15rem 0.5rem" }}>
                    Confidence {conf}%
                  </div>
                </div>
                <div className="card" style={{ borderRadius: 0, padding: "2rem" }}>
                  <div className="uppercase-label" style={{ marginBottom: "1rem" }}>Summary</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink)", marginBottom: "1.5rem" }}>{analysis.summary}</p>
                  {handle && (
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      <Link href={`/u/${handle}`} className="btn-secondary" style={{ fontSize: "0.78rem", padding: "0.5rem 0.9rem" }}>
                        View public profile <ArrowRight size={14} />
                      </Link>
                      <Link href={`/report/${handle}`} className="btn-secondary" style={{ fontSize: "0.78rem", padding: "0.5rem 0.9rem" }}>
                        Download report <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="card" style={{ borderRadius: 0, textAlign: "center", padding: "5rem 2rem" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" }}>No score yet</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--muted)", maxWidth: "400px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
                  Head to your dashboard and sync GitHub to generate your explainable Engineering Score.
                </p>
                <Link href="/dashboard" className="btn-primary">
                  Go to Dashboard <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div key="history" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
            <HistorySection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
