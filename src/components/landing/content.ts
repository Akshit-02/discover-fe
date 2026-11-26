/**
 * Landing-page copy that is also used in structured data (FAQ, product description).
 * Every product claim here was checked against the app and the backend (see docs/landing-page-content-strategy.md).
 * Keep credit numbers wired to the constants rather than typed into strings.
 */
import { APP_NAME } from "@/config/brand";
import { CREDIT_COSTS, FILTER_UNLOCK_HOURS, SIGNUP_CREDITS, SIGNUP_CREDIT_DAYS } from "@/lib/constants/credits";
import { MAX_CREATORS_PER_LIST, MAX_LISTS_PER_USER } from "@/lib/models/list";

export const SIGNUP_HREF = "/signup";
export const LOGIN_HREF = "/login";

export const PRODUCT_DEFINITION = `${APP_NAME} is an Instagram creator discovery platform for brands and agencies in India. It lets you search influencers by niche, follower range, location, language, gender and engagement, review each creator's performance metrics, save them to lists and unlock available contact details using credits.`;

export const META = {
  title: "Influencer Discovery Tool in India | Kudozz",
  description:
    "Find Instagram influencers in India by niche, followers, city, language and engagement. Evaluate creator metrics, build shortlists and unlock contacts with credits. Start free.",
  ogTitle: "India's No. 1 Influencer Discovery Tool | Kudozz",
  ogDescription:
    "Search Instagram creators by niche, followers, location, language and engagement. Shortlist the right fit and unlock contact details only when you need them.",
};

export const FAQS: { q: string; a: string }[] = [
  {
    q: "What is an influencer discovery tool?",
    a: "An influencer discovery tool is searchable software for finding creators who fit a campaign. Instead of scrolling hashtags and opening profiles one by one, you filter a creator database by criteria such as niche, audience size, location, language and engagement, compare the results side by side and shortlist the creators worth contacting.",
  },
  {
    q: "How can I find influencers for my brand in India?",
    a: "Start from the campaign: the product category, the cities or states you sell in and the language your customers use. Filter creators on those criteria, set a follower range that matches your budget, then compare engagement rate, average views and posting frequency. Open the strongest profiles, check their recent content on Instagram and shortlist the best fits before reaching out.",
  },
  {
    q: "How does Kudozz Influencer Discovery work?",
    a: `Create a free account and you get ${SIGNUP_CREDITS} credits. Search Instagram creators by name, @username or follower range for free, or add advanced filters such as niche, location, language, gender and engagement. Open a creator's profile to review their metrics, save them to a list and reveal an available email or phone number when you're ready to reach out.`,
  },
  {
    q: "Can I find Instagram influencers by follower count?",
    a: "Yes. Choose one or more follower bands — under 1K, 1K–3K, 3K–5K, 5K–10K, 10K–100K, 100K–1M and 1M+ — or enter your own minimum and maximum. Follower filtering is part of basic search, so it doesn't use credits. You can also sort results by most or fewest followers.",
  },
  {
    q: "Can I search for micro and nano influencers?",
    a: "Yes. Use the follower filter to focus on smaller accounts: the bands under 10K cover nano creators and 10K–100K covers micro creators, or set an exact range yourself. Combine it with niche, city and language filters, and an engagement floor, to find smaller creators whose communities match your audience.",
  },
  {
    q: "Can I find creators by city and language?",
    a: "Yes. The advanced filters include state, city and language, and you can select several of each. The options come from the locations and languages present in the creator database, so what you can choose reflects actual coverage. Combining location with language helps when a campaign targets a regional audience.",
  },
  {
    q: "Can I filter creators by engagement rate?",
    a: "Yes. Set a minimum engagement rate in the advanced filters and sort results by highest engagement. You can also set minimums for average views, average likes and monthly posting frequency. Each profile shows its engagement rate with a quality label — Low, Average, Strong or Exceptional — to help you compare creators quickly.",
  },
  {
    q: "Can I discover YouTube influencers?",
    a: "Not at the moment. Kudozz Influencer Discovery currently covers Instagram creators only, and every creator profile links to their Instagram account. If YouTube discovery matters to your campaigns, tell us through Help & support in the dashboard so we can prioritise it.",
  },
  {
    q: "Can I access influencer email addresses?",
    a: `Where an email address is on file for a creator, you can reveal it for ${CREDIT_COSTS.revealEmail} credit. Not every creator has one, so results show whether an email or phone number is available before you spend anything, and you can filter to creators with an email or phone. Please use contact details responsibly and in line with applicable privacy laws.`,
  },
  {
    q: "How do creator contact unlocks work?",
    a: `Revealing an email costs ${CREDIT_COSTS.revealEmail} credit and revealing a phone number costs ${CREDIT_COSTS.revealPhone} credits. If the contact isn't available, you aren't charged. Once you've revealed a contact, it stays unlocked on your account, so viewing it again is free. Free signup credits are always used before purchased ones.`,
  },
  {
    q: "What are credits in Kudozz Influencer Discovery?",
    a: `Credits pay for the actions that unlock data: ${CREDIT_COSTS.advancedFilter} credits for an advanced filter search (the same filter set is free to re-run for ${FILTER_UNLOCK_HOURS} hours), ${CREDIT_COSTS.openProfile} to open a creator profile, ${CREDIT_COSTS.revealEmail} for an email and ${CREDIT_COSTS.revealPhone} for a phone number. New accounts get ${SIGNUP_CREDITS} free credits valid for ${SIGNUP_CREDIT_DAYS} days. Purchased credits never expire.`,
  },
  {
    q: "Can I save influencers into different lists?",
    a: `Yes. In My lists you can create up to ${MAX_LISTS_PER_USER} lists, each with a name and description and up to ${MAX_CREATORS_PER_LIST} creators. Save a creator to a list straight from search results or their profile, organise lists by campaign, client or niche, and come back to them any time.`,
  },
  {
    q: "Is Kudozz suitable for small businesses?",
    a: `Yes. There's no subscription or annual contract. You start with ${SIGNUP_CREDITS} free credits and can buy a small credit pack when you need more, so a founder or small team can research creators for a single campaign without committing to an enterprise plan. Basic search is always free.`,
  },
  {
    q: "Is Kudozz suitable for influencer marketing agencies?",
    a: "Yes. Agencies can keep a separate list per client or campaign, share filtered searches with colleagues as links, and buy larger credit packs at a lower cost per credit. Kudozz handles the creator research; briefing, negotiation and campaign management stay with your team.",
  },
  {
    q: "How do I choose the right influencer for a campaign?",
    a: "Match the creator to the campaign objective first. Check that their niche and content style fit your product, that their audience location and language match your customers, and that engagement and average views are healthy for their size. Review recent posts directly, look at posting consistency and confirm they disclose paid partnerships as ASCI guidelines require.",
  },
];
