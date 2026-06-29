import React from "react";
import type { Metadata } from "next";
import { servicePagesData } from "@/data/services";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceDeliverables from "@/components/services/ServiceDeliverables";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import AppSecVisual from "@/components/services/visuals/AppSecVisual";

export const metadata: Metadata = {
  title: "Application Security (AppSec) | Entersoft Security",
  description: "Continuous application security testing embedded directly into your CI/CD pipelines. Identify vulnerabilities at the commit level.",
};

export default function AppSecPage() {
  const data = servicePagesData.appsec;

  return (
    <main className="w-full flex flex-col">
      <ServiceHero
        category={data.category}
        title={data.heroStatement}
        tagline={data.tagline}
        visual={<AppSecVisual />}
        heroLayoutType="default"
      />
      <ServiceProcess steps={data.process} layoutType="horizontal-timeline" />
      <ServiceDeliverables deliverables={data.deliverables} integrations={data.integrations} />
      <ServiceFAQ faqs={data.faqs} />
      <ServiceCTA />
    </main>
  );
}
