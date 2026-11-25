"use client";

import { createPortal } from "react-dom";
import { nicheLabel } from "@/lib/constants/niches";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowSquareOut,
  Check,
  Copy,
  EnvelopeSimple,
  Eye,
  GenderIntersex,
  Handshake,
  Heart,
  ImagesSquare,
  Lightning,
  LockSimple,
  MapPin,
  Phone,
  Repeat,
  SealCheck,
  Translate,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import CreatorAvatar from "@/components/creators/CreatorAvatar";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toaster";
import Skeleton from "@/components/ui/Skeleton";
import Spinner from "@/components/ui/Spinner";
import OutOfCredits from "@/components/credits/OutOfCredits";
import {
  getErrorMessage,
  isInsufficientCredits,
  openCreatorProfileAPI,
  revealCreatorContactAPI,
} from "@/lib/graphql/handleApi";
import { ContactField, Creator } from "@/lib/models/creator";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCredits } from "@/lib/store/slices/creditsSlice";
import { creditLabel } from "@/lib/utils/credits";
import { cn } from "@/lib/utils/cn";
import {
  compactList,
  displayName,
  engagementQuality,
  formatCompact,
  formatPercent,
  getTier,
  instagramUrl,
  locationLabel,
  titleCase,
} from "@/lib/utils/format";
import AddToListButton from "@/components/lists/AddToListButton";

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) => (
  <section className="space-y-3">
    <h3 className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-charcoal-400">
      {icon}
      {title}
    </h3>
    {children}
  </section>
);

const Stat = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl border border-sand-100 bg-white p-3.5">
    <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-charcoal-400">
      {icon}
      {label}
    </p>
    <p className="mt-1 text-lg font-bold tracking-tight text-charcoal">
      {value}
    </p>
  </div>
);

const qualityColors = {
  great: "from-emerald-400 to-emerald-500",
  good: "from-coral to-tangerine",
  ok: "from-tangerine-300 to-tangerine",
  low: "from-sand-300 to-sand-400",
  neutral: "from-sand-300 to-sand-400",
};

const CopyRow = ({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value?: string | null;
  href?: string;
}) => {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  if (!value) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast(`${label} copied`);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast("Couldn't copy to clipboard", "error");
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-sand-100 bg-white p-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral-50 text-coral">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11.5px] font-medium text-charcoal-400">{label}</p>
        {href ? (
          <a
            href={href}
            className="block truncate text-sm font-semibold text-charcoal hover:text-coral-600"
          >
            {value}
          </a>
        ) : (
          <p className="truncate text-sm font-semibold text-charcoal">
            {value}
          </p>
        )}
      </div>
      <button
        onClick={copy}
        className="rounded-lg p-2 text-charcoal-300 transition-colors hover:bg-sand-50 hover:text-charcoal"
        aria-label={`Copy ${label}`}
      >
        {copied ? (
          <Check size={17} weight="bold" className="text-emerald-600" />
        ) : (
          <Copy size={17} weight="duotone" />
        )}
      </button>
    </div>
  );
};

type ContactState = {
  value: string | null;
  revealed: boolean;
  available: boolean;
};

/** Locked contact: "Not available" when missing, otherwise a paid Reveal button. */
const LockedContactRow = ({
  icon,
  label,
  available,
  cost,
  revealing,
  onReveal,
}: {
  icon: ReactNode;
  label: string;
  available: boolean;
  cost: number;
  revealing: boolean;
  onReveal: () => void;
}) => (
  <div className="flex items-center gap-3 rounded-2xl border border-sand-100 bg-white p-3">
    <span
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
        available ? "bg-coral-50 text-coral" : "bg-sand-50 text-charcoal-300",
      )}
    >
      {icon}
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-[11.5px] font-medium text-charcoal-400">{label}</p>
      {available ? (
        <p className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-charcoal-300">
          <LockSimple size={13} weight="bold" />
          ••••••••••
        </p>
      ) : (
        <p className="text-sm font-medium text-charcoal-300">Not available</p>
      )}
    </div>
    {available && (
      <button
        onClick={onReveal}
        disabled={revealing}
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-charcoal px-3 text-[12.5px] font-semibold text-white transition-colors hover:bg-charcoal-700 disabled:opacity-60"
      >
        {revealing ? (
          <Spinner className="h-3.5 w-3.5" />
        ) : (
          <Eye size={14} weight="bold" />
        )}
        Reveal
        <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[10.5px] font-bold">
          {creditLabel(cost)}
        </span>
      </button>
    )}
  </div>
);

type ProfileStatus = "loading" | "ready" | "locked" | "error";

const CreatorDrawer = ({
  creator,
  onClose,
}: {
  creator: Creator | null;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const costs = useAppSelector((s) => s.credits.costs);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<ProfileStatus>("loading");
  const [error, setError] = useState("");
  const [details, setDetails] = useState<Creator | null>(null);
  const [contacts, setContacts] = useState<Record<ContactField, ContactState>>({
    EMAIL: { value: null, revealed: false, available: false },
    PHONE: { value: null, revealed: false, available: false },
  });
  const [revealing, setRevealing] = useState<ContactField | null>(null);
  const activeId = useRef<string | null>(null);
  useEffect(() => setMounted(true), []);

  // Opening a profile costs credits the first time; the server makes repeat opens free.
  const load = useCallback(
    async (target: Creator) => {
      activeId.current = target.id;
      setStatus("loading");
      setDetails(null);
      setRevealing(null);
      setContacts({
        EMAIL: { value: null, revealed: false, available: target.hasEmail },
        PHONE: { value: null, revealed: false, available: target.hasPhone },
      });
      try {
        const profile = await openCreatorProfileAPI(target.id);
        if (activeId.current !== target.id) return;
        dispatch(setCredits(profile.credits));
        setDetails(profile.creator);
        setContacts({
          EMAIL: {
            value: profile.email ?? null,
            revealed: profile.emailRevealed,
            available: profile.creator.hasEmail,
          },
          PHONE: {
            value: profile.phone ?? null,
            revealed: profile.phoneRevealed,
            available: profile.creator.hasPhone,
          },
        });
        setStatus("ready");
      } catch (err) {
        if (activeId.current !== target.id) return;
        setError(getErrorMessage(err, "Couldn't open this profile"));
        setStatus(isInsufficientCredits(err) ? "locked" : "error");
      }
    },
    [dispatch],
  );

  // Keyed on id so a re-rendered row object doesn't re-open the profile.
  useEffect(() => {
    if (creator) load(creator);
    else activeId.current = null;
  }, [creator?.id, load]); // eslint-disable-line react-hooks/exhaustive-deps

  const reveal = async (field: ContactField) => {
    if (!creator || revealing) return;
    const id = creator.id;
    setRevealing(field);
    try {
      const result = await revealCreatorContactAPI(id, field);
      if (activeId.current !== id) return;
      dispatch(setCredits(result.credits));
      setContacts((c) => ({
        ...c,
        [field]: {
          value: result.value ?? null,
          revealed: result.available,
          available: result.available,
        },
      }));
      const label = field === "EMAIL" ? "Email" : "Phone";
      if (!result.available)
        toast(
          `${label} isn't available for this creator — no credits used`,
          "info",
        );
    } catch (err) {
      if (activeId.current !== id) return;
      toast(
        isInsufficientCredits(err)
          ? "Not enough credits to reveal this"
          : getErrorMessage(err, "Couldn't reveal contact"),
        "error",
      );
    } finally {
      if (activeId.current === id) setRevealing(null);
    }
  };

  useEffect(() => {
    if (!creator) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [creator, onClose]);

  if (!creator || !mounted) return null;

  const name = displayName(creator);
  const data = details ?? creator;
  const tier = getTier(creator.followers);
  const quality = engagementQuality(data.avgEngagementRate);
  const erWidth = Math.min(((data.avgEngagementRate ?? 0) / 10) * 100, 100);
  const niches = compactList(data.niches);
  const languages = compactList(data.languages);
  const collabs = compactList(data.collaborationTypes);
  const location = status === "ready" ? locationLabel(data) : "";

  // Portal to <body> so page layout (spacing, transforms) can't offset the fixed overlay.
  return createPortal(
    <div
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label={`${name} profile`}
    >
      <div
        className="absolute inset-0 animate-fade-in bg-charcoal/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[540px] animate-slide-in flex-col bg-cream shadow-2xl">
        <div className="relative shrink-0 overflow-hidden bg-charcoal px-6 pb-6 pt-5">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-coral/45 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-tangerine/25 blur-[70px]" />
          <div className="relative flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
              Creator profile
            </span>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X size={20} weight="bold" />
            </button>
          </div>
          <div className="relative mt-4 flex items-center gap-4">
            <CreatorAvatar
              name={name}
              username={creator.username}
              size="xl"
              className="ring-4 ring-white/10"
            />
            <div className="min-w-0">
              <h2 className="flex items-center gap-1.5 text-2xl font-bold tracking-tight text-white">
                <span className="truncate">{name}</span>
                {creator.isVerified && (
                  <SealCheck
                    size={22}
                    weight="fill"
                    className="shrink-0 text-tangerine"
                  />
                )}
              </h2>
              <a
                href={instagramUrl(creator.username)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-flex items-center gap-1 text-sm font-medium text-white/60 hover:text-white"
              >
                @{creator.username}
                <ArrowSquareOut size={14} weight="bold" />
              </a>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {tier && (
                  <Badge className="bg-white/10 text-white">
                    {tier} creator
                  </Badge>
                )}
                {location && (
                  <Badge
                    className="bg-white/10 text-white"
                    icon={<MapPin size={12} weight="fill" />}
                  >
                    {location}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="scrollbar-thin flex-1 space-y-7 overflow-y-auto px-6 py-6">
          {status === "loading" && (
            <div className="space-y-4" aria-busy="true">
              <Skeleton className="h-36 rounded-2xl" />
              <div className="grid grid-cols-2 gap-2.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-2xl" />
                ))}
              </div>
              <Skeleton className="h-32 rounded-2xl" />
            </div>
          )}
          {status === "locked" && (
            <OutOfCredits
              compact
              title="Unlock this profile"
              description={`Opening a profile uses ${creditLabel(costs.openProfile)} the first time. ${error}`}
            />
          )}
          {status === "error" && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
              {error}{" "}
              <button
                onClick={() => load(creator)}
                className="font-semibold underline"
              >
                Try again
              </button>
            </div>
          )}
          {status === "ready" && (
            <>
              <Section
                title="Performance"
                icon={
                  <Lightning size={15} weight="fill" className="text-coral" />
                }
              >
                <div className="rounded-2xl border border-sand-100 bg-white p-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11.5px] font-medium text-charcoal-400">
                        Engagement rate
                      </p>
                      <p className="text-3xl font-bold tracking-tight text-charcoal">
                        {formatPercent(data.avgEngagementRate)}
                      </p>
                    </div>
                    <Badge
                      tone={
                        quality.tone === "great"
                          ? "success"
                          : quality.tone === "good"
                            ? "coral"
                            : quality.tone === "ok"
                              ? "warning"
                              : "neutral"
                      }
                    >
                      {quality.label}
                    </Badge>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-sand-100">
                    <div
                      className={cn(
                        "h-full rounded-full bg-gradient-to-r transition-all duration-700",
                        qualityColors[quality.tone],
                      )}
                      style={{ width: `${erWidth}%` }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[10.5px] font-medium text-charcoal-300">
                    <span>0%</span>
                    <span>Avg. 1–3%</span>
                    <span>10%+</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <Stat
                    icon={<UsersThree size={14} weight="duotone" />}
                    label="Followers"
                    value={formatCompact(data.followers)}
                  />
                  <Stat
                    icon={<ImagesSquare size={14} weight="duotone" />}
                    label="Posts"
                    value={formatCompact(data.totalPosts)}
                  />
                  <Stat
                    icon={<Eye size={14} weight="duotone" />}
                    label="Avg. views"
                    value={formatCompact(data.avgViews)}
                  />
                  <Stat
                    icon={<Heart size={14} weight="duotone" />}
                    label="Avg. likes"
                    value={formatCompact(data.avgLikes)}
                  />
                </div>
              </Section>

              {(niches.length > 0 || collabs.length > 0) && (
                <Section
                  title="Content & collaborations"
                  icon={
                    <Handshake size={15} weight="fill" className="text-coral" />
                  }
                >
                  {niches.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {niches.map((n) => (
                        <Badge key={n} tone="coral">
                          {nicheLabel(n)}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {collabs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {collabs.map((c) => (
                        <Badge
                          key={c}
                          tone="outline"
                          icon={
                            <Check
                              size={11}
                              weight="bold"
                              className="text-emerald-600"
                            />
                          }
                        >
                          {titleCase(c)}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Section>
              )}

              <Section
                title="Profile"
                icon={
                  <UsersThree size={15} weight="fill" className="text-coral" />
                }
              >
                <div className="divide-y divide-sand-100 rounded-2xl border border-sand-100 bg-white">
                  {[
                    {
                      icon: <GenderIntersex size={17} weight="duotone" />,
                      label: "Gender",
                      value: titleCase(data.gender) || "—",
                    },
                    {
                      icon: <Translate size={17} weight="duotone" />,
                      label: "Languages",
                      value: languages.map(titleCase).join(", ") || "—",
                    },
                    {
                      icon: <Repeat size={17} weight="duotone" />,
                      label: "Posting frequency",
                      value:
                        data.postingFrequency != null
                          ? String(data.postingFrequency)
                          : "—",
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center gap-3 px-4 py-3"
                    >
                      <span className="text-charcoal-300">{row.icon}</span>
                      <span className="text-[13px] text-charcoal-400">
                        {row.label}
                      </span>
                      <span className="ml-auto text-right text-[13.5px] font-semibold text-charcoal">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>

              <Section
                title="Contact"
                icon={
                  <EnvelopeSimple
                    size={15}
                    weight="fill"
                    className="text-coral"
                  />
                }
              >
                <div className="space-y-2.5">
                  {(
                    [
                      {
                        field: "EMAIL",
                        label: "Email",
                        icon: <EnvelopeSimple size={19} weight="duotone" />,
                        cost: costs.revealEmail,
                        href: (v: string) => `mailto:${v}`,
                      },
                      {
                        field: "PHONE",
                        label: "Phone",
                        icon: <Phone size={19} weight="duotone" />,
                        cost: costs.revealPhone,
                        href: (v: string) => `tel:${v}`,
                      },
                    ] as const
                  ).map(({ field, label, icon, cost, href }) => {
                    const c = contacts[field];
                    return c.revealed && c.value ? (
                      <CopyRow
                        key={field}
                        icon={icon}
                        label={label}
                        value={c.value}
                        href={href(c.value)}
                      />
                    ) : (
                      <LockedContactRow
                        key={field}
                        icon={icon}
                        label={label}
                        available={c.available}
                        cost={cost}
                        revealing={revealing === field}
                        onReveal={() => reveal(field)}
                      />
                    );
                  })}
                </div>
              </Section>
            </>
          )}
        </div>

        <div className="flex shrink-0 gap-2.5 border-t border-sand-200 bg-white/80 px-6 py-4 backdrop-blur">
          <AddToListButton
            creator={creator}
            variant="full"
            className="flex-1"
          />
          <a
            href={instagramUrl(creator.username)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on Instagram"
            title="View on Instagram"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sand-200 bg-white text-charcoal shadow-soft transition-colors hover:border-sand-300"
          >
            <ArrowSquareOut size={18} weight="bold" />
          </a>
        </div>
      </aside>
    </div>,
    document.body,
  );
};

export default CreatorDrawer;
