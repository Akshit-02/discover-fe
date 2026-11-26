import type { Metadata } from "next";
import LandingPage from "@/components/landing/LandingPage";
import StructuredData from "@/components/landing/StructuredData";
import { META } from "@/components/landing/content";
import { APP_NAME, SITE_URL } from "@/config/brand";

export const metadata: Metadata = {
  title: { absolute: META.title },
  description: META.description,
  alternates: { canonical: `${SITE_URL}/` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: APP_NAME,
    locale: "en_IN",
    title: META.ogTitle,
    description: META.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: META.ogTitle,
    description: META.ogDescription,
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <LandingPage />
    </>
  );
}
