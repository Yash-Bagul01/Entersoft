"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Fade, Marker, Reveal } from "@/components/platform/exoape/ExoMotion";
import type { ExoApeCase } from "@/components/platform/exoape/types";
import "@/components/platform/exoape/exoape-case.css";

const INK = "#0d0e13";
const MUTED = "#6f7076";
const CREAM = "#f2f0eb";

export default function ExoApeCaseStudy({ data }: { data: ExoApeCase }) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroIntroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLElement>(null);

  const insetRef = useRef<HTMLElement>(null);
  const insetFrameRef = useRef<HTMLDivElement>(null);
  const beliefsRef = useRef<HTMLElement>(null);
  const beliefsBgRef = useRef<HTMLDivElement>(null);
  const anticipateRef = useRef<HTMLElement>(null);
  const anticipateRightRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLElement>(null);
  const nextFrameRef = useRef<HTMLDivElement>(null);
  const nextCopyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const pinBase = {
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      } as const;

      if (!reduce) {
        // Fluid Glass collage: the frame stays in the offset grid; the
        // photograph is taller than the crop and travels through it, while
        // the crop itself unmasks as it enters. Alternate speeds so columns
        // drift against each other.
        root.querySelectorAll<HTMLElement>("[data-collage-item]").forEach((item) => {
          const media = item.querySelector<HTMLElement>("[data-collage-media]");
          const speed = Number(item.dataset.speed ?? 16);
          const dir = speed >= 0 ? 1 : -1;
          const travel = Math.min(28, Math.max(14, Math.abs(speed)));

          gsap.set(item, { clipPath: "inset(16% 12% 16% 12%)" });

          gsap.to(item, {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              end: "top 48%",
              scrub: 0.7,
            },
          });

          if (media) {
            gsap.fromTo(
              media,
              { yPercent: dir * travel, scale: 1.28 },
              {
                yPercent: dir * -travel,
                scale: 1,
                ease: "none",
                force3D: true,
                scrollTrigger: {
                  trigger: item,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.85,
                },
              }
            );
          }
        });

        root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = Number(el.dataset.speed ?? 14);
          gsap.fromTo(
            el,
            { y: speed * 8 },
            {
              y: -speed * 8,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
          const photo = el.querySelector("img");
          if (photo) {
            gsap.fromTo(
              photo,
              { scale: 1.2 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }
        });
      } else {
        root.querySelectorAll<HTMLElement>("[data-collage-item]").forEach((item) => {
          gsap.set(item, { clipPath: "inset(0% 0% 0% 0%)" });
        });
      }

      const heroWrapper = heroWrapperRef.current;
      const hero = heroRef.current;
      const media = heroMediaRef.current;
      const title = heroTitleRef.current;
      const intro = heroIntroRef.current;
      const overlay = overlayRef.current;

      if (heroWrapper && hero && media && title && intro && overlay) {
        const plate = media.querySelector<HTMLElement>("[data-hero-plate]");
        const titleLine = title.querySelector<HTMLElement>("[data-hero-line]");
        const overlayLines = overlay.querySelectorAll<HTMLElement>("[data-overlay-line]");
        const overlayCopy = overlay.querySelector<HTMLElement>("[data-overlay-copy]");

        gsap.set(intro, { opacity: 0, y: 32 });
        gsap.set(overlayLines, { yPercent: 110 });
        if (overlayCopy) gsap.set(overlayCopy, { opacity: 0, y: 18 });

        if (!reduce && plate) {
          gsap.fromTo(plate, { scale: 1.2 }, { scale: 1, duration: 2.2, ease: "power3.out" });
        }
        if (!reduce && titleLine) {
          gsap.fromTo(
            titleLine,
            { yPercent: 110 },
            { yPercent: 0, duration: 1.3, delay: 0.16, ease: "power4.out" }
          );
        }
        if (reduce) {
          gsap.set(overlayLines, { yPercent: 0 });
          gsap.set(intro, { opacity: 1, y: 0 });
          if (overlayCopy) gsap.set(overlayCopy, { opacity: 1, y: 0 });
        }

        // Hero pinned timeline over 220vh wrapper:
        // 1. Title fades out & translates up
        // 2. Intro text & meta grid emerge over the pinned background image
        // 3. Intro text stays visible for reading
        // 4. Intro text fades out before white overlay section slides up
        gsap
          .timeline({
            scrollTrigger: {
              trigger: heroWrapper,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.75,
              invalidateOnRefresh: true,
            },
          })
          .to(title, { opacity: 0, y: -45, ease: "power1.in", duration: 0.25 }, 0)
          .to(media, { yPercent: 12, ease: "none", duration: 1 }, 0)
          .to(intro, { opacity: 1, y: 0, ease: "power1.out", duration: 0.25 }, 0.22)
          .to(intro, { opacity: 1, y: 0, ease: "none", duration: 0.25 }, 0.47)
          .to(intro, { opacity: 0, y: -30, ease: "power1.in", duration: 0.2 }, 0.72);

        gsap.to(overlayLines, {
          yPercent: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: overlay,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.65,
          },
        });

        if (overlayCopy) {
          gsap.to(overlayCopy, {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: overlay,
              start: "top 55%",
              end: "top 18%",
              scrub: 0.6,
            },
          });
        }
      }

      const inset = insetRef.current;
      const frame = insetFrameRef.current;
      if (inset && frame) {
        gsap.fromTo(
          frame,
          { clipPath: "inset(16% 20% 16% 20%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: inset,
              start: "top top",
              end: "+=160%",
              scrub: 1,
              ...pinBase,
            },
          }
        );
      }

      const beliefs = beliefsRef.current;
      const beliefsBg = beliefsBgRef.current;
      if (beliefs && beliefsBg) {
        gsap.fromTo(
          beliefsBg,
          { scale: 1.06 },
          {
            scale: 1.24,
            ease: "none",
            scrollTrigger: {
              trigger: beliefs,
              start: "top top",
              end: "+=130%",
              scrub: 0.85,
              ...pinBase,
            },
          }
        );
      }

      const anticipate = anticipateRef.current;
      const right = anticipateRightRef.current;
      if (anticipate && right && window.innerWidth >= 768) {
        const distance = () => Math.max(0, right.scrollHeight - window.innerHeight + 120);
        gsap.to(right, {
          y: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: anticipate,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.45}`,
            scrub: 1,
            ...pinBase,
          },
        });
      }

      const rail = railRef.current;
      const track = trackRef.current;
      if (rail && track && window.innerWidth >= 768) {
        const getX = () => Math.min(0, window.innerWidth - track.scrollWidth - 64);
        gsap.to(track, {
          x: getX,
          ease: "none",
          scrollTrigger: {
            trigger: rail,
            start: "top top",
            end: () => `+=${Math.abs(getX()) + window.innerHeight * 0.55}`,
            scrub: 1,
            ...pinBase,
          },
        });
      }

      const next = nextRef.current;
      const nextFrame = nextFrameRef.current;
      const nextCopy = nextCopyRef.current;
      if (next && nextFrame && nextCopy) {
        gsap.set(nextCopy, { opacity: 0, y: 28 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: next,
              start: "top top",
              end: "+=190%",
              scrub: 0.9,
              ...pinBase,
            },
          })
          .fromTo(
            nextFrame,
            { clipPath: "inset(22% 29% 22% 29%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ease: "power1.inOut" },
            0
          )
          .to(nextCopy, { opacity: 1, y: 0, ease: "power2.out", duration: 0.28 }, 0.58);
      }
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const fontsReady = document.fonts?.ready?.then(refresh);

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refresh, 120);
    });
    ro.observe(root);
    const kick = [80, 400, 1100].map((ms) => window.setTimeout(refresh, ms));

    return () => {
      window.removeEventListener("load", refresh);
      ro.disconnect();
      window.clearTimeout(resizeTimer);
      kick.forEach((id) => window.clearTimeout(id));
      void fontsReady;
      ctx.revert();
    };
  }, [reduce, data.id]);

  const collageSpeed = [22, -18, 26, -20, 18, -14];

  return (
    <div ref={rootRef} className="exoape-case relative w-full bg-white" style={{ color: INK }}>
      {/* Hero + next title page share one stacking context so the white
          100vh sibling can cover the sticky photograph from below. */}
      <div className="relative">
        <div id="hero-wrap" ref={heroWrapperRef} className="relative h-[220vh]">
          <section
            id="hero"
            ref={heroRef}
            className="sticky top-0 h-screen w-full overflow-hidden bg-[#0b0c10]"
          >
            <div
              ref={heroMediaRef}
              className="absolute inset-x-0 will-change-transform"
              style={{ top: "-26%", height: "152%" }}
            >
              <div data-hero-plate className="absolute inset-0">
                <Image
                  src={data.images.hero}
                  alt={data.images.heroAlt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-black/40" />
            </div>

            <div
              ref={heroTitleRef}
              className="absolute inset-x-0 bottom-0 z-10 px-6 md:px-10 pb-10 md:pb-14 text-white"
            >
              <div className="mx-auto max-w-[1440px] flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h1 className="text-[clamp(3rem,8.4vw,8.5rem)] font-light leading-[0.95] tracking-[-0.04em] [text-shadow:_0_4px_30px_rgba(0,0,0,0.95)]">
                    <span className="exoape-reveal">
                      <span data-hero-line className="exoape-reveal-inner">
                        {data.heroTitle}
                      </span>
                    </span>
                  </h1>
                  <Fade start="load" delay={0.55} className="mt-4 text-[13px] tracking-[0.01em] text-white/75">
                    {data.heroSubtitle}
                  </Fade>
                </div>
                <Fade start="load" delay={0.7}>
                  <Link href={data.ctaHref} className="group flex items-center gap-3 text-[13px] text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full border border-white/60" />
                    <span className="border-b border-white/50 pb-0.5 transition-colors group-hover:border-white">
                      {data.ctaLabel}
                    </span>
                  </Link>
                </Fade>
              </div>
            </div>

            <div
              ref={heroIntroRef}
              className="absolute inset-0 z-10 px-6 md:px-10 pt-28 md:pt-36 pb-10 md:pb-14 text-white flex flex-col justify-between"
            >
              <div className="mx-auto max-w-[1440px] h-full flex flex-col justify-between w-full">
                <p className="max-w-[48ch] text-[clamp(1.2rem,2.1vw,1.85rem)] font-light leading-[1.38] tracking-[-0.01em]">
                  {data.intro}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[900px] pb-4">
                  {data.meta.map((item) => (
                    <div key={item.label} className="flex flex-col gap-2">
                      <span className="text-[13px] font-medium tracking-wide">{item.label}</span>
                      {item.values.map((value) => (
                        <span key={value} className="text-[13px] text-white/70">
                          {value}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Exact 100vh white page: title in the upper ~60%, objective in the lower third. */}
        <section
          ref={overlayRef}
          className="relative z-10 h-screen bg-white flex flex-col px-6 md:px-10"
        >

          <div className="flex-[1.15] flex items-end justify-center pt-[16vh] md:pt-[18vh]">
            <h2 className="text-[clamp(3.25rem,10vw,9rem)] font-light leading-[0.95] tracking-[-0.05em] text-center">
              {data.objective.lines.map((line) => (
                <span key={line} className="exoape-reveal">
                  <span data-overlay-line className="exoape-reveal-inner">
                    {line}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <div
            data-overlay-copy
            className="shrink-0 pt-[6vh] md:pt-[8vh] pb-[10vh] md:pb-[12vh]"
          >
            <div className="mx-auto max-w-[1440px] w-full grid grid-cols-12 gap-y-6">
              <div className="col-span-12 md:col-start-2 md:col-span-2">
                <div className="flex items-center gap-2 text-[13px] leading-none">
                  <span aria-hidden="true">+</span>
                  <span>Objective</span>
                </div>
              </div>
              <div className="col-span-12 md:col-start-5 md:col-span-4">
                <p className="text-[14px] leading-[21px] text-left" style={{ color: MUTED }}>
                  {data.objective.body}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── OFFSET COLLAGE (Fluid Glass: crop + inner-image parallax) ───── */}
      <section className="relative z-10 bg-white pt-[6vh] pb-[20vh] px-6 md:px-10 overflow-visible">
        <div className="mx-auto max-w-[1440px] grid grid-cols-12 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8">
          {data.images.collage.map((shot, i) => {
            const spans = [
              "col-span-12 md:col-span-4 md:col-start-1 aspect-4/5 md:mt-[8vh]",
              "col-span-12 md:col-span-5 md:col-start-6 aspect-[3/2] md:mt-[2vh]",
              "col-span-6 md:col-span-3 md:col-start-3 aspect-square md:mt-[14vh]",
              "col-span-6 md:col-span-5 md:col-start-7 aspect-[3/2] md:mt-[4vh]",
              "col-span-12 md:col-span-4 md:col-start-2 aspect-[4/3] md:mt-[10vh]",
              "col-span-12 md:col-span-4 md:col-start-8 aspect-4/5 md:mt-[2vh]",
            ];
            return (
              <figure
                key={shot.src}
                data-collage-item
                data-speed={String(collageSpeed[i] ?? 16)}
                className={`${spans[i] ?? "col-span-6 aspect-3/2"} bg-[#e8e6e1]`}
              >
                <div data-collage-media>
                  <Image src={shot.src} alt={shot.alt} fill sizes="42vw" className="object-cover" />
                </div>
              </figure>
            );
          })}
        </div>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 bg-white py-[14vh] px-6 md:px-10">
        <div className="mx-auto max-w-[1440px] grid grid-cols-12 gap-y-14">
          <h2 className="col-span-12 md:col-start-4 md:col-span-8 text-[clamp(1.9rem,3.6vw,3.25rem)] font-light leading-[1.23] tracking-[-0.03em]">
            {data.solution.lines.map((line, i) => (
              <Reveal key={line} delay={i * 0.05}>
                {line}
              </Reveal>
            ))}
          </h2>
          <div className="col-span-12 md:col-start-2 md:col-span-2">
            <Marker>Solution</Marker>
          </div>
          <div className="col-span-12 md:col-start-4 md:col-span-3">
            <Fade as="p" className="text-[14px] leading-[21px]">
              <span style={{ color: MUTED }}>{data.solution.left}</span>
            </Fade>
          </div>
          <div className="col-span-12 md:col-start-8 md:col-span-3">
            <Fade as="p" className="text-[14px] leading-[21px]" delay={0.08}>
              <span style={{ color: MUTED }}>{data.solution.right}</span>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── INSET EXPAND ─────────────────────────────────────────────────── */}
      <section ref={insetRef} className="relative z-10 h-screen w-full overflow-hidden bg-[#0d0e13]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 60%), linear-gradient(112deg, transparent 49.7%, #ffffff15 49.7%, #ffffff15 50.15%, transparent 50.15%)",
          }}
        />
        <div
          ref={insetFrameRef}
          className="absolute inset-0 will-change-[clip-path] shadow-2xl"
          style={{ clipPath: "inset(16% 20% 16% 20%)" }}
        >
          <Image src={data.images.wide} alt={data.images.wideAlt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
            <span className="px-4 py-2 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-mono uppercase tracking-[0.18em]">
              + EnProbe System Architecture
            </span>
          </div>
        </div>
      </section>

      {/* ── BELIEFS ──────────────────────────────────────────────────────── */}
      <section ref={beliefsRef} className="relative z-10 h-screen w-full overflow-hidden bg-[#0b0c10]">
        <div ref={beliefsBgRef} className="absolute inset-0 origin-center will-change-transform">
          <Image
            src={data.images.beliefs}
            alt={data.images.beliefsAlt}
            fill
            sizes="100vw"
            className="object-cover brightness-[0.85]"
          />
        </div>
        <div className="absolute inset-[5%] md:inset-[7%] flex items-center overflow-hidden" style={{ backgroundColor: CREAM }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(112deg, transparent 49.7%, #0d0e1326 49.7%, #0d0e1326 50.15%, transparent 50.15%), linear-gradient(-18deg, transparent 49.7%, #0d0e1326 49.7%, #0d0e1326 50.15%, transparent 50.15%)",
            }}
          />
          <div className="relative w-full px-6 md:px-16 py-10">
            <Marker className="tracking-[0.14em] uppercase text-[11px]">{data.beliefs.label}</Marker>
            <div className="mt-[8vh] flex flex-col gap-1">
              {data.beliefs.items.map((belief) => (
                <div
                  key={belief.word}
                  className={`flex items-end gap-5 ${
                    belief.align === "right" ? "justify-end" : "justify-start md:pl-[8%]"
                  }`}
                >
                  <h3 className="text-[clamp(2.6rem,8vw,7rem)] font-light leading-none tracking-[-0.045em]">
                    {belief.word}
                  </h3>
                  <span
                    className="mb-3 md:mb-5 shrink-0 border px-3 py-1 text-[9.5px] tracking-[0.16em] uppercase"
                    style={{ color: MUTED }}
                  >
                    {belief.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ANTICIPATING ─────────────────────────────────────────────────── */}
      <section ref={anticipateRef} className="relative z-10 bg-white md:overflow-hidden">
        <div className="md:h-screen w-full px-6 md:px-10 py-[14vh] md:py-0">
          <div className="mx-auto max-w-[1440px] h-full grid grid-cols-12 gap-8 items-start md:pt-[18vh]">
            <div className="col-span-12 md:col-span-5">
              <Marker>{data.anticipate.marker}</Marker>
              <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.6rem)] font-light leading-[1.12] tracking-[-0.035em]">
                {data.anticipate.lines.map((line, i) => (
                  <Reveal key={line} delay={i * 0.05}>
                    {line}
                  </Reveal>
                ))}
              </h2>
              <Fade as="p" className="mt-8 text-[14px] leading-[21px] max-w-[38ch]">
                <span style={{ color: MUTED }}>{data.anticipate.body}</span>
              </Fade>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 md:h-[78vh] md:overflow-hidden mt-12 md:mt-0">
              <div ref={anticipateRightRef} className="flex flex-col gap-10 will-change-transform pb-24">
                {data.anticipate.cards.map((card) => (
                  <article key={card.index} className="flex flex-col gap-4">
                    <div className="relative w-full aspect-4/5 overflow-hidden">
                      <Image src={card.image} alt={card.alt} fill sizes="40vw" className="object-cover" />
                    </div>
                    <div
                      className="self-end w-[min(100%,280px)] px-5 py-5 text-white"
                      style={{ backgroundColor: "#101115" }}
                    >
                      <span className="text-[11px] tracking-[0.14em] uppercase text-white/50">
                        {card.index}. {card.label}
                      </span>
                      <p className="mt-3 text-[15px] leading-[22px] font-light">{card.title}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HORIZONTAL PROCESS ───────────────────────────────────────────── */}
      <section ref={railRef} className="relative z-10 md:overflow-hidden" style={{ backgroundColor: CREAM }}>
        <div className="md:h-screen flex flex-col justify-center py-16 md:py-0">
          <div className="px-6 md:px-10 pb-10">
            <div className="mx-auto max-w-[1440px] grid grid-cols-12 items-end gap-6">
              <div className="col-span-12 md:col-start-2 md:col-span-2">
                <Marker>Horizontal scroll</Marker>
              </div>
              <h2 className="col-span-12 md:col-start-4 md:col-span-7 text-[clamp(1.7rem,3.2vw,2.8rem)] font-light leading-[1.2] tracking-[-0.03em]">
                <Reveal>{data.railTitle}</Reveal>
              </h2>
            </div>
          </div>
          <div
            ref={trackRef}
            className="flex gap-8 md:gap-12 pl-6 md:pl-[8vw] pr-[20vw] will-change-transform md:flex-nowrap flex-col md:flex-row"
          >
            {data.stages.map((stage) => (
              <article
                key={stage.index}
                className="w-full md:w-[38vw] lg:w-[30vw] shrink-0 flex flex-col gap-5 px-6 md:px-0"
              >
                <div className="relative w-full aspect-4/3 overflow-hidden">
                  <Image src={stage.image} alt={stage.alt} fill sizes="38vw" className="object-cover" />
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-[13px]" style={{ color: MUTED }}>
                    {stage.index}
                  </span>
                  <h3 className="text-[clamp(1.1rem,1.6vw,1.5rem)] font-normal tracking-[-0.02em]">
                    {stage.title}
                  </h3>
                </div>
                <p className="text-[14px] leading-[21px] max-w-[42ch]" style={{ color: MUTED }}>
                  {stage.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIFICATION ────────────────────────────────────────────────── */}
      <section className="relative z-10 bg-white py-[16vh] px-6 md:px-10">
        <div className="mx-auto max-w-[1440px] grid grid-cols-12 gap-y-12">
          <div className="col-span-12 md:col-start-2 md:col-span-2">
            <Marker>Specification</Marker>
          </div>
          <div className="col-span-12 md:col-start-4 md:col-span-8">
            <h2 className="text-[clamp(1.9rem,3.6vw,3.25rem)] font-light leading-[1.23] tracking-[-0.03em] mb-[8vh]">
              <Reveal>What the engine guarantees</Reveal>
            </h2>
            <dl className="flex flex-col">
              {data.specs.map((spec, i) => (
                <Fade
                  key={spec.label}
                  delay={i * 0.05}
                  className="grid grid-cols-1 md:grid-cols-[9rem_10rem_1fr] gap-3 md:gap-8 py-7 border-t"
                >
                  <dt className="text-[13px]" style={{ color: MUTED }}>
                    {spec.label}
                  </dt>
                  <dd className="text-[16px] leading-6">{spec.value}</dd>
                  <dd className="text-[14px] leading-[21px] max-w-[52ch]" style={{ color: MUTED }}>
                    {spec.body}
                  </dd>
                </Fade>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP + QUOTE + MOCKUPS ────────────────────────────────── */}
      <section className="relative z-10 text-white" style={{ backgroundColor: "#101115" }}>
        <div className="px-6 md:px-10 pt-[16vh] pb-6">
          <div className="mx-auto max-w-[1440px]">
            <h2 className="text-[clamp(2.8rem,9vw,8.2rem)] font-light leading-[0.95] tracking-[-0.05em]">
              {data.partnershipLines.map((line, i) => (
                <Reveal key={line} delay={i * 0.06}>
                  {line}
                </Reveal>
              ))}
            </h2>
          </div>
        </div>
        <div className="px-6 md:px-10 pt-[8vh] pb-[28vh] md:pb-[36vh]">
          <div className="mx-auto max-w-[1440px] grid grid-cols-12 gap-y-10">
            <div className="col-span-12 md:col-start-2 md:col-span-2">
              <Marker className="text-white/70">From the client</Marker>
            </div>
            <div className="col-span-12 md:col-start-4 md:col-span-6 flex flex-col gap-10">
              <Fade as="p" className="text-[16px] leading-[26px] text-white/85 max-w-[52ch]">
                {data.quote.text}
              </Fade>
              <Fade delay={0.08} className="flex items-center gap-4">
                <span className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-[13px] text-white/70">
                  {data.quote.initials}
                </span>
                <span className="flex flex-col">
                  <span className="text-[13px]">{data.quote.name}</span>
                  <span className="text-[13px] text-white/55">{data.quote.role}</span>
                </span>
              </Fade>
            </div>
          </div>
        </div>

        <div className="relative h-[70vh] md:h-[85vh]">
          <Image src={data.images.statement} alt={data.images.statementAlt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
          <div
            data-parallax
            data-speed="16"
            className="absolute left-[6%] md:left-[10%] -top-[18%] w-[42vw] max-w-[340px] aspect-9/16 overflow-hidden rounded-[28px] border border-white/15 shadow-2xl will-change-transform"
          >
            <Image src={data.images.mockup} alt={data.images.mockupAlt} fill sizes="340px" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-linear-to-t from-black/80 to-transparent text-white">
              <p className="text-[13px] font-light leading-snug">{data.mockupCaption}</p>
              <p className="mt-2 text-[10px] tracking-[0.16em] uppercase text-white/60">Scroll to explore</p>
            </div>
          </div>
          <div
            data-parallax
            data-speed="-10"
            className="absolute right-[8%] bottom-[14%] w-[min(100%,280px)] px-5 py-6 rounded-2xl will-change-transform"
            style={{ backgroundColor: "#101115" }}
          >
            <span className="text-[11px] tracking-[0.14em] uppercase text-white/50">{data.floatNote.label}</span>
            <p className="mt-3 text-[16px] leading-[22px] font-light text-white">{data.floatNote.title}</p>
          </div>
        </div>
      </section>

      {/* ── RECOGNITION ──────────────────────────────────────────────────── */}
      <section className="relative z-10 py-[16vh] px-6 md:px-10" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-[1440px] grid grid-cols-12 gap-y-10">
          <div className="col-span-12 md:col-start-4 md:col-span-2 md:pt-3">
            <Marker>Accreditation</Marker>
          </div>
          <div className="col-span-12 md:col-start-6 md:col-span-6">
            <h2 className="text-[clamp(1.9rem,3.6vw,3.25rem)] font-light leading-[1.23] tracking-[-0.03em] mb-10">
              <Reveal>Accredited</Reveal>
              <Reveal delay={0.05}>&amp; independently verified</Reveal>
            </h2>
            <ul className="flex flex-col">
              {data.recognition.map((item, i) => (
                <Fade
                  as="li"
                  key={item.name}
                  delay={i * 0.05}
                  className="flex flex-wrap items-baseline gap-x-3 text-[16px] leading-8"
                >
                  <span>{item.name} :</span>
                  <span style={{ color: MUTED }}>{item.detail}</span>
                </Fade>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS (AFTER ACCREDITATION) ─────────────── */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="relative z-10 py-[14vh] px-6 md:px-10 border-t border-[#0d0e13]/10" style={{ backgroundColor: CREAM }}>
          <div className="mx-auto max-w-[1440px] grid grid-cols-12 gap-y-10">
            <div className="col-span-12 md:col-start-4 md:col-span-2 md:pt-3">
              <Marker>FAQ</Marker>
            </div>
            <div className="col-span-12 md:col-start-6 md:col-span-6">
              <h2 className="text-[clamp(1.9rem,3.6vw,3.25rem)] font-light leading-[1.23] tracking-[-0.03em] mb-12">
                <Reveal>Frequently asked</Reveal>
                <Reveal delay={0.05}>questions</Reveal>
              </h2>
              <div className="flex flex-col border-t border-[#0d0e13]/15">
                {data.faqs.map((faq, i) => {
                  const isOpen = openFaqIdx === i;
                  return (
                    <div key={faq.question} className="border-b border-[#0d0e13]/15 py-6">
                      <button
                        onClick={() => setOpenFaqIdx(isOpen ? null : i)}
                        className="w-full flex items-start justify-between gap-6 text-left group cursor-pointer"
                      >
                        <span className="text-[clamp(1.05rem,1.7vw,1.4rem)] font-normal tracking-[-0.02em] group-hover:text-[#0d0e13]/70 transition-colors">
                          {faq.question}
                        </span>
                        <span className="mt-1 text-xl font-light shrink-0 transition-transform duration-300">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="mt-4 pr-6 text-[14px] sm:text-[15px] leading-[22px] max-w-[58ch]" style={{ color: MUTED }}>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── NEXT ─────────────────────────────────────────────────────────── */}
      <section ref={nextRef} className="relative z-10 h-screen w-full overflow-hidden" style={{ backgroundColor: CREAM }}>
        <Link href={data.next.href} className="absolute inset-0 block">
          <div
            ref={nextFrameRef}
            className="absolute inset-0 will-change-[clip-path]"
            style={{ clipPath: "inset(22% 29% 22% 29%)" }}
          >
            <Image
              src={data.images.next}
              alt={data.images.nextAlt}
              fill
              sizes="100vw"
              className="object-cover brightness-[0.72]"
            />
            <div ref={nextCopyRef} className="absolute inset-0 flex items-end px-6 md:px-10 pb-14 text-white">
              <div>
                <h2 className="text-[clamp(2.6rem,7vw,6.5rem)] font-light leading-none tracking-[-0.04em]">
                  {data.next.title}
                </h2>
                <p className="mt-3 text-[13px] text-white/75">{data.next.subtitle}</p>
                <span className="mt-7 w-11 h-11 rounded-full border border-white/45 flex items-center justify-center text-[13px]">
                  →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
