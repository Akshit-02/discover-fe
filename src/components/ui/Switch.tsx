"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  icon?: ReactNode;
}

const Switch = ({ checked, onChange, label, icon }: SwitchProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-sand-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral/20"
  >
    {icon}
    <span className="flex-1 text-[13.5px] font-medium text-charcoal-700">{label}</span>
    <span
      className={cn(
        "relative h-[22px] w-10 rounded-full transition-colors duration-200",
        checked ? "bg-coral" : "bg-sand-300",
      )}
    >
      <span
        className={cn(
          "absolute top-[3px] h-4 w-4 rounded-full bg-white shadow transition-all duration-200",
          checked ? "left-[21px]" : "left-[3px]",
        )}
      />
    </span>
  </button>
);

export default Switch;
