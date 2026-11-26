import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/brand";
import { blogPosts } from "@/content/blog";

// Only public, indexable pages. Dashboard and account pages are intentionally excluded.
// Blog posts carry lastmod from their real publish/update dates.
export default function sitemap(): MetadataRoute.Sitemap {
  const latest = blogPosts.map((p) => p.updatedAt ?? p.publishedAt).sort().at(-1);
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/signup`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.7 },
    ...blogPosts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.updatedAt ?? p.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
