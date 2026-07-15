import React from "react";
import type { Metadata } from "next";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";
import SmartContractPageRoot from "@/components/services/smart-contract-v2/SmartContractPageRoot";

const canonicalUrl = getCanonicalUrl(ROUTES.services.smartContract);

export const metadata: Metadata = {
  title: "Smart Contract Audits & DeFi Web3 Security | Entersoft Security",
  description: "Secure your DeFi protocols, token contracts, and blockchain integrations. We provide rigorous smart contract audits with static analysis, symbolic fuzzing, and manual code reviews to prevent exploits.",
  alternates: {
    canonical: canonicalUrl,
  },
};

export default function SmartContractAuditsPage() {
  // Structured JSON-LD Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${APP_URL}/#organization`,
        "name": "Entersoft Security",
        "url": APP_URL,
        "logo": {
          "@type": "ImageObject",
          "@id": `${APP_URL}/#logo`,
          "url": "https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg",
          "caption": "Entersoft Security Logo"
        },
        "description": "One scan to know where you are exposed. One report to fix it fast. Award-winning cybersecurity including AppSec, VAPT, Managed Cloud Security, Compliance, SIEM, and Smart Contract audits."
      },
      {
        "@type": "WebSite",
        "@id": `${APP_URL}/#website`,
        "url": APP_URL,
        "name": "Entersoft Security",
        "publisher": {
          "@id": `${APP_URL}/#organization`
        }
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}/#webpage`,
        "url": canonicalUrl,
        "name": "Smart Contract Audits & DeFi Web3 Security | Entersoft Security",
        "description": "Secure your DeFi protocols, token contracts, and blockchain integrations. We provide rigorous smart contract audits with static analysis, symbolic fuzzing, and manual code reviews to prevent exploits.",
        "inLanguage": "en",
        "isPartOf": {
          "@id": `${APP_URL}/#website`
        },
        "about": {
          "@id": `${canonicalUrl}/#service`
        },
        "breadcrumb": {
          "@id": `${canonicalUrl}/#breadcrumb`
        }
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}/#service`,
        "name": "Smart Contract Audits",
        "serviceType": "Smart Contract Audits & Blockchain Security Consulting",
        "provider": {
          "@id": `${APP_URL}/#organization`
        },
        "description": "Secure your DeFi protocols, token contracts, and blockchain integrations. We provide rigorous smart contract audits with static analysis, symbolic fuzzing, and manual code reviews to prevent exploits.",
        "areaServed": {
          "@type": "Country",
          "name": "Global"
        },
        "url": canonicalUrl
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": getCanonicalUrl(ROUTES.home)
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Smart Contract Audits",
            "item": canonicalUrl
          }
        ]
      }
    ]
  };

  return (
    <main className="w-full flex flex-col bg-[#060606]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmartContractPageRoot />
    </main>
  );
}
