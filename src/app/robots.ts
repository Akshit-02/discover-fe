import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The private app. /login and /forgot-password stay crawlable so bots can see their
        // `X-Robots-Tag: noindex` header (next.config.mjs); blocking them would hide it.
        disallow: ["/dashboard"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
