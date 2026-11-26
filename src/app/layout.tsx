import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { APP_NAME, APP_TAGLINE, BRAND_NAME, SITE_URL } from "@/config/brand";
import Script from "next/script";
import "./globals.css";

const GTM_ID = "GTM-K6CMZ839";

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
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        {/* Google Tag Manager. The gtm.start push is what lets the container's page-view triggers fire. */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});`}
        </Script>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />
      </body>
    </html>
  );
}
