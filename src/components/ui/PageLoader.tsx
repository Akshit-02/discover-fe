import { LogoMark } from "./Logo";

const PageLoader = ({ label = "Loading your workspace" }: { label?: string }) => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-cream">
    <div className="relative">
      <span className="absolute inset-0 animate-ping rounded-xl bg-coral/30" />
      <LogoMark className="relative h-12 w-12" />
    </div>
    <p className="text-sm font-medium text-charcoal-400">{label}…</p>
  </div>
);

export default PageLoader;
