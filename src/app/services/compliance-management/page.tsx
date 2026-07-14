import React from "react";
import type { Metadata } from "next";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";
import CompliancePageRoot from "@/components/services/compliance-v2/CompliancePageRoot";

const canonicalUrl = getCanonicalUrl(ROUTES.services.compliance);

export const metadata: Metadata = {
  title: "Compliance Management | Entersoft Security",
  description: "Achieve audit readiness for ISO 27001, GDPR, CERT-In, RBI guidelines, and SOC 2. We guide you through policy drafting, internal validation runs, and auditor liaison.",
  alternates: {
    canonical: canonicalUrl,
  },
};

export default function CompliancePage() {
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
        "name": "Compliance Management | Entersoft Security",
        "description": "Achieve audit readiness for ISO 27001, GDPR, CERT-In, RBI guidelines, and SOC 2. We guide you through policy drafting, internal validation runs, and auditor liaison.",
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
        "name": "Compliance Management",
        "serviceType": "Security Compliance Consulting & Audits",
        "provider": {
          "@id": `${APP_URL}/#organization`
        },
        "description": "Achieve audit readiness for ISO 27001, GDPR, CERT-In, RBI guidelines, and SOC 2. We guide you through policy drafting, internal validation runs, and auditor liaison.",
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
            "name": "Compliance Management",
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
      
      {/* Immersive Black & White Rebuilt Compliance Experience */}
      <CompliancePageRoot />
    </main>
  );
}
