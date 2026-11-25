import { nicheLabel } from "@/lib/constants/niches";
import { Creator } from "@/lib/models/creator";
import { compactList, displayName, locationLabel } from "./format";

const escape = (value: unknown) => {
  const str = value == null ? "" : String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

export const downloadCreatorsCsv = (creators: Creator[], filename: string) => {
  const headers = [
    "Name", "Username", "Followers", "Engagement %", "Avg Views", "Avg Likes",
    "Niches", "Location", "Language", "Gender",
  ];
  const rows = creators.map((c) => [
    displayName(c), c.username, c.followers, c.avgEngagementRate, c.avgViews,
    c.avgLikes, compactList(c.niches).map(nicheLabel).join("; "), locationLabel(c),
    compactList(c.languages).join("; "), c.gender,
  ]);
  const csv = [headers, ...rows].map((r) => r.map(escape).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
