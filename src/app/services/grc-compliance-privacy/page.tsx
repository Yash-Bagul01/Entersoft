import React from "react";
import type { Metadata } from "next";
import CompliancePageRoot from "@/components/services/compliance-v2/CompliancePageRoot";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "GRC, Privacy & Audit Readiness Services | ISO 27001, SOC 2 | Entersoft";
const DESCRIPTION =
  "Translate ISO 27001, SOC 2, DPDP and regulatory security requirements into implemented technical controls, ownership and audit-ready evidence.";
const CANONICAL = getCanonicalUrl(ROUTES.services.compliance);

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

export default function GrcCompliancePrivacyPage() {
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
        "name": "GRC, Privacy & Compliance",
        "item": CANONICAL
      }
    ]
  };

  return (
    <main className="w-full min-h-screen bg-[#05070F] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CompliancePageRoot />
    </main>
  );
}
