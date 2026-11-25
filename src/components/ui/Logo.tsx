import { cn } from "@/lib/utils/cn";
import { PRODUCT_NAME } from "@/config/brand";

interface MarkProps {
  className?: string;
  accent?: string;
}

/** The Kudozz logomark: a solid spine (currentColor) with its two arms broken away in the accent color. */
export const KudozzMark = ({ className, accent = "#F36B4A" }: MarkProps) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <rect x="7" y="4" width="5" height="24" rx="1" fill="currentColor" />
    <polygon
      points="14,15 24,5 27,5 17,15"
      fill={accent}
      className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    />
    <polygon
      points="14,17 24,27 27,27 17,17"
      fill={accent}
      className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:translate-y-0.5"
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    />
  </svg>
);

/** App-icon version of the mark on an ink tile, matching the Kudozz favicon. */
export const LogoMark = ({ className }: { className?: string }) => (
  <span
    className={cn(
      "relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-charcoal text-cream shadow-soft",
      className,
    )}
  >
    <KudozzMark className="h-[68%] w-[68%]" />
  </span>
);

export const KudozzWordmark = ({ className }: { className?: string }) => (
  <span className={cn("font-display tracking-tight", className)}>
    Kudo<span className="text-coral">zz</span>
  </span>
);

interface LogoProps {
  className?: string;
  tone?: "dark" | "light";
  showWordmark?: boolean;
  showProduct?: boolean;
}

const Logo = ({ className, tone = "dark", showWordmark = true, showProduct = true }: LogoProps) => (
  <span className={cn("group inline-flex items-center gap-2", className)}>
    <KudozzMark className={cn("h-9 w-9 shrink-0", tone === "dark" ? "text-charcoal" : "text-cream")} />
    {showWordmark && (
      <span className="flex flex-col">
        <KudozzWordmark
          className={cn(
            "text-[24px] font-semibold leading-none",
            tone === "dark" ? "text-charcoal" : "text-cream",
          )}
        />
        {showProduct && (
          <span
            className={cn(
              "mt-1 text-[9.5px] font-bold uppercase leading-none tracking-[0.18em]",
              tone === "dark" ? "text-charcoal-400" : "text-white/45",
            )}
          >
            {PRODUCT_NAME}
          </span>
        )}
      </span>
    )}
  </span>
);

export default Logo;
