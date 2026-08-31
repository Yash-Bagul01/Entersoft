"use client";

import React, { useMemo } from "react";
import { testimonials, TestimonialItem } from "@/data/testimonials";
import SectionLabel from "../ui/SectionLabel";
import { ShieldCheck, Star } from "lucide-react";

export default function Testimonials() {
  // Split 12 testimonials evenly across 3 columns (4 items per column)
  const col1 = useMemo(() => testimonials.slice(0, 4), []);
  const col2 = useMemo(() => testimonials.slice(4, 8), []);
  const col3 = useMemo(() => testimonials.slice(8, 12), []);

  return (
    <section
      id="operational-validation"
      className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 overflow-hidden py-24 md:py-36 select-none"
    >
      {/* Background Subtle Radial Glow Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_15%,rgba(0,163,255,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 flex flex-col gap-12 md:gap-16 relative z-10">

        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center max-w-[840px] mx-auto gap-4">
          <SectionLabel color="secondary">Operational Validation</SectionLabel>
          <h2 className="text-[clamp(2.2rem,4vw,3.6rem)] font-display font-semibold tracking-[-0.03em] leading-[1.08] text-[var(--text-primary)]">
            Trusted by Enterprise Security Leaders
          </h2>
          <p className="text-[clamp(15px,1.3vw,18px)] font-sans text-[var(--text-secondary)] leading-[1.6] max-w-[720px]">
            From global manufacturing conglomerates to regulated fintech platforms, explore how Entersoft delivers zero false-positive vulnerability verification and continuous cyber assurance.
          </p>
        </div>

        {/* ── Testimonials Columns Grid Container ─────────────────────── */}
        <div className="relative w-full h-[680px] md:h-[760px] overflow-hidden rounded-3xl border border-[var(--border-subtle)]/40 bg-[var(--bg-primary)]/40 p-2 md:p-4">
          
          {/* Top Linear Gradient Vignette Mask */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-20" />

          {/* Bottom Linear Gradient Vignette Mask */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 md:h-40 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-20" />

          {/* 3 Columns Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full w-full">
            
            {/* Column 1 (Scroll UP) */}
            <TestimonialColumn items={col1} direction="up" duration="34s" />

            {/* Column 2 (Scroll DOWN - Hidden on mobile, visible md+) */}
            <TestimonialColumn items={col2} direction="down" duration="40s" className="hidden md:flex" />

            {/* Column 3 (Scroll UP - Hidden on mobile/tablet, visible lg+) */}
            <TestimonialColumn items={col3} direction="up" duration="30s" className="hidden lg:flex" />

          </div>
        </div>

      </div>

      {/* Global CSS for Marquee Infinite Scroll Animations & Pause State */}
      <style jsx global>{`
        @keyframes marqueeUp {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes marqueeDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0%);
          }
        }

        .animate-marquee-up {
          animation: marqueeUp var(--marquee-duration, 32s) linear infinite;
        }

        .animate-marquee-down {
          animation: marqueeDown var(--marquee-duration, 38s) linear infinite;
        }

        .column-track:hover .animate-marquee-up,
        .column-track:hover .animate-marquee-down {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}

{/* ── Sub-Component for Individual Column Track ──────────────────────── */}
interface ColumnProps {
  items: TestimonialItem[];
  direction: "up" | "down";
  duration: string;
  className?: string;
}

function TestimonialColumn({ items, direction, duration, className = "" }: ColumnProps) {
  // Duplicate array items to create 100% seamless gapless 50% translation loop
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className={`column-track relative flex flex-col overflow-hidden h-full ${className}`}
    >
      <div
        className={`flex flex-col gap-6 w-full ${
          direction === "up" ? "animate-marquee-up" : "animate-marquee-down"
        }`}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {duplicatedItems.map((item, index) => (
          <TestimonialCard key={`${item.id}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

{/* ── Sub-Component for Testimonial Card ─────────────────────────────── */}
function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="w-full shrink-0 p-6 md:p-7 rounded-2xl bg-[var(--bg-elevated)]/85 backdrop-blur-md border border-[var(--border-subtle)] shadow-lg hover:border-[var(--accent)]/50 hover:shadow-xl hover:shadow-[var(--accent)]/5 transition-all duration-300 group cursor-pointer">
      
      {/* Header: Author Avatar & Metadata */}
      <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-[var(--border-subtle)]/60">
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-br ${
            item.avatarColor || "from-blue-500 to-indigo-600"
          } flex items-center justify-center text-white font-mono text-sm font-bold shadow-md shrink-0`}
        >
          {item.initials}
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="font-sans text-sm font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
            {item.author}
          </span>
          <span className="font-sans text-xs text-[var(--text-tertiary)] truncate">
            {item.role} • <span className="font-mono text-[var(--text-secondary)] font-medium">{item.company}</span>
          </span>
        </div>
      </div>

      {/* Body Quote */}
      <blockquote className="text-sm md:text-[15px] font-sans leading-[1.65] text-[var(--text-secondary)] font-normal tracking-[-0.01em] mb-5">
        “{item.quote}”
      </blockquote>

      {/* Footer Row: Badge & Verified Metric Pill */}
      <div className="flex items-center justify-between gap-2 pt-2">
        <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
          {item.badge}
        </span>

        <div className="flex items-center gap-1 font-mono text-[10px] font-semibold text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 rounded-md border border-[var(--accent)]/20 shrink-0">
          <ShieldCheck className="w-3 h-3 text-[var(--accent)]" />
          <span>{item.metric}</span>
        </div>
      </div>
    </div>
  );
}
