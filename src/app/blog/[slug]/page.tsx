import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/blog/ArticleBody";
import BlogCta from "@/components/blog/BlogCta";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingNav from "@/components/landing/LandingNav";
import { APP_NAME, BRAND_NAME, LEGAL_NAME, PARENT_SITE_URL, SITE_URL } from "@/config/brand";
import { blogPosts, getPost } from "@/content/blog";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = post.seoTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;
  return {
    title: { absolute: title },
    description,
    keywords: post.keywords,
    authors: [{ name: post.author.name, url: post.author.url }],
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url,
      siteName: APP_NAME,
      locale: "en_IN",
      title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      section: post.category,
      tags: post.keywords,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const TocList = ({ toc }: { toc: { id: string; text: string }[] }) => (
  <ol className="mt-3 space-y-2 text-[14px] leading-snug">
    {toc.map((h) => (
      <li key={h.id}>
        <a href={`#${h.id}`} className="text-charcoal-600 hover:text-coral-700">
          {h.text}
        </a>
      </li>
    ))}
    <li>
      <a href="#faqs" className="text-charcoal-600 hover:text-coral-700">
        FAQs
      </a>
    </li>
  </ol>
);

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const toc = post.body.filter((b): b is Extract<typeof b, { type: "heading" }> => b.type === "heading");
  const picked = (post.related ?? []).map(getPost).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const fill = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category && !picked.includes(p));
  const rest = blogPosts.filter((p) => p.slug !== post.slug && !picked.includes(p) && !fill.includes(p));
  const others = [...picked, ...fill, ...rest].slice(0, 4);
  const orgId = `${PARENT_SITE_URL}/#organization`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": orgId, name: BRAND_NAME, legalName: LEGAL_NAME, url: PARENT_SITE_URL },
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: url,
        url,
        headline: post.title,
        description: post.metaDescription ?? post.excerpt,
        image: [`${SITE_URL}${post.hero.src}`, `${url}/opengraph-image`],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        inLanguage: "en-IN",
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        author: { "@type": "Organization", name: post.author.name, url: post.author.url ?? PARENT_SITE_URL },
        publisher: { "@id": orgId },
        isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog#blog`, name: `${APP_NAME} Blog`, url: `${SITE_URL}/blog` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-cream text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-charcoal px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <LandingNav />

      <main id="main" className="mx-auto w-full max-w-[1200px] px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="Breadcrumb" className="text-[13.5px] text-charcoal-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-coral-700">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/blog" className="hover:text-coral-700">Blog</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="line-clamp-1 text-charcoal-600">{post.title}</li>
          </ol>
        </nav>

        <article className="mt-6">
          <header className="max-w-[820px]">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-coral-700">{post.category}</p>
            <h1 className="mt-3 text-balance font-display text-[34px] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[48px]">
              {post.title}
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-charcoal-500 sm:text-[18.5px]">{post.excerpt}</p>
            <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-[14px] text-charcoal-500">
              <span>By {post.author.name}</span>
              <span aria-hidden>·</span>
              <span>
                Published <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              {post.updatedAt && (
                <>
                  <span aria-hidden>·</span>
                  <span>
                    Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                  </span>
                </>
              )}
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </p>
          </header>

          <Image
            src={post.hero.src}
            alt={post.hero.alt}
            width={post.hero.width}
            height={post.hero.height}
            priority
            unoptimized
            className="mt-8 h-auto w-full rounded-3xl border border-sand-200 shadow-soft"
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
            <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
              {/* Collapsed on mobile so the article starts near the top; always open in the desktop sidebar. */}
              <details className="group rounded-2xl border border-sand-200 bg-white p-4 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[13px] font-bold uppercase tracking-[0.12em] text-charcoal-500">
                  On this page
                  <span aria-hidden className="text-[16px] transition-transform group-open:rotate-45">+</span>
                </summary>
                <TocList toc={toc} />
              </details>
              <nav aria-label="On this page" className="hidden lg:block">
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-charcoal-400">On this page</p>
                <TocList toc={toc} />
              </nav>
            </aside>

            <div className="min-w-0 max-w-[760px]">
              <ArticleBody blocks={post.body} slug={post.slug} />

              <section aria-labelledby="faqs" className="mt-14">
                <h2 id="faqs" className="scroll-mt-24 font-display text-[28px] font-medium leading-[1.15] tracking-[-0.015em] sm:text-[32px]">
                  Frequently asked questions
                </h2>
                <div className="mt-6 divide-y divide-sand-200 rounded-2xl border border-sand-200 bg-white">
                  {post.faqs.map((f) => (
                    <div key={f.question} className="p-5 sm:p-6">
                      <h3 className="text-[17px] font-bold leading-snug text-charcoal">{f.question}</h3>
                      <p className="mt-2 text-[16px] leading-relaxed text-charcoal-600">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="mt-14">
                <BlogCta {...post.endCta} cta={`signup-blog-end-${post.slug}`} variant="end" />
              </div>

              {others.length > 0 && (
                <section aria-labelledby="more-guides" className="mt-14">
                  <h2 id="more-guides" className="font-display text-[24px] font-medium">More guides</h2>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    {others.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`} className="block h-full rounded-2xl border border-sand-200 bg-white p-5 transition hover:border-coral-200 hover:shadow-soft">
                          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-coral-700">{p.category}</p>
                          <p className="mt-2 text-[17px] font-bold leading-snug text-charcoal">{p.title}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </article>
      </main>

      <LandingFooter />
    </div>
  );
}
