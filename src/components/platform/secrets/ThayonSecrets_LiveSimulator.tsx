"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Shield, CheckCircle2, AlertTriangle, Eye, EyeOff, Play, RefreshCw, Key, Lock, Copy, Check } from "lucide-react";

export default function ThayonSecrets_LiveSimulator() {
  const samplePresets = [
    {
      name: "AWS STS Key",
      raw: 'const aws_access_key = "AKIA_DEMO_EXPOSURE_SAMPLE_01";\nconst aws_secret = "wJalrXUtnFEMI/MOCK_SECRET_KEY_DEMO_SAMPLE";',
      type: "AWS IAM Access Credential",
      entropy: "4.89 bits/byte",
      validity: "Active & Valid (Verified in Sandbox)",
      risk: "CRITICAL (IAM:FullAccess)",
      redacted: 'const aws_access_key = process.env.AWS_ACCESS_KEY_ID; // [REDACTED_BY_ENTERSOFT]\nconst aws_secret = process.env.AWS_SECRET_ACCESS_KEY; // [REDACTED_BY_ENTERSOFT]'
    },
    {
      name: "OpenAI API Token",
      raw: 'openai.api_key = "demo-mock-openai-live-key-placeholder-999";',
      type: "OpenAI Platform API Key",
      entropy: "5.12 bits/byte",
      validity: "Active & Valid (Tier 4 Org)",
      risk: "HIGH ($50k Monthly Limit)",
      redacted: 'openai.api_key = process.env.OPENAI_API_KEY; // [REDACTED_BY_ENTERSOFT]'
    },
    {
      name: "Stripe Secret Key",
      raw: 'const stripe = require("stripe")("sec_live_mock_stripe_gateway_key_9999");',
      type: "Stripe Live-Mode Secret",
      entropy: "4.95 bits/byte",
      validity: "Active & Valid (Payment Gateway)",
      risk: "EXTREME (Charge & Payout Rights)",
      redacted: 'const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // [REDACTED_BY_ENTERSOFT]'
    },
    {
      name: "Slack Webhook",
      raw: 'const hook = "https://hooks.slack.example.internal/services/T00000000/B00000000/MOCK_ALERT_TOKEN";',
      type: "Slack Incoming Webhook",
      entropy: "4.10 bits/byte",
      validity: "Active Channel (Prod-Alerts)",
      risk: "MEDIUM (Internal Phishing Risk)",
      redacted: 'const hook = process.env.SLACK_WEBHOOK_URL; // [REDACTED_BY_ENTERSOFT]'
    }
  ];

  const [selectedPreset, setSelectedPreset] = useState(0);
  const [inputText, setInputText] = useState(samplePresets[0].raw);
  const [isScanning, setIsScanning] = useState(false);
  const [copied, setCopied] = useState(false);

  const activePreset = samplePresets[selectedPreset];

  const handleSelectPreset = (idx: number) => {
    setSelectedPreset(idx);
    setInputText(samplePresets[idx].raw);
  };

  const handleScanTrigger = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activePreset.redacted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="interactive-demo" className="relative w-full bg-[#FAFCFF] text-slate-900 py-24 md:py-32 border-b border-slate-200/80 overflow-hidden">
      {/* Top 5-Point Crosshair Guide Bar */}
      <div className="relative max-w-[1320px] mx-auto px-6 mb-12">
        <div className="flex items-center justify-between text-slate-400 text-sm font-mono select-none">
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
        </div>
      </div>

      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500 mb-3">
            <span>[ 04 // LIVE VERIFICATION SIMULATOR ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-950 tracking-tight mb-4">
            Test Entersoft detection & automated validity verification
          </h2>
          <p className="text-slate-600 font-sans text-base sm:text-lg">
            See how the Entersoft EnProbe engine intercepts exposed tokens, calculates cryptographic entropy, probes sandbox validity, and injects safe vault variables.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {samplePresets.map((preset, idx) => (
            <button
              key={preset.name}
              onClick={() => handleSelectPreset(idx)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                selectedPreset === idx
                  ? "bg-slate-950 text-white shadow-md font-semibold"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left: Raw Code Input Pane */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white shadow-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-slate-700" />
                  RAW_CODE_INPUT.ts
                </span>
                <span className="text-slate-400">UNCOMMITTED CHANGES</span>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={7}
                className="w-full mt-4 font-mono text-xs sm:text-sm p-4 bg-slate-900 text-amber-300 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Paste code containing secret tokens or API keys..."
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Pattern: {activePreset.type}
              </span>
              <button
                onClick={handleScanTrigger}
                disabled={isScanning}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-mono font-medium hover:bg-blue-700 transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing AST & entropy...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Verification Ping</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Entersoft Guard Output & Sandbox Verdict */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-slate-950 text-slate-100 shadow-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ENPROBE_VERDICT // TRUE POSITIVE</span>
                </div>
                <span className="text-slate-500">LATENCY: 0.18s</span>
              </div>

              {/* Verdict Summary Box */}
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase">Entropy Score</div>
                  <div className="text-slate-200 font-bold mt-0.5">{activePreset.entropy}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase">Exploitability Risk</div>
                  <div className="text-red-400 font-bold mt-0.5">{activePreset.risk}</div>
                </div>
              </div>

              <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                  Active Sandbox Probe Verdict:
                </div>
                <div className="text-emerald-400 font-medium">
                  {activePreset.validity}
                </div>
              </div>

              {/* Redacted Safe Output */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                  <span>Sanitized Vault Variable Injection:</span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                  {activePreset.redacted}
                </pre>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Policy: BLOCK_PRE_PUSH</span>
              <span className="text-emerald-400 font-medium">0 Cloud Exfiltration Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 5-Point Crosshair Guide Bar */}
      <div className="relative max-w-[1320px] mx-auto px-6 mt-16">
        <div className="flex items-center justify-between text-slate-400 text-sm font-mono select-none">
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
        </div>
      </div>
    </section>
  );
}
