import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://GitRating.mozen.in";
  const staticEntries: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/methodology`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  try {
    const profiles = await prisma.githubProfile.findMany({
      select: { login: true, updatedAt: true },
      take: 5000,
    });
    const profileEntries: MetadataRoute.Sitemap = profiles.map((p) => ({
      url: `${base}/u/${p.login}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
    return [...staticEntries, ...profileEntries];
  } catch {
    return staticEntries;
  }
}
