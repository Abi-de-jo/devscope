import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { fullSync } from "@/lib/github";

export async function GET(request: Request) {
  // Better Auth handles the OAuth flow internally
  // After successful auth, we need to trigger a sync
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session?.user) {
    // Get GitHub account
    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        providerId: "github",
      },
    });

    if (account?.accessToken) {
      // Fire-and-forget sync (don't block the redirect)
      fullSync(session.user.id, account.accessToken).catch(console.error);
    }
  }

  // Redirect to dashboard
  return NextResponse.redirect(new URL("/dashboard", request.url));
}
