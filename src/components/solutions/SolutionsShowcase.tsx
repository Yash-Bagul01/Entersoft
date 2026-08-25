"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

interface SolutionItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  href: string;
  coverBg: string;
  textColor: string;
  accentColor: string;
  symbol: string;
  symbolSub: string;
}

const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: "ai-security",
    number: "001",
    title: "AI Security & Governance",
    category: "AI-Native Assurance",
    year: "2026",
    description: "LLM pipeline testing, RAG safety, agentic red-teaming, prompt injection defense, and shadow AI model discovery.",
    image: "/images/menu/solutions.png",
    href: "/platform/ai-appsec",
    coverBg: "bg-[#ccff00]",
    textColor: "text-black",
    accentColor: "#ccff00",
    symbol: "◈ AI",
    symbolSub: "NEURAL GOVERNANCE",
  },
  {
    id: "cloud-posture",
    number: "002",
    title: "Cloud Posture & Infra",
    category: "Multi-Cloud Defense",
    year: "2026",
    description: "AWS, Azure & GCP CSPM, CIEM, Kubernetes cluster hardening, container security, and IaC vulnerability prevention.",
    image: "/images/menu/services.png",
    href: "/platform/cloud-appsec",
    coverBg: "bg-[#86e3ce]",
    textColor: "text-black",
    accentColor: "#86e3ce",
    symbol: "▲ CLOUD",
    symbolSub: "INFRASTRUCTURE MESH",
  },
  {
    id: "api-security",
    number: "003",
    title: "API Security & Ecosystem",
    category: "API Risk Management",
    year: "2026",
    description: "OWASP API Top 10 automated testing, shadow endpoint discovery, BOLA validation, and real-time schema assurance.",
    image: "/images/menu/platform.png",
    href: "/platform/api-security",
    coverBg: "bg-[#1a1c4b]",
    textColor: "text-white",
    accentColor: "#96CBFF",
    symbol: "◆ API",
    symbolSub: "ENDPOINT SHIELD",
  },
  {
    id: "aspm",
    number: "004",
    title: "AppSec Posture (ASPM)",
    category: "EnProbe ASPM",
    year: "2026",
    description: "Correlate code, container, API, and cloud vulnerability telemetry into prioritized risk and automated developer tickets.",
    image: "/images/menu/solutions.png",
    href: "/platform/aspm",
    coverBg: "bg-[#05382b]",
    textColor: "text-white",
    accentColor: "#34D399",
    symbol: "⬢ ASPM",
    symbolSub: "RISK CORRELATION",
  },
  {
    id: "ctem",
    number: "005",
    title: "Continuous Exposure (CTEM)",
    category: "Attack Surface Mgmt",
    year: "2026",
    description: "External attack surface monitoring, continuous validation, threat intelligence, and risk-informed decisioning.",
    image: "/images/menu/platform.png",
    href: "/platform/attack-surface-management",
    coverBg: "bg-[#ff4081]",
    textColor: "text-white",
    accentColor: "#ff4081",
    symbol: "◉ CTEM",
    symbolSub: "RADAR DISCOVERY",
  },
  {
    id: "devsecops",
    number: "006",
    title: "DevSecOps & Supply Chain",
    category: "SBOM & License Risk",
    year: "2026",
    description: "SAST, SCA, SBOM generation, open-source dependency auditing, secrets detection, and CI/CD security gatekeeper.",
    image: "/images/menu/services.png",
    href: "/platform/sbom-license-risk",
    coverBg: "bg-[#ff9f1c]",
    textColor: "text-black",
    accentColor: "#ff9f1c",
    symbol: "◼ SUPPLY",
    symbolSub: "DEPENDENCY GATE",
  },
  {
    id: "identity-data",
    number: "007",
    title: "Data Protection & Identity",
    category: "Identity & GRC",
    year: "2026",
    description: "Zero-trust identity validation, secrets governance, privacy compliance (ISO 27001, SOC 2, DPDP) & audit evidence.",
    image: "/images/menu/solutions.png",
    href: "/platform/secrets",
    coverBg: "bg-[#1257A6]",
    textColor: "text-white",
    accentColor: "#1257A6",
    symbol: "⬣ ZERO-TRUST",
    symbolSub: "IDENTITY BOUNDARY",
  },
];

export default function SolutionsShowcase() {
  const router = useRouter();
  const totalItems = SOLUTIONS_DATA.length; // 7

  const [viewMode, setViewMode] = useState<"vertical" | "horizontal">("vertical");
  const [activeDiscreteIndex, setActiveDiscreteIndex] = useState<number>(0);

  // GSAP-animated continuous position ref
  const progressRef = useRef<{ value: number }>({ value: 0 });
  const targetIndexRef = useRef<number>(0);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wheelAccumulator = useRef<number>(0);
  const touchStartPos = useRef<number | null>(null);

  // Render hardware-accelerated transforms directly via GSAP
  const renderTransforms = useCallback(() => {
    const currVal = progressRef.current.value;

    // Discrete active index calculation (0..6)
    const rawDiscrete = ((Math.round(currVal) % totalItems) + totalItems) % totalItems;
    setActiveDiscreteIndex((prev) => (prev !== rawDiscrete ? rawDiscrete : prev));

    cardElementsRef.current.forEach((el, i) => {
      if (!el) return;

      // Shortest-path wrapped modular offset
      let rawDiff = i - currVal;
      let wrappedDiff = ((rawDiff + totalItems / 2) % totalItems + totalItems) % totalItems - totalItems / 2;
      const d = Math.abs(wrappedDiff);

      // Render cards within visible viewport radius
      if (d > 3.0) {
        el.style.display = "none";
        return;
      }
      el.style.display = "block";

      // Produx dynamic distance scaling & opacity formulas
      const scale = Math.max(0.68, 1.0 - d * 0.14);
      const opacity = Math.max(0.3, 1.0 - d * 0.35);
      const zIndex = Math.round(30 - d * 2);

      if (viewMode === "vertical") {
        const yPos = wrappedDiff * 215;
        el.style.transform = `translate3d(0, ${yPos}px, 0) scale(${scale})`;
      } else {
        const xPos = wrappedDiff * 340;
        el.style.transform = `translate3d(${xPos}px, 0, 0) scale(${scale})`;
      }

      el.style.opacity = `${opacity}`;
      el.style.zIndex = `${zIndex}`;
    });
  }, [totalItems, viewMode]);

  // Smooth weighted GSAP spring tween to target index (1.1s duration for silky smooth pace)
  const animateToTarget = useCallback(
    (newTarget: number) => {
      targetIndexRef.current = newTarget;
      gsap.to(progressRef.current, {
        value: newTarget,
        duration: 1.1,
        ease: "power3.out",
        overwrite: "auto",
        onUpdate: renderTransforms,
      });
    },
    [renderTransforms]
  );

  // Initial render setup
  useEffect(() => {
    renderTransforms();
  }, [viewMode, renderTransforms]);

  // Controlled Mouse Wheel Handler
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const rawDelta = viewMode === "vertical" ? e.deltaY : e.deltaY || e.deltaX;
      const clampedDelta = Math.min(Math.max(rawDelta, -100), 100);
      wheelAccumulator.current += clampedDelta;

      const threshold = 160; // 160px wheel delta per card step
      if (Math.abs(wheelAccumulator.current) >= threshold) {
        const step = wheelAccumulator.current > 0 ? 1 : -1;
        const newTarget = targetIndexRef.current + step;
        wheelAccumulator.current = 0;
        animateToTarget(newTarget);
      }
    },
    [viewMode, animateToTarget]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Touch drag gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = viewMode === "vertical" ? e.touches[0].clientY : e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartPos.current === null) return;
    const currentPos = viewMode === "vertical" ? e.touches[0].clientY : e.touches[0].clientX;
    const diff = touchStartPos.current - currentPos;

    if (Math.abs(diff) > 35) {
      const step = diff > 0 ? 1 : -1;
      const newTarget = targetIndexRef.current + step;
      touchStartPos.current = currentPos;
      animateToTarget(newTarget);
    }
  };

  const handleTouchEnd = () => {
    touchStartPos.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        animateToTarget(targetIndexRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        animateToTarget(targetIndexRef.current - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [animateToTarget]);

  // Card click handler
  const handleCardClick = (index: number, href: string) => {
    if (index === activeDiscreteIndex) {
      router.push(href);
    } else {
      let stepDiff = index - activeDiscreteIndex;
      if (stepDiff > totalItems / 2) stepDiff -= totalItems;
      if (stepDiff < -totalItems / 2) stepDiff += totalItems;
      animateToTarget(targetIndexRef.current + stepDiff);
    }
  };

  const activeItem = SOLUTIONS_DATA[activeDiscreteIndex];

  return (
    <div className="relative w-full h-screen bg-[#0b0b0d] text-white flex flex-col justify-between overflow-hidden select-none isolate font-sans">
      {/* Header Navbar */}
      <Navbar />

      {/* Main Showcase Stage */}
      <div
        className="relative flex-1 w-full h-full flex items-center justify-center pt-20 pb-12 px-6 md:px-16 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          {viewMode === "vertical" ? (
            /* ============================================================ */
            /* VERTICAL MODE (Exact produx infinite stream 001 -> 007 -> 001)*/
            /* ============================================================ */
            <motion.div
              key="vertical-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[1440px] mx-auto h-full grid grid-cols-1 lg:grid-cols-12 items-center"
            >
              {/* Left Side: Monospace Number + Title */}
              <div className="lg:col-span-4 flex items-baseline gap-5 z-20 pointer-events-none pr-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id + "-left"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-baseline gap-5"
                  >
                    <span className="font-mono text-xs text-neutral-400 tracking-wider shrink-0 select-none">
                      {activeItem.number}
                    </span>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white tracking-tight leading-snug">
                      {activeItem.title}
                    </h1>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Center Column: 7 Cards Track */}
              <div className="lg:col-span-4 flex items-center justify-center relative h-full min-h-[460px] z-10 overflow-visible">
                <div className="relative w-full h-full flex items-center justify-center">
                  {SOLUTIONS_DATA.map((item, i) => (
                    <div
                      key={item.id}
                      ref={(el) => {
                        cardElementsRef.current[i] = el;
                      }}
                      onClick={() => handleCardClick(i, item.href)}
                      className="absolute overflow-hidden cursor-pointer rounded-none border border-white/10 shadow-2xl transition-all duration-300 w-[90%] sm:w-[420px] aspect-[16/9.5] group"
                    >
                      {/* Default Cover Visual: Vibrant Color + Emblem Symbol */}
                      <div className={`relative w-full h-full ${item.coverBg} flex flex-col justify-between p-7 overflow-hidden`}>
                        {/* Hover Image Reveal Overlay */}
                        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-black/40" />
                        </div>

                        {/* Top Row: Symbol Icon & Number */}
                        <div className={`relative z-20 flex items-center justify-between font-mono text-xs font-bold tracking-widest ${item.textColor} group-hover:text-white transition-colors duration-300`}>
                          <span className="uppercase text-sm tracking-wider">{item.symbol}</span>
                          <span>{item.number}</span>
                        </div>

                        {/* Center Graphic Emblem Symbol */}
                        <div className={`relative z-20 flex flex-col items-center justify-center my-auto py-2 ${item.textColor} group-hover:text-white transition-colors duration-300`}>
                          <span className="font-mono text-4xl sm:text-5xl font-black tracking-widest leading-none drop-shadow-sm">
                            {item.symbol.split(" ")[0]}
                          </span>
                          <span className="font-mono text-[9px] font-bold tracking-[0.25em] uppercase opacity-75 mt-2">
                            {item.symbolSub}
                          </span>
                        </div>

                        {/* Bottom Row: Category Badge & Card Title */}
                        <div className="relative z-20 flex flex-col items-start gap-1">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/25 backdrop-blur-md ${item.textColor} group-hover:text-white group-hover:bg-white/20 transition-all duration-300`}>
                            {item.category}
                          </span>
                          <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${item.textColor} group-hover:text-white transition-colors duration-300`}>
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Monospace "Full case" & Year */}
              <div className="lg:col-span-4 flex justify-end z-20 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id + "-right"}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-10 font-mono text-xs text-neutral-400 tracking-widest uppercase select-none"
                  >
                    <span>Full case</span>
                    <span className="text-neutral-300 font-bold">{activeItem.year}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* ============================================================ */
            /* HORIZONTAL MODE (Exact produx infinite stream 001 -> 007 -> 001)*/
            /* ============================================================ */
            <motion.div
              key="horizontal-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[1440px] mx-auto h-full flex flex-col justify-between py-2"
            >
              {/* Top Left: Title + Monospace Number directly above active card */}
              <div className="w-full flex items-baseline gap-6 pb-2 z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id + "-h-top"}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-baseline gap-6"
                  >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
                      {activeItem.title}
                    </h1>
                    <span className="font-mono text-xs text-neutral-400 tracking-widest">
                      {activeItem.number}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Center Horizontal Continuous Filmstrip Track */}
              <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden py-4">
                <div className="relative w-full h-full flex items-center justify-center">
                  {SOLUTIONS_DATA.map((item, i) => (
                    <div
                      key={item.id}
                      ref={(el) => {
                        cardElementsRef.current[i] = el;
                      }}
                      onClick={() => handleCardClick(i, item.href)}
                      className="absolute overflow-hidden cursor-pointer rounded-none border border-white/10 shadow-2xl transition-all duration-300 w-[420px] h-[270px] sm:h-[300px] group"
                    >
                      <div className={`relative w-full h-full ${item.coverBg} flex flex-col justify-between p-7 overflow-hidden`}>
                        {/* Hover Image Reveal Overlay */}
                        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-black/40" />
                        </div>

                        <div className={`relative z-20 flex items-center justify-between font-mono text-xs font-bold tracking-widest ${item.textColor} group-hover:text-white transition-colors duration-300`}>
                          <span className="uppercase text-sm tracking-wider">{item.symbol}</span>
                          <span>{item.number}</span>
                        </div>

                        <div className={`relative z-20 flex flex-col items-center justify-center my-auto py-2 ${item.textColor} group-hover:text-white transition-colors duration-300`}>
                          <span className="font-mono text-4xl font-black tracking-widest leading-none drop-shadow-sm">
                            {item.symbol.split(" ")[0]}
                          </span>
                          <span className="font-mono text-[9px] font-bold tracking-[0.25em] uppercase opacity-75 mt-2">
                            {item.symbolSub}
                          </span>
                        </div>

                        <div className="relative z-20 flex flex-col items-start gap-1">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/25 backdrop-blur-md ${item.textColor} group-hover:text-white group-hover:bg-white/20 transition-all duration-300`}>
                            {item.category}
                          </span>
                          <h3 className={`font-display text-lg sm:text-xl font-bold tracking-tight ${item.textColor} group-hover:text-white transition-colors duration-300`}>
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Left: Monospace "Full case" & Year */}
              <div className="w-full flex items-center justify-between pt-2 z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id + "-h-bot"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-10 font-mono text-xs text-neutral-400 tracking-widest uppercase select-none"
                  >
                    <span>Full case</span>
                    <span className="text-neutral-300 font-bold">{activeItem.year}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Bottom Right View Mode Toggle: VERTICAL | HORIZONTAL */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 bg-[#0d0d10]/90 border border-white/10 backdrop-blur-xl px-5 py-2 rounded-full shadow-2xl font-mono text-xs tracking-widest uppercase select-none">
        <button
          onClick={() => setViewMode("vertical")}
          className={`cursor-pointer transition-all duration-300 ${
            viewMode === "vertical"
              ? "text-[#ccff00] font-bold border-b-2 border-[#ccff00] pb-0.5"
              : "text-neutral-500 hover:text-white"
          }`}
        >
          VERTICAL
        </button>
        <span className="text-neutral-700">|</span>
        <button
          onClick={() => setViewMode("horizontal")}
          className={`cursor-pointer transition-all duration-300 ${
            viewMode === "horizontal"
              ? "text-[#ccff00] font-bold border-b-2 border-[#ccff00] pb-0.5"
              : "text-neutral-500 hover:text-white"
          }`}
        >
          HORIZONTAL
        </button>
      </div>
    </div>
  );
}
