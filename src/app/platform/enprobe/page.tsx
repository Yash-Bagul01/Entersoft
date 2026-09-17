import React from "react";
import type { Metadata } from "next";
import EnprobeExoapePage from "@/components/platform/enprobe/EnprobeExoapePage";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "EnProbe — Continuous Exposure Assurance | Entersoft Security";
const DESCRIPTION =
  "See the whole exposure. Fix what matters. Prove risk is gone. EnProbe unifies ASPM, CSPM, testing, assets and verified retesting into one prioritized security view.";
const CANONICAL = getCanonicalUrl(ROUTES.platform.enprobe);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Entersoft Security",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function EnProbePlatformPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EnProbe",
    applicationCategory: "SecurityApplication",
    description: DESCRIPTION,
    url: CANONICAL,
    brand: {
      "@type": "Brand",
      name: "Entersoft Security",
    },
    offers: {
      "@type": "Offer",
      url: getCanonicalUrl(ROUTES.contact),
      availability: "https://schema.org/OnlineOnly",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EnprobeExoapePage />
    </>
  );
}
