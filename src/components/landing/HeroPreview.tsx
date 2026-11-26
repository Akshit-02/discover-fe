import {
  CaretDown,
  ChartLineUp,
  EnvelopeSimple,
  Eye,
  Heart,
  ImagesSquare,
  InstagramLogo,
  LockSimple,
  MagnifyingGlass,
  MapPin,
  Phone,
  Plus,
  SealCheck,
  SlidersHorizontal,
  Tag,
  Translate,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import Avatar from "@/components/ui/Avatar";
import { CREDIT_COSTS } from "@/lib/constants/credits";

/*
 * Static mock of the real Discover screen (components/discover + creators/CreatorDrawer).
 * Creators and numbers are invented sample data; the frame says so.
 */
const rows = [
  { name: "Riya Menon", handle: "riya.wears", city: "Mumbai", followers: "8.4K", er: "6.8%", views: "5.1K", tone: "great" },
  { name: "Arjun Desai", handle: "arjun.threads", city: "Pune", followers: "42K", er: "4.1%", views: "18K", tone: "good" },
  { name: "Sana Qureshi", handle: "sanastyles", city: "Mumbai", followers: "6.2K", er: "5.3%", views: "3.9K", tone: "good" },
  { name: "Neel Joshi", handle: "neel.fits", city: "Nagpur", followers: "17K", er: "3.4%", views: "7.6K", tone: "good" },
] as const;

const chips = [
  { icon: Tag, label: "Fashion & Lifestyle" },
  { icon: MapPin, label: "Maharashtra" },
  { icon: Translate, label: "Marathi" },
  { icon: ChartLineUp, label: "ER ≥ 3%" },
];

const quality = { great: "bg-emerald-50 text-emerald-700", good: "bg-coral-50 text-coral-700" } as const;
const qualityLabel = { great: "Exceptional", good: "Strong" } as const;

const HeroPreview = () => (
  <figure className="relative mx-auto w-full max-w-[1120px]">
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-x-6 -top-8 bottom-6 rounded-[48px] bg-brand-gradient opacity-[0.16] blur-[70px]"
    />

    <div className="relative overflow-hidden rounded-[22px] border border-sand-200 bg-white shadow-[0_40px_100px_-40px_rgba(32,33,36,0.45)] sm:rounded-[28px]">
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-sand-100 bg-cream/60 px-4 py-2.5 sm:px-5 sm:py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57] sm:h-3 sm:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E] sm:h-3 sm:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840] sm:h-3 sm:w-3" />
        <span className="mx-auto truncate rounded-lg bg-white px-3 py-1 text-[11px] font-medium text-charcoal-400 ring-1 ring-sand-200 sm:px-4 sm:text-[11.5px]">
          discover.kudozz.in/dashboard/discover
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* search + results */}
        <div className="min-w-0 space-y-3.5 p-3.5 sm:p-5">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex h-11 flex-1 items-center gap-2.5 rounded-2xl border border-sand-200 bg-white px-3.5 shadow-soft">
              <MagnifyingGlass size={17} weight="bold" className="text-charcoal-300" />
              <span className="truncate text-[13.5px] text-charcoal-300">Search by name or @username…</span>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl border border-sand-200 bg-white px-3 text-[12.5px] font-semibold text-charcoal shadow-soft md:flex-none">
                <UsersThree size={16} weight="duotone" className="text-coral" />
                5K – 100K
                <CaretDown size={11} weight="bold" className="text-charcoal-300" />
              </span>
              <span className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl bg-charcoal px-3 text-[12.5px] font-semibold text-white md:flex-none">
                <SlidersHorizontal size={16} weight="duotone" className="text-tangerine" />
                Advanced filters
                <span className="rounded-full bg-coral px-1.5 py-0.5 text-[10px] font-bold leading-none">4</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {chips.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full bg-coral-50 px-2.5 py-1 text-[11.5px] font-semibold text-coral-700"
              >
                <Icon size={12} weight="bold" />
                {label}
              </span>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-sand-100">
            <div className="hidden grid-cols-[minmax(0,2fr)_0.9fr_1.1fr_0.9fr_auto] gap-3 border-b border-sand-100 bg-cream/50 px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-charcoal-400 sm:grid">
              <span>Creator</span>
              <span>Followers</span>
              <span>Engagement</span>
              <span>Avg. views</span>
              <span className="w-[74px]">Contact</span>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.handle}
                className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-sand-100 px-3.5 py-3 last:border-0 sm:grid-cols-[minmax(0,2fr)_0.9fr_1.1fr_0.9fr_auto] sm:px-4 ${
                  i === 0 ? "bg-coral-50/40" : ""
                } ${i === 3 ? "hidden sm:grid" : ""}`}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <Avatar name={r.name} seed={r.handle} size="md" />
                  <div className="min-w-0">
                    <p className="flex items-center gap-1 truncate text-[13.5px] font-bold text-charcoal">
                      {r.name}
                      {i === 1 && <SealCheck size={13} weight="fill" className="shrink-0 text-coral" />}
                    </p>
                    <p className="flex items-center gap-1 truncate text-[11.5px] text-charcoal-400">
                      <InstagramLogo size={11} weight="duotone" />@{r.handle} · {r.city}
                    </p>
                    <p className="mt-0.5 text-[11.5px] font-semibold text-charcoal sm:hidden">
                      {r.followers} followers · {r.er} ER
                    </p>
                  </div>
                </div>
                <span className="hidden text-[13.5px] font-bold text-charcoal sm:block">{r.followers}</span>
                <span className="hidden items-center gap-1.5 sm:flex">
                  <span className="text-[13.5px] font-bold text-charcoal">{r.er}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${quality[r.tone]}`}>
                    {qualityLabel[r.tone]}
                  </span>
                </span>
                <span className="hidden text-[13.5px] font-semibold text-charcoal-600 sm:block">{r.views}</span>
                <span className="inline-flex w-[74px] items-center justify-center gap-1 rounded-lg border border-sand-200 px-2 py-1.5 text-[11px] font-semibold text-charcoal">
                  <EnvelopeSimple size={11} weight="bold" className="text-coral" />
                  <Phone size={11} weight="bold" className="text-coral" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* profile drawer */}
        <aside className="hidden border-l border-sand-100 bg-cream/40 p-5 lg:block">
          <div className="flex items-center gap-3">
            <Avatar name="Riya Menon" seed="riya.wears" size="lg" />
            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold text-charcoal">Riya Menon</p>
              <p className="truncate text-[12px] text-charcoal-400">@riya.wears · Mumbai, Maharashtra</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-sand-100 bg-white p-3.5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] font-medium text-charcoal-400">Engagement rate</p>
                <p className="text-[24px] font-bold leading-tight tracking-tight text-charcoal">6.80%</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700">
                Exceptional
              </span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-sand-100">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
            </div>
          </div>
          <dl className="mt-2.5 grid grid-cols-2 gap-2">
            {[
              { icon: UsersThree, k: "Followers", v: "8.4K" },
              { icon: ImagesSquare, k: "Posts", v: "312" },
              { icon: Eye, k: "Avg. views", v: "5.1K" },
              { icon: Heart, k: "Avg. likes", v: "540" },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="rounded-xl border border-sand-100 bg-white px-3 py-2">
                <dt className="flex items-center gap-1 text-[10.5px] font-medium text-charcoal-400">
                  <Icon size={11} weight="duotone" />
                  {k}
                </dt>
                <dd className="text-[15px] font-bold text-charcoal">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-2.5 space-y-2">
            <div className="flex items-center gap-2.5 rounded-xl border border-sand-100 bg-white px-3 py-2">
              <EnvelopeSimple size={15} weight="duotone" className="text-coral" />
              <span className="text-[12px] tracking-[0.2em] text-charcoal-300">••••••••••</span>
              <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-charcoal px-2 py-1 text-[10.5px] font-semibold text-white">
                <LockSimple size={10} weight="bold" />
                {CREDIT_COSTS.revealEmail} credit
              </span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-sand-100 bg-white px-3 py-2">
              <Phone size={15} weight="duotone" className="text-coral" />
              <span className="text-[12px] tracking-[0.2em] text-charcoal-300">••••••••••</span>
              <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-charcoal px-2 py-1 text-[10.5px] font-semibold text-white">
                <LockSimple size={10} weight="bold" />
                {CREDIT_COSTS.revealPhone} credits
              </span>
            </div>
            <span className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-brand-gradient text-[12px] font-semibold text-white">
              <Plus size={12} weight="bold" />
              Save to list
            </span>
          </div>
        </aside>
      </div>
    </div>
    <figcaption className="mt-3 text-center text-[12px] text-charcoal-400">
      The Kudozz Discover screen, shown with sample creators. Names and numbers are illustrative.
    </figcaption>
  </figure>
);

export default HeroPreview;
