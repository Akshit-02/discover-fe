import { APP_NAME, BRAND_NAME, LEGAL_NAME, PARENT_SITE_URL, SITE_URL, SOCIAL_LINKS, SUPPORT_EMAIL } from "@/config/brand";
import { CREDIT_PACKS } from "@/lib/constants/creditPacks";
import { FAQS, META, PRODUCT_DEFINITION } from "./content";

const HOME = `${SITE_URL}/`;
const ORG_ID = `${PARENT_SITE_URL}/#organization`;
const prices = CREDIT_PACKS.map((p) => p.priceInr);

// Everything here mirrors visible page content: no ratings, reviews or awards.
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: BRAND_NAME,
      legalName: LEGAL_NAME,
      url: PARENT_SITE_URL,
      email: SUPPORT_EMAIL,
      sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${HOME}#website`,
      url: HOME,
      name: APP_NAME,
      inLanguage: "en-IN",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "WebPage",
      "@id": `${HOME}#webpage`,
      url: HOME,
      name: META.title,
      description: META.description,
      inLanguage: "en-IN",
      isPartOf: { "@id": `${HOME}#website` },
      about: { "@id": `${HOME}#software` },
      primaryImageOfPage: `${HOME}opengraph-image`,
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${HOME}#software`,
      name: APP_NAME,
      url: HOME,
      description: PRODUCT_DEFINITION,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Influencer discovery platform",
      operatingSystem: "Web browser",
      areaServed: { "@type": "Country", name: "India" },
      audience: { "@type": "BusinessAudience", audienceType: "Brands, D2C businesses and marketing agencies" },
      publisher: { "@id": ORG_ID },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: Math.min(...prices),
        highPrice: Math.max(...prices),
        offerCount: CREDIT_PACKS.length,
        description: "One-time credit packs; no subscription.",
      },
    },
    {
      // Google limits FAQ rich results to authoritative government/health sites; the markup still describes the visible FAQ.
      "@type": "FAQPage",
      "@id": `${HOME}#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const StructuredData = () => (
  <script
    type="application/ld+json"
    // JSON.stringify output is safe here: content is static and contains no "</script".
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
  />
);

export default StructuredData;
