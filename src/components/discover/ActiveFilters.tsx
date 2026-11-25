"use client";

import { X } from "@phosphor-icons/react";
import { nicheLabel } from "@/lib/constants/niches";
import {
  CreatorFilters,
  DEFAULT_FILTERS,
  FOLLOWER_BANDS,
  GENDER_OPTIONS,
  hasCustomFollowers,
} from "@/lib/utils/creatorFilters";
import { formatCompact } from "@/lib/utils/format";

interface Chip {
  key: string;
  label: string;
  remove: () => CreatorFilters;
}

const ActiveFilters = ({
  filters,
  onChange,
}: {
  filters: CreatorFilters;
  onChange: (filters: CreatorFilters) => void;
}) => {
  const f = filters;
  const without = <K extends keyof CreatorFilters>(key: K, value: string) => ({
    ...f,
    [key]: (f[key] as string[]).filter((x) => x !== value),
  });
  const list = (key: "niches" | "states" | "cities" | "languages", label = (v: string) => v): Chip[] =>
    f[key].map((v) => ({ key: `${key}-${v}`, label: label(v), remove: () => without(key, v) }));

  const followerChip: Chip[] = hasCustomFollowers(f)
    ? [
        {
          key: "followers",
          label:
            f.followersMin != null && f.followersMax != null
              ? `${formatCompact(f.followersMin)} – ${formatCompact(f.followersMax)} followers`
              : f.followersMin != null
                ? `${formatCompact(f.followersMin)}+ followers`
                : `Up to ${formatCompact(f.followersMax)} followers`,
          remove: () => ({ ...f, followersMin: null, followersMax: null }),
        },
      ]
    : f.followerBands.map((id) => ({
        key: `band-${id}`,
        label: `${FOLLOWER_BANDS.find((b) => b.id === id)?.label ?? id} followers`,
        remove: () => without("followerBands", id),
      }));

  const chips: Chip[] = [
    ...followerChip,
    ...list("niches", nicheLabel),
    ...list("states"),
    ...list("cities"),
    ...list("languages"),
    ...f.genders.map((g) => ({
      key: `gender-${g}`,
      label: GENDER_OPTIONS.find((o) => o.value === g)?.label ?? g,
      remove: () => without("genders", g),
    })),
    ...(f.minEngagement > 0
      ? [{ key: "er", label: `ER ≥ ${f.minEngagement}%`, remove: () => ({ ...f, minEngagement: 0 }) }]
      : []),
    ...(f.minAvgViews != null
      ? [{ key: "views", label: `${formatCompact(f.minAvgViews)}+ avg. views`, remove: () => ({ ...f, minAvgViews: null }) }]
      : []),
    ...(f.minAvgLikes != null
      ? [{ key: "likes", label: `${formatCompact(f.minAvgLikes)}+ avg. likes`, remove: () => ({ ...f, minAvgLikes: null }) }]
      : []),
    ...(f.minPostingFrequency != null
      ? [
          {
            key: "freq",
            label: `${f.minPostingFrequency}+ posts / month`,
            remove: () => ({ ...f, minPostingFrequency: null }),
          },
        ]
      : []),
    ...(f.hasEmail ? [{ key: "email", label: "Has email", remove: () => ({ ...f, hasEmail: false }) }] : []),
    ...(f.hasPhone ? [{ key: "phone", label: "Has phone", remove: () => ({ ...f, hasPhone: false }) }] : []),
  ];

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          onClick={() => onChange(chip.remove())}
          className="group inline-flex animate-fade-up items-center gap-1.5 rounded-full border border-coral/25 bg-coral-50 py-1.5 pl-3 pr-2 text-[12.5px] font-semibold text-coral-700 transition-colors hover:border-coral/50"
        >
          {chip.label}
          <span className="rounded-full p-0.5 transition-colors group-hover:bg-coral/15">
            <X size={11} weight="bold" />
          </span>
        </button>
      ))}
      <button
        onClick={() => onChange({ ...DEFAULT_FILTERS, search: f.search })}
        className="px-2 text-[12.5px] font-semibold text-charcoal-400 hover:text-charcoal"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFilters;
