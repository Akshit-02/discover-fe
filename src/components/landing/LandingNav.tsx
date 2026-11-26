"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils/cn";
import { LOGIN_HREF, SIGNUP_HREF } from "./content";

// Root-relative so the nav also works on /blog pages; on the homepage these still scroll in place.
const LINKS = [
  { href: "/#top", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQs" },
  { href: "/blog", label: "Blog" },
];

const LandingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const close = () => window.innerWidth >= 768 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open ? "border-b border-sand-200/70 bg-cream/90 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="Kudozz Influencer Discovery — home" className="group shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-xl px-3 py-2 text-[14px] font-semibold text-charcoal-500 transition-colors hover:bg-white/70 hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <Link
            href={LOGIN_HREF}
            data-cta="login"
            className="hidden rounded-xl px-3.5 py-2 text-[14px] font-semibold text-charcoal transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 sm:block"
          >
            Login
          </Link>
          <Link
            href={SIGNUP_HREF}
            data-cta="signup-nav"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl bg-charcoal px-4 text-[13.5px] font-semibold text-white shadow-soft transition-colors hover:bg-charcoal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            Start Free
            <ArrowRight size={14} weight="bold" aria-hidden />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl p-2 text-charcoal hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} weight="bold" aria-hidden /> : <List size={22} weight="bold" aria-hidden />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-sand-200/70 px-4 pb-4 pt-2 md:hidden">
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-[15px] font-semibold text-charcoal hover:bg-white/70"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href={LOGIN_HREF}
              data-cta="login"
              className="block rounded-xl px-3 py-3 text-[15px] font-semibold text-charcoal hover:bg-white/70"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default LandingNav;
