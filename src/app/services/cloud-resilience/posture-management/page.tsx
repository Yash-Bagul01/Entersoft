import React from "react";
import type { Metadata } from "next";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";
import { cloudOfferings } from "@/data/cloudResilience";
import CloudOfferingLayout from "@/components/services/cloud-resilience/CloudOfferingLayout";

const offering = cloudOfferings["posture-management"];
const canonicalUrl = `${APP_URL}/services/cloud-resilience/posture-management`;

export const metadata: Metadata = {
  title: "Cloud Posture & Exposure Management | EnProbe | Entersoft",
  description:
    "EnProbe connects to your AWS, Azure, and GCP environments and monitors cloud configuration, IAM permissions, and network exposure in real time — detecting drift continuously.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Cloud Posture & Exposure Management | EnProbe | Entersoft Security",
    description:
      "Continuous cloud posture management (CSPM) and real-time misconfiguration drift detection with EnProbe.",
    url: canonicalUrl,
    siteName: "Entersoft Security",
    type: "website",
  },
};

export default function CloudPostureManagementPage() {
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
        "name": "Cloud Posture & Exposure Management | Entersoft Security",
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
        "serviceType": "Cloud Security Posture Management (CSPM)",
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
            "name": "Cloud Posture Management",
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
