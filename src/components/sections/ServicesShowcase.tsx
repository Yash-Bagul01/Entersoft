"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Familjen_Grotesk } from "next/font/google";
import { services, type Service } from "@/data/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePlatformTransition } from "@/components/layout/PlatformPageTransition";
import { cn } from "@/lib/utils";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const captionEase = [0.22, 1, 0.36, 1] as const;

export default function ServicesShowcase() {
  const router = useRouter();
  const transition = usePlatformTransition();
  const reduce = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const active = services[activeIndex] ?? services[0];
  const stackDown = activeIndex >= prevIndex;

  useEffect(() => {
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const setActive = (index: number) => {
    setActiveIndex((current) => {
      if (current === index) return current;
      setPrevIndex(current);
      return index;
    });
  };

  const onNameEnter = (index: number) => {
    if (!isFinePointer) return;
    setActive(index);
  };

  const goToService = (service: Service) => {
    if (transition) {
      transition.to(service.route, service.displayName);
      return;
    }
    router.push(service.route);
  };

  const onNameClick = (service: Service, index: number) => {
    if (!isFinePointer && activeIndex !== index) {
      setActive(index);
      return;
    }
    goToService(service);
  };

  return (
    <section
      id="services"
      className={cn(
        familjen.className,
        "relative z-[8] w-full bg-[#f6f5f0] text-[#060606] border-t border-[#060606]/10 md:-mt-[100vh]"
      )}
    >
      <div className="relative w-full flex flex-col justify-start px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
          <header className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <h2 className="font-normal text-[clamp(2.75rem,5.94vw,5.344rem)] leading-[0.95] tracking-[-0.06em] text-[#060606]">
                Enterprise Services
              </h2>
              <p className="font-normal text-[clamp(1.05rem,1.6vw,1.35rem)] leading-snug tracking-[-0.02em] text-[#060606] max-w-[36rem]">
                Security starts at the application layer, but it does not stop there.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3 lg:pt-2">
              <p className="text-[16px] sm:text-[17px] leading-[1.55] tracking-[-0.015em] text-[#3d3d3a] max-w-[42rem]">
                Applications concentrate business logic, customer data, identities, APIs and cloud services. Entersoft starts with the software that runs the business, then connects application risk to the infrastructure, identities, controls and operations around it.
              </p>
              <p className="text-[12px] uppercase tracking-[0.14em] text-[#888a8b]">
                {isFinePointer ? "Hover to explore" : "Tap to explore"}
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mt-8 lg:mt-10">
            <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4 w-full max-w-[340px]">
              <div className="relative w-full aspect-[5/4] rounded-[16px] overflow-hidden bg-[#111] shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
                {services.map((service, index) => {
                  const isOn = index === activeIndex;
                  const y = isOn ? "0%" : index < activeIndex ? "-108%" : "108%";
                  return (
                    <div
                      key={service.slug}
                      className="absolute inset-0 will-change-transform"
                      style={{
                        transform: `translate3d(0, ${y}, 0)`,
                        transition: reduce
                          ? "none"
                          : "transform 0.72s cubic-bezier(0.22, 1, 0.36, 1)",
                        zIndex: isOn ? 2 : 1,
                      }}
                    >
                      <Image
                        src={service.image}
                        alt={service.displayName}
                        fill
                        sizes="340px"
                        quality={85}
                        className={cn(
                          "object-cover",
                          isOn && !reduce && "scale-105"
                        )}
                        style={{
                          transition: reduce ? "none" : "transform 8s ease-out",
                        }}
                        priority={index < 2}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="min-h-[7.5rem] relative">
                <AnimatePresence mode="wait" initial={false}>
                  {active && (
                    <motion.div
                      key={active.slug}
                      initial={reduce ? false : { opacity: 0, y: stackDown ? 14 : -14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: stackDown ? -10 : 10 }}
                      transition={{ duration: 0.38, ease: captionEase }}
                      className="flex flex-col gap-2"
                    >
                      <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#060606] leading-snug">
                        {active.hoverCardHeading}
                      </p>
                      <p className="text-[15px] leading-[1.45] text-[#060606]/80">
                        {active.hoverCardBody}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <nav
              aria-label="Enterprise services"
              className="lg:col-span-8 xl:col-span-9 flex flex-col justify-start gap-1.5 lg:gap-2"
            >
              {services.map((service, index) => {
                const isActive = index === activeIndex;
                const name = (
                  <span className="block font-bold tracking-[-0.035em] leading-[0.98] text-[clamp(1.65rem,4.15vw,4.35rem)]">
                    {service.displayName}
                  </span>
                );

                const className = cn(
                  "group text-left w-full py-[0.18em] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive ? "text-[#060606]" : "text-[#888a8b] hover:text-[#5e5e5a]"
                );

                if (!isFinePointer) {
                  return (
                    <Link
                      key={service.slug}
                      href={service.route}
                      className={className}
                      aria-current={isActive ? "page" : undefined}
                      onFocus={() => setActive(index)}
                    >
                      {name}
                    </Link>
                  );
                }

                return (
                  <button
                    key={service.slug}
                    type="button"
                    className={className}
                    aria-current={isActive ? "true" : undefined}
                    onMouseEnter={() => onNameEnter(index)}
                    onFocus={() => onNameEnter(index)}
                    onClick={() => onNameClick(service, index)}
                  >
                    {name}
                  </button>
                );
              })}
            </nav>
          </div>
      </div>
    </section>
  );
}
