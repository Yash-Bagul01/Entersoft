"use client";

import React from "react";
import { motion } from "framer-motion";
import { cloudScenes } from "@/data/cloudSecurity";
import MisconfigPulse from "./visuals/MisconfigPulse";

export default function CloudScene2Exposure() {
  const scene = cloudScenes[1];

  return (
    <section 
      id="scene-exposure"
      className="w-full min-h-screen bg-[#050505] flex flex-col justify-center px-6 md:px-[8%] py-24 md:py-32 border-b border-zinc-950 relative overflow-hidden select-none"
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left visual column */}
        <div className="lg:col-span-6 order-2 lg:order-1 w-full flex justify-center">
          <MisconfigPulse />
        </div>

        {/* Vertical Separator Hairline */}
        <div className="hidden lg:block lg:col-span-1 h-[300px] w-[1px] bg-zinc-900/60 justify-self-center order-2" />

        {/* Right copy column (Right-aligned text) */}
        <div className="lg:col-span-5 order-1 lg:order-3 flex flex-col gap-6 text-right items-end">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[10px] font-bold text-cyan-400 tracking-[0.25em]"
          >
            {scene.eyebrow}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-tight"
          >
            {scene.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed max-w-[450px]"
          >
            {scene.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-1 border-r-2 border-cyan-500/30 pr-4 mt-2"
          >
            <span className="font-mono text-xl font-bold text-white">{scene.stat.value}</span>
            <span className="font-mono text-[8.5px] text-zinc-500 uppercase tracking-wider">{scene.stat.label}</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
