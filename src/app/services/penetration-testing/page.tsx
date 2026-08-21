import React from "react";
import type { Metadata } from "next";
import VAPTPage from "@/app/services/vapt/page";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "Penetration Testing Services | CREST-Accredited | Entersoft";
const DESCRIPTION =
  "Identify exploitable risk across applications, networks, cloud infrastructure and identity systems with CREST-accredited penetration testing.";
const CANONICAL = getCanonicalUrl(ROUTES.services.vapt);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
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

export default function PenetrationTestingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.entersoftsecurity.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://www.entersoftsecurity.com/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Penetration Testing",
        "item": CANONICAL
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VAPTPage />
    </>
  );
}
