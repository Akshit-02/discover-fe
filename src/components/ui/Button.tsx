"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import Spinner from "./Spinner";

type Variant = "primary" | "dark" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-glow hover:brightness-[1.04] hover:shadow-[0_14px_34px_-10px_rgba(243,107,74,0.65)] active:brightness-95",
  dark: "bg-charcoal text-white hover:bg-charcoal-700 shadow-soft",
  secondary:
    "bg-white text-charcoal border border-sand-200 hover:border-sand-300 hover:bg-sand-50 shadow-soft",
  outline:
    "border border-coral/40 text-coral-600 hover:bg-coral-50 hover:border-coral",
  ghost: "text-charcoal-500 hover:text-charcoal hover:bg-sand-100",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5 rounded-xl",
  md: "h-11 px-5 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-[15px] gap-2 rounded-2xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      leftIcon,
      rightIcon,
      fullWidth,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex select-none items-center justify-center font-semibold tracking-[-0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading ? <Spinner className="h-4 w-4" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  ),
);

Button.displayName = "Button";
export default Button;
