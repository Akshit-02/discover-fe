"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { CaretDown, MagnifyingGlass } from "@phosphor-icons/react";
import Checkbox from "@/components/ui/Checkbox";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";

export const toggleValue = <T,>(list: T[], value: T) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

/** Collapsible filter section. */
export const FilterGroup = ({
  title,
  icon,
  children,
  count,
  defaultOpen = false,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  count?: number;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen || Boolean(count));
  return (
    <div className="border-b border-sand-100 py-4 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-[13.5px] font-bold text-charcoal">
          {icon && <span className="text-coral">{icon}</span>}
          {title}
          {count ? (
            <span className="rounded-full bg-coral px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
              {count}
            </span>
          ) : null}
        </span>
        <CaretDown
          size={14}
          weight="bold"
          className={cn("text-charcoal-300 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
};

export const SubLabel = ({ children }: { children: ReactNode }) => (
  <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-charcoal-300">{children}</p>
);

/** Searchable checkbox list; selected values stay on top. */
export const FacetList = ({
  options,
  selected,
  onToggle,
  label = (v) => v,
  loading,
  placeholder = "Search…",
  initialVisible = 6,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  label?: (value: string) => string;
  loading?: boolean;
  placeholder?: string;
  initialVisible?: number;
}) => {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const selectedKey = selected.join("|");

  const merged = useMemo(() => {
    const chosen = new Set(selectedKey ? selectedKey.split("|") : []);
    const known = new Set(options);
    const all = [...[...chosen].filter((v) => !known.has(v)), ...options];
    return [...all.filter((v) => chosen.has(v)), ...all.filter((v) => !chosen.has(v))];
  }, [options, selectedKey]);

  if (loading) {
    return (
      <div className="space-y-2 px-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-5 rounded-md" />
        ))}
      </div>
    );
  }
  if (!merged.length) return <p className="px-2 text-xs text-charcoal-300">No options available</p>;

  const selectedSet = new Set(selected);
  const q = query.trim().toLowerCase();
  const filtered = q ? merged.filter((v) => label(v).toLowerCase().includes(q)) : merged;
  const limit = expanded || q ? 200 : Math.max(initialVisible, selected.length);
  const visible = filtered.slice(0, limit);

  return (
    <div className="space-y-1">
      {merged.length > initialVisible && (
        <div className="mb-2 flex h-9 items-center gap-2 rounded-lg border border-sand-200 bg-white px-2.5 focus-within:border-coral">
          <MagnifyingGlass size={14} weight="bold" className="text-charcoal-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-[13px] focus:outline-none"
          />
        </div>
      )}
      <div className="scrollbar-thin max-h-64 overflow-y-auto">
        {visible.map((value) => (
          <Checkbox
            key={value}
            checked={selectedSet.has(value)}
            onChange={() => onToggle(value)}
            label={label(value)}
          />
        ))}
        {q && !filtered.length && <p className="px-2 py-1 text-xs text-charcoal-300">No matches</p>}
      </div>
      {!q && (filtered.length > visible.length || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="px-2 pt-1 text-[12.5px] font-semibold text-coral-600 hover:text-coral-700"
        >
          {expanded ? "Show less" : `Show all ${filtered.length > 200 ? "200+" : filtered.length}`}
        </button>
      )}
    </div>
  );
};

/** Single-choice pill row. */
export const ChipRow = <T,>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}) => (
  <div className="flex flex-wrap gap-1.5">
    {options.map((option) => {
      const on = value === option.value;
      return (
        <button
          key={option.label}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-all",
            on ? "border-charcoal bg-charcoal text-white" : "border-sand-200 text-charcoal-500 hover:border-sand-300",
          )}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);

export const parseCompact = (text: string): number | null | undefined => {
  const t = text.trim().toLowerCase().replace(/,/g, "");
  if (!t) return null;
  const m = t.match(/^(\d+(?:\.\d+)?)\s*([km]?)$/);
  if (!m) return undefined;
  return Math.round(Number(m[1]) * (m[2] === "k" ? 1_000 : m[2] === "m" ? 1_000_000 : 1));
};

/** Number input that commits on blur / Enter and accepts "5k" or "1.2m". */
export const CompactNumberInput = ({
  value,
  onCommit,
  placeholder,
  label,
}: {
  value: number | null;
  onCommit: (value: number | null) => void;
  placeholder: string;
  label: string;
}) => {
  const [text, setText] = useState(value == null ? "" : String(value));
  useEffect(() => setText(value == null ? "" : String(value)), [value]);
  const commit = () => {
    const parsed = parseCompact(text);
    if (parsed === undefined) setText(value == null ? "" : String(value));
    else if (parsed !== value) onCommit(parsed);
  };
  return (
    <input
      inputMode="numeric"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
      placeholder={placeholder}
      aria-label={label}
      className="h-9 w-full min-w-0 rounded-lg border border-sand-200 bg-white px-2.5 text-[13px] text-charcoal placeholder:text-charcoal-300 focus:border-coral focus:outline-none focus:ring-4 focus:ring-coral/10"
    />
  );
};
