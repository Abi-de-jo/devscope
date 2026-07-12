"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
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
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [repositories, setRepositories] = useState<RepoLang[]>([]);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  /**
   * Run a multi-step async flow with a progress bar.
   * `steps` is an array of async callbacks. Each one advances the step
   * counter when it completes. Progress is time-based (exponential curve)
   * but caps at 95% until the final step finishes, then snaps to 100%.
   */
  const runWithSteps = useCallback(
    async (steps: Array<() => Promise<void>>) => {
      setBusy(true);
      setStep(0);
      setProgress(0);

      const start = Date.now();
      progressRef.current = setInterval(() => {
        const elapsed = Date.now() - start;
        // Exponential ease toward 95%, never reaches it until done
        setProgress(Math.min(95, 95 * (1 - Math.exp(-elapsed / 4000))));
      }, 80);

      try {
        for (let i = 0; i < steps.length; i++) {
          setStep(i);
          await steps[i]();
        }
      } finally {
        if (progressRef.current) {
          clearInterval(progressRef.current);
          progressRef.current = null;
        }
        setProgress(100);
        // Brief pause at 100% so user sees the checkmarks
        setTimeout(() => setBusy(false), 600);
      }
    },
    []
  );

  const handleSync = () =>
    runWithSteps([
      // Step 0: Sync GitHub repos
      async () => {
        const res = await fetch("/api/sync", { method: "POST" });
        await res.json();
      },
      // Step 1: Score (AI)
      async () => {
        const res = await fetch("/api/score", { method: "POST" });
        await res.json();
      },
      // Step 2: Load results + repos
      async () => {
        await loadAnalysis();
      },
    ]);

  const handleScore = () =>
    runWithSteps([
      // Step 1: Score (skip sync)
      async () => {
        setStep(1);
        const res = await fetch("/api/score", { method: "POST" });
        await res.json();
      },
      // Step 2: Load results
      async () => {
        setStep(2);
        await loadAnalysis();
      },
    ]);

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
    return <CenterLoader progress={progress} step={step} />;
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
