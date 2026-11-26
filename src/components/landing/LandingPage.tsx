import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Buildings,
  ChartLineUp,
  Check,
  CheckCircle,
  Coins,
  EnvelopeSimple,
  Eye,
  Folders,
  GenderIntersex,
  Heart,
  ImagesSquare,
  InstagramLogo,
  LinkSimple,
  MagnifyingGlass,
  MapPin,
  Megaphone,
  Phone,
  Plus,
  Repeat,
  Rocket,
  SealCheck,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Storefront,
  Table,
  Tag,
  Translate,
  UserFocus,
  UsersThree,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { SUPPORT_EMAIL } from "@/config/brand";
import { CREDIT_PACKS, formatInr, perCredit, savingsPercent } from "@/lib/constants/creditPacks";
import { CREDIT_COSTS, FILTER_UNLOCK_HOURS, SIGNUP_CREDITS, SIGNUP_CREDIT_DAYS } from "@/lib/constants/credits";
import { NICHES } from "@/lib/constants/niches";
import { MAX_CREATORS_PER_LIST, MAX_LISTS_PER_USER } from "@/lib/models/list";
import { cn } from "@/lib/utils/cn";
import { FAQS, PRODUCT_DEFINITION, SIGNUP_HREF } from "./content";
import HeroPreview from "./HeroPreview";
import LandingFooter from "./LandingFooter";
import LandingNav from "./LandingNav";

/* ---------------------------------------------------------------- primitives */

const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6", className)}>{children}</div>
);

const Eyebrow = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <p
    className={cn(
      "text-[12px] font-bold uppercase tracking-[0.16em]",
      dark ? "text-tangerine" : "text-coral-700",
    )}
  >
    {children}
  </p>
);

const SectionHeading = ({
  id,
  eyebrow,
  title,
  intro,
  dark,
  center,
  className,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) => (
  <div className={cn("max-w-[720px]", center && "mx-auto text-center", className)}>
    <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
    <h2
      id={id}
      className={cn(
        "mt-3 text-balance font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[44px]",
        dark ? "text-white" : "text-charcoal",
      )}
    >
      {title}
    </h2>
    {intro && (
      <p className={cn("mt-4 text-[16px] leading-relaxed sm:text-[17.5px]", dark ? "text-white/65" : "text-charcoal-500")}>
        {intro}
      </p>
    )}
  </div>
);

const PrimaryCta = ({
  children = "Start Discovering Creators",
  cta = "signup",
  className,
}: {
  children?: React.ReactNode;
  cta?: string;
  className?: string;
}) => (
  <Link
    href={SIGNUP_HREF}
    data-cta={cta}
    className={cn(
      "group inline-flex h-[52px] items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-6 text-[15.5px] font-semibold text-white shadow-glow transition hover:brightness-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:h-14 sm:px-7 sm:text-[16px]",
      className,
    )}
  >
    {children}
    <ArrowRight size={18} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-0.5" />
  </Link>
);

const SecondaryCta = ({
  href,
  children,
  dark,
  cta,
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  cta?: string;
}) => (
  <a
    href={href}
    data-cta={cta}
    className={cn(
      "inline-flex h-[52px] items-center justify-center gap-2 rounded-2xl px-6 text-[15.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral sm:h-14 sm:px-7 sm:text-[16px]",
      dark
        ? "border border-white/15 text-white hover:bg-white/5"
        : "border border-sand-200 bg-white text-charcoal shadow-soft hover:border-sand-300",
    )}
  >
    {children}
  </a>
);

const IconTile = ({ icon: Icon, dark }: { icon: React.ElementType; dark?: boolean }) => (
  <span
    className={cn(
      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
      dark ? "bg-white/10 text-tangerine" : "bg-coral-50 text-coral",
    )}
    aria-hidden
  >
    <Icon size={22} weight="duotone" />
  </span>
);

const CreditPill = ({ cost, label }: { cost: number; label?: string }) => (
  <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[12.5px] font-bold text-charcoal ring-1 ring-sand-200">
    <Coins size={13} weight="fill" className="text-tangerine" aria-hidden />
    {cost} {label ?? (cost === 1 ? "credit" : "credits")}
  </span>
);

/* ---------------------------------------------------------------- data */

const VALUE_STRIP = [
  { icon: MagnifyingGlass, title: "Smarter creator discovery", text: "Search a structured Instagram creator database instead of scrolling feeds." },
  { icon: SlidersHorizontal, title: "Relevant creator filters", text: "Niche, followers, city, language, gender and engagement — combined." },
  { icon: ChartLineUp, title: "Creator performance insights", text: "Engagement rate, average views and likes, posting frequency." },
  { icon: Folders, title: "Organised creator shortlists", text: "Save creators to campaign lists you can revisit any time." },
];

const PROBLEMS = [
  {
    title: "Hashtag scrolling that never ends",
    text: "Searching #mumbaifashion or #punefoodie surfaces whoever posted last, not whoever fits your brief.",
  },
  {
    title: "Opening profiles one at a time",
    text: "Each profile means checking followers, recent reels and likes by hand — for hundreds of accounts.",
  },
  {
    title: "Location and language are guesswork",
    text: "Finding a Marathi-speaking creator in Nagpur or a Kannada food creator in Mysuru means reading bios and hoping.",
  },
  {
    title: "Follower counts hide weak engagement",
    text: "A large account with quiet comments can deliver less than a smaller creator whose audience actually responds.",
  },
  {
    title: "Spreadsheets that go stale",
    text: "Handles copied into sheets lose context, get duplicated across campaigns and are hard to share with your team.",
  },
  {
    title: "Losing track of who you liked",
    text: "Good creators found last month are forgotten by the next campaign because nothing kept them organised.",
  },
];

const BASIC_FILTERS = [
  { icon: MagnifyingGlass, label: "Name or @username" },
  { icon: UsersThree, label: "Follower range — presets or a custom min/max" },
  { icon: ChartLineUp, label: "Sort by followers, engagement, avg. views or avg. likes" },
];

const ADVANCED_FILTERS = [
  { icon: Tag, label: "Niche" },
  { icon: MapPin, label: "State" },
  { icon: Buildings, label: "City" },
  { icon: Translate, label: "Language" },
  { icon: GenderIntersex, label: "Gender" },
  { icon: ChartLineUp, label: "Minimum engagement rate" },
  { icon: Eye, label: "Minimum average views" },
  { icon: Heart, label: "Minimum average likes" },
  { icon: Repeat, label: "Posting frequency per month" },
  { icon: EnvelopeSimple, label: "Has an email on file" },
  { icon: Phone, label: "Has a phone number on file" },
];

const SEARCH_EXAMPLES = [
  { niche: "Fashion & Lifestyle", where: "Mumbai", lang: null },
  { niche: "Beauty & Skincare", where: "Delhi", lang: null },
  { niche: "Food & Beverages", where: "Bengaluru", lang: null },
  { niche: "Health & Fitness", where: "Pune", lang: null },
  { niche: "Travel", where: "Jaipur", lang: null },
  { niche: "Technology & Gadgets", where: "Hyderabad", lang: null },
  { niche: "Any niche", where: "Gujarat", lang: "Gujarati" },
  { niche: "Any niche", where: "Chennai", lang: "Tamil" },
  { niche: "Any niche", where: "Maharashtra", lang: "Marathi" },
];

const METRICS = [
  { icon: UsersThree, label: "Followers", text: "Audience size and the tier a creator falls into." },
  { icon: ChartLineUp, label: "Engagement rate", text: "How much of that audience interacts, with a quality label." },
  { icon: Eye, label: "Average views", text: "Typical reach of a creator's videos." },
  { icon: Heart, label: "Average likes", text: "A steady signal of how content lands." },
  { icon: Repeat, label: "Posting frequency", text: "Posts per month — is the account active?" },
  { icon: ImagesSquare, label: "Total posts", text: "How established the content library is." },
  { icon: SealCheck, label: "Verified status", text: "Shown as a badge on verified accounts." },
  { icon: Translate, label: "Languages & location", text: "Where the creator is and the languages they use." },
];

const ENGAGEMENT_BANDS = [
  { label: "Exceptional", range: "6% and above", width: "92%", color: "from-emerald-400 to-emerald-500" },
  { label: "Strong", range: "3% – 6%", width: "66%", color: "from-coral to-tangerine" },
  { label: "Average", range: "1% – 3%", width: "40%", color: "from-tangerine-300 to-tangerine" },
  { label: "Low", range: "below 1%", width: "14%", color: "from-sand-300 to-sand-400" },
];

const STEPS = [
  {
    icon: Rocket,
    title: "Create your account",
    text: `Sign up with your email. You get ${SIGNUP_CREDITS} free credits, valid for ${SIGNUP_CREDIT_DAYS} days — no card needed.`,
  },
  {
    icon: SlidersHorizontal,
    title: "Search with relevant filters",
    text: "Start free with name and follower range, then add niche, location, language and engagement filters.",
  },
  {
    icon: UserFocus,
    title: "Evaluate creator profiles",
    text: "Open a profile to compare engagement, views, likes and posting frequency, and jump to their Instagram.",
  },
  {
    icon: Folders,
    title: "Save and unlock contacts",
    text: "Save the best fits to a list, and reveal an available email or phone number when you're ready to reach out.",
  },
];

const AUDIENCES = [
  {
    icon: ShoppingBag,
    title: "D2C and ecommerce brands",
    text: "Find creators who talk about your product category and reach the cities and languages your customers buy from.",
  },
  {
    icon: Megaphone,
    title: "Marketing teams",
    text: "Replace ad-hoc scrolling with a repeatable process: shared search links, comparable metrics and saved lists.",
  },
  {
    icon: Briefcase,
    title: "Influencer marketing agencies",
    text: "Research creators for several brands at once, with a separate list for each client or campaign.",
  },
  {
    icon: UsersThree,
    title: "Social media agencies",
    text: "Shortlist suitable creators for client briefs and pitches without starting every search from zero.",
  },
  {
    icon: Storefront,
    title: "Startups and small businesses",
    text: "Explore creator collaborations on a small budget: free credits to start, small packs after, no subscription.",
  },
];

const CREDIT_ROWS = [
  { icon: MagnifyingGlass, label: "Basic search", note: "Name, @username and follower range", cost: 0 },
  {
    icon: SlidersHorizontal,
    label: "Advanced filter search",
    note: `Same filter set is free to re-run for ${FILTER_UNLOCK_HOURS} hours`,
    cost: CREDIT_COSTS.advancedFilter,
  },
  { icon: UserFocus, label: "Open a creator profile", note: "Re-opening it later is free", cost: CREDIT_COSTS.openProfile },
  { icon: EnvelopeSimple, label: "Reveal email", note: "Not charged if unavailable", cost: CREDIT_COSTS.revealEmail },
  { icon: Phone, label: "Reveal phone", note: "Not charged if unavailable", cost: CREDIT_COSTS.revealPhone },
];

const visibleNiches = NICHES.filter((n) => n.isActive && n.slug !== "other");

/* ---------------------------------------------------------------- page */

const LandingPage = () => (
  <div id="top" className="landing min-h-screen overflow-x-clip bg-cream text-charcoal">
    <a
      href="#main"
      className="sr-only z-[60] rounded-lg bg-charcoal px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
    <LandingNav />

    <main id="main">
      {/* ------------------------------------------------------------ HERO */}
      <section aria-labelledby="hero-title" className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(ellipse_at_top,rgba(243,107,74,0.13),transparent_62%)]"
        />
        <Container className="relative pb-16 pt-10 sm:pb-20 sm:pt-16">
          <div className="mx-auto max-w-[880px] text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-sand-200 bg-white/80 px-3.5 py-1.5 text-[12.5px] font-semibold text-charcoal-600 shadow-soft">
              <InstagramLogo size={15} weight="duotone" className="text-coral" aria-hidden />
              Instagram creator search for Indian brands &amp; agencies
            </p>
            <h1
              id="hero-title"
              className="mt-6 text-balance font-display text-[40px] font-medium leading-[1.04] tracking-[-0.03em] text-charcoal sm:text-[62px] lg:text-[72px]"
            >
              India&apos;s No.{"\u00A0"}1 <span className="italic text-coral">Influencer Discovery</span> Tool
            </h1>
            <p className="mx-auto mt-6 max-w-[660px] text-[17px] leading-relaxed text-charcoal-500 sm:text-[19px]">
              Discover the right Instagram creators for your brand. Search influencers by niche, followers, city,
              language and engagement, compare their metrics, and build a creator shortlist — without hours of manual
              research.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <PrimaryCta cta="signup-hero" />
              <SecondaryCta href="#features" cta="explore-features">
                Explore Features
              </SecondaryCta>
            </div>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13.5px] font-medium text-charcoal-500">
              {[`${SIGNUP_CREDITS} free credits on signup`, "No card required", "No subscription"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle size={16} weight="fill" className="text-emerald-600" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 sm:mt-16">
            <HeroPreview />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ VALUE STRIP */}
      <section aria-label="Key benefits" className="border-y border-sand-200/80 bg-white">
        <Container>
          <ul className="grid divide-sand-200/80 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {VALUE_STRIP.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className={cn(
                  "flex gap-3.5 py-6 sm:px-6",
                  i > 0 && "border-t border-sand-200/80 sm:border-t-0",
                  i === 2 && "sm:border-t lg:border-t-0",
                  i === 3 && "sm:border-t lg:border-t-0",
                  i % 2 === 0 && "sm:pl-0 lg:pl-6",
                  i === 0 && "lg:pl-0",
                )}
              >
                <Icon size={24} weight="duotone" className="mt-0.5 shrink-0 text-coral" aria-hidden />
                <div>
                  <h3 className="text-[15px] font-bold tracking-tight">{title}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-charcoal-400">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------ DEFINITION (AEO) */}
      <section aria-labelledby="what-is" className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="reveal">
            <SectionHeading
              id="what-is"
              eyebrow="In short"
              title={
                <>
                  What is <span className="italic text-coral">Kudozz Influencer Discovery</span>?
                </>
              }
            />
            <p className="mt-5 text-[17px] leading-relaxed text-charcoal-600 sm:text-[18px]">{PRODUCT_DEFINITION}</p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-charcoal-500">
              It&apos;s built by Kudozz, an Indian influencer and creator marketing company, for the research step of a
              campaign: finding and evaluating creators before you reach out.
            </p>
          </div>
          <dl className="reveal grid grid-cols-2 gap-3">
            {[
              { k: "Platform covered", v: "Instagram" },
              { k: "Built for", v: "Brands & agencies in India" },
              { k: "Pricing", v: "Pay-as-you-go credits" },
              { k: "To start", v: `${SIGNUP_CREDITS} free credits` },
            ].map(({ k, v }) => (
              <div key={k} className="rounded-2xl border border-sand-200 bg-white p-5 shadow-soft">
                <dt className="text-[12px] font-bold uppercase tracking-[0.12em] text-charcoal-400">{k}</dt>
                <dd className="mt-2 text-[18px] font-bold leading-snug tracking-tight sm:text-[20px]">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ------------------------------------------------------------ PROBLEM */}
      <section aria-labelledby="problem" className="bg-charcoal py-20 text-white sm:py-28">
        <Container>
          <SectionHeading
            id="problem"
            dark
            eyebrow="The problem"
            title="Finding the Right Influencers Shouldn't Take Hours of Manual Research"
            intro="Most teams in India still discover creators by hand. It works for five profiles. It breaks down at fifty."
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMS.map((p) => (
              <li key={p.title} className="reveal bg-charcoal p-6 sm:p-7">
                <X size={18} weight="bold" className="text-coral-300" aria-hidden />
                <h3 className="mt-4 text-[17px] font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{p.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-[720px] text-[16px] leading-relaxed text-white/80 sm:text-[17px]">
              <strong className="font-semibold text-white">A discovery platform turns this into a search.</strong> You
              describe the creator you need — niche, size, place, language, engagement — and compare a filtered list
              side by side, with the shortlist saved where your team can find it.
            </p>
            <PrimaryCta cta="signup-problem" className="shrink-0">
              Try it free
            </PrimaryCta>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ FEATURES / SEARCH */}
      <section id="features" aria-labelledby="features-title" className="scroll-mt-20 py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="features-title"
            eyebrow="Influencer search"
            title="Discover Influencers That Match Your Brand"
            intro="Kudozz is an influencer search tool built around the questions brands actually ask: what do they post about, how big is their audience, where are they, what language do they use, and does their audience engage?"
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.5fr]">
            <div className="reveal flex flex-col rounded-[28px] border border-sand-200 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[20px] font-bold tracking-tight">Basic search</h3>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-bold text-emerald-700">Free</span>
              </div>
              <p className="mt-2 text-[14.5px] leading-relaxed text-charcoal-500">
                Look up a creator you already know or browse by audience size. Basic search never uses credits.
              </p>
              <ul className="mt-6 space-y-2.5">
                {BASIC_FILTERS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-start gap-3 rounded-2xl bg-cream/70 px-4 py-3 text-[14px] font-semibold">
                    <Icon size={18} weight="duotone" className="mt-px shrink-0 text-coral" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal rounded-[28px] bg-charcoal p-6 text-white sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-[20px] font-bold tracking-tight">Advanced filters</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[12px] font-bold text-tangerine">
                  <Coins size={13} weight="fill" aria-hidden />
                  {CREDIT_COSTS.advancedFilter} credits per filter set
                </span>
              </div>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">
                Stack as many as you need — one search costs the same however many filters you combine, and re-running
                the same set within {FILTER_UNLOCK_HOURS} hours is free.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {ADVANCED_FILTERS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2.5 rounded-xl bg-white/[0.06] px-3.5 py-2.5 text-[13.5px] font-semibold text-white/90"
                  >
                    <Icon size={17} weight="duotone" className="shrink-0 text-tangerine" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: LinkSimple,
                title: "Shareable searches",
                text: "Your filters live in the page URL, so you can bookmark a search or send it to a colleague.",
              },
              {
                icon: InstagramLogo,
                title: "One click to Instagram",
                text: "Every creator links to their Instagram profile, so you can review recent content yourself.",
              },
              {
                icon: Table,
                title: "Compare side by side",
                text: "Results show followers, engagement and more in one table, sortable by the metric you care about.",
              },
            ].map(({ icon, title, text }) => (
              <div key={title} className="reveal flex gap-4 rounded-[24px] border border-sand-200 bg-white p-6">
                <IconTile icon={icon} />
                <div>
                  <h3 className="text-[16px] font-bold tracking-tight">{title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-charcoal-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ MICRO & NANO */}
      <section aria-labelledby="micro-nano" className="bg-white py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              id="micro-nano"
              eyebrow="Micro & nano influencers"
              title="Find Micro and Nano Influencers Across India"
              intro="Smaller creators often have focused, local communities — a home baker followed by her neighbourhood, a fitness coach whose followers train in the same city. For many brands, that relevance matters as much as reach."
            />
            <ul className="mt-8 space-y-4">
              {[
                ["Niche relevance", "A creator who only posts about skincare speaks to people who care about skincare."],
                ["Regional audiences", "Creators in Tier 2 and Tier 3 cities reach customers metro-focused campaigns miss."],
                ["Local language", "Content in Marathi, Tamil, Bengali or Gujarati can feel native rather than translated."],
                ["Brand alignment", "Smaller creators are often more selective and closer to their audience."],
              ].map(([k, v]) => (
                <li key={k} className="flex gap-3">
                  <Check size={18} weight="bold" className="mt-1 shrink-0 text-coral" aria-hidden />
                  <p className="text-[15.5px] leading-relaxed text-charcoal-500">
                    <strong className="font-semibold text-charcoal">{k}.</strong> {v}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-2xl border border-sand-200 bg-cream/70 p-4 text-[14px] leading-relaxed text-charcoal-500">
              Smaller isn&apos;t automatically better. A national product launch may need large creators for reach;
              a regional store opening may do better with twenty local voices. Pick the tier that fits the campaign
              objective — Kudozz lets you search any of them.
            </p>
          </div>

          <div className="reveal rounded-[28px] border border-sand-200 bg-cream/60 p-6 sm:p-8">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-charcoal-400">Creator tiers by followers</h3>
            <ol className="mt-5 space-y-2.5">
              {[
                { tier: "Nano", range: "Under 10K", w: "18%", hi: true },
                { tier: "Micro", range: "10K – 100K", w: "42%", hi: true },
                { tier: "Mid-tier", range: "100K – 500K", w: "64%" },
                { tier: "Macro", range: "500K – 1M", w: "82%" },
                { tier: "Mega", range: "1M+", w: "100%" },
              ].map((t) => (
                <li key={t.tier} className="rounded-2xl bg-white p-4 ring-1 ring-sand-200/70">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="font-bold">{t.tier}</span>
                    <span className="font-semibold text-charcoal-400">{t.range}</span>
                  </div>
                  <div className="mt-2.5 h-2 rounded-full bg-sand-100">
                    <div
                      className={cn("h-full rounded-full", t.hi ? "bg-brand-gradient" : "bg-charcoal-200")}
                      style={{ width: t.w }}
                    />
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[12.5px] leading-relaxed text-charcoal-400">
              Tier labels are how Kudozz groups creators. Use follower presets or type an exact range.
            </p>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ NICHE / LOCATION / LANGUAGE */}
      <section aria-labelledby="niche-location" className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="niche-location"
            eyebrow="Niche, location & language"
            title="Find Influencers by Niche, Location and Language"
            intro="India isn't one market. Combine niche, state, city and language filters to describe the creator your campaign needs — including creators outside the big metros."
          />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SEARCH_EXAMPLES.map((ex) => (
              <li
                key={`${ex.niche}-${ex.where}`}
                className="reveal flex flex-col gap-3 rounded-[22px] border border-sand-200 bg-white p-5 transition-shadow hover:shadow-soft"
              >
                <p className="text-[15.5px] font-bold tracking-tight">
                  {ex.lang
                    ? `${ex.lang}-speaking creators in ${ex.where}`
                    : `${ex.niche.split(" & ")[0]} creators in ${ex.where}`}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ex.niche !== "Any niche" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-coral-50 px-2.5 py-1 text-[11.5px] font-semibold text-coral-700">
                      <Tag size={11} weight="bold" aria-hidden />
                      {ex.niche}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-full bg-coral-50 px-2.5 py-1 text-[11.5px] font-semibold text-coral-700">
                    <MapPin size={11} weight="bold" aria-hidden />
                    {ex.where}
                  </span>
                  {ex.lang && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-coral-50 px-2.5 py-1 text-[11.5px] font-semibold text-coral-700">
                      <Translate size={11} weight="bold" aria-hidden />
                      {ex.lang}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13.5px] leading-relaxed text-charcoal-400">
            These are example searches, not a promise of results for each one. Location and language options in the
            filters come from the creators in the database, so what you can select reflects current coverage.
          </p>
        </Container>
      </section>

      {/* ------------------------------------------------------------ METRICS */}
      <section aria-labelledby="metrics" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="metrics"
                eyebrow="Creator analytics"
                title="Go Beyond Follower Counts. Evaluate the Right Creator Metrics."
                intro="Followers tell you how many people could see a post. Engagement, views and posting frequency tell you how many probably will. Compare several signals before you shortlist anyone."
              />
              <div className="reveal mt-8 rounded-[24px] bg-charcoal p-6 text-white">
                <h3 className="text-[14px] font-bold">Engagement quality labels on every profile</h3>
                <div className="mt-4 space-y-3">
                  {ENGAGEMENT_BANDS.map((b) => (
                    <div key={b.label}>
                      <div className="mb-1 flex justify-between text-[12.5px] font-semibold">
                        <span>{b.label}</span>
                        <span className="text-white/55">{b.range}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div className={`h-full rounded-full bg-gradient-to-r ${b.color}`} style={{ width: b.width }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[12.5px] leading-relaxed text-white/50">
                  Labels are a quick comparison aid. They don&apos;t predict campaign results — always review the
                  creator&apos;s content too.
                </p>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {METRICS.map(({ icon, label, text }) => (
                <li key={label} className="reveal rounded-[22px] border border-sand-200 bg-cream/50 p-5">
                  <IconTile icon={icon} />
                  <h3 className="mt-4 text-[16px] font-bold tracking-tight">{label}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-charcoal-500">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <PrimaryCta cta="signup-metrics">Compare creators free</PrimaryCta>
            <p className="text-[13px] text-charcoal-400">
              Opening a full profile uses {CREDIT_COSTS.openProfile} credit the first time.
            </p>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ CONTACTS */}
      <section aria-labelledby="contacts" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="rounded-[28px] border border-sand-200 bg-white p-6 shadow-lift sm:p-8">
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-charcoal-400">Contact details</p>
              <div className="mt-5 space-y-3">
                <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-cream/70 p-4">
                  <EnvelopeSimple size={20} weight="duotone" className="text-coral" aria-hidden />
                  <span className="text-[14px] font-semibold">Email on file</span>
                  <span className="ml-auto">
                    <CreditPill cost={CREDIT_COSTS.revealEmail} label="credit to reveal" />
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-cream/70 p-4">
                  <Phone size={20} weight="duotone" className="text-coral" aria-hidden />
                  <span className="text-[14px] font-semibold">Phone on file</span>
                  <span className="ml-auto">
                    <CreditPill cost={CREDIT_COSTS.revealPhone} label="credits to reveal" />
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-sand-300 p-4 text-charcoal-400">
                  <Phone size={20} weight="duotone" aria-hidden />
                  <span className="text-[14px] font-semibold">Not available</span>
                  <span className="ml-auto text-[12.5px] font-bold text-emerald-700">0 credits charged</span>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              id="contacts"
              eyebrow="Creator contacts"
              title="Find Creator Contact Details and Simplify Outreach"
              intro="When a creator makes your shortlist, reveal the email or phone number on file and contact them directly."
            />
            <ul className="mt-8 space-y-3.5">
              {[
                "Results show whether an email or phone is available before you spend credits — and you can filter for creators who have one.",
                `Revealing an email costs ${CREDIT_COSTS.revealEmail} credit; a phone number costs ${CREDIT_COSTS.revealPhone}. If nothing is on file, you aren't charged.`,
                "Revealed contacts stay unlocked on your account, so you never pay twice for the same one.",
                "Not every creator has contact details listed, and availability varies.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-[15.5px] leading-relaxed text-charcoal-500">
                  <Check size={18} weight="bold" className="mt-1 shrink-0 text-coral" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex gap-2.5 rounded-2xl bg-white p-4 text-[13.5px] leading-relaxed text-charcoal-500 ring-1 ring-sand-200">
              <ShieldCheck size={18} weight="fill" className="mt-0.5 shrink-0 text-emerald-600" aria-hidden />
              Use contact details only for relevant collaboration outreach, and in line with applicable privacy law —
              including India&apos;s Digital Personal Data Protection Act, 2023 — and Instagram&apos;s terms.
            </p>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ LISTS */}
      <section aria-labelledby="lists" className="bg-white py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              id="lists"
              eyebrow="My lists"
              title="Organise Your Influencer Research with Creator Lists"
              intro="Keep every promising creator in one place instead of a scattered spreadsheet."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                ["Save in one click", "Add a creator to a list from search results or their profile."],
                ["Multiple lists", `Up to ${MAX_LISTS_PER_USER} lists, each holding up to ${MAX_CREATORS_PER_LIST} creators.`],
                ["Organise your way", "By campaign, client, niche or city — with a name and description."],
                ["Revisit any time", "Come back to saved creators when planning the next brief."],
              ].map(([k, v]) => (
                <li key={k} className="rounded-2xl bg-cream/70 p-4">
                  <h3 className="text-[15px] font-bold tracking-tight">{k}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-charcoal-500">{v}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-[28px] border border-sand-200 bg-cream/60 p-6 sm:p-8" aria-hidden>
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-bold">My lists</p>
              <span className="inline-flex items-center gap-1 rounded-lg bg-charcoal px-2.5 py-1.5 text-[12px] font-semibold text-white">
                <Plus size={12} weight="bold" />
                New list
              </span>
            </div>
            <div className="mt-5 space-y-2.5">
              {[
                { n: "Festive drop — Maharashtra", d: "Fashion, Marathi + Hindi", c: 18 },
                { n: "Café launch — Bengaluru", d: "Food creators, 5K–50K", c: 9 },
                { n: "Fitness reels — Q1", d: "Health & Fitness, ER ≥ 3%", c: 24 },
                { n: "Client: skincare brand", d: "Beauty, Tier 2 cities", c: 31 },
              ].map((l) => (
                <div key={l.n} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-sand-200/70">
                  <Folders size={20} weight="fill" className="shrink-0 text-tangerine" />
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold">{l.n}</p>
                    <p className="truncate text-[12px] text-charcoal-400">{l.d}</p>
                  </div>
                  <span className="ml-auto rounded-full bg-coral-50 px-2 py-0.5 text-[11.5px] font-bold text-coral-700">
                    {l.c}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-charcoal-400">Example lists for illustration.</p>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ HOW IT WORKS */}
      <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-20 py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="how-title"
            center
            eyebrow="How it works"
            title="How Kudozz Influencer Discovery Works"
            intro="From sign-up to a contactable shortlist in four steps."
          />
          <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="reveal relative rounded-[24px] border border-sand-200 bg-white p-6 shadow-soft">
                <span className="relative flex h-[44px] w-[44px] items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
                  <Icon size={22} weight="duotone" aria-hidden />
                </span>
                <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-coral-700">Step {i + 1}</p>
                <h3 className="mt-1 text-[18px] font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-charcoal-500">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex justify-center">
            <PrimaryCta cta="signup-how">Create your free account</PrimaryCta>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ AUDIENCES */}
      <section aria-labelledby="audiences" className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="audiences"
            eyebrow="Who it's for"
            title="Built for Brands, Agencies and Growing Businesses"
            intro="Kudozz handles the creator research. Strategy, briefs, negotiation and campaign management stay with you."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {AUDIENCES.map(({ icon, title, text }, i) => (
              <li
                key={title}
                className={cn(
                  "reveal rounded-[24px] border border-sand-200 p-6",
                  i < 2 ? "bg-cream/70 lg:col-span-3" : "bg-white lg:col-span-2",
                )}
              >
                <IconTile icon={icon} />
                <h3 className="mt-5 text-[18px] font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-charcoal-500">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------ CATEGORIES */}
      <section aria-labelledby="categories" className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <SectionHeading
                id="categories"
                eyebrow="Categories & platforms"
                title="Discover Creators Across Different Categories"
                intro="Filter by one category or several. Creators can belong to more than one."
              />
              <div className="mt-8 rounded-[24px] border border-sand-200 bg-white p-5">
                <h3 className="flex items-center gap-2 text-[15px] font-bold">
                  <InstagramLogo size={20} weight="duotone" className="text-coral" aria-hidden />
                  Platform coverage
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-charcoal-500">
                  Kudozz currently covers <strong className="font-semibold text-charcoal">Instagram</strong> creators.
                  YouTube and other platforms aren&apos;t available yet.
                </p>
              </div>
            </div>
            <ul className="flex flex-wrap content-start gap-2.5">
              {visibleNiches.map((n) => (
                <li
                  key={n.slug}
                  className="rounded-full border border-sand-200 bg-white px-4 py-2.5 text-[14.5px] font-semibold text-charcoal-600 shadow-soft"
                >
                  {n.label}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ PRICING */}
      <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-20 bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="pricing-title"
            center
            eyebrow="Pricing"
            title="Flexible Credits. Pay for the Creator Insights You Need."
            intro={`No subscription. Start with ${SIGNUP_CREDITS} free credits (valid for ${SIGNUP_CREDIT_DAYS} days), then buy a credit pack when you need more. Purchased credits never expire.`}
          />

          <div className="mt-12 grid gap-6 rounded-[28px] border border-sand-200 bg-cream/50 p-6 sm:p-8 lg:grid-cols-[1fr_1.5fr] lg:items-center">
            <div>
              <h3 className="text-[22px] font-bold tracking-tight">What uses credits</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-charcoal-500">
                You spend credits only when you unlock something, and never twice for the same thing. Free credits are
                used before purchased ones.
              </p>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {CREDIT_ROWS.map(({ icon: Icon, label, note, cost }) => (
                <li
                  key={label}
                  className={cn("flex items-center gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-sand-200/80", cost === 0 && "sm:col-span-2")}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral-50 text-coral" aria-hidden>
                    <Icon size={19} weight="duotone" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-bold">{label}</p>
                    <p className="text-[12.5px] text-charcoal-400">{note}</p>
                  </div>
                  {cost === 0 ? (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[12.5px] font-bold text-emerald-700">Free</span>
                  ) : (
                    <CreditPill cost={cost} />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <h3 className="mt-14 text-center text-[13px] font-bold uppercase tracking-[0.14em] text-charcoal-400">
            Credit packs
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CREDIT_PACKS.map((pack) => {
              const savings = savingsPercent(pack);
              return (
                <li
                  key={pack.id}
                  className={cn(
                    "relative flex flex-col rounded-[26px] border bg-white p-6",
                    pack.popular
                      ? "border-coral shadow-[0_0_0_4px_rgba(243,107,74,0.12),0_30px_60px_-30px_rgba(243,107,74,0.5)]"
                      : "border-sand-200",
                  )}
                >
                  {pack.popular && (
                    <span className="absolute -top-3 left-6 whitespace-nowrap rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                      Most popular
                    </span>
                  )}
                  <p className="text-[16px] font-bold">{pack.name}</p>
                  <p className="text-[13px] text-charcoal-400">{pack.tagline}</p>
                  <p className="mt-5 text-[38px] font-bold leading-none tracking-tight">{formatInr(pack.priceInr)}</p>
                  <p className="mt-2 text-[14px] font-semibold text-charcoal-600">
                    {pack.credits.toLocaleString("en-IN")} credits
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-[12.5px] text-charcoal-400">
                    {formatInr(perCredit(pack), 2)} per credit
                    {savings > 0 && (
                      <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[11px] font-bold text-emerald-700">
                        Save {savings}%
                      </span>
                    )}
                  </p>
                  <ul className="mb-6 mt-5 space-y-1.5 text-[13px] text-charcoal-500">
                    <li>Up to {Math.floor(pack.credits / CREDIT_COSTS.openProfile).toLocaleString("en-IN")} profile opens</li>
                    <li>
                      or up to {Math.floor(pack.credits / CREDIT_COSTS.advancedFilter).toLocaleString("en-IN")} advanced
                      searches
                    </li>
                  </ul>
                  <Link
                    href={SIGNUP_HREF}
                    data-cta={`pricing-${pack.id}`}
                    className={cn(
                      "mt-auto inline-flex h-11 items-center justify-center rounded-xl text-[14.5px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral",
                      pack.popular
                        ? "bg-brand-gradient text-white shadow-glow hover:brightness-[1.05]"
                        : "border border-sand-200 bg-white text-charcoal hover:border-sand-300",
                    )}
                  >
                    Get Started
                    <span className="sr-only"> with the {pack.name} pack</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-[13px] text-charcoal-400">
            <ShieldCheck size={16} weight="fill" className="text-emerald-600" aria-hidden />
            Prices in INR. Packs are bought inside the app after sign-up, with secure payment by Razorpay (UPI, cards,
            netbanking).
          </p>
        </Container>
      </section>

      {/* ------------------------------------------------------------ FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              id="faq-title"
              eyebrow="FAQs"
              title="Frequently Asked Questions About Influencer Discovery"
              className="lg:sticky lg:top-28"
              intro={
                <>
                  Still curious? Email{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-coral-700 underline-offset-2 hover:underline">
                    {SUPPORT_EMAIL}
                  </a>
                  .
                </>
              }
            />
          </div>
          <div className="divide-y divide-sand-200 rounded-[28px] border border-sand-200 bg-white px-5 sm:px-8">
            {FAQS.map((f, i) => (
              <details key={f.q} className="group py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-lg text-[16px] font-bold leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 [&::-webkit-details-marker]:hidden">
                  <h3>{f.q}</h3>
                  <span
                    aria-hidden
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-charcoal-400 ring-1 ring-sand-200 transition-transform group-open:rotate-45"
                  >
                    <Plus size={13} weight="bold" />
                  </span>
                </summary>
                <p className="mt-3 pr-2 text-[15px] leading-relaxed text-charcoal-500 sm:pr-10">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ FINAL CTA */}
      <section aria-labelledby="final-cta" className="px-4 pb-20 sm:px-6">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[32px] bg-charcoal px-6 py-16 text-white sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-coral/40 blur-[110px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-tangerine/25 blur-[110px]" />
          <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <h2
                id="final-cta"
                className="text-balance font-display text-[34px] font-medium leading-[1.06] tracking-[-0.02em] sm:text-[50px]"
              >
                Start Finding the Right Creators for Your <span className="italic text-tangerine">Next Campaign</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-[16px] leading-relaxed text-white/65 sm:text-[17px]">
                Spend less time searching manually and more time building meaningful creator partnerships.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryCta cta="signup-final" className="focus-visible:ring-offset-charcoal" />
                <SecondaryCta href="#pricing" dark cta="pricing-final">
                  Explore Pricing
                </SecondaryCta>
              </div>
            </div>
            <ul className="space-y-3 text-[15px]" aria-label="What you get when you sign up">
              {[
                `${SIGNUP_CREDITS} free credits, valid for ${SIGNUP_CREDIT_DAYS} days`,
                "Free basic search by name and follower range",
                "Advanced filters, creator profiles and lists",
                "No subscription — top up only when you need to",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 text-white/85">
                  <CheckCircle size={18} weight="fill" className="shrink-0 text-tangerine" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>

    <LandingFooter />
  </div>
);

export default LandingPage;
