import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Logo from "@/components/ui/Logo";
import { BRAND_NAME, PARENT_SITE_LABEL, PARENT_SITE_URL } from "@/config/brand";
import AuthShowcase from "./AuthShowcase";

interface AuthLayoutProps {
  title: ReactNode;
  subtitle: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  badge?: ReactNode;
}

/**
 * Exactly one viewport tall, so the page never scrolls. A form taller than the
 * screen (e.g. signup on a short laptop) scrolls inside its own column instead.
 */
const AuthLayout = ({ title, subtitle, children, footer, badge }: AuthLayoutProps) => (
  <main className="h-dvh overflow-hidden bg-cream p-3">
    <div className="grid h-full gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
      <section className="flex min-h-0 flex-col px-4 py-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex shrink-0 items-center justify-between gap-4">
          <Link href="/login" aria-label="Kudozz Influencer Discovery">
            <Logo />
          </Link>
          <a
            href={PARENT_SITE_URL}
            className="inline-flex items-center gap-1 rounded-full border border-sand-200 bg-white/70 px-3 py-1.5 text-[12.5px] font-semibold text-charcoal-500 transition-colors hover:border-sand-300 hover:text-charcoal"
          >
            {PARENT_SITE_LABEL}
            <ArrowUpRight size={12} weight="bold" />
          </a>
        </div>

        <div className="scrollbar-thin -mx-2 flex min-h-0 flex-1 flex-col overflow-y-auto px-2">
          <div className="m-auto w-full max-w-[400px] py-6">
            {badge}
            <h1 className="font-display text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-charcoal sm:text-[38px]">
              {title}
            </h1>
            <p className="mt-2.5 text-[15px] leading-relaxed text-charcoal-400">{subtitle}</p>
            <div className="mt-7 animate-fade-up">{children}</div>
            {footer && (
              <div className="mt-7 border-t border-sand-200/80 pt-5 text-center text-sm text-charcoal-400">
                {footer}
              </div>
            )}
          </div>
        </div>

        <p className="shrink-0 text-xs text-charcoal-300">
          © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </p>
      </section>
      <AuthShowcase />
    </div>
  </main>
);

export default AuthLayout;
