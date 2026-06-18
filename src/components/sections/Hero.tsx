"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import MagneticButton from "../ui/MagneticButton";
import SectionLabel from "../ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
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
    const container = containerRef.current;
    if (!video || !container || shouldReduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          // Only pause the video if the user has scrolled past the hero threshold
          if (typeof window !== "undefined" && window.scrollY > 100) {
            video.pause();
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);
    return () => observer.disconnect();
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
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => {
              setVideoReady(true);
              if (videoRef.current) {
                videoRef.current.play().catch(() => {});
              }
            }}
            onError={(e) => {
              console.error("Hero video load error:", e);
              setVideoError(true);
            }}
            className="absolute inset-0 w-full h-full object-cover origin-center"
            aria-hidden="true"
          >
            <source src="https://new-entersoft-website2026.s3.ap-south-1.amazonaws.com/entersoft-command-plane+%28online-video-cutter.com%29.mp4" type="video/mp4" />
          </video>
        )}

        {/* Cinematic Linear Gradient Masks (Inside container so it clips/scales together) */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 pointer-events-none transition-colors duration-300"
          style={{
            background: "linear-gradient(180deg, rgba(6,6,6,0.8) 0%, rgba(6,6,6,0.55) 50%, rgba(6,6,6,0.85) 100%)",
          }}
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
            className="text-[clamp(2.3rem,5.5vw,5.5rem)] font-display font-semibold leading-[0.98] tracking-[-0.03em] text-[#F6F5F0] uppercase text-left whitespace-pre-line drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          >
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }, // EASE.weighted
                }}
                className="block"
              >
                One Scan to Know Where You're Exposed.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em] text-[#F6F5F0] opacity-85">
              <motion.span
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="block"
              >
                One Report to Fix It Fast.
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
              Automated repository scanning integrated into developer workflows, validated by senior analysts. 13 years of manual exploit experience delivering zero false-positive remediation code.
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
                Scan Now <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </MagneticButton>
            <Button variant="secondary" size="lg" asLink href="#contact">
              Talk to an Expert
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-60"
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
      </motion.div>
    </section>
  );
}
