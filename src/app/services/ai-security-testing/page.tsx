import React from "react";
import type { Metadata } from "next";
import ServiceCasePage from "@/components/services/ServiceCasePage";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "AI Security Testing & LLM Red-Teaming | Entersoft";
const DESCRIPTION =
  "Test LLM applications, RAG pipelines, AI agents and model APIs for prompt injection, data leakage, model manipulation and security vulnerabilities.";
const CANONICAL = getCanonicalUrl(ROUTES.services.aiAst);

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

export default function AiSecurityTestingPage() {
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
        "item": "https://www.entersoftsecurity.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "AI Systems Assurance",
        "item": CANONICAL
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceCasePage slug="ai-ast" />
    </>
  );
}
