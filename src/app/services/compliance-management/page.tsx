import React from "react";
import type { Metadata } from "next";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";
import CompliancePageRoot from "@/components/services/compliance-v2/CompliancePageRoot";

const canonicalUrl = getCanonicalUrl(ROUTES.services.compliance);

const TITLE = "GRC, Privacy & Compliance Consulting Services | Entersoft";
const DESCRIPTION =
  "Turn ISO 27001, SOC 2, DPDP, GDPR, PCI DSS and sector requirements into implemented controls, evidence and sustainable compliance operations.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: canonicalUrl,
    siteName: "Entersoft Security",
    locale: "en_US",
    type: "website",
  },
};

export default function CompliancePage() {
  // Structured JSON-LD Data for Enterprise SEO
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
        "description": "One scan to know where you are exposed. One report to fix it fast. Award-winning cybersecurity including AppSec, VAPT, Managed Cloud Security, Digital Trust, SIEM, and Smart Contract audits."
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
        "name": TITLE,
        "description": DESCRIPTION,
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
        "name": "Digital Trust & Regulatory Assurance",
        "serviceType": "Cyber Risk Governance & Regulatory Assurance",
        "provider": {
          "@id": `${APP_URL}/#organization`
        },
        "description": "Transform cyber risk into board-ready digital trust. End-to-end certification readiness, data privacy governance, continuous evidence collection, and registrar advocacy for ISO 27001, SOC 2, GDPR, and RBI guidelines.",
        "areaServed": {
          "@type": "Country",
          "name": "Global"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Trust Core Pillars",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Regulatory & Framework Certification Support",
                "description": "Turnkey readiness consulting, gap discovery, custom policy engineering, and technical liaison for ISO 27001, SOC 2 Type II, PCI-DSS, and HIPAA."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Data Privacy & Jurisdictional Sovereignty",
                "description": "Data mapping, GDPR & DPDP compliance, PII residency boundary enforcement, and cryptographic key custody verification."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Continuous Compliance & Evidence Telemetry",
                "description": "Continuous automated evidence collection, real-time cloud configuration drift detection, and tamper-proof audit vaults."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Third-Party & Vendor Risk Management (TPRM)",
                "description": "Software supply chain security evaluations, vendor risk tiering, sub-processor audits, and ongoing vulnerability monitoring."
              }
            }
          ]
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
            "name": "Digital Trust",
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
      
      {/* Immersive Digital Trust Experience */}
      <CompliancePageRoot />
    </main>
  );
}
