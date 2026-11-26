"use client";

import { ReactNode } from "react";
import { Coins } from "@phosphor-icons/react";
import { useAppSelector } from "@/lib/store/hooks";
import { creditLabel } from "@/lib/utils/credits";
import BuyCreditsButton from "./BuyCreditsButton";

/** Shown in place of content the user can't afford. */
const OutOfCredits = ({
  title = "You're out of credits",
  description,
  action,
  compact,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
}) => {
  const { balance, expired } = useAppSelector((s) => s.credits);
  const text =
    description ??
    (expired && !balance
      ? "Your free credits have expired. Buy a credit pack to keep going."
      : `You have ${creditLabel(balance)} left, which isn't enough for this. Buy a credit pack to keep going.`);

  return (
    <div
      className={
        compact
          ? "flex flex-col items-center rounded-2xl border border-dashed border-sand-300 bg-white/70 px-5 py-8 text-center"
          : "flex flex-col items-center rounded-3xl border border-dashed border-sand-300 bg-white/60 px-6 py-16 text-center"
      }
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tangerine-50 text-tangerine shadow-soft">
        <Coins size={28} weight="duotone" />
      </span>
      <h3 className="mt-4 text-lg font-bold tracking-tight text-charcoal">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-charcoal-400">{text}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {action}
        <BuyCreditsButton />
      </div>
    </div>
  );
};

export default OutOfCredits;
