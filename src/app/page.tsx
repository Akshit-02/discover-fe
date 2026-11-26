import type { Metadata } from "next";
import LandingPage from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: { absolute: "Kudozz Influencer Discovery — Find the right Instagram creators in India" },
  description:
    "Search Instagram creators by niche, city, language and real engagement. Build shortlists in minutes, reveal contacts in a click and pay only for what you unlock. Start free with 30 credits.",
  openGraph: {
    title: "Find creators your customers already trust — Kudozz",
    description:
      "Instagram influencer discovery for Indian brands. 12 precision filters, engagement insights, direct contacts. Start free.",
    type: "website",
  },
};

export default function HomePage() {
  return <LandingPage />;
}
