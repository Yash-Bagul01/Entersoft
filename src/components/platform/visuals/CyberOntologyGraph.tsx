"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, ShieldCheck, Cpu, Key, Cloud, Code2, Sparkles } from "lucide-react";

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
      icon: <Code2 className="w-5 h-5" />,
      x: 20,
      y: 30,
      connectedTo: ["auth-svc", "cloud-[#08428C]"],
      details: {
        criticality: "CRITICAL",
        exposures: 2,
        owner: "Edge Infra Team",
        relationships: ["Routes to auth-svc", "Enforces TLS 1.3", "Connected to AWS CloudFront"]
      }
    },
    {
      id: "auth-svc",
      label: "IAM Auth Service",
      type: "Identity Control",
      icon: <Key className="w-5 h-5" />,
      x: 48,
      y: 22,
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
      icon: <Database className="w-5 h-5" />,
      x: 78,
      y: 38,
      connectedTo: ["cloud-[#08428C]"],
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
      icon: <Cpu className="w-5 h-5" />,
      x: 42,
      y: 65,
      connectedTo: ["db-main", "cloud-[#08428C]"],
      details: {
        criticality: "HIGH",
        exposures: 3,
        owner: "DevOps Squad",
        relationships: ["Runs 48 microservices", "Continuous CSPM auditing", "Role-based Network Policy"]
      }
    },
    {
      id: "cloud-[#08428C]",
      label: "AWS Multi-Region VPC",
      type: "Cloud Infrastructure",
      icon: <Cloud className="w-5 h-5" />,
      x: 72,
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
    <div className="w-full bg-[#060606] border border-[#08428C]/30 rounded-[12px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Background Subtle Graph Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#08428C_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#08428C]/20 pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#08428C] animate-pulse" />
          <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#08428C]">
            LIVE UNIFIED ONTOLOGY GRAPH
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-white/60">
          <Sparkles className="w-3.5 h-3.5 text-[#08428C]" />
          <span>Click any node to inspect security context</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-center">
        {/* Canvas Graph Interactive Container */}
        <div className="lg:col-span-7 relative h-[360px] md:h-[420px] bg-[#070b14]/80 rounded-[8px] border border-white/10 overflow-hidden">
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="20%" y1="30%" x2="48%" y2="22%" stroke="#08428C" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
            <line x1="48%" y1="22%" x2="78%" y2="38%" stroke="#08428C" strokeWidth="2" />
            <line x1="48%" y1="22%" x2="42%" y2="65%" stroke="#08428C" strokeWidth="2" />
            <line x1="42%" y1="65%" x2="78%" y2="38%" stroke="#08428C" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="42%" y1="65%" x2="72%" y2="75%" stroke="#08428C" strokeWidth="2" />
            <line x1="78%" y1="38%" x2="72%" y2="75%" stroke="#08428C" strokeWidth="2" />
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelected = activeNode.id === node.id;
            return (
              <motion.button
                key={node.id}
                onClick={() => setActiveNode(node)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 p-3 rounded-full border transition-all cursor-pointer z-20 ${
                  isSelected
                    ? "bg-[#08428C] border-white text-white shadow-[0_0_24px_rgba(8,66,140,0.8)] ring-4 ring-[#08428C]/30"
                    : "bg-[#0a0f1d] border-[#08428C]/40 text-white/80 hover:border-[#08428C] hover:text-white"
                }`}
              >
                <div className={`${isSelected ? "text-white" : "text-[#08428C]"}`}>
                  {node.icon}
                </div>
                <span className="font-mono text-[11px] font-bold tracking-wider hidden sm:inline whitespace-nowrap">
                  {node.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Node Inspector Detail Card */}
        <div className="lg:col-span-5 bg-[#0a0f1d] border border-[#08428C]/40 p-6 rounded-[8px] flex flex-col justify-between h-[360px] md:h-[420px] shadow-xl">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-[10px] text-[#08428C] uppercase tracking-widest block">
                  SELECTED ENTITY CONTEXT
                </span>
                <h4 className="text-[20px] font-bold font-display text-white mt-1">
                  {activeNode.label}
                </h4>
              </div>
              <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded bg-[#08428C]/20 border border-[#08428C] text-[#08428C]">
                {activeNode.type}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
              <div className="bg-white/5 p-3 rounded border border-white/5">
                <span className="text-white/40 block text-[9px] uppercase">Asset Criticality</span>
                <span className="text-white font-bold">{activeNode.details.criticality}</span>
              </div>
              <div className="bg-white/5 p-3 rounded border border-white/5">
                <span className="text-white/40 block text-[9px] uppercase">Active Signal Exposures</span>
                <span className="text-[#08428C] font-bold">{activeNode.details.exposures} Flaws Detected</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">
                Relational Security Graph Links:
              </span>
              <ul className="flex flex-col gap-1.5 font-mono text-[11px] text-white/80">
                {activeNode.details.relationships.map((rel, i) => (
                  <li key={i} className="flex items-center gap-2 bg-white/[0.03] p-2 rounded border border-white/5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#08428C] shrink-0" />
                    <span>{rel}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-white/40">
            <span>OWNER: {activeNode.details.owner}</span>
            <span className="text-[#08428C]">ONTOLOGY ID: {activeNode.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
