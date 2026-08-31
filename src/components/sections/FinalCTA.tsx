"use client";

import React, { useState } from "react";
import { Calendar, Check, Send, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import MagneticButton from "../ui/MagneticButton";

interface FinalCTAProps {
  theme?: "light" | "dark";
}

const SERVICES_OPTIONS = [
  "Application Security (AppSec)",
  "Penetration Testing (VAPT)",
  "Cloud & IaC Security",
  "AI Systems Security",
  "Compliance & GRC (ISO/CERT-In)",
  "MDR & Threat Operations",
  "Smart Contract Audit",
  "EnProbe Platform Demo",
];

export default function FinalCTA({ theme = "dark" }: FinalCTAProps) {
  const [clientTab, setClientTab] = useState<"domestic" | "international">("international");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Application Security (AppSec)",
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [discoverySource, setDiscoverySource] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isLight = theme === "light";

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section
      id="contact"
      className={`relative w-full overflow-hidden transition-colors duration-500 contact-section-theme ${
        isLight
          ? "bg-[#FAFCFF] text-slate-900 border-t border-slate-200/80"
          : "bg-[#060606] text-white border-t border-white/10"
      }`}
    >
      {/* Light & Dark Theme CSS Overrides for 100% Text Visibility */}
      <style jsx global>{`
        [data-theme="light"] .contact-section-theme {
          background-color: #FAFCFF !important;
          color: #0f172a !important;
          border-color: rgba(226, 232, 240, 0.9) !important;
        }

        [data-theme="light"] .contact-section-theme .contact-main-heading {
          color: #0f172a !important;
        }

        [data-theme="light"] .contact-section-theme .contact-label {
          color: #1e293b !important;
          font-weight: 500 !important;
        }

        [data-theme="light"] .contact-section-theme .contact-input {
          background-color: #ffffff !important;
          border-color: #cbd5e1 !important;
          color: #0f172a !important;
        }

        [data-theme="light"] .contact-section-theme .contact-input::placeholder {
          color: #94a3b8 !important;
        }

        [data-theme="light"] .contact-section-theme .contact-input:focus {
          border-color: #0284c7 !important;
          box-shadow: 0 0 0 1px #0284c7 !important;
        }

        [data-theme="light"] .contact-section-theme .pill-unselected {
          background-color: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
          color: #334155 !important;
        }

        [data-theme="light"] .contact-section-theme .pill-unselected:hover {
          background-color: #e2e8f0 !important;
          border-color: #94a3b8 !important;
        }

        [data-theme="light"] .contact-section-theme .pill-selected {
          background-color: #0f172a !important;
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15) !important;
        }

        [data-theme="light"] .contact-section-theme .tab-unselected {
          background-color: #f1f5f9 !important;
          color: #475569 !important;
        }

        [data-theme="light"] .contact-section-theme .tab-selected {
          background-color: #0f172a !important;
          color: #ffffff !important;
        }

        [data-theme="light"] .contact-section-theme .book-call-btn {
          background-color: #ffffff !important;
          border-color: #cbd5e1 !important;
          color: #0f172a !important;
        }

        [data-theme="light"] .contact-section-theme .book-call-btn:hover {
          background-color: #0f172a !important;
          color: #ffffff !important;
        }

        [data-theme="light"] .contact-section-theme .contact-submit-btn {
          background-color: #0f172a !important;
          color: #ffffff !important;
        }

        [data-theme="light"] .contact-section-theme .contact-submit-btn:hover {
          background-color: #0284c7 !important;
        }

        [data-theme="light"] .contact-section-theme .contact-footer-info {
          color: #64748b !important;
        }
      `}</style>

      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_20%,rgba(0,163,255,0.04),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-6 md:px-12 py-16 lg:py-24">
        
        {/* Split Grid Layout (Left: Heading & Tabs, Right: Form Questions) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Client Tabs & Book a Call CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 lg:sticky lg:top-28">
            <div className="flex flex-col gap-4">
              <SectionLabel color={isLight ? "accent" : "secondary"}>
                CONTACT ENTERSOFT
              </SectionLabel>

              <h1 className={`contact-main-heading font-display text-[clamp(1.25rem,2.2vw,1.85rem)] font-normal tracking-tight leading-[1.35] ${
                isLight ? "text-slate-900" : "text-slate-100"
              }`}>
                Got an application security requirement, a wild idea, or compliance roadmap? We’re all ears.
              </h1>

              {/* Client Region Switcher Pill Tabs */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setClientTab("domestic")}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                    clientTab === "domestic"
                      ? isLight
                        ? "bg-slate-900 text-white font-medium shadow-sm tab-selected"
                        : "bg-white text-black font-semibold shadow-md shadow-white/10 tab-selected"
                      : isLight
                      ? "bg-slate-100 text-slate-600 hover:bg-slate-200 tab-unselected"
                      : "bg-white/[0.04] text-slate-300 border border-white/10 hover:bg-white/[0.08] tab-unselected"
                  }`}
                >
                  Local client (India / APAC)
                </button>
                <button
                  type="button"
                  onClick={() => setClientTab("international")}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                    clientTab === "international"
                      ? isLight
                        ? "bg-slate-900 text-white font-medium shadow-sm tab-selected"
                        : "bg-white text-black font-semibold shadow-md shadow-white/10 tab-selected"
                      : isLight
                      ? "bg-slate-100 text-slate-600 hover:bg-slate-200 tab-unselected"
                      : "bg-white/[0.04] text-slate-300 border border-white/10 hover:bg-white/[0.08] tab-unselected"
                  }`}
                >
                  International client
                </button>
              </div>
            </div>

            {/* Book a Call Action Button */}
            <div className="pt-1">
              <a
                href="https://calendar.app.google/VZXgQpSpvyiG4P296"
                target="_blank"
                rel="noopener noreferrer"
                className={`book-call-btn inline-flex items-center gap-3 px-5 py-2.5 rounded-full border text-[11px] font-mono tracking-wider uppercase transition-all duration-300 ${
                  isLight
                    ? "border-slate-300 bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow-sm"
                    : "border-white/20 bg-white/[0.05] text-white hover:bg-white hover:text-black shadow-md shadow-black/40"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center transition-colors">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                </div>
                <span>Book a call</span>
              </a>
            </div>
          </div>

          {/* Right Column: Stacked Form Questions */}
          <div className="lg:col-span-7 w-full">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form-right-refined"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  {/* Question 1: Name */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-name"
                      className={`contact-label text-[13px] sm:text-[14px] font-sans tracking-wide ${
                        isLight ? "text-slate-900 font-medium" : "text-slate-300 font-normal"
                      }`}
                    >
                      What should I call you? *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Type your Name"
                      className={`contact-input w-full h-11 px-3.5 rounded-lg text-[13px] font-sans outline-none border transition-all duration-200 ${
                        isLight
                          ? "bg-white border-slate-300 focus:border-slate-900 text-slate-900 placeholder:text-slate-400 shadow-sm"
                          : "bg-white/[0.02] border-white/12 focus:border-cyan-400 focus:bg-white/[0.05] text-white placeholder:text-neutral-500"
                      }`}
                    />
                  </div>

                  {/* Question 2: Email */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-email"
                      className={`contact-label text-[13px] sm:text-[14px] font-sans tracking-wide ${
                        isLight ? "text-slate-900 font-medium" : "text-slate-300 font-normal"
                      }`}
                    >
                      Where do I reach you? *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Type your Email"
                      className={`contact-input w-full h-11 px-3.5 rounded-lg text-[13px] font-sans outline-none border transition-all duration-200 ${
                        isLight
                          ? "bg-white border-slate-300 focus:border-slate-900 text-slate-900 placeholder:text-slate-400 shadow-sm"
                          : "bg-white/[0.02] border-white/12 focus:border-cyan-400 focus:bg-white/[0.05] text-white placeholder:text-neutral-500"
                      }`}
                    />
                  </div>

                  {/* Question 3: Phone */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-phone"
                      className={`contact-label text-[13px] sm:text-[14px] font-sans tracking-wide ${
                        isLight ? "text-slate-900 font-medium" : "text-slate-300 font-normal"
                      }`}
                    >
                      What's the best number to reach you?
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Type your phone number"
                      className={`contact-input w-full h-11 px-3.5 rounded-lg text-[13px] font-sans outline-none border transition-all duration-200 ${
                        isLight
                          ? "bg-white border-slate-300 focus:border-slate-900 text-slate-900 placeholder:text-slate-400 shadow-sm"
                          : "bg-white/[0.02] border-white/12 focus:border-cyan-400 focus:bg-white/[0.05] text-white placeholder:text-neutral-500"
                      }`}
                    />
                  </div>

                  {/* Question 4: Discovery */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-discovery"
                      className={`contact-label text-[13px] sm:text-[14px] font-sans tracking-wide ${
                        isLight ? "text-slate-900 font-medium" : "text-slate-300 font-normal"
                      }`}
                    >
                      How did you find me?
                    </label>
                    <input
                      id="contact-discovery"
                      type="text"
                      value={discoverySource}
                      onChange={(e) => setDiscoverySource(e.target.value)}
                      placeholder="Google, Instagram, Linkedin.."
                      className={`contact-input w-full h-11 px-3.5 rounded-lg text-[13px] font-sans outline-none border transition-all duration-200 ${
                        isLight
                          ? "bg-white border-slate-300 focus:border-slate-900 text-slate-900 placeholder:text-slate-400 shadow-sm"
                          : "bg-white/[0.02] border-white/12 focus:border-cyan-400 focus:bg-white/[0.05] text-white placeholder:text-neutral-500"
                      }`}
                    />
                  </div>

                  {/* Question 5: Services Choice (Interactive Pill Tags) */}
                  <div className="flex flex-col gap-2.5">
                    <label
                      className={`contact-label text-[13px] sm:text-[14px] font-sans tracking-wide ${
                        isLight ? "text-slate-900 font-medium" : "text-slate-300 font-normal"
                      }`}
                    >
                      Which services do you need?
                    </label>

                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {SERVICES_OPTIONS.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-2 select-none ${
                              isSelected
                                ? isLight
                                  ? "bg-slate-900 text-white font-medium shadow-sm pill-selected"
                                  : "bg-white text-black font-semibold shadow-md shadow-white/10 pill-selected"
                                : isLight
                                ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80 pill-unselected"
                                : "bg-white/[0.03] border border-white/12 text-slate-300 hover:border-white/30 hover:bg-white/[0.07] pill-unselected"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                isSelected
                                  ? isLight
                                    ? "bg-cyan-400"
                                    : "bg-cyan-500"
                                  : "bg-white/30"
                              }`}
                            />
                            <span>{service}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Question 6: Tell me about your project */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-details"
                      className={`contact-label text-[13px] sm:text-[14px] font-sans tracking-wide ${
                        isLight ? "text-slate-900 font-medium" : "text-slate-300 font-normal"
                      }`}
                    >
                      Tell me about your project
                    </label>
                    <textarea
                      id="contact-details"
                      rows={3}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="What are you building?"
                      className={`contact-input w-full p-3.5 rounded-lg text-[13px] font-sans outline-none border resize-none transition-all duration-200 ${
                        isLight
                          ? "bg-white border-slate-300 focus:border-slate-900 text-slate-900 placeholder:text-slate-400 shadow-sm"
                          : "bg-white/[0.02] border-white/12 focus:border-cyan-400 focus:bg-white/[0.05] text-white placeholder:text-neutral-500"
                      }`}
                    />
                  </div>

                  {/* Submit Button Action */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <MagneticButton>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`contact-submit-btn w-full sm:w-auto px-7 h-11 rounded-full text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center gap-2.5 ${
                          isLight
                            ? "bg-slate-900 hover:bg-black text-white shadow-slate-900/10"
                            : "bg-white hover:bg-cyan-400 text-black shadow-white/10"
                        }`}
                      >
                        {isSubmitting ? (
                          <span>Transmitting...</span>
                        ) : (
                          <>
                            <span>Send Request</span>
                            <Send className="w-3 h-3 text-current" />
                          </>
                        )}
                      </button>
                    </MagneticButton>

                    <div className="contact-footer-info flex items-center gap-3.5 text-[10px] font-mono tracking-wider text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Confidential Enquiry</span>
                      </div>
                      <span>•</span>
                      <span>SOC 2 Type II ISMS</span>
                    </div>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success-right-refined"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 px-8 rounded-2xl border border-cyan-500/20 bg-cyan-950/10 flex flex-col items-center justify-center text-center gap-4 max-w-[580px]"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-white">
                    Request Received
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed max-w-[440px]">
                    Thank you, <strong>{name}</strong>! An Entersoft security coordinator will contact you at <strong>{email}</strong> within 2 business hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
