# Landing page keyword research — Kudozz Influencer Discovery

Market: India (English-language search). Research date: 26 Nov 2026.

## Data availability (read first)

- **No search volume, keyword difficulty or CPC figures are included.** The connected OpenSEO account had 9 credits remaining (not enough for a metrics pull), and no Google Keyword Planner, Search Console, Ahrefs or Semrush access was configured for `discover.kudozz.in`. Nothing below is an estimate dressed up as data.
- Priorities are therefore **qualitative**, based on intent, fit with verified product functionality, and SERP observation (live web searches on 26 Nov 2026, page types and recurring domains only).
- **Next step:** pull India volumes/KD for the keyword list in this file from Keyword Planner or Search Console once the site has been indexed for 4–6 weeks, and re-rank.

## Product facts that constrain keyword choice

Verified in the frontend and the backend (`influencer-discovery-be`):

| Fact | Consequence for keywords |
| --- | --- |
| Instagram is the only platform covered | Do **not** target "YouTube influencer search tool", "YouTube creator database India". Mentioned only to say it's not supported. |
| Filters: name/@username, follower bands/custom range (free); niche, state, city, language, gender, min ER, min avg views, min avg likes, posting frequency, has email, has phone (advanced, 2 credits per filter set) | "find influencers by location / language / engagement rate / followers / niche" are all legitimately targetable. |
| Backend supports `verifiedOnly` and `countries`, but the UI doesn't expose them | Don't target "search verified influencers" or country filtering. |
| Profiles show ER + quality label, followers, posts, avg views, avg likes, posting frequency, gender, languages, niches, location, verified badge | "influencer analytics tool" is targetable in a light sense. Following count and avg comments are **not** shown — not claimed. No audience demographics in the UI — "influencer audience demographics" is not targeted. |
| Email/phone reveal (1 / 2 credits), not charged if unavailable | "influencer database with contact details" is targetable, with honest qualifiers. |
| Credit packs ₹249–₹2,999, no subscription, 30 free credits for 30 days | "affordable influencer discovery platform" is targetable. |

## Keyword clusters, intent and priority

Intent key: **C** commercial investigation, **T** transactional, **I** informational, **N** navigational.

### Cluster 1 — Core category (homepage head terms)

| Keyword | Intent | Product fit | Priority | Where |
| --- | --- | --- | --- | --- |
| influencer discovery tool | C | Exact | **Primary** | Title, H1, intro, FAQ 1 |
| influencer discovery tool India | C | Exact | **Primary** | Title ("…Tool in India"), H1 ("India's No. 1 …") |
| influencer discovery platform | C | Exact | **Primary** | Definition block, features intro |
| influencer search tool / platform | C | Exact | Primary | Features H2 intro ("influencer search tool") |
| creator discovery platform / tool | C | Exact | Secondary | Definition ("creator discovery platform") |
| influencer database India | C | Good (Instagram, India) | Secondary | Description, footer description |
| influencer marketing platform | C | Partial — Kudozz covers research, not campaign management | Low (avoid as headline) | Not targeted directly; would set wrong expectations |

SERP observation: "influencer discovery tool India" returns directories and listicles (Capterra.in, Product Hunt, roundup blogs) plus vendor pages. A homepage can rank, but listing on Capterra/G2 and roundups is likely to drive as much visibility as on-page work.

### Cluster 2 — "Find influencers" task queries

| Keyword | Intent | Fit | Priority | Where |
| --- | --- | --- | --- | --- |
| find influencers / find Instagram influencers | C/I | Exact | Secondary | Meta description, FAQ 2 |
| how to find influencers for my brand (India) | I | Exact | Secondary | FAQ 2 |
| Instagram influencer search tool | C | Exact | Secondary | Hero eyebrow + copy |
| search Instagram influencers by followers | C | Exact | Long-tail | FAQ 4, basic search card |
| find influencers by engagement rate | C | Exact | Long-tail | FAQ 7, advanced filters |
| find influencers by location / city and language | C | Exact | Long-tail | Section "Find Influencers by Niche, Location and Language", FAQ 6 |
| find influencers by niche | C | Exact | Long-tail | Same section, categories section |
| find regional influencers in India | C | Good | Long-tail | Micro & nano section |
| influencer finder | C | Exact | Semantic | Not forced into copy |

SERP observation: "find micro influencers India" and "{niche} influencers in {city}" are dominated by **programmatic city × niche pages** (modash.io/find-influencers/india/…, qoruz.com/find-influencers/…, heepsy.com/top-instagram/…, socialveins.com). A homepage will not win these. See "Content opportunities".

### Cluster 3 — Creator tiers

| Keyword | Intent | Fit | Priority | Where |
| --- | --- | --- | --- | --- |
| find micro influencers in India | C | Exact | Long-tail | H2 "Find Micro and Nano Influencers Across India", FAQ 5 |
| find nano influencers in India | C | Exact | Long-tail | Same |
| micro / nano influencer marketing | I | Topical | Semantic | Micro & nano section body |

### Cluster 4 — Evaluation / analytics

| Keyword | Intent | Fit | Priority | Where |
| --- | --- | --- | --- | --- |
| influencer analytics tool | C | Partial (profile metrics, not audience analytics) | Secondary | Metrics section eyebrow "Creator analytics" |
| influencer research tool / platform | C | Exact | Secondary | Metrics section, definition |
| influencer engagement rate | I | Exact | Semantic | Engagement bands, FAQ 7 |
| creator performance analysis | I | Partial | Semantic | Metrics intro |
| influencer audience demographics | I | **Not supported in UI** | Excluded | — |

### Cluster 5 — Contacts and outreach

| Keyword | Intent | Fit | Priority | Where |
| --- | --- | --- | --- | --- |
| influencer database with contact details | C | Good, with qualifiers | Long-tail | Contacts H2, FAQ 9–10 |
| influencer email / contact finder | C | Good | Semantic | Contacts section |
| influencer outreach | I | Adjacent | Semantic | "Simplify Outreach" in H2 |

### Cluster 6 — Buyer type / pricing

| Keyword | Intent | Fit | Priority | Where |
| --- | --- | --- | --- | --- |
| influencer discovery software for brands | C | Exact | Long-tail | Audiences section |
| influencer discovery tool for agencies | C | Exact | Long-tail | Audiences section, FAQ 14 |
| affordable influencer discovery platform | C/T | Exact (₹ packs, no subscription) | Long-tail | Pricing section, FAQ 13 |
| Instagram creator database India | C | Exact | Long-tail | Definition/description |
| YouTube creator database India / YouTube influencer search tool | C | **Not supported** | Excluded | FAQ 8 says it's not available |

### Cluster 7 — Topical (supporting, not targeted on the homepage)

creator economy India, UGC creators India, influencer marketing ROI, influencer campaign research, regional influencer marketing. These belong in blog/guide content, not the product homepage.

## Homepage keyword map (implemented)

| Section (heading) | Primary | Secondary / semantic |
| --- | --- | --- |
| `<title>` "Influencer Discovery Tool in India \| Kudozz" | influencer discovery tool India | Kudozz |
| H1 "India's No. 1 Influencer Discovery Tool" | influencer discovery tool | India |
| Hero copy | Instagram creators, influencer search | niche, followers, city, language, engagement, shortlist |
| Value strip | creator discovery | creator filters, performance insights, shortlists |
| H2 "What is Kudozz Influencer Discovery?" | creator discovery platform | brands and agencies in India, Instagram |
| H2 "Finding the Right Influencers Shouldn't Take Hours of Manual Research" | manual influencer research | hashtags, spreadsheets, engagement |
| H2 "Discover Influencers That Match Your Brand" (#features) | influencer search tool | influencer discovery platform, filters |
| H2 "Find Micro and Nano Influencers Across India" | micro influencers India, nano influencers India | regional, Tier 2/3, local language |
| H2 "Find Influencers by Niche, Location and Language" | find influencers by location / niche / language | city, state, Marathi, Tamil, Gujarati |
| H2 "Go Beyond Follower Counts. Evaluate the Right Creator Metrics." | influencer analytics / research tool | engagement rate, avg views, posting frequency |
| H2 "Find Creator Contact Details and Simplify Outreach" | influencer contact details | email, phone, outreach |
| H2 "Organise Your Influencer Research with Creator Lists" | influencer research | shortlist, My lists |
| H2 "How Kudozz Influencer Discovery Works" | how it works | brand name reinforcement |
| H2 "Built for Brands, Agencies and Growing Businesses" | influencer discovery for brands / agencies | D2C, ecommerce, startups |
| H2 "Discover Creators Across Different Categories" | creator categories | 14 niches, Instagram |
| H2 "Flexible Credits. Pay for the Creator Insights You Need." | influencer discovery pricing | affordable, credits, INR |
| H2 "Frequently Asked Questions About Influencer Discovery" | influencer discovery tool (FAQ 1) | long-tail questions |

## Competitor observations

Fetched 26 Nov 2026. Quotes are short and verbatim where marked.

| Competitor | H1 / positioning | Database claim | CTA / trial | Pricing | Notable SEO assets |
| --- | --- | --- | --- | --- | --- |
| [Qoruz](https://qoruz.com) | "Built for Advanced Influencer Marketing…" — all-in-one for advanced teams | "20+ filters", "25M+ assets" | Sign Up for Free + Book a Demo | Free tier; paid tiers demo-only | Programmatic `/find-influencers/…` India lists, free tools |
| [Kofluence](https://kofluence.com) | Agency-first ("Data-driven Performance!") | "750,000 creators" (also shows 500K — inconsistent) | Request Demo only | None public | Annual India report |
| [HypeAuditor](https://hypeauditor.com) | "Influencer Marketing Platform" | "227.4M+ … 35+ filters" | Sign Up / demo | No prices on pricing page | Many free tools, benchmark reports, FAQ |
| [Modash](https://modash.io) | "Manage and grow your influencer program" | "380M+ creators" | 14-day trial, no card | Public, USD ($199+/mo) | **Dominant** programmatic `/find-influencers/india/{city}/{niche}` pages |
| [Upfluence](https://upfluence.com) | "Influencer Marketing Platform" | "15+ million creators" | Demo booking | Custom | Blog, free tools |
| [Favikon](https://favikon.com) | AI campaign launch in "less than 10 minutes" | "10M+ profiles across 9 networks" | Free plan / trial | Public, EUR, monthly credits | Leaderboards, `/find-creators` pages |
| [Heepsy](https://heepsy.com) | "Find real influencers in seconds…" | "20M+ creators" | Free plan, no demo | From $69/mo | 23 free tools, "vs" pages, `/top-instagram/…/india` |
| [Fametown](https://fametown.in) | "Discover Instagram Influencers for Brands in 30 seconds." — closest direct rival (India, Instagram-only) | "20L+ … micro-influencers", "28 States", "448 niches" | Free account, 25 credits | Public, USD, daily credits | Free tools; little organic visibility yet |
| Influencer.in | Social Beat agency/marketplace | 40K–70K creators (third-party listings) | — | — | Homepage not retrieved |
| [Afluencer](https://afluencer.com) | US marketplace | "350M+ Influencers" | Free to start | — | Not India-focused |

**Gaps Kudozz can own (reflected in the page):**

1. **INR, public, pay-per-use pricing.** No competitor reviewed shows rupee prices; Indian rivals hide paid tiers behind demos; global tools charge monthly in USD/EUR. Kudozz shows ₹ packs, no subscription, purchased credits never expire.
2. **Self-serve with no demo.** "Start Discovering Creators" → signup → 30 free credits.
3. **Regional filters up front.** State, city and language filters are shown on the landing page with Indian examples, not hidden in the app.
4. **Honesty as positioning.** No inflated database counts, explicit "Instagram only", "not charged if unavailable", "not every creator has contact details".
5. **ASCI awareness.** None of the competitor homepages mention ASCI; the FAQ on choosing creators references ASCI disclosure.

## Content opportunities (beyond the homepage)

Ranked by likely impact, based on what ranks today:

1. **Programmatic city × niche pages** (e.g. "Food influencers in Bengaluru") — the format that dominates "find influencers in {city}" SERPs. Only build these with genuinely useful, non-thin data (aggregate counts, ER distribution, example search links) and only for combinations with real coverage, or they become an index-bloat liability.
2. **Free Instagram tools** — engagement-rate calculator, creator tier checker. Every major competitor uses these for links and traffic.
3. **Comparison / alternatives pages** — "Kudozz vs Fametown", "Qoruz alternatives". Must be factual.
4. **Guides** — "How to find micro influencers in India", "ASCI disclosure checklist for brands", "Regional-language influencer marketing".
5. **Directory listings** — Capterra.in, G2, Product Hunt (these rank for "influencer discovery tool India").

## Sources

- Competitor homepages and pricing pages listed in the table above (fetched 26 Nov 2026).
- Live search observations, 26 Nov 2026: "influencer discovery tool India", "influencer database India", "find micro influencers India", "instagram influencer search tool", "creator discovery platform", "top instagram influencers in Mumbai food".
- Product verification: `src/lib/utils/creatorFilters.ts`, `src/components/creators/CreatorDrawer.tsx`, backend `appsync/handlers/creators/helper/credits.js`, `helper/filters.js`, `helper/payments.js`, `appsync/handlers/lists/helper/lists.js`.
