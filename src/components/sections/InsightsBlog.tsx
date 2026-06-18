"use client";

import React from "react";
import { blogPosts } from "@/data/blog";
import SectionLabel from "../ui/SectionLabel";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { scrollRevealVariants, staggerContainerVariants } from "@/lib/animations";

export default function InsightsBlog() {
  return (
    <section id="insights" className="relative w-full bg-[#060606] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-36 flex flex-col gap-16">
        
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
            className="max-w-[620px]"
          >
            <div className="overflow-hidden">
              <motion.div
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <SectionLabel color="secondary">BLOGS</SectionLabel>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-3xl md:text-4xl font-display font-medium text-[#F6F5F0] uppercase tracking-tight"
              >
                Threat Intelligence Desk
              </motion.h2>
            </div>
          </motion.div>
          <div>
            <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-widest block mb-1">
              // RECENT SECURITY BRIEFS
            </span>
          </div>
        </div>

        {/* 3-Up Editorial Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--border-subtle)]"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={scrollRevealVariants}
              className="p-8 md:p-10 border-r border-b border-[var(--border-subtle)] flex flex-col justify-between hover:bg-white/[0.015] transition-all duration-300 min-h-[350px] relative overflow-hidden group"
            >
              {/* Radial glow background on hover */}
              <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(0,163,255,0.02)_0%,transparent_70%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Header Info */}
              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-wider">
                  <span className="text-[var(--accent)]">
                    {post.category}
                  </span>
                  <span className="text-[var(--text-tertiary)]">
                    {post.date}
                  </span>
                </div>
                
                {/* Headline */}
                <h3 className="font-display font-bold text-xl text-[#F6F5F0] uppercase tracking-tight group-hover:text-[var(--accent)] group-hover:translate-x-1.5 transition-all duration-300 mt-2">
                  {post.title}
                </h3>

                {/* Teaser */}
                <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-sans mt-2 group-hover:text-[#F6F5F0] transition-colors duration-300">
                  {post.teaser}
                </p>
              </div>

              {/* Keep Reading Link */}
              <div className="pt-8 relative z-10">
                <a
                  href={post.link}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#F6F5F0] hover:text-[var(--accent)] uppercase tracking-wider transition-colors"
                  data-cursor="link"
                >
                  Keep Reading <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300 text-[var(--accent)]" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
