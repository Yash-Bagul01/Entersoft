"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import MagneticButton from "../ui/MagneticButton";
import SectionLabel from "../ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const lenis = useSmoothScroll();

  const handleScrollToNext = () => {
    if (lenis) {
      lenis.scrollTo("#value-proposition", {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const nextSection = document.getElementById("value-proposition");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // GSAP Parallax scrolling animations
  useEffect(() => {
    if (typeof window === "undefined" || shouldReduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const videoContainer = videoContainerRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!container || !videoContainer || !overlay || !content) return;

    const ctx = gsap.context(() => {
      // 1. Pin the video container inside the hero wrapper during scroll
      ScrollTrigger.create({
        trigger: container,
        pin: videoContainer,
        start: "top top",
        end: "bottom top",
        pinType: "fixed",
        scrub: true,
      });

      // 2. Parallax scale the video element, shrink the videoContainer into a card, and darken the overlay while fading out content
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      })
      .to(video, { scale: 1.12, ease: "none" }, 0)
      .to(videoContainer, {
        clipPath: "inset(4% 6% 8% 6% rounded 24px)",
        scale: 0.95,
        ease: "power1.inOut",
      }, 0)
      .to(overlay, { backgroundColor: "rgba(6, 6, 6, 0.95)", ease: "none" }, 0)
      .to(content, { opacity: 0, y: -60, ease: "none" }, 0);
    });

    return () => {
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  // Video viewport lifecycle controller (IntersectionObserver)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;

    // Explicitly enforce muted, loop and playsInline to override browser blockages
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    const playVideo = () => {
      video.play().catch((err) => {
        console.warn("Autoplay was blocked or video loading failed, adding trigger...", err);
      });
    };

    video.addEventListener("canplay", playVideo);
    
    // Play immediately if readyState permits
    if (video.readyState >= 3) {
      playVideo();
    }

    // Interaction fallback triggers
    const handleTrigger = () => {
      if (video.paused) {
        playVideo();
      }
      window.removeEventListener("scroll", handleTrigger);
      window.removeEventListener("click", handleTrigger);
    };

    window.addEventListener("scroll", handleTrigger, { passive: true });
    window.addEventListener("click", handleTrigger, { passive: true });

    return () => {
      video.removeEventListener("canplay", playVideo);
      window.removeEventListener("scroll", handleTrigger);
      window.removeEventListener("click", handleTrigger);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100vh] h-[100dvh] overflow-hidden flex flex-col justify-center items-center px-6 md:px-12 bg-[#060606] select-none"
    >
      {/* Background Layer Container (Always rendered and pinned, supports fallback image/poster) */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full bg-[#060606] z-0 overflow-hidden pointer-events-none"
        style={{ clipPath: "inset(0% 0% 0% 0% rounded 0px)" }}
      >
        {shouldReduceMotion ? (
          /* Ambient subtle CSS pulse for reduced motion accessibility */
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
            onError={(e) => {
              console.error("Hero video load error:", e);
              setVideoError(true);
            }}
            className="absolute inset-0 w-full h-full object-cover origin-center"
            aria-hidden="true"
          />
        )}

        {/* Cinematic Linear Gradient Masks (Inside container so it clips/scales together) */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-300 hero-gradient-overlay"
        />
      </div>

      {/* Hero Content Container */}
      <div ref={contentRef} className="relative z-20 max-w-[1400px] w-full flex flex-col justify-center items-start pt-16 h-full">
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08, // STAGGER.base
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="max-w-[850px] flex flex-col items-start gap-4 md:gap-6"
        >
          {/* Eyebrow Label: Line Mask Reveal */}
          <div className="overflow-hidden">
            <motion.div
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <SectionLabel color="accent">SECURITY WITHOUT COMPLEXITY</SectionLabel>
            </motion.div>
          </div>

          {/* Headline: Line-Mask Reveal with drop-shadow for visibility */}
          <motion.h1
            className="text-[clamp(1.8rem,4vw,3.8rem)] font-display font-semibold leading-[1.05] tracking-[-0.02em] text-[#F6F5F0] uppercase text-left whitespace-pre-line drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          >
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="block"
              >
                AI-Native AppSec.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em] text-[#F6F5F0] opacity-90">
              <motion.span
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="block"
              >
                Expert-Governed.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em] text-[#F6F5F0] opacity-80">
              <motion.span
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="block"
              >
                Evidence-Backed.
              </motion.span>
            </span>
          </motion.h1>

          {/* Subhead: Smooth reveal with text-shadow and brightened text for readability */}
          <div className="overflow-hidden mt-2">
            <motion.p
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="text-[clamp(14px,1.6vw,17px)] font-sans text-[#F6F5F0] opacity-85 leading-relaxed max-w-[620px] text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            >
              AI-Powered Application Security. Governed by Experts.
            </motion.p>
          </div>

          {/* Technical Specs Line */}
          <div className="overflow-hidden mt-3">
            <motion.p
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
              }}
              className="text-[clamp(11px,1.3vw,13.5px)] font-sans text-[#F6F5F0] opacity-85 tracking-wider flex flex-wrap items-center gap-x-2.5 gap-y-1 text-left drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
            >
              <span className="font-semibold">14 years of AppSec expertise</span>
              <span className="opacity-50">|</span>
              <span className="font-semibold">Human-validated AI</span>
              <span className="opacity-50">|</span>
              <span className="font-semibold">Web</span>
              <span className="opacity-45">•</span>
              <span className="font-semibold">API</span>
              <span className="opacity-45">•</span>
              <span className="font-semibold">Mobile</span>
              <span className="opacity-45">•</span>
              <span className="font-semibold">Code</span>
              <span className="opacity-45">•</span>
              <span className="font-semibold">Cloud</span>
            </motion.p>
          </div>

          {/* Call-to-actions */}
          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="flex flex-wrap items-center gap-4 mt-4 md:mt-6"
          >
            <MagneticButton>
              <Button variant="primary" size="lg" asLink href="#contact" className="gap-2">
                REQUEST BRIEFING <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </MagneticButton>
            <Button variant="secondary" size="lg" asLink href="#contact">
              SEE ENPROBE
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.button
        onClick={handleScrollToNext}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: 0 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { delay: 1.2, duration: 0.6 },
          scale: { duration: 0.2 },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg px-4 py-2 select-none"
        aria-label="Scroll to next section"
      >
        <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[var(--text-secondary)] uppercase">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#F6F5F0]" />
        </motion.div>
      </motion.button>
    </section>
  );
}
