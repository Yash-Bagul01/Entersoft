"use client";

import React, { useEffect, useRef, useState } from "react";
import { services, ServiceItem } from "@/data/services";
import SectionLabel from "../ui/SectionLabel";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Unique premium neon colors for each cybersecurity service
const getServiceColor = (id: string) => {
  switch (id) {
    case "appsec": return "#00A3FF"; // Neon Blue
    case "vapt": return "#BD00FF"; // Neon Purple
    case "cloud": return "#00FF85"; // Neon Emerald Green
    case "compliance": return "#FFB800"; // Neon Gold
    case "siem": return "#FF3E3E"; // Neon Red-Orange
    case "smart-contract": return "#FF007A"; // Neon Pink
    case "ai-ast": return "#00F0FF"; // Neon Ice Blue/Cyan
    default: return "#00A3FF";
  }
};

// Helper component to render bespoke dark cyber abstract graphics
function AbstractGraphic({ type }: { type: string }) {
  switch (type) {
    case "terminal":
      return (
        <svg className="w-full h-full text-[var(--service-color,var(--accent))] opacity-50 transition-colors duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="10" width="90" height="80" rx="3" stroke="currentColor" strokeWidth="0.75" />
          <line x1="5" y1="22" x2="95" y2="22" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="12" cy="16" r="1.5" fill="currentColor" />
          <circle cx="18" cy="16" r="1.5" fill="currentColor" />
          <circle cx="24" cy="16" r="1.5" fill="currentColor" />
          <path d="M12 35 L20 40 L12 45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="24" y1="45" x2="45" y2="45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="60" x2="65" y2="60" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
          <line x1="12" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
          <line x1="12" y1="80" x2="50" y2="80" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
        </svg>
      );
    case "shield":
      return (
        <svg className="w-full h-full text-[var(--service-color,var(--accent))] opacity-50 transition-colors duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 12 L85 22 V50 C85 71 70 90 50 95 C30 90 15 71 15 50 V22 L50 12 Z" stroke="currentColor" strokeWidth="1" />
          <path d="M50 20 L77 28 V48 C77 65 65 80 50 85 C35 80 23 65 23 48 V28 L50 20 Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="38" x2="50" y2="62" stroke="currentColor" strokeWidth="1" />
          <line x1="38" y1="50" x2="62" y2="50" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "network":
      return (
        <svg className="w-full h-full text-[var(--service-color,var(--accent))] opacity-45 transition-colors duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="5" fill="currentColor" />
          
          <circle cx="30" cy="25" r="3" fill="currentColor" />
          <circle cx="75" cy="35" r="3.5" fill="currentColor" />
          <circle cx="68" cy="70" r="3" fill="currentColor" />
          <circle cx="22" cy="60" r="4" fill="currentColor" />
          
          <line x1="50" y1="50" x2="30" y2="25" stroke="currentColor" strokeWidth="0.75" />
          <line x1="50" y1="50" x2="75" y2="35" stroke="currentColor" strokeWidth="0.75" />
          <line x1="50" y1="50" x2="68" y2="70" stroke="currentColor" strokeWidth="0.75" />
          <line x1="50" y1="50" x2="22" y2="60" stroke="currentColor" strokeWidth="0.75" />
          <line x1="30" y1="25" x2="75" y2="35" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <line x1="75" y1="35" x2="68" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <line x1="68" y1="70" x2="22" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <line x1="22" y1="60" x2="30" y2="25" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        </svg>
      );
    case "compliance":
      return (
        <svg className="w-full h-full text-[var(--service-color,var(--accent))] opacity-50 transition-colors duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="15" width="70" height="70" rx="4" stroke="currentColor" strokeWidth="1" />
          
          <rect x="25" y="28" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
          <path d="M28 33 L31 36 L37 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="42" y1="33" x2="75" y2="33" stroke="currentColor" strokeWidth="1" />
          
          <rect x="25" y="48" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
          <path d="M28 53 L31 56 L37 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="42" y1="53" x2="70" y2="53" stroke="currentColor" strokeWidth="1" />
          
          <rect x="25" y="68" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
          <path d="M28 73 L31 76 L37 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="42" y1="73" x2="62" y2="73" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "database":
      return (
        <svg className="w-full h-full text-[var(--service-color,var(--accent))] opacity-45 transition-colors duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="25" rx="30" ry="10" stroke="currentColor" strokeWidth="1" />
          
          <path d="M20 25 V45 C20 50.5 33.4 55 50 55 C66.6 55 80 50.5 80 45 V25" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="50" cy="45" rx="30" ry="10" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          
          <path d="M20 45 V65 C20 70.5 33.4 75 50 75 C66.6 75 80 70.5 80 65 V45" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="50" cy="65" rx="30" ry="10" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />

          <path d="M20 65 V80 C20 85.5 33.4 90 50 90 C66.6 90 80 85.5 80 80 V65" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="50" cy="80" rx="30" ry="10" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      );
    case "binary":
      return (
        <svg className="w-full h-full text-[var(--service-color,var(--accent))] opacity-40 transition-colors duration-300 font-mono text-[9px]" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="25">01101001</text>
          <text x="50" y="25" opacity="0.5">1011</text>
          <text x="25" y="45" opacity="0.6">110010</text>
          <text x="10" y="65">001101</text>
          <text x="60" y="65" opacity="0.4">10010110</text>
          <text x="35" y="85">11011001</text>
          <line x1="8" y1="28" x2="92" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <line x1="8" y1="48" x2="92" y2="48" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <line x1="8" y1="68" x2="92" y2="68" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        </svg>
      );
    case "ai":
      return (
        <svg className="w-full h-full text-[var(--service-color,var(--accent))] opacity-50 transition-colors duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 50 C 35 30, 65 30, 80 50" stroke="currentColor" strokeWidth="0.75" />
          <path d="M20 50 C 35 70, 65 70, 80 50" stroke="currentColor" strokeWidth="0.75" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="20" cy="50" r="4" fill="currentColor" />
          <circle cx="80" cy="50" r="4" fill="currentColor" />
          <circle cx="38" cy="38" r="2" fill="currentColor" />
          <circle cx="62" cy="38" r="2" fill="currentColor" />
          <circle cx="38" cy="62" r="2" fill="currentColor" />
          <circle cx="62" cy="62" r="2" fill="currentColor" />
          <circle cx="50" cy="50" r="6" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="2" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ServicesShowcase() {
  const [screenType, setScreenType] = useState<"desktop" | "tablet" | "mobile">("mobile");
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [activeMobileId, setActiveMobileId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const floatingCardRef = useRef<HTMLDivElement>(null);
  const xSetter = useRef<any>(null);
  const ySetter = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenType("desktop");
      } else if (width >= 768) {
        setScreenType("tablet");
      } else {
        setScreenType("mobile");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize GSAP quickTo setters for desktop float preview
  useEffect(() => {
    if (screenType === "desktop" && floatingCardRef.current) {
      xSetter.current = gsap.quickTo(floatingCardRef.current, "x", { duration: 0.3, ease: "power3.out" });
      ySetter.current = gsap.quickTo(floatingCardRef.current, "y", { duration: 0.3, ease: "power3.out" });
    }
  }, [screenType, isMounted]);

  // Set the first service active by default on tablet to avoid empty column
  useEffect(() => {
    if (screenType === "tablet" && !activeService && services.length > 0) {
      setActiveService(services[0]);
    }
  }, [screenType, activeService]);

  const handleMouseEnter = (service: ServiceItem, e: React.MouseEvent) => {
    setActiveService(service);
    if (floatingCardRef.current) {
      // Set initial position immediately to avoid jump
      gsap.set(floatingCardRef.current, {
        x: e.clientX,
        y: e.clientY,
      });
      gsap.to(floatingCardRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (floatingCardRef.current) {
      gsap.to(floatingCardRef.current, {
        opacity: 0,
        scale: 0.93,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xSetter.current && ySetter.current) {
      xSetter.current(e.clientX);
      ySetter.current(e.clientY);
    }
  };

  return (
    <div id="services" className="relative bg-[#060606] w-full border-t border-[var(--border-subtle)]">
      {/* Header (Uniform for all viewports) */}
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 pt-24 pb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <SectionLabel color="secondary">SECURITY CAPABILITIES</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-display font-medium text-[#F6F5F0] uppercase tracking-tight mt-2">
            Our Security Spectrum
          </h2>
        </div>
        <div className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-widest pb-1">
          {screenType === "desktop" ? "HOVER TO DECRYPT METADATA //" : "SELECT COHORT TO AUDIT //"}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
        {/* DESKTOP VIEW */}
        {isMounted && screenType === "desktop" && (
          <div className="relative">
            <div className="flex flex-col border-t border-[var(--border-subtle)]">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="service-row group flex items-center justify-between py-10 border-b border-[var(--border-subtle)] relative cursor-none select-none px-4"
                  style={{ "--service-color": getServiceColor(service.id) } as React.CSSProperties}
                  onMouseEnter={(e) => handleMouseEnter(service, e)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                >
                  <div className="flex items-center gap-12">
                    <span className="font-mono text-sm font-bold text-[var(--text-tertiary)] opacity-40 group-hover:text-[var(--service-color)] group-hover:opacity-100 transition-all duration-300">
                      {service.index}
                    </span>
                    <h3 className="text-3xl lg:text-4xl xl:text-5xl font-display font-medium text-[#F6F5F0] uppercase tracking-tight group-hover:translate-x-6 group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {service.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--text-tertiary)] opacity-30 group-hover:text-[var(--service-color)] group-hover:opacity-100 transition-all duration-300">
                    {service.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Floating Preview Panel with Dynamic Service Colors */}
            <div
              ref={floatingCardRef}
              className="pointer-events-none fixed z-[99999] w-[380px] bg-[#0F0F0F]/95 backdrop-blur-md border rounded-[4px] p-6 flex flex-col gap-6 transition-[border-color,box-shadow] duration-300"
              style={{
                opacity: 0,
                scale: 0.93,
                transform: "translate(-50%, -50%)",
                willChange: "transform, opacity, scale",
                top: 0,
                left: 0,
                borderColor: activeService ? getServiceColor(activeService.id) : "var(--border-subtle)",
                boxShadow: activeService 
                  ? `0 10px 30px ${getServiceColor(activeService.id)}25` 
                  : "none",
                ["--service-color" as any]: activeService ? getServiceColor(activeService.id) : "var(--accent)"
              }}
            >
              {activeService && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300"
                      style={{ color: getServiceColor(activeService.id) }}
                    >
                      {activeService.tag}
                    </span>
                    <span className="font-mono text-2xl font-bold text-[var(--text-tertiary)] opacity-30">
                      {activeService.index}
                    </span>
                  </div>

                  <div className="w-full h-32 border-y border-[var(--border-subtle)] py-4 flex items-center justify-center bg-black/[0.2] rounded-[2px] overflow-hidden">
                    <AbstractGraphic type={activeService.abstractType} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-display font-semibold text-[#F6F5F0] uppercase tracking-tight">
                      {activeService.title}
                    </h4>
                    <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-sans">
                      {activeService.description}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider transition-colors duration-300"
                    style={{ color: getServiceColor(activeService.id) }}
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* TABLET VIEW */}
        {isMounted && screenType === "tablet" && (
          <div className="grid grid-cols-[1.2fr_1fr] gap-8">
            <div className="flex flex-col border-t border-[var(--border-subtle)]">
              {services.map((service) => (
                <button
                  key={service.id}
                  className={`flex flex-col gap-1 py-6 border-b text-left transition-colors duration-300 px-4 ${
                    activeService?.id === service.id ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                  }`}
                  style={{
                    borderBottomColor: activeService?.id === service.id ? getServiceColor(service.id) : "var(--border-subtle)"
                  }}
                  onMouseEnter={() => setActiveService(service)}
                  onClick={() => setActiveService(service)}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold transition-colors duration-300"
                      style={{
                        color: activeService?.id === service.id ? getServiceColor(service.id) : "var(--text-tertiary)"
                      }}
                    >
                      {service.index}
                    </span>
                    <h3 className="text-xl font-display font-medium uppercase transition-colors duration-300"
                      style={{
                        color: activeService?.id === service.id ? getServiceColor(service.id) : "#F6F5F0"
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--text-tertiary)] opacity-55 pl-8">
                    {service.tag}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative">
              <div 
                className="sticky top-28 border bg-[#0F0F0F] rounded-[4px] p-8 flex flex-col gap-6 min-h-[400px] transition-all duration-300"
                style={{
                  borderColor: activeService ? getServiceColor(activeService.id) : "var(--border-subtle)",
                  boxShadow: activeService 
                    ? `0 10px 30px ${getServiceColor(activeService.id)}18` 
                    : "none",
                  ["--service-color" as any]: activeService ? getServiceColor(activeService.id) : "var(--accent)"
                }}
              >
                {activeService && (
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300"
                        style={{ color: getServiceColor(activeService.id) }}
                      >
                        {activeService.tag}
                      </span>
                      <span className="font-mono text-3xl font-bold text-[var(--text-tertiary)] opacity-30">
                        {activeService.index}
                      </span>
                    </div>

                    <div className="w-full h-36 border-y border-[var(--border-subtle)] py-4 flex items-center justify-center bg-black/[0.1] rounded-[2px]">
                      <AbstractGraphic type={activeService.abstractType} />
                    </div>

                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-display font-semibold text-[#F6F5F0] uppercase tracking-tight">
                        {activeService.title}
                      </h3>
                      <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-sans">
                        {activeService.description}
                      </p>
                    </div>

                    <a
                      href={activeService.link}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider mt-2 transition-colors duration-300"
                      style={{ color: getServiceColor(activeService.id) }}
                    >
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MOBILE VIEW & HYDRATION SEO FALLBACK */}
        {(!isMounted || screenType === "mobile") && (
          <div className="flex flex-col border-t border-[var(--border-subtle)]">
            {services.map((service) => {
              const isOpen = activeMobileId === service.id;
              return (
                <div 
                  key={service.id} 
                  className="border-b transition-colors duration-300"
                  style={{
                    borderBottomColor: isOpen ? getServiceColor(service.id) : "var(--border-subtle)",
                    ["--service-color" as any]: getServiceColor(service.id)
                  }}
                >
                  <button
                    onClick={() => setActiveMobileId(isOpen ? null : service.id)}
                    className="w-full py-6 flex items-center justify-between text-left px-2"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold transition-colors duration-300"
                        style={{ color: isOpen ? getServiceColor(service.id) : "var(--text-tertiary)" }}
                      >
                        {service.index}
                      </span>
                      <h3 className="text-lg font-display font-medium uppercase transition-colors duration-300"
                        style={{ color: isOpen ? getServiceColor(service.id) : "#F6F5F0" }}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <span className="text-xl font-mono transition-transform duration-300"
                      style={{ color: isOpen ? getServiceColor(service.id) : "var(--text-tertiary)" }}
                    >
                      +
                    </span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    className="overflow-hidden"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="pb-8 pt-2 flex flex-col gap-6 pl-8 pr-2">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: getServiceColor(service.id) }}
                      >
                        {service.tag}
                      </div>

                      <div className="w-full h-32 border-y border-[var(--border-subtle)] py-2 flex items-center justify-center bg-black/[0.1] rounded-[2px]">
                        <AbstractGraphic type={service.abstractType} />
                      </div>

                      <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-sans">
                        {service.description}
                      </p>

                      <a
                        href={service.link}
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider mt-2 transition-colors duration-300"
                        style={{ color: getServiceColor(service.id) }}
                      >
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
