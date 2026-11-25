"use client";

import { ReactNode, SelectHTMLAttributes } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: ReactNode;
  error?: string | null;
}

const Select = ({ label, options, placeholder = "Select…", icon, error, id, className, ...props }: SelectProps) => {
  const selectId = id || props.name;
  return (
    <div className="space-y-1.5">
      <label htmlFor={selectId} className="block text-[13px] font-semibold text-charcoal-700">
        {label}
      </label>
      <div
        className={cn(
          "group relative flex h-12 items-center gap-2.5 rounded-xl border bg-white px-3.5 transition-all duration-200",
          "focus-within:border-coral focus-within:ring-4 focus-within:ring-coral/15",
          error ? "border-red-400" : "border-sand-200 hover:border-sand-300",
        )}
      >
        {icon && <span className="text-charcoal-300 transition-colors group-focus-within:text-coral">{icon}</span>}
        <select
          id={selectId}
          className={cn(
            "h-full w-full cursor-pointer appearance-none bg-transparent pr-6 text-[15px] focus:outline-none",
            props.value ? "text-charcoal" : "text-charcoal-300",
            className,
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-charcoal">
              {o.label}
            </option>
          ))}
        </select>
        <CaretDown size={14} weight="bold" className="pointer-events-none absolute right-3.5 text-charcoal-400" />
      </div>
      {error && <p className="text-[12.5px] font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
