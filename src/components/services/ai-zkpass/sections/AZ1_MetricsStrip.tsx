"use client";

import React from "react";
import { motion } from "framer-motion";
import { metrics } from "@/data/aiZkpass";
import GlowCard from "@/components/services/ai-zkpass/ui/GlowCard";

export default function AZ1_MetricsStrip() {
  return (
    <section className="az-section relative w-full py-12 px-6 md:px-12 select-none border-y border-[rgba(204,255,51,0.12)] bg-[#05070F]/80 backdrop-blur-md">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlowCard className="p-6 h-full flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-bold text-[#CCFF33] leading-none">
                    {m.value}
                  </span>
                  <span className="font-sans text-base font-semibold text-[#F0F4FF] mt-2">
                    {m.label}
                  </span>
                </div>
                <span className="font-sans text-xs text-[rgba(240,244,255,0.5)] mt-3 leading-relaxed">
                  {m.sub}
                </span>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
