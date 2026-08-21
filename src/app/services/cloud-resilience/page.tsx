import React from "react";
import type { Metadata } from "next";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";
import CloudResilienceHubRoot from "@/components/services/cloud-resilience/CloudResilienceHubRoot";

const canonicalUrl = `${APP_URL}/services/cloud-resilience`;

const TITLE = "Cloud Security Services for AWS, Azure & GCP | Entersoft";
const DESCRIPTION =
  "Assess and secure AWS, Azure, GCP, Kubernetes and cloud identity through posture reviews, penetration testing, CSPM and managed detection.";

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

export default function CloudResilienceHubPage() {
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
        "description": "Enterprise cloud resilience, penetration testing, posture management, and managed threat detection."
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
        "name": "Cloud Resilience",
        "serviceType": "Cloud Security Hub",
        "provider": {
          "@id": `${APP_URL}/#organization`
        },
        "description": "Structurally modular cloud security services: Cloud Security Assessment, Cloud & Identity Penetration Testing, Cloud Posture Management (EnProbe), Managed Cloud Detection & Response, and Kubernetes/IaC Security.",
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
            "name": "Cloud Resilience",
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
      <CloudResilienceHubRoot />
    </main>
  );
}
