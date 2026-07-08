"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Layers, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface VAPTVisualProps {
  activeStep?: number;
}

export default function VAPTVisual({ activeStep = 0 }: VAPTVisualProps) {
  const cards = [
    {
      idx: 0,
      title: "BLACK BOX AUDIT",
      level: "Level 01 // External Boundary",
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      colorClass: "text-cyan-400",
      borderGlow: "rgba(6, 182, 212, 0.45)",
      shadowGlow: "0 20px 40px rgba(6, 182, 212, 0.04), inset 0 0 12px rgba(6, 182, 212, 0.02)",
      imgSrc: "/vapt_black_box.png",
      params: [
        { label: "TARGET DIAGNOSTIC", val: "IP Scope / DNS Alternate Paths" },
        { label: "THREAT VECTOR", val: "External Network Perimeter" },
        { label: "ACCESS META", val: "Zero Prior Knowledge" }
      ]
    },
    {
      idx: 1,
      title: "GREY BOX AUDIT",
      level: "Level 02 // Insider Privilege",
      icon: <Lock className="w-5 h-5 text-amber-500" />,
      colorClass: "text-amber-500",
      borderGlow: "rgba(245, 158, 11, 0.45)",
      shadowGlow: "0 20px 40px rgba(245, 158, 11, 0.04), inset 0 0 12px rgba(245, 158, 11, 0.02)",
      imgSrc: "/vapt_grey_box.png",
      params: [
        { label: "TARGET DIAGNOSTIC", val: "API Privilege Gateways" },
        { label: "THREAT VECTOR", val: "Privilege Escalation / Token Leak" },
        { label: "ACCESS META", val: "Standard User Access" }
      ]
    },
    {
      idx: 2,
      title: "WHITE BOX AUDIT",
      level: "Level 03 // Source Repository",
      icon: <Layers className="w-5 h-5 text-emerald-500" />,
      colorClass: "text-emerald-500",
      borderGlow: "rgba(16, 185, 129, 0.45)",
      shadowGlow: "0 20px 40px rgba(16, 185, 129, 0.04), inset 0 0 12px rgba(16, 185, 129, 0.02)",
      imgSrc: "/vapt_white_box.png",
      params: [
        { label: "TARGET DIAGNOSTIC", val: "Code Level Architecture" },
        { label: "THREAT VECTOR", val: "Developer Repository Takeover" },
        { label: "ACCESS META", val: "Full Git / Config Access" }
      ]
    }
  ];

  return (
    <div className="relative w-full max-w-[380px] h-[460px] flex items-center justify-center select-none perspective-[1000px]">
      
      {/* Stacking card deck wrapper */}
      <div className="relative w-[340px] h-[420px] transform-style-3d">
        {cards.map((card) => {
          const diff = card.idx - activeStep;
          const isPast = diff < 0;
          const isActive = diff === 0;

          // Stacking calculations
          let y = diff * 12; // offset down for deck preview
          let scale = 1 - diff * 0.04;
          let rotate = diff * 1.5;
          let opacity = 1;
          let zIndex = 30 - card.idx;

          if (isPast) {
            // Slide up and out of deck
            y = -460;
            scale = 0.9;
            rotate = -12;
            opacity = 0;
          }

          return (
            <motion.div
              key={card.idx}
              animate={{
                y,
                scale,
                rotate,
                opacity,
                zIndex
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute inset-0 w-full h-full rounded-xl border p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              style={{
                background: "rgba(10, 10, 12, 0.45)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderColor: isActive 
                  ? card.borderGlow 
                  : "rgba(255, 255, 255, 0.06)",
                boxShadow: isActive 
                  ? card.shadowGlow 
                  : "none"
              }}
            >
              {/* Card top bar info */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded border transition-colors ${isActive ? "border-zinc-800 bg-zinc-900/60" : "border-white/5 bg-zinc-950"} ${card.colorClass}`}>
                      {card.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none">
                        {card.level}
                      </span>
                      <h3 className={`font-display text-sm font-semibold tracking-wider mt-1 transition-colors leading-none ${isActive ? card.colorClass : "text-[#F6F5F0]"}`}>
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  
                  {isPast && (
                    <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
                
                {/* Horizontal divider */}
                <div className="w-full h-[1px] bg-zinc-800/60 mt-4" />
              </div>

              {/* Embedded Custom Generated cybersecurity graphic image */}
              <div className="w-full h-[130px] rounded-lg overflow-hidden relative border border-white/5 bg-black/40">
                <Image 
                  src={card.imgSrc} 
                  alt={card.title} 
                  fill 
                  sizes="(max-width: 340px) 100vw, 340px"
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                  priority
                />
              </div>

              {/* Technical readout params */}
              <div className="flex flex-col gap-3">
                {card.params.map((param, i) => (
                  <div key={i} className="flex justify-between items-start gap-4 text-xs font-mono select-none">
                    <span className="text-zinc-500 text-[9px] tracking-wider shrink-0 uppercase">
                      {param.label}
                    </span>
                    <span className={`text-right text-[10px] break-all leading-normal ${isActive ? "text-zinc-200" : "text-zinc-500"}`}>
                      {param.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Outer bottom index */}
              <div className="absolute bottom-4 right-4 font-mono text-[9px] text-zinc-600 font-bold select-none">
                {`[ STEP-0${card.idx + 1} ]`}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
