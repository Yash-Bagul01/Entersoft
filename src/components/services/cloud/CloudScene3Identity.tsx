"use client";

import React from "react";
import { motion } from "framer-motion";
import { cloudScenes } from "@/data/cloudSecurity";
import IAMTree from "./visuals/IAMTree";

export default function CloudScene3Identity() {
  const scene = cloudScenes[2];

  return (
    <section 
      id="scene-identity"
      className="w-full min-h-screen bg-black flex flex-col justify-center px-6 md:px-[8%] py-24 md:py-32 border-b border-zinc-950 relative overflow-hidden select-none"
    >
      <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-16 items-center relative z-10">
        
        {/* Top Centered copy */}
        <div className="flex flex-col gap-5 text-center items-center max-w-[750px]">
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
            className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed max-w-[560px]"
          >
            {scene.body}
          </motion.p>
        </div>

        {/* Lower Visual Area */}
        <div className="w-full flex justify-center">
          <IAMTree />
        </div>

        {/* Muted stats callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-1 mt-4"
        >
          <span className="font-mono text-xl font-bold text-cyan-400">{scene.stat.value}</span>
          <span className="font-mono text-[8.5px] text-zinc-500 uppercase tracking-wider text-center">{scene.stat.label}</span>
        </motion.div>

      </div>
    </section>
  );
}
