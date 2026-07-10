"use client";

import React from "react";
import { motion } from "framer-motion";
import { cloudHero } from "@/data/cloudSecurity";
import CloudTopologyMap from "./visuals/CloudTopologyMap";
import ServiceBreadcrumb from "../ServiceBreadcrumb";

export default function CloudHero() {
  const { eyebrow, headline, subline } = cloudHero;

  return (
    <section 
      id="hero" 
      className="relative w-full h-screen h-[100dvh] flex flex-col justify-between bg-black text-white overflow-hidden select-none"
    >
      {/* Topology map as ambient background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-full hidden lg:flex items-center justify-center pointer-events-none opacity-[0.18] z-0">
        <CloudTopologyMap ambient />
      </div>

      {/* Top Header Row */}
      <div className="w-full px-6 md:px-[8%] pt-8 z-10">
        <ServiceBreadcrumb />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-[8%] z-10 relative">
        <div className="flex flex-col gap-6 max-w-[850px] text-left">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400"
          >
            {eyebrow}
          </motion.span>

          {/* Headline Stacked */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-none text-zinc-100 flex flex-col">
            {headline.map((line, idx) => (
              <span key={idx} className="overflow-hidden inline-block relative py-1">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 0.85, 
                    delay: 0.15 + idx * 0.18, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="inline-block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="font-sans text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-[560px]"
          >
            {subline}
          </motion.p>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="w-full flex flex-col items-center pb-8 z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col items-center gap-3 cursor-pointer"
          onClick={() => {
            const nextSec = document.getElementById("transition-section");
            if (nextSec) nextSec.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.25em]">SCROLL</span>
          <div className="w-[1.5px] h-10 bg-zinc-900 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-cyan-400"
              animate={{ 
                height: ["0%", "80%", "0%"],
                top: ["0%", "20%", "100%"]
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ height: "40%" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
