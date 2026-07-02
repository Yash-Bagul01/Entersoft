import React from "react";
import type { Metadata } from "next";
import { servicePagesData } from "@/data/services";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceDeliverables from "@/components/services/ServiceDeliverables";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import SIEMVisual from "@/components/services/visuals/SIEMVisual";
import SIEMProofBand from "@/components/services/SIEMProofBand";

export const metadata: Metadata = {
  title: "Managed SIEM & Monitoring | Entersoft Security",
  description: "24/7 security operations center (SOC) monitoring. Real-time log correlation, threat hunting, and automated incident response.",
};

export default function SIEMPage() {
  const data = servicePagesData.siem;

  return (
    <main className="w-full flex flex-col">
      <ServiceHero
        category={data.category}
        title={data.heroStatement}
        tagline={data.tagline}
        visual={<SIEMVisual />}
        heroLayoutType="siem"
        col2Description={data.col2Description}
        col3Metadata={data.col3Metadata}
      />
      <SIEMProofBand />
      <ServiceProcess steps={data.process} />
      <ServiceDeliverables deliverables={data.deliverables} integrations={data.integrations} />
      <ServiceFAQ faqs={data.faqs} />
      <ServiceCTA />
    </main>
  );
}
