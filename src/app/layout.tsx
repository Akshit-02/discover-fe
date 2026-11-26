import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { APP_NAME, APP_TAGLINE, BRAND_NAME, SITE_URL } from "@/config/brand";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: APP_NAME, template: `%s · ${BRAND_NAME} Discovery` },
  applicationName: APP_NAME,
  description: APP_TAGLINE,
  // Favicon comes from app/icon.svg (Next adds the <link> automatically).
};

export const viewport: Viewport = {
  themeColor: "#FFF7F1",
};

// The Redux store (and redux-persist's PersistGate) is mounted only by the routes that need it
// — app/(auth)/layout.tsx and app/dashboard/layout.tsx — so public pages server-render their full HTML.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
