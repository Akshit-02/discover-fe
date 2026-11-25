import { Creator } from "@/lib/models/creator";

const compactFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const formatCompact = (value?: number | null) =>
  value == null ? "—" : compactFormatter.format(value);

export const formatPercent = (value?: number | null) =>
  value == null ? "—" : `${value.toFixed(value < 10 ? 2 : 1)}%`;

export const formatDate = (value?: string | null) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

export const titleCase = (value?: string | null) =>
  (value || "")
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

export const compactList = (list?: (string | null)[] | null) =>
  (list || []).filter((v): v is string => Boolean(v && v.trim()));

export const displayName = (creator: Pick<Creator, "name" | "username">) =>
  creator.name?.trim() || creator.username;

export const initials = (value: string) => {
  const parts = value.replace(/[@_.]/g, " ").trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || parts[0]?.[1] || ""))
    .toUpperCase();
};

export const locationLabel = (creator: Creator) =>
  [creator.city, creator.state, creator.country]
    .filter(Boolean)
    .map((v) => titleCase(v))
    .join(", ");

export type Tier = "Nano" | "Micro" | "Mid-tier" | "Macro" | "Mega";

export const TIERS: { label: Tier; min: number; max: number; hint: string }[] = [
  { label: "Nano", min: 0, max: 10_000, hint: "< 10K" },
  { label: "Micro", min: 10_000, max: 100_000, hint: "10K – 100K" },
  { label: "Mid-tier", min: 100_000, max: 500_000, hint: "100K – 500K" },
  { label: "Macro", min: 500_000, max: 1_000_000, hint: "500K – 1M" },
  { label: "Mega", min: 1_000_000, max: Infinity, hint: "1M+" },
];

export const getTier = (followers?: number | null): Tier | null => {
  if (followers == null) return null;
  return TIERS.find((t) => followers >= t.min && followers < t.max)?.label ?? null;
};

export const engagementQuality = (rate?: number | null) => {
  if (rate == null) return { label: "Unknown", tone: "neutral" as const };
  if (rate >= 6) return { label: "Exceptional", tone: "great" as const };
  if (rate >= 3) return { label: "Strong", tone: "good" as const };
  if (rate >= 1) return { label: "Average", tone: "ok" as const };
  return { label: "Low", tone: "low" as const };
};

export const instagramUrl = (username: string) =>
  `https://instagram.com/${username.replace(/^@/, "")}`;

const relativeFormatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export const formatRelative = (value?: string | null) => {
  if (!value) return "—";
  const seconds = (new Date(value).getTime() - Date.now()) / 1000;
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return relativeFormatter.format(Math.round(seconds / size), unit);
  }
  return "just now";
};
