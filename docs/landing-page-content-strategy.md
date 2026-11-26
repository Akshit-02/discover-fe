# Landing page content strategy — Kudozz Influencer Discovery

## Positioning

- **Brand:** Kudozz (Kudozz Studios Private Limited)
- **Product:** Kudozz Influencer Discovery. This name is used consistently on the page, in the metadata and in the JSON-LD.
- **Category:** an influencer discovery platform for Instagram creators.
- **Market:** India.
- **For:** D2C and ecommerce brands, marketing teams, influencer and social media agencies, and startups and small businesses.
- **Job it does:** the *research* step of a campaign — discover, evaluate and organise creators, then unlock available contacts. It does not do campaign management, payments to creators or reporting, and the page says so ("Strategy, briefs, negotiation and campaign management stay with you").
- **Differentiators vs competitors** (see the keyword research doc):
  - Public rupee pricing with no subscription, and purchased credits that never expire.
  - Self-serve with no demo.
  - State, city and language filters up front.
  - Transparent charging: missing contacts aren't charged, and re-opens are free.

The definition used in the "In short" block, the JSON-LD and the FAQ was written for AEO/GEO, so it can stand alone if quoted:

> Kudozz Influencer Discovery is an Instagram creator discovery platform for brands and agencies in India. It lets you search influencers by niche, follower range, location, language, gender and engagement, review each creator's performance metrics, save them to lists and unlock available contact details using credits.

## Claim integrity

### Flag for legal and marketing review before publishing

**H1: "India's No. 1 Influencer Discovery Tool"** (also used in the OG and Twitter title). This was used as instructed. It is an unsubstantiated superlative. ASCI's Code (Chapter I, truthful and honest representation) expects comparative and superlative claims to be backed by evidence. No ranking, award, market-share data or third-party recognition exists in the codebase or on kudozz.in. **None was invented, and the page contains nothing that implies one.** Options if it can't be substantiated:

- "India's Influencer Discovery Tool for Instagram"
- "The Influencer Discovery Tool Built for India"

The `<title>` deliberately leads with the factual "Influencer Discovery Tool in India" for this reason.

### Verified against the code (frontend and `influencer-discovery-be`)

| Claim on the page | Source of truth |
| --- | --- |
| Instagram only; YouTube not available | No other platform in the schema, filters or import; profiles link to `instagram.com` |
| Basic search (name, @username, follower range) is free | `DiscoverView` "Basic search and follower filters stay free"; backend charges only non-basic filter sets |
| Advanced filter set = 2 credits, re-run free for 24 h | backend `helper/credits.js` `COSTS.advancedFilter`, `FILTER_UNLOCK_HOURS` |
| Open profile 1 credit, re-open free | `COSTS.openProfile`; unlock rows make repeats free |
| Email 1 credit, phone **2** credits, not charged if unavailable | `COSTS.revealEmail/revealPhone`; "missing contacts are never charged" |
| 30 free credits valid 30 days; purchased credits never expire; free used first | `SIGNUP_CREDITS`, `SIGNUP_CREDIT_DAYS`, `splitCost` |
| Packs ₹249/50, ₹599/150, ₹1,399/400, ₹2,999/1,000 | backend `helper/payments.js` `CREDIT_PACKS` = frontend `creditPacks.ts` |
| Razorpay: UPI, cards, netbanking | `BuyCreditsModal` + Razorpay checkout |
| Filters: niche, state, city, language, gender, min ER, min avg views, min avg likes, posting frequency, has email, has phone | `AdvancedFiltersDrawer`, `creatorFilters.ts` |
| Follower bands <1K … 1M+, custom range | `FOLLOWER_BANDS` |
| Sort by followers (↑/↓), engagement, avg views, avg likes | `SORT_OPTIONS` |
| Filters in URL (shareable searches) | `filtersToQuery` / `queryToFilters` |
| Profile metrics: ER + quality label (Low <1%, Average 1–3%, Strong 3–6%, Exceptional ≥6%), followers, posts, avg views, avg likes, posting frequency, gender, languages, niches, location, verified badge | `CreatorDrawer`, `engagementQuality` |
| Tier labels Nano <10K, Micro 10K–100K, Mid 100K–500K, Macro 500K–1M, Mega 1M+ | `TIERS` in `format.ts` |
| "My lists": up to 100 lists × 50 creators, name and description, save from results or profile | `MAX_LISTS_PER_USER`, `MAX_CREATORS_PER_LIST`, `AddToListButton` usage |
| 14 categories (+ Other) | `NICHES` |
| No card needed to sign up | Cognito email + password sign-up; no payment step |

All numbers in the page are wired to constants (`lib/constants/credits.ts`, `creditPacks.ts`, `models/list.ts`), not typed into copy. `lib/constants/credits.ts` is new and mirrors the backend. `creditsSlice.DEFAULT_COSTS` now reads from it.

### Deliberately excluded (not verified or not true)

| Requested or suggested | Why excluded |
| --- | --- |
| "Phone reveal: 1.5 credits" (brief) | Actual cost is **2** credits (backend `COSTS.revealPhone`) |
| YouTube discovery, "YouTube creator database India" | Not supported. FAQ 8 says so plainly. |
| Following count, average comments as profile metrics | In the data model but **not shown** in the profile UI |
| Verified-only filter, country filter | Backend supports them, but the UI doesn't expose them |
| Audience demographics | Fields exist in the import CSV header but aren't surfaced anywhere |
| "Verified" contact details | No verification process exists; the copy says "on file" and "availability varies" |
| Creator / brand / campaign counts, database size | No verified figure available (the import CSV in the repo is header-only; the live DB wasn't queried) |
| Customer logos, testimonials, ratings, awards | None exist |
| Market statistics on the page | Kept off the homepage (see trends below); the strongest stat found (WPP Media/Kantar "83% of marketers struggle with influencer discovery") was only verified via a secondary news source |
| "Same search free for 24h" wording for all searches | Clarified to "same **filter set**" |
| Privacy Policy and Terms footer links | Pages don't exist |
| Framer Motion | Not installed; CSS motion used instead (performance) |

### Old landing page claims corrected

- "12 precision filters" became an itemised list. The count was ambiguous.
- "All 12 filters included" on every pack was removed.
- The fake email "aanya@studio.in" in the hero was removed; contacts are now shown masked.
- Every hero sample creator previously showed a verified badge. Now only one does, and the screen is captioned as sample data.
- The old H1 "Find creators your customers already trust" was replaced by the requested H1.

## Page structure and intent

| # | Section | Job | CTA |
| --- | --- | --- | --- |
| 1 | Sticky nav | Wayfinding; Login + Start Free | Start Free |
| 2 | Hero | What, for whom, why now; product UI as the visual | Start Discovering Creators / Explore Features |
| 3 | Value strip | Four benefits at a glance | — |
| 4 | "What is…" (AEO) | Quotable definition + 4 facts (platform, audience, pricing, free start) | — |
| 5 | Problem (dark) | Specific Indian examples of manual pain | Try it free |
| 6 | Search features | Basic (free) vs advanced (2 credits) clearly separated | — |
| 7 | Micro & nano | Why smaller creators can matter; explicitly "not automatically better" | — |
| 8 | Niche × location × language | 9 India search examples, labelled as examples | — |
| 9 | Metrics | Multi-signal evaluation; quality bands with "don't predict results" caveat | Compare creators free |
| 10 | Contacts | Honest unlock mechanics; DPDP Act and Instagram terms note | — |
| 11 | My lists | Organising research | — |
| 12 | How it works | Four steps | Create your free account |
| 13 | Who it's for | Five audiences; "doesn't replace your team" | — |
| 14 | Categories & platform | 14 niches; Instagram-only coverage | — |
| 15 | Pricing | What uses credits + 4 packs from config | Get Started ×4 |
| 16 | FAQ | 15 self-contained answers (42–60 words) | — |
| 17 | Final CTA | Restate the offer | Start Discovering Creators / Explore Pricing |
| 18 | Footer | Product, account and company links; legal name | — |

## Voice

- Plain, specific and Indian: Pune, Nagpur, Mysuru, Marathi and Tamil examples instead of generic "your city".
- Short paragraphs. Claims come with their qualifier ("where available", "not every creator").
- British/Indian spelling (organise, neighbourhood). INR formatted `₹1,399`.

## Industry trends (inform the messaging; not shown as stats on the page)

| Theme | Evidence | Source (date) | How it shaped the page |
| --- | --- | --- | --- |
| Discovery is the pain point | "Over 83% of marketers struggle with influencer discovery" | WPP Media (The Goat Agency) × Kantar, India Influencer Marketing Report 2025, 11 Jun 2025 — via [Medianews4u](https://www.medianews4u.com/indias-%e2%82%b93600-cr-influencer-marketing-industry-set-to-grow-25-in-2025-finds-wpp-kantar-report/) (secondary) | Problem section framing |
| Engagement and quality over reach | Engagement rate (39%) and content quality (36%) rated stronger indicators than reach | Same | Metrics section headline and copy |
| Long-term relationships | "72% of brands favor sustained collaborations" | Same | Lists ("revisit any time") |
| Micro and nano share | "52% of influencer spend is directed toward micro-influencers" (nano 1K–10K, micro 10K–100K); preliminary figures | [Kofluence 2025 report sneak peek](https://www.kofluence.com/2025-influencer-marketing-report-sneak-peek/), 27 Jun 2025 | Micro & nano section; tier definitions match |
| Instagram's weight; Tier 2/3 creators | "1.8 to 2.3 million Indian creators operate on Instagram"; most creators in Tier 2/3 cities | Same | Instagram-first positioning; Tier 2/3 copy |
| Regional language | Regional-language creators show higher campaign completion rates | Same (preliminary) | Language filter and examples |
| Creator economy scale | "over 2–2.5 million monetized content creators" | [BCG, From Content to Commerce](https://www.bcg.com/publications/2025/india-from-content-to-commerce-mapping-indias-creator-economy), 3 May 2025 | Context only |
| Disclosure | Label sponsored posts with #Ad, #Sponsored, #Collaboration etc.; not hidden in bio or buried in caption | [ASCI do's and don'ts](https://www.ascionline.in/social/dos-dont/) | FAQ 15 mentions ASCI disclosure |

Caveats:

- Medianews4u and Kofluence's sneak-peek figures are secondary or preliminary. Read the primary reports before quoting any of these on a public page.
- The 2022 GroupM INCA projection (₹2,800 cr for 2026) is outdated and was not used.

## Maintenance

- Changing a credit cost or pack: update the backend first, then `src/lib/constants/credits.ts` / `creditPacks.ts`. The page, FAQ and JSON-LD all update together.
- Adding a platform (e.g. YouTube): update FAQ 8, the "Platform coverage" card, the definition, the hero eyebrow, META and the keyword map.
