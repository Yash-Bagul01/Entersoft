import React from "react";
import type { Metadata } from "next";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";
import { cloudOfferings } from "@/data/cloudResilience";
import CloudOfferingLayout from "@/components/services/cloud-resilience/CloudOfferingLayout";

const offering = cloudOfferings["assessment"];
const canonicalUrl = `${APP_URL}/services/cloud-resilience/assessment`;

export const metadata: Metadata = {
  title: "Cloud Security Assessment | AWS, Azure & GCP | Entersoft",
  description:
    "A structured expert review of your AWS, Azure, or GCP environment covering configuration, IAM permissions, network exposure, and secrets — delivered as a prioritised remediation roadmap.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Cloud Security Assessment | Entersoft Security",
    description:
      "Structured multi-cloud configuration and IAM posture review with CIS benchmarks and remediation roadmaps.",
    url: canonicalUrl,
    siteName: "Entersoft Security",
    type: "website",
  },
};

export default function CloudAssessmentPage() {
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
        "name": "Cloud Security Assessment | Entersoft Security",
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
        "serviceType": "Cloud Security Assessment",
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
            "name": "Cloud Security Assessment",
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
