import { titleCase } from "@/lib/utils/format";

export interface Niche {
  slug: string;
  label: string;
  isActive: boolean;
}

export const NICHES: Niche[] = [
  { slug: "fashion-lifestyle", label: "Fashion & Lifestyle", isActive: true },
  { slug: "beauty-skincare", label: "Beauty & Skincare", isActive: true },
  { slug: "health-fitness", label: "Health & Fitness", isActive: true },
  { slug: "food-beverages", label: "Food & Beverages", isActive: true },
  { slug: "travel", label: "Travel", isActive: true },
  { slug: "technology-gadgets", label: "Technology & Gadgets", isActive: true },
  { slug: "gaming", label: "Gaming", isActive: true },
  { slug: "parenting-family", label: "Parenting & Family", isActive: true },
  { slug: "finance-business", label: "Finance & Business", isActive: true },
  { slug: "education", label: "Education", isActive: true },
  { slug: "entertainment-comedy", label: "Entertainment & Comedy", isActive: true },
  { slug: "home-decor", label: "Home & Decor", isActive: true },
  { slug: "automotive", label: "Automotive", isActive: true },
  { slug: "photography", label: "Photography", isActive: true },
  { slug: "other", label: "Other", isActive: true },
];

const BY_SLUG = new Map(NICHES.map((n) => [n.slug, n]));

/** Label for a stored niche value; unknown values ("homeAndLiving") are humanised. */
export const nicheLabel = (value?: string | null) =>
  (value && BY_SLUG.get(value)?.label) || titleCase((value || "").replace(/([a-z])([A-Z])/g, "$1 $2"));
