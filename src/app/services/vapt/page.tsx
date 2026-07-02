import React from "react";
import type { Metadata } from "next";
import { servicePagesData } from "@/data/services";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import VAPTVisual from "@/components/services/visuals/VAPTVisual";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "VAPT Audit Services | Entersoft Security",
  description: "Expert-driven vulnerability assessment and penetration testing providing real exploit proofs. CERT-In certified audit compliance.",
};

export default function VAPTPage() {
  const data = servicePagesData.vapt;

  const statsNode = (
    <div className="flex flex-col items-start gap-1 select-none">
      <span className="font-mono text-[36px] md:text-[48px] font-bold text-[var(--accent)] tracking-tighter leading-none animate-pulse">
        12,000+
      </span>
      <span className="font-mono text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-wider max-w-[200px] leading-normal">
        Vulnerabilities Found, Every One Proven
      </span>
    </div>
  );

  return (
    <main className="w-full flex flex-col">
      <ServiceHero
        category={data.category}
        title={data.heroStatement}
        tagline={data.tagline}
        visual={<VAPTVisual />}
        heroLayoutType="vapt"
        statsNode={statsNode}
        col2Description={data.col2Description}
        col3Metadata={data.col3Metadata}
      />
      <ServiceProcess steps={data.process} />
      
      {/* Bespoke Deliverables section for VAPT (Comparison Table layout) */}
      <section className="relative w-full bg-[var(--bg-primary)] px-6 md:px-12 py-20 md:py-28 overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-12">
          <div>
            <SectionLabel color="secondary">OUTCOMES & COMPONENT GAP</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-medium text-[var(--text-primary)] uppercase tracking-tight mt-2">
              Bespoke Deliverables
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Standard Deliverables (checked) */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] font-bold text-[var(--text-tertiary)] tracking-widest uppercase">
                WHAT YOU RECEIVE
              </span>
              <ul className="flex flex-col gap-5">
                {data.deliverables.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="text-[var(--text-primary)] font-mono text-base font-bold select-none mt-0.5">
                      ✓
                    </span>
                    <span className="font-sans text-sm md:text-base text-[var(--text-primary)] leading-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Things generic firms skip (Highlighted Neon list) */}
            <div className="flex flex-col gap-6 bg-[var(--bg-elevated)]/30 border border-[var(--border-subtle)] p-8 md:p-10 rounded-[4px] backdrop-blur-md">
              <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-widest uppercase">
                WHY ENTERSOFT DIFFERENCES
              </span>
              <ul className="flex flex-col gap-5">
                {[
                  "PoC (Proof of Concept) video exploits for every critical finding.",
                  "Unlimited retesting cycles within 90 days of final patch application.",
                  "CERT-In empanelled signature signoff ready for government reporting.",
                  "Direct executive narrative detailing business impact beyond CVSS scores.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="text-[var(--accent)] font-mono text-base font-bold select-none mt-0.5">
                      →
                    </span>
                    <span className="font-sans text-sm text-[var(--text-primary)] leading-relaxed font-semibold">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={data.faqs} />
      <ServiceCTA />
    </main>
  );
}
