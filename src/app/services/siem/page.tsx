import React from "react";
import type { Metadata } from "next";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";
import CDPageRoot from "@/components/services/cyber-defense/CDPageRoot";

const TITLE = "Managed Detection & Response and SIEM Services | Entersoft";
const DESCRIPTION =
  "Strengthen 24/7 threat monitoring with managed detection and response, SIEM engineering, threat hunting and analyst-led incident investigation.";
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
};

export default function CyberDefensePage() {
  const canonicalUrl = CANONICAL;

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
        "description": "One scan to know where you are exposed. One report to fix it fast. Award-winning cybersecurity including AppSec, VAPT, Managed Cloud Security, Compliance, Cyber Defense Operations, and Smart Contract audits."
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
        "name": "Cyber Defense Operations",
        "serviceType": "Cyber Defense Operations",
        "provider": {
          "@id": `${APP_URL}/#organization`
        },
        "description": "MDR and Detection Engineering, delivered through your existing security stack or an Entersoft-managed architecture.",
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
            "name": "Cyber Defense Operations",
            "item": canonicalUrl
          }
        ]
      }
    ]
  };

  return (
    <main className="w-full flex flex-col bg-[#040810]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CDPageRoot />
    </main>
  );
}
