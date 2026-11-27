import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingNav from "@/components/landing/LandingNav";
import { APP_NAME, SITE_URL } from "@/config/brand";
import { BLOG_CATEGORIES, BLOG_META, blogPosts } from "@/content/blog";

const url = `${SITE_URL}/blog`;

export const metadata: Metadata = {
  title: { absolute: BLOG_META.title },
  description: BLOG_META.description,
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url, siteName: APP_NAME, locale: "en_IN", title: BLOG_META.title, description: BLOG_META.description },
  twitter: { card: "summary_large_image", title: BLOG_META.title, description: BLOG_META.description },
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: `${APP_NAME} Blog`,
        description: BLOG_META.description,
        inLanguage: "en-IN",
        blogPost: blogPosts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.publishedAt,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: url },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <LandingNav />
      <main id="main" className="mx-auto w-full max-w-[1200px] px-4 pb-20 pt-10 sm:px-6 sm:pt-16">
        <header className="max-w-[720px]">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-coral-700">Blog</p>
          <h1 className="mt-3 text-balance font-display text-[36px] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[52px]">
            Guides for finding and working with creators
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-charcoal-500">{BLOG_META.description}</p>
        </header>

        {BLOG_CATEGORIES.map((category) => {
          const posts = blogPosts.filter((p) => p.category === category);
          if (posts.length === 0) return null;
          const id = category.toLowerCase().replace(/[^a-z]+/g, "-");
          return (
            <section key={category} aria-labelledby={id} className="mt-14">
              <h2 id={id} className="font-display text-[26px] font-medium tracking-[-0.01em] sm:text-[30px]">
                {category}
              </h2>
              <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white transition hover:border-coral-200 hover:shadow-lift"
                    >
                      <Image src={p.hero.src} alt="" width={p.hero.width} height={p.hero.height} unoptimized className="h-auto w-full border-b border-sand-200" />
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-display text-[21px] font-medium leading-tight tracking-[-0.01em] group-hover:text-coral-700">
                          {p.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-relaxed text-charcoal-500">{p.excerpt}</p>
                        <p className="mt-4 text-[13.5px] text-charcoal-400">
                          <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time> · {p.readingTime}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </main>
      <LandingFooter />
    </div>
  );
}
