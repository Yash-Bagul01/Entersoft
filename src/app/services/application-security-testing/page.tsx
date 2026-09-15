import React from "react";
import type { Metadata } from "next";
import ServiceCasePage from "@/components/services/ServiceCasePage";
import { APPSEC_PAGE_FAQS } from "@/data/serviceCaseCopy";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "Web, API & Mobile Application Security Testing | Entersoft";
const DESCRIPTION =
  "Secure web, API and mobile releases with expert-led application security testing, business-logic validation, remediation guidance and retesting.";
const CANONICAL = getCanonicalUrl(ROUTES.services.appsec);

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

const appSecFaqs = APPSEC_PAGE_FAQS;

export default function ApplicationSecurityTestingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
            "name": "Application Assurance",
            "item": CANONICAL
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": appSecFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

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
