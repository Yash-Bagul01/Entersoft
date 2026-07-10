"use client";

import React from "react";
import { motion } from "framer-motion";
import { cloudScenes } from "@/data/cloudSecurity";
import CloudTopologyMap from "./visuals/CloudTopologyMap";

export default function CloudScene1Visibility() {
  const scene = cloudScenes[0];

  return (
    <section 
      id="scene-visibility"
      className="w-full min-h-screen bg-black flex flex-col justify-center px-6 md:px-[8%] py-24 md:py-32 border-b border-zinc-950 relative overflow-hidden select-none"
    >
      {/* Topology Background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 bottom-0 left-[25%] w-[1px] bg-zinc-800" />
        <div className="absolute top-0 bottom-0 left-[75%] w-[1px] bg-zinc-800" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left copy column */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left items-start">
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
            className="flex flex-col gap-1 border-l-2 border-cyan-500/30 pl-4 mt-2"
          >
            <span className="font-mono text-xl font-bold text-white">{scene.stat.value}</span>
            <span className="font-mono text-[8.5px] text-zinc-500 uppercase tracking-wider">{scene.stat.label}</span>
          </motion.div>
        </div>

        {/* Vertical Separator Hairline */}
        <div className="hidden lg:block lg:col-span-1 h-[300px] w-[1px] bg-zinc-900/60 justify-self-center" />

        {/* Right visual column */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <CloudTopologyMap />
        </div>
      </div>
    </section>
  );
}
