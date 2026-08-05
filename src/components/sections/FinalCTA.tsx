"use client";

import React, { useState } from "react";
import SectionLabel from "../ui/SectionLabel";
import { Button } from "../ui/Button";
import MagneticButton from "../ui/MagneticButton";
import { ShieldCheck, Mail, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundRippleEffect } from "../ui/BackgroundRippleEffect";

interface FinalCTAProps {
  theme?: "light" | "dark";
}

export default function FinalCTA({ theme = "dark" }: FinalCTAProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLight = theme === "light";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className={`relative w-full overflow-hidden ${isLight ? "bg-[#FAFCFF] border-t border-slate-200/80" : "bg-[#030712] text-white border-t border-white/10"}`}>
      {/* Background Ambience */}
      {!isLight && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
        </div>
      )}

      {isLight && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        </div>
      )}

      {/* Background Ripple Effect Grid */}
      <div 
        className={`absolute inset-0 h-full w-full overflow-hidden z-[1] pointer-events-auto ${isLight ? "opacity-10" : "opacity-20 dark:opacity-15"}`}
        style={{
          maskImage: "radial-gradient(circle at center, black 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 85%)",
        }}
      >
        <BackgroundRippleEffect rows={12} cols={32} cellSize={64} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-40 flex flex-col items-center text-center gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } }
          }}
          className="max-w-[700px] flex flex-col items-center gap-4"
        >
          <div className="overflow-hidden">
            <motion.div
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <SectionLabel color="accent" className={`mb-2 ${isLight ? "text-[#0B4FD2]" : ""}`}>SECURE ENGAGEMENT GATE</SectionLabel>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
              }}
              className={`text-[clamp(2rem,5vw,4.5rem)] font-display font-bold uppercase tracking-tight leading-none ${isLight ? "text-slate-900" : "!text-white drop-shadow-md"}`}
            >
              Get a Free Consultation
            </motion.h2>
          </div>
          <p className={`text-[14px] leading-relaxed max-w-[480px] font-sans mt-2 ${isLight ? "text-slate-600" : "!text-slate-200 font-normal"}`}>
            Establish a baseline. Enter your corporate credentials below. An Entersoft threat coordinator will respond within 2 hours.
          </p>
        </motion.div>

        {/* Callback submission widget */}
        <div className={`w-full max-w-[480px] border-2 backdrop-blur-md rounded-2xl p-8 md:p-10 flex flex-col items-stretch text-left shadow-xl relative ${
          isLight ? "!bg-white !border-slate-300/90 shadow-slate-900/5" : "border-white/15 bg-[#0B132B]/80 text-white shadow-2xl shadow-cyan-950/40"
        }`}>
          
          <div className={`flex items-center gap-3 border-b pb-4 mb-6 ${isLight ? "border-slate-200" : "border-white/10"}`}>
            <Mail className={`w-4 h-4 ${isLight ? "text-[#0B4FD2]" : "text-cyan-400"}`} />
            <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${isLight ? "!text-slate-900" : "text-cyan-400"}`}>
              ENCRYPTED SECURE RESPONSE DESK
            </span>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className={`font-mono text-[10px] font-bold uppercase tracking-wider ${isLight ? "!text-slate-700" : "text-slate-300"}`}>
                    Corporate Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className={`w-full h-11 border-2 px-4 rounded-xl text-xs font-sans outline-none transition-colors ${
                      isLight 
                        ? "!bg-white !border-slate-300 focus:!border-[#0B4FD2] !text-slate-900 font-medium placeholder:!text-slate-400" 
                        : "bg-slate-900/90 border-slate-700 focus:border-cyan-400 text-white placeholder-slate-500"
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className={`font-mono text-[10px] font-bold uppercase tracking-wider ${isLight ? "!text-slate-700" : "text-slate-300"}`}>
                    Perceived Perimeter Exposures (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Describe systems to scan (e.g. CI/CD API gates, Cloud Infrastructure, Solidity Contracts)"
                    className={`w-full border-2 p-4 rounded-xl text-xs font-sans outline-none resize-none transition-colors ${
                      isLight 
                        ? "!bg-white !border-slate-300 focus:!border-[#0B4FD2] !text-slate-900 font-medium placeholder:!text-slate-400" 
                        : "bg-slate-900/90 border-slate-700 focus:border-cyan-400 text-white placeholder-slate-500"
                    }`}
                  />
                </div>

                <div className="mt-4">
                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full gap-2 h-12 rounded-xl font-semibold flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md ${
                        isLight 
                          ? "!bg-[#111827] hover:!bg-black !text-white" 
                          : "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black"
                      }`}
                    >
                      {isSubmitting ? "TRANSMITTING..." : (
                        <>
                          <span>CONTACT US</span>
                          <Send className="w-3.5 h-3.5 text-white" />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-6 text-center gap-4"
              >
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${isLight ? "border-[#0B4FD2] bg-blue-50" : "border-[var(--accent)] bg-white/[0.01]"}`}>
                  <Check className={`w-6 h-6 animate-pulse ${isLight ? "text-[#0B4FD2]" : "text-[var(--accent)]"}`} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className={`font-mono text-[11px] font-bold uppercase tracking-wider ${isLight ? "text-slate-900" : "text-[var(--text-primary)]"}`}>
                    Transmission Complete
                  </span>
                  <span className={`text-[11px] font-sans ${isLight ? "text-slate-600" : "text-[var(--text-secondary)]"}`}>
                    Secure channel established. A security coordinator will contact you at <strong>{email}</strong>.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Secure disclaimer label */}
          <div className={`mt-6 pt-4 border-t flex items-center gap-2 text-[9px] font-mono uppercase tracking-wider ${
            isLight ? "border-slate-100 text-slate-400" : "border-[var(--border-subtle)] text-[var(--text-tertiary)]"
          }`}>
            <ShieldCheck className="w-4.5 h-4.5" />
            <span>Encrypted transmission // SOC 2 Compliant</span>
          </div>

        </div>
      </div>
    </section>
  );
}
