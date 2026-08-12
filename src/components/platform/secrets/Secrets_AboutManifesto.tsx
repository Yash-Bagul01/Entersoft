"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2, Lock } from "lucide-react";

export default function Secrets_AboutManifesto() {
  return (
    <section className="w-full bg-[#FAFCFF] text-slate-900 py-24 md:py-32 border-b border-slate-200/80 relative z-20">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Two-Column Manifesto Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Big Bold Statement */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#2563EB]"
            >
              <span>// PLATFORM MANIFESTO</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-slate-950 font-sans leading-[1.08]"
            >
              EnProbe Secrets Detection is an enterprise credential defense engine, engineered to eliminate hardcoded secrets before they ever reach production.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-700 font-sans leading-relaxed"
            >
              It unifies pre-commit workstation interception, deep git commit history forensics, and real-time active key validation across millions of lines of code with zero developer friction.
            </motion.p>
          </div>

          {/* Right Column: Deep Explanation & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 pt-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-5 text-slate-600 font-sans leading-relaxed text-base"
            >
              <p>
                Credentials, private API tokens, and cloud keys represent the #1 initial access vector for over 80% of modern breaches. EnProbe stops secret leaks at the developer workstation before code is pushed, audits historical commit trees for legacy exposure, and safely verifies validity directly with token issuers.
              </p>
              <p>
                Engineered for hyperscale CI/CD pipelines, our semantic AST parser and Shannon entropy algorithms distinguish real live secrets from dummy test mocks, completely eliminating false-positive alarm fatigue.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4 pt-2"
            >
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-sans font-bold text-sm tracking-tight transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:scale-[1.02] cursor-pointer"
                data-cursor="button"
              >
                <span>Schedule Platform Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
