"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle, Coins, Heart, Infinity as InfinityIcon, X } from "@phosphor-icons/react";
import { formatInr } from "@/lib/constants/creditPacks";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { closeCelebration } from "@/lib/store/slices/creditsSlice";
import Confetti from "./Confetti";

/** Counts up to `to` with an ease-out curve. */
const useCountUp = (to: number, ms = 1200) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / ms, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, ms]);
  return value;
};

/** Shown after a successful credit purchase. */
const PurchaseCelebration = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const celebration = useAppSelector((s) => s.credits.celebration);
  const user = useAppSelector((s) => s.userDetails.user);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const added = useCountUp(celebration?.creditsAdded ?? 0);

  const close = () => dispatch(closeCelebration());

  useEffect(() => {
    if (!celebration) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dispatch(closeCelebration());
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [celebration, dispatch]);

  if (!celebration || !mounted) return null;
  const firstName = user?.name?.trim().split(/\s+/)[0];

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Payment successful">
      <div className="absolute inset-0 animate-fade-in bg-charcoal/50 backdrop-blur-sm" onClick={close} />
      <Confetti />

      <div className="relative w-full max-w-[440px] animate-fade-up overflow-hidden rounded-[28px] bg-white text-center shadow-2xl">
        <button
          onClick={close}
          className="absolute right-3 top-3 z-10 rounded-xl p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X size={18} weight="bold" />
        </button>

        <div className="relative overflow-hidden bg-charcoal px-8 pb-9 pt-10">
          <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-coral/50 blur-[70px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-56 w-56 rounded-full bg-tangerine/40 blur-[70px]" />

          <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-tangerine/30 [animation-duration:2s]" />
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient shadow-glow">
              <Coins size={40} weight="fill" className="text-white" />
            </span>
          </div>

          <span className="relative mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[12px] font-semibold text-emerald-300">
            <CheckCircle size={14} weight="fill" />
            Payment successful
          </span>
          <p className="relative mt-4 font-display text-[64px] font-medium leading-none tracking-[-0.03em] text-white">
            +{added.toLocaleString("en-IN")}
          </p>
          <p className="relative mt-2 text-[15px] font-medium text-white/70">credits added to your account</p>
        </div>

        <div className="px-8 pb-8 pt-7">
          <h2 className="font-display text-[26px] font-medium leading-tight tracking-[-0.02em] text-charcoal">
            Thank you{firstName ? `, ${firstName}` : ""}! <span className="italic text-coral">You&apos;re all set.</span>
          </h2>
          <p className="mx-auto mt-2 max-w-[340px] text-[14px] leading-relaxed text-charcoal-400">
            We&apos;re so glad to have you with us. Go find the creators who&apos;ll make your next campaign shine.
          </p>

          <div className="mt-6 divide-y divide-sand-100 rounded-2xl border border-sand-100 bg-cream/60 text-left text-[13px]">
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-charcoal-400">Pack</span>
              <span className="font-semibold text-charcoal">
                {celebration.packName} · {formatInr(celebration.amountInr)}
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-charcoal-400">New balance</span>
              <span className="inline-flex items-center gap-1 font-bold text-charcoal">
                <Coins size={14} weight="fill" className="text-tangerine" />
                {celebration.balance.toLocaleString("en-IN")} credits
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-2.5">
              <span className="text-charcoal-400">Payment ID</span>
              <span className="truncate font-mono text-[12px] text-charcoal-500">{celebration.paymentId}</span>
            </div>
          </div>

          <p className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-charcoal-400">
            <InfinityIcon size={15} weight="bold" className="text-coral" />
            Purchased credits never expire
          </p>

          <button
            onClick={() => {
              close();
              router.push("/dashboard/discover");
            }}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient text-[15px] font-semibold text-white shadow-glow transition hover:brightness-[1.04]"
          >
            Start discovering creators
            <ArrowRight size={18} weight="bold" />
          </button>
          <p className="mt-4 inline-flex items-center gap-1 text-[11.5px] text-charcoal-300">
            Made with <Heart size={12} weight="fill" className="text-coral" /> by the Kudozz team
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default PurchaseCelebration;
