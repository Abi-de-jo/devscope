import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ActivityLogView } from "@/components/activity-log-view";

/**
 * Server component — the REAL security boundary.
 * Verifies: (1) valid session, (2) session userId matches the token owner.
 * Even with the correct URL, an unauthenticated or wrong user gets bounced.
 */
export default async function ActivityLogPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // ── Gate 1: Valid session required ──────────────────────────────────
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/"); // Not logged in → home
  }

  // ── Gate 2: Token must belong to this user ─────────────────────────
  const user = await prisma.user.findFirst({
    where: {
      activityToken: token,
      id: session.user.id, // Double-check: token + session user must match
    },
    select: { id: true },
  });

  if (!user) {
    // Token exists but doesn't belong to this session user → 403
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
        <div className="uppercase-label" style={{ marginBottom: "1rem" }}>Access Denied</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
          This activity log doesn&apos;t belong to you.
        </h1>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", marginBottom: "2rem" }}>
          You can only view your own activity log. If you think this is a mistake, try signing out and back in.
        </p>
        <a href="/profile" className="btn-primary">Back to Profile</a>
      </div>
    );
  }

  // ── Authorized — render the log ────────────────────────────────────
  return <ActivityLogView token={token} />;
}
