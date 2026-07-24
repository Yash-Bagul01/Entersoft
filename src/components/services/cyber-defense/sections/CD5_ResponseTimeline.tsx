"use client";

import React from "react";
import { motion } from "framer-motion";
import CDGradientText from "../ui/CDGradientText";
import CDGlowCard from "../ui/CDGlowCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TIMELINE_STAGES = [
  {
    step: "01",
    phase: "SIGNAL COLLECTION",
    time: "CONTINUOUS",
    detail: "Ingest structured & unstructured logs across AWS/Azure/GCP, EDR feeds, Okta/AD identity, network flows, and WAF endpoints into a unified high-velocity data lake.",
  },
  {
    step: "02",
    phase: "DETECTION ENGINEERING",
    time: "< 2 MIN",
    detail: "Correlation engines and custom SIGMA rules analyze behavioral anomalies to group related events into a single actionable incident context.",
  },
  {
    step: "03",
    phase: "THREAT HUNTING",
    time: "PROACTIVE",
    detail: "Senior analysts test threat hypotheses against historical telemetry to uncover zero-days, living-off-the-land techniques, and persistent backdoor attempts.",
  },
  {
    step: "04",
    phase: "ROOT CAUSE INVESTIGATION",
    time: "< 15 MIN",
    detail: "Senior SOC lead verifies the alert, determines initial access vector, identifies compromised host credentials, and measures total blast radius.",
  },
  {
    step: "05",
    phase: "RAPID CONTAINMENT",
    time: "< 45 MIN",
    detail: "Automated & analyst-guided containment: isolate compromised hosts, revoke compromised IAM tokens, and block malicious external C2 IPs.",
  },
  {
    step: "06",
    phase: "CONTINUOUS TUNING",
    time: "SAME DAY",
    detail: "Incident learnings are fed back into custom detection rules to permanently eliminate false positives and harden cloud defenses against repeat vectors.",
  },
];

export default function CD5_ResponseTimeline() {
  const isReduced = useReducedMotion();

  return (
    <section className="w-full bg-[#080C14] py-16 px-6 md:px-12 relative z-10 border-b border-[var(--cd-border)]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#60A5FA] mb-3">
            // OPERATIONAL LIFECYCLE (01 → 06)
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FFFFFF] leading-tight">
            End-to-end <CDGradientText>cyber defense lifecycle</CDGradientText>.
          </h2>
        </div>

        {/* 01 -> 06 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {TIMELINE_STAGES.map((stage, idx) => {
            const isTriage = stage.step === "04";

            return (
              <motion.div
                key={stage.step}
                initial={isReduced ? {} : { opacity: 0, y: 20 }}
                whileInView={isReduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="relative"
              >
                <CDGlowCard
                  className={`h-full flex flex-col justify-between p-7 bg-[#0F172A] ${
                    isTriage ? "border-[#60A5FA] shadow-[0_0_24px_rgba(59,130,246,0.25)]" : ""
                  }`}
                >
                  <div>
                    {/* Header: 01 to 06 number + time badge */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xl font-extrabold text-[#60A5FA]">
                        O{stage.step}
                      </span>
                      <span
                        className="font-mono text-[10px] font-bold px-2.5 py-1 rounded tracking-wider"
                        style={{
                          color: isTriage ? "#60A5FA" : "#FFFFFF",
                          background: isTriage ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.06)",
                          border: `1px solid ${isTriage ? "rgba(96,165,250,0.3)" : "rgba(255,255,255,0.1)"}`,
                        }}
                      >
                        {stage.time}
                      </span>
                    </div>

                    {/* Stage Name */}
                    <h3
                      className="font-serif text-xl font-bold mb-3 tracking-tight"
                      style={{ color: isTriage ? "#60A5FA" : "#FFFFFF" }}
                    >
                      {stage.phase}
                    </h3>

                    {/* Detail */}
                    <p className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      {stage.detail}
                    </p>
                  </div>

                  {/* Connecting Line Hairline */}
                  <div
                    className="w-full h-1 rounded-full mt-6"
                    style={{
                      background: isTriage
                        ? "linear-gradient(90deg, #3B82F6, #60A5FA)"
                        : "var(--cd-border)",
                    }}
                  />
                </CDGlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
