import {
  CaretDown,
  ChartLineUp,
  Coins,
  EnvelopeSimple,
  Heart,
  InstagramLogo,
  LockSimple,
  MagnifyingGlass,
  MapPin,
  SealCheck,
  SlidersHorizontal,
  Translate,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import Avatar from "@/components/ui/Avatar";

const rows = [
  { name: "Aanya Kapoor", handle: "aanya.styles", city: "Mumbai", followers: "8.4K", er: "7.2%", label: "Exceptional" },
  { name: "Ishaan Verma", handle: "ishaan.fits", city: "Delhi", followers: "6.1K", er: "5.8%", label: "Strong" },
  { name: "Meera Iyer", handle: "meera.moves", city: "Bengaluru", followers: "9.7K", er: "6.9%", label: "Exceptional" },
  { name: "Kabir Shah", handle: "kabir.wears", city: "Ahmedabad", followers: "4.3K", er: "4.6%", label: "Strong" },
];

const filters = [
  { icon: <SlidersHorizontal size={13} weight="bold" />, label: "Fashion & Lifestyle" },
  { icon: <MapPin size={13} weight="bold" />, label: "Maharashtra" },
  { icon: <Translate size={13} weight="bold" />, label: "Hindi" },
  { icon: <ChartLineUp size={13} weight="bold" />, label: "ER ≥ 4%" },
];

/** Static product mock for the hero; mirrors the real Discover screen. */
const HeroPreview = () => (
  <div className="relative mx-auto w-full max-w-[1040px]">
    <div className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 rounded-[48px] bg-brand-gradient opacity-[0.18] blur-[80px]" />

    {/* floating cards */}
    <div className="absolute -bottom-6 -left-8 z-20 hidden animate-float items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-lift lg:flex">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
        <EnvelopeSimple size={19} weight="duotone" />
      </span>
      <div className="leading-tight">
        <p className="text-[11px] font-medium text-charcoal-400">Email revealed</p>
        <p className="text-[13.5px] font-bold text-charcoal">aanya@studio.in</p>
      </div>
    </div>
    <div
      className="absolute -right-8 -top-7 z-20 hidden animate-float items-center gap-2.5 rounded-2xl bg-charcoal px-3.5 py-2.5 text-white shadow-lift lg:flex"
      style={{ animationDelay: "1.5s" }}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-tangerine">
        <Coins size={19} weight="fill" />
      </span>
      <div className="leading-tight">
        <p className="text-[11px] font-medium text-white/50">Only pay for what you unlock</p>
        <p className="text-[13.5px] font-bold">1 credit · 1 profile</p>
      </div>
    </div>

    <div className="relative overflow-hidden rounded-[28px] border border-sand-200 bg-white shadow-[0_40px_100px_-40px_rgba(32,33,36,0.45)]">
      <div className="flex items-center gap-1.5 border-b border-sand-100 bg-cream/60 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="mx-auto rounded-lg bg-white px-4 py-1 text-[11.5px] font-medium text-charcoal-400 ring-1 ring-sand-200">
          Kudozz · Discover
        </span>
      </div>

      <div className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-col gap-2.5 md:flex-row">
          <div className="flex h-12 flex-1 items-center gap-3 rounded-2xl border border-coral bg-white px-4 ring-4 ring-coral/10">
            <MagnifyingGlass size={18} weight="bold" className="text-coral" />
            <span className="text-[14px] text-charcoal-400">Search by name or @username…</span>
          </div>
          <div className="flex gap-2.5">
            <span className="inline-flex h-12 items-center gap-2 rounded-2xl border border-sand-200 px-4 text-[13px] font-semibold text-charcoal">
              <UsersThree size={17} weight="duotone" className="text-coral" />
              <span className="text-charcoal-400">Followers:</span> 1K – 10K
              <CaretDown size={12} weight="bold" className="text-charcoal-300" />
            </span>
            <span className="inline-flex h-12 items-center gap-2 rounded-2xl bg-charcoal px-4 text-[13px] font-semibold text-white">
              <SlidersHorizontal size={17} weight="duotone" className="text-tangerine" />
              <span className="hidden sm:inline">Advanced filters</span>
              <span className="rounded-full bg-coral px-1.5 py-0.5 text-[10px] font-bold leading-none">4</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <span
              key={f.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-coral-50 px-2.5 py-1 text-[11.5px] font-semibold text-coral-700"
            >
              {f.icon}
              {f.label}
            </span>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-sand-100">
          <div className="hidden grid-cols-[minmax(0,2fr)_1fr_1fr_1.2fr_auto] gap-4 border-b border-sand-100 bg-cream/50 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-charcoal-400 sm:grid">
            <span>Creator</span>
            <span>Followers</span>
            <span>Engagement</span>
            <span>Quality</span>
            <span className="w-[92px]">Contact</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.handle}
              className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-sand-100 px-4 py-3 last:border-0 sm:grid-cols-[minmax(0,2fr)_1fr_1fr_1.2fr_auto] ${i === 3 ? "hidden sm:grid" : ""}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={r.name} seed={r.handle} size="md" ring />
                <div className="min-w-0">
                  <p className="flex items-center gap-1 truncate text-[14px] font-bold text-charcoal">
                    {r.name}
                    <SealCheck size={14} weight="fill" className="shrink-0 text-coral" />
                  </p>
                  <p className="flex items-center gap-1 truncate text-[12px] text-charcoal-400">
                    <InstagramLogo size={12} weight="duotone" />@{r.handle} · {r.city}
                  </p>
                </div>
              </div>
              <span className="hidden text-[14px] font-bold text-charcoal sm:block">{r.followers}</span>
              <span className="hidden items-center gap-1 text-[14px] font-bold text-charcoal sm:flex">
                <Heart size={13} weight="fill" className="text-coral" />
                {r.er}
              </span>
              <span className="hidden sm:block">
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${r.label === "Exceptional" ? "bg-emerald-50 text-emerald-700" : "bg-coral-50 text-coral-700"}`}
                >
                  {r.label}
                </span>
              </span>
              <span className="inline-flex w-[92px] items-center justify-center gap-1 rounded-lg bg-charcoal px-2 py-1.5 text-[11px] font-semibold text-white">
                <LockSimple size={11} weight="bold" />
                Reveal
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HeroPreview;
