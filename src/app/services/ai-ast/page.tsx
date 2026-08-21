import React from "react";
import type { Metadata } from "next";
import AZPageRoot from "@/components/services/ai-zkpass/AZPageRoot";
import { getCanonicalUrl, ROUTES } from "@/config/routes";
import {
  ORGANIZATION_ID,
  breadcrumbNode,
  organizationNode,
  webPageNode,
  websiteNode,
} from "@/config/seo";

const TITLE = "AI Security Testing & LLM Red Teaming Services | Entersoft";
const DESCRIPTION =
  "Test LLM, RAG and agentic AI systems for prompt injection, tool abuse, data leakage and unsafe autonomy before production and after major changes.";
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
      about: `${CANONICAL}/#service`,
      breadcrumb: `${CANONICAL}/#breadcrumb`,
    }),
    {
      "@type": "Service",
      "@id": `${CANONICAL}/#service`,
      name: "AI Systems Assurance",
      serviceType: "AI security testing",
      provider: { "@id": ORGANIZATION_ID },
      description:
        "Security assessment of LLM, RAG and agentic AI systems covering prompt injection, tool and function abuse, data leakage, model APIs and unsafe autonomous actions.",
      areaServed: { "@type": "Country", name: "Global" },
      url: CANONICAL,
    },
    breadcrumbNode(CANONICAL, [{ name: "AI Systems Assurance", item: CANONICAL }]),
  ],
};

export default function AIASTPage() {
  return (
    <main className="w-full min-h-screen bg-[#05070F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AZPageRoot />
    </main>
  );
}
