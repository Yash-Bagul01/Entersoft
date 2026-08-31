"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
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
    
    const yTo = gsap.quickTo(rowEl, "y", { duration: 0.35, ease: "power2.out" });
    const xTo = gsap.quickTo(rowEl, "x", { duration: 0.35, ease: "power2.out" });
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = rowEl.getBoundingClientRect();
      const relY = e.clientY - (rect.top + rect.height / 2);
      const relX = e.clientX - (rect.left + rect.width / 2);
      yTo(relY * 0.05); // subtle vertical magnetic response
      xTo(Math.max(-8, Math.min(8, relX * 0.01))); // subtle horizontal response
    };
    
    const handleMouseLeave = () => {
      yTo(0);
      xTo(0);
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
        
        <div className="flex flex-col gap-1 py-1">
          {/* Eyebrow: Plain-Language Category */}
          <span className={`font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.12em] transition-colors duration-200 ${
            isActive ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"
          }`}>
            {service.category}
          </span>
          
          {/* Primary Branded Title */}
          <h3 className="display-name font-display font-medium text-[clamp(1.3rem,2.2vw,2.2rem)] tracking-tight text-[var(--text-primary)] leading-none transition-colors duration-200">
            {scrambledName}
          </h3>
          
          {/* Tablet Descriptor: shown below name on 640px - 1024px */}
          <span className={`descriptor-tablet font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 hidden sm:inline-block lg:hidden mt-1 ${
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
  
  // Physics & Animation State Refs
  const mouseTarget = useRef({ x: -500, y: -500 });
  const currentPos = useRef({ x: -500, y: -500 });
  const prevMouse = useRef({ x: 0, y: 0 });
  const mouseVelocity = useRef({ x: 0, y: 0 });
  const currentRotation = useRef(0);
  const currentSkew = useRef(0);
  const currentTiltX = useRef(0);
  const currentScale = useRef(0.8);
  const currentOpacity = useRef(0);
  
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    isHoveredRef.current = activeService !== null;
  }, [activeService]);

  useEffect(() => {
    setIsMounted(true);
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  // Physics animation loop: tracks mouse position, velocity, scroll delta, tilt, and skew
  useEffect(() => {
    if (!isMounted || !isFinePointer) return;

    const el = floatingCardRef.current;
    if (!el) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const cardWidth = 360;
      const cardHeight = 440;
      const padding = 24;

      let targetX = e.clientX + 24;
      let targetY = e.clientY + 24;

      // Smart collision boundary detection: flips to left side of cursor if close to right edge
      if (targetX + cardWidth > window.innerWidth - padding) {
        targetX = e.clientX - cardWidth - 24;
      }
      if (targetY + cardHeight > window.innerHeight - padding) {
        targetY = window.innerHeight - cardHeight - padding;
      }
      if (targetX < padding) targetX = padding;
      if (targetY < padding) targetY = padding;

      mouseTarget.current = { x: targetX, y: targetY };

      // Calculate instantaneous mouse velocity
      const vx = e.clientX - prevMouse.current.x;
      const vy = e.clientY - prevMouse.current.y;
      prevMouse.current = { x: e.clientX, y: e.clientY };

      mouseVelocity.current = {
        x: vx,
        y: vy,
      };
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY || window.pageYOffset;
      scrollVelocity.current = currentScroll - lastScrollY.current;
      lastScrollY.current = currentScroll;
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Main 60fps/120fps physics loop with LERP and dynamic skew/tilt/rotation
    const LERP_POS = 0.12; // Smooth tracking lag
    const LERP_ROT = 0.08; // Fluid inertia decay
    const LERP_SCALE = 0.15; // Snappy entry/exit scaling

    const tick = () => {
      // Decay velocity over time when mouse is stationary
      mouseVelocity.current.x *= 0.92;
      mouseVelocity.current.y *= 0.92;
      scrollVelocity.current *= 0.88;

      // 1. Position LERP
      currentPos.current.x += (mouseTarget.current.x - currentPos.current.x) * LERP_POS;
      currentPos.current.y += (mouseTarget.current.y - currentPos.current.y) * LERP_POS;

      // 2. Velocity-driven dynamic rotation (mouse X movement + scroll velocity)
      const targetRotation = Math.max(-14, Math.min(14, (mouseVelocity.current.x * 0.15) + (scrollVelocity.current * 0.25)));
      currentRotation.current += (targetRotation - currentRotation.current) * LERP_ROT;

      // 3. Dynamic horizontal skew based on lateral acceleration
      const targetSkew = Math.max(-8, Math.min(8, mouseVelocity.current.x * 0.07));
      currentSkew.current += (targetSkew - currentSkew.current) * LERP_ROT;

      // 4. Subtle 3D tilt pitch based on vertical velocity
      const targetTiltX = Math.max(-10, Math.min(10, -mouseVelocity.current.y * 0.08));
      currentTiltX.current += (targetTiltX - currentTiltX.current) * LERP_ROT;

      // 5. Scale & Opacity spring
      const targetScale = isHoveredRef.current ? 1.0 : 0.8;
      const targetOpacity = isHoveredRef.current ? 1.0 : 0.0;
      currentScale.current += (targetScale - currentScale.current) * LERP_SCALE;
      currentOpacity.current += (targetOpacity - currentOpacity.current) * LERP_SCALE;

      // Apply hardware accelerated direct transforms
      if (el) {
        el.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) scale(${currentScale.current}) rotate(${currentRotation.current}deg) skewX(${currentSkew.current}deg) rotateX(${currentTiltX.current}deg)`;
        el.style.opacity = `${currentOpacity.current}`;
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
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

        .service-row {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}} />
      
      {/* Header (Uniform for all viewports) */}
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 pt-14 pb-3">
        <div className="header-block flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 w-full">
            <span className="font-mono text-[12px] text-[var(--accent-neon)] tracking-[0.18em]">
              Enterprise Services & Managed Solutions
            </span>
            <span className="right-instruction font-mono text-[12px] text-[var(--text-tertiary)] uppercase tracking-[0.14em] transition-colors duration-200 shrink-0">
              {isFinePointer ? "HOVER TO EXPLORE" : "TAP TO EXPLORE"}
            </span>
          </div>
          
          <h2 className="text-display font-display font-semibold text-[clamp(1.8rem,3.8vw,3.2rem)] text-[var(--text-primary)] tracking-[-0.03em] leading-tight max-w-[850px]">
            Security starts at the application layer, but it does not stop there.
          </h2>
          
          <p className="supporting-statement font-sans text-[clamp(14px,1.6vw,17px)] text-[var(--text-secondary)] leading-[1.5] mt-2.5 max-w-[750px]">
            {"Applications concentrate business logic, customer data, identities, APIs and cloud services. Entersoft starts with the software that runs the business, then connects application risk to the infrastructure, identities, controls and operations around it."
              .split(" ")
              .map((word, i, arr) => (
                <React.Fragment key={i}>
                  <span className="word inline-block transition-opacity duration-500" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                    {word}
                  </span>
                  {i < arr.length - 1 ? ' ' : ''}
                </React.Fragment>
              ))}
          </p>
        </div>
      </div>
                    
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="w-full h-px bg-[var(--border-subtle)] mt-3 mb-6" />
        
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

      {/* Floating Hover Card with Fluid Mouse Scroll & Velocity Skew */}
      {isMounted && isFinePointer && (
        <div
          ref={floatingCardRef}
          className="pointer-events-none fixed z-[99999] top-0 left-0 transform-gpu"
          style={{
            opacity: 0,
            pointerEvents: "none",
            willChange: "transform, opacity",
            transformOrigin: "center center",
          }}
        >
          <ServiceHoverCard service={activeService} isVisible={activeService !== null} />
        </div>
      )}
    </div>
  );
}
