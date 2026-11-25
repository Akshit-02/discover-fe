"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: ReactNode;
  error?: string | null;
  icon?: ReactNode;
  trailing?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, icon, trailing, className, id, type, ...props }, ref) => {
    const [reveal, setReveal] = useState(false);
    const isPassword = type === "password";
    const inputId = id || props.name;

    return (
      <div className="space-y-1.5">
        {label && (
          <div className="flex items-center justify-between">
            <label htmlFor={inputId} className="text-[13px] font-semibold text-charcoal-700">
              {label}
            </label>
            {hint}
          </div>
        )}
        <div
          className={cn(
            "group flex h-12 items-center gap-2.5 rounded-xl border bg-white px-3.5 transition-all duration-200",
            "focus-within:border-coral focus-within:ring-4 focus-within:ring-coral/15",
            error ? "border-red-400 ring-4 ring-red-100" : "border-sand-200 hover:border-sand-300",
            props.disabled && "cursor-not-allowed bg-sand-50 hover:border-sand-200",
          )}
        >
          {icon && (
            <span className="text-charcoal-300 transition-colors group-focus-within:text-coral">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={isPassword && reveal ? "text" : type}
            className={cn(
              "h-full w-full bg-transparent text-[15px] text-charcoal placeholder:text-charcoal-300 focus:outline-none disabled:cursor-not-allowed disabled:text-charcoal-400",
              className,
            )}
            aria-invalid={Boolean(error)}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setReveal((v) => !v)}
              className="text-charcoal-300 transition-colors hover:text-charcoal"
              aria-label={reveal ? "Hide password" : "Show password"}
            >
              {reveal ? <EyeSlash size={18} weight="duotone" /> : <Eye size={18} weight="duotone" />}
            </button>
          )}
          {trailing}
        </div>
        {error && <p className="text-[12.5px] font-medium text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
