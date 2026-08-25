import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { getCanonicalUrl, ROUTES } from "@/config/routes";
import { ShieldCheck, Award, Lock, ExternalLink } from "lucide-react";

const TITLE = "Accreditations & Security Certifications | Entersoft";
const DESCRIPTION =
  "Review Entersoft's CREST penetration testing accreditation, CERT-In empanelment details, ISO/IEC 27001 ISMS scope and verified legal entity credentials.";
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
    "sameAs": ["https://www.crest-approved.org/"],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Accreditation",
        "name": "CREST Accredited Penetration Testing",
        "recognizedBy": {
          "@type": "Organization",
          "name": "CREST International"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Empanelment",
        "name": "CERT-In Empannelled Information Security Auditing Organisation",
        "recognizedBy": {
          "@type": "Organization",
          "name": "CERT-In"
        }
      }
    ]
  };

  return (
    <main className="w-full min-h-screen bg-[#060606] text-white pt-28 pb-20 px-6 md:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4 text-left max-w-[800px]">
          <SectionLabel color="secondary">INDEPENDENTLY VERIFIABLE ASSURANCE</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-white tracking-tight uppercase">
            Accreditations & Security Credentials
          </h1>
          <p className="text-base font-sans text-zinc-300 leading-relaxed">
            Entersoft operates under strict regulatory, technical, and legal standards. Every accreditation statement below reflects verified evidence, official empanelments, and legal entity scopes.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CREST */}
          <div className="p-8 rounded-xl bg-[#0c0c0f] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/20 w-fit text-cyan-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-display font-bold text-white uppercase">CREST Accreditation</h2>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                Entersoft is accredited by CREST for penetration testing services through the applicable accredited legal entity. View the service scope and independent verification record.
              </p>
            </div>
            <a
              href="https://www.crest-approved.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 hover:underline uppercase"
            >
              <span>Verify CREST Status</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* CERT-In */}
          <div className="p-8 rounded-xl bg-[#0c0c0f] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/20 w-fit text-emerald-400">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-display font-bold text-white uppercase">CERT-In Empanelment</h2>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                Entersoft Information Systems Private Limited is empanelled as an Information Security Auditing Organisation by CERT-In for IT security auditing.
              </p>
            </div>
            <a
              href="https://www.cert-in.org.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 hover:underline uppercase"
            >
              <span>Verify CERT-In Status</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* ISO 27001 */}
          <div className="p-8 rounded-xl bg-[#0c0c0f] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 w-fit text-blue-400">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-display font-bold text-white uppercase">ISO/IEC 27001 ISMS</h2>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                Entersoft operates an Information Security Management System certified to ISO/IEC 27001 for the scope stated in the current certificate.
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-zinc-400 uppercase">
              Legal Entity Scope: Entersoft Information Systems Pvt. Ltd.
            </span>
          </div>
        </div>

        {/* Due Diligence Reassurance */}
        <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-display font-bold text-white uppercase">Privacy & Data Handling</h3>
            <p className="text-xs font-sans text-zinc-400 max-w-xl">
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
