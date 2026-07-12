import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gitrating.mozen.in"),
  title: {
    default: "GitRating — GitHub Wrapped, GitScore & Engineering Rankings",
    template: "%s | GitRating",
  },
  description:
    "Connect your GitHub, analyze your repos, and get your GitScore. GitRating is a 10-axis GitHub wrapped developer rating and engineering scorecard.",
  keywords: [
    "GitHub Wrapped",
    "GitScore",
    "Git Ranking",
    "GitHub Score",
    "Developer Ranking",
    "GitRating",
    "Engineering Credibility",
    "git",
    "github",
    "developer scorecard",
    "code audit",
    "programmer rating",
    "devscope",
  ],
  authors: [{ name: "Mozen Studio", url: "https://mozen.in" }],
  creator: "Mozen Studio",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "GitRating — GitHub Wrapped, GitScore & Developer Ranking",
    description:
      "Connect your GitHub to calculate your GitScore and engineering credibility card in 60 seconds.",
    url: "https://gitrating.mozen.in",
    siteName: "GitRating",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "GitRating — GitHub Wrapped for Engineering Credibility",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitRating — GitHub Wrapped, GitScore & Developer Ranking",
    description:
      "Connect your GitHub to calculate your GitScore and engineering credibility card in 60 seconds.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SmoothScroll>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                fontFamily: "var(--font-mono)",
                border: "1.5px solid var(--ink)",
                borderRadius: "2px",
                boxShadow: "2px 2px 0 var(--ink)",
                background: "var(--paper)",
                color: "var(--ink)",
              },
            }}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
