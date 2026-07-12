import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const commonDisallows = ["/dashboard", "/api", "/report", "/profile"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: commonDisallows,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: commonDisallows,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: commonDisallows,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: commonDisallows,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: commonDisallows,
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: commonDisallows,
      },
    ],
    sitemap: "https://gitrating.mozen.in/sitemap.xml",
  };
}
