"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { ROUTES } from "@/config/routes";
import { platformPillars } from "@/data/platform";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const pillar = platformPillars["attack-surface-management"];

const PLEX =
  "var(--font-ibm-plex-mono), ui-monospace, monospace" as const;

export default function AsmHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const h1GroupRef = useRef<HTMLDivElement>(null);
  const paragraph2Ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const lenis = useSmoothScroll();

  const handleScrollToNext = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const targetEl = document.getElementById("asm-manifesto");
    if (lenis && targetEl) {
      lenis.scrollTo(targetEl, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const h1GroupEl = h1GroupRef.current;
    const p2El = paragraph2Ref.current;
    if (!container || !h1GroupEl || !p2El) return;

    const ctx = gsap.context(() => {
      gsap.set(h1GroupEl, { opacity: 1, y: 0, force3D: true });
      gsap.set(p2El, { opacity: 0, yPercent: -50, y: 30, force3D: true });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () =>
            `+=${300 + (window.matchMedia("(min-width: 768px)").matches ? window.innerHeight : 0)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.4,
          fastScrollEnd: true,
        },
      });

      tl.to(h1GroupEl, { opacity: 0, y: -30, ease: "power2.inOut", duration: 0.6 }, 0.1).to(
        p2El,
        { opacity: 1, y: 0, ease: "power2.inOut", duration: 0.6 },
        0.25
      );
    });

    return () => {
      ctx.revert();
    };
  }, [reduce]);

  const creds = (
    <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[clamp(13px,1vw,15px)] leading-[1.45] tracking-[0.01em] text-white/75 md:mt-4">
      <span>EnProbe</span>
      <span className="text-white/30">·</span>
      <span>{pillar.cluster}</span>
      <span className="text-white/30">·</span>
      <span>{pillar.descriptor}</span>
    </div>
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="landing-hero asm-hero relative flex h-[100vh] h-[100dvh] w-full select-none flex-col justify-between overflow-hidden bg-[#060606] text-white"
      style={{ fontFamily: "var(--font-inter-tight), var(--font-inter), system-ui, sans-serif" }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="hero-gradient-overlay pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
      </div>

      <div
        ref={paragraph2Ref}
        className="pointer-events-none absolute inset-x-0 top-[48%] z-20 -translate-y-1/2 px-6 opacity-0 md:px-10"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col items-start">
          <p className="max-w-[22em] text-[clamp(1.5rem,2.6vw,2.5rem)] font-light leading-[1.32] tracking-[-0.018em] text-white">
            {pillar.summary}
          </p>
          {creds}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-16 z-20 px-6 pb-0 md:bottom-20 md:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-5 md:gap-6">
          <div ref={h1GroupRef} className="max-w-[1100px]">
            <h1 className="text-[clamp(2.2rem,4.8vw,5.2rem)] font-light leading-[0.98] tracking-[-0.035em] text-white">
              Attack Surface
              <br />
              Visibility
            </h1>
            {creds}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Button
                variant="primary"
                size="lg"
                asLink
                href={ROUTES.contact}
                className="w-full justify-center gap-2 text-center shadow-lg shadow-black/40 sm:w-auto"
              >
                Book a Security Briefing <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </MagneticButton>
            <Button
              variant="secondary"
              size="lg"
              asLink
              href={ROUTES.platform.enprobe}
              className="w-full justify-center text-center sm:w-auto"
            >
              Explore EnProbe
            </Button>
          </div>
        </div>
      </div>

      <motion.button
        onClick={handleScrollToNext}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.8, y: 0 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          opacity: { delay: 0.8, duration: 0.6 },
          y: { delay: 0.8, duration: 0.6 },
        }}
        className="group pointer-events-auto absolute right-6 bottom-5 z-30 flex cursor-pointer items-center gap-2 rounded-lg border-none bg-transparent px-3 py-1.5 outline-none select-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] md:right-12"
        aria-label="Scroll to next section"
      >
        <span
          className="text-[11px] font-bold tracking-[0.2em] text-white/90 uppercase transition-colors group-hover:text-white"
          style={{ fontFamily: PLEX }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-white/90 transition-colors group-hover:text-white" />
        </motion.div>
      </motion.button>
    </section>
  );
}
