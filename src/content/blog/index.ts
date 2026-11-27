import type { BlogPost } from "./types";
import { chooseInfluencersByFollowerCount } from "./how-to-choose-influencers-by-follower-count";
import { contactInfluencersForCollaboration } from "./how-to-contact-influencers-for-collaboration";
import { beautyInfluencersIndia } from "./how-to-find-beauty-influencers-in-india";
import { fashionInfluencersIndia } from "./how-to-find-fashion-influencers-in-india";
import { financeInfluencersIndia } from "./how-to-find-finance-influencers-in-india";
import { fitnessInfluencersIndia } from "./how-to-find-fitness-influencers-in-india";
import { foodInfluencersIndia } from "./how-to-find-food-influencers-in-india";
import { influencersForEcommerceBrands } from "./how-to-find-influencers-for-ecommerce-brands";
import { influencersForProductLaunch } from "./how-to-find-influencers-for-product-launch";
import { instagramInfluencersTargetAudience } from "./how-to-find-instagram-influencers-for-target-audience";
import { parentingInfluencersIndia } from "./how-to-find-parenting-influencers-in-india";
import { techInfluencersIndia } from "./how-to-find-tech-influencers-in-india";
import { travelInfluencersIndia } from "./how-to-find-travel-influencers-in-india";
import { youtubeInfluencersIndia } from "./how-to-find-youtube-influencers-in-india";
import { negotiateInfluencerRates } from "./how-to-negotiate-influencer-rates";
import { repurposeInfluencerContent } from "./how-to-repurpose-influencer-content";
import { influencerSeedingCampaign } from "./how-to-run-influencer-seeding-campaign";
import { influencerGiftingVsPaidCollaborations } from "./influencer-gifting-vs-paid-collaborations";
import { influencerBriefTemplate } from "./influencer-marketing-brief-template";
import { influencerCampaignChecklist } from "./influencer-marketing-campaign-checklist";
import { influencerMarketingKpis } from "./influencer-marketing-kpis";
import { influencerMarketingRoi } from "./influencer-marketing-roi";

export type { BlogPost, BlogBlock, BlogFaq, InlineLink, BlogCategory } from "./types";
export { BLOG_CATEGORIES } from "./types";

/**
 * Every published post. Newest first, then by title. To add a post, create its file in this folder and list it here;
 * the sitemap, blog index and related-post fallbacks pick it up automatically.
 */
export const blogPosts: BlogPost[] = [chooseInfluencersByFollowerCount, contactInfluencersForCollaboration, beautyInfluencersIndia, fashionInfluencersIndia, financeInfluencersIndia, fitnessInfluencersIndia, foodInfluencersIndia, influencersForEcommerceBrands, influencersForProductLaunch, instagramInfluencersTargetAudience, parentingInfluencersIndia, techInfluencersIndia, travelInfluencersIndia, youtubeInfluencersIndia, negotiateInfluencerRates, repurposeInfluencerContent, influencerSeedingCampaign, influencerGiftingVsPaidCollaborations, influencerBriefTemplate, influencerCampaignChecklist, influencerMarketingKpis, influencerMarketingRoi].sort(
  (a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title),
);

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const BLOG_META = {
  title: "Influencer Discovery Blog: Guides for Indian Brands",
  description:
    "Practical guides for Indian brands and agencies on finding, evaluating and briefing influencers, from the Kudozz Influencer Discovery team.",
};
