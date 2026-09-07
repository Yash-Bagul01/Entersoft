"use client";

import React, { useLayoutEffect, useRef } from "react";
import { blogPosts } from "@/data/blog";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TITLE_LINES = [
  { text: "Threat", align: "left" as const },
  { text: "Intelligence", align: "end" as const },
  { text: "Desk", align: "indent" as const },
  { text: "Briefs", align: "end" as const, count: "(03)" },
];

function destFromCenter(inner: HTMLElement, index: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = Math.max(20, vw * 0.03);
  const gap = Math.max(12, vw * 0.012);
  const destW = (vw - pad * 2 - gap * 2) / 3;
  const destH = destW * 1.065;
  const destTop = Math.max(pad + 80, vh - destH - pad * 1.35);
  const destLeft = pad + index * (destW + gap);
  const cardW = inner.offsetWidth || destW;
  return {
    x: destLeft + destW / 2 - vw / 2,
    y: destTop + destH / 2 - vh / 2,
    scale: destW / cardW,
  };
}

export default function InsightsBlog() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const title = titleRef.current;
    if (!root || !pin || !stage || !title) return;

    gsap.registerPlugin(ScrollTrigger);

    let tickDrive: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const lines = title.querySelectorAll<HTMLElement>("[data-title-line]");
      if (lines.length) {
        gsap.set(lines, { yPercent: reduce ? 0 : 120, rotate: reduce ? 0 : 8 });
        gsap.to(lines, {
          yPercent: 0,
          rotate: 0,
          duration: 1.05,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pin,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const inners = gsap.utils.toArray<HTMLElement>("[data-card-inner]", stage);
      const explores = gsap.utils.toArray<HTMLElement>("[data-explore]", stage);

      if (!desktop) {
        gsap.set(explores, { opacity: 1 });
        return;
      }

      if (reduce) {
        inners.forEach((el, i) => {
          const d = destFromCenter(el, i);
          gsap.set(el, { xPercent: -50, yPercent: -50, x: d.x, y: d.y, scale: d.scale });
        });
        gsap.set(explores, { opacity: 1 });
        return;
      }

      const below = () => window.innerHeight * 1.35;
      inners.forEach((el, i) => {
        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: below() + i * 48,
          scale: 1,
          force3D: true,
        });
      });
      gsap.set(explores, { opacity: 0 });

      const sizePin = () => {
        pin.style.height = `${Math.round(window.innerHeight * 2.8)}px`;
      };
      sizePin();

      const placeStage = (progress: number) => {
        pin.dataset.deskProgress = progress.toFixed(3);
        if (progress <= 0) {
          gsap.set(stage, { position: "absolute", top: 0, bottom: "auto", left: 0, right: 0 });
        } else if (progress >= 1) {
          gsap.set(stage, { position: "absolute", top: "auto", bottom: 0, left: 0, right: 0 });
        } else {
          gsap.set(stage, { position: "fixed", top: 0, bottom: "auto", left: 0, right: 0 });
        }
      };

      gsap.set(stage, { position: "absolute", top: 0, left: 0, right: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });

      // Title holds, then each portrait slides up and stacks, then all
      // three shrink into the 3-up row — Sunny Keynote Talks sequence.
      tl.to({}, { duration: 0.1 });
      inners.forEach((el, i) => {
        tl.fromTo(
          el,
          { y: below, x: 0, scale: 1, xPercent: -50, yPercent: -50 },
          { y: 0, x: 0, scale: 1, duration: 0.16, force3D: true, immediateRender: false },
          0.1 + i * 0.2
        );
      });
      tl.to({}, { duration: 0.08 });
      inners.forEach((el, i) => {
        tl.to(
          el,
          {
            x: () => destFromCenter(el, i).x,
            y: () => destFromCenter(el, i).y,
            scale: () => destFromCenter(el, i).scale,
            duration: 0.26,
            force3D: true,
            immediateRender: false,
          },
          0.62
        );
      });
      if (explores.length) {
        tl.to(explores, { opacity: 1, duration: 0.08, immediateRender: false }, 0.82);
      }
      tl.to({}, { duration: 0.12 }, 0.88);

      const drive = () => {
        const rect = pin.getBoundingClientRect();
        const range = Math.max(1, pin.offsetHeight - window.innerHeight);
        const p = gsap.utils.clamp(0, 1, -rect.top / range);
        placeStage(p);
        tl.progress(p);
      };

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
    const kicks = [300, 900, 1800].map((t) => window.setTimeout(refresh, t));

    return () => {
      window.removeEventListener("load", refresh);
      kicks.forEach((id) => window.clearTimeout(id));
      if (tickDrive) {
        gsap.ticker.remove(tickDrive);
        window.removeEventListener("scroll", tickDrive);
      }
      ctx.revert();
    };
  }, [reduce]);

  return (
    <section
      id="insights"
      ref={rootRef}
      className="relative w-full bg-[#f3f2ee] text-[#1b1b1c]"
    >
      <div ref={pinRef} data-desk-progress className="relative w-full md:h-[280vh]">
      <div
        ref={stageRef}
        data-desk-stage
        className="relative flex w-full flex-col md:absolute md:inset-x-0 md:top-0 md:h-screen md:overflow-hidden"
      >
        <div
          ref={titleRef}
          className="relative z-0 flex w-full flex-col justify-center px-5 py-16 md:absolute md:inset-0 md:py-0 md:px-8 lg:px-10"
        >
          <p className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#1b1b1c]/45 md:mb-8">
            Security Briefs &amp; Insights
          </p>
          <h2 className="sr-only">Threat Intelligence Desk</h2>
          <div className="grid w-full font-display text-[clamp(3.2rem,11.4vw,10.6rem)] font-bold uppercase leading-[0.86] tracking-[-0.045em]">
            {TITLE_LINES.map((line) => (
              <span
                key={line.text}
                className={
                  line.align === "end"
                    ? "ml-auto overflow-hidden pr-[4vw] md:pr-[8vw]"
                    : line.align === "indent"
                      ? "overflow-hidden pl-[10vw] md:pl-[13rem]"
                      : "overflow-hidden"
                }
              >
                <span data-title-line className="block origin-left will-change-transform">
                  {line.text}
                  {line.count ? (
                    <sup className="ml-2 align-super text-[0.22em] font-semibold tracking-[0.08em] text-[#1b1b1c]/55">
                      {line.count}
                    </sup>
                  ) : null}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 z-10 hidden md:block">
          {blogPosts.map((post, idx) => (
            <a
              key={post.id}
              href={post.link}
              data-card-inner
              data-cursor="link"
              style={{ zIndex: idx + 1 }}
              className="absolute left-1/2 top-1/2 flex aspect-[1/1.065] w-[min(42vw,720px)] flex-col justify-between overflow-hidden rounded-[0.4rem] border border-[#cfcfc8] bg-white px-[1.6rem] py-[1.4rem] text-[#1b1b1c] shadow-[0_18px_50px_rgba(20,20,22,0.08)] transition-colors duration-300 will-change-transform hover:bg-[#f4f4f4] md:px-10 md:py-8"
            >
              <span className="font-display text-[clamp(2.8rem,6.8vw,5.8rem)] font-bold leading-none tracking-[-0.04em]">
                {idx + 1}
              </span>
              <div className="w-full">
                <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1b1b1c]/45">
                  {post.category}
                </p>
                <h3 className="font-display text-[clamp(1.55rem,3.15vw,3.55rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em]">
                  {post.title}
                </h3>
                <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.45] text-[#1b1b1c]/70 md:text-[17px]">
                  {post.teaser}
                </p>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#1b1b1c]/40">
                    {post.date}
                  </span>
                  <span
                    data-explore
                    className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#1b1b1c] opacity-0"
                  >
                    Read Brief
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      </div>

      <div className="flex flex-col gap-5 px-5 pb-16 md:hidden">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#1b1b1c]/45">
          Live Briefings
        </p>
        {blogPosts.map((post, idx) => (
          <a
            key={post.id}
            href={post.link}
            className="flex min-h-[420px] flex-col justify-between rounded-[0.4rem] border border-[#cfcfc8] bg-white px-6 py-6 text-[#1b1b1c]"
          >
            <span className="font-display text-5xl font-bold leading-none">{idx + 1}</span>
            <div>
              <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1b1b1c]/45">
                {post.category}
              </p>
              <h3 className="font-display text-[1.7rem] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
                {post.title}
              </h3>
              <p className="mt-4 text-[14px] leading-relaxed text-[#1b1b1c]/70">{post.teaser}</p>
              <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
                <span className="text-[#1b1b1c]/40">{post.date}</span>
                <span className="font-bold">Read Brief</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
