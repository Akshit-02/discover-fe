"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const LandingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled || open ? "border-b border-sand-200/70 bg-cream/85 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="Kudozz Influencer Discovery home" className="group">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-xl px-3.5 py-2 text-[14px] font-semibold text-charcoal-500 transition-colors hover:bg-white/70 hover:text-charcoal"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden rounded-xl px-3.5 py-2 text-[14px] font-semibold text-charcoal transition-colors hover:bg-white/70 sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl bg-charcoal px-4 text-[13.5px] font-semibold text-white shadow-soft transition-colors hover:bg-charcoal-700"
          >
            Start free
            <ArrowRight size={14} weight="bold" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl p-2 text-charcoal md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-sand-200/70 px-4 pb-4 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 text-[15px] font-semibold text-charcoal"
            >
              {l.label}
            </a>
          ))}
          <Link href="/login" className="block rounded-xl px-3 py-3 text-[15px] font-semibold text-charcoal">
            Sign in
          </Link>
        </div>
      )}
    </header>
  );
};

export default LandingNav;
