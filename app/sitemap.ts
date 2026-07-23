import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://fumiguard.jorpat-art.com";

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${base}/catalog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/calculator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/testimonials`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/login`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.1 },
    { url: `${base}/register`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.1 },
  ];

  return staticPages;
}
