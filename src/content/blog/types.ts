/**
 * Blog content model for discover.kudozz.in.
 *
 * Articles are plain data rendered by src/components/blog/ArticleBody.tsx, so every word ships as server-rendered,
 * crawlable HTML. Product copy must stay within what the app actually does (Instagram creators in India; filters,
 * lists and contact reveals) — check src/lib/constants and the discover/lists components before adding a claim.
 */

/** Relative hrefs ("/signup", "/blog/...") stay on this site; absolute ones open in a new tab. */
export type InlineLink = { text: string; href: string };

export type BlogBlock =
  | { type: "paragraph"; text: string; links?: InlineLink[] }
  /** H2, listed in the table of contents. */
  | { type: "heading"; text: string; id: string }
  /** H3, not listed in the table of contents. */
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; headers: string[]; rows: string[][] }
  /** Copy-ready text (templates, checklists), rendered preformatted with a copy button. */
  | { type: "template"; label?: string; text: string }
  /** Hand-placed product CTA. Copy must stay within verified product facts. */
  | { type: "cta"; headline: string; body: string; ctaLabel?: string };

export type BlogFaq = { question: string; answer: string };

export type BlogCategory = "Creator Discovery" | "Campaign Planning";

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  /** On-page H1. */
  title: string;
  /** <title> for search results; falls back to `title`. */
  seoTitle?: string;
  excerpt: string;
  /** Meta description; falls back to `excerpt`. */
  metaDescription?: string;
  author: { name: string; url?: string };
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  /** Only set when the content is genuinely revised. */
  updatedAt?: string;
  readingTime: string;
  primaryKeyword: string;
  keywords: string[];
  hero: { src: string; alt: string; width: number; height: number };
  body: BlogBlock[];
  faqs: BlogFaq[];
  /** End-of-article CTA copy. */
  endCta: { headline: string; body: string; ctaLabel: string };
};
