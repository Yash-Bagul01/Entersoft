"use client";

import React, { useState } from "react";
import { alertStream } from "@/data/cyberDefense";
import AlertRow from "../ui/AlertRow";

export default function CD1_AlertStream() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate stream items to achieve seamless continuous looping ticker
  const feedItems = [...alertStream, ...alertStream];

  return (
    <section id="alert-stream-section" className="w-full bg-[#0B1120] flex flex-col relative overflow-hidden select-none border-b border-[var(--cd-border)] max-h-[320px]">
      {/* Header bar */}
      <div className="w-full px-6 py-3.5 flex items-center justify-between border-b border-[var(--cd-border)] bg-[#080C14]/90 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA]">
            LIVE THREAT FEED
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#60A5FA] opacity-60" />
          <span className="hidden sm:inline-block font-mono text-[10px] text-[#64748B] tracking-wider">
            SOC TELEMETRY STREAM
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
          <span className="font-mono text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
            ACTIVE <span className="text-[#60A5FA] ml-1">8 EVENTS</span>
          </span>
        </div>
      </div>

      {/* Scrolling Ticker Container */}
      <div
        className="w-full overflow-hidden relative py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle Gradient Overlays at Top and Bottom */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0B1120] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0B1120] to-transparent z-10 pointer-events-none" />

        {/* Ticker List */}
        <div
          className="flex flex-col w-full"
          style={{
            animation: "streamScroll 22s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {feedItems.map((item, idx) => (
            <AlertRow key={`${item.time}-${idx}`} data={item as any} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes streamScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </section>
  );
}
