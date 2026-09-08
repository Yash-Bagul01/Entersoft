"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Familjen_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capabilities } from "@/data/differentiators";
import { ROUTES } from "@/config/routes";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const WORK_IMAGES = [
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2400&q=90",
] as const;

const WORK_HREFS = [
  ROUTES.services.appsec,
  ROUTES.services.vapt,
  ROUTES.services.compliance,
  ROUTES.services.appsec,
  ROUTES.services.compliance,
  ROUTES.services.siem,
] as const;

const WORK = capabilities.map((card, index) => ({
  ...card,
  image: WORK_IMAGES[index],
  href: WORK_HREFS[index],
}));

const PRACTICE_WORDS = ["FIND", "VALIDATE", "REMEDIATE", "VERIFY"] as const;

export default function Differentiators() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const practiceRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const practice = practiceRef.current;
    if (!root || !pin || !stage || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (!desktop || reduce) {
      gsap.set(track, { x: 0, clearProps: "transform" });
      gsap.set(stage, { clearProps: "position,top,bottom,left,right" });
      gsap.set(track.querySelectorAll("[data-outcome-card]"), { y: 0, clearProps: "transform" });
      if (practice) gsap.set(practice, { clearProps: "backgroundColor" });
      return;
    }

    const travel = () => Math.max(0, track.scrollWidth - stage.clientWidth);
    const hold = () => Math.round(window.innerHeight * 1.42);
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-outcome-card]"));

    const nextSec = () => document.querySelector<HTMLElement>("#operational-validation");

    const placeStage = (progress: number, covered: boolean) => {
      if (progress <= 0) {
        gsap.set(stage, { position: "absolute", top: 0, bottom: "auto", left: 0, right: 0, zIndex: 1 });
      } else if (covered) {
        gsap.set(stage, { position: "absolute", top: "auto", bottom: 0, left: 0, right: 0, zIndex: 1 });
      } else {
        gsap.set(stage, { position: "fixed", top: 0, bottom: "auto", left: 0, right: 0, zIndex: 1 });
      }
    };

    const drive = () => {
      const range = Math.max(1, pin.offsetHeight - window.innerHeight);
      const raw = gsap.utils.clamp(0, 1, -pin.getBoundingClientRect().top / range);
      const travelPx = travel();
      const holdPx = hold();
      const moveUntil = travelPx / Math.max(1, travelPx + holdPx);
      const p = gsap.utils.clamp(0, 1, raw / moveUntil);

      const next = nextSec();
      const nextTop = next ? next.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
      const covered = nextTop <= 0;

      placeStage(raw, covered);
      gsap.set(track, { x: -travelPx * p, force3D: true });

      const vw = window.innerWidth;
      const rise = Math.round(Math.min(240, vw * 0.14));
      const restX = vw * 0.3;
      const enterX = vw * 1.02;
      cards.forEach((el) => {
        const left = el.getBoundingClientRect().left;
        const t = gsap.utils.clamp(0, 1, (enterX - left) / Math.max(1, enterX - restX));
        const eased = t * t * (3 - 2 * t);
        gsap.set(el, { y: (1 - eased) * rise, force3D: true });
      });

      if (practice) {
        const r = practice.getBoundingClientRect();
        const vis = gsap.utils.clamp(0, 1, (window.innerWidth - r.left) / window.innerWidth);
        gsap.set(practice, {
          backgroundColor: gsap.utils.interpolate("#2a2a28", "#6a6760", vis * vis),
        });
      }

    };

    const sizePin = () => {
      pin.style.height = `${Math.round(window.innerHeight + travel() + hold())}px`;
    };

    const imgs = Array.from(track.querySelectorAll("img"));
    const onImg = () => {
      sizePin();
      ScrollTrigger.refresh();
      drive();
    };
    imgs.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", onImg);
    });

    const kicks = [160, 600, 1400, 2600].map((t) =>
      window.setTimeout(() => {
        sizePin();
        ScrollTrigger.refresh();
        drive();
      }, t)
    );

    let tickDrive: (() => void) | null = null;
    const ctx = gsap.context(() => {
      sizePin();
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
      window.addEventListener("resize", sizePin);
      window.addEventListener("load", sizePin);
      drive();
    }, root);

    return () => {
      kicks.forEach((id) => window.clearTimeout(id));
      imgs.forEach((img) => img.removeEventListener("load", onImg));
      window.removeEventListener("resize", sizePin);
      window.removeEventListener("load", sizePin);
      if (tickDrive) {
        gsap.ticker.remove(tickDrive);
        window.removeEventListener("scroll", tickDrive);
      }
      ctx.revert();
    };
  }, [reduce]);

  return (
    <section
      id="capabilities"
      ref={rootRef}
      className="relative z-[1] w-full bg-[#eae9e5] text-[#1a1a1a]"
    >
      <div ref={pinRef} className="relative w-full md:min-h-screen">
        <div
          ref={stageRef}
          className="relative w-full overflow-visible md:absolute md:inset-x-0 md:top-0 md:h-screen"
        >
          <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
            {[20, 40, 60, 80].map((left) => (
              <span
                key={left}
                className="absolute top-0 bottom-0 w-px bg-[#1a1a1a]/[0.07]"
                style={{ left: `${left}%` }}
              />
            ))}
          </div>

          <div
            ref={trackRef}
            className="relative flex w-full flex-col will-change-transform md:h-full md:w-max md:flex-row md:items-stretch"
          >
            <header className="flex w-full shrink-0 flex-col justify-center px-6 py-16 md:w-[min(38vw,540px)] md:px-[4.2vw]">
              <h2
                className={cn(
                  familjen.className,
                  "text-[clamp(2.8rem,6.4vw,5.6rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-[#1a1a1a]"
                )}
              >
                <span className="block">Why</span>
                <span className="block">Enterprises</span>
                <span className="block">chose</span>
                <span className="block">Entersoft</span>
              </h2>
              <Link href="/#services" className="outcomes-cta mt-8">
                <span>View all outcomes</span>
                <span aria-hidden="true">→</span>
              </Link>
            </header>

            <div className="flex w-full flex-col gap-14 px-6 pb-16 md:h-full md:w-max md:flex-row md:items-center md:gap-[3.2vw] md:px-0 md:pb-0 md:pr-[3vw]">
              {WORK.map((item) => (
                <article
                  key={item.id}
                  data-outcome-card
                  className="w-full shrink-0 will-change-transform md:w-[36.25vw] md:min-w-[520px] md:max-w-[700px]"
                >
                  <Link href={item.href} className="group block">
                    <div className="outcomes-card-media overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt=""
                        className="aspect-[154/100] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <h3
                      className={cn(
                        familjen.className,
                        "mt-5 text-[clamp(1.45rem,2.15vw,1.85rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1a1a1a]"
                      )}
                    >
                      {item.title}
                    </h3>
                    <div className="mt-3 flex items-end justify-between gap-6">
                      <p className="max-w-[28ch] text-[13.5px] leading-[1.45] text-[#5c5c5c] md:text-[14.5px]">
                        {item.body}
                      </p>
                      <span className="outcomes-cta shrink-0">
                        <span>Explore project</span>
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <aside className="flex w-full shrink-0 flex-col items-start justify-center bg-[#e4e3df] px-6 py-20 md:h-full md:w-screen md:items-center md:px-16 md:text-center">
              <p
                className={cn(
                  familjen.className,
                  "max-w-[18ch] text-[clamp(1.6rem,2.6vw,2.35rem)] font-semibold leading-[1.2] tracking-[-0.04em] text-[#1a1a1a]"
                )}
              >
                Discover how these outcomes appear across live enterprise programmes.
              </p>
              <Link href="/#services" className="outcomes-cta mt-8">
                <span>View all outcomes</span>
                <span aria-hidden="true">→</span>
              </Link>
            </aside>

            <aside
              ref={practiceRef}
              className="practice-panel relative flex w-full shrink-0 flex-col items-center justify-center overflow-hidden bg-[#2a2a28] px-6 py-24 text-[#d8d6d0] md:h-full md:w-screen"
            >
              <span
                className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-white/15 md:block"
                aria-hidden="true"
              />
              <p className="outcomes-label mb-5">Our practice</p>
              <div
                className={cn(
                  familjen.className,
                  "text-center text-[clamp(3.4rem,11.2vw,9.4rem)] font-semibold uppercase leading-[0.78] tracking-[-0.07em] text-[#cfcac2]"
                )}
              >
                {PRACTICE_WORDS.map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex w-full max-w-[1100px] items-end justify-between gap-6 px-2">
                <p className="outcomes-label">Application-first. Enterprise-wide.</p>
                <Link href="/#services" className="outcomes-cta outcomes-cta-on-dark">
                  <span>View services</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
