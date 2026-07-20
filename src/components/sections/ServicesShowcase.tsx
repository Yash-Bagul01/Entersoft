"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { services, Service } from "@/data/services";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceHoverCard from "../ui/ServiceHoverCard";

// useTextScramble character-scramble hook
function useTextScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  useEffect(() => {
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplay(text);
      return;
    }
    if (!trigger) {
      setDisplay(text);
      return;
    }
    let iteration = 0;
    const totalFrames = text.length * 2;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < iteration / 2) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= totalFrames) {
        clearInterval(interval);
        setDisplay(text);
      }
      iteration++;
    }, 18);
    return () => clearInterval(interval);
  }, [trigger, text]);
  
  return display;
}

interface ServiceRowProps {
  service: Service;
  index: number;
  isActive: boolean;
  isFinePointer: boolean;
  onHover: (service: Service | null) => void;
}

function ServiceRow({ service, index, isActive, isFinePointer, onHover }: ServiceRowProps) {
  const router = useRouter();
  const rowRef = useRef<HTMLDivElement>(null);
  const scrambledName = useTextScramble(service.displayName, isActive);
  
  useEffect(() => {
    const rowEl = rowRef.current;
    if (!rowEl) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    
    const yTo = gsap.quickTo(rowEl, "y", { duration: 0.4, ease: "power3.out" });
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = rowEl.getBoundingClientRect();
      const relY = e.clientY - (rect.top + rect.height / 2);
      yTo(relY * 0.06); // 6% of distance
    };
    
    const handleMouseLeave = () => {
      yTo(0);
    };
    
    rowEl.addEventListener("mousemove", handleMouseMove);
    rowEl.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      rowEl.removeEventListener("mousemove", handleMouseMove);
      rowEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!isActive) {
        e.preventDefault();
        onHover(service);
      } else {
        router.push(service.route);
      }
    } else if (e.key === "Escape") {
      onHover(null);
    }
  };

  const handleFocus = () => {
    onHover(service);
  };

  const handleBlur = () => {
    onHover(null);
  };

  const content = (
    <div 
      ref={rowRef}
      role="listitem"
      aria-label={`${service.displayName} — ${service.hoverCardHeading}`}
      aria-expanded={isActive ? "true" : "false"}
      tabIndex={0}
      onMouseEnter={() => isFinePointer && onHover(service)}
      onMouseLeave={() => isFinePointer && onHover(null)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={() => {
        router.push(service.route);
      }}
      className={`service-row group relative w-full flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-subtle)] cursor-pointer select-none transition-all duration-200 ease-out py-5 sm:py-0 h-auto sm:h-[64px] lg:h-[80px] px-4 md:px-6 overflow-visible ${
        isActive ? "bg-[rgba(0,163,255,0.04)]" : "bg-transparent"
      }`}
      data-cursor="card"
    >
      {/* Active neon left border indicator */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--accent)] transition-opacity duration-150" 
        style={{ opacity: isActive ? 1 : 0 }} 
      />

      {/* Animating borders */}
      {index === 0 && (
        <div className="service-row-border absolute top-0 left-0 right-0 h-[1px] bg-[var(--border-subtle)]" />
      )}
      <div className="service-row-border absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--border-subtle)]" />

      <div className="flex items-center gap-6 md:gap-12 w-full sm:w-auto">
        {/* Index number */}
        <span className={`index-number font-mono text-[13px] w-[40px] transition-colors duration-200 shrink-0 ${
          isActive ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"
        }`}>
          {service.index}
        </span>
        
        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
          {/* Display name */}
          <h3 className="display-name font-display font-medium text-[clamp(1.4rem,2.5vw,2.4rem)] tracking-tight text-[var(--text-primary)] leading-none uppercase transition-colors duration-200">
            {scrambledName}
          </h3>
          
          {/* Tablet Descriptor: shown below name on 640px - 1024px */}
          <span className={`descriptor-tablet font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 hidden sm:inline-block lg:hidden mt-1.5 ${
            isActive ? "text-[var(--text-secondary)]" : "text-[var(--text-tertiary)]"
          }`}>
            {service.descriptor}
          </span>
        </div>
      </div>

      {/* Descriptor & Arrow for desktop */}
      <div className="flex items-center gap-8 shrink-0 mt-3 sm:mt-0 justify-between sm:justify-end w-full sm:w-auto">
        {/* Desktop Descriptor */}
        <span className={`descriptor-desktop font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-200 hidden lg:inline-block ${
          isActive ? "text-[var(--text-secondary)]" : "text-[var(--text-tertiary)]"
        }`}>
          {service.descriptor}
        </span>

        {/* Arrow icon */}
        <span className={`arrow font-mono text-[14px] transition-all duration-200 ${
          isActive ? "text-[var(--accent)] translate-x-[6px] opacity-100" : "text-[var(--text-tertiary)] opacity-50"
        }`}>
          →
        </span>
      </div>

      {/* Mobile-only Descriptor under display name */}
      <div className={`w-full sm:hidden mt-2 font-mono text-[9px] uppercase tracking-wider ${
        isActive ? "text-[var(--text-secondary)]" : "text-[var(--text-tertiary)]"
      }`}>
        {service.descriptor}
      </div>
    </div>
  );

  return isFinePointer ? content : <Link href={service.route} className="block decoration-none">{content}</Link>;
}

export default function ServicesShowcase() {
  const [isMounted, setIsMounted] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);
  const xSetter = useRef<any>(null);
  const ySetter = useRef<any>(null);
  
  useEffect(() => {
    setIsMounted(true);
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!isMounted || !isFinePointer) return;
    
    const el = floatingCardRef.current;
    if (!el) return;
    
    xSetter.current = gsap.quickTo(el, "x", { duration: 0.45, ease: "power2.out" });
    ySetter.current = gsap.quickTo(el, "y", { duration: 0.45, ease: "power2.out" });
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (xSetter.current && ySetter.current) {
        const cardEl = el.querySelector(".service-hover-card") as HTMLElement;
        const cardWidth = cardEl && cardEl.offsetWidth > 100 ? cardEl.offsetWidth : 360;
        const cardHeight = cardEl && cardEl.offsetHeight > 100 ? cardEl.offsetHeight : 440;
        const padding = 20;
        
        let x = e.clientX + 20;
        let y = e.clientY + 20;
        
        if (x + cardWidth > window.innerWidth - padding) {
          x = e.clientX - cardWidth - 20;
        }
        
        if (y + cardHeight > window.innerHeight - padding) {
          y = window.innerHeight - cardHeight - padding;
        }
        
        if (x < padding) x = padding;
        if (y < padding) y = padding;
        
        xSetter.current(x);
        ySetter.current(y);
      }
    };
    
    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isMounted, isFinePointer]);

  useEffect(() => {
    if (!isMounted) return;
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([".header-block > *", ".word", ".service-row", ".service-row-border"], {
        opacity: 1,
        y: 0,
        scaleX: 1,
      });
      return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(".header-block > *", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out", 
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".header-block",
            start: "top 85%",
          }
        }
      );
      
      // 2. Supporting statement word opacity reveal
      gsap.fromTo(".word",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.035,
          delay: 0.4,
          scrollTrigger: {
            trigger: ".header-block",
            start: "top 85%",
          }
        }
      );
      
      // 3. Staggered row reveal
      gsap.fromTo(".service-row",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.2,
          scrollTrigger: {
            trigger: ".service-list",
            start: "top 85%",
          }
        }
      );

      // 4. Staggered border lines draw in
      gsap.fromTo(".service-row-border",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.28,
          scrollTrigger: {
            trigger: ".service-list",
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, [isMounted]);

  return (
    <div 
      id="services" 
      ref={containerRef} 
      className="relative bg-[#060606] w-full border-t border-[var(--border-subtle)] pb-24"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --accent-neon: #00A3FF;
          --accent-neon-rgb: 0,163,255;
        }
        
        .service-row-border {
          transform-origin: left;
        }
        
        .header-block:hover .right-instruction {
          color: var(--text-secondary);
        }
        
        .right-instruction:hover {
          color: var(--text-secondary);
        }
      `}} />
      
      {/* Header (Uniform for all viewports) */}
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 pt-24 pb-12">
        <div className="header-block flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 w-full">
            <span className="font-mono text-[12px] text-[var(--accent-neon)] uppercase tracking-[0.18em]">
              // ENTERPRISE SERVICES & MANAGED SOLUTIONS
            </span>
            <span className="right-instruction font-mono text-[12px] text-[var(--text-tertiary)] uppercase tracking-[0.14em] transition-colors duration-200 shrink-0">
              HOVER TO EXPLORE //
            </span>
          </div>
          
          <h2 className="text-display font-display font-medium text-[clamp(2.6rem,5vw,4.8rem)] text-[var(--text-primary)] uppercase tracking-tight leading-none">
            OUR CYBER ASSURANCE SYSTEM
          </h2>
          
          <p className="supporting-statement font-sans text-[clamp(15px,1.8vw,18px)] text-[var(--text-secondary)] leading-[1.6] mt-[1.2rem] max-w-[600px]">
            {"Seven integrated practices. One operating model to turn risk into validated decisions, remediation and continuous resilience."
              .split(" ")
              .map((word, i) => (
                <span key={i} className="word inline-block mr-[0.25em] transition-opacity duration-500">
                  {word}
                </span>
              ))}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="w-full h-px bg-[var(--border-subtle)] my-16" />
        
        <div className="relative w-full">
          {/* Main Editorial List */}
          <div role="list" className="service-list flex flex-col relative w-full">
            {services.map((service, index) => (
              <ServiceRow
                key={service.slug}
                service={service}
                index={index}
                isActive={activeService?.slug === service.slug}
                isFinePointer={isFinePointer}
                onHover={setActiveService}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Hover Card */}
      {isMounted && isFinePointer && (
        <div
          ref={floatingCardRef}
          className="pointer-events-none fixed z-[99999] top-0 left-0"
          style={{
            opacity: activeService ? 1 : 0,
            pointerEvents: "none",
            willChange: "transform, opacity",
            transition: "opacity 0.2s ease",
          }}
        >
          <ServiceHoverCard service={activeService} isVisible={activeService !== null} />
        </div>
      )}
    </div>
  );
}
