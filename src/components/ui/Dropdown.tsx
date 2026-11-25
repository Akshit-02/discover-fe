"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { CaretDown, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils/cn";

interface DropdownProps<T extends string> {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  icon?: ReactNode;
  prefix?: string;
  align?: "left" | "right";
}

function Dropdown<T extends string>({
  value,
  options,
  onChange,
  icon,
  prefix,
  align = "right",
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
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
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-sand-200 bg-white px-3.5 text-[13px] font-semibold text-charcoal shadow-soft transition-colors hover:border-sand-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral/20"
      >
        {icon}
        {prefix && <span className="font-medium text-charcoal-400">{prefix}</span>}
        {current?.label}
        <CaretDown
          size={14}
          weight="bold"
          className={cn("text-charcoal-400 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className={cn(
            "absolute z-30 mt-2 min-w-[220px] animate-fade-up overflow-hidden rounded-2xl border border-sand-200 bg-white p-1.5 shadow-lift",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13.5px] transition-colors",
                  option.value === value
                    ? "bg-coral-50 font-semibold text-coral-700"
                    : "text-charcoal-600 hover:bg-sand-50",
                )}
              >
                {option.label}
                {option.value === value && <Check size={15} weight="bold" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
