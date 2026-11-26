"use client";

import { FormEvent, ReactNode, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bug,
  CaretDown,
  ChatCircleText,
  Check,
  CheckCircle,
  Copy,
  EnvelopeSimple,
  Lightbulb,
  PaperPlaneTilt,
  Question,
  Smiley,
  Tray,
} from "@phosphor-icons/react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Skeleton from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toaster";
import { SUPPORT_EMAIL } from "@/config/brand";
import { getErrorMessage, listMySupportMessagesAPI, submitSupportMessageAPI } from "@/lib/graphql/handleApi";
import { SupportMessage, SupportMessageStatus, SupportMessageType } from "@/lib/models/support";
import { useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format";

const SUBJECT_MAX = 120;
const MESSAGE_MAX = 2000;

const TYPES: { value: SupportMessageType; label: string; icon: ReactNode; hint: string; placeholder: string }[] = [
  {
    value: "SUGGESTION",
    label: "Suggestion",
    icon: <Lightbulb size={18} weight="duotone" />,
    hint: "An idea to make Kudozz better",
    placeholder: "Tell us what you'd like to see and how it would help your campaigns…",
  },
  {
    value: "FEEDBACK",
    label: "Feedback",
    icon: <Smiley size={18} weight="duotone" />,
    hint: "What's working, what isn't",
    placeholder: "Share what you like or what could be better…",
  },
  {
    value: "QUERY",
    label: "Question",
    icon: <Question size={18} weight="duotone" />,
    hint: "Help with your account or credits",
    placeholder: "Describe your question in as much detail as you can…",
  },
  {
    value: "BUG",
    label: "Report a problem",
    icon: <Bug size={18} weight="duotone" />,
    hint: "Something looks broken",
    placeholder: "What happened, what did you expect, and which page were you on?",
  },
];

const TYPE_LABEL = Object.fromEntries(TYPES.map((t) => [t.value, t.label])) as Record<SupportMessageType, string>;

const STATUS: Record<SupportMessageStatus, { label: string; tone: "warning" | "coral" | "success" }> = {
  OPEN: { label: "Received", tone: "warning" },
  IN_PROGRESS: { label: "In progress", tone: "coral" },
  RESOLVED: { label: "Resolved", tone: "success" },
};

const FAQS = [
  {
    q: "How do credits work?",
    a: "Every new account gets 30 free credits, valid for 30 days from signup. Opening a creator profile uses 1 credit, revealing an email uses 1, revealing a phone number uses 2, and each advanced filter search uses 2.",
  },
  {
    q: "Will I be charged twice for the same creator?",
    a: "No. Once you've opened a profile or revealed a contact, it stays unlocked for you, so viewing it again is free. Re-running the same advanced filter search within 24 hours is also free.",
  },
  {
    q: "What if a creator has no email or phone?",
    a: "You're never charged for a contact that isn't available. The profile shows \"Not available\" and no credits are used.",
  },
  {
    q: "How do I get more credits?",
    a: "Use \"Buy more credits\" from the credits menu in the top bar, pick a pack and pay securely with UPI, card or netbanking via Razorpay. Credits are added straight away, and purchased credits never expire.",
  },
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sand-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 py-3.5 text-left text-[13.5px] font-semibold text-charcoal"
      >
        {q}
        <CaretDown
          size={14}
          weight="bold"
          className={cn("shrink-0 text-charcoal-300 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && <p className="-mt-1 pb-4 text-[13px] leading-relaxed text-charcoal-400">{a}</p>}
    </div>
  );
};

const ContactCard = () => {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopied(true);
      toast("Email copied");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast("Couldn't copy to clipboard", "error");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-charcoal p-6 text-white shadow-soft">
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-coral/40 blur-[70px]" />
      <div className="relative">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-tangerine">
          <EnvelopeSimple size={22} weight="duotone" />
        </span>
        <h2 className="mt-4 text-lg font-bold tracking-tight">Email us</h2>
        <p className="mt-1 text-[13.5px] leading-relaxed text-white/60">
          For anything account, billing or partnership related, write to us directly. We read every message.
        </p>
        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-1.5 pl-4">
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="min-w-0 flex-1 truncate text-[15px] font-semibold text-white hover:text-tangerine"
          >
            {SUPPORT_EMAIL}
          </a>
          <button
            onClick={copy}
            className="rounded-xl p-2.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Copy email address"
          >
            {copied ? <Check size={16} weight="bold" className="text-emerald-400" /> : <Copy size={16} weight="bold" />}
          </button>
        </div>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white text-[13.5px] font-semibold text-charcoal transition-colors hover:bg-cream"
        >
          <PaperPlaneTilt size={16} weight="bold" />
          Open in mail app
        </a>
      </div>
    </div>
  );
};

const MessageRow = ({ m }: { m: SupportMessage }) => {
  const [open, setOpen] = useState(false);
  const status = STATUS[m.status] ?? STATUS.OPEN;
  return (
    <li className="py-3.5">
      <button type="button" onClick={() => setOpen((v) => !v)} className="w-full text-left" aria-expanded={open}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-charcoal">{m.subject}</p>
            <p className="mt-0.5 text-[12px] text-charcoal-400">
              {TYPE_LABEL[m.type]} · {formatDate(m.createdAt)}
            </p>
          </div>
          <Badge tone={status.tone}>{status.label}</Badge>
        </div>
        <p
          className={cn(
            "mt-2 whitespace-pre-line text-[13px] leading-relaxed text-charcoal-500",
            !open && "line-clamp-2",
          )}
        >
          {m.message}
        </p>
      </button>
    </li>
  );
};

const SupportView = () => {
  const toast = useToast();
  const pathname = usePathname();
  const user = useAppSelector((s) => s.userDetails.user);
  const [type, setType] = useState<SupportMessageType>("SUGGESTION");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ subject?: string; message?: string }>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [history, setHistory] = useState<SupportMessage[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const active = TYPES.find((t) => t.value === type) ?? TYPES[0];

  const loadHistory = useCallback(async () => {
    try {
      setHistory(await listMySupportMessagesAPI());
    } catch {
      /* the form still works without history */
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const validate = () => {
    const next: typeof errors = {};
    if (subject.trim().length < 3) next.subject = "Add a short subject (at least 3 characters)";
    if (message.trim().length < 10) next.message = "Tell us a little more (at least 10 characters)";
    setErrors(next);
    return !Object.keys(next).length;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const saved = await submitSupportMessageAPI({ type, subject, message, page: pathname });
      setHistory((h) => [saved, ...h]);
      setSubject("");
      setMessage("");
      setErrors({});
      setSent(true);
    } catch (error) {
      toast(getErrorMessage(error, "Couldn't send your message"), "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1180px] space-y-6">
      <div className="animate-fade-up">
        <h1 className="font-display text-[34px] font-medium leading-tight tracking-[-0.02em] text-charcoal sm:text-[40px]">
          How can we <span className="italic text-coral">help</span>?
        </h1>
        <p className="mt-1.5 max-w-xl text-[15px] text-charcoal-400">
          Send us a suggestion, feedback or a question. Every message goes straight to the Kudozz team.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-sand-200/80 bg-white p-6 shadow-soft sm:p-7">
            {sent ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <CheckCircle size={34} weight="duotone" />
                </span>
                <h2 className="mt-5 text-xl font-bold tracking-tight text-charcoal">Thanks, we&apos;ve got it!</h2>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-charcoal-400">
                  Your message has been sent to the Kudozz team.
                  {user?.email ? (
                    <>
                      {" "}
                      If we need to follow up, we&apos;ll email you at{" "}
                      <span className="font-semibold text-charcoal">{user.email}</span>.
                    </>
                  ) : null}
                </p>
                <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral-50 text-coral">
                    <ChatCircleText size={20} weight="duotone" />
                  </span>
                  <div>
                    <h2 className="text-[16px] font-bold tracking-tight text-charcoal">Send us a message</h2>
                    <p className="text-xs text-charcoal-400">Suggestions, feedback, questions or problems</p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[13px] font-semibold text-charcoal-700">What is this about?</p>
                  <div role="radiogroup" aria-label="Message type" className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {TYPES.map((t) => {
                      const on = t.value === type;
                      return (
                        <button
                          key={t.value}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => setType(t.value)}
                          className={cn(
                            "flex flex-col items-start gap-1.5 rounded-2xl border p-3 text-left transition-all",
                            on
                              ? "border-coral bg-coral-50/60 shadow-[0_0_0_3px_rgba(243,107,74,0.1)]"
                              : "border-sand-200 hover:border-sand-300",
                          )}
                        >
                          <span className={on ? "text-coral" : "text-charcoal-400"}>{t.icon}</span>
                          <span className="text-[13px] font-bold text-charcoal">{t.label}</span>
                          <span className="text-[11.5px] leading-snug text-charcoal-400">{t.hint}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Input
                  label="Subject"
                  name="subject"
                  placeholder="A short summary"
                  value={subject}
                  maxLength={SUBJECT_MAX}
                  onChange={(e) => setSubject(e.target.value)}
                  error={errors.subject}
                />

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="support-message" className="text-[13px] font-semibold text-charcoal-700">
                      Message
                    </label>
                    <span
                      className={cn(
                        "text-[11.5px] font-medium",
                        message.length > MESSAGE_MAX * 0.9 ? "text-coral-600" : "text-charcoal-300",
                      )}
                    >
                      {message.length}/{MESSAGE_MAX}
                    </span>
                  </div>
                  <textarea
                    id="support-message"
                    rows={6}
                    value={message}
                    maxLength={MESSAGE_MAX}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={active.placeholder}
                    aria-invalid={Boolean(errors.message)}
                    className={cn(
                      "block w-full resize-y rounded-xl border bg-white px-3.5 py-3 text-[15px] leading-relaxed text-charcoal transition-all placeholder:text-charcoal-300 focus:border-coral focus:outline-none focus:ring-4 focus:ring-coral/15",
                      errors.message ? "border-red-400 ring-4 ring-red-100" : "border-sand-200 hover:border-sand-300",
                    )}
                  />
                  {errors.message && <p className="text-[12.5px] font-medium text-red-600">{errors.message}</p>}
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-sand-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[12px] text-charcoal-400">
                    {user?.email ? (
                      <>
                        We&apos;ll reply to <span className="font-semibold text-charcoal">{user.email}</span>
                      </>
                    ) : (
                      "We'll reply to your account email"
                    )}
                  </p>
                  <Button type="submit" loading={sending} rightIcon={<PaperPlaneTilt size={16} weight="bold" />}>
                    Send message
                  </Button>
                </div>
              </form>
            )}
          </section>

          <section className="rounded-3xl border border-sand-200/80 bg-white p-6 shadow-soft sm:p-7">
            <h2 className="text-[16px] font-bold tracking-tight text-charcoal">Your messages</h2>
            <p className="text-xs text-charcoal-400">Your 20 most recent messages and their status</p>
            {historyLoading ? (
              <div className="mt-4 space-y-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-2xl" />
                ))}
              </div>
            ) : history.length ? (
              <ul className="mt-2 divide-y divide-sand-100">
                {history.map((m) => (
                  <MessageRow key={m.id} m={m} />
                ))}
              </ul>
            ) : (
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-sand-300 px-4 py-5 text-[13px] text-charcoal-400">
                <Tray size={22} weight="duotone" className="shrink-0 text-charcoal-300" />
                You haven&apos;t sent us anything yet. Messages you send will show up here.
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <ContactCard />
          <section className="rounded-3xl border border-sand-200/80 bg-white px-6 pb-2 pt-5 shadow-soft">
            <h2 className="text-[16px] font-bold tracking-tight text-charcoal">Common questions</h2>
            <div className="mt-1">
              {FAQS.map((f) => (
                <FaqItem key={f.q} {...f} />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default SupportView;
