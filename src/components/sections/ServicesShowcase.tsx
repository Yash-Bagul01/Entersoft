"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { services, ServiceItem } from "@/data/services";
import SectionLabel from "../ui/SectionLabel";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getServiceHref = (id: string) => {
  switch (id) {
    case "appsec": return "/services/appsec";
    case "vapt": return "/services/vapt";
    case "cloud": return "/services/managed-cloud-security";
    case "compliance": return "/services/compliance-management";
    case "siem": return "/services/siem";
    case "smart-contract": return "/services/smart-contract-audits";
    case "ai-ast": return "/services/ai-ast";
    default: return `/services/${id}`;
  }
};

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

const getServiceImage = (id: string) => {
  switch (id) {
    case "appsec":
      return "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop";
    case "vapt":
      return "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop";
    case "cloud":
      return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop";
    case "compliance":
      return "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop";
    case "siem":
      return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop";
    case "smart-contract":
      return "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop";
    case "ai-ast":
      return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop";
    default:
      return "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop";
  }
};

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
          {screenType === "desktop" ? "HOVER TO VIEW PREVIEW //" : "SELECT COHORT TO AUDIT //"}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
        {/* DESKTOP VIEW */}
        {isMounted && screenType === "desktop" && (
          <div className="relative">
            <div className="flex flex-col border-t border-[var(--border-subtle)]">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={getServiceHref(service.id)}
                  className="service-row group flex items-center justify-between py-10 border-b border-[var(--border-subtle)] relative cursor-none select-none px-4 decoration-none"
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
                </Link>
              ))}
            </div>

            {/* Floating Preview Panel with High-Resolution Image */}
            <div
              ref={floatingCardRef}
              className="pointer-events-none fixed z-[99999] w-[300px] bg-[var(--bg-elevated)] backdrop-blur-md border rounded-[4px] overflow-hidden flex flex-col transition-[border-color] duration-300"
              style={{
                opacity: 0,
                scale: 0.93,
                transform: "translate(-50%, -50%)",
                willChange: "transform, opacity, scale",
                top: 0,
                left: 0,
                borderColor: "var(--text-primary)",
              }}
            >
              {activeService && (
                <div className="flex flex-col">
                  {/* Image wrapper */}
                  <div className="relative w-full h-[170px] overflow-hidden border-b border-[var(--text-primary)]">
                    <img 
                      src={getServiceImage(activeService.id)} 
                      alt={activeService.title} 
                      className="w-full h-full object-cover scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Meta Details */}
                  <div className="p-4 flex flex-col gap-2 bg-[var(--bg-elevated)]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                        {activeService.tag}
                      </span>
                      <span className="font-mono text-xs font-bold text-[var(--text-tertiary)]">
                        {activeService.index}
                      </span>
                    </div>
                    <h4 className="text-sm font-display font-medium text-[var(--text-primary)] uppercase tracking-tight leading-tight">
                      {activeService.title}
                    </h4>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TABLET VIEW */}
        {isMounted && screenType === "tablet" && (
          <div className="grid grid-cols-[1.2fr_1fr] gap-8">
            <div className="flex flex-col border-t border-[var(--border-subtle)]">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={getServiceHref(service.id)}
                  className={`flex flex-col gap-1 py-6 border-b text-left transition-colors duration-300 px-4 decoration-none ${
                    activeService?.id === service.id ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                  }`}
                  style={{
                    borderBottomColor: activeService?.id === service.id ? "var(--text-primary)" : "var(--border-subtle)"
                  }}
                  onMouseEnter={() => setActiveService(service)}
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
                </Link>
              ))}
            </div>

            <div className="relative">
              <div 
                className="sticky top-28 border bg-[var(--bg-elevated)] border-[var(--text-primary)] rounded-[4px] overflow-hidden flex flex-col min-h-[300px] transition-all duration-300"
              >
                {activeService && (
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col"
                  >
                    <div className="relative w-full h-[220px] overflow-hidden border-b border-[var(--text-primary)]">
                      <img 
                        src={getServiceImage(activeService.id)} 
                        alt={activeService.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-6 flex flex-col gap-3 bg-[var(--bg-elevated)]">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                          {activeService.tag}
                        </span>
                        <span className="font-mono text-2xl font-bold text-[var(--text-tertiary)]/40">
                          {activeService.index}
                        </span>
                      </div>

                      <div className="relative z-10 flex flex-col gap-1">
                        <h3 className="text-xl font-display font-medium text-[var(--text-primary)] uppercase tracking-tight">
                          {activeService.title}
                        </h3>
                      </div>
                    </div>
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
                    borderBottomColor: isOpen ? "var(--text-primary)" : "var(--border-subtle)"
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
                    <div className="pb-6 pt-2 flex flex-col gap-4 pl-8 pr-2">
                      <div className="font-mono text-[9px] font-bold uppercase tracking-wider"
                        style={{ color: getServiceColor(service.id) }}
                      >
                        {service.tag}
                      </div>

                      <div className="relative w-full h-[180px] rounded-[4px] overflow-hidden border border-[var(--text-primary)]">
                        <img 
                          src={getServiceImage(service.id)} 
                          alt={service.title} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex justify-start pt-2">
                        <Link
                          href={getServiceHref(service.id)}
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] underline transition-colors"
                        >
                          Explore Service <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
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
