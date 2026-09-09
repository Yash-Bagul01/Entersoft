"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SOLUTION_CASE_BY_HREF } from "@/data/solutionCases";
import { useOptionalSolutionTransition } from "@/components/solutions/SolutionTransitionContext";

interface SolutionItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  heroImage: string;
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
    heroImage: SOLUTION_CASE_BY_HREF["/platform/ai-appsec"].hero.src,
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
    heroImage: SOLUTION_CASE_BY_HREF["/platform/cloud-appsec"].hero.src,
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
    heroImage: SOLUTION_CASE_BY_HREF["/platform/api-security"].hero.src,
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
    heroImage: SOLUTION_CASE_BY_HREF["/platform/aspm"].hero.src,
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
    heroImage: SOLUTION_CASE_BY_HREF["/platform/attack-surface-management"].hero.src,
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
    heroImage: SOLUTION_CASE_BY_HREF["/platform/sbom-license-risk"].hero.src,
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
    heroImage: SOLUTION_CASE_BY_HREF["/platform/secrets"].hero.src,
    href: "/platform/secrets",
    coverBg: "bg-[#1257A6]",
    textColor: "text-white",
    accentColor: "#1257A6",
    symbol: "⬣ ZERO-TRUST",
    symbolSub: "IDENTITY BOUNDARY",
  },
];

/* Reel geometry */
const SPACING_Y = 190; // vertical stack pitch
const SPACING_X = 310; // horizontal filmstrip pitch

/* Intro choreography: fanned deck -> wide arc sweep -> reel */
const DECK_ENTER_X = 240;
const DECK_ENTER_Y = 54;
const DECK_STEP = 9; // per-card offset inside the stacked deck
const ARC_SPREAD = 470; // half-width of the arc sweep
const ARC_DEPTH = 128; // how far the middle of the arc dips
const ARC_ROT = 15; // tangential tilt at the ends of the arc
const ARC_STAGGER = 0.38; // cascade across cards while fanning/collapsing
const AXIS_STAGGER = 0.26; // cascade while shifting vertical <-> horizontal
const AXIS_ROT = 7; // mid-flight tilt during the axis shift

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function SolutionCard({
  item,
  onClick,
  cardRef,
  isPov,
}: {
  item: SolutionItem;
  onClick: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
  isPov: boolean;
}) {
  return (
    <div
      ref={cardRef}
      onClick={onClick}
      // Hidden until the reel takes over, so the pre-hydration paint never
      // shows the cards piled up at the centre of the stage.
      style={{ opacity: 0 }}
      className={`absolute overflow-hidden cursor-pointer rounded-none border border-white/10 shadow-2xl w-[320px] sm:w-[360px] aspect-[16/10] will-change-transform pointer-events-auto ${isPov ? "group" : ""}`}
    >
      {/* Default Cover Visual: Vibrant Color + Emblem Symbol ONLY */}
      <div className={`relative w-full h-full ${item.coverBg} flex flex-col items-center justify-center p-6 overflow-hidden`}>

        {/* Hover Detail Overlay — POV card only (group class is gated above) */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out p-6 flex flex-col justify-between bg-black/85 backdrop-blur-md">
          <Image
            src={item.heroImage}
            alt={item.title}
            fill
            sizes="360px"
            unoptimized
            className="object-cover opacity-25 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="relative z-10 flex items-center justify-between font-mono text-[11px] font-bold text-white/70">
            <span className="uppercase tracking-wider">{item.symbol}</span>
            <span>{item.number}</span>
          </div>
          <div className="relative z-10 flex flex-col gap-1.5 text-left my-auto">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 text-white w-fit">
              {item.category}
            </span>
            <h3 className="font-display text-lg font-bold text-white tracking-tight leading-snug">
              {item.title}
            </h3>
            <p className="text-[11px] font-sans text-neutral-300 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <span>Explore Solution →</span>
            <span>{item.year}</span>
          </div>
        </div>

        {/* Clean Default Face: Centered Graphic Emblem ONLY */}
        <div className={`relative z-10 flex flex-col items-center justify-center my-auto ${item.textColor} group-hover:scale-110 transition-transform duration-500`}>
          <span className="font-mono text-5xl sm:text-6xl font-black tracking-widest leading-none drop-shadow-md">
            {item.symbol.split(" ")[0]}
          </span>
          <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase opacity-85 mt-2.5">
            {item.symbolSub}
          </span>
        </div>

      </div>
    </div>
  );
}

export default function SolutionsShowcase() {
  const router = useRouter();
  const isReduced = useReducedMotion();
  const transition = useOptionalSolutionTransition();
  const totalItems = SOLUTIONS_DATA.length; // 7

  const [viewMode, setViewMode] = useState<"vertical" | "horizontal">("vertical");
  const [activeDiscreteIndex, setActiveDiscreteIndex] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  // Animation values for smooth momentum scrolling, intro deal and axis shift
  const progressVal = useRef<number>(0);
  const targetProgress = useRef<number>(0);
  const loadProgress = useRef<{ value: number }>({ value: 0 }); // deck -> arc -> reel
  const axisProgress = useRef<{ value: number }>({ value: 0 }); // 0 vertical, 1 horizontal
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartPos = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);
  const snapTimer = useRef<NodeJS.Timeout | null>(null);

  // Continuous render transforms for cards reel (Produx design card reel layout)
  const renderTransforms = useCallback(() => {
    const currVal = progressVal.current;
    const load = loadProgress.current.value;
    const axis = axisProgress.current.value;

    // Active card index calculation (0..6)
    const rawDiscrete = ((Math.round(currVal) % totalItems) + totalItems) % totalItems;
    setActiveDiscreteIndex((prev) => (prev !== rawDiscrete ? rawDiscrete : prev));

    // Intro phases overlap slightly so the deck is already opening as it lands
    const tDeck = clamp01(load / 0.3);
    const tArc = clamp01((load - 0.26) / 0.4);
    const tReel = clamp01((load - 0.66) / 0.34);
    const deckEase = easeOutCubic(tDeck);

    cardElementsRef.current.forEach((el, i) => {
      if (!el) return;

      // Shortest-path wrapped modular offset for infinite carousel loop
      const rawDiff = i - currVal;
      const wrappedDiff = ((rawDiff + totalItems / 2) % totalItems + totalItems) % totalItems - totalItems / 2;
      const d = Math.abs(wrappedDiff);

      // Left-to-right rank of the card in the reel, used to cascade every
      // multi-card move so the group reads as a staircase in flight.
      const rank = (wrappedDiff + totalItems / 2) / totalItems;

      // ---- Resting reel position: vertical <-> horizontal morph ----
      const axisLocal = clamp01(axis * (1 + AXIS_STAGGER) - rank * AXIS_STAGGER);
      const axisEase = easeInOutCubic(axisLocal);

      const reelX = wrappedDiff * SPACING_X * axisEase;
      const reelY = wrappedDiff * SPACING_Y * (1 - axisEase);
      const reelRot = Math.sin(axisEase * Math.PI) * (wrappedDiff < 0 ? -AXIS_ROT : AXIS_ROT);
      const reelScale = Math.max(0.65, 1.0 - d * 0.12);
      const reelOpacity = Math.max(0.25, 1.0 - d * 0.3);
      const reelZ = 50 - d * 5;

      let x = reelX;
      let y = reelY;
      let rot = reelRot;
      let scale = reelScale;
      let opacity = reelOpacity;
      let z = reelZ;

      if (load < 1) {
        const arcEase = easeInOutCubic(clamp01(tArc * (1 + ARC_STAGGER) - rank * ARC_STAGGER));
        const collapse = easeInOutCubic(clamp01(tReel * (1 + ARC_STAGGER) - rank * ARC_STAGGER));

        // Fanned deck drifting in from the right, back cards peeking out
        const deckX = lerp(DECK_ENTER_X, 0, deckEase) - i * DECK_STEP;
        const deckY = lerp(DECK_ENTER_Y, 0, deckEase) - i * DECK_STEP;
        const deckScale = lerp(0.72, 0.86, deckEase);

        // Wide arc sweep: cards spread across a shallow valley, tilting with it
        const u = (i - (totalItems - 1) / 2) / ((totalItems - 1) / 2); // -1..1
        const arcX = u * ARC_SPREAD;
        const arcY = ARC_DEPTH * (1 - u * u);
        const arcRot = u * ARC_ROT;

        x = lerp(lerp(deckX, arcX, arcEase), reelX, collapse);
        y = lerp(lerp(deckY, arcY, arcEase), reelY, collapse);
        rot = lerp(lerp(0, arcRot, arcEase), reelRot, collapse);
        scale = lerp(lerp(deckScale, 0.94, arcEase), reelScale, collapse);
        opacity = lerp(lerp(deckEase, 1, arcEase), reelOpacity, collapse);
        z = lerp(50 - i, reelZ, collapse);
      }

      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      el.style.opacity = opacity.toFixed(3);
      el.style.zIndex = `${Math.round(z)}`;
    });
  }, [totalItems]);

  // Main 60fps RAF lerp loop for buttery-smooth momentum scroll
  useEffect(() => {
    let active = true;

    const loop = () => {
      if (!active) return;

      // Smooth lerp (0.09 factor) for silky inertial motion
      const diff = targetProgress.current - progressVal.current;
      progressVal.current += diff * 0.09;
      renderTransforms();

      rafId.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      active = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [renderTransforms]);

  // Initial load: deal the deck in slowly, fan across arc, collapse into reel, then show details
  useEffect(() => {
    gsap.killTweensOf(loadProgress.current);

    if (isReduced) {
      loadProgress.current.value = 1;
      setShowDetails(true);
      renderTransforms();
      return;
    }

    loadProgress.current.value = 0;
    setShowDetails(false);
    renderTransforms();

    const tween = gsap.to(loadProgress.current, {
      value: 1,
      duration: 3.6,
      ease: "power1.out",
      delay: 0.15,
      onUpdate: () => {
        if (loadProgress.current.value >= 0.82) {
          setShowDetails(true);
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [isReduced, renderTransforms]);

  // Vertical <-> horizontal: one continuous axis shift, no crossfade
  useEffect(() => {
    const target = viewMode === "horizontal" ? 1 : 0;

    if (isReduced) {
      axisProgress.current.value = target;
      renderTransforms();
      return;
    }

    // Linear driver: the per-card cascade and its own ease shape the motion,
    // so an eased driver here would stall the first third of the shift.
    const tween = gsap.to(axisProgress.current, {
      value: target,
      duration: 1.15,
      ease: "none",
    });
    return () => {
      tween.kill();
    };
  }, [viewMode, isReduced, renderTransforms]);

  // Snap to nearest integer card after scroll stops
  const scheduleSnap = useCallback(() => {
    if (snapTimer.current) clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => {
      const nearest = Math.round(targetProgress.current);
      gsap.to(targetProgress, {
        current: nearest,
        duration: 0.6,
        ease: "power2.out",
      });
    }, 250);
  }, []);

  // Smooth Wheel Delta Handler
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const rawDelta = viewMode === "vertical" ? e.deltaY : e.deltaY || e.deltaX;
      // Fluid continuous scroll sensitivity factor
      const sensitivity = 0.0018;
      targetProgress.current += rawDelta * sensitivity;
      scheduleSnap();
    },
    [viewMode, scheduleSnap]
  );

  useEffect(() => {
    const stageContainer = document.getElementById("solutions-stage");
    if (stageContainer) {
      stageContainer.addEventListener("wheel", handleWheel, { passive: false });
      return () => stageContainer.removeEventListener("wheel", handleWheel);
    }
    window.addEventListener("wheel", handleWheel, { passive: false });
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

    targetProgress.current += diff * 0.004;
    touchStartPos.current = currentPos;
    scheduleSnap();
  };

  const handleTouchEnd = () => {
    touchStartPos.current = null;
    scheduleSnap();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        targetProgress.current = Math.round(targetProgress.current) + 1;
        scheduleSnap();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        targetProgress.current = Math.round(targetProgress.current) - 1;
        scheduleSnap();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scheduleSnap]);

  // Card click handler
  const handleCardClick = (index: number, href: string) => {
    if (index === activeDiscreteIndex) {
      const el = cardElementsRef.current[index];
      const item = SOLUTIONS_DATA[index];
      if (el && transition && item?.heroImage && !isReduced) {
        transition.startFromCard(el, {
          href,
          image: item.heroImage,
          title: item.title,
        });
        return;
      }
      router.push(href);
    } else {
      let stepDiff = index - activeDiscreteIndex;
      if (stepDiff > totalItems / 2) stepDiff -= totalItems;
      if (stepDiff < -totalItems / 2) stepDiff += totalItems;
      targetProgress.current += stepDiff;
      scheduleSnap();
    }
  };

  useEffect(() => {
    SOLUTIONS_DATA.forEach((item) => {
      router.prefetch(item.href);
    });
  }, [router]);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", "dark");
    html.classList.remove("light");
    html.classList.add("dark");
    return () => {
      html.removeAttribute("data-theme");
    };
  }, []);

  const activeItem = SOLUTIONS_DATA[activeDiscreteIndex];

  return (
    <div className="dark-panel relative w-full h-screen bg-[#0b0b0d] text-white flex flex-col justify-between overflow-hidden select-none isolate font-sans">
      {/* Header Navbar */}
      <Navbar />

      {/* Main Showcase Stage */}
      <div
        id="solutions-stage"
        className="relative flex-1 w-full h-full flex items-center justify-center pt-20 pb-12 px-6 md:px-16 overflow-hidden touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          {viewMode === "vertical" ? (
            /* ============================================================ */
            /* VERTICAL MODE (Exact Produx Design infinite card reel)      */
            /* ============================================================ */
            <motion.div
              key="vertical-mode"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[1440px] mx-auto h-full grid grid-cols-1 lg:grid-cols-12 items-center"
            >
              {/* Left Side: Monospace Number + Title (Fades in AFTER card deal animation finishes) */}
              <div className="lg:col-span-4 flex items-baseline gap-5 z-20 pointer-events-none pr-4">
                <AnimatePresence mode="wait">
                  {showDetails && (
                    <motion.div
                      key={activeItem.id + "-left"}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-baseline gap-5"
                    >
                      <span className="font-mono text-xs text-neutral-400 tracking-wider shrink-0 select-none">
                        {activeItem.number}
                      </span>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white tracking-tight leading-snug">
                        {activeItem.title}
                      </h1>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Center Column: space reserved for the persistent card reel */}
              <div className="lg:col-span-4 relative h-full min-h-[440px]" aria-hidden="true" />

              {/* Right Side: Monospace "Full case" & Year (Fades in AFTER card deal animation finishes) */}
              <div className="lg:col-span-4 flex justify-end z-20 pointer-events-none">
                <AnimatePresence mode="wait">
                  {showDetails && (
                    <motion.div
                      key={activeItem.id + "-right"}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                      className="flex items-center gap-10 font-mono text-xs text-neutral-400 tracking-widest uppercase select-none"
                    >
                      <span>Full case</span>
                      <span className="text-neutral-300 font-bold">{activeItem.year}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* ============================================================ */
            /* HORIZONTAL MODE (Exact Produx Design horizontal stream)     */
            /* ============================================================ */
            <motion.div
              key="horizontal-mode"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[1440px] mx-auto h-full flex flex-col justify-between pt-14 pb-4"
            >
              {/* Title + Monospace Number positioned closer to horizontal card row */}
              <div className="w-full flex items-baseline justify-center gap-4 pt-6 pb-2 z-20 pointer-events-none">
                <AnimatePresence mode="wait">
                  {showDetails && (
                    <motion.div
                      key={activeItem.id + "-h-top"}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-baseline gap-4 text-center"
                    >
                      <span className="font-mono text-xs text-cyan-400 font-bold tracking-widest">
                        {activeItem.number}
                      </span>
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
                        {activeItem.title}
                      </h1>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Center Horizontal Track: space reserved for the persistent card reel */}
              <div className="flex-1 w-full relative py-4" aria-hidden="true" />

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

        {/* ============================================================ */
        /* Persistent Card Reel: never unmounts, so cards physically     */
        /* travel between the vertical stack and the horizontal strip    */
        /* ============================================================ */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pt-20 pb-12 px-6 md:px-16 pointer-events-none">
          <div className="relative w-full max-w-[1440px] h-full flex items-center justify-center">
            {SOLUTIONS_DATA.map((item, i) => (
              <SolutionCard
                key={item.id}
                item={item}
                isPov={i === activeDiscreteIndex}
                cardRef={(el) => {
                  cardElementsRef.current[i] = el;
                }}
                onClick={() => handleCardClick(i, item.href)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Bottom Right View Mode Toggle: VERTICAL | HORIZONTAL */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 bg-[#0d0d10]/90 border border-white/10 backdrop-blur-xl px-5 py-2 rounded-full shadow-2xl font-mono text-xs tracking-widest uppercase select-none">
        <button
          onClick={() => setViewMode("vertical")}
          className={`cursor-pointer transition-all duration-300 ${
            viewMode === "vertical"
              ? "text-[#8EBEFF] font-bold border-b-2 border-[#8EBEFF] pb-0.5"
              : "text-[#6F8FB3] hover:text-[#C5DCFF]"
          }`}
        >
          VERTICAL
        </button>
        <span className="text-[#3D5570]">|</span>
        <button
          onClick={() => setViewMode("horizontal")}
          className={`cursor-pointer transition-all duration-300 ${
            viewMode === "horizontal"
              ? "text-[#8EBEFF] font-bold border-b-2 border-[#8EBEFF] pb-0.5"
              : "text-[#6F8FB3] hover:text-[#C5DCFF]"
          }`}
        >
          HORIZONTAL
        </button>
      </div>
    </div>
  );
}

