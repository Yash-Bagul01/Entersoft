"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProcessStage {
  index: string;
  title: string;
  subTitle: string;
  description: string;
  metric: string;
  metricLabel: string;
}

const stages: ProcessStage[] = [
  {
    index: "01",
    title: "Framework Scoping",
    subTitle: "BOUNDARY ESTABLISHMENT",
    description: "Map out the boundaries of your systems. Define core network zones, data repositories, cloud ingress points, and user access levels to align with your chosen regulatory standards.",
    metric: "01",
    metricLabel: "Initial Target Phase"
  },
  {
    index: "02",
    title: "Gap Assessment",
    subTitle: "DIAGNOSTIC CONTROLS AUDIT",
    description: "Conduct automated and manual scans of your current practices against the framework rules. We isolate non-compliant nodes, missing controls, and policy deficiencies.",
    metric: "100%",
    metricLabel: "System Perimeter Indexed"
  },
  {
    index: "03",
    title: "Control Implementation",
    subTitle: "HARDENING SYSTEMS & POLICIES",
    description: "Remediate gaps by deploying configuration changes and drafting custom administrative policies. We build secure identity controls, MFA gates, and encrypted storage.",
    metric: "0.0s",
    metricLabel: "Default Credentials Allowed"
  },
  {
    index: "04",
    title: "Evidence Collection",
    subTitle: "CONTINUOUS LOGGING PIPELINES",
    description: "Establish automated pipelines that pipe system events, IAM rolls, and compliance metrics into secure read-only vaults for review by external registrars.",
    metric: "24/7",
    metricLabel: "Evidence Ingestion Active"
  },
  {
    index: "05",
    title: "Audit & Certification",
    subTitle: "EXTERNAL REGISTRAR ADVOCACY",
    description: "Act as your technical liaison. We coordinate audit documentation reviews, conduct dry runs, and join meetings with external auditors to ensure 100% pass rates.",
    metric: "0",
    metricLabel: "Audit Friction & Gaps Remaining"
  },
  {
    index: "06",
    title: "Continuous Monitoring",
    subTitle: "POSTURE COMPLIANCE MAINTENANCE",
    description: "Transition from snapshot compliance to continuous enforcement. Our monitoring engines scan configuration updates in real-time to alert you of posture drift.",
    metric: "99.9%",
    metricLabel: "Automated Evidence Assurance"
  }
];

export default function ProcessWipe() {
  const pinRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || !pinRef.current || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    if (isReduced) return;

    const pin = pinRef.current;
    const stagesCount = stages.length;

    // Get all panel elements
    const panels = pin.querySelectorAll(".process-panel");

    // Initialize all panels (except the first one) to be clipped and invisible
    gsap.set(panels[0], { clipPath: "inset(0% 0 0 0)", opacity: 1 });
    for (let i = 1; i < panels.length; i++) {
      gsap.set(panels[i], { clipPath: "inset(100% 0 0 0)", opacity: 0 });
    }

    // Create GSAP ScrollTrigger to pin the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: `+=${stagesCount * 80}%`, // shorter scroll range for a faster pacing feel
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        refreshPriority: 10,
      }
    });

    // Hold Panel 0 initially
    tl.to({}, { duration: 0.4 });

    // Wipe and cross-fade from stage to stage
    for (let i = 1; i < stagesCount; i++) {
      const label = `step-${i}`;
      tl.add(label);

      // Fade out previous panel text
      tl.to(panels[i-1], {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      }, label);

      // Wipe and fade in current panel
      tl.to(panels[i], {
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      }, label);

      // Hold state after each wipe reveal
      tl.to({}, { 
        duration: i === stagesCount - 1 ? 1.0 : 0.6 
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === pin) t.kill();
      });
    };
  }, [isReduced]);

  return (
    <section 
      ref={pinRef} 
      className="relative w-full h-screen h-[100dvh] bg-transparent text-[#F5F5F5] select-none z-10 border-b border-[var(--border-subtle)] overflow-hidden process-wipe-section"
    >
      {/* Root layout container */}
      <div 
        ref={containerRef}
        className="w-full h-full relative"
      >
        {stages.map((stage, idx) => {
          return (
            <div 
              key={stage.index}
              className="process-panel absolute inset-0 w-full h-full bg-transparent flex items-center px-6 md:px-16 lg:px-24 py-20 z-[10]"
              style={{
                zIndex: 10 + idx,
              }}
            >
              {/* Internal structured details grid */}
              <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
                
                {/* Left: Copy details */}
                <div className="flex flex-col items-start text-left gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-[0.25em] uppercase">
                      AUDIT LIFECYCLE // STAGE {stage.index}
                    </span>
                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-display font-medium text-white uppercase tracking-tighter leading-none">
                      {stage.title}
                    </h3>
                  </div>

                  <span className="font-mono text-[9px] font-bold text-zinc-500 tracking-[0.18em] uppercase">
                    {stage.subTitle}
                  </span>

                  <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-[650px]">
                    {stage.description}
                  </p>

                  {/* Desktop Stage Indicator bar */}
                  <div className="hidden sm:flex items-center gap-6 mt-4 font-mono text-[8px] tracking-[0.15em] text-zinc-600 uppercase font-bold">
                    {stages.map((s, stepIdx) => (
                      <span 
                        key={s.index} 
                        className={`transition-colors duration-300 ${stepIdx === idx ? "text-[var(--accent)]" : ""}`}
                      >
                        {s.index}. {s.title.split(" ")[0]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Structural metric display */}
                <div className="flex flex-col justify-center items-start lg:items-end text-left lg:text-right border-l lg:border-l-0 lg:border-r border-zinc-800/80 p-6 lg:p-8 h-[160px] md:h-[220px]">
                  <span className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white leading-none">
                    {stage.metric}
                  </span>
                  <span className="font-mono text-[9px] font-bold text-[var(--accent)] tracking-[0.16em] uppercase mt-2 block">
                    {stage.metricLabel}
                  </span>
                </div>

              </div>

              {/* Hard alignment lines overlay */}
              <div className="absolute top-0 left-24 w-[1px] h-full bg-white/[0.015]" />
              <div className="absolute top-[30%] left-0 w-full h-[1px] bg-white/[0.015]" />
            </div>
          );
        })}
      </div>
      
      {/* Wipe edge line indicator for GSAP triggers */}
      <div className="absolute bottom-6 left-6 font-mono text-[7px] text-zinc-500 tracking-[0.18em] uppercase pointer-events-none">
        [ Wipe scroll reveals stage progression ]
      </div>
    </section>
  );
}
