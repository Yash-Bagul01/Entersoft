"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { Familjen_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const MOTION_IMAGES = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1600&q=80",
] as const;

const SHOTS = services.slice(0, 6).map((service, index) => ({
  ...service,
  image: MOTION_IMAGES[index],
}));

const GRID_RADIUS = 28;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function DesignInMotion() {
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const topWordRef = useRef<HTMLHeadingElement>(null);
  const botWordRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [svgArcPath, setSvgArcPath] = useState("");
  const [svgInnerArcPath, setSvgInnerArcPath] = useState("");
  const lastArcRef = useRef("");
  const lastInnerArcRef = useRef("");

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const topWord = topWordRef.current;
    const botWord = botWordRef.current;
    const caption = captionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLAnchorElement[];
    if (!root || !pin || !stage || !topWord || !botWord || cards.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const computeLayout = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 768;
      const cx = vw * 0.5;
      const cy = vh * (isMobile ? 1.18 : 1.12);
      const R = Math.min(vw * (isMobile ? 0.72 : 0.58), vh * (isMobile ? 0.7 : 0.8));
      const Rinner = R * 0.86;
      const startAngle = -Math.PI * 0.55;
      const endAngle = Math.PI * 0.55;
      const x1 = cx + R * Math.sin(startAngle);
      const y1 = cy - R * Math.cos(startAngle);
      const x2 = cx + R * Math.sin(endAngle);
      const y2 = cy - R * Math.cos(endAngle);
      const arc = `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`;
      const ix1 = cx + Rinner * Math.sin(startAngle);
      const iy1 = cy - Rinner * Math.cos(startAngle);
      const ix2 = cx + Rinner * Math.sin(endAngle);
      const iy2 = cy - Rinner * Math.cos(endAngle);
      const inner = `M ${ix1} ${iy1} A ${Rinner} ${Rinner} 0 0 1 ${ix2} ${iy2}`;
      if (lastArcRef.current !== arc) {
        lastArcRef.current = arc;
        setSvgArcPath(arc);
      }
      if (lastInnerArcRef.current !== inner) {
        lastInnerArcRef.current = inner;
        setSvgInnerArcPath(inner);
      }
      return { vw, vh, isMobile, cx, cy, R };
    };

    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (!desktop || shouldReduceMotion) {
      const { vw, vh, isMobile } = computeLayout();
      const cols = isMobile ? 2 : 3;
      const cardW = isMobile ? Math.min(vw * 0.43, 240) : Math.min((vw - 72 - 32) / 3, 445);
      const cardH = cardW * 0.62;
      const gapX = Math.max(12, vw * 0.02);
      const gapY = Math.max(12, vh * 0.02);
      const startX = (vw - (cardW * cols + gapX * (cols - 1))) / 2;
      const startY = vh * 0.2;
      cards.forEach((card, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        gsap.set(card, {
          x: startX + col * (cardW + gapX),
          y: startY + row * (cardH + gapY),
          width: cardW,
          height: cardH,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          borderRadius: GRID_RADIUS,
        });
        const copy = card.querySelector<HTMLElement>("[data-motion-copy]");
        if (copy) gsap.set(copy, { autoAlpha: 1 });
      });
      gsap.set([topWord, botWord], { x: 0, opacity: 1 });
      if (caption) gsap.set(caption, { opacity: 1 });
      return;
    }

    let tickDrive: (() => void) | null = null;
    const ctx = gsap.context(() => {
      const sizePin = () => {
        pin.style.height = `${Math.round(window.innerHeight * 3.4)}px`;
      };
      sizePin();

      const placeStage = (progress: number) => {
        if (progress <= 0) {
          gsap.set(stage, { position: "absolute", top: 0, bottom: "auto", left: 0, right: 0 });
        } else if (progress >= 1) {
          gsap.set(stage, { position: "absolute", top: "auto", bottom: 0, left: 0, right: 0 });
        } else {
          gsap.set(stage, { position: "fixed", top: 0, bottom: "auto", left: 0, right: 0 });
        }
      };

      const drive = () => {
        const rect = pin.getBoundingClientRect();
        const range = Math.max(1, pin.offsetHeight - window.innerHeight);
        const p = gsap.utils.clamp(0, 1, -rect.top / range);
        placeStage(p);

        const { vw, vh, isMobile, cx, cy, R } = computeLayout();
        const rise = gsap.utils.clamp(0, 1, p / 0.58);
        const unfold = gsap.utils.clamp(0, 1, (p - 0.56) / 0.3);
        const eased = easeInOutCubic(unfold);

        gsap.set(topWord, {
          x: gsap.utils.interpolate(vw * 0.06, -vw * 0.42, rise),
          opacity: 1 - eased * 0.85,
          force3D: true,
        });
        gsap.set(botWord, {
          x: gsap.utils.interpolate(-vw * 0.04, vw * 0.4, rise),
          opacity: 1 - eased * 0.85,
          force3D: true,
        });
        if (caption) gsap.set(caption, { opacity: 1 - eased * 0.75 });

        const cardWWheel = Math.min(vw * 0.22, 320);
        const cardHWheel = cardWWheel * 0.64;
        const cols = 3;
        const cardWGrid = Math.min((vw - 72 - 32) / 3, 445);
        const cardHGrid = cardWGrid * 0.62;
        const gapX = Math.max(14, vw * 0.014);
        const gapY = Math.max(14, vh * 0.02);
        const startX = (vw - (cardWGrid * cols + gapX * (cols - 1))) / 2;
        const startY = vh * 0.2;
        const wheelRotation = gsap.utils.interpolate(1.28, -0.18, rise);
        const spacing = isMobile ? 0.34 : 0.3;

        cards.forEach((card, idx) => {
          const wave = gsap.utils.clamp(0, 1, (unfold - idx * 0.04) / 0.78);
          const u = easeInOutCubic(wave);
          const angle = wheelRotation + (idx - (cards.length - 1) / 2) * spacing;
          const wheelX = cx + R * Math.sin(angle) - cardWWheel / 2;
          const wheelY = cy - R * Math.cos(angle) - cardHWheel / 2;
          const apex = Math.max(0, Math.cos(angle));
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          gsap.set(card, {
            x: gsap.utils.interpolate(wheelX, startX + col * (cardWGrid + gapX), u),
            y: gsap.utils.interpolate(wheelY, startY + row * (cardHGrid + gapY), u),
            width: gsap.utils.interpolate(cardWWheel, cardWGrid, u),
            height: gsap.utils.interpolate(cardHWheel, cardHGrid, u),
            rotateZ: gsap.utils.interpolate(angle * (180 / Math.PI) * 0.88, 0, u),
            rotateY: gsap.utils.interpolate(Math.sin(angle) * 40, 0, u),
            rotateX: gsap.utils.interpolate(-Math.cos(angle) * 20 + 6, 0, u),
            scale: gsap.utils.interpolate(0.78 + 0.34 * apex, 1, u),
            borderRadius: gsap.utils.interpolate(12, GRID_RADIUS, u),
            zIndex: Math.round(30 + apex * 20 + idx),
            force3D: true,
            transformOrigin: "50% 50%",
          });
          const copy = card.querySelector<HTMLElement>("[data-motion-copy]");
          if (copy) {
            const landed = u >= 0.96;
            gsap.set(copy, { autoAlpha: landed ? 1 : 0 });
          }
        });
      };

      gsap.set(stage, { position: "absolute", top: 0, left: 0, right: 0 });
      ScrollTrigger.create({
        trigger: pin,
        start: "top bottom",
        end: "bottom top",
        onUpdate: drive,
        onRefresh: () => {
          sizePin();
          drive();
        },
      });
      tickDrive = drive;
      gsap.ticker.add(drive);
      window.addEventListener("scroll", drive, { passive: true });
      drive();
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const kicks = [300, 900, 1600].map((t) => window.setTimeout(refresh, t));

    return () => {
      window.removeEventListener("load", refresh);
      kicks.forEach((id) => window.clearTimeout(id));
      if (tickDrive) {
        gsap.ticker.remove(tickDrive);
        window.removeEventListener("scroll", tickDrive);
      }
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  return (
    <section
      id="design-in-motion"
      ref={rootRef}
      className="landing-design-motion relative w-full bg-[#d6d6d4] text-[#272727] select-none isolate"
    >
      <div ref={pinRef} className="relative w-full md:h-[340vh]">
        <div
          ref={stageRef}
          className="relative h-auto w-full overflow-hidden px-6 py-10 md:absolute md:inset-x-0 md:top-0 md:h-screen md:px-12"
        >
          <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-40" aria-hidden="true">
            {svgArcPath && (
              <path d={svgArcPath} fill="none" stroke="#272727" strokeWidth="1.2" strokeDasharray="6 6" />
            )}
            {svgInnerArcPath && (
              <path
                d={svgInnerArcPath}
                fill="none"
                stroke="#272727"
                strokeWidth="0.8"
                strokeDasharray="3 4"
                opacity="0.6"
              />
            )}
          </svg>

          <div className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-between overflow-hidden p-6 md:p-12">
            <div className="flex w-full justify-start pt-4 md:pt-6">
              <h2
                ref={topWordRef}
                className={cn(
                  familjen.className,
                  "whitespace-nowrap text-[clamp(3.5rem,13.5vw,12rem)] font-normal uppercase leading-[0.82] tracking-[-0.07em] text-[#272727]"
                )}
              >
                Work in
              </h2>
            </div>
            <p
              ref={captionRef}
              className="absolute left-1/2 top-1/2 z-0 max-w-xs -translate-x-1/2 -translate-y-1/2 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-[#272727]/60 md:max-w-md md:text-[12px]"
            >
              EXPLORING IDEAS THROUGH DAILY DESIGN PRACTICE.
            </p>
            <div className="flex w-full justify-end pb-14 md:pb-16">
              <h2
                ref={botWordRef}
                className={cn(
                  familjen.className,
                  "whitespace-nowrap text-[clamp(3.5rem,13.5vw,12rem)] font-normal uppercase leading-[0.82] tracking-[-0.07em] text-[#272727]"
                )}
              >
                Motion
              </h2>
            </div>
          </div>

          <div className="absolute inset-0 z-10" style={{ perspective: "1500px" }}>
            {SHOTS.map((shot, idx) => (
              <Link
                key={shot.slug}
                href={shot.route}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="group absolute left-0 top-0 overflow-hidden border border-black/10 bg-white shadow-2xl"
                style={{ borderRadius: GRID_RADIUS }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.image}
                  alt={shot.displayName}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  data-motion-copy
                  className="motion-card-copy pointer-events-none absolute inset-0 opacity-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-3.5 md:p-4">
                    <span className="motion-card-kicker font-mono text-[9px] uppercase tracking-[0.2em] md:text-[10px]">
                      {shot.index} • {shot.category?.split(" ")[0] || "SECURITY"}
                    </span>
                    <h3
                      className={cn(
                        familjen.className,
                        "motion-card-title mt-0.5 text-base font-semibold leading-tight tracking-tight md:text-lg"
                      )}
                    >
                      {shot.displayName}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
