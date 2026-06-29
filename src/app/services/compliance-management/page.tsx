import React from "react";
import type { Metadata } from "next";
import { servicePagesData } from "@/data/services";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import ComplianceVisual from "@/components/services/visuals/ComplianceVisual";
import ServiceDeliverables from "@/components/services/ServiceDeliverables";

export const metadata: Metadata = {
  title: "Compliance Management | Entersoft Security",
  description: "Navigate global security frameworks with ease. ISO 27001, GDPR, CERT-In, and RBI compliance support.",
};

export default function CompliancePage() {
  const data = servicePagesData["compliance-management"];

  return (
    <main className="w-full flex flex-col">
      <ServiceHero
        category={data.category}
        title={data.heroStatement}
        tagline={data.tagline}
        visual={<ComplianceVisual />}
        heroLayoutType="compliance"
      />
      <ServiceProcess steps={data.process} />
      <ServiceDeliverables deliverables={data.deliverables} integrations={data.integrations} />
      {/* Set isAccordion to true for Compliance pages as per spec */}
      <ServiceFAQ faqs={data.faqs} isAccordion={true} />
      <ServiceCTA />
    </main>
  );
}
