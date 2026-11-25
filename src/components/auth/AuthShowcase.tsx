import {
  Coins,
  EnvelopeSimple,
  Heart,
  InstagramLogo,
  LockSimple,
  MagnifyingGlass,
  SealCheck,
  ShieldCheck,
  SlidersHorizontal,
  Sparkle,
  Target,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import Avatar from "@/components/ui/Avatar";

const creators = [
  { name: "Aanya Kapoor", handle: "aanya.styles", city: "Mumbai", followers: "48.2K", er: "6.4%" },
  { name: "Rohan Mehta", handle: "rohan.eats", city: "Pune", followers: "21.7K", er: "5.1%" },
  { name: "Meera Iyer", handle: "meera.moves", city: "Bengaluru", followers: "36.9K", er: "8.7%" },
];

const chips = ["Fashion & lifestyle", "10K – 50K", "ER ≥ 4%"];

const points = [
  { icon: Target, title: "Precise filters", text: "Niche, location, language" },
  { icon: SealCheck, title: "Quality signals", text: "Engagement at a glance" },
  { icon: ShieldCheck, title: "Pay per reveal", text: "Only for what you use" },
];

// Height-aware: on short screens the secondary blocks drop out so nothing overflows.
const short = "[@media(max-height:760px)]:hidden";
const tiny = "[@media(max-height:640px)]:hidden";

const AuthShowcase = () => (
  <div className="relative hidden min-h-0 overflow-hidden rounded-[28px] bg-charcoal lg:flex lg:flex-col">
    <div className="pointer-events-none absolute -right-32 -top-40 h-[460px] w-[460px] rounded-full bg-coral/40 blur-[120px]" />
    <div className="pointer-events-none absolute -bottom-48 -left-24 h-[400px] w-[400px] rounded-full bg-tangerine/20 blur-[120px]" />
    <div className="grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(ellipse at 70% 30%, black, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at 70% 30%, black, transparent 70%)",
      }}
    />

    <div className="relative z-10 flex min-h-0 flex-1 flex-col p-8 xl:p-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
          <Sparkle size={14} weight="fill" className="text-tangerine" />
          Kudozz Influencer Discovery
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-tangerine/15 px-3 py-1.5 text-xs font-semibold text-tangerine">
          <Coins size={14} weight="fill" />
          30 free credits on signup
        </span>
      </div>

      <div className="mt-8 max-w-[480px] [@media(max-height:760px)]:mt-6">
        <h2 className="font-display text-[clamp(30px,4.6vh,44px)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
          Find creators your <span className="italic text-tangerine">audience</span> already loves.
        </h2>
        <p className={`mt-3 max-w-[420px] text-[14.5px] leading-relaxed text-white/55 ${tiny}`}>
          Search, filter and shortlist Indian creators by reach, engagement, niche and location — then reveal
          contacts only when you&apos;re ready to reach out.
        </p>
      </div>

      {/* Product preview */}
      <div className="flex min-h-0 flex-1 items-center justify-center py-6">
        <div className="relative w-full max-w-[460px]">
          <div className="absolute -right-3 -top-4 z-20 flex animate-float items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-lift">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-coral-50">
              <EnvelopeSimple size={17} weight="duotone" className="text-coral" />
            </span>
            <div className="leading-tight">
              <p className="text-[10.5px] font-medium text-charcoal-400">Contact revealed</p>
              <p className="text-[13px] font-bold text-charcoal">aanya@studio.in</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">Discover</span>
            </div>

            <div className="space-y-2.5 p-3.5">
              <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5">
                <MagnifyingGlass size={16} weight="bold" className="text-coral" />
                <span className="flex-1 text-[13px] text-charcoal-400">Fashion creators in Mumbai</span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-charcoal px-2 py-1 text-[10.5px] font-semibold text-white">
                  <SlidersHorizontal size={11} weight="bold" className="text-tangerine" />3
                </span>
              </div>
              <div className={`flex flex-wrap gap-1.5 ${short}`}>
                {chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-white/70"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="divide-y divide-white/[0.06] rounded-2xl bg-white/[0.03]">
                {creators.map((c, i) => (
                  <div
                    key={c.handle}
                    className={`flex items-center gap-3 px-3 py-2.5 ${i === 2 ? short : ""}`}
                    style={{ animation: `fade-up .5s ease-out ${0.15 + i * 0.12}s both` }}
                  >
                    <Avatar name={c.name} seed={c.handle} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1 truncate text-[13.5px] font-semibold text-white">
                        {c.name}
                        <SealCheck size={14} weight="fill" className="shrink-0 text-tangerine" />
                      </p>
                      <p className="flex items-center gap-1 truncate text-[11.5px] text-white/45">
                        <InstagramLogo size={12} weight="duotone" />@{c.handle} · {c.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="flex items-center justify-end gap-1 text-[13px] font-bold text-white">
                        <UsersThree size={13} weight="duotone" className="text-white/45" />
                        {c.followers}
                      </p>
                      <p className="flex items-center justify-end gap-1 text-[11.5px] font-semibold text-tangerine">
                        <Heart size={11} weight="fill" />
                        {c.er}
                      </p>
                    </div>
                    <span className="hidden items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-[10.5px] font-semibold text-white/55 xl:inline-flex">
                      <LockSimple size={11} weight="bold" />
                      Email
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`grid shrink-0 grid-cols-3 gap-4 border-t border-white/10 pt-5 ${short}`}>
        {points.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-tangerine">
              <Icon size={16} weight="duotone" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-white">{title}</p>
              <p className="text-[11.5px] leading-snug text-white/45">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AuthShowcase;
