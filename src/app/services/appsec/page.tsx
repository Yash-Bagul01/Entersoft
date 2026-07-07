import React from "react";
import type { Metadata } from "next";
import AppSecPlatformPage from "@/components/services/AppSecPlatformPage";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Application Security Testing Services | Web, API & Mobile AppSec | Entersoft",
  description: "Protect your business with comprehensive Application Security Testing services for web, API, mobile, and cloud applications. Identify vulnerabilities early with expert AppSec assessments from Entersoft.",
  alternates: {
    canonical: getCanonicalUrl(ROUTES.services.appsec),
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
    answer: "We utilize a hybrid model: automated scanner engines detect raw exposure signals, and our certified security analysts validate and triage each candidate manually. This expert verification eliminates false positives entirely before findings are delivered."
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
    answer: "Our testing maps directly to regulatory compliance frameworks, including SOC 2, ISO 27001, PCI-DSS, GDPR, HIPAA, and CERT-In audit specifications."
  },
  {
    question: "How quickly are findings and critical vulnerabilities delivered?",
    answer: "Critical and high-severity findings are validated and reported immediately through real-time notifications. Complete vulnerability reports and developer-ready remediation diffs are generated within 24 to 72 hours of scan completion."
  }
];

export default function AppSecPage() {
  const canonicalUrl = getCanonicalUrl(ROUTES.services.appsec);
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${APP_URL}/#organization`,
        "name": "Entersoft Security",
        "url": APP_URL,
        "logo": {
          "@type": "ImageObject",
          "@id": `${APP_URL}/#logo`,
          "url": "https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg",
          "caption": "Entersoft Security Logo"
        },
        "description": "One scan to know where you are exposed. One report to fix it fast. Award-winning cybersecurity including AppSec, VAPT, Managed Cloud Security, Compliance, SIEM, and Smart Contract audits."
      },
      {
        "@type": "WebSite",
        "@id": `${APP_URL}/#website`,
        "url": APP_URL,
        "name": "Entersoft Security",
        "publisher": {
          "@id": `${APP_URL}/#organization`
        }
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}/#webpage`,
        "url": canonicalUrl,
        "name": "Application Security Testing Services | Web, API & Mobile AppSec | Entersoft",
        "description": "Protect your business with comprehensive Application Security Testing services for web, API, mobile, and cloud applications. Identify vulnerabilities early with expert AppSec assessments from Entersoft.",
        "inLanguage": "en",
        "isPartOf": {
          "@id": `${APP_URL}/#website`
        },
        "about": {
          "@id": `${canonicalUrl}/#service`
        },
        "breadcrumb": {
          "@id": `${canonicalUrl}/#breadcrumb`
        }
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}/#service`,
        "name": "Application Security Testing Services",
        "serviceType": "Application Security Testing",
        "provider": {
          "@id": `${APP_URL}/#organization`
        },
        "description": "Secure every release with continuous application security testing for web, API, and mobile applications - from vulnerability discovery to verified remediation.",
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
            "name": "Application Security",
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}/#faq`,
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
    <main className="w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppSecPlatformPage faqs={appSecFaqs} />
    </main>
  );
}
