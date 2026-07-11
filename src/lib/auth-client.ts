"use client";

import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"),
});

export const { signIn, signOut, useSession } = authClient;

export function signInWithGithub() {
  return signIn.social({
    provider: "github",
    callbackURL: "/dashboard",
  });
}
