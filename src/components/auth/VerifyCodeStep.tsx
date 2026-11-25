"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, EnvelopeSimpleOpen } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import OtpInput from "@/components/ui/OtpInput";
import FormAlert from "./FormAlert";

interface VerifyCodeStepProps {
  email: string;
  submitLabel: string;
  loading: boolean;
  error?: string | null;
  onSubmit: (code: string) => void;
  onResend: () => Promise<void>;
  onBack: () => void;
  children?: React.ReactNode;
  canSubmit?: boolean;
}

const RESEND_SECONDS = 30;

const VerifyCodeStep = ({
  email,
  submitLabel,
  loading,
  error,
  onSubmit,
  onResend,
  onBack,
  children,
  canSubmit = true,
}: VerifyCodeStepProps) => {
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (code.length === 6) onSubmit(code);
  };

  const resend = async () => {
    setResending(true);
    try {
      await onResend();
      setCooldown(RESEND_SECONDS);
    } finally {
      setResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 rounded-2xl border border-sand-200 bg-white p-3.5 shadow-soft">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-coral-50">
          <EnvelopeSimpleOpen size={24} weight="duotone" className="text-coral" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium text-charcoal-400">Code sent to</p>
          <p className="truncate text-sm font-semibold text-charcoal">{email}</p>
        </div>
      </div>

      <FormAlert message={error} />

      <div className="space-y-2">
        <p className="text-[13px] font-semibold text-charcoal-700">6-digit verification code</p>
        <OtpInput value={code} onChange={setCode} error={Boolean(error)} autoFocus />
      </div>

      {children}

      <Button type="submit" size="lg" fullWidth loading={loading} disabled={code.length !== 6 || !canSubmit}>
        {submitLabel}
      </Button>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 font-semibold text-charcoal-400 transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={16} weight="bold" /> Back
        </button>
        <button
          type="button"
          onClick={resend}
          disabled={cooldown > 0 || resending}
          className="font-semibold text-coral-600 transition-colors hover:text-coral-700 disabled:text-charcoal-300"
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : resending ? "Sending…" : "Resend code"}
        </button>
      </div>
    </form>
  );
};

export default VerifyCodeStep;
