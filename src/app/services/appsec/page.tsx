import React from "react";
import type { Metadata } from "next";
import AppSecPlatformPage from "@/components/services/AppSecPlatformPage";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Application Security Testing Services | Web, API & Mobile AppSec | Entersoft",
  description: "Protect your business with comprehensive Application Security Testing services for web, API, mobile, and cloud applications. Identify vulnerabilities early with expert AppSec assessments from Entersoft.",
  alternates: {
    canonical: getCanonicalUrl(ROUTES.services.appsec),
  },
};

export default function AppSecPage() {
  const canonicalUrl = getCanonicalUrl(ROUTES.services.appsec);
  
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
        "name": "Application Security Testing Services | Web, API & Mobile AppSec | Entersoft",
        "description": "Protect your business with comprehensive Application Security Testing services for web, API, mobile, and cloud applications. Identify vulnerabilities early with expert AppSec assessments from Entersoft.",
        "inLanguage": "en",
        "isPartOf": {
          "@id": `${APP_URL}/#website`
        },
        "about": {
          "@id": `${canonicalUrl}/#service`
        }
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}/#service`,
        "name": "Application Security Testing Services",
        "serviceType": "Application Security Testing",
        "provider": {
          "@id": `${APP_URL}/#organization`
        },
        "description": "Secure every release with continuous application security testing for web, API, and mobile applications - from vulnerability discovery to verified remediation.",
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
            "item": APP_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Application Security",
            "item": canonicalUrl
          }
        ]
      }
    ]
  };

  return (
    <main className="w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppSecPlatformPage />
    </main>
  );
}
