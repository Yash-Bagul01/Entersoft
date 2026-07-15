"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

type FuzzState = "idle" | "compiling" | "fuzzing" | "failed-path" | "retesting" | "secured";

interface CanvasNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  size: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

function FuzzingCanvas({ state }: { state: FuzzState }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.clientWidth;
    let height = canvas.height = canvas.clientHeight;

    // Generate floating network nodes
    const nodeCount = 38;
    const nodes: CanvasNode[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        baseSize: Math.random() * 2 + 1.5,
        size: 0,
        color: "rgba(110, 110, 110, 0.2)",
        pulseSpeed: Math.random() * 0.1 + 0.05,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    let animationId: number;

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      // 1. Update nodes based on state
      nodes.forEach((node, idx) => {
        node.pulsePhase += node.pulseSpeed;

        if (state === "idle" || state === "compiling") {
          node.x += node.vx * 0.4;
          node.y += node.vy * 0.4;
          node.color = "rgba(110, 110, 110, 0.2)";
          node.size = node.baseSize;
        } else if (state === "fuzzing") {
          node.x += node.vx * 1.4 + (Math.random() - 0.5) * 0.5;
          node.y += node.vy * 1.4 + (Math.random() - 0.5) * 0.5;
          
          const glow = Math.sin(node.pulsePhase) * 0.35 + 0.65;
          node.color = idx % 2 === 0 
            ? `rgba(229, 255, 93, ${glow * 0.8})` // Citrine
            : `rgba(249, 249, 249, ${glow * 0.6})`; // Bone White
          node.size = node.baseSize * (Math.sin(node.pulsePhase * 2) * 0.25 + 1.15);
        } else if (state === "failed-path") {
          if (idx === 15) {
            node.color = `rgba(239, 68, 68, ${Math.sin(node.pulsePhase * 3.5) * 0.45 + 0.55})`;
            node.size = node.baseSize * 3.5;
            node.x += (Math.random() - 0.5) * 1.1;
            node.y += (Math.random() - 0.5) * 1.1;
          } else {
            node.color = "rgba(86, 86, 86, 0.15)";
            node.size = node.baseSize * 0.75;
          }
        } else if (state === "retesting") {
          node.x += node.vx * 1.6 + (Math.random() - 0.5) * 0.8;
          node.y += node.vy * 1.6 + (Math.random() - 0.5) * 0.8;
          
          const glow = Math.sin(node.pulsePhase) * 0.3 + 0.7;
          node.color = `rgba(229, 255, 93, ${glow * 0.55})`; // Citrine
          node.size = node.baseSize * (Math.sin(node.pulsePhase * 1.5) * 0.2 + 1.05);
        } else if (state === "secured") {
          node.x += node.vx * 0.35;
          node.y += node.vy * 0.35;
          
          const glow = Math.sin(node.pulsePhase * 0.5) * 0.2 + 0.8;
          node.color = `rgba(229, 255, 93, ${glow * 0.85})`; // Citrine
          node.size = node.baseSize * 1.2;
        }

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;
      });

      // 2. Draw connections
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const opacity = (1 - dist / 100) * 0.22;
            
            if (state === "failed-path") {
              if (i === 15 || j === 15) {
                ctx.strokeStyle = `rgba(239, 68, 68, ${opacity * 1.8})`;
                ctx.lineWidth = 1.4;
              } else {
                ctx.strokeStyle = `rgba(86, 86, 86, ${opacity * 0.2})`;
                ctx.lineWidth = 0.5;
              }
            } else if (state === "fuzzing") {
              ctx.strokeStyle = `rgba(229, 255, 93, ${opacity * 0.8})`;
            } else if (state === "retesting") {
              ctx.strokeStyle = `rgba(229, 255, 93, ${opacity * 0.6})`;
            } else if (state === "secured") {
              ctx.strokeStyle = `rgba(229, 255, 93, ${opacity * 0.9})`;
            } else {
              ctx.strokeStyle = `rgba(86, 86, 86, ${opacity * 0.6})`;
            }

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw nodes
      nodes.forEach((node) => {
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        if (state === "fuzzing" || state === "secured" || state === "retesting") {
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 0.45;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 2.0, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    };

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [state]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-transparent pointer-events-none opacity-40 z-0" />;
}

export default function FuzzingSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  const [state, setState] = useState<FuzzState>("idle");
  const [runs, setRuns] = useState(0);
  const [coverage, setCoverage] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [currentTest, setCurrentTest] = useState("");

  useEffect(() => {
    if (!isInView) {
      setState("idle");
      setRuns(0);
      setCoverage(0);
      setLogs([]);
      return;
    }

    let active = true;
    const runSimulation = async () => {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      while (active) {
        // 1. Compiling
        setState("compiling");
        setCurrentTest("compiling source files...");
        setLogs([
          "Initializing core contract compiler.",
          "Target framework matches solc 0.8.24 configuration.",
          "Building abstract syntax trees for 14 system files.",
          "Generating bytecode and mapping function entry points."
        ]);
        await delay(1600);

        if (!active) return;
        // 2. Fuzzing
        setState("fuzzing");
        setLogs(prev => [...prev, "Launching fuzz engine. Generating randomized mutation matrix..."]);
        await delay(800);

        let currentRuns = 0;
        let currentCoverage = 20;
        
        const fuzzingSteps = [
          "Verifying solvency invariant condition.",
          "Probing strategic liquidity allocation ratios.",
          "Validating signature validation logic constraints.",
          "Checking deposit parameter boundaries under load."
        ];

        for (let i = 0; i < 4; i++) {
          if (!active) return;
          setCurrentTest(fuzzingSteps[i]);
          setLogs(prev => [
            ...prev,
            `Probing: ${fuzzingSteps[i]}`,
            `Mutating entry parameters with symbolic inputs...`
          ]);

          const targetRuns = (i + 1) * 12500;
          while (currentRuns < targetRuns && active) {
            currentRuns += Math.floor(Math.random() * 900) + 300;
            if (currentRuns > targetRuns) currentRuns = targetRuns;
            setRuns(currentRuns);

            currentCoverage += Math.random() * 0.95;
            if (currentCoverage > 95.8) currentCoverage = 95.8;
            setCoverage(Number(currentCoverage.toFixed(1)));
            await delay(40);
          }
          await delay(500);
        }

        if (!active) return;
        // 3. Finding Failed Path
        setState("failed-path");
        setLogs(prev => [
          ...prev,
          "Invariant condition check failed.",
          "  Target: YieldStrategyVault.sol",
          "  Condition: shares_balance >= calculated_deposit",
          "  State trigger: deposit_amount exceeds calculated capacity threshold",
          "  Vulnerability signature: Precision rounding loss detected."
        ]);
        await delay(2800);

        if (!active) return;
        // 4. Hotfix Retesting
        setState("retesting");
        setCurrentTest("applying verification hotfix...");
        setLogs(prev => [
          ...prev,
          "Injecting boundary verification check on share ratio arithmetic.",
          "Initiating verification run sequence (50,000 runs scheduled)..."
        ]);

        let retestRuns = 0;
        while (retestRuns < 50000 && active) {
          retestRuns += Math.floor(Math.random() * 2500) + 600;
          if (retestRuns > 50000) retestRuns = 50000;
          setRuns(retestRuns);
          await delay(20);
        }
        await delay(600);

        if (!active) return;
        // 5. Secured & Passed
        setState("secured");
        setCurrentTest("verification complete.");
        setLogs(prev => [
          ...prev,
          "All invariant boundary conditions hold.",
          "Strategic verification checks complete. Integrity secured.",
          "-------------------------------------------------------"
        ]);
        await delay(4500);
      }
    };

    runSimulation();

    return () => {
      active = false;
    };
  }, [isInView]);

  return (
    <section 
      ref={containerRef}
      id="fuzzing-simulator-section"
      className="relative w-full bg-[#111111] text-[#f9f9f9] px-6 md:px-12 py-24 md:py-32 overflow-hidden border-b border-[#565656]/30"
    >
      {/* Symmetrical vertical gridline accent */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-[#2b2b2b]" />
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-[#2b2b2b]" />
      </div>

      <FuzzingCanvas state={state} />

      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 relative">
        
        {/* Left Column: Context & explanation */}
        <div className="lg:col-span-5 flex flex-col items-start gap-6 text-left">
          <span className="font-mono text-xs font-bold text-[#e5ff5d] tracking-[0.22em]">02 / COMPREHENSIVE TESTING</span>
          <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-none text-[#f9f9f9]">
            Fuzzing & Symbolic Execution
          </h2>
          <div className="w-16 h-[1px] bg-[#565656]/50" />
          
          <p className="font-sans text-sm text-[#9c9c9c] leading-relaxed max-w-[450px]">
            We deploy property-based fuzzing and static symbolic checkers to execute millions of contract states. We verify economic boundaries, liquidity ratios, and access paths to ensure your protocol stands up to flash loan manipulation and systemic edge-case exploits.
          </p>

          <div className="flex flex-col gap-2 font-mono text-[10px] text-[#9c9c9c] tracking-wider uppercase">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5ff5d]" />
              <span>State Space Exploration: 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5ff5d]" />
              <span>Boundary Check Coverage: 98%+</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5ff5d]" />
              <span>Exploit Proofs: Fully Verified</span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Masked Security Graph Image */}
        <div className="lg:col-span-7 w-full h-[420px] relative rounded-[4px] border border-[#565656]/20 overflow-hidden select-none z-10 group">
          {/* Abstract Cybersecurity/Verification Node visualization */}
          <Image 
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80" 
            alt="Cybersecurity Symbolic Execution Invariants Network"
            fill
            sizes="(max-w-lg) 100vw, 700px"
            className="object-cover opacity-25 transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Symmetrical grid overlay inside the image card */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(229,255,93,0.012)_1px,transparent_1px)] bg-[size:100%_5px] pointer-events-none z-10" />

          {/* Premium Gradient Masks to merge it seamlessly with page canvas and left column texts */}
          <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#111111] via-[#111111]/75 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#111111] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-[#111111] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

          {/* Subtle live laser sweep indicator overlay */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-[#e5ff5d]/20 shadow-[0_0_12px_rgba(229,255,93,0.15)] z-20 pointer-events-none"
          />

          {/* Minimal Status overlays */}
          <div className="absolute right-6 top-6 z-20 font-mono text-[8px] text-[#6e6e6e] flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#e5ff5d] animate-pulse" />
            <span className="tracking-widest uppercase">ACTIVE INVARIANT RUNNER</span>
          </div>

          <div className="absolute left-6 bottom-6 z-20 font-mono text-[8px] text-[#9c9c9c] flex flex-col gap-1 text-left">
            <span className="text-[#e5ff5d] font-bold tracking-widest uppercase">STATE // {state.toUpperCase()}</span>
            <span className="uppercase">TEST ITERATION: {runs.toLocaleString()} / 50,000</span>
            <span className="uppercase">BRANCH COVERAGE: {coverage}%</span>
          </div>
        </div>

      </div>
    </section>
  );
}
