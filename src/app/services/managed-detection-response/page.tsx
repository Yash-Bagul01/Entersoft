import React from "react";
import type { Metadata } from "next";
import CDPageRoot from "@/components/services/cyber-defense/CDPageRoot";
import ServiceCTA from "@/components/services/ServiceCTA";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "Managed Detection & Response (MDR) Services | Entersoft";
const DESCRIPTION =
  "Continuous security monitoring, threat hunting, detection engineering and incident response for enterprise cloud and hybrid environments.";
const CANONICAL = getCanonicalUrl(ROUTES.services.siem);

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

export default function ManagedDetectionResponsePage() {
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
        "name": "Managed Detection & Response",
        "item": CANONICAL
      }
    ]
  };

  return (
    <main className="w-full min-h-screen bg-[#07090E] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CDPageRoot />
      <ServiceCTA
        headline="Ready to discuss your monitoring environment?"
        buttonText="DISCUSS YOUR MONITORING ENVIRONMENT"
        buttonHref="/contact"
      />
    </main>
  );
}
