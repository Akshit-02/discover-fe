"use client";

import { useEffect, useRef, useState } from "react";
import { Coins, EnvelopeSimple, Phone, SlidersHorizontal, UserFocus } from "@phosphor-icons/react";
import { useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils/cn";
import { creditLabel, expiryLabel } from "@/lib/utils/credits";
import BuyCreditsButton from "./BuyCreditsButton";

/** Topbar balance pill with a popover explaining what credits are spent on. */
const CreditsMenu = () => {
  const { balance, expiresAt, expired, costs, loaded } = useAppSelector((s) => s.credits);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const low = loaded && balance < Math.max(costs.advancedFilter, costs.revealPhone);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const rows = [
    { icon: <SlidersHorizontal size={16} weight="duotone" />, label: "Advanced filters (per set)", cost: costs.advancedFilter },
    { icon: <UserFocus size={16} weight="duotone" />, label: "Open a creator profile", cost: costs.openProfile },
    { icon: <EnvelopeSimple size={16} weight="duotone" />, label: "Reveal email", cost: costs.revealEmail },
    { icon: <Phone size={16} weight="duotone" />, label: "Reveal phone", cost: costs.revealPhone },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-xl border bg-white px-3 text-[13px] font-semibold shadow-soft transition-colors",
          low ? "border-coral/50 text-coral-700" : "border-sand-200 text-charcoal hover:border-sand-300",
        )}
      >
        <Coins size={18} weight="duotone" className="text-tangerine" />
        {loaded ? (
          <span>
            {balance.toLocaleString()}
            <span className="hidden font-medium text-charcoal-400 sm:inline"> credits</span>
          </span>
        ) : (
          <span className="h-3 w-8 animate-pulse rounded bg-sand-100" />
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Credits"
          className="absolute right-0 mt-2 w-[300px] animate-fade-up overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-lift"
        >
          <div className="relative overflow-hidden bg-charcoal px-5 py-4 text-white">
            <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-coral/40 blur-[60px]" />
            <p className="relative text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Credit balance</p>
            <p className="relative mt-1 text-3xl font-bold tracking-tight">{balance.toLocaleString()}</p>
            {expiresAt && (
              <p className={cn("relative mt-0.5 text-xs", expired ? "text-coral-300" : "text-white/55")}>
                {expiryLabel(expiresAt, expired)}
              </p>
            )}
          </div>
          <div className="px-5 py-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-charcoal-300">What costs credits</p>
            <ul className="space-y-2">
              {rows.map((r) => (
                <li key={r.label} className="flex items-center gap-2.5 text-[13px] text-charcoal-600">
                  <span className="text-coral">{r.icon}</span>
                  {r.label}
                  <span className="ml-auto font-semibold text-charcoal">{r.cost}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11.5px] leading-relaxed text-charcoal-400">
              Profiles and contacts stay unlocked once paid for. Re-running the same filter set within 24 hours is
              free, and missing contacts are never charged.
            </p>
          </div>
          <div className="border-t border-sand-100 px-5 py-3">
            <BuyCreditsButton fullWidth />
            {low && (
              <p className="mt-2 text-center text-[11.5px] font-medium text-coral-700">
                {expired ? "Your credits have expired." : `Only ${creditLabel(balance)} left.`}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditsMenu;
