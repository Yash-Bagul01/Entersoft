"use client";

import React from "react";

export function CodeApiDiagram() {
  return (
    <div className="w-full h-full min-h-[180px] bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between relative overflow-hidden group hover:border-[#08428C]/50 transition-colors">
      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-200/60 pb-3">
        <span className="font-bold text-[#08428C]">// AST & REPO AST SCHEMA</span>
        <span className="bg-blue-50 text-[#08428C] px-2 py-0.5 rounded border border-blue-100 font-semibold">CODE GRAPH</span>
      </div>

      <svg className="w-full h-[100px] my-2" viewBox="0 0 300 100" fill="none">
        {/* Repo Node */}
        <circle cx="40" cy="50" r="16" fill="#08428C" fillOpacity="0.1" stroke="#08428C" strokeWidth="2" />
        <circle cx="40" cy="50" r="6" fill="#08428C" />

        {/* Lines to AST Nodes */}
        <line x1="56" y1="50" x2="130" y2="28" stroke="#0D518C" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="56" y1="50" x2="130" y2="72" stroke="#0D518C" strokeWidth="1.5" />

        {/* AST Node 1 */}
        <rect x="130" y="16" width="60" height="24" rx="6" fill="#ffffff" stroke="#08428C" strokeWidth="1.5" />
        <text x="160" y="32" textAnchor="middle" fill="#08428C" fontSize="9" fontFamily="monospace" fontWeight="bold">API GET</text>

        {/* AST Node 2 */}
        <rect x="130" y="60" width="60" height="24" rx="6" fill="#ffffff" stroke="#08428C" strokeWidth="1.5" />
        <text x="160" y="76" textAnchor="middle" fill="#08428C" fontSize="9" fontFamily="monospace" fontWeight="bold">AUTH SDLC</text>

        {/* Line to Committer Node */}
        <line x1="190" y1="28" x2="250" y2="50" stroke="#08428C" strokeWidth="1.5" />
        <line x1="190" y1="72" x2="250" y2="50" stroke="#08428C" strokeWidth="1.5" />

        {/* Committer Node */}
        <circle cx="250" cy="50" r="14" fill="#0D518C" fillOpacity="0.15" stroke="#0D518C" strokeWidth="2" />
        <circle cx="250" cy="50" r="5" fill="#08428C" />
      </svg>

      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
        <span>COMMITTER: MAINTAINER_01</span>
        <span className="text-[#08428C] font-bold">100% MATCHED</span>
      </div>
    </div>
  );
}

export function CloudTopologyDiagram() {
  return (
    <div className="w-full h-full min-h-[180px] bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between relative overflow-hidden group hover:border-[#08428C]/50 transition-colors">
      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-200/60 pb-3">
        <span className="font-bold text-[#08428C]">// AWS VPC & EKS TOPOLOGY</span>
        <span className="bg-blue-50 text-[#08428C] px-2 py-0.5 rounded border border-blue-100 font-semibold">CLOUD MESH</span>
      </div>

      <svg className="w-full h-[100px] my-2" viewBox="0 0 300 100" fill="none">
        {/* VPC Box */}
        <rect x="20" y="10" width="260" height="80" rx="10" fill="#ffffff" stroke="#08428C" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="35" y="26" fill="#08428C" fontSize="9" fontFamily="monospace" fontWeight="bold">AWS VPC us-east-1</text>

        {/* EKS Cluster Node */}
        <rect x="40" y="38" width="90" height="40" rx="6" fill="#08428C" fillOpacity="0.08" stroke="#08428C" strokeWidth="1.5" />
        <text x="85" y="62" textAnchor="middle" fill="#08428C" fontSize="10" fontFamily="monospace" fontWeight="bold">EKS Cluster</text>

        {/* Vector line to S3 Bucket */}
        <line x1="130" y1="58" x2="180" y2="58" stroke="#0D518C" strokeWidth="2" />

        {/* S3 Bucket Node */}
        <rect x="180" y="38" width="80" height="40" rx="6" fill="#08428C" fillOpacity="0.08" stroke="#08428C" strokeWidth="1.5" />
        <text x="220" y="62" textAnchor="middle" fill="#08428C" fontSize="10" fontFamily="monospace" fontWeight="bold">S3 Bucket</text>
      </svg>

      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
        <span>24 SUB-NETWORKS</span>
        <span className="text-[#08428C] font-bold">ISOLATED</span>
      </div>
    </div>
  );
}

export function IamMatrixDiagram() {
  return (
    <div className="w-full h-full min-h-[180px] bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between relative overflow-hidden group hover:border-[#08428C]/50 transition-colors">
      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-200/60 pb-3">
        <span className="font-bold text-[#08428C]">// IAM ROLE BOUNDARY MATRIX</span>
        <span className="bg-blue-50 text-[#08428C] px-2 py-0.5 rounded border border-blue-100 font-semibold">ZERO TRUST</span>
      </div>

      <svg className="w-full h-[100px] my-2" viewBox="0 0 300 100" fill="none">
        {/* Role 1 */}
        <rect x="20" y="25" width="80" height="50" rx="8" fill="#ffffff" stroke="#08428C" strokeWidth="1.5" />
        <text x="60" y="48" textAnchor="middle" fill="#08428C" fontSize="9" fontFamily="monospace" fontWeight="bold">OIDC ROLE</text>
        <text x="60" y="62" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="monospace">14.2K Active</text>

        <line x1="100" y1="50" x2="160" y2="50" stroke="#0D518C" strokeWidth="2" strokeDasharray="3 3" />

        {/* Policy Gate */}
        <circle cx="160" cy="50" r="16" fill="#08428C" stroke="#08428C" strokeWidth="1.5" />
        <text x="160" y="54" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">LOCK</text>

        <line x1="176" y1="50" x2="220" y2="50" stroke="#0D518C" strokeWidth="2" />

        {/* Target Asset */}
        <rect x="220" y="25" width="60" height="50" rx="8" fill="#08428C" fillOpacity="0.1" stroke="#08428C" strokeWidth="1.5" />
        <text x="250" y="54" textAnchor="middle" fill="#08428C" fontSize="9" fontFamily="monospace" fontWeight="bold">DB PII</text>
      </svg>

      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
        <span>IAM POLICIES ENFORCED</span>
        <span className="text-[#08428C] font-bold">14,200 ROLES</span>
      </div>
    </div>
  );
}

export function ControlsDiagram() {
  return (
    <div className="w-full h-full min-h-[180px] bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between relative overflow-hidden group hover:border-[#08428C]/50 transition-colors">
      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-200/60 pb-3">
        <span className="font-bold text-[#08428C]">// CONTROLS & EXPOSURES</span>
        <span className="bg-blue-50 text-[#08428C] px-2 py-0.5 rounded border border-blue-100 font-semibold">RISK RATING</span>
      </div>

      <svg className="w-full h-[100px] my-2" viewBox="0 0 300 100" fill="none">
        {/* WAF Rule */}
        <rect x="20" y="30" width="70" height="40" rx="6" fill="#ffffff" stroke="#08428C" strokeWidth="1.5" />
        <text x="55" y="54" textAnchor="middle" fill="#08428C" fontSize="9" fontFamily="monospace" fontWeight="bold">WAF RULE</text>

        <line x1="90" y1="50" x2="135" y2="50" stroke="#08428C" strokeWidth="1.5" />

        {/* CVE Threat Feed */}
        <rect x="135" y="30" width="70" height="40" rx="6" fill="#08428C" fillOpacity="0.1" stroke="#08428C" strokeWidth="1.5" />
        <text x="170" y="54" textAnchor="middle" fill="#08428C" fontSize="9" fontFamily="monospace" fontWeight="bold">CVE FEED</text>

        <line x1="205" y1="50" x2="245" y2="50" stroke="#08428C" strokeWidth="1.5" />

        {/* Business Impact Meter */}
        <circle cx="265" cy="50" r="18" fill="#ffffff" stroke="#08428C" strokeWidth="2" />
        <text x="265" y="54" textAnchor="middle" fill="#08428C" fontSize="10" fontFamily="monospace" fontWeight="bold">9.8</text>
      </svg>

      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
        <span>GRC COMPLIANCE MAP</span>
        <span className="text-[#08428C] font-bold">MONITORED</span>
      </div>
    </div>
  );
}
