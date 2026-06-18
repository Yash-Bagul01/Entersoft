"use client";

import React from "react";
import SectionLabel from "../ui/SectionLabel";
import RevealText from "../ui/RevealText";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { fadeInUpVariants } from "@/lib/animations";

export default function ValueProposition() {
  return (
    <section className="relative w-full bg-[#060606] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-36 flex flex-col items-start gap-8 md:gap-12">
        <div className="max-w-[1050px] flex flex-col items-start gap-4">
          <SectionLabel color="secondary">DEFENSIVE PHILOSOPHY</SectionLabel>
          
          {/* Main Statement Reveal */}
          <RevealText
            tag="h2"
            text="Cybersecurity is an operational science. We merge automated telemetry with exploit-first manual audits, delivering proven vulnerabilities and developer-ready fixes. No false-positive noise. No configuration delays."
            className="text-[clamp(1.6rem,4vw,3.2rem)] font-display font-medium leading-[1.12] tracking-[-0.02em] text-[#F6F5F0] uppercase text-left"
          />
        </div>

        {/* Action Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="mt-2"
        >
          <Button variant="secondary" size="md" asLink href="#services" className="gap-2">
            What We Offer <span className="font-sans">→</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
