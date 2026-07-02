import React from "react";
import type { Metadata } from "next";
import { servicePagesData } from "@/data/services";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import SmartContractVisual from "@/components/services/visuals/SmartContractVisual";
import ServiceDeliverables from "@/components/services/ServiceDeliverables";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Smart Contract Audits | Entersoft Security",
  description: "Deep mathematical and logic audits for Solidity, Rust, and Vyper smart contracts. Defend DeFi protocol designs.",
};

export default function SmartContractAuditsPage() {
  const data = servicePagesData["smart-contract-audits"];

  return (
    <main className="w-full flex flex-col">
      <ServiceHero
        category={data.category}
        title={data.heroStatement}
        tagline={data.tagline}
        visual={<SmartContractVisual />}
        heroLayoutType="smart-contract"
        col2Description={data.col2Description}
        col3Metadata={data.col3Metadata}
      />
      
      {/* Bespoke pre-like Methodology section */}
      <section className="relative w-full bg-[var(--bg-primary)] px-6 md:px-12 py-20 md:py-28 overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-12">
          <div>
            <SectionLabel color="secondary">AUDITING STANDARDS</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-medium text-[var(--text-primary)] uppercase tracking-tight mt-2">
              Auditing Methodology
            </h2>
          </div>

          <div className="w-full border-l-2 border-[var(--accent)] pl-6 md:pl-10 py-4 bg-[var(--bg-elevated)]/30 backdrop-blur-md rounded-r-[4px]">
            <pre className="font-mono text-xs md:text-sm text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed select-none">
              {`// methodology\n`}
              {data.process.map((step) => (
                <span key={step.index} className="block mt-4">
                  <span className="text-[var(--accent)] font-bold">{`[${step.index}_${step.title.toUpperCase().replace(/\s+/g, "_")}]`}</span>
                  <span className="block text-[var(--text-secondary)] mt-1 font-sans text-xs md:text-sm pl-4">
                    {step.description}
                  </span>
                </span>
              ))}
            </pre>
          </div>
        </div>
      </section>

      <ServiceDeliverables deliverables={data.deliverables} integrations={data.integrations} />
      <ServiceFAQ faqs={data.faqs} />
      <ServiceCTA />
    </main>
  );
}
