import React from "react";
import type { Metadata } from "next";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";
import { cloudOfferings } from "@/data/cloudResilience";
import CloudOfferingLayout from "@/components/services/cloud-resilience/CloudOfferingLayout";

const offering = cloudOfferings["containers-iac"];
const canonicalUrl = `${APP_URL}/services/cloud-resilience/containers-iac`;

export const metadata: Metadata = {
  title: "Kubernetes, Container & IaC Security | Entersoft",
  description:
    "Security review of container workloads, Kubernetes configurations, and infrastructure-as-code templates — finding vulnerabilities before workloads are deployed.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Kubernetes, Container & IaC Security | Entersoft Security",
    description:
      "Workload and infrastructure definition hardening across Kubernetes clusters, Docker images, Terraform, and Helm.",
    url: canonicalUrl,
    siteName: "Entersoft Security",
    type: "website",
  },
};

export default function CloudContainersIacPage() {
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
        "name": "Kubernetes, Container & IaC Security | Entersoft Security",
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
        "serviceType": "Container & Infrastructure-as-Code Security",
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
            "name": "Kubernetes & IaC Security",
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
