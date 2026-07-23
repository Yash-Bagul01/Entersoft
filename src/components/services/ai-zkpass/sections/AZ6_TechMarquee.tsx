"use client";

import React from "react";
import { techAssessed } from "@/data/aiZkpass";

export default function AZ6_TechMarquee() {
  return (
    <section className="az-section relative w-full py-16 px-6 select-none border-t border-[rgba(204,255,51,0.12)] overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-6">
        <span className="font-mono text-xs text-[rgba(240,244,255,0.4)] tracking-[0.2em] uppercase">
          TECHNOLOGIES ASSESSED
        </span>

        {/* Marquee Track Container */}
        <div className="w-full relative overflow-hidden">
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#05070F] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#05070F] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee gap-4 items-center">
            {[...techAssessed, ...techAssessed, ...techAssessed].map((tech, idx) => (
              <div
                key={idx}
                className="tech-pill inline-flex items-center px-4 py-2 bg-[#0B0E1A] border border-[rgba(204,255,51,0.12)] rounded-full font-mono text-xs text-[rgba(240,244,255,0.6)] tracking-wider whitespace-nowrap shrink-0 hover:border-[rgba(204,255,51,0.45)] hover:text-[#CCFF33] transition-colors cursor-pointer"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
