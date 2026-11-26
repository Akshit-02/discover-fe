import Link from "next/link";
import {
  ArrowRight,
  ChartLineUp,
  Check,
  CheckCircle,
  ClockCountdown,
  Coins,
  CurrencyInr,
  EnvelopeSimple,
  Eye,
  Folders,
  GenderIntersex,
  Handshake,
  Heart,
  Infinity as InfinityIcon,
  MagnifyingGlass,
  MapPin,
  Phone,
  Plus,
  Repeat,
  SealCheck,
  ShieldCheck,
  SlidersHorizontal,
  Sparkle,
  Tag,
  Target,
  Translate,
  UserFocus,
  UsersThree,
  X,
} from "@phosphor-icons/react/dist/ssr";
import Logo from "@/components/ui/Logo";
import { PARENT_SITE_LABEL, PARENT_SITE_URL, SUPPORT_EMAIL } from "@/config/brand";
import { CREDIT_PACKS, formatInr, perCredit, savingsPercent } from "@/lib/constants/creditPacks";
import { NICHES } from "@/lib/constants/niches";
import { cn } from "@/lib/utils/cn";
import HeroPreview from "./HeroPreview";
import LandingNav from "./LandingNav";

const SIGNUP = "/signup";
const FREE_CREDITS = 30;

const Eyebrow = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.12em]",
      dark ? "bg-white/10 text-tangerine" : "bg-coral-50 text-coral-700",
    )}
  >
    <Sparkle size={12} weight="fill" />
    {children}
  </span>
);

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  dark,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  dark?: boolean;
}) => (
  <div className="mx-auto max-w-[720px] text-center">
    <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
    <h2
      className={cn(
        "mt-4 font-display text-[34px] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[46px]",
        dark ? "text-white" : "text-charcoal",
      )}
    >
      {title}
    </h2>
    {subtitle && (
      <p className={cn("mt-4 text-[16px] leading-relaxed sm:text-[17px]", dark ? "text-white/60" : "text-charcoal-400")}>
        {subtitle}
      </p>
    )}
  </div>
);

const PrimaryCta = ({ children = `Start free with ${FREE_CREDITS} credits`, className }: { children?: React.ReactNode; className?: string }) => (
  <Link
    href={SIGNUP}
    className={cn(
      "group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-7 text-[16px] font-semibold text-white shadow-glow transition hover:brightness-[1.04] hover:shadow-[0_18px_40px_-12px_rgba(243,107,74,0.7)]",
      className,
    )}
  >
    {children}
    <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
  </Link>
);

/* ---------- data ---------- */

const FILTERS = [
  { icon: Tag, label: "Niche", note: "15 categories" },
  { icon: UsersThree, label: "Follower range", note: "Presets or custom" },
  { icon: ChartLineUp, label: "Engagement rate", note: "Set a minimum" },
  { icon: Heart, label: "Avg. likes", note: "Proven traction" },
  { icon: Eye, label: "Avg. views", note: "Reel reach" },
  { icon: Repeat, label: "Posting frequency", note: "Active creators" },
  { icon: MapPin, label: "State & city", note: "Go hyperlocal" },
  { icon: Translate, label: "Language", note: "Speak their language" },
  { icon: GenderIntersex, label: "Gender", note: "Match your audience" },
  { icon: EnvelopeSimple, label: "Has email", note: "Ready to contact" },
  { icon: Phone, label: "Has phone", note: "Ready to call" },
  { icon: MagnifyingGlass, label: "Name / @username", note: "Find anyone fast" },
];

const BEFORE = [
  "Scrolling hashtags and explore pages for hours",
  "Guessing whether followers are real and engaged",
  "Copy-pasting handles into messy spreadsheets",
  "DMing creators and waiting days for a reply",
  "Paying for expensive subscriptions you barely use",
];

const AFTER = [
  "Filter creators by niche, city, language and reach in seconds",
  "See engagement rate and quality before you reach out",
  "Save shortlists for every campaign in one place",
  "Reveal the creator's email or phone and contact them directly",
  "Pay only for what you unlock — no subscription",
];

const STEPS = [
  {
    icon: SlidersHorizontal,
    title: "Search & filter",
    text: "Pick a niche, follower range, location and language. Add an engagement floor to keep only creators whose audience actually responds.",
  },
  {
    icon: UserFocus,
    title: "Review & shortlist",
    text: "Open a creator's profile to see engagement, average likes and views, posting frequency and languages. Save the best fits to a campaign list.",
  },
  {
    icon: Handshake,
    title: "Reveal & reach out",
    text: "Reveal their email or phone in one click and pitch them directly — no agency, no middleman, no waiting on DMs.",
  },
];

const RESULTS = [
  {
    icon: ClockCountdown,
    title: "Shortlist in minutes, not days",
    text: "What used to take a week of scrolling and spreadsheets becomes a few focused searches.",
  },
  {
    icon: Target,
    title: "Partners who fit your brand",
    text: "Match on niche, city, language and gender so every creator speaks to the customers you want.",
  },
  {
    icon: ChartLineUp,
    title: "Engagement over vanity numbers",
    text: "Filter by engagement rate, likes and views to back creators whose audience actually listens.",
  },
  {
    icon: CurrencyInr,
    title: "Spend only on what you use",
    text: "No subscriptions or lock-ins. Credits start from just a few rupees each, and purchased credits never expire.",
  },
];

const COSTS = [
  { icon: SlidersHorizontal, label: "Advanced filter search", cost: 2, note: "Same search free for 24h" },
  { icon: UserFocus, label: "Open a creator profile", cost: 1, note: "Stays unlocked forever" },
  { icon: EnvelopeSimple, label: "Reveal email", cost: 1, note: "Free if not available" },
  { icon: Phone, label: "Reveal phone", cost: 2, note: "Free if not available" },
];

const FAQS = [
  {
    q: "Who is Kudozz Influencer Discovery for?",
    a: "D2C brands, marketing teams, agencies and founders in India who want to run influencer campaigns with creators who genuinely fit their audience — without spending days hunting for them.",
  },
  {
    q: "Which platform does it cover?",
    a: "Instagram. Every creator links straight to their Instagram profile so you can check their content before you reach out.",
  },
  {
    q: "Is it really free to start?",
    a: `Yes. Every new account gets ${FREE_CREDITS} free credits, valid for 30 days. No credit card needed. Basic search by name and follower range is always free.`,
  },
  {
    q: "How do credits work?",
    a: "You only spend credits when you unlock something: 2 for an advanced filter search, 1 to open a creator profile, 1 to reveal an email and 2 to reveal a phone number. Anything you've unlocked stays unlocked, so you never pay twice for the same thing.",
  },
  {
    q: "What if a creator doesn't have an email or phone?",
    a: "Then you're not charged. Credits are only used when the contact is actually available.",
  },
  {
    q: "Do purchased credits expire?",
    a: "No. Purchased credits never expire. Only the free signup credits have a 30-day validity.",
  },
  {
    q: "How can I pay?",
    a: "Securely through Razorpay with UPI, debit or credit cards and netbanking. Credits are added to your account as soon as the payment completes.",
  },
  {
    q: "I have a question that isn't answered here.",
    a: `Write to us at ${SUPPORT_EMAIL} — a real person from the Kudozz team will get back to you.`,
  },
];

/* ---------- page ---------- */

const LandingPage = () => (
  <div className="min-h-screen overflow-x-hidden bg-cream text-charcoal">
    <LandingNav />

    {/* HERO */}
    <section className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_at_top,rgba(243,107,74,0.14),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1200px] px-4 pb-16 pt-12 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-[860px] text-center">
          <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-sand-200 bg-white/80 py-1.5 pl-1.5 pr-3.5 text-[13px] font-semibold text-charcoal-600 shadow-soft">
            <span className="rounded-full bg-brand-gradient px-2 py-0.5 text-[11px] font-bold text-white">New</span>
            Instagram influencer discovery for Indian brands
          </span>
          <h1 className="mt-7 animate-fade-up font-display text-[44px] font-medium leading-[1.02] tracking-[-0.03em] text-charcoal [animation-delay:60ms] sm:text-[68px] lg:text-[76px]">
            Find creators your customers{" "}
            <span className="whitespace-nowrap">
              <span className="relative inline-block italic text-coral">
                already trust
                <svg viewBox="0 0 300 14" className="absolute -bottom-2 left-0 h-3 w-full text-tangerine" aria-hidden>
                  <path d="M2 10 C 80 2, 220 2, 298 9" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              .
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-[640px] animate-fade-up text-[17px] leading-relaxed text-charcoal-500 [animation-delay:120ms] sm:text-[19px]">
            Search Instagram creators by niche, city, language and real engagement. Build campaign shortlists in
            minutes, reveal contact details in a click, and pay only for what you unlock.
          </p>
          <div className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 [animation-delay:180ms] sm:flex-row">
            <PrimaryCta />
            <a
              href="#how-it-works"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-sand-200 bg-white px-7 text-[16px] font-semibold text-charcoal shadow-soft transition-colors hover:border-sand-300"
            >
              See how it works
            </a>
          </div>
          <ul className="mt-6 flex animate-fade-up flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px] font-medium text-charcoal-400 [animation-delay:240ms]">
            {["No credit card required", `${FREE_CREDITS} free credits`, "No subscription"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle size={16} weight="fill" className="text-emerald-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 animate-fade-up [animation-delay:300ms]">
          <HeroPreview />
        </div>
      </div>
    </section>

    {/* NICHE MARQUEE */}
    <section className="border-y border-sand-200/80 bg-white/60 py-6">
      <p className="mb-4 text-center text-[12px] font-bold uppercase tracking-[0.14em] text-charcoal-300">
        Creators across every niche your brand needs
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-3">
          {[...NICHES, ...NICHES].filter((n) => n.slug !== "other").map((n, i) => (
            <span
              key={`${n.slug}-${i}`}
              className="whitespace-nowrap rounded-full border border-sand-200 bg-white px-4 py-2 text-[14px] font-semibold text-charcoal-600"
            >
              {n.label}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* PROBLEM → SOLUTION */}
    <section className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Why Kudozz"
        title={
          <>
            Stop hunting. Start <span className="italic text-coral">partnering.</span>
          </>
        }
        subtitle="Finding the right creators shouldn't eat your whole week. Here's what changes when you switch."
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[28px] border border-sand-200 bg-white p-7 sm:p-9">
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-charcoal-300">The old way</p>
          <ul className="mt-6 space-y-4">
            {BEFORE.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15.5px] text-charcoal-400">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-100 text-charcoal-300">
                  <X size={13} weight="bold" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-[28px] bg-charcoal p-7 text-white sm:p-9">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-coral/40 blur-[90px]" />
          <p className="relative text-[13px] font-bold uppercase tracking-[0.12em] text-tangerine">With Kudozz</p>
          <ul className="relative mt-6 space-y-4">
            {AFTER.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15.5px] text-white/85">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                  <Check size={13} weight="bold" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* FEATURES BENTO */}
    <section id="features" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Everything you need to find the <span className="italic text-coral">right fit</span>
            </>
          }
          subtitle="Built for marketers who want results, not another tool to learn."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-6">
          {/* Filters — large */}
          <div className="rounded-[28px] border border-sand-200 bg-cream/60 p-7 md:col-span-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-50 text-coral">
              <SlidersHorizontal size={24} weight="duotone" />
            </span>
            <h3 className="mt-5 text-[22px] font-bold tracking-tight">12 precision filters</h3>
            <p className="mt-2 max-w-[520px] text-[15px] leading-relaxed text-charcoal-400">
              Combine filters to zero in on exactly the creators you want. One advanced search costs the same no matter
              how many filters you stack.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {FILTERS.map(({ icon: Icon, label, note }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 ring-1 ring-sand-200/70">
                  <Icon size={18} weight="duotone" className="shrink-0 text-coral" />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-bold">{label}</p>
                    <p className="truncate text-[11.5px] text-charcoal-400">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement */}
          <div className="relative overflow-hidden rounded-[28px] bg-charcoal p-7 text-white md:col-span-2">
            <div className="pointer-events-none absolute -bottom-20 -right-16 h-60 w-60 rounded-full bg-coral/40 blur-[80px]" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-tangerine">
              <ChartLineUp size={24} weight="duotone" />
            </span>
            <h3 className="relative mt-5 text-[22px] font-bold tracking-tight">Engagement at a glance</h3>
            <p className="relative mt-2 text-[15px] leading-relaxed text-white/60">
              Every creator shows engagement rate with a clear quality rating, so you back audiences that respond.
            </p>
            <div className="relative mt-6 space-y-2.5">
              {[
                { label: "Exceptional", w: "92%", c: "from-emerald-400 to-emerald-500", v: "6%+" },
                { label: "Strong", w: "64%", c: "from-coral to-tangerine", v: "3–6%" },
                { label: "Average", w: "38%", c: "from-tangerine-300 to-tangerine", v: "1–3%" },
              ].map((r) => (
                <div key={r.label}>
                  <div className="mb-1 flex justify-between text-[12px] font-semibold">
                    <span>{r.label}</span>
                    <span className="text-white/50">{r.v}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className={`h-full rounded-full bg-gradient-to-r ${r.c}`} style={{ width: r.w }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div className="rounded-[28px] border border-sand-200 bg-cream/60 p-7 md:col-span-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-50 text-coral">
              <EnvelopeSimple size={24} weight="duotone" />
            </span>
            <h3 className="mt-5 text-[22px] font-bold tracking-tight">Direct contact, on demand</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-charcoal-400">
              Reveal a creator&apos;s email or phone number in one click and reach them directly. If it&apos;s not
              available, you&apos;re not charged.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-sand-200/70">
                <EnvelopeSimple size={18} weight="duotone" className="text-coral" />
                <span className="text-[13.5px] font-semibold">meera@movesstudio.in</span>
                <CheckCircle size={16} weight="fill" className="ml-auto text-emerald-500" />
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-sand-200/70">
                <Phone size={18} weight="duotone" className="text-charcoal-300" />
                <span className="text-[13.5px] tracking-widest text-charcoal-300">••••••••••</span>
                <span className="ml-auto rounded-lg bg-charcoal px-2 py-1 text-[11px] font-semibold text-white">Reveal</span>
              </div>
            </div>
          </div>

          {/* Lists */}
          <div className="rounded-[28px] border border-sand-200 bg-cream/60 p-7 md:col-span-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-50 text-coral">
              <Folders size={24} weight="duotone" />
            </span>
            <h3 className="mt-5 text-[22px] font-bold tracking-tight">Campaign shortlists</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-charcoal-400">
              Save creators into lists for each campaign, brief or client. Up to 100 lists with 50 creators each.
            </p>
            <div className="mt-6 space-y-2">
              {[
                { n: "Diwali festive drop", c: 18 },
                { n: "Mumbai café launch", c: 9 },
                { n: "Fitness reels · Q1", c: 24 },
              ].map((l) => (
                <div key={l.n} className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5 ring-1 ring-sand-200/70">
                  <Folders size={17} weight="fill" className="text-tangerine" />
                  <span className="truncate text-[13.5px] font-semibold">{l.n}</span>
                  <span className="ml-auto rounded-full bg-coral-50 px-2 py-0.5 text-[11px] font-bold text-coral-700">{l.c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Profiles */}
          <div className="rounded-[28px] border border-sand-200 bg-cream/60 p-7 md:col-span-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-50 text-coral">
              <UserFocus size={24} weight="duotone" />
            </span>
            <h3 className="mt-5 text-[22px] font-bold tracking-tight">Rich creator profiles</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-charcoal-400">
              Followers, posts, average likes and views, posting frequency, languages, niches and location — all in one
              view, one click from their Instagram.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {[
                ["Followers", "9.7K"],
                ["Avg. likes", "640"],
                ["Avg. views", "4.2K"],
                ["Engagement", "6.9%"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-white p-3 ring-1 ring-sand-200/70">
                  <p className="text-[11.5px] text-charcoal-400">{k}</p>
                  <p className="text-[17px] font-bold">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section id="how-it-works" className="mx-auto max-w-[1200px] scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="How it works"
        title={
          <>
            From idea to outreach in <span className="italic text-coral">three steps</span>
          </>
        }
      />
      <div className="relative mt-14 grid gap-5 md:grid-cols-3">
        <div className="pointer-events-none absolute left-[16%] right-[16%] top-[52px] hidden border-t-2 border-dashed border-sand-300 md:block" />
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className="relative rounded-[28px] border border-sand-200 bg-white p-7 text-center shadow-soft">
            <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
              <Icon size={26} weight="duotone" />
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal text-[11px] font-bold text-white ring-4 ring-white">
                {i + 1}
              </span>
            </span>
            <h3 className="mt-6 text-[20px] font-bold tracking-tight">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-charcoal-400">{text}</p>
          </div>
        ))}
      </div>
    </section>

    {/* RESULTS */}
    <section className="relative overflow-hidden bg-charcoal py-24 text-white">
      <div className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-coral/30 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-tangerine/20 blur-[140px]" />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="The results"
          title={
            <>
              Better creators. Less time. <span className="italic text-tangerine">Lower spend.</span>
            </>
          }
          subtitle="Kudozz turns influencer discovery from a time sink into your team's unfair advantage."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RESULTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-tangerine">
                <Icon size={24} weight="duotone" />
              </span>
              <h3 className="mt-5 text-[19px] font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <PrimaryCta>Find your first creators free</PrimaryCta>
        </div>
      </div>
    </section>

    {/* PRICING */}
    <section id="pricing" className="mx-auto max-w-[1200px] scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Pricing"
        title={
          <>
            Pay for results, <span className="italic text-coral">not seats</span>
          </>
        }
        subtitle={`Start with ${FREE_CREDITS} free credits. When you need more, top up with a pack — no subscription, and purchased credits never expire.`}
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CREDIT_PACKS.map((pack) => {
          const savings = savingsPercent(pack);
          return (
            <div
              key={pack.id}
              className={cn(
                "relative flex flex-col rounded-[28px] border bg-white p-7",
                pack.popular ? "border-coral shadow-[0_0_0_4px_rgba(243,107,74,0.12),0_30px_60px_-30px_rgba(243,107,74,0.5)]" : "border-sand-200",
              )}
            >
              {pack.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-glow">
                  Most popular
                </span>
              )}
              <p className="text-[15px] font-bold">{pack.name}</p>
              <p className="text-[13px] text-charcoal-400">{pack.tagline}</p>
              <p className="mt-6 text-[40px] font-bold leading-none tracking-tight">{formatInr(pack.priceInr)}</p>
              <p className="mt-2 text-[14px] font-semibold text-charcoal-600">
                {pack.credits.toLocaleString("en-IN")} credits
              </p>
              <p className="mt-1 flex items-center gap-2 text-[12.5px] text-charcoal-400">
                {formatInr(perCredit(pack), 2)} / credit
                {savings > 0 && (
                  <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[11px] font-bold text-emerald-700">
                    Save {savings}%
                  </span>
                )}
              </p>
              <ul className="mb-7 mt-6 space-y-2 text-[13.5px] text-charcoal-500">
                <li className="flex items-center gap-2">
                  <Check size={15} weight="bold" className="text-coral" />
                  Up to {pack.credits.toLocaleString("en-IN")} profile unlocks
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} weight="bold" className="text-coral" />
                  All 12 filters included
                </li>
                <li className="flex items-center gap-2">
                  <InfinityIcon size={15} weight="bold" className="text-coral" />
                  Credits never expire
                </li>
              </ul>
              <Link
                href={SIGNUP}
                className={cn(
                  "mt-auto inline-flex h-12 items-center justify-center rounded-2xl text-[14.5px] font-semibold transition",
                  pack.popular
                    ? "bg-brand-gradient text-white shadow-glow hover:brightness-[1.04]"
                    : "border border-sand-200 bg-white text-charcoal hover:border-sand-300",
                )}
              >
                Get started
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 rounded-[28px] border border-sand-200 bg-white p-7 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tangerine-50 text-tangerine">
            <Coins size={24} weight="fill" />
          </span>
          <h3 className="mt-4 text-[22px] font-bold tracking-tight">Simple, fair credit costs</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-charcoal-400">
            Searching by name and follower range is always free. You only spend credits when you unlock something — and
            never twice for the same thing.
          </p>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {COSTS.map(({ icon: Icon, label, cost, note }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl bg-cream/70 p-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-coral ring-1 ring-sand-200">
                <Icon size={19} weight="duotone" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-bold">{label}</p>
                <p className="text-[12px] text-charcoal-400">{note}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[13px] font-bold ring-1 ring-sand-200">
                <Coins size={13} weight="fill" className="text-tangerine" />
                {cost}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 flex items-center justify-center gap-1.5 text-[13px] text-charcoal-400">
        <ShieldCheck size={16} weight="fill" className="text-emerald-500" />
        Secure payments by Razorpay · UPI, cards and netbanking
      </p>
    </section>

    {/* FAQ */}
    <section id="faq" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto max-w-[820px] px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-12 divide-y divide-sand-200 rounded-[28px] border border-sand-200 bg-cream/40 px-6 sm:px-8">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-charcoal-400 ring-1 ring-sand-200 transition-transform group-open:rotate-45">
                  <Plus size={14} weight="bold" />
                </span>
              </summary>
              <p className="mt-3 pr-10 text-[15px] leading-relaxed text-charcoal-500">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="px-4 py-20 sm:px-6">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[36px] bg-charcoal px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-coral/45 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-tangerine/30 blur-[110px]" />
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
        <div className="relative mx-auto max-w-[680px]">
          <SealCheck size={40} weight="fill" className="mx-auto text-tangerine" />
          <h2 className="mt-5 font-display text-[36px] font-medium leading-[1.06] tracking-[-0.02em] sm:text-[54px]">
            Your next great creator partnership is <span className="italic text-tangerine">one search away.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-relaxed text-white/60 sm:text-[17px]">
            Sign up in a minute and get {FREE_CREDITS} free credits to discover, shortlist and contact creators today.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryCta />
            <Link
              href="/login"
              className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/15 px-7 text-[16px] font-semibold text-white transition-colors hover:bg-white/5"
            >
              I already have an account
            </Link>
          </div>
          <p className="mt-6 text-[13px] text-white/40">No credit card required · No subscription</p>
        </div>
      </div>
    </section>

    {/* FOOTER */}
    <footer className="border-t border-sand-200/80">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-[320px]">
          <Logo />
          <p className="mt-4 text-[14px] leading-relaxed text-charcoal-400">
            Discover, shortlist and contact the right Instagram creators for your brand.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-[14px] sm:grid-cols-3">
          <div>
            <p className="font-bold">Product</p>
            <ul className="mt-3 space-y-2 text-charcoal-400">
              <li><a href="#features" className="hover:text-charcoal">Features</a></li>
              <li><a href="#pricing" className="hover:text-charcoal">Pricing</a></li>
              <li><a href="#faq" className="hover:text-charcoal">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="font-bold">Account</p>
            <ul className="mt-3 space-y-2 text-charcoal-400">
              <li><Link href={SIGNUP} className="hover:text-charcoal">Create account</Link></li>
              <li><Link href="/login" className="hover:text-charcoal">Sign in</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold">Contact</p>
            <ul className="mt-3 space-y-2 text-charcoal-400">
              <li><a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-charcoal">{SUPPORT_EMAIL}</a></li>
              <li><a href={PARENT_SITE_URL} className="hover:text-charcoal">{PARENT_SITE_LABEL}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-sand-200/80 py-6 text-center text-[12.5px] text-charcoal-300">
        © {new Date().getFullYear()} Kudozz. All rights reserved.
      </div>
    </footer>
  </div>
);

export default LandingPage;
