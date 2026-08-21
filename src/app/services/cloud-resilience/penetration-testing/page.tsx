import React from "react";
import type { Metadata } from "next";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";
import { cloudOfferings } from "@/data/cloudResilience";
import CloudOfferingLayout from "@/components/services/cloud-resilience/CloudOfferingLayout";

const offering = cloudOfferings["penetration-testing"];
const canonicalUrl = `${APP_URL}/services/cloud-resilience/penetration-testing`;

export const metadata: Metadata = {
  title: "Cloud & Identity Penetration Testing | Entersoft",
  description:
    "Active adversarial testing of your cloud environment, IAM configuration, and identity federation — demonstrating real attack paths and business impact.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Cloud & Identity Penetration Testing | Entersoft Security",
    description:
      "Adversarial validation of multi-cloud trust boundaries, IAM privilege escalation chains, and data exfiltration paths.",
    url: canonicalUrl,
    siteName: "Entersoft Security",
    type: "website",
  },
};

export default function CloudPenetrationTestingPage() {
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
        "name": "Cloud & Identity Penetration Testing | Entersoft Security",
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
        "serviceType": "Cloud Penetration Testing",
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
            "name": "Cloud & Identity Pen Testing",
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
