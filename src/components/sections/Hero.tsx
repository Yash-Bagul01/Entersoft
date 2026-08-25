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
      gsap.set(p2El, { opacity: 0, y: 30, force3D: true });

      // Declarative timeline scrubbed smoothly without dynamic CPU filter blur thrashing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=600",
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

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100vh] h-[100dvh] overflow-hidden flex flex-col justify-between items-start px-6 md:px-12 pt-20 md:pt-22 pb-12 md:pb-16 bg-[#060606] select-none"
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
            src="/videos/hero-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover origin-center opacity-85 transform-gpu"
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            aria-hidden="true"
          />
        )}

        {/* Gradient Mask Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-300 hero-gradient-overlay"
        />
      </div>

      {/* Main Content Container (Left Aligned & Clean Layout) */}
      <div className="relative z-20 max-w-[1280px] w-full flex-1 flex flex-col justify-center items-start text-left">
        
        {/* Dynamic Text Frame (H1 Group & Statement 2 Crossfade) */}
        <div className="relative w-full max-w-[1080px]">
          
          {/* Statement 1: 3-Line Display H1 + Technical Credentials Line */}
          <div ref={h1GroupRef} className="flex flex-col items-start text-left max-w-[1020px]">
            <h1
              className="text-[clamp(2.4rem,5vw,5.2rem)] font-display font-semibold leading-[1.06] tracking-[-0.025em] text-[#F6F5F0] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] select-none text-left"
            >
              Application-first
              <br />
              cyber assurance for
              <br />
              modern enterprises.
            </h1>

            {/* Technical Credentials Row (Since 2013 Line) */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[clamp(12px,1.4vw,15px)] font-mono text-white/80 tracking-wider text-left max-w-[900px]">
              <span className="font-semibold text-[#96CBFF]">Since 2013 (13+ Years)</span>
              <span className="text-white/30">|</span>
              <span className="font-medium text-white/90">CREST-accredited penetration testing</span>
              <span className="text-white/30">|</span>
              <span className="font-medium text-white/90">CERT-In empanelled auditing organisation</span>
              <span className="text-white/30">|</span>
              <span className="font-medium text-white/90">ISO/IEC 27001-certified ISMS</span>
            </div>
          </div>

          {/* Statement 2: Full Display Paragraph (Scroll View State) - Crisp, sharp & non-blurry */}
          <div
            ref={paragraph2Ref}
            className="absolute inset-0 flex flex-col justify-center items-start opacity-0 pointer-events-none max-w-[1020px]"
          >
            <p className="text-[clamp(1.4rem,3vw,2.7rem)] font-display font-medium leading-[1.24] tracking-[-0.02em] text-[#F6F5F0]/95 text-left drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              Entersoft combines the <span className="text-[#96CBFF] font-semibold">EnProbe</span> platform with expert-led security engineering to discover, validate and close risk across applications, APIs, code, cloud, identity, AI systems and digital assets.
            </p>

            {/* Technical Credentials Row Below Statement 2 */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[clamp(12px,1.4vw,15px)] font-mono text-white/80 tracking-wider text-left max-w-[900px]">
              <span className="font-semibold text-[#96CBFF]">Since 2013 (13+ Years)</span>
              <span className="text-white/30">|</span>
              <span className="font-medium text-white/90">CREST-accredited penetration testing</span>
              <span className="text-white/30">|</span>
              <span className="font-medium text-white/90">CERT-In empanelled auditing organisation</span>
              <span className="text-white/30">|</span>
              <span className="font-medium text-white/90">ISO/IEC 27001-certified ISMS</span>
            </div>
          </div>
        </div>

      </div>

      {/* Static Call-To-Action Buttons (Locked Left Position at Bottom) */}
      <div
        ref={buttonsRef}
        className="relative z-30 flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto"
      >
        <MagneticButton>
          <Button variant="primary" size="lg" asLink href="/contact" className="gap-2 w-full sm:w-auto text-center justify-center shadow-lg shadow-black/40">
            Book a Security Briefing <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </MagneticButton>
        <Button variant="secondary" size="lg" asLink href="/platform/enprobe" className="w-full sm:w-auto text-center justify-center">
          Explore EnProbe
        </Button>
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
        className="absolute bottom-6 right-8 md:right-16 z-30 flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg px-3 py-1.5 select-none pointer-events-auto group"
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
