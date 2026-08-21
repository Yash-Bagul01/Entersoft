import React from "react";
import type { Metadata } from "next";
import CloudResilienceHubRoot from "@/components/services/cloud-resilience/CloudResilienceHubRoot";
import ServiceCTA from "@/components/services/ServiceCTA";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "Cloud & Identity Security Services | AWS, Azure, GCP | Entersoft";
const DESCRIPTION =
  "Secure multi-cloud environments, containers, IaC and identity permissions with continuous cloud security posture management and expert assessments.";
const CANONICAL = getCanonicalUrl(ROUTES.services.cloud);

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
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function CloudSecurityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.entersoftsecurity.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://www.entersoftsecurity.com/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Cloud & Identity Security",
        "item": CANONICAL
      }
    ]
  };

  return (
    <main className="w-full min-h-screen bg-[#060606] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CloudResilienceHubRoot />
      <ServiceCTA
        headline="Ready to assess your cloud security posture?"
        buttonText="REQUEST A CLOUD SECURITY ASSESSMENT"
        buttonHref="/contact"
      />
    </main>
  );
}
