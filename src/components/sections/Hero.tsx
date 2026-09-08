"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import MagneticButton from "../ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const h1GroupRef = useRef<HTMLDivElement>(null);
  const paragraph2Ref = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();
  const lenis = useSmoothScroll();

  const handleScrollToNext = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const targetEl = document.getElementById("track-record") || document.querySelector("main > section:nth-of-type(2)");
    if (lenis && targetEl) {
      lenis.scrollTo(targetEl as HTMLElement, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  // GSAP ScrollTrigger Pinned Text Crossfade Sequence (Hardware Accelerated Timeline)
  useEffect(() => {
    if (typeof window === "undefined" || shouldReduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const h1GroupEl = h1GroupRef.current;
    const p2El = paragraph2Ref.current;

    if (!container || !h1GroupEl || !p2El) return;

    const ctx = gsap.context(() => {
      // Set initial states with 3D transform layers
      gsap.set(h1GroupEl, { opacity: 1, y: 0, force3D: true });
      gsap.set(p2El, { opacity: 0, yPercent: -50, y: 30, force3D: true });

      // Declarative timeline scrubbed smoothly without dynamic CPU filter blur thrashing
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

      tl.to(h1GroupEl, {
        opacity: 0,
        y: -30,
        ease: "power2.inOut",
        duration: 0.6,
      }, 0.1)
      .to(p2El, {
        opacity: 1,
        y: 0,
        ease: "power2.inOut",
        duration: 0.6,
      }, 0.25);
    });

    return () => {
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  // Video autoplay controller
  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    const playVideo = () => {
      if (video.paused) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch((err) => {
            console.warn("Autoplay fallback trigger required:", err);
          });
        }
      }
    };

    video.addEventListener("canplaythrough", playVideo, { once: true });
    video.addEventListener("loadeddata", playVideo, { once: true });
    
    playVideo();

    const handleTrigger = () => {
      playVideo();
      window.removeEventListener("scroll", handleTrigger);
      window.removeEventListener("click", handleTrigger);
      window.removeEventListener("touchstart", handleTrigger);
    };

    window.addEventListener("scroll", handleTrigger, { passive: true, once: true });
    window.addEventListener("click", handleTrigger, { passive: true, once: true });
    window.addEventListener("touchstart", handleTrigger, { passive: true, once: true });

    return () => {
      window.removeEventListener("scroll", handleTrigger);
      window.removeEventListener("click", handleTrigger);
      window.removeEventListener("touchstart", handleTrigger);
    };
  }, [shouldReduceMotion]);

  const creds = (
    <div className="mt-3.5 md:mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[clamp(13px,1vw,15px)] leading-[1.45] tracking-[0.01em] text-white/75">
      <span>Since 2013 (13+ Years)</span>
      <span className="text-white/30">·</span>
      <span>CREST-accredited penetration testing</span>
      <span className="text-white/30">·</span>
      <span>CERT-In empanelled auditing organisation</span>
      <span className="text-white/30">·</span>
      <span>ISO/IEC 27001-certified ISMS</span>
    </div>
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="landing-hero relative w-full h-[100vh] h-[100dvh] overflow-hidden bg-[#060606] select-none text-white flex flex-col justify-between"
      style={{ fontFamily: "var(--font-inter-tight), var(--font-inter), system-ui, sans-serif" }}
    >
      {/* Static Pinned Background Layer */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full bg-[#060606] z-0 overflow-hidden pointer-events-none transform-gpu"
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      >
        {shouldReduceMotion ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.03)_0%,transparent_80%)] animate-pulse duration-[6000ms]" />
        ) : (
          <video
            ref={videoRef}
            src="/videos/hero-background-optimized.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover origin-center opacity-100 transform-gpu"
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            aria-hidden="true"
          />
        )}

        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-300 hero-gradient-overlay"
        />
      </div>

      {/* Scroll-in statement — positioned lower in middle area */}
      <div
        ref={paragraph2Ref}
        className="absolute inset-x-0 top-[48%] -translate-y-1/2 z-20 px-6 md:px-10 opacity-0 pointer-events-none"
      >
        <div className="mx-auto max-w-[1440px] flex flex-col items-start">
          <p className="max-w-[22em] text-[clamp(1.5rem,2.6vw,2.5rem)] font-light leading-[1.32] tracking-[-0.018em] text-white">
            Entersoft combines the EnProbe platform with expert-led security engineering to discover, validate and close risk across applications, APIs, code, cloud, identity, AI systems and digital assets.
          </p>
          {creds}
        </div>
      </div>

      {/* Title + CTA — Fitted cleanly inside screen viewport ratio */}
      <div className="absolute inset-x-0 bottom-16 md:bottom-20 z-20 px-6 md:px-10 pb-0">
        <div className="mx-auto max-w-[1440px] flex flex-col items-start gap-5 md:gap-6">
          <div ref={h1GroupRef} className="max-w-[1100px]">
            <h1 className="text-[clamp(2.2rem,4.8vw,5.2rem)] font-light leading-[0.98] tracking-[-0.035em] text-white">
              Application-first
              <br />
              cyber assurance for
              <br />
              modern enterprises.
            </h1>
            {creds}
          </div>
          <div ref={buttonsRef} className="flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Button variant="primary" size="lg" asLink href="/contact" className="gap-2 w-full sm:w-auto text-center justify-center shadow-lg shadow-black/40">
                Book a Security Briefing <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </MagneticButton>
            <Button variant="secondary" size="lg" asLink href="/platform/enprobe" className="w-full sm:w-auto text-center justify-center">
              Explore EnProbe
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue Indicator */}
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
        className="absolute bottom-5 right-6 md:right-12 z-30 flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg px-3 py-1.5 select-none pointer-events-auto group"
        aria-label="Scroll to next section"
      >
        <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-white/90 group-hover:text-white uppercase transition-colors">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/90 group-hover:text-white transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}
