"use client";

import React, { useState, useEffect, useRef } from "react";
import { testimonials } from "@/data/testimonials";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handleNext = () => {
    stopAutoplay();
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    startAutoplay();
  };

  const handlePrev = () => {
    stopAutoplay();
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startAutoplay();
  };

  const active = testimonials[activeIndex];
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="operational-validation"
      className="relative w-full bg-[var(--bg-primary)] transition-colors duration-500 overflow-hidden"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Mesh Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--accent-glow,rgba(0,163,255,0.06)),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-36 flex flex-col gap-12 md:gap-16 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="flex flex-col items-start"
          >
            <div className="overflow-hidden">
              <motion.div
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <SectionLabel color="secondary">// Operational Validation</SectionLabel>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-3xl font-display font-semibold text-[var(--text-primary)] tracking-[-0.025em]"
              >
                Trusted by Enterprises
              </motion.h2>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Area */}
        <div className="relative min-h-[380px] sm:min-h-[320px] md:min-h-[280px] w-full flex items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={active.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col gap-8 md:gap-10"
            >
              {/* Giant Quote Block */}
              <blockquote className="text-[clamp(1.4rem,3vw,2.4rem)] font-display font-normal leading-snug text-[var(--text-primary)] tracking-[-0.02em] uppercase max-w-[1100px] text-left">
                “{active.quote}”
              </blockquote>

              {/* Attribution Details */}
              <div className="flex flex-col items-start gap-1">
                <span className="font-mono text-xs font-semibold text-[var(--text-primary)] tracking-wider">
                  {active.author}
                </span>
                <span className="font-mono text-[10px] text-[var(--accent)] tracking-widest uppercase">
                  {active.role} // {active.company}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                stopAutoplay();
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
                startAutoplay();
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-8 bg-[var(--accent)]"
                  : "w-2 bg-[var(--border-subtle)] hover:bg-[var(--text-tertiary)]"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
