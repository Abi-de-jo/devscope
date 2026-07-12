"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnalysisView, type AnalysisData } from "@/components/analysis-view";
import { HistorySection } from "@/components/history-section";
import { motion } from "framer-motion";
import { ArrowRight, RefreshCw } from "lucide-react";
import { CenterLoader } from "@/components/loaders/center-loader";
import { SkeletonDashboard } from "@/components/loaders/skeleton";
import { LoadingButton } from "@/components/loaders/button-loading";
import { LanguageCapabilities, type RepoLang } from "@/components/language-capabilities";
import { LockedPreview } from "@/components/locked-preview";
import { LockedDashboardContent } from "@/components/locked-dashboard-content";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [repositories, setRepositories] = useState<RepoLang[]>([]);

  const loadAnalysis = async () => {
    try {
      const res = await fetch("/api/score", { method: "GET" });
      const data = await res.json();
      if (data.success) setAnalysis(data.analysis as AnalysisData | null);
      const reposRes = await fetch("/api/repositories", { method: "GET" });
      const reposData = await reposRes.json();
      if (reposData.repositories) setRepositories(reposData.repositories as RepoLang[]);
    } catch (err) {
      console.error("Load failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) loadAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isPending, router]);

  // Runs an async flow while driving a 0–100 progress bar from the real
  // elapsed time. Fast responses fill the bar quickly; slow ones crawl.
  const runWithProgress = async (fn: () => Promise<void>) => {
    setBusy(true);
    setProgress(0);
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(92, 92 * (1 - Math.exp(-elapsed / 2500))));
    }, 80);
    try {
      await fn();
    } finally {
      clearInterval(id);
      setProgress(100);
      setTimeout(() => setBusy(false), 450);
    }
  };

  const handleSync = () =>
    runWithProgress(async () => {
      const res = await fetch("/api/sync", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        const scoreRes = await fetch("/api/score", { method: "POST" });
        await scoreRes.json();
        await loadAnalysis();
      }
    });

  const handleScore = () =>
    runWithProgress(async () => {
      const res = await fetch("/api/score", { method: "POST" });
      await res.json();
      await loadAnalysis();
    });

  // Locked preview: show blurred dummy content when not logged in
  if (!session && !isPending) {
    return (
      <LockedPreview page="dashboard" statNumber="84" statDetail="out of 100">
        <LockedDashboardContent />
      </LockedPreview>
    );
  }

  // Still loading session or analysis data — skeleton
  if (isPending || loading) {
    return <SkeletonDashboard />;
  }

  // Sync / score in flight — dim the screen, centered animated stepper + progress
  if (busy) {
    return <CenterLoader progress={progress} />;
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "4rem" }}>
        <div className="uppercase-label" style={{ marginBottom: "0.75rem" }}>Dashboard</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Your Engineering Score
        </h1>
        {!analysis && (
          <LoadingButton
            variant="primary"
            loading={busy}
            loadingText="SYNCING GITHUB…"
            onClick={handleSync}
          >
            <RefreshCw size={16} />
            Sync GitHub Repos
          </LoadingButton>
        )}
      </motion.div>

      {analysis ? (
        <>
          <AnalysisView analysis={analysis} onReanalyze={busy ? undefined : handleScore} />
          <HistorySection />
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ borderRadius: 0, textAlign: "center", padding: "6rem 2rem" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>No analysis yet</div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--muted)", maxWidth: "400px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
            Connect your GitHub account and sync your public repos to get your explainable Engineering Score.
          </p>
          <LoadingButton
            variant="primary"
            loading={busy}
            loadingText="SYNCING…"
            onClick={handleSync}
          >
            <RefreshCw size={16} />
            Sync &amp; Score
            <ArrowRight size={16} />
          </LoadingButton>
        </motion.div>
      )}

      {repositories.length > 0 && (
        <div style={{ marginTop: "4rem" }}>
          <LanguageCapabilities repositories={repositories} />
        </div>
      )}
    </div>
  );
}
