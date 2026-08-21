import React from "react";
import type { Metadata } from "next";
import AppSecPlatformPage from "@/components/services/AppSecPlatformPage";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "EnProbe Platform | Continuous Security Visibility & Evidence | Entersoft";
const DESCRIPTION =
  "EnProbe consolidates application security, code, cloud, attack surface and compliance signals into a single connected evidence platform for security and engineering teams.";
const CANONICAL = getCanonicalUrl(ROUTES.platform.enprobe);

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

const enprobeFaqs = [
  {
    question: "What is the EnProbe platform?",
    answer: "EnProbe is Entersoft's security platform that unifies application security posture management (ASPM), code analysis, cloud vulnerability management, attack-surface discovery, and compliance evidence into one connected view."
  },
  {
    question: "Does EnProbe replace human security testing?",
    answer: "No. EnProbe provides continuous automation, visibility, and workflow orchestration, while Entersoft security experts validate complex vulnerabilities, test business logic, and assist with remediation guidance."
  }
];

export default function EnProbePlatformPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "EnProbe Platform",
    "description": DESCRIPTION,
    "brand": {
      "@type": "Brand",
      "name": "Entersoft"
    },
    "url": CANONICAL
  };

  return (
    <main className="w-full min-h-screen bg-[#060606] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppSecPlatformPage faqs={enprobeFaqs} />
    </main>
  );
}
