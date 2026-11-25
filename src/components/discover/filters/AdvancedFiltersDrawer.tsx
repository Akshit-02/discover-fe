"use client";

import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";
import {
  At,
  ChartLineUp,
  Coins,
  Eye,
  GenderIntersex,
  Heart,
  MapPin,
  Phone,
  Repeat,
  SlidersHorizontal,
  Tag,
  Translate,
  X,
} from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import { useAppSelector } from "@/lib/store/hooks";
import { creditLabel } from "@/lib/utils/credits";
import { nicheLabel, NICHES } from "@/lib/constants/niches";
import { CreatorFilterOptions } from "@/lib/models/creator";
import { cn } from "@/lib/utils/cn";
import {
  AdvancedFilters,
  countAdvancedFilters,
  DEFAULT_FILTERS,
  FREQUENCY_OPTIONS,
  GENDER_OPTIONS,
  LIKES_OPTIONS,
  pickAdvanced,
  VIEWS_OPTIONS,
} from "@/lib/utils/creatorFilters";
import { ChipRow, FacetList, FilterGroup, SubLabel, toggleValue } from "./FilterControls";

interface AdvancedFiltersDrawerProps {
  open: boolean;
  value: AdvancedFilters;
  options: CreatorFilterOptions | null;
  optionsLoading: boolean;
  onApply: (value: AdvancedFilters) => void;
  onClose: () => void;
}

const EMPTY = pickAdvanced(DEFAULT_FILTERS);
const values = (list?: { value: string }[]) => (list || []).map((o) => o.value);

/** Right-side drawer; edits are staged locally and applied together. */
const AdvancedFiltersDrawer = ({ open, value, options, optionsLoading, onApply, onClose }: AdvancedFiltersDrawerProps) => {
  const [draft, setDraft] = useState<AdvancedFilters>(value);
  const [mounted, setMounted] = useState(false);
  const { costs, balance } = useAppSelector((s) => s.credits);
  useEffect(() => setMounted(true), []);

  // Start from the applied filters every time the drawer opens.
  useEffect(() => {
    if (open) setDraft(value);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const set = <K extends keyof AdvancedFilters>(key: K, v: AdvancedFilters[K]) => setDraft((d) => ({ ...d, [key]: v }));
  const loading = optionsLoading && !options;
  const draftCount = countAdvancedFilters(draft);
  const dirty = JSON.stringify(draft) !== JSON.stringify(value);

  // Fixed taxonomy first, then any other stored niche values.
  const nicheOptions = useMemo(() => {
    const slugs = new Set(NICHES.map((n) => n.slug));
    return [
      ...NICHES.filter((n) => n.isActive).map((n) => n.slug),
      ...values(options?.niches).filter((v) => !slugs.has(v)),
    ];
  }, [options]);

  if (!open || !mounted) return null;

  // Portal to <body> so page layout (spacing, transforms) can't offset the fixed overlay.
  return createPortal(
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Advanced filters">
      <div className="absolute inset-0 animate-fade-in bg-charcoal/40 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[440px] animate-slide-in flex-col bg-cream shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-sand-200/70 bg-white px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral-50 text-coral">
              <SlidersHorizontal size={20} weight="duotone" />
            </span>
            <div>
              <p className="text-[16px] font-bold tracking-tight text-charcoal">Advanced filters</p>
              <p className="text-xs text-charcoal-400">
                {draftCount ? `${draftCount} selected` : "Narrow down by audience, content and contact"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-charcoal-400 transition-colors hover:bg-sand-100 hover:text-charcoal"
            aria-label="Close advanced filters"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="scrollbar-thin flex-1 overflow-y-auto px-6">
          <FilterGroup title="Niche" icon={<Tag size={16} weight="fill" />} count={draft.niches.length} defaultOpen>
            <FacetList
              options={nicheOptions}
              selected={draft.niches}
              onToggle={(v) => set("niches", toggleValue(draft.niches, v))}
              label={nicheLabel}
              loading={loading}
              placeholder="Search niches…"
              initialVisible={8}
            />
          </FilterGroup>

          <FilterGroup title="Gender" icon={<GenderIntersex size={16} weight="fill" />} count={draft.genders.length}>
            <div className="grid grid-cols-2 gap-1.5">
              {GENDER_OPTIONS.map((g) => {
                const on = draft.genders.includes(g.value);
                return (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => set("genders", toggleValue(draft.genders, g.value))}
                    className={cn(
                      "rounded-xl border bg-white px-3 py-2 text-left text-[12.5px] font-semibold transition-all",
                      on
                        ? "border-coral bg-coral-50 text-coral-700 shadow-[0_0_0_3px_rgba(243,107,74,0.1)]"
                        : "border-sand-200 text-charcoal hover:border-sand-300",
                    )}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </FilterGroup>

          <FilterGroup
            title="Location"
            icon={<MapPin size={16} weight="fill" />}
            count={draft.states.length + draft.cities.length}
          >
            <div className="space-y-4">
              <div>
                <SubLabel>State</SubLabel>
                <FacetList
                  options={values(options?.states)}
                  selected={draft.states}
                  onToggle={(v) => set("states", toggleValue(draft.states, v))}
                  loading={loading}
                  placeholder="Search states…"
                  initialVisible={5}
                />
              </div>
              <div>
                <SubLabel>City</SubLabel>
                <FacetList
                  options={values(options?.cities)}
                  selected={draft.cities}
                  onToggle={(v) => set("cities", toggleValue(draft.cities, v))}
                  loading={loading}
                  placeholder="Search cities…"
                  initialVisible={5}
                />
              </div>
            </div>
          </FilterGroup>

          <FilterGroup
            title="Language"
            icon={<Translate size={16} weight="fill" />}
            count={draft.languages.length}
          >
            <FacetList
              options={values(options?.languages)}
              selected={draft.languages}
              onToggle={(v) => set("languages", toggleValue(draft.languages, v))}
              loading={loading}
              placeholder="Search languages…"
            />
          </FilterGroup>

          <FilterGroup
            title="Engagement rate"
            icon={<ChartLineUp size={16} weight="fill" />}
            count={draft.minEngagement > 0 ? 1 : 0}
          >
            <div className="px-1">
              <div className="mb-2 flex items-center justify-between text-[12.5px]">
                <span className="text-charcoal-400">Minimum</span>
                <span className="rounded-lg bg-white px-2 py-1 font-bold text-charcoal">
                  {draft.minEngagement > 0 ? `≥ ${draft.minEngagement}%` : "Any"}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={15}
                step={0.5}
                value={draft.minEngagement}
                onChange={(e) => set("minEngagement", Number(e.target.value))}
                className="w-full cursor-pointer"
                style={{ ["--fill" as string]: `${(draft.minEngagement / 15) * 100}%` }}
                aria-label="Minimum engagement rate"
              />
              <div className="mt-1 flex justify-between text-[10.5px] font-medium text-charcoal-300">
                <span>0%</span>
                <span>15%</span>
              </div>
            </div>
          </FilterGroup>

          <FilterGroup title="Avg. likes" icon={<Heart size={16} weight="fill" />} count={draft.minAvgLikes != null ? 1 : 0}>
            <ChipRow options={LIKES_OPTIONS} value={draft.minAvgLikes} onChange={(v) => set("minAvgLikes", v)} />
          </FilterGroup>

          <FilterGroup title="Avg. views" icon={<Eye size={16} weight="fill" />} count={draft.minAvgViews != null ? 1 : 0}>
            <ChipRow options={VIEWS_OPTIONS} value={draft.minAvgViews} onChange={(v) => set("minAvgViews", v)} />
          </FilterGroup>

          <FilterGroup
            title="Posting frequency"
            icon={<Repeat size={16} weight="fill" />}
            count={draft.minPostingFrequency != null ? 1 : 0}
          >
            <ChipRow
              options={FREQUENCY_OPTIONS}
              value={draft.minPostingFrequency}
              onChange={(v) => set("minPostingFrequency", v)}
            />
          </FilterGroup>

          <FilterGroup
            title="Contact details"
            icon={<At size={16} weight="fill" />}
            count={(draft.hasEmail ? 1 : 0) + (draft.hasPhone ? 1 : 0)}
          >
            <div className="-mx-2 space-y-0.5">
              <Switch
                checked={draft.hasEmail}
                onChange={(v) => set("hasEmail", v)}
                label="Has email"
                icon={<At size={18} weight="duotone" className="text-coral" />}
              />
              <Switch
                checked={draft.hasPhone}
                onChange={(v) => set("hasPhone", v)}
                label="Has phone"
                icon={<Phone size={18} weight="duotone" className="text-coral" />}
              />
            </div>
          </FilterGroup>
        </div>

        <div className="shrink-0 border-t border-sand-200/70 bg-white px-6 pb-4 pt-3.5">
          <div className="mb-3 flex items-center justify-between gap-3 text-[12px]">
            <span className="text-charcoal-400">
              <span className="font-semibold text-charcoal">{creditLabel(costs.advancedFilter)}</span> per search ·
              re-runs free for 24h
            </span>
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-semibold",
                balance < costs.advancedFilter ? "bg-coral-50 text-coral-700" : "bg-sand-100 text-charcoal-500",
              )}
            >
              <Coins size={13} weight="fill" className="text-tangerine" />
              {balance} left
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              className="shrink-0 whitespace-nowrap"
              onClick={() => setDraft(EMPTY)}
              disabled={!draftCount}
            >
              Clear all
            </Button>
            <Button
              fullWidth
              onClick={() => {
                if (dirty) onApply(draft);
                onClose();
              }}
            >
              {dirty ? (draftCount ? `Apply ${draftCount} filter${draftCount === 1 ? "" : "s"}` : "Apply") : "Done"}
              {dirty && draftCount > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[11.5px] font-bold">
                  <Coins size={12} weight="fill" />
                  {costs.advancedFilter}
                </span>
              )}
            </Button>
          </div>
        </div>
      </aside>
    </div>,
    document.body,
  );
};

export default AdvancedFiltersDrawer;
