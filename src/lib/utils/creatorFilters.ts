import { nicheLabel, NICHES } from "@/lib/constants/niches";
import { Creator } from "@/lib/models/creator";

export type SortKey =
  | "FOLLOWERS_DESC"
  | "FOLLOWERS_ASC"
  | "ENGAGEMENT_DESC"
  | "VIEWS_DESC"
  | "LIKES_DESC";

export const DEFAULT_SORT: SortKey = "FOLLOWERS_DESC";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "FOLLOWERS_DESC", label: "Most followers" },
  { value: "FOLLOWERS_ASC", label: "Fewest followers" },
  { value: "ENGAGEMENT_DESC", label: "Highest engagement" },
  { value: "VIEWS_DESC", label: "Most avg. views" },
  { value: "LIKES_DESC", label: "Most avg. likes" },
];

export type Gender = "female" | "male" | "other" | "unknown";

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
  { value: "unknown", label: "Not specified" },
];

export interface FollowerBand {
  id: string;
  label: string;
  min: number | null;
  max: number | null;
}

export const FOLLOWER_BANDS: FollowerBand[] = [
  { id: "lt1k", label: "Under 1K", min: null, max: 1_000 },
  { id: "1k-3k", label: "1K – 3K", min: 1_000, max: 3_000 },
  { id: "3k-5k", label: "3K – 5K", min: 3_000, max: 5_000 },
  { id: "5k-10k", label: "5K – 10K", min: 5_000, max: 10_000 },
  { id: "10k-100k", label: "10K – 100K", min: 10_000, max: 100_000 },
  { id: "100k-1m", label: "100K – 1M", min: 100_000, max: 1_000_000 },
  { id: "1m", label: "1M+", min: 1_000_000, max: null },
];

export const VIEWS_OPTIONS: { label: string; value: number | null }[] = [
  { label: "Any", value: null },
  { label: "500+", value: 500 },
  { label: "1K+", value: 1_000 },
  { label: "5K+", value: 5_000 },
  { label: "10K+", value: 10_000 },
  { label: "50K+", value: 50_000 },
];

export const LIKES_OPTIONS: { label: string; value: number | null }[] = [
  { label: "Any", value: null },
  { label: "100+", value: 100 },
  { label: "500+", value: 500 },
  { label: "1K+", value: 1_000 },
  { label: "5K+", value: 5_000 },
  { label: "10K+", value: 10_000 },
];

export const FREQUENCY_OPTIONS: { label: string; value: number | null }[] = [
  { label: "Any", value: null },
  { label: "2+ / month", value: 2 },
  { label: "Weekly (4+)", value: 4 },
  { label: "8+ / month", value: 8 },
  { label: "15+ / month", value: 15 },
  { label: "Daily (30+)", value: 30 },
];

export interface CreatorFilters {
  search: string;
  followerBands: string[];
  followersMin: number | null;
  followersMax: number | null;
  niches: string[];
  states: string[];
  cities: string[];
  languages: string[];
  genders: Gender[];
  minEngagement: number;
  minAvgViews: number | null;
  minAvgLikes: number | null;
  minPostingFrequency: number | null;
  hasEmail: boolean;
  hasPhone: boolean;
}

export const DEFAULT_FILTERS: CreatorFilters = {
  search: "",
  followerBands: [],
  followersMin: null,
  followersMax: null,
  niches: [],
  states: [],
  cities: [],
  languages: [],
  genders: [],
  minEngagement: 0,
  minAvgViews: null,
  minAvgLikes: null,
  minPostingFrequency: null,
  hasEmail: false,
  hasPhone: false,
};

export const hasCustomFollowers = (f: CreatorFilters) => f.followersMin != null || f.followersMax != null;

export const countFollowerFilters = (f: CreatorFilters) => (hasCustomFollowers(f) ? 1 : f.followerBands.length);

/** Filters that live in the advanced drawer (everything except search + followers). */
export const ADVANCED_KEYS = [
  "niches",
  "states",
  "cities",
  "languages",
  "genders",
  "minEngagement",
  "minAvgViews",
  "minAvgLikes",
  "minPostingFrequency",
  "hasEmail",
  "hasPhone",
] as const;

export type AdvancedFilters = Pick<CreatorFilters, (typeof ADVANCED_KEYS)[number]>;

export const pickAdvanced = (f: CreatorFilters): AdvancedFilters =>
  Object.fromEntries(ADVANCED_KEYS.map((k) => [k, f[k]])) as AdvancedFilters;

export const countAdvancedFilters = (f: AdvancedFilters) =>
  f.niches.length +
  f.states.length +
  f.cities.length +
  f.languages.length +
  f.genders.length +
  (f.minEngagement > 0 ? 1 : 0) +
  (f.minAvgViews != null ? 1 : 0) +
  (f.minAvgLikes != null ? 1 : 0) +
  (f.minPostingFrequency != null ? 1 : 0) +
  (f.hasEmail ? 1 : 0) +
  (f.hasPhone ? 1 : 0);

export const countActiveFilters = (f: CreatorFilters) => countFollowerFilters(f) + countAdvancedFilters(f);

/** GraphQL CreatorFilterInput for the backend. */
export const toFilterInput = (f: CreatorFilters) => {
  const followerRanges = hasCustomFollowers(f)
    ? [{ min: f.followersMin, max: f.followersMax == null ? null : f.followersMax + 1 }]
    : FOLLOWER_BANDS.filter((b) => f.followerBands.includes(b.id)).map((b) => ({ min: b.min, max: b.max }));
  const input: Record<string, unknown> = {
    search: f.search.trim() || null,
    niches: f.niches,
    states: f.states,
    cities: f.cities,
    languages: f.languages,
    genders: f.genders.map((g) => g.toUpperCase()),
    followerRanges,
    minEngagementRate: f.minEngagement > 0 ? f.minEngagement : null,
    minAvgViews: f.minAvgViews,
    minAvgLikes: f.minAvgLikes,
    minPostingFrequency: f.minPostingFrequency,
    hasEmail: f.hasEmail || null,
    hasPhone: f.hasPhone || null,
  };
  return Object.fromEntries(
    Object.entries(input).filter(([, v]) => v != null && !(Array.isArray(v) && v.length === 0)),
  );
};

// ---------- URL <-> filters (shareable searches) ----------

const LIST_KEYS = ["followerBands", "niches", "states", "cities", "languages", "genders"] as const;
const SHORT: Record<string, string> = {
  search: "q",
  followerBands: "f",
  followersMin: "fmin",
  followersMax: "fmax",
  niches: "niche",
  states: "state",
  cities: "city",
  languages: "lang",
  genders: "gender",
  minEngagement: "er",
  minAvgViews: "views",
  minAvgLikes: "likes",
  minPostingFrequency: "freq",
  hasEmail: "email",
  hasPhone: "phone",
};

const num = (v: string | null) => (v != null && v !== "" && Number.isFinite(Number(v)) ? Number(v) : null);

export const filtersToQuery = (f: CreatorFilters, sort: SortKey) => {
  const params = new URLSearchParams();
  if (f.search.trim()) params.set(SHORT.search, f.search.trim());
  LIST_KEYS.forEach((k) => f[k].length && params.set(SHORT[k], f[k].join("|")));
  (["followersMin", "followersMax", "minAvgViews", "minAvgLikes", "minPostingFrequency"] as const).forEach(
    (k) => f[k] != null && params.set(SHORT[k], String(f[k])),
  );
  if (f.minEngagement > 0) params.set(SHORT.minEngagement, String(f.minEngagement));
  (["hasEmail", "hasPhone"] as const).forEach((k) => f[k] && params.set(SHORT[k], "1"));
  if (sort !== DEFAULT_SORT) params.set("sort", sort);
  return params.toString();
};

export const queryToFilters = (params: URLSearchParams): { filters: CreatorFilters; sort: SortKey } => {
  const list = (k: string) => (params.get(k) || "").split("|").map((v) => v.trim()).filter(Boolean);
  const nicheSlugs = new Set(NICHES.map((n) => n.slug));
  const genders = new Set(GENDER_OPTIONS.map((g) => g.value));
  const bands = new Set(FOLLOWER_BANDS.map((b) => b.id));
  const sortParam = params.get("sort") as SortKey | null;
  return {
    filters: {
      search: params.get(SHORT.search) || "",
      followerBands: list(SHORT.followerBands).filter((b) => bands.has(b)),
      followersMin: num(params.get(SHORT.followersMin)),
      followersMax: num(params.get(SHORT.followersMax)),
      niches: list(SHORT.niches).filter((n) => nicheSlugs.has(n) || n.length < 60),
      states: list(SHORT.states),
      cities: list(SHORT.cities),
      languages: list(SHORT.languages),
      genders: list(SHORT.genders).filter((g): g is Gender => genders.has(g as Gender)),
      minEngagement: Math.min(Math.max(num(params.get(SHORT.minEngagement)) ?? 0, 0), 15),
      minAvgViews: num(params.get(SHORT.minAvgViews)),
      minAvgLikes: num(params.get(SHORT.minAvgLikes)),
      minPostingFrequency: num(params.get(SHORT.minPostingFrequency)),
      hasEmail: params.get(SHORT.hasEmail) === "1",
      hasPhone: params.get(SHORT.hasPhone) === "1",
    },
    sort: sortParam && SORT_OPTIONS.some((o) => o.value === sortParam) ? sortParam : DEFAULT_SORT,
  };
};

// ---------- in-memory helpers (small, already-loaded sets such as a list's creators) ----------

const norm = (v?: string | null) => (v || "").trim().toLowerCase();

export const searchLoaded = (creators: Creator[], query: string) => {
  const q = norm(query).replace(/^@/, "");
  if (!q) return creators;
  return creators.filter((c) =>
    [c.name, c.username, c.city, c.state, ...(c.niches || []).map((n) => nicheLabel(n))].some((v) =>
      norm(v).includes(q),
    ),
  );
};

const desc = (a?: number | null, b?: number | null) => (b ?? -1) - (a ?? -1);

export const sortLoaded = (creators: Creator[], sort: SortKey) => {
  const list = [...creators];
  const er = (c: Creator) => (c.avgEngagementRate != null && c.avgEngagementRate <= 100 ? c.avgEngagementRate : null);
  switch (sort) {
    case "FOLLOWERS_DESC":
      return list.sort((a, b) => desc(a.followers, b.followers));
    case "FOLLOWERS_ASC":
      return list.sort((a, b) => (a.followers ?? Infinity) - (b.followers ?? Infinity));
    case "ENGAGEMENT_DESC":
      return list.sort((a, b) => desc(er(a), er(b)));
    case "VIEWS_DESC":
      return list.sort((a, b) => desc(a.avgViews, b.avgViews));
    case "LIKES_DESC":
      return list.sort((a, b) => desc(a.avgLikes, b.avgLikes));
    default:
      return list;
  }
};
