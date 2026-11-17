import React from "react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "Accreditations | Entersoft";
const DESCRIPTION =
  "Current applicable credentials available during supplier due diligence.";
const CANONICAL = getCanonicalUrl(ROUTES.company.accreditations);

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

export default function AccreditationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Entersoft Information Systems Private Limited",
    "url": "https://www.entersoftsecurity.com",
    "foundingDate": "2013",
  };

  return (
    <main className="w-full min-h-screen bg-[#060606] text-white pt-28 pb-20 px-6 md:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-left max-w-[800px]">
          <h1 className="text-[clamp(1.5rem,7.2vw,2.25rem)] md:text-5xl font-display font-semibold text-white tracking-tight uppercase">
            Accreditations
          </h1>
          <p className="text-base font-sans text-[var(--text-secondary)] leading-relaxed">
            Current applicable credentials available during supplier due diligence.
          </p>
        </div>

        <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-display font-bold text-white uppercase">Privacy & Data Handling</h2>
            <p className="text-xs font-sans text-[var(--text-secondary)] max-w-xl">
              Entersoft maintains contractual, technical and organisational measures for customer data handling and supports privacy-readiness programmes. Data-processing details are available during due diligence.
            </p>
          </div>
          <Button variant="primary" size="md" asLink href="/contact">
            Book a Security Briefing
          </Button>
        </div>
      </div>
    </main>
  );
}
