import React from "react";
import type { Metadata } from "next";
import AppSecPlatformPage from "@/components/services/AppSecPlatformPage";
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

const appSecFaqs = [
  {
    question: "What is Application Security Testing?",
    answer: "Application Security Testing (AST) is the process of analyzing, testing, and finding security vulnerabilities within software applications. It involves automated scanning and manual expert review across the software development lifecycle (SDLC) to identify flaws that could lead to unauthorized access, data leaks, or system compromise."
  },
  {
    question: "How is Application Security Testing different from Penetration Testing?",
    answer: "While penetration testing is typically a point-in-time, goal-oriented validation of network and system entry points, Application Security Testing (AST) focuses specifically on code-level flaws, business logic, integrations, APIs, and security guardrails throughout the development lifecycle to ensure software remains inherently secure."
  },
  {
    question: "Does Entersoft test web, API, and mobile applications?",
    answer: "Yes, Entersoft provides comprehensive, specialized testing across all three channels. This includes dynamic vulnerability scanning and source code audits for web platforms, REST/GraphQL APIs, and mobile applications (iOS and Android) including binary analysis and secure storage verification."
  },
  {
    question: "Which application security standards and frameworks are supported?",
    answer: "Our audits align with industry-standard security baselines, including the OWASP Top 10, OWASP Application Security Verification Standard (ASVS), OWASP Mobile Application Security Verification Standard (MASVS), SANS Top 25, and CWE/SANS definitions."
  },
  {
    question: "How are vulnerabilities validated and verified?",
    answer: "We utilize a hybrid model: automated scanner engines detect raw exposure signals, and our certified security analysts validate and triage each candidate manually to deliver human-validated findings."
  },
  {
    question: "Which CI/CD platforms integrate with Entersoft's AppSec workflow?",
    answer: "Entersoft integrates natively with modern DevOps pipelines, including GitHub Actions, GitLab CI/CD, Azure DevOps, Jenkins, and Jira. Automated scan triggers run on code commits and send findings directly into standard developer ticketing workflows."
  },
  {
    question: "Do you provide developer-ready remediation guidance?",
    answer: "Yes, we package every verified finding with clear remediation guidelines, secure code snippets, and patch diffs. This enables development teams to deploy patches quickly without needing to interpret complex vulnerability reports."
  },
  {
    question: "Which compliance frameworks are supported?",
    answer: "Our testing maps directly to regulatory compliance frameworks, including ISO/IEC 27001 ISMS scope and CERT-In audit specifications."
  },
  {
    question: "How quickly are findings delivered?",
    answer: "Critical and high-severity findings are validated and reported immediately through real-time notifications. Complete vulnerability reports and developer-ready remediation diffs are generated within 24 to 72 hours of scan completion."
  }
];

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
            "item": "https://www.entersoftsecurity.com/#services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Application Security Testing",
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
      <AppSecPlatformPage faqs={appSecFaqs} />
    </>
  );
}
