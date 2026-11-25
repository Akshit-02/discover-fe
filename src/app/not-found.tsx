import Link from "next/link";
import { LogoMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <LogoMark className="h-12 w-12" />
      <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-charcoal">
        Page not <span className="italic text-coral">found</span>
      </h1>
      <p className="mt-3 text-charcoal-400">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link
        href="/dashboard/discover"
        className="mt-8 inline-flex h-11 items-center rounded-xl bg-brand-gradient px-5 text-sm font-semibold text-white shadow-glow"
      >
        Back to Discover
      </Link>
    </main>
  );
}
