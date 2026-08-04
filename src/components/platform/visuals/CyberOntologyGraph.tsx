"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, ShieldCheck, Cpu, Key, Cloud, Code2, Sparkles, Activity, Zap, CheckCircle2 } from "lucide-react";

interface NodeItem {
  id: string;
  label: string;
  type: string;
  icon: React.ReactNode;
  x: number; // percentage
  y: number; // percentage
  connectedTo: string[];
  details: {
    criticality: "CRITICAL" | "HIGH" | "MEDIUM";
    exposures: number;
    owner: string;
    relationships: string[];
  };
}

export default function CyberOntologyGraph() {
  const nodes: NodeItem[] = [
    {
      id: "api-gw",
      label: "API Gateway",
      type: "Ingress Vector",
      icon: <Code2 className="w-4 h-4" />,
      x: 22,
      y: 28,
      connectedTo: ["auth-svc", "cloud-vpc"],
      details: {
        criticality: "CRITICAL",
        exposures: 2,
        owner: "Edge Infra Team",
        relationships: ["Routes to auth-svc", "Enforces TLS 1.3", "Connected to CloudFront CDN"]
      }
    },
    {
      id: "auth-svc",
      label: "IAM Auth Service",
      type: "Identity Control",
      icon: <Key className="w-4 h-4" />,
      x: 50,
      y: 20,
      connectedTo: ["db-main", "k8s-cluster"],
      details: {
        criticality: "CRITICAL",
        exposures: 0,
        owner: "SecOps Cohort",
        relationships: ["Governs 14,200 active roles", "OAuth2/OIDC provider", "Linked to Postgres DB"]
      }
    },
    {
      id: "db-main",
      label: "Customer Postgres DB",
      type: "Data Asset",
      icon: <Database className="w-4 h-4" />,
      x: 78,
      y: 35,
      connectedTo: ["cloud-vpc"],
      details: {
        criticality: "CRITICAL",
        exposures: 1,
        owner: "Data Platform",
        relationships: ["Stores PII records", "AES-256 Encrypted at Rest", "Monitored by SIEM"]
      }
    },
    {
      id: "k8s-cluster",
      label: "EKS Production Cluster",
      type: "Compute Runtime",
      icon: <Cpu className="w-4 h-4" />,
      x: 44,
      y: 65,
      connectedTo: ["db-main", "cloud-vpc"],
      details: {
        criticality: "HIGH",
        exposures: 3,
        owner: "DevOps Squad",
        relationships: ["Runs 48 microservices", "Continuous CSPM auditing", "Role-based Network Policy"]
      }
    },
    {
      id: "cloud-vpc",
      label: "AWS Multi-Region VPC",
      type: "Cloud Infrastructure",
      icon: <Cloud className="w-4 h-4" />,
      x: 74,
      y: 75,
      connectedTo: [],
      details: {
        criticality: "HIGH",
        exposures: 0,
        owner: "Cloud SecOps",
        relationships: ["Shielded by WAF", "Isolated Subnets", "Zero Public DB Route"]
      }
    }
  ];

  const [activeNode, setActiveNode] = useState<NodeItem>(nodes[0]);

  return (
    <div className="w-full bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(11,79,210,0.06)] relative overflow-hidden">
      {/* Subtle Light Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0B4FD2_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-5 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0B4FD2] animate-ping" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0B4FD2] flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" /> LIVE UNIFIED ONTOLOGY GRAPH
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 bg-slate-50 border border-slate-200/90 px-3.5 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#0B4FD2]" />
          <span>Click any node to inspect security context</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-center">
        {/* Canvas Graph Interactive Container */}
        <div className="lg:col-span-7 relative h-[380px] md:h-[440px] bg-slate-50/90 rounded-2xl border border-slate-200 overflow-hidden shadow-inner">
          
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="22%" y1="28%" x2="50%" y2="20%" stroke="#0B4FD2" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse opacity-70" />
            <line x1="50%" y1="20%" x2="78%" y2="35%" stroke="#0B4FD2" strokeWidth="2.5" className="opacity-90" />
            <line x1="50%" y1="20%" x2="44%" y2="65%" stroke="#0B4FD2" strokeWidth="2" />
            <line x1="44%" y1="65%" x2="78%" y2="35%" stroke="#0B4FD2" strokeWidth="2" strokeDasharray="5 5" className="opacity-60" />
            <line x1="44%" y1="65%" x2="74%" y2="75%" stroke="#0B4FD2" strokeWidth="2.5" />
            <line x1="78%" y1="35%" x2="74%" y2="75%" stroke="#0B4FD2" strokeWidth="2" />
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelected = activeNode.id === node.id;
            return (
              <motion.button
                key={node.id}
                onClick={() => setActiveNode(node)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all cursor-pointer z-20 shadow-md ${
                  isSelected
                    ? "bg-[#0B4FD2] border-[#0B4FD2] text-white shadow-[0_10px_25px_rgba(11,79,210,0.35)] font-bold ring-4 ring-[#0B4FD2]/20"
                    : "bg-white border-slate-200 text-slate-700 hover:border-[#0B4FD2] hover:text-[#0B4FD2]"
                }`}
              >
                <div className={`${isSelected ? "text-white" : "text-[#0B4FD2]"}`}>
                  {node.icon}
                </div>
                <span className="font-mono text-[11px] font-bold tracking-tight whitespace-nowrap">
                  {node.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Node Inspector Detail Card */}
        <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200/90 p-6 rounded-2xl flex flex-col justify-between h-[380px] md:h-[440px] shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-start justify-between border-b border-slate-200/80 pb-3">
                <div>
                  <span className="font-mono text-[10px] text-[#0B4FD2] uppercase tracking-widest block font-bold flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-[#0B4FD2]" /> SELECTED ENTITY CONTEXT
                  </span>
                  <h4 className="text-[20px] font-bold font-display text-slate-900 mt-1">
                    {activeNode.label}
                  </h4>
                </div>
                <span className="font-mono text-[10px] font-bold px-3 py-1 rounded-full bg-[#0B4FD2]/10 border border-[#0B4FD2]/20 text-[#0B4FD2] whitespace-nowrap">
                  {activeNode.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-slate-400 block text-[9px] uppercase font-semibold">Asset Criticality</span>
                  <span className={`font-bold text-[12px] ${
                    activeNode.details.criticality === "CRITICAL" ? "text-rose-600" : "text-amber-600"
                  }`}>
                    {activeNode.details.criticality}
                  </span>
                </div>
                <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 shadow-2xs">
                  <span className="text-slate-500 block text-[9px] uppercase font-semibold">Active Exposures</span>
                  <span className="text-[#0B4FD2] font-bold text-[12px]">
                    {activeNode.details.exposures} Flaws Detected
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Relational Security Graph Links:
                </span>
                <ul className="flex flex-col gap-1.5 font-mono text-[11px] text-slate-700">
                  {activeNode.details.relationships.map((rel, i) => (
                    <li key={i} className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200/80 text-slate-700 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0B4FD2] shrink-0" />
                      <span>{rel}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pt-3 border-t border-slate-200/80 flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>OWNER: <strong className="text-slate-800">{activeNode.details.owner}</strong></span>
            <span className="text-[#0B4FD2] font-bold">ONTOLOGY ID: {activeNode.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
