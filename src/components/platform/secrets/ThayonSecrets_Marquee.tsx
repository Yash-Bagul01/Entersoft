"use client";

import React from "react";
import { Key, Shield, Lock, Server, Cpu, Database, Cloud, Code } from "lucide-react";

export default function ThayonSecrets_Marquee() {
  const secretEcosystems = [
    { name: "AWS IAM & STS Tokens", type: "Cloud IAM" },
    { name: "OpenAI & Anthropic API Keys", type: "AI Engine" },
    { name: "GitHub Personal Access Tokens", type: "VCS Auth" },
    { name: "Stripe Secret & Webhook Keys", type: "Payment GW" },
    { name: "Google Cloud Service Accounts", type: "GCP KMS" },
    { name: "Slack & Discord Webhooks", type: "ChatOps" },
    { name: "PostgreSQL & Mongo DB URIs", type: "Database" },
    { name: "SSH & RSA 4096-bit Keys", type: "Crypto Key" },
    { name: "Kubernetes Secret Manifests", type: "K8s Cluster" },
    { name: "Azure AD Client Secrets", type: "Identity" },
    { name: "Datadog & NewRelic API Keys", type: "Observability" },
    { name: "HashiCorp Vault AppRoles", type: "Secrets Vault" },
    { name: "SendGrid & Twilio Auth Tokens", type: "Communications" },
    { name: "JWT & HMAC Signing Secrets", type: "Token Cryptography" }
  ];

  return (
    <div className="w-full bg-[#FAFCFF] border-b border-slate-200/80 py-8 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 mb-4 flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-600 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          Native detection & active verification across 850+ provider ecosystems:
        </span>
        <span className="text-[11px] font-mono text-slate-600 hidden sm:inline-block">
          Zero-Regex-Fatigue Architecture
        </span>
      </div>

      <div className="relative w-full flex overflow-x-hidden mask-fade-edges">
        {/* Infinite scrolling marquee wrapper */}
        <div className="flex gap-4 shrink-0 animate-marquee items-center whitespace-nowrap">
          {secretEcosystems.concat(secretEcosystems).map((eco, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-200 bg-white/90 shadow-sm hover:border-slate-300 transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-sans text-xs font-semibold text-slate-800">{eco.name}</span>
              <span className="text-[10px] font-mono text-slate-600 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200/60">
                {eco.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
