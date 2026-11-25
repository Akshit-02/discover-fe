import { ReactNode } from "react";
import Link from "next/link";
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

const AuthLayout = ({ title, subtitle, children, footer, badge }: AuthLayoutProps) => (
  <main className="min-h-screen bg-cream p-3 sm:p-4">
    <div className="grid min-h-[calc(100vh-2rem)] gap-4 lg:grid-cols-[1fr_1.05fr]">
      <section className="flex flex-col px-4 py-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between gap-4">
          <Link href="/login" aria-label="Kudozz Influencer Discovery">
            <Logo />
          </Link>
          <a
            href={PARENT_SITE_URL}
            className="text-[13px] font-semibold text-charcoal-400 transition-colors hover:text-charcoal"
          >
            {PARENT_SITE_LABEL} ↗
          </a>
        </div>
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-10">
          {badge}
          <h1 className="font-display text-[38px] font-medium leading-[1.1] tracking-[-0.02em] text-charcoal">
            {title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-charcoal-400">{subtitle}</p>
          <div className="mt-8 animate-fade-up">{children}</div>
          {footer && <div className="mt-8 text-center text-sm text-charcoal-400">{footer}</div>}
        </div>
        <p className="text-xs text-charcoal-300">
          © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </p>
      </section>
      <AuthShowcase />
    </div>
  </main>
);

export default AuthLayout;
