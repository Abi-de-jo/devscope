import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api", "/report"],
    },
    sitemap: "https://GitRating.mozen.in/sitemap.xml",
  };
}
