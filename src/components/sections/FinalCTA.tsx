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
  const [intentType, setIntentType] = useState<"briefing" | "scoped" | "sample">("briefing");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [area, setArea] = useState("Application Assurance (AppSec)");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLight = theme === "light";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
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

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-36 flex flex-col items-center text-center gap-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } }
          }}
          className="max-w-[720px] flex flex-col items-center gap-4"
        >
          <div className="overflow-hidden">
            <motion.div
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <SectionLabel color="accent" className={`mb-2 ${isLight ? "text-[#0B4FD2]" : ""}`}>ENTERPRISE SECURITY BRIEFING</SectionLabel>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
              }}
              className={`text-[clamp(2rem,4.5vw,4rem)] font-display font-semibold uppercase tracking-[-0.03em] leading-tight ${isLight ? "text-slate-900" : "!text-white drop-shadow-md"}`}
            >
              Book a Security Briefing
            </motion.h2>
          </div>
          <p className={`text-[14px] leading-relaxed max-w-[540px] font-sans mt-1 ${isLight ? "text-slate-600" : "!text-slate-200 font-normal"}`}>
            Discuss your application security, cloud posture, or compliance roadmap with senior technical practice leads. An Entersoft security coordinator will respond within 2 business hours.
          </p>
        </motion.div>

        {/* Briefing submission widget */}
        <div className={`w-full max-w-[540px] border-2 backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col items-stretch text-left shadow-xl relative ${
          isLight ? "!bg-white !border-slate-300/90 shadow-slate-900/5" : "border-white/15 bg-[#0B132B]/80 text-white shadow-2xl shadow-cyan-950/40"
        }`}>
          
          <div className={`flex items-center justify-between border-b pb-4 mb-5 ${isLight ? "border-slate-200" : "border-white/10"}`}>
            <div className="flex items-center gap-2">
              <Mail className={`w-4 h-4 ${isLight ? "text-[#0B4FD2]" : "text-cyan-400"}`} />
              <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${isLight ? "!text-slate-900" : "text-cyan-400"}`}>
                SECURE RESPONSE DESK
              </span>
            </div>
            <span className="font-mono text-[9px] text-zinc-400">SOC 2 TYPE II</span>
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
                {/* Buyer Intent Selector */}
                <div className="flex flex-col gap-1.5 mb-1">
                  <label className={`font-mono text-[10px] font-bold uppercase tracking-wider ${isLight ? "!text-slate-700" : "text-slate-300"}`}>
                    Engagement Objective *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "briefing", label: "Security Briefing", desc: "Discuss posture" },
                      { id: "scoped", label: "Scoped Assessment", desc: "Define testing scope" },
                      { id: "sample", label: "Sample Deliverable", desc: "Examine report structure" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setIntentType(opt.id as "briefing" | "scoped" | "sample")}
                        className={`p-2 rounded-xl text-left border text-xs font-sans transition-all flex flex-col justify-between min-h-[54px] cursor-pointer ${
                          intentType === opt.id
                            ? isLight
                              ? "border-[#0B4FD2] bg-blue-50/70 text-slate-900 font-semibold"
                              : "border-[var(--accent)] bg-[var(--accent)]/10 text-white font-semibold"
                            : isLight
                            ? "border-slate-200 text-slate-600 bg-white"
                            : "border-white/10 text-zinc-400 bg-black/20 hover:border-white/20"
                        }`}
                      >
                        <span className="font-bold text-[10.5px] leading-tight block">{opt.label}</span>
                        <span className="text-[9px] opacity-75 font-mono block mt-0.5">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                  {intentType === "sample" && (
                    <span className="text-[9.5px] font-mono text-cyan-400 mt-0.5">
                      ✓ Sample deliverable will include sanitised illustrative report structure (sample data).
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className={`font-mono text-[10px] font-bold uppercase tracking-wider ${isLight ? "!text-slate-700" : "text-slate-300"}`}>
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className={`w-full h-10 border-2 px-3.5 rounded-xl text-xs font-sans outline-none transition-colors ${
                        isLight 
                          ? "!bg-white !border-slate-300 focus:!border-[#0B4FD2] !text-slate-900 font-medium placeholder:!text-slate-400" 
                          : "bg-slate-900/90 border-slate-700 focus:border-cyan-400 text-white placeholder-slate-500"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className={`font-mono text-[10px] font-bold uppercase tracking-wider ${isLight ? "!text-slate-700" : "text-slate-300"}`}>
                      Work Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className={`w-full h-10 border-2 px-3.5 rounded-xl text-xs font-sans outline-none transition-colors ${
                        isLight 
                          ? "!bg-white !border-slate-300 focus:!border-[#0B4FD2] !text-slate-900 font-medium placeholder:!text-slate-400" 
                          : "bg-slate-900/90 border-slate-700 focus:border-cyan-400 text-white placeholder-slate-500"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className={`font-mono text-[10px] font-bold uppercase tracking-wider ${isLight ? "!text-slate-700" : "text-slate-300"}`}>
                      Company Name *
                    </label>
                    <input
                      id="company"
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Enterprise"
                      className={`w-full h-10 border-2 px-3.5 rounded-xl text-xs font-sans outline-none transition-colors ${
                        isLight 
                          ? "!bg-white !border-slate-300 focus:!border-[#0B4FD2] !text-slate-900 font-medium placeholder:!text-slate-400" 
                          : "bg-slate-900/90 border-slate-700 focus:border-cyan-400 text-white placeholder-slate-500"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="area" className={`font-mono text-[10px] font-bold uppercase tracking-wider ${isLight ? "!text-slate-700" : "text-slate-300"}`}>
                      Area of Interest *
                    </label>
                    <select
                      id="area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className={`w-full h-10 border-2 px-3 rounded-xl text-xs font-sans outline-none transition-colors ${
                        isLight 
                          ? "!bg-white !border-slate-300 focus:!border-[#0B4FD2] !text-slate-900 font-medium" 
                          : "bg-slate-900/90 border-slate-700 focus:border-cyan-400 text-white"
                      }`}
                    >
                      <option value="Application Assurance (AppSec)">Application Assurance (AppSec)</option>
                      <option value="Adversarial Validation (Pen Testing)">Adversarial Validation (Pen Testing)</option>
                      <option value="Cloud Resilience (Cloud Security)">Cloud Resilience (Cloud Security)</option>
                      <option value="Digital Trust (GRC & Compliance)">Digital Trust (GRC & Compliance)</option>
                      <option value="Cyber Defense Operations (MDR/SIEM)">Cyber Defense Operations (MDR/SIEM)</option>
                      <option value="Protocol Assurance (Smart Contracts)">Protocol Assurance (Smart Contracts)</option>
                      <option value="AI Systems Assurance (AI Security)">AI Systems Assurance (AI Security)</option>
                      <option value="EnProbe Platform Demo">EnProbe Platform Demonstration</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className={`font-mono text-[10px] font-bold uppercase tracking-wider ${isLight ? "!text-slate-700" : "text-slate-300"}`}>
                    Initial Enquiry Details (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share non-sensitive high-level objectives. Sensitive technical details can be transferred through an agreed secure channel after qualification."
                    className={`w-full border-2 p-3 rounded-xl text-xs font-sans outline-none resize-none transition-colors ${
                      isLight 
                        ? "!bg-white !border-slate-300 focus:!border-[#0B4FD2] !text-slate-900 font-medium placeholder:!text-slate-400" 
                        : "bg-slate-900/90 border-slate-700 focus:border-cyan-400 text-white placeholder-slate-500"
                    }`}
                  />
                </div>

                <div className="text-[10px] font-sans text-slate-400 leading-normal">
                  Please share only information appropriate for an initial enquiry. Sensitive security information can be transferred through an agreed secure channel after engagement qualification.
                </div>

                <div className="mt-2">
                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full gap-2 h-11 rounded-xl font-semibold flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md text-xs font-mono tracking-wider ${
                        isLight 
                          ? "!bg-[#111827] hover:!bg-black !text-white" 
                          : "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black"
                      }`}
                    >
                      {isSubmitting ? "TRANSMITTING REQUEST..." : (
                        <>
                          <span>
                            {intentType === "scoped" 
                              ? "REQUEST A SCOPED ASSESSMENT" 
                              : intentType === "sample" 
                              ? "VIEW A SAMPLE DELIVERABLE" 
                              : "BOOK A SECURITY BRIEFING"}
                          </span>
                          <Send className="w-3.5 h-3.5 text-current" />
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
                    Briefing Request Received
                  </span>
                  <span className={`text-[11px] font-sans ${isLight ? "text-slate-600" : "text-[var(--text-secondary)]"}`}>
                    An Entersoft security coordinator will contact you at <strong>{email}</strong> within 2 business hours.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Secure disclaimer label */}
          <div className={`mt-5 pt-3 border-t flex items-center justify-between text-[9px] font-mono uppercase tracking-wider ${
            isLight ? "border-slate-100 text-slate-400" : "border-[var(--border-subtle)] text-[var(--text-tertiary)]"
          }`}>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Confidential submission</span>
            </div>
            <span>SOC 2 Type II ISMS</span>
          </div>

        </div>
      </div>
    </section>
  );
}
