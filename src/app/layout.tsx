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
  title: "GitRating — GitHub Wrapped for Engineering Credibility",
  description:
    "Connect your GitHub, get a shareable Engineering Score card in 60 seconds, see exactly what's holding you back.",
  openGraph: {
    title: "GitRating — GitHub Wrapped for Engineering Credibility",
    description:
      "Connect your GitHub, get a shareable Engineering Score card in 60 seconds.",
    type: "website",
    siteName: "GitRating",
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
