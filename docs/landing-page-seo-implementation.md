# Landing page SEO implementation — discover.kudozz.in

Implemented 26 Nov 2026. Canonical host: `https://discover.kudozz.in/`.

## 1. Critical fix: the homepage was invisible to crawlers

**Before:** `src/app/layout.tsx` wrapped every route in `StoreProvider`, which contains redux-persist's `<PersistGate loading={<PageLoader …/>}>`. PersistGate renders only its loading UI during server rendering, so the server HTML for `/` contained just **"Getting things ready…"**. A fetch of the live site confirmed this. Search engines that don't execute JavaScript saw an empty page, and Google saw no content until hydration.

**After:** the root layout no longer mounts the store. `StoreProvider` is mounted in `app/(auth)/layout.tsx` and `app/dashboard/layout.tsx`, which are the only routes that use Redux. The homepage is now a **static, fully server-rendered page**. All 17 sections, the FAQ answers and the JSON-LD are in the initial HTML (about 3,000 visible words). First-load JS for `/` is 101 kB, and the only client component on the page is the nav.

Side effects checked:

- Amplify is still configured on import of `lib/store/store.ts`, which the auth and dashboard layouts import.
- Middleware auth uses its own server config and is unaffected.
- `not-found.tsx` doesn't use the store.
- `next build` and `next lint` pass.

## 2. Metadata (`src/app/page.tsx`, copy in `src/components/landing/content.ts`)

| Tag | Value |
| --- | --- |
| `<title>` | Influencer Discovery Tool in India \| Kudozz (43 chars) |
| meta description | Find Instagram influencers in India by niche, followers, city, language and engagement. Evaluate creator metrics, build shortlists and unlock contacts with credits. Start free. (≈175 chars; may truncate slightly on mobile, with the key terms up front) |
| canonical | `https://discover.kudozz.in` (Next.js normalises the root URL without the trailing slash; for the origin root this is the same URL as `…/`) |
| robots | `index, follow` |
| og:title / twitter:title | India's No. 1 Influencer Discovery Tool \| Kudozz |
| og:description / twitter:description | Search Instagram creators by niche, followers, location, language and engagement. Shortlist the right fit and unlock contact details only when you need them. |
| og:image / twitter:image | `/opengraph-image`, generated 1200×630 PNG (`src/app/opengraph-image.tsx`) with alt text |
| og:type / og:locale / og:site_name | website / en_IN / Kudozz Influencer Discovery |
| twitter:card | summary_large_image |
| favicon | `src/app/icon.svg` (existing; Next emits `<link rel="icon">`) |
| `metadataBase` | `https://discover.kudozz.in` (root layout) so all relative URLs resolve to the canonical host |
| `<html lang>` | `en-IN` |
| theme-color | `#FFF7F1` |

**Title choice:** the descriptive "Influencer Discovery Tool in India" leads the title because it matches the head query and is a factual claim. The "No. 1" phrasing is used in the H1 and the social title, where it is the requested brand positioning (see the claim flag in the content strategy doc).

**No conflicting inherited tags:** the root layout sets only `title.template`, `description` and `applicationName`. The homepage uses `title.absolute` and its own description, so nothing duplicates.

Signup page (`/signup`): its own title, description and canonical.

## 3. Heading structure

- Exactly **one H1**: "India's No. 1 Influencer Discovery Tool".
- **14 H2s**, one per section, each with an `aria-labelledby` link from its `<section>`:
  - What is Kudozz Influencer Discovery?
  - Finding the Right Influencers Shouldn't Take Hours of Manual Research
  - Discover Influencers That Match Your Brand
  - Find Micro and Nano Influencers Across India
  - Find Influencers by Niche, Location and Language
  - Go Beyond Follower Counts. Evaluate the Right Creator Metrics.
  - Find Creator Contact Details and Simplify Outreach
  - Organise Your Influencer Research with Creator Lists
  - How Kudozz Influencer Discovery Works
  - Built for Brands, Agencies and Growing Businesses
  - Discover Creators Across Different Categories
  - Flexible Credits. Pay for the Creator Insights You Need.
  - Frequently Asked Questions About Influencer Discovery
  - Start Finding the Right Creators for Your Next Campaign
- H3s for cards, steps, audiences, pricing sub-blocks and each FAQ question.
- Footer column labels are styled `<p>`, not headings, so they don't pollute the outline.

## 4. Structured data (`src/components/landing/StructuredData.tsx`)

There is one `@graph` JSON-LD block. It parses as valid JSON and every value mirrors visible page content.

| Type | Key properties | Notes |
| --- | --- | --- |
| `Organization` | name Kudozz, legalName Kudozz Studios Private Limited, url kudozz.in, email, sameAs Instagram + LinkedIn | Legal name and socials taken from the kudozz.in footer |
| `WebSite` | url, name, inLanguage en-IN, publisher → Organization | No `SearchAction` because there is no public site search |
| `WebPage` | name = title, description, about → SoftwareApplication, primaryImageOfPage | |
| `SoftwareApplication` | name, url, description (the visible definition), applicationCategory BusinessApplication, operatingSystem "Web browser", areaServed India, audience, `AggregateOffer` INR 249–2,999, offerCount 4 | Prices match the visible pricing cards and `creditPacks.ts`. **No ratings, reviews or awards.** |
| `FAQPage` | 15 Question/Answer pairs, generated from the same `FAQS` array as the visible FAQ | Since Aug 2023 Google shows FAQ rich results only for authoritative government and health sites. Don't expect a rich result. The markup still accurately describes visible content and can help other consumers. |

`BreadcrumbList` is not used because the homepage has no breadcrumbs.

**Validation done:** JSON parsed from the served HTML; types and FAQ count verified programmatically. **Still to do (needs the public URL):** run https://search.google.com/test/rich-results and https://validator.schema.org/ against the deployed page.

## 5. Crawling and indexing

| File / mechanism | Behaviour |
| --- | --- |
| `src/app/robots.ts` → `/robots.txt` | `Allow: /`, `Disallow: /dashboard`, `Sitemap: https://discover.kudozz.in/sitemap.xml` |
| `src/app/sitemap.ts` → `/sitemap.xml` | `/` and `/signup` only |
| `next.config.mjs` headers | `X-Robots-Tag: noindex, nofollow` on `/dashboard`, `/dashboard/*`, `/login`, `/forgot-password` |
| Middleware (unchanged) | Unauthenticated `/dashboard/*` → 307 to `/login?redirect=…`, so private pages never render for crawlers |

`/login` and `/forgot-password` are deliberately **not** disallowed in robots.txt. A disallow would stop crawlers from fetching them and seeing the `noindex` header, which can leave a URL indexed without content.

Creator contact values are never in public HTML. The API only returns them to authenticated users after a reveal, and the landing page uses invented sample data.

## 6. Internal links

| Link | Target | Status |
| --- | --- | --- |
| Nav: Home, Features, How It Works, Pricing, FAQs | `#top`, `#features`, `#how-it-works`, `#pricing`, `#faq` | All IDs exist; `scroll-mt-20` offsets the sticky header |
| Nav: Login / Start Free | `/login`, `/signup` | 200 |
| Hero, problem, metrics, how-it-works and final CTAs | `/signup` | 200 |
| Pricing "Get Started" (×4) | `/signup` (packs are bought in-app after sign-up) | 200 |
| Secondary CTAs | `#features`, `#pricing` | OK |
| Footer | `#features`, `#how-it-works`, `#pricing`, `#faq`, `/signup`, `/login`, kudozz.in/contact, mailto, kudozz.in, Instagram, LinkedIn | OK (kudozz.in/contact returned 200) |

There is no documentation or blog on this subdomain to link to. **Privacy Policy and Terms are not linked because no such pages exist** (checked on kudozz.in; see "Remaining opportunities").

## 7. Images

- The hero "screenshot" is a **coded replica of the real Discover screen and profile drawer**, not a raster image. This means zero image bytes on the LCP path, crisp rendering at any DPR, no CLS, and text that is crawlable. It is wrapped in `<figure>` with a `<figcaption>` stating that names and numbers are illustrative.
- Real screenshots were not used because they would show real creators' names and metrics on a public page.
- Avatars are initials (no stock or real faces).
- Icons are inline SVG (Phosphor SSR build), marked `aria-hidden`.
- The OG image is generated at build time (PNG, 1200×630, with alt text).
- No `<img>` tags on the page, so no lazy-loading or `srcset` was needed.

## 8. Performance and accessibility

- Static prerender (`○ /`); 101 kB first-load JS. The only client JS is the nav's scroll and menu state.
- Fonts via `next/font` (self-hosted, `display: swap`). These were already configured.
- **No Framer Motion.** I chose not to add a ~30–40 kB animation runtime to a static page. Motion uses CSS only:
  - Scroll reveals via `animation-timeline: view()` inside `@supports`, so content is always visible where unsupported.
  - Disabled under `prefers-reduced-motion`.
  - Smooth anchor scrolling only when motion is allowed.
  - The reduced-motion override is scoped to `.landing`, so dashboard spinners keep working.
- Accessibility:
  - Skip link to `#main`, landmarks (`header`/`nav`/`main`/`footer`) and labelled sections.
  - Visible focus rings on all CTAs and nav links.
  - Mobile menu has `aria-expanded`/`aria-controls`, closes on Escape (focus returns to the toggle) and on resize to desktop.
  - The FAQ uses native `<details>`/`<summary>`, so it is keyboard-accessible with no JS, and its content is in the HTML when collapsed.
  - Decorative elements are `aria-hidden`; the "Get Started" buttons have `sr-only` pack names.
- Responsive layout checked at 1440 px and at a true 390 px viewport. No horizontal overflow; `overflow-x: clip` on the page root.

**Not run:** Lighthouse/PageSpeed and CrUX. The Chrome extension couldn't reach localhost in this session, and the site isn't deployed with these changes. Run PageSpeed Insights on the deployed URL; given a static, image-free LCP (the H1 text), LCP and CLS should be strong. Treat that as an expectation to verify, not a measured result.

## 9. Analytics

**No analytics is configured** (no gtag, GA4, GTM, PostHog, Mixpanel, Meta Pixel or Clarity in the codebase). Nothing was added and no IDs were invented.

To make wiring easy later, every CTA carries a `data-cta` attribute. Recommended events and integration points:

| Event | Trigger / integration point | Ready hook |
| --- | --- | --- |
| `landing_view` | Page view on `/` | Analytics page-view |
| `cta_signup_click` | Click on `[data-cta^="signup"]` (values: `signup-nav`, `signup-hero`, `signup-problem`, `signup-metrics`, `signup-how`, `signup-final`, `signup-footer`) | `data-cta` |
| `cta_pricing_click` | `[data-cta^="pricing-"]` (`pricing-starter`, `pricing-growth`, `pricing-pro`, `pricing-agency`, `pricing-final`) | `data-cta` |
| `cta_explore_features` | `[data-cta="explore-features"]` | `data-cta` |
| `login_click` | `[data-cta="login"]` | `data-cta` |
| `signup_started` | First field interaction in `components/auth/SignupForm.tsx` | — |
| `signup_completed` | Successful code verification in `SignupForm.tsx` / `VerifyCodeStep.tsx` | — |
| `dashboard_entered` | First mount of `app/dashboard/layout.tsx` after `AuthGuard` resolves | — |
| `first_creator_search` | First `fetchCreators` dispatch in `components/discover/DiscoverView.tsx` (persist a flag per user) | — |
| `credit_purchase_completed` | Successful `verifyCreditPaymentAPI` in `components/credits/BuyCreditsModal.tsx` | — |

## 10. Remaining SEO opportunities and blockers

1. **Blocker: Privacy Policy and Terms pages.** They don't exist on discover.kudozz.in or kudozz.in. They're needed for trust, for payment-gateway compliance (Razorpay) and for collecting personal data under the DPDP Act 2023. Add them (legal-reviewed) and link them from the footer.
2. **Legal review of the "No. 1" claim** (see the content strategy doc) before publishing.
3. Deploy, then run the Rich Results Test, the Schema validator, PageSpeed Insights (mobile and desktop) and Search Console URL inspection. Submit the sitemap in Search Console.
4. Add `discover.kudozz.in` to Search Console and pull real query data after 4–6 weeks. Re-rank keywords (see the keyword research doc).
5. Programmatic city × niche pages with real aggregate data (the format that ranks for "{niche} influencers in {city}").
6. Free tools (engagement-rate calculator) and listings on Capterra.in, G2 and Product Hunt.
7. Link from kudozz.in's "Kudozz Discovery" section to `https://discover.kudozz.in/` with descriptive anchor text, for an entity and authority signal.
8. Once real, verifiable numbers are available (creators indexed, cities covered), add them to the definition block. Specific facts help both rankings and AI answers.
