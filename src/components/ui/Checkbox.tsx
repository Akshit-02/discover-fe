"use client";

import { Check } from "@phosphor-icons/react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  meta?: ReactNode;
}

const Checkbox = ({ checked, onChange, label, meta }: CheckboxProps) => (
  <label className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-sand-50">
    <input
      type="checkbox"
      className="peer sr-only"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span
      className={cn(
        "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-all peer-focus-visible:ring-4 peer-focus-visible:ring-coral/20",
        checked
          ? "border-coral bg-coral text-white"
          : "border-sand-300 bg-white group-hover:border-charcoal-300",
      )}
    >
      {checked && <Check size={12} weight="bold" />}
    </span>
    <span className="flex-1 truncate text-[13.5px] text-charcoal-700">{label}</span>
    {meta && <span className="text-xs font-medium text-charcoal-300">{meta}</span>}
  </label>
);

export default Checkbox;
