import type { BlogPost } from "./types";

export const influencerMarketingKpis: BlogPost = {
  slug: "influencer-marketing-kpis",
  category: "Measurement",
  title: "Influencer Marketing KPIs: 15 Metrics Every Brand Should Track",
  seoTitle: "Influencer Marketing KPIs: 15 Metrics Brands Should Track",
  excerpt:
    "A practical reference to 15 influencer campaign metrics, from reach and views to clicks, conversions and ROI: what each one measures, how to calculate it, when it helps and where it misleads.",
  metaDescription:
    "Influencer marketing KPIs explained: 15 campaign metrics from reach and views to clicks, conversions and ROI, with formulas, KPIs by goal and a report template.",
  author: { name: "Kudozz Strategy Team", url: "https://www.kudozz.in/about" },
  publishedAt: "2026-11-27",
  readingTime: "16 min read",
  primaryKeyword: "influencer marketing KPIs",
  keywords: [
    "influencer marketing KPIs",
    "influencer campaign metrics",
    "influencer marketing measurement",
    "influencer engagement metrics",
    "influencer campaign performance",
    "track influencer marketing results",
  ],
  hero: {
    src: "/blog/influencer-marketing-kpis.svg",
    alt: "Fifteen influencer marketing KPIs grouped into four stages: visibility (reach, impressions, video views, average views), engagement (engagement rate, likes, comments, shares, saves), traffic (link clicks, click-through rate, website sessions) and business outcomes (conversions, cost per engagement, return on investment)",
    width: 1600,
    height: 700,
  },
  endCta: {
    headline: "Shortlist Creators on the Metrics That Fit Your Campaign",
    body: "Filter Instagram creators in India by niche, city, language, follower range, minimum engagement rate, minimum average views, minimum average likes and posting frequency, then save the right ones to a campaign list. You get 30 free credits on signup, no card required.",
    ctaLabel: "Start Discovering Creators",
  },
  body: [
    {
      type: "paragraph",
      text: "Most influencer reports we see from Indian brands fall into one of two traps. Either they list every number Instagram offers, with no view on which ones matter, or they report a single big figure (\"2.3 lakh views!\") that says nothing about whether the campaign worked. Influencer marketing KPIs should sit between those extremes: a short set of metrics, chosen before the campaign, that tell you whether you got what you paid for.",
    },
    {
      type: "paragraph",
      text: "This guide is a practical reference to 15 metrics, grouped from visibility to business outcomes. For each one you get what it measures, why it matters, how to calculate it where a formula applies, when it is useful and where it misleads. After that come an objective-to-KPI table, a reporting template and a fully worked hypothetical campaign so you can see the numbers fit together.",
    },
    { type: "heading", text: "Quick answer", id: "quick-answer" },
    {
      type: "paragraph",
      text: "The most useful influencer marketing KPIs fall into four groups: visibility (reach, impressions, video views, average views), engagement (engagement rate, likes, comments, shares, saves), traffic (link clicks, click-through rate, website sessions) and outcomes (conversions, cost per engagement, ROI). Pick one or two primary KPIs that match the campaign objective, add a few secondary ones for context, agree how each will be measured before posting, and collect Insights screenshots from creators plus your own analytics data.",
    },
    { type: "heading", text: "Where influencer metrics actually come from", id: "metric-sources" },
    {
      type: "paragraph",
      text: "Before choosing KPIs, know who owns each number. Visibility and engagement data lives in the creator's account, so you only see it if the creator shares it. Traffic and conversion data lives in your website analytics, store dashboard or app. Cost data lives in your own finance sheet. A report that mixes these without saying where each number came from is hard to trust.",
    },
    {
      type: "table",
      headers: ["Metric type", "Source", "How you get it"],
      rows: [
        ["Reach, views, saves, shares", "Creator's Instagram Insights", "Screenshots or a screen recording from the creator, usually 7 days after posting"],
        ["Likes, comments", "Public counts on the post", "Visible to anyone, though some creators hide like counts"],
        ["Link clicks", "Story link insights, link shortener, your analytics", "Creator screenshots plus your own click tracking"],
        ["Sessions, conversions, revenue", "Google Analytics, Shopify or your store backend", "UTM-tagged links and creator-specific discount codes"],
        ["Cost", "Your own records", "Creator fees, product cost, shipping, agency or tool costs"],
      ],
    },
    {
      type: "paragraph",
      text: "Platform definitions also change, which matters when you compare campaigns over time. Instagram's About Instagram insights page now defines views as the number of times content was played or displayed, viewers as the number of unique accounts that saw it on screen at least once, and interactions as actions such as likes, comments, saves and shares. Meta's developer blog post of 21 January 2025 says Instagram introduced views as the primary consumption metric in August 2024, and that older impressions and plays metrics would be deprecated in its API on 21 April 2025. So an \"impressions\" number in a 2023 report and a \"views\" number today are not quite the same thing.",
      links: [
        { text: "About Instagram insights", href: "https://www.facebook.com/help/instagram/788388387972460" },
        { text: "developer blog post of 21 January 2025", href: "https://developers.facebook.com/blog/post/2025/01/21/making-it-easier-to-build-integrations-across-the-instagram-api-and-marketing-api/" },
      ],
    },
    { type: "heading", text: "15 influencer marketing KPIs every brand should know", id: "fifteen-kpis" },
    {
      type: "paragraph",
      text: "Each metric below follows the same pattern so you can scan it quickly. Formulas use simple totals; agree the exact definition with your team before the campaign, because two people can calculate \"engagement rate\" three different ways.",
    },
    { type: "subheading", text: "1. Reach" },
    {
      type: "list",
      items: [
        "What it measures: unique accounts that saw the content at least once. Instagram's help page currently calls this \"viewers\".",
        "Why track it: it is the closest thing to \"how many people heard about us\".",
        "How to get it: from each creator's Insights. Adding reach across creators overstates it, because one person may follow several of them.",
        "Useful for: awareness campaigns, new-city launches, reaching people who have never seen the brand.",
        "Limitation: estimated by the platform, only visible to the creator, and says nothing about attention or recall.",
      ],
    },
    { type: "subheading", text: "2. Impressions" },
    {
      type: "list",
      items: [
        "What it measures: total times content was shown, including repeat viewings by the same person.",
        "Why track it: shows frequency. Impressions well above reach mean people saw the content more than once.",
        "How to calculate frequency: impressions ÷ reach.",
        "Useful for: comparing with older reports and with paid media plans that still use the term.",
        "Limitation: on Instagram, views have replaced impressions in Insights, so for new posts use views instead and label old and new numbers clearly.",
      ],
    },
    { type: "subheading", text: "3. Video views" },
    {
      type: "list",
      items: [
        "What it measures: how many times a Reel, Story or video was played or displayed.",
        "Why track it: it is now Instagram's headline consumption number across formats.",
        "How to get it: per post from the creator's Insights; total across all campaign posts.",
        "Useful for: video-led launches, product demos, comparing formats (Reels vs Stories).",
        "Limitation: a view is counted quickly and includes replays, so it shows exposure, not attention. Platforms count differently too: YouTube changed how Shorts views are counted from 31 March 2025, so cross-platform totals are rough at best.",
      ],
    },
    {
      type: "paragraph",
      text: "That YouTube change is documented on YouTube's Shorts views help page. If you report Instagram and YouTube together, keep them in separate columns rather than adding them up.",
      links: [{ text: "Shorts views help page", href: "https://support.google.com/youtube/answer/10059070" }],
    },
    { type: "subheading", text: "4. Average views" },
    {
      type: "list",
      items: [
        "What it measures: typical views per post, either for a creator's recent content (before the campaign) or for your campaign posts (after).",
        "How to calculate: total views ÷ number of posts.",
        "Why track it: it is a better predictor of a creator's real distribution than follower count, and lets you check whether the sponsored post performed like their normal content.",
        "Useful for: shortlisting creators and setting realistic view expectations in the brief.",
        "Limitation: one viral Reel can pull the average up. Look at the spread of the last 10 to 15 posts, not just the average.",
      ],
    },
    { type: "subheading", text: "5. Engagement rate" },
    {
      type: "list",
      items: [
        "What it measures: how much of the audience interacted with the content.",
        "How to calculate: by reach, (likes + comments + shares + saves) ÷ reach × 100. Variants divide by followers or by views instead.",
        "Why track it: it shows whether content held attention enough to provoke a response.",
        "Useful for: comparing creators of different sizes and judging creative quality within one campaign.",
        "Limitation: there is no single standard formula, and tools calculate it differently. State the formula in every report. A high rate built on emoji comments or giveaway entries means little.",
      ],
    },
    {
      type: "paragraph",
      text: "For a deeper walk-through of the formulas with worked examples, see how to calculate influencer engagement rate on the Kudozz blog.",
      links: [{ text: "how to calculate influencer engagement rate", href: "https://www.kudozz.in/blog/influencer-engagement-rate" }],
    },
    { type: "subheading", text: "6. Likes" },
    {
      type: "list",
      items: [
        "What it measures: one-tap approval.",
        "Why track it: quick, public signal of how the content landed, available even without creator screenshots.",
        "Useful for: spotting creative that fell flat compared with the creator's usual posts.",
        "Limitation: the lowest-effort interaction, easy to inflate and sometimes hidden. Rarely worth a primary KPI.",
      ],
    },
    { type: "subheading", text: "7. Comments" },
    {
      type: "list",
      items: [
        "What it measures: replies on the post.",
        "Why track it: comments show questions, objections and purchase intent in the audience's own words: \"price?\", \"available in Chennai?\", \"does it suit oily skin?\".",
        "How to use it: count them, then read them. Tag a sample as product questions, purchase intent, praise, complaints or irrelevant.",
        "Useful for: consideration campaigns and for feeding FAQs back to your product and support teams.",
        "Limitation: counts include tag-a-friend spam, giveaway entries and the creator's own replies.",
      ],
    },
    { type: "subheading", text: "8. Shares" },
    {
      type: "list",
      items: [
        "What it measures: how often people sent the post to someone else or reposted it.",
        "Why track it: a share is a personal recommendation and extends reach beyond the creator's followers.",
        "Useful for: awareness and word-of-mouth campaigns, relatable or funny content, gifting ideas.",
        "Limitation: only visible in the creator's Insights, and most sharing happens in DMs you cannot read.",
      ],
    },
    { type: "subheading", text: "9. Saves" },
    {
      type: "list",
      items: [
        "What it measures: how often people bookmarked the post to come back to it.",
        "Why track it: saves suggest the content was useful: a recipe, a skincare routine, a gadget comparison, a travel itinerary.",
        "Useful for: tutorials, reviews and considered purchases where people decide later.",
        "Limitation: Insights-only, and a save is intent, not action.",
      ],
    },
    { type: "subheading", text: "10. Link clicks" },
    {
      type: "list",
      items: [
        "What it measures: taps on the link you gave the creator, such as a Story link sticker or a link in bio.",
        "Why track it: the first step from attention to action.",
        "How to get it: creator screenshots where Instagram reports link taps, plus your own count through a link shortener or analytics. Give every creator a unique link.",
        "Useful for: traffic, app installs, lead generation and sale campaigns.",
        "Limitation: clicks and arrivals on your site rarely match, because of accidental taps, slow pages and tracking loss. Reels without a link will show few or none.",
      ],
    },
    { type: "subheading", text: "11. Click-through rate (CTR)" },
    {
      type: "list",
      items: [
        "What it measures: the share of people who saw the link and tapped it.",
        "How to calculate: link clicks ÷ views of the content carrying the link × 100 (use reach instead if that is what you agree).",
        "Why track it: shows whether the message and offer were persuasive enough to act on, independent of creator size.",
        "Useful for: comparing creators and creative versions within the same campaign.",
        "Limitation: only meaningful on content that carries a link. Do not divide clicks by total campaign views that include Reels with no link.",
      ],
    },
    { type: "subheading", text: "12. Website sessions" },
    {
      type: "list",
      items: [
        "What it measures: visits to your site that analytics attributes to each creator.",
        "How to get it: UTM-tagged links per creator. Google Analytics' URL builder guidance says to always use utm_source, utm_medium and utm_campaign; utm_content is handy for separating creators or formats.",
        "Why track it: sessions confirm that people actually arrived, and let you see what they did next (pages viewed, add to cart).",
        "Useful for: traffic and sales campaigns, and spotting landing-page problems when clicks are high but sessions are low.",
        "Limitation: people who see a Reel and later search for your brand will not carry the UTM, so sessions undercount influence.",
      ],
    },
    {
      type: "paragraph",
      text: "See Google's URL builder help page for the parameter definitions, and our guide to tracking influencer conversions using UTM parameters for naming conventions that keep creator data clean.",
      links: [
        { text: "URL builder help page", href: "https://support.google.com/analytics/answer/10917952" },
        { text: "tracking influencer conversions using UTM parameters", href: "https://www.kudozz.in/blog/influencer-utm-tracking" },
      ],
    },
    { type: "subheading", text: "13. Conversions" },
    {
      type: "list",
      items: [
        "What it measures: the action you actually want: orders, sign-ups, app installs, leads, store visits booked.",
        "How to get it: tracked links, creator-specific discount codes, or both. Conversion rate = conversions ÷ sessions × 100.",
        "Why track it: it connects creator content to business results.",
        "Useful for: sales, performance and lead-generation campaigns.",
        "Limitation: codes leak to coupon sites, and many buyers convert days later on another device or in a marketplace. Treat tracked conversions as a floor, not the full effect.",
      ],
    },
    { type: "subheading", text: "14. Cost per engagement (CPE)" },
    {
      type: "list",
      items: [
        "What it measures: what each interaction cost you.",
        "How to calculate: total cost ÷ total interactions (likes + comments + shares + saves). Total cost should include fees, product, shipping and any agency or tool costs.",
        "Why track it: puts creators of different sizes and fees on one scale.",
        "Useful for: engagement and content campaigns, and comparing creators for the next round.",
        "Limitation: cheap engagement is not automatically good engagement. Pair it with comment quality. The same logic gives cost per view, cost per click and cost per acquisition, which suit other objectives better.",
      ],
    },
    { type: "subheading", text: "15. Return on investment (ROI)" },
    {
      type: "list",
      items: [
        "What it measures: what the campaign returned relative to what it cost.",
        "How to calculate (simple version): (attributed revenue − total cost) ÷ total cost × 100. Using gross profit instead of revenue gives a stricter, more honest figure.",
        "Why track it: it is the number leadership asks about.",
        "Useful for: sales-led campaigns with reliable tracking.",
        "Limitation: tracked revenue misses delayed, offline and marketplace purchases and ignores the value of content you can reuse. A negative ROI on direct sales does not automatically mean an awareness campaign failed.",
      ],
    },
    {
      type: "paragraph",
      text: "ROI deserves more than a formula. Our guide to influencer marketing ROI covers attribution, margins, content value and how to present the number honestly.",
      links: [{ text: "guide to influencer marketing ROI", href: "/blog/influencer-marketing-roi" }],
    },
    { type: "heading", text: "Why different objectives need different KPIs", id: "kpis-by-objective" },
    {
      type: "paragraph",
      text: "A campaign judged on everything is judged on nothing. If the goal was awareness in Tier 2 cities, a low click-through rate is not a failure; if the goal was sales, a big view count is not a success. Write the objective and its primary KPI into the brief before you contact creators. Our influencer marketing brief template has a section for exactly this.",
      links: [{ text: "influencer marketing brief template", href: "/blog/influencer-marketing-brief-template" }],
    },
    {
      type: "table",
      headers: ["Objective", "Primary KPIs", "Secondary KPIs", "Less relevant"],
      rows: [
        ["Awareness (new brand, new city)", "Reach, video views", "Average views, shares, comments on brand recall", "Conversions, ROI"],
        ["Consideration and education", "Saves, comments (read for questions)", "Engagement rate, average views", "Likes alone"],
        ["Engagement and community", "Engagement rate, comments, shares", "Cost per engagement, saves", "Link clicks"],
        ["Website traffic", "Link clicks, website sessions", "CTR, landing-page behaviour", "Likes"],
        ["Sales or app installs", "Conversions, ROI", "Sessions, conversion rate, cost per acquisition", "Reach on its own"],
        ["Product launch", "Reach, video views, website sessions", "Comments, saves, early conversions", "Long-term ROI in week one"],
        ["Content for reuse", "Content delivered on time, saves, shares", "Engagement rate, performance when reused in ads", "Direct conversions"],
      ],
    },
    {
      type: "paragraph",
      text: "Choose one or two primary KPIs, set a target for each that is based on your own past campaigns or the creators' recent averages, and report secondary metrics as context rather than as pass or fail.",
    },
    { type: "heading", text: "Which metrics help before the campaign, and which only after", id: "before-vs-after" },
    {
      type: "paragraph",
      text: "Some of these metrics are useful twice. Before a campaign, a creator's average views, average likes, engagement rate and posting frequency help you shortlist people whose content actually gets seen. After the campaign, the same metrics on the sponsored posts tell you whether the collaboration performed like their usual work. Follower count on its own tells you little; how to choose influencers by follower count explains when tier matters.",
      links: [{ text: "how to choose influencers by follower count", href: "/blog/how-to-choose-influencers-by-follower-count" }],
    },
    {
      type: "paragraph",
      text: "To be clear about where Kudozz Influencer Discovery fits: it covers the before part only, for Instagram creators in India. You can sort and filter creators by followers, engagement rate, average views and average likes, filter by posting frequency per month, niche, city and language, and open a profile to see those averages alongside followers, total posts and collaboration types. It does not track campaign posts, links or conversions and has no reporting dashboard, so the during-and-after metrics in this guide come from creator Insights and your own analytics.",
    },
    {
      type: "cta",
      headline: "Shortlist creators on views and engagement, not followers alone",
      body: "Kudozz Influencer Discovery lets you filter Instagram creators in India by minimum engagement rate, minimum average views, minimum average likes and posting frequency, alongside niche, city and language, then save your picks to a named list.",
      ctaLabel: "Find creators",
    },
    { type: "heading", text: "A sample influencer campaign report template", id: "reporting-template" },
    {
      type: "paragraph",
      text: "Keep one row per creator per post, plus a total row. Write the source next to each metric and the date you captured it, because Instagram numbers keep growing for days after posting. Seven days after go-live is a common capture point; whatever you choose, use it for every creator.",
    },
    {
      type: "table",
      headers: ["Column", "What to enter", "Source"],
      rows: [
        ["Creator, handle, format", "Name, @handle, Reel / Story / carousel", "Your plan"],
        ["Go-live date and capture date", "When it posted, when you recorded numbers", "Your tracker"],
        ["Reach (viewers) and views", "From Insights", "Creator screenshots"],
        ["Likes, comments, shares, saves", "Per post", "Insights and public counts"],
        ["Engagement rate", "Using the formula agreed in the brief", "Calculated"],
        ["Link clicks and CTR", "Story links or bio links only", "Insights, link shortener"],
        ["Sessions and conversions", "Per creator UTM or code", "Google Analytics, store backend"],
        ["Cost", "Fee + product + shipping + other", "Finance"],
        ["CPE, cost per click, cost per conversion", "Cost ÷ the relevant total", "Calculated"],
        ["Notes", "Comment themes, disclosure check, issues", "Your review"],
      ],
    },
    {
      type: "template",
      label: "Influencer campaign report (copy into a sheet)",
      text: "CAMPAIGN: ____________  OBJECTIVE: ____________  PRIMARY KPI(S): ____________\nREPORTING WINDOW: go-live + ___ days   ENGAGEMENT RATE FORMULA: interactions ÷ reach × 100\n\nCreator | Handle | Format | Go-live | Capture date | Reach | Views | Likes | Comments | Shares | Saves | Engagement rate | Link clicks | CTR | Sessions (UTM) | Conversions | Revenue | Total cost | CPE | Cost per conversion | Disclosure label used? | Notes\n\nTOTAL / AVERAGE row (note: summed reach overstates unique people)\n\nSUMMARY\n1. Did we hit the primary KPI? Target vs actual:\n2. Best-performing creator and why:\n3. Weakest creator and why:\n4. What the comments told us:\n5. What we will change next time:",
    },
    { type: "heading", text: "Worked example: a hypothetical campaign, metric by metric", id: "worked-example" },
    {
      type: "paragraph",
      text: "The numbers below are entirely hypothetical and illustrative, not a real campaign or a benchmark. Imagine a Pune-based D2C coffee brand that works with six Instagram food and lifestyle creators. Each posts one Reel and two Stories with a link sticker. Total cost is ₹1,80,000 including fees, product and shipping. The primary KPI is website sessions; conversions are secondary.",
    },
    {
      type: "table",
      headers: ["Metric", "Hypothetical result", "How it was worked out"],
      rows: [
        ["Reach (summed across creators)", "4,20,000", "Insights screenshots; overstates unique people"],
        ["Views", "6,10,000", "4,70,000 on Reels + 1,40,000 on Stories"],
        ["Average Reel views", "78,333", "4,70,000 ÷ 6 Reels"],
        ["Likes / comments / shares / saves", "24,500 / 1,350 / 2,100 / 3,050", "Insights and public counts"],
        ["Total interactions", "31,000", "Sum of the four above"],
        ["Engagement rate (by reach)", "7.4%", "31,000 ÷ 4,20,000 × 100"],
        ["Link clicks", "5,600", "Story link taps"],
        ["CTR", "4.0%", "5,600 ÷ 1,40,000 Story views × 100"],
        ["Website sessions", "4,900", "Google Analytics, per-creator UTMs"],
        ["Conversions (orders)", "196", "Conversion rate 4.0% of sessions"],
        ["Attributed revenue", "₹1,17,600", "196 orders × ₹600 average order"],
        ["Cost per engagement", "₹5.81", "₹1,80,000 ÷ 31,000"],
        ["Cost per order", "₹918", "₹1,80,000 ÷ 196"],
        ["ROI on tracked revenue", "−34.7%", "(₹1,17,600 − ₹1,80,000) ÷ ₹1,80,000 × 100"],
      ],
    },
    {
      type: "paragraph",
      text: "How to read it: the campaign hit its primary goal of sending traffic, and the gap of 700 between clicks and sessions is normal tracking loss worth checking against page speed. Direct ROI is negative, which is common for a first campaign judged only on tracked orders within a short window. Before calling it a loss, the brand would look at repeat purchases from those 196 customers, sales of the same SKUs on marketplaces during the campaign, and whether the six Reels can be reused as ads. Breaking the table down per creator would show who drove sessions cheaply and deserves a second brief.",
    },
    { type: "heading", text: "How to track influencer marketing results without losing data", id: "tracking-setup" },
    {
      type: "list",
      ordered: true,
      items: [
        "Agree the objective, primary KPI, engagement rate formula and capture date in the brief.",
        "Ask creators in the contract for Insights screenshots (reach, views, interactions, link taps) at the agreed capture date, and for audience screenshots when you shortlist.",
        "Create a unique UTM link and, if you sell online, a unique discount code for each creator.",
        "Check that each link works on mobile and lands on the right page before go-live.",
        "Record every post's live date and URL the day it goes up.",
        "Pull analytics and order data for the same window and enter everything in one sheet.",
        "Read the comments, not just the counts, and write down the themes.",
        "Compare against your own previous campaigns rather than numbers from other brands.",
      ],
    },
    {
      type: "paragraph",
      text: "If you want a broader look at the measurement debate, including metrics beyond likes and views, our earlier article on the metrics every brand should track goes into the strategic side. For the full operational run-through from brief to final report, the influencer marketing campaign checklist covers each step.",
      links: [
        { text: "metrics every brand should track", href: "https://www.kudozz.in/blog/influencer-marketing-kpis" },
        { text: "influencer marketing campaign checklist", href: "/blog/influencer-marketing-campaign-checklist" },
      ],
    },
    { type: "heading", text: "Common mistakes when measuring influencer campaigns", id: "common-mistakes" },
    {
      type: "list",
      items: [
        "Choosing KPIs after the campaign, based on whichever number looks best.",
        "Adding reach across creators and reporting it as unique people reached.",
        "Comparing an old \"impressions\" figure with a new \"views\" figure as if they were the same metric.",
        "Using different engagement rate formulas for different creators in the same report.",
        "Calculating CTR on all views, including Reels that never carried a link.",
        "Giving several creators the same link or code, so you cannot tell who drove results.",
        "Collecting screenshots at different times after posting for different creators.",
        "Judging an awareness campaign on direct ROI, or a sales campaign on views.",
        "Treating published industry averages as targets instead of building your own baseline.",
      ],
    },
    { type: "heading", text: "Final thoughts", id: "conclusion" },
    {
      type: "paragraph",
      text: "You do not need all 15 metrics in every report. You need the one or two that match the objective, a handful of supporting numbers, consistent definitions and a clear note of where each figure came from. Do that for three or four campaigns and you will have something far more useful than any outside benchmark: your own baseline. Good measurement also starts earlier than most teams think, with creators whose recent views and engagement suit the goal. To build that shortlist for Instagram creators in India, Kudozz Influencer Discovery lets you filter by average views, engagement rate and posting frequency as well as niche and location.",
      links: [{ text: "Kudozz Influencer Discovery", href: "/signup" }],
    },
  ],
  faqs: [
    {
      question: "What are the most important influencer marketing KPIs?",
      answer:
        "It depends on the objective. For awareness, reach and views matter most. For consideration, saves and the content of comments. For traffic, link clicks and website sessions. For sales, conversions and ROI. Pick one or two primary KPIs per campaign and treat the rest as context.",
    },
    {
      question: "What is the difference between reach, impressions and views on Instagram?",
      answer:
        "Reach counts unique accounts that saw content; Instagram's help page now calls them viewers. Impressions counted total showings, including repeats. Instagram has since made views, the number of times content was played or displayed, its primary consumption metric, so for recent posts you will work with views and viewers rather than impressions.",
    },
    {
      question: "How do I get campaign metrics like reach and saves if they are only in the creator's account?",
      answer:
        "Ask for them in the contract. Specify which metrics you need, the format (screenshots or a screen recording of Insights) and the capture date, such as seven days after posting. Paying the final instalment after the report arrives keeps it from being forgotten.",
    },
    {
      question: "Which engagement rate formula should I use?",
      answer:
        "Any reasonable one, as long as you use the same formula for every creator and state it in the report. Interactions divided by reach is a good choice for campaign posts because it reflects people who actually saw the content; interactions divided by followers is easier to calculate from public data when shortlisting.",
    },
    {
      question: "How long after a post should I collect influencer metrics?",
      answer:
        "Pick a fixed window and apply it to everyone. Many brands capture numbers seven days after posting, and ask for Story insights promptly because Stories disappear from the profile after 24 hours. Reels can keep gaining views after the first week, so note the capture date beside every figure.",
    },
    {
      question: "Can Kudozz Influencer Discovery track my campaign results?",
      answer:
        "No. It helps you find and shortlist Instagram creators in India using pre-campaign metrics such as followers, average views, average likes, engagement rate and posting frequency. Campaign tracking and reporting need creator Insights, UTM links, discount codes and your own analytics.",
    },
    {
      question: "Should I compare my results with industry benchmarks?",
      answer:
        "Use them cautiously, if at all. Published averages mix platforms, categories, creator sizes and formulas, so they rarely match your situation. Your own previous campaigns and each creator's recent averages are better yardsticks.",
    },
  ],
  related: [
    "influencer-marketing-roi",
    "influencer-marketing-brief-template",
    "influencer-marketing-campaign-checklist",
    "how-to-choose-influencers-by-follower-count",
  ],
};
