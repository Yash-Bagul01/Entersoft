"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, ArrowRight, ShieldCheck, Cloud, Code2, ChevronRight } from "lucide-react";

interface Practice {
  title: string;
  category: string;
  description: string;
  href: string;
  capabilities: string[];
  icon: React.ReactNode;
}

const practices: Practice[] = [
  {
    title: "Application Assurance",
    category: "APPSEC • DEVSECOPS • SECURE SDLC",
    description: "Powers the static credential interception layer of Entersoft's continuous AppSec practices, ensuring zero hardcoded secrets enter production codebases.",
    href: "/services/appsec",
    capabilities: [
      "Developer workstation pre-commit enforcement",
      "Pull request blocking security gates",
      "Automated secret remediation guidance in IDEs",
      "Unified correlation with SAST & DAST findings"
    ],
    icon: <Code2 className="w-6 h-6 text-[#60A5FA]" />
  },
  {
    title: "Cloud Resilience",
    category: "CSPM • CWPP • CLOUD IAM POSTURE",
    description: "Prevents AWS IAM keys, Azure credentials, and GCP service accounts from leaking into repositories and triggers instant automated rotation playbooks.",
    href: "/services/cloud-resilience",
    capabilities: [
      "Continuous cloud provider IAM key sync",
      "Automated key revocation & vault re-seeding",
      "Terraform, Helm & IaC credential scanning",
      "Zero-downtime microservice secret rotation"
    ],
    icon: <Cloud className="w-6 h-6 text-[#60A5FA]" />
  }
];

export default function NovaSecrets_PracticeIntegration() {
  return (
    <section className="w-full bg-[#030303] text-white py-28 md:py-36 border-b border-[#27272A]/80 relative z-10">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-[760px] mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-white/10 text-xs font-mono text-[#60A5FA] uppercase tracking-wider mb-5">
            <span>// PRACTICE INTEGRATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans leading-[1.08] mb-5">
            Powering Entersoft Security Practices.
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] font-sans leading-relaxed">
            How EnProbe Secrets Detection feeds into Entersoft continuous application assurance and cloud defense operations.
          </p>
        </div>

        {/* 2-Column Practice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {practices.map((practice, idx) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-px rounded-[32px] bg-gradient-to-b from-[#60A5FA]/25 via-white/5 to-transparent hover:from-[#60A5FA]/50 transition-all duration-300 shadow-2xl group"
            >
              <div className="w-full h-full bg-[#18181B]/95 rounded-[31px] p-8 sm:p-10 flex flex-col justify-between gap-8 backdrop-blur-xl border border-white/5">
                
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/15 border border-[#60A5FA]/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                      {practice.icon}
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#60A5FA] uppercase tracking-wider">
                      {practice.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white font-sans tracking-tight group-hover:text-[#93C5FD] transition-colors">
                    {practice.title}
                  </h3>

                  <p className="text-sm text-[#A1A1AA] font-sans leading-relaxed">
                    {practice.description}
                  </p>

                  <div className="pt-4 border-t border-white/5 flex flex-col gap-2.5">
                    {practice.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300 font-sans">
                        <ShieldCheck className="w-4 h-4 text-[#60A5FA] shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <Link
                    href={practice.href}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#60A5FA] hover:text-white transition-colors group/link"
                    data-cursor="link"
                  >
                    <span>View Service Practice</span>
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
