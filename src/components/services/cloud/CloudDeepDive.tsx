"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ProviderKey = "AWS" | "Azure" | "GCP";

interface CoverageDetails {
  domain: string;
  details: string;
}

export default function CloudDeepDive() {
  const [activeTab, setActiveTab] = useState<ProviderKey>("AWS");
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const isReduced = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const tabs: ProviderKey[] = ["AWS", "Azure", "GCP"];

  const coverageData: Record<ProviderKey, CoverageDetails[]> = {
    AWS: [
      { domain: "Misconfiguration Detection", details: "S3, EC2, CloudTrail, Config, GuardDuty scanning against CIS Benchmarks." },
      { domain: "IAM & Access Control", details: "IAM Policies, role assumption paths, SCP audits, cross-account trust maps." },
      { domain: "Runtime Threat Detection", details: "CloudTrail logs, VPC flow logs, GuardDuty alerts, automated event correlation." },
      { domain: "Network Exposure Analysis", details: "Security Groups, VPC gateway endpoints, Route53 public routes & DNS records." },
      { domain: "Secrets & Credentials", details: "Secrets Manager, KMS encryption keys, exposed access keys scanning." },
      { domain: "Compliance Mapping", details: "Continuous CIS benchmarks, SOC 2, ISO 27001, PCI-DSS, HIPAA control maps." }
    ],
    Azure: [
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

  // Auto-advance tabs
  useEffect(() => {
    if (isUserInteracted || isReduced) return;

    timerRef.current = setInterval(() => {
      setActiveTab((prev) => {
        const nextIdx = (tabs.indexOf(prev) + 1) % tabs.length;
        return tabs[nextIdx];
      });
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isUserInteracted, isReduced]);

  const selectTab = (tab: ProviderKey) => {
    setActiveTab(tab);
    setIsUserInteracted(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <section 
      id="cloud-deep-dive"
      className="w-full bg-[#050505] px-6 md:px-[8%] py-24 md:py-32 border-b border-zinc-900 relative select-none"
    >
      <div className="max-w-[1000px] w-full mx-auto flex flex-col gap-14">
        
        {/* Header and Horizontal tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-900 pb-6 relative">
          <div className="text-left">
            <span className="font-mono text-[9px] font-bold text-cyan-400 tracking-[0.25em] uppercase">PROVIDER SPECTRA</span>
            <h3 className="font-mono text-xl md:text-2xl font-bold uppercase tracking-tight text-white mt-1">
              Multi-Cloud Capability Tour
            </h3>
          </div>

          {/* horizontal tab bar */}
          <div className="flex flex-wrap gap-2 relative">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => selectTab(tab)}
                  className={`cursor-pointer font-mono text-xs uppercase tracking-widest px-5 py-2.5 transition-colors relative rounded-[2px] ${
                    isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Panel Content */}
        <div className="w-full min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col gap-8 text-left"
            >
              <h4 className="font-mono text-2xl font-bold text-white tracking-wider">
                {activeTab} ASSURANCE BOUNDARIES
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-4 border-t border-zinc-900">
                {coverageData[activeTab].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col gap-2 pb-4 border-b border-zinc-950/60"
                  >
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                      {item.domain}
                    </span>
                    <p className="font-sans text-xs md:text-sm text-zinc-300 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
