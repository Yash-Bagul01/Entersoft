import React from "react";
import type { Metadata } from "next";
import SmartContractPageRoot from "@/components/services/smart-contract-v2/SmartContractPageRoot";
import ServiceCTA from "@/components/services/ServiceCTA";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "Smart Contract Audit & Web3 Security Services | Entersoft";
const DESCRIPTION =
  "Audit smart contracts, protocol logic and decentralized applications with formal verification, static analysis and expert manual review.";
const CANONICAL = getCanonicalUrl(ROUTES.services.smartContract);

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

export default function SmartContractSecurityPage() {
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
        "name": "Smart Contract Security",
        "item": CANONICAL
      }
    ]
  };

  return (
    <main className="w-full min-h-screen bg-[#07080a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmartContractPageRoot />
      <ServiceCTA
        headline="Ready to scope a smart contract audit?"
        buttonText="REQUEST AN AUDIT SCOPE"
        buttonHref="/contact"
      />
    </main>
  );
}
