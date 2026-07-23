"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIV3_MarqueeDivider() {
  const marqueeText = [
    "CONTINUOUS AI ASSURANCE",
    "OWASP AI TOP 10 PROTECTION",
    "PROOFS FOR ENTERPRISE AI",
    "0.0% FALSE POSITIVES",
    "NIST AI RMF COMPLIANCE",
    "ZERO-TRUST AGENT GOVERNANCE",
  ];

  return (
    <div className="w-full bg-black border-y border-white/10 py-3 overflow-hidden select-none relative">
      <div className="flex w-max animate-marquee gap-8 items-center">
        {[...marqueeText, ...marqueeText, ...marqueeText].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="font-mono text-xs font-semibold text-white/70 tracking-[0.2em] uppercase">
              {text}
            </span>
            <span className="text-[#00A3FF] font-mono text-xs font-bold">✕</span>
          </div>
        ))}
      </div>
    </div>
  );
}
