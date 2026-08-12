"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldAlert, CheckCircle2, Crosshair, Lock, Shield } from "lucide-react";

export default function ThayonSecrets_Thesis() {
  const thesisPillars = [
    {
      id: "01",
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: "Ephemeral Developer Velocity",
      subtitle: "The Sprawl Dilemma",
      description:
        "Modern engineering teams push 100+ commits daily across microservices, feature branches, and container builds. Staging tokens and internal API credentials get committed in seconds, instantly indexed by automated adversary crawlers within minutes of reaching public or misconfigured repos."
    },
    {
      id: "02",
      icon: <ShieldAlert className="w-5 h-5 text-blue-400" />,
      title: "False Positive Fatigue",
      subtitle: "The Noise Gap",
      description:
        "Legacy regex scanners drown security engineers in thousands of entropy warnings, dummy test strings, and dead sample keys. When 90% of alerts are non-actionable, engineering velocity slows down and critical leaks get ignored until active exploitation occurs."
    },
    {
      id: "03",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      title: "Active Sandbox Validity Checking",
      subtitle: "The Exploitability Void",
      description:
        "Knowing a string matches an AWS pattern isn't enough. Entersoft actively validates credential liveliness, IAM account permissions, and real-time blast radius inside isolated sandbox proxies without tripping tenant rate limits or generating user lockout cascades."
    }
  ];

  return (
    <section className="relative w-full bg-[#08090D] text-white py-24 md:py-32 border-b border-neutral-800/90 overflow-hidden dark-panel">
      {/* Top 5-Point Crosshair Guide Bar */}
      <div className="relative max-w-[1320px] mx-auto px-6 mb-16">
        <div className="flex items-center justify-between text-neutral-600 text-sm font-mono select-none">
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
        </div>
      </div>

      <div className="relative max-w-[1240px] mx-auto px-6">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>[ 01 // OUR THESIS ]</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight tracking-tight text-white"
              style={{ color: '#ffffff' }}
            >
              Secrets sprawl is the fastest route to enterprise breach
            </h2>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end">
            <p
              className="font-sans text-base sm:text-lg leading-relaxed max-w-2xl font-light text-neutral-300"
              style={{ color: '#d4d4d8' }}
            >
              Hardcoded credentials are the #1 initial access vector in modern cloud breaches.
              Eliminating them requires moving beyond static regex strings to active cryptographic verification and continuous automated rotation.
            </p>
          </div>
        </div>

        {/* 3-Column Thesis Grid with Thayon Crosshair Aesthetics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-neutral-800/80 border-t border-b border-neutral-800/80 py-12">
          {thesisPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col justify-between md:px-8 first:pl-0 last:pr-0 space-y-6 group"
            >
              <div>
                {/* Icon box with subtle crosshair frame */}
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6 shadow-inner group-hover:border-neutral-700 transition-colors">
                  {pillar.icon}
                </div>

                <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-1.5">
                  {pillar.subtitle}
                </div>
                <h3
                  className="text-xl sm:text-2xl font-sans font-semibold text-white mb-3"
                  style={{ color: '#ffffff' }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-neutral-300 font-sans text-sm sm:text-base leading-relaxed font-light"
                  style={{ color: '#d4d4d8' }}
                >
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-800/60 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>PHASE {pillar.id}</span>
                <span className="group-hover:text-emerald-400 transition-colors">ACTIVE DEFENSE →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom 5-Point Crosshair Guide Bar */}
      <div className="relative max-w-[1320px] mx-auto px-6 mt-16">
        <div className="flex items-center justify-between text-neutral-600 text-sm font-mono select-none">
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
        </div>
      </div>
    </section>
  );
}
