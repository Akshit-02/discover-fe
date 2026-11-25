"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown, UsersThree } from "@phosphor-icons/react";
import { cn } from "@/lib/utils/cn";
import { CreatorFilters, FOLLOWER_BANDS } from "@/lib/utils/creatorFilters";
import { formatCompact } from "@/lib/utils/format";
import { CompactNumberInput, SubLabel, toggleValue } from "./FilterControls";

type FollowerFields = Pick<CreatorFilters, "followerBands" | "followersMin" | "followersMax">;

const summary = (f: FollowerFields) => {
  if (f.followersMin != null || f.followersMax != null) {
    if (f.followersMin != null && f.followersMax != null)
      return `${formatCompact(f.followersMin)} – ${formatCompact(f.followersMax)}`;
    return f.followersMin != null ? `${formatCompact(f.followersMin)}+` : `Up to ${formatCompact(f.followersMax)}`;
  }
  if (!f.followerBands.length) return "Any";
  if (f.followerBands.length === 1) return FOLLOWER_BANDS.find((b) => b.id === f.followerBands[0])?.label ?? "1 range";
  return `${f.followerBands.length} ranges`;
};

/** Followers dropdown for the basic filter bar: preset bands or a custom min/max. */
const FollowerRangeFilter = ({
  value,
  onChange,
}: {
  value: FollowerFields;
  onChange: (value: FollowerFields) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const custom = value.followersMin != null || value.followersMax != null;
  const active = custom || value.followerBands.length > 0;

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "inline-flex h-[52px] items-center gap-2 rounded-2xl border bg-white px-4 text-[13.5px] font-semibold shadow-soft transition-colors",
          active ? "border-coral/50 text-charcoal" : "border-sand-200 text-charcoal hover:border-sand-300",
        )}
      >
        <UsersThree size={18} weight="duotone" className="text-coral" />
        <span className="text-charcoal-400">Followers:</span>
        <span className="max-w-[140px] truncate">{summary(value)}</span>
        <CaretDown size={14} weight="bold" className={cn("text-charcoal-300 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-40 w-[300px] animate-fade-up rounded-2xl border border-sand-200 bg-white p-4 shadow-lift sm:left-auto sm:right-0">
          <SubLabel>Ranges</SubLabel>
          <div className={cn("grid grid-cols-2 gap-1.5 transition-opacity", custom && "opacity-40")}>
            {FOLLOWER_BANDS.map((band) => {
              const on = !custom && value.followerBands.includes(band.id);
              return (
                <button
                  key={band.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      followersMin: null,
                      followersMax: null,
                      followerBands: toggleValue(custom ? [] : value.followerBands, band.id),
                    })
                  }
                  className={cn(
                    "rounded-xl border px-2.5 py-2 text-left text-[12.5px] font-bold transition-all",
                    on
                      ? "border-coral bg-coral-50 text-coral-700 shadow-[0_0_0_3px_rgba(243,107,74,0.1)]"
                      : "border-sand-200 text-charcoal hover:border-sand-300",
                  )}
                >
                  {band.label}
                </button>
              );
            })}
          </div>
          <div className="mt-4">
            <SubLabel>Custom range</SubLabel>
            <div className="flex items-center gap-2">
              <CompactNumberInput
                value={value.followersMin}
                placeholder="Min · 2k"
                label="Minimum followers"
                onCommit={(v) => onChange({ ...value, followersMin: v, followerBands: [] })}
              />
              <span className="text-charcoal-300">–</span>
              <CompactNumberInput
                value={value.followersMax}
                placeholder="Max · 8k"
                label="Maximum followers"
                onCommit={(v) => onChange({ ...value, followersMax: v, followerBands: [] })}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-sand-100 pt-3">
            <button
              type="button"
              disabled={!active}
              onClick={() => onChange({ followerBands: [], followersMin: null, followersMax: null })}
              className="text-[12.5px] font-semibold text-charcoal-400 hover:text-charcoal disabled:opacity-30"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-charcoal px-3 py-1.5 text-[12.5px] font-semibold text-white hover:bg-charcoal-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowerRangeFilter;
