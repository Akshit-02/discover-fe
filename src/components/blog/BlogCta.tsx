import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SIGNUP_HREF } from "@/components/landing/content";
import { cn } from "@/lib/utils/cn";

type Props = {
  headline: string;
  body: string;
  ctaLabel?: string;
  /** Becomes data-cta for analytics, e.g. "blog-mid-<slug>". */
  cta: string;
  variant?: "inline" | "end";
};

/** Product CTA inside articles. Copy is per-article and must stay within verified product facts. */
const BlogCta = ({ headline, body, ctaLabel = "Start Discovering Creators", cta, variant = "inline" }: Props) => (
  <aside
    aria-label="Kudozz Influencer Discovery"
    className={cn(
      "rounded-3xl border p-6 sm:p-8",
      variant === "end" ? "border-charcoal bg-charcoal text-white" : "border-coral-200 bg-coral-50 text-charcoal",
    )}
  >
    <p className={cn("text-[12px] font-bold uppercase tracking-[0.16em]", variant === "end" ? "text-tangerine" : "text-coral-700")}>
      Kudozz Influencer Discovery
    </p>
    <p className="mt-2 font-display text-[24px] font-medium leading-tight tracking-[-0.01em] sm:text-[28px]">{headline}</p>
    <p className={cn("mt-3 text-[15.5px] leading-relaxed", variant === "end" ? "text-white/70" : "text-charcoal-600")}>{body}</p>
    <Link
      href={SIGNUP_HREF}
      data-cta={cta}
      className="group mt-5 inline-flex h-12 items-center gap-2 rounded-2xl bg-brand-gradient px-5 text-[15px] font-semibold text-white shadow-glow transition hover:brightness-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
    >
      {ctaLabel}
      <ArrowRight size={16} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  </aside>
);

export default BlogCta;
