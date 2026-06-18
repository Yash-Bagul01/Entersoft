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

  return (
    <section
      className="relative w-full bg-[#060606] overflow-hidden"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-36 flex flex-col gap-12 md:gap-16">
        
        {/* Header Block */}
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
              <SectionLabel color="secondary">OPERATIONAL VALIDATION</SectionLabel>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-3xl font-display font-medium text-[#F6F5F0] uppercase tracking-tight"
            >
              Trusted by Enterprises
            </motion.h2>
          </div>
        </motion.div>

        {/* Carousel Content */}
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
              <blockquote className="text-[clamp(1.5rem,3.2vw,2.5rem)] font-display font-light leading-snug text-[#F6F5F0] tracking-tight uppercase max-w-[1100px] text-left">
                “{active.quote}”
              </blockquote>

              {/* Attribution */}
              <div className="flex flex-col items-start gap-1">
                <span className="font-mono text-xs font-bold text-[#F6F5F0] tracking-wider">
                  {active.author}
                </span>
                <span className="font-mono text-[10px] text-[var(--accent)] tracking-widest uppercase">
                  {active.role} // {active.company}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Indicator & Arrows */}
        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-8">
          {/* Index Dots */}
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
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "bg-[var(--accent)] w-6"
                    : "bg-white/20 hover:bg-white/45"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                data-cursor="link"
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 border border-[var(--border-subtle)] rounded-[2px] hover:border-[#F6F5F0] text-[#F6F5F0] transition-colors bg-white/[0.01]"
              aria-label="Previous quote"
              data-cursor="link"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 border border-[var(--border-subtle)] rounded-[2px] hover:border-[#F6F5F0] text-[#F6F5F0] transition-colors bg-white/[0.01]"
              aria-label="Next quote"
              data-cursor="link"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
