"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Cloud } from "lucide-react";
import { allCloudOfferingsList } from "@/data/cloudResilience";

interface CloudSiblingNavProps {
  currentSlug: string;
}

export default function CloudSiblingNav({ currentSlug }: CloudSiblingNavProps) {
  const siblings = allCloudOfferingsList.filter((item) => item.slug !== currentSlug);

  return (
    <section className="w-full py-16 md:py-20 border-b border-white/[0.08] bg-[#050608]">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-8 text-left">
        
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2.5">
            <Cloud className="w-4 h-4 text-[var(--accent)]" />
            <span className="font-mono text-[10px] font-bold text-zinc-400 tracking-[0.2em] uppercase">
              OTHER CLOUD RESILIENCE SERVICES
            </span>
          </div>
          <Link
            href="/services/cloud-resilience"
            className="font-mono text-[10px] font-bold text-[var(--accent)] hover:underline uppercase tracking-wider"
          >
            ← View All Cloud Offerings
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {siblings.map((sibling, idx) => (
            <Link
              key={sibling.slug}
              href={sibling.route}
              className="p-5 rounded-xl bg-[#0a0d14]/80 hover:bg-[#0f1422] border border-white/[0.06] hover:border-[var(--accent)]/40 flex flex-col justify-between gap-4 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-zinc-500 group-hover:text-[var(--accent)] transition-colors">
                  0{idx + 1}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" />
              </div>

              <h4 className="font-serif text-base font-bold text-white group-hover:text-[var(--accent)] transition-colors leading-snug">
                {sibling.label}
              </h4>

              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                Explore Offering →
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
