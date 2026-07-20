import React from "react";
import type { Metadata } from "next";
import { servicePagesData } from "@/data/services";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import AIASTVisual from "@/components/services/visuals/AIASTVisual";
import ServiceDeliverables from "@/components/services/ServiceDeliverables";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "AI Systems Assurance | Entersoft Security",
  description: "Advanced application security testing tailored specifically for AI integrations, protecting LLM prompts and securing RAG architectures.",
};

const differences = [
  { feature: "Scan Acceleration", trad: "Slow signature lookups (hours/days)", enter: "ML-guided classification in minutes" },
  { feature: "Triage Alert Noise", trad: "Up to 80% false-positives (developer burden)", enter: "Human-validated triage (0 false-positives)" },
  { feature: "Scope & Deep Security", trad: "Standard syntax rules & dependency checks", enter: "LLM guardrails, prompt leaks, & RAG audits" },
  { feature: "Remediation Workflow", trad: "Static reports without action directions", enter: "PR-ready code fix patches and diffs" },
];

export default function AIASTPage() {
  const data = servicePagesData["ai-ast"];

  return (
    <main className="w-full flex flex-col">
      <div className="relative">
        <ServiceHero
          category={data.category}
          title={data.heroStatement}
          tagline={data.tagline}
          visual={<AIASTVisual />}
          heroLayoutType="ai-ast"
          col2Description={data.col2Description}
          col3Metadata={data.col3Metadata}
        />

        {/* Ticker Row */}
        <div className="w-full border-y border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 py-4 overflow-hidden relative select-none">
          <div className="flex animate-[ticker-scroll_30s_linear_infinite] whitespace-nowrap gap-8 font-mono text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.25em]">
            <span>SQL INJECTION • XSS • IDOR • SSRF • BUSINESS LOGIC FLAWS • AUTH BYPASS • DESERIALIZATION • OPEN REDIRECT • PROMPT INJECTION • LLM ESCAPE • RAG POISONING • INSECURE APIS • </span>
            <span>SQL INJECTION • XSS • IDOR • SSRF • BUSINESS LOGIC FLAWS • AUTH BYPASS • DESERIALIZATION • OPEN REDIRECT • PROMPT INJECTION • LLM ESCAPE • RAG POISONING • INSECURE APIS • </span>
          </div>
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes ticker-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `
          }} />
        </div>
      </div>

      <ServiceProcess steps={data.process} />

      {/* How It's Different comparison matrix */}
      <section className="relative w-full bg-[var(--bg-primary)] px-6 md:px-12 py-20 md:py-28 overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-12">
          <div>
            <SectionLabel color="secondary">BENCHMARK COMPARISON</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-medium text-[var(--text-primary)] uppercase tracking-tight mt-2">
              Why Entersoft AI AST
            </h2>
          </div>

          <div className="w-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 backdrop-blur-md rounded-[4px] overflow-hidden">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
              <div>FEATURE FOCUS</div>
              <div>TRADITIONAL SCANNING</div>
              <div className="text-[var(--accent)]">ENTERSOFT AI AST</div>
            </div>
            
            {differences.map((row, idx) => (
              <div key={idx} className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-[var(--border-subtle)]/50 p-4 font-sans text-xs items-center hover:bg-white/[0.01] transition-colors">
                <div className="font-bold text-[var(--text-primary)]">{row.feature}</div>
                <div className="text-[var(--text-secondary)] pr-4">{row.trad}</div>
                <div className="border-l-2 border-[var(--accent)] pl-3 py-1 font-semibold text-[var(--text-primary)]">
                  {row.enter}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceDeliverables deliverables={data.deliverables} integrations={data.integrations} />
      <ServiceFAQ faqs={data.faqs} />
      <ServiceCTA />
    </main>
  );
}
