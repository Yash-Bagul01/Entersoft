"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { hero } from "@/data/sast";

export default function SH0_Hero() {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section className="relative bg-[var(--lt-white)] pt-32 pb-24 px-6 md:px-12 overflow-hidden text-[var(--lt-text)]">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
        {/* Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lt-badge mb-6"
        >
          {hero.badge}
        </motion.div>

        {/* Hero Headline */}
        <h1 className="lt-hero-h1 mb-6 max-w-[850px]">
          <motion.span
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="block"
          >
            Intelligent discovery
          </motion.span>
          <motion.span
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.35 }}
            className="block text-[#D8A85F]"
          >
            that anticipates intent.
          </motion.span>
        </h1>

        {/* Sub Paragraph */}
        <motion.p
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ ...fadeUp.transition, delay: 0.45 }}
          className="lt-body mb-10 max-w-[720px]"
        >
          {hero.sub}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ ...fadeUp.transition, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20"
        >
          <Link href={hero.ctaPrimary.href} className="lt-btn-primary">
            {hero.ctaPrimary.label}
          </Link>
          <Link href={hero.ctaSecondary.href} className="lt-btn-secondary">
            {hero.ctaSecondary.label}
          </Link>
        </motion.div>

        {/* PREMIUM STOCK IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.7 }}
          className="w-full max-w-[960px] relative z-10 rounded-lg overflow-hidden border border-[var(--lt-border)] shadow-xl shadow-black/[0.04]"
        >
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80" 
            alt="Premium abstract 3D glass shapes representing secure, structured code blocks" 
            className="w-full h-auto object-cover aspect-[16/9]"
          />
        </motion.div>
      </div>
    </section>
  );
}
