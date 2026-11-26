import type { BlogPost } from "./types";
import { youtubeInfluencersIndia } from "./how-to-find-youtube-influencers-in-india";
import { influencerBriefTemplate } from "./influencer-marketing-brief-template";

export type { BlogPost, BlogBlock, BlogFaq, InlineLink } from "./types";

/** Newest first. Add a post by creating its file in this folder and listing it here; the sitemap picks it up. */
export const blogPosts: BlogPost[] = [youtubeInfluencersIndia, influencerBriefTemplate].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const BLOG_META = {
  title: "Influencer Discovery Blog: Guides for Indian Brands",
  description:
    "Practical guides for Indian brands and agencies on finding, evaluating and briefing influencers, from the Kudozz Influencer Discovery team.",
};
