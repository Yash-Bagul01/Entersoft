  import React from "react";
import type { Metadata } from "next";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";
import { cloudOfferings } from "@/data/cloudResilience";
import CloudOfferingLayout from "@/components/services/cloud-resilience/CloudOfferingLayout";

const offering = cloudOfferings["managed-detection"];
const canonicalUrl = `${APP_URL}/services/cloud-resilience/managed-detection`;

export const metadata: Metadata = {
  title: "Managed Cloud Detection & Response | Entersoft",
  description:
    "Cloud-specific threat monitoring, alert triage, investigation, and response — operated 24/7 by Entersoft analysts using your existing SIEM or an Entersoft-managed detection stack.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Managed Cloud Detection & Response | Entersoft Security",
    description:
      "24/7 human-operated cloud threat triage, log correlation, and incident containment across AWS, Azure, and GCP.",
    url: canonicalUrl,
    siteName: "Entersoft Security",
    type: "website",
  },
};

export default function CloudManagedDetectionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${APP_URL}/#organization`,
        "name": "Entersoft Security",
        "url": APP_URL,
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}/#webpage`,
        "url": canonicalUrl,
        "name": "Managed Cloud Detection & Response | Entersoft Security",
        "description": offering.sub,
        "inLanguage": "en",
        "isPartOf": {
          "@id": `${APP_URL}/#website`
        },
        "breadcrumb": {
          "@id": `${canonicalUrl}/#breadcrumb`
        }
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}/#service`,
        "name": offering.title,
        "serviceType": "Managed Detection and Response (MDR)",
        "provider": {
          "@id": `${APP_URL}/#organization`
        },
        "description": offering.sub,
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
            "item": `${APP_URL}/services/cloud-resilience`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Managed Cloud Detection",
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
      <CloudOfferingLayout offering={offering} />
    </main>
  );
}
