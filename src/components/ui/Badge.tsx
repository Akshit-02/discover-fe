import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Tone = "neutral" | "coral" | "dark" | "success" | "warning" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-sand-100 text-charcoal-600",
  coral: "bg-coral-50 text-coral-700",
  dark: "bg-charcoal text-white",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-tangerine-50 text-tangerine-600",
  outline: "border border-sand-200 bg-white text-charcoal-600",
};

const Badge = ({
  tone = "neutral",
  icon,
  className,
  children,
}: {
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] font-semibold leading-none",
      tones[tone],
      className,
    )}
  >
    {icon}
    {children}
  </span>
);

export default Badge;
