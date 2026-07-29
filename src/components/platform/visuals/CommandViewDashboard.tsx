"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Shield, Users, Code, Activity, TrendingUp } from "lucide-react";

export default function CommandViewDashboard() {
  const [activeRole, setActiveRole] = useState<"ciso" | "soc" | "devops">("ciso");

  const roles = {
    ciso: {
      title: "CISO & Executive Board View",
      kpis: [
        { label: "Enterprise Risk Posture", value: "88 / 100", trend: "+4% vs Last Month" },
        { label: "Active Critical Exposures", value: "2", trend: "-85% Noise Filtered" },
        { label: "Audit Readiness (ISO/SOC2)", value: "100%", trend: "Empanelled Certified" },
      ],
      insight: "Global security posture is healthy. All critical application and cloud ingress vectors are actively governed."
    },
    soc: {
      title: "SOC Threat Operations View",
      kpis: [
        { label: "Mean Time to Detect (MTTD)", value: "< 2 Mins", trend: "Automated Stream" },
        { label: "Open Incident Triage Queue", value: "3 Events", trend: "Active Monitoring" },
        { label: "Containment Playbook SLA", value: "100%", trend: "< 15 Min Containment" },
      ],
      insight: "3 telemetry anomalies identified in EKS cluster node-04; automated containment playbook engaged."
    },
    devops: {
      title: "DevOps & Engineering Lead View",
      kpis: [
        { label: "Mean Time to Remediate", value: "4.2 Hours", trend: "5x Velocity Increase" },
        { label: "CI/CD Gate PR Verification", value: "100% Passed", trend: "0 Regression Rate" },
        { label: "Unresolved Code Flaws", value: "4 Tickets", trend: "Jira Synchronized" },
      ],
      insight: "All pull request merges verified clean against SAST/SCA security gates before production deployment."
    }
  };

  const current = roles[activeRole];

  return (
    <div className="w-full bg-[#060606] border border-[#08428C]/40 rounded-[12px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Eye className="w-4 h-4 text-[#08428C]" />
          <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#08428C]">
            UNIFIED ROLE-BASED COMMAND DASHBOARD
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-white/60">Toggle Role Lens:</span>
        </div>
      </div>

      {/* Role Selector Tabs */}
      <div className="flex flex-wrap gap-3 mb-6 font-mono text-[11px]">
        {[
          { id: "ciso", label: "CISO Perspective", icon: <Shield className="w-3.5 h-3.5" /> },
          { id: "soc", label: "SOC Analyst Perspective", icon: <Activity className="w-3.5 h-3.5" /> },
          { id: "devops", label: "DevOps Lead Perspective", icon: <Code className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveRole(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded font-bold transition-all cursor-pointer ${
              activeRole === tab.id
                ? "bg-[#08428C] text-white shadow-lg"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Dashboard KPI Grid */}
      <div className="flex flex-col gap-6">
        <h4 className="text-[18px] font-bold font-display text-white">{current.title}</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          {current.kpis.map((kpi) => (
            <div key={kpi.label} className="bg-[#070b14] border border-[#08428C]/30 p-5 rounded-[8px] flex flex-col gap-2">
              <span className="text-[10px] text-white/50 uppercase">{kpi.label}</span>
              <span className="text-[28px] font-bold text-white font-display">{kpi.value}</span>
              <span className="text-[10px] text-[#08428C] font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {kpi.trend}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-[#0a0f1d] border border-white/10 p-4 rounded text-[13px] font-sans text-[#A1A1AA] flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#08428C] shrink-0" />
          <span>{current.insight}</span>
        </div>
      </div>
    </div>
  );
}
