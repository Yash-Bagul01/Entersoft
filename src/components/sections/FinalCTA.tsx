"use client";

import React, { useState } from "react";
import SectionLabel from "../ui/SectionLabel";
import { Button } from "../ui/Button";
import MagneticButton from "../ui/MagneticButton";
import { ShieldCheck, Mail, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundRippleEffect } from "../ui/BackgroundRippleEffect";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <section id="contact" className="relative w-full bg-[var(--bg-primary)] overflow-hidden">
      {/* Dark Futuristic Cyber Ambient Background Image (Codex.io style) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop"
          alt="Cyber background"
          className="w-full h-full object-cover opacity-25 dark:opacity-35 mix-blend-luminosity scale-105 transform transition-transform duration-1000"
        />
        {/* Multi-directional gradient masks for seamless blending into site edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)] opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)] opacity-85" />
        
        {/* Soft center ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--accent-dim)] rounded-full blur-[120px] pointer-events-none opacity-40" />
      </div>

      {/* Background Ripple Effect Grid */}
      <div 
        className="absolute inset-0 h-full w-full overflow-hidden opacity-20 dark:opacity-15 z-[1] pointer-events-auto"
        style={{
          maskImage: "radial-gradient(circle at center, black 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 85%)",
        }}
      >
        <BackgroundRippleEffect rows={12} cols={32} cellSize={64} />
      </div>

      {/* Muted Abstract Matrix Graphic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.05)_0%,transparent_70%)]" />
        <svg className="w-full h-full text-[var(--accent)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.25">
          <circle cx="50" cy="50" r="45" strokeDasharray="2 4" />
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="15" strokeDasharray="5 5" />
          <line x1="50" y1="5" x2="50" y2="95" />
          <line x1="5" y1="50" x2="95" y2="50" />
        </svg>
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
              <SectionLabel color="accent" className="mb-2">SECURE ENGAGEMENT GATE</SectionLabel>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-[clamp(2rem,5vw,4.5rem)] font-display font-medium text-[var(--text-primary)] uppercase tracking-tight leading-none"
            >
              Get a Free Consultation
            </motion.h2>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-[480px] font-sans mt-2">
            Establish a baseline. Enter your corporate credentials below. An Entersoft threat coordinator will respond within 2 hours.
          </p>
        </motion.div>

        {/* Callback submission widget */}
        <div className="w-full max-w-[480px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/90 backdrop-blur-md rounded-[4px] p-8 md:p-10 flex flex-col items-stretch text-left shadow-2xl relative">
          
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4 mb-6">
            <Mail className="w-4 h-4 text-[var(--accent)]" />
            <span className="font-mono text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-widest">
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
                  <label htmlFor="email" className="font-mono text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                    Corporate Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full h-11 bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--accent)] text-[var(--text-primary)] px-4 rounded-[3px] text-xs font-sans placeholder-white/20 outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-mono text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                    Perceived Perimeter Exposures (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Describe systems to scan (e.g. CI/CD API gates, Cloud Infrastructure, Solidity Contracts)"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--accent)] text-[var(--text-primary)] p-4 rounded-[3px] text-xs font-sans placeholder-white/20 outline-none resize-none transition-colors"
                  />
                </div>

                <div className="mt-4">
                  <MagneticButton>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gap-2 h-12"
                    >
                      {isSubmitting ? "TRANSMITTING..." : (
                        <>
                          CONTACT US <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </Button>
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
                <div className="w-12 h-12 rounded-full border border-[var(--accent)] flex items-center justify-center bg-white/[0.01]">
                  <Check className="w-6 h-6 text-[var(--accent)] animate-pulse" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    Transmission Complete
                  </span>
                  <span className="text-[11px] text-[var(--text-secondary)] font-sans">
                    Secure channel established. A security coordinator will contact you at <strong>{email}</strong>.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Secure disclaimer label */}
          <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center gap-2 text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
            <ShieldCheck className="w-4.5 h-4.5 text-[var(--text-tertiary)]" />
            <span>Encrypted transmission // SOC 2 Compliant</span>
          </div>

        </div>
      </div>
    </section>
  );
}
