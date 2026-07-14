"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ProviderKey = "AWS" | "AZURE" | "GCP";

interface CoverageDetails {
  domain: string;
  details: string;
}

export default function S6_DeepDive() {
  const [activeTab, setActiveTab] = useState<ProviderKey>("AWS");
  const [isInteracted, setIsInteracted] = useState(false);
  const isReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const tabs: ProviderKey[] = ["AWS", "AZURE", "GCP"];

  const coverageData: Record<ProviderKey, CoverageDetails[]> = {
    AWS: [
      { domain: "Misconfiguration Detection", details: "S3, EC2, CloudTrail, Config, GuardDuty scanning against CIS Benchmarks." },
      { domain: "IAM & Access Control", details: "IAM Policies, role assumption paths, SCP audits, cross-account trust maps." },
      { domain: "Runtime Threat Detection", details: "CloudTrail logs, VPC flow logs, GuardDuty alerts, automated event correlation." },
      { domain: "Network Exposure Analysis", details: "Security Groups, VPC gateway endpoints, Route53 public routes & DNS records." },
      { domain: "Secrets & Credentials", details: "Secrets Manager, KMS encryption keys, exposed access keys scanning." },
      { domain: "Compliance Mapping", details: "Continuous CIS benchmarks, SOC 2, ISO 27001, PCI-DSS, HIPAA control maps." }
    ],
    AZURE: [
      { domain: "Misconfiguration Detection", details: "Azure Policy, Microsoft Defender for Cloud, Storage Accounts, Key Vault scans." },
      { domain: "IAM & Access Control", details: "Entra ID roles, PIM assignments, conditional access rules, app registrations." },
      { domain: "Runtime Threat Detection", details: "Activity Logs, Diagnostic Logs, Sentinel integration, anomaly behaviors." },
      { domain: "Network Exposure Analysis", details: "Network Security Groups (NSGs), Azure Firewalls, public IP endpoints." },
      { domain: "Secrets & Credentials", details: "Key Vault secrets, Managed Identities configuration, encrypted keys." },
      { domain: "Compliance Mapping", details: "Continuous CIS Microsoft Azure Foundations, ISO 27001, GDPR alignment checks." }
    ],
    GCP: [
      { domain: "Misconfiguration Detection", details: "Security Command Center, Cloud Storage, Compute Engine instance configurations." },
      { domain: "IAM & Access Control", details: "Cloud IAM service accounts, IAM bindings, project access keys, role maps." },
      { domain: "Runtime Threat Detection", details: "Cloud Audit Logs, VPC Flow Logs, Security Command Center events sync." },
      { domain: "Network Exposure Analysis", details: "VPC Firewalls, Cloud Armor rules, Load Balancer frontends." },
      { domain: "Secrets & Credentials", details: "Secret Manager, Cloud KMS key rotation, environment variable scans." },
      { domain: "Compliance Mapping", details: "Continuous CIS Google Cloud Platform Benchmarks, SOC 2 control mappings." }
    ]
  };

  // Auto tab advance logic
  useEffect(() => {
    if (isReduced || isInteracted || !isInView) return;

    timerRef.current = setInterval(() => {
      setActiveTab((prev) => {
        const nextIdx = (tabs.indexOf(prev) + 1) % tabs.length;
        return tabs[nextIdx];
      });
    }, 6000); // Cycles every 6 seconds

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isInView, isInteracted, isReduced]);

  // Handle manual clicks
  const selectTab = (tab: ProviderKey) => {
    setActiveTab(tab);
    setIsInteracted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    // Resume auto-advance 8s after last interaction
    setTimeout(() => {
      setIsInteracted(false);
    }, 8000);
  };

  return (
    <section
      ref={containerRef}
      id="deep-dive"
      className="w-full bg-[#080808] text-[#F5F5F5] py-24 md:py-32 select-none relative z-20 border-t border-zinc-950"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 flex flex-col gap-16">
        
        {/* Tab Selection Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-zinc-900 pb-8">
          <div>
            <span className="font-mono text-[9px] font-bold text-[rgba(245,245,245,0.4)] tracking-[0.2em] uppercase">PROVIDER SPECTRA</span>
            <h3 className="font-mono text-xl md:text-2xl font-bold uppercase tracking-tight text-white mt-1">
              Multi-Cloud Coverage detail
            </h3>
          </div>

          {/* Typographic tabs */}
          <div className="flex flex-wrap gap-4 sm:gap-8 relative items-center w-full md:w-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => selectTab(tab)}
                  className={`cursor-pointer font-serif uppercase tracking-tight transition-all duration-300 ${
                    isActive
                      ? "text-[#F5F5F5] text-xl sm:text-2xl font-bold scale-105"
                      : "text-[rgba(245,245,245,0.3)] text-base sm:text-lg font-medium hover:text-[rgba(245,245,245,0.7)]"
                  }`}
                  style={{ 
                    letterSpacing: "-0.015em",
                    textShadow: isActive ? "0 0 30px rgba(245,245,245,0.3)" : "none" 
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display Area */}
        <div className="w-full min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={isReduced ? {} : { opacity: 0 }}
              animate={isReduced ? {} : { opacity: 1 }}
              exit={isReduced ? {} : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8"
            >
              {coverageData[activeTab].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 pt-4 border-t border-[rgba(245,245,245,0.1)] text-left"
                >
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#F5F5F5] font-bold">
                    {item.domain}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[rgba(245,245,245,0.5)] leading-relaxed mt-1">
                    {item.details}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
