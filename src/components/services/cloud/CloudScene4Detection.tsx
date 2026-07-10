"use client";

import React from "react";
import { motion } from "framer-motion";
import { cloudScenes } from "@/data/cloudSecurity";
import ThreatStream from "./visuals/ThreatStream";

export default function CloudScene4Detection() {
  const scene = cloudScenes[3];

  return (
    <section 
      id="scene-detection"
      className="w-full min-h-screen bg-[#050505] flex flex-col justify-center py-24 md:py-32 border-b border-zinc-950 relative overflow-hidden select-none pl-6 md:pl-[6%]"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left copy column (Compact, anchored far-left) */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left items-start pr-6 md:pr-0">
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
            className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed max-w-[380px]"
          >
            {scene.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-1 border-l-2 border-cyan-500/30 pl-4 mt-2"
          >
            <span className="font-mono text-xl font-bold text-cyan-400">{scene.stat.value}</span>
            <span className="font-mono text-[8.5px] text-zinc-500 uppercase tracking-wider">{scene.stat.label}</span>
          </motion.div>
        </div>

        {/* Right visual column (Bleeds to the right edge) */}
        <div className="lg:col-span-7 w-full flex justify-end">
          <div className="w-full lg:w-[105%] flex justify-end items-center">
            <ThreatStream />
          </div>
        </div>

      </div>
    </section>
  );
}
