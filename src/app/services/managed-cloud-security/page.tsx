import React from "react";
import type { Metadata } from "next";
import { servicePagesData } from "@/data/services";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import CloudVisual from "@/components/services/visuals/CloudVisual";
import SectionLabel from "@/components/ui/SectionLabel";
import ServiceDeliverables from "@/components/services/ServiceDeliverables";

export const metadata: Metadata = {
  title: "Managed Cloud Security | Entersoft Security",
  description: "Continuous configuration audits, posture management (CSPM), and real-time threat response for AWS, Azure, GCP.",
};

const matrixData = [
  { surface: "AWS S3 / Blob Storage", detect: "[✓]", alert: "[✓]", remedy: "[✓]", compliance: "[✓]" },
  { surface: "IAM Policies / Roles", detect: "[✓]", alert: "[✓]", remedy: "[✓]", compliance: "[✓]" },
  { surface: "Kubernetes Containers", detect: "[✓]", alert: "[✓]", remedy: "[—]", compliance: "[✓]" },
  { surface: "VPC / Network Gates", detect: "[✓]", alert: "[✓]", remedy: "[✓]", compliance: "[—]" },
  { surface: "Databases / Secrets", detect: "[✓]", alert: "[✓]", remedy: "[—]", compliance: "[✓]" },
];

export default function CloudSecurityPage() {
  const data = servicePagesData["managed-cloud-security"];

  return (
    <main className="w-full flex flex-col">
      <ServiceHero
        category={data.category}
        title={data.heroStatement}
        tagline={data.tagline}
        visual={<CloudVisual />}
        heroLayoutType="cloud"
      />
      <ServiceProcess steps={data.process} />
      
      {/* Bespoke Coverage Matrix section */}
      <section className="relative w-full bg-[var(--bg-primary)] px-6 md:px-12 py-20 md:py-28 overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-12">
          <div>
            <SectionLabel color="secondary">COVERAGE CAPABILITIES</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-medium text-[var(--text-primary)] uppercase tracking-tight mt-2">
              Cloud Security Matrix
            </h2>
          </div>

          <div className="w-full overflow-x-auto border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 backdrop-blur-md rounded-[4px]">
            <table className="w-full min-w-[700px] text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                  <th className="p-4 text-[var(--text-primary)] font-bold tracking-wider">ATTACK SURFACE</th>
                  <th className="p-4 text-[var(--text-primary)] font-bold tracking-wider text-center">DETECTION</th>
                  <th className="p-4 text-[var(--text-primary)] font-bold tracking-wider text-center">ALERTING</th>
                  <th className="p-4 text-[var(--text-primary)] font-bold tracking-wider text-center">REMEDIATION</th>
                  <th className="p-4 text-[var(--text-primary)] font-bold tracking-wider text-center">COMPLIANCE</th>
                </tr>
              </thead>
              <tbody>
                {matrixData.map((row, idx) => (
                  <tr key={idx} className="border-b border-[var(--border-subtle)]/50 hover:bg-white/[0.015] transition-colors">
                    <td className="p-4 text-[var(--text-secondary)] font-bold">{row.surface}</td>
                    <td className="p-4 text-center text-[var(--accent)] font-bold">{row.detect}</td>
                    <td className="p-4 text-center text-[var(--accent)] font-bold">{row.alert}</td>
                    <td className="p-4 text-center text-[var(--text-tertiary)]">{row.remedy}</td>
                    <td className="p-4 text-center text-[var(--accent)] font-bold">{row.compliance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ServiceDeliverables deliverables={data.deliverables} integrations={data.integrations} />
      <ServiceFAQ faqs={data.faqs} />
      <ServiceCTA />
    </main>
  );
}
