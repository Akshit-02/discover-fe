"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Coins, Crown, LockSimple, ShieldCheck, Sparkle, WarningCircle } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { CREDIT_PACKS, CreditPack, formatInr, perCredit, savingsPercent } from "@/lib/constants/creditPacks";
import { createCreditOrderAPI, getErrorMessage, verifyCreditPaymentAPI } from "@/lib/graphql/handleApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { celebratePurchase, closeBuyCredits, fetchCredits, setCredits } from "@/lib/store/slices/creditsSlice";
import { cn } from "@/lib/utils/cn";
import { loadRazorpay, openRazorpay } from "@/lib/utils/razorpay";

const DEFAULT_PACK = CREDIT_PACKS.find((p) => p.popular)?.id ?? CREDIT_PACKS[0].id;

const PackCard = ({ pack, selected, onSelect }: { pack: CreditPack; selected: boolean; onSelect: () => void }) => {
  const savings = savingsPercent(pack);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "relative flex flex-col rounded-2xl border bg-white p-4 text-left transition-all",
        selected
          ? "border-coral shadow-[0_0_0_4px_rgba(243,107,74,0.12)]"
          : "border-sand-200 hover:border-sand-300 hover:shadow-soft",
        pack.popular && "pt-6",
      )}
    >
      {pack.popular && (
        <span className="absolute -top-2.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-brand-gradient px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white shadow-glow">
          <Crown size={11} weight="fill" />
          Most popular
        </span>
      )}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-bold text-charcoal">{pack.name}</span>
        <span
          className={cn(
            "flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 transition-colors",
            selected ? "border-coral bg-coral" : "border-sand-300",
          )}
        >
          {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
        </span>
      </div>
      <p className="mt-0.5 text-[11.5px] text-charcoal-400">{pack.tagline}</p>

      <p className="mt-4 flex items-baseline gap-1.5">
        <span className="text-[26px] font-bold leading-none tracking-tight text-charcoal">
          {pack.credits.toLocaleString("en-IN")}
        </span>
        <span className="text-[12px] font-semibold text-charcoal-400">credits</span>
      </p>
      <p className="mt-2 text-[17px] font-bold text-charcoal">{formatInr(pack.priceInr)}</p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-sand-100 pt-3">
        <span className="text-[11.5px] font-medium text-charcoal-400">{formatInr(perCredit(pack), 2)} / credit</span>
        {savings > 0 && (
          <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10.5px] font-bold text-emerald-700">
            Save {savings}%
          </span>
        )}
      </div>
    </button>
  );
};

type PayState = "idle" | "starting" | "checkout" | "verifying";

/** Credit packs → Razorpay Checkout → server-side verification → celebration. */
const BuyCreditsModal = () => {
  const dispatch = useAppDispatch();
  const { buyOpen, balance, costs } = useAppSelector((s) => s.credits);
  const [selectedId, setSelectedId] = useState<CreditPack["id"]>(DEFAULT_PACK);
  const [payState, setPayState] = useState<PayState>("idle");
  const [notice, setNotice] = useState<{ tone: "error" | "info"; text: string } | null>(null);
  const selected = CREDIT_PACKS.find((p) => p.id === selectedId) ?? CREDIT_PACKS[0];
  const busy = payState !== "idle";
  const close = () => {
    if (payState === "verifying") return; // don't lose the confirmation mid-flight
    dispatch(closeBuyCredits());
  };

  useEffect(() => {
    if (!buyOpen) return;
    setSelectedId(DEFAULT_PACK);
    setPayState("idle");
    setNotice(null);
    loadRazorpay().catch(() => undefined); // warm up so Checkout opens instantly
  }, [buyOpen]);

  const pay = async () => {
    setNotice(null);
    setPayState("starting");
    try {
      const [order] = await Promise.all([createCreditOrderAPI(selected.id), loadRazorpay()]);
      setPayState("checkout");
      openRazorpay(
        {
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          order_id: order.orderId,
          name: "Kudozz",
          description: `${order.packName} pack · ${order.credits.toLocaleString("en-IN")} credits`,
          prefill: {
            name: order.prefillName ?? undefined,
            email: order.prefillEmail ?? undefined,
            contact: order.prefillContact ?? undefined,
          },
          theme: { color: "#F36B4A" },
          modal: { ondismiss: () => setPayState("idle"), confirm_close: true },
          handler: async (response) => {
            setPayState("verifying");
            try {
              const result = await verifyCreditPaymentAPI(
                response.razorpay_order_id,
                response.razorpay_payment_id,
                response.razorpay_signature,
              );
              dispatch(setCredits(result.credits));
              dispatch(
                celebratePurchase({
                  packName: result.packName,
                  creditsAdded: result.creditsAdded,
                  amountInr: order.amount / 100,
                  paymentId: response.razorpay_payment_id,
                  balance: result.credits.balance,
                }),
              );
              setPayState("idle");
            } catch {
              // The payment went through; the webhook will add the credits even if this check failed.
              setPayState("idle");
              setNotice({
                tone: "info",
                text: `Payment received (ID ${response.razorpay_payment_id}). We're confirming it — your credits will appear in a minute or two. If they don't, email connect@kudozz.in with this ID.`,
              });
              setTimeout(() => dispatch(fetchCredits()), 8000);
            }
          },
        },
        (failure) => {
          setNotice({
            tone: "error",
            text: failure.error?.description || "The payment didn't go through. No money was taken — please try again.",
          });
        },
      );
    } catch (error) {
      setPayState("idle");
      setNotice({ tone: "error", text: getErrorMessage(error, "Couldn't start the payment. Please try again.") });
    }
  };

  const uses = [
    { label: "profile unlocks", value: Math.floor(selected.credits / costs.openProfile) },
    { label: "email reveals", value: Math.floor(selected.credits / costs.revealEmail) },
    { label: "filtered searches", value: Math.floor(selected.credits / costs.advancedFilter) },
  ];

  return (
    <Modal
      open={buyOpen}
      onClose={close}
      size="lg"
      title={
        <span className="flex items-center gap-2">
          <Coins size={22} weight="duotone" className="text-tangerine" />
          Buy credits
        </span>
      }
      description={
        <>
          You have <b className="font-semibold text-charcoal">{balance.toLocaleString("en-IN")} credits</b>. Pick a
          pack to top up. Bigger packs cost less per credit.
        </>
      }
      footer={
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[13px] text-charcoal-400">
            <span className="font-semibold text-charcoal">
              {selected.name} · {selected.credits.toLocaleString("en-IN")} credits
            </span>
            <span className="mx-1.5 text-charcoal-200">|</span>
            Total <span className="font-bold text-charcoal">{formatInr(selected.priceInr)}</span>
          </div>
          <div className="flex flex-col items-stretch gap-1 sm:items-end">
            <Button onClick={pay} loading={busy} leftIcon={busy ? undefined : <LockSimple size={16} weight="bold" />}>
              {payState === "verifying" ? "Confirming payment…" : `Pay ${formatInr(selected.priceInr)}`}
            </Button>
            <span className="inline-flex items-center justify-center gap-1 text-[11.5px] font-medium text-charcoal-400 sm:justify-end">
              <ShieldCheck size={13} weight="fill" className="text-emerald-500" />
              Secure payment by Razorpay · UPI, cards, netbanking
            </span>
          </div>
        </div>
      }
    >
      {notice && (
        <div
          role="alert"
          className={cn(
            "mb-4 flex items-start gap-2.5 rounded-2xl px-4 py-3 text-[13px] leading-relaxed",
            notice.tone === "error" ? "bg-red-50 text-red-700" : "bg-tangerine-50 text-charcoal-600",
          )}
        >
          <WarningCircle size={18} weight="fill" className="mt-0.5 shrink-0" />
          {notice.text}
        </div>
      )}
      <div role="radiogroup" aria-label="Credit packs" className="grid grid-cols-2 gap-3 pt-2 md:grid-cols-4">
        {CREDIT_PACKS.map((pack) => (
          <PackCard
            key={pack.id}
            pack={pack}
            selected={pack.id === selectedId}
            onSelect={() => !busy && setSelectedId(pack.id)}
          />
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-cream px-4 py-3.5">
        <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-charcoal-400">
          <Sparkle size={13} weight="fill" className="text-coral" />
          {selected.credits.toLocaleString("en-IN")} credits gets you up to
        </p>
        <div className="mt-2 grid grid-cols-3 gap-3">
          {uses.map((u) => (
            <div key={u.label}>
              <p className="text-[17px] font-bold tracking-tight text-charcoal">{u.value.toLocaleString("en-IN")}</p>
              <p className="text-[11.5px] text-charcoal-400">{u.label}</p>
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-4 space-y-1.5 text-[12.5px] text-charcoal-500">
        {[
          "Credits are added to your balance as soon as payment completes",
          "Purchased credits never expire",
          "Unlocked profiles and contacts stay unlocked",
          "Missing contacts are never charged",
        ].map((t) => (
          <li key={t} className="flex items-center gap-2">
            <CheckCircle size={15} weight="fill" className="shrink-0 text-emerald-500" />
            {t}
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default BuyCreditsModal;
