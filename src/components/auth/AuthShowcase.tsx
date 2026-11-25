import {
  ChartLineUp,
  Heart,
  InstagramLogo,
  SealCheck,
  Sparkle,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import Avatar from "@/components/ui/Avatar";

const creators = [
  { name: "Aanya Kapoor", handle: "aanya.styles", niche: "Fashion", followers: "284K", er: "6.4%" },
  { name: "Rohan Mehta", handle: "rohan.eats", niche: "Food", followers: "1.2M", er: "4.1%" },
  { name: "Meera Iyer", handle: "meera.moves", niche: "Fitness", followers: "96K", er: "8.7%" },
];

const AuthShowcase = () => (
  <div className="relative hidden h-full overflow-hidden rounded-[28px] bg-charcoal p-10 lg:flex lg:flex-col">
    <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-coral/40 blur-[120px]" />
    <div className="pointer-events-none absolute -bottom-40 -left-24 h-[380px] w-[380px] rounded-full bg-tangerine/25 blur-[120px]" />
    <div className="grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />

    <div className="relative z-10 flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
      <Sparkle size={14} weight="fill" className="text-tangerine" />
      Kudozz Influencer Discovery
    </div>

    <div className="relative z-10 mt-10 max-w-md">
      <h2 className="font-display text-[44px] font-medium leading-[1.05] tracking-[-0.02em] text-white">
        Find creators your
        <span className="italic text-tangerine"> audience </span>
        already loves.
      </h2>
      <p className="mt-4 text-[15px] leading-relaxed text-white/60">
        Search, filter and shortlist influencers by reach, engagement, niche and
        location — the same creator network Kudozz uses to run its campaigns.
      </p>
    </div>

    <div className="relative z-10 mt-auto">
      <div className="relative mx-auto w-full max-w-[420px]">
        <div className="absolute -left-6 -top-10 z-20 flex animate-float items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-lift">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coral-50">
            <ChartLineUp size={20} weight="duotone" className="text-coral" />
          </span>
          <div>
            <p className="text-[11px] font-medium text-charcoal-400">Avg. engagement</p>
            <p className="text-sm font-bold text-charcoal">+6.4% this month</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl">
          {creators.map((c, i) => (
            <div
              key={c.handle}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-white/5"
              style={{ animation: `fade-up .5s ease-out ${i * 0.12}s both` }}
            >
              <Avatar name={c.name} seed={c.handle} size="md" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-sm font-semibold text-white">
                  {c.name}
                  <SealCheck size={15} weight="fill" className="text-tangerine" />
                </p>
                <p className="flex items-center gap-1 text-xs text-white/50">
                  <InstagramLogo size={13} weight="duotone" />@{c.handle} · {c.niche}
                </p>
              </div>
              <div className="text-right">
                <p className="flex items-center justify-end gap-1 text-sm font-bold text-white">
                  <UsersThree size={14} weight="duotone" className="text-white/50" />
                  {c.followers}
                </p>
                <p className="flex items-center justify-end gap-1 text-xs font-semibold text-tangerine">
                  <Heart size={12} weight="fill" />
                  {c.er}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
        {[
          ["Reach", "Tiered by followers"],
          ["Engagement", "Quality at a glance"],
          ["Contacts", "Reach out directly"],
        ].map(([value, label]) => (
          <div key={label}>
            <p className="text-lg font-bold tracking-tight text-white">{value}</p>
            <p className="text-xs text-white/50">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AuthShowcase;
