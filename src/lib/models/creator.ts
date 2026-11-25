export interface Creator {
  id: string;
  name?: string | null;
  username: string;
  /** Contact values are never sent with creator rows; reveal them for credits. */
  hasEmail: boolean;
  hasPhone: boolean;
  followers?: number | null;
  following?: number | null;
  totalPosts?: number | null;
  avgLikes?: number | null;
  avgViews?: number | null;
  avgComments?: number | null;
  avgEngagementRate?: number | null;
  postingFrequency?: number | null;
  gender?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  niches?: (string | null)[] | null;
  languages?: (string | null)[] | null;
  isVerified?: boolean | null;
  collaborationTypes?: (string | null)[] | null;
  currency?: number | null;
  reelPrice?: number | null;
  storyPrice?: number | null;
  shortVideoPrice?: number | null;
  longVideoPrice?: number | null;
  mid?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatorConnection {
  items: Creator[];
  nextToken?: string | null;
}

export interface CreatorSearchStats {
  totalReach: number;
  avgEngagementRate?: number | null;
  verifiedCount: number;
}

export interface CreatorSearchResult {
  items: Creator[];
  nextToken?: string | null;
  totalCount?: number | null;
  stats?: CreatorSearchStats | null;
  creditsCharged: number;
  credits?: CreditBalance | null;
}

export interface FacetOption {
  value: string;
  count: number;
}

export interface CreatorFilterOptions {
  niches: FacetOption[];
  countries: FacetOption[];
  states: FacetOption[];
  cities: FacetOption[];
  languages: FacetOption[];
  genders: FacetOption[];
}

export interface CreditCosts {
  advancedFilter: number;
  revealEmail: number;
  revealPhone: number;
  openProfile: number;
}

export interface CreditBalance {
  balance: number;
  expiresAt?: string | null;
  expired: boolean;
  costs: CreditCosts;
}

export type ContactField = "EMAIL" | "PHONE";

export interface ContactReveal {
  creatorId: string;
  field: ContactField;
  available: boolean;
  value?: string | null;
  charged: number;
  credits: CreditBalance;
}

export interface CreatorProfile {
  creator: Creator;
  email?: string | null;
  phone?: string | null;
  emailRevealed: boolean;
  phoneRevealed: boolean;
  charged: number;
  credits: CreditBalance;
}
