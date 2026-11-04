import React from "react";
import type { Metadata } from "next";
import ServiceCasePage from "@/components/services/ServiceCasePage";
import { getCanonicalUrl, ROUTES } from "@/config/routes";
import {
  ORGANIZATION_ID,
  breadcrumbNode,
  organizationNode,
  webPageNode,
  websiteNode,
} from "@/config/seo";

const TITLE = "Application Security Testing Services | Entersoft";
const DESCRIPTION =
  "Expert-led application security testing for web, APIs, mobile and connected systems. AI-assisted analysis, validated findings and remediation guidance.";
const OG_TITLE = "Application Assurance | Entersoft";
const CANONICAL = getCanonicalUrl(ROUTES.services.appsec);
const SERVICE_NAME = "Application security testing";
const SERVICE_ID = `${CANONICAL}/#service`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: OG_TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Entersoft Security",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: OG_TITLE,
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode,
    websiteNode,
    webPageNode({
      canonicalUrl: CANONICAL,
      name: TITLE,
      description: DESCRIPTION,
      about: SERVICE_ID,
      breadcrumb: `${CANONICAL}/#breadcrumb`,
    }),
    {
      "@type": "Service",
      "@id": SERVICE_ID,
      name: SERVICE_NAME,
      serviceType: SERVICE_NAME,
      description: DESCRIPTION,
      url: CANONICAL,
      provider: { "@id": ORGANIZATION_ID },
    },
    breadcrumbNode(CANONICAL, [{ name: SERVICE_NAME, item: CANONICAL }]),
  ],
};

export default function ApplicationSecurityTestingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceCasePage slug="appsec" />
    </>
  );
}
