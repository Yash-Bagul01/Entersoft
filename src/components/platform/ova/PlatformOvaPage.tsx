"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import type { PlatformOvaPageData } from "@/components/platform/ova/platformOva";
import "@/components/platform/ova/platform-ova.css";

export default function PlatformOvaPage({ page }: { page: PlatformOvaPageData }) {
  const reduce = useReducedMotion();
  const lenis = useSmoothScroll();
  const rootRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<HTMLDivElement>(null);
  const portRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const sinceRef = useRef<HTMLElement>(null);
  const tickRef = useRef<HTMLSpanElement>(null);
  const wordIndex = useRef(0);
  const [sector, setSector] = useState(0);
  const [verb, setVerb] = useState(0);
  const pinId = `pf-ova-port-${page.id}`;

  useEffect(() => {
    if (reduce || !cycleRef.current) return;
    const track = cycleRef.current;
    const id = window.setInterval(() => {
      wordIndex.current = (wordIndex.current + 1) % page.words.length;
      gsap.to(track, {
        y: `${-wordIndex.current * 0.96}em`,
        duration: 0.7,
        ease: "power3.inOut",
      });
    }, 2300);
    return () => window.clearInterval(id);
  }, [reduce, page.words.length]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    let aboutCleanup = () => {};

    const ctx = gsap.context(() => {
      const rises = root.querySelectorAll<HTMLElement>("[data-rise]");
      if (!reduce) {
        gsap.set(rises, { yPercent: 120 });
        gsap.to(rises, {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.08,
          delay: 0.08,
        });
      }

      const heroMedia = root.querySelector<HTMLElement>("[data-hero-media] img, [data-hero-media] video");
      if (heroMedia && !reduce) {
        gsap.fromTo(
          heroMedia,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 0.65 },
          }
        );
      }

      const hero = root.querySelector<HTMLElement>("#hero");
      const port = portRef.current;
      const about = aboutRef.current;
      const since = sinceRef.current;
      const footer = document.getElementById("site-footer");

      const recede = (outgoing: HTMLElement | null, incoming: HTMLElement | null) => {
        if (!outgoing || !incoming) return;
        gsap.fromTo(
          outgoing,
          { scale: 1, yPercent: 0, filter: "brightness(1)" },
          {
            scale: 0.92,
            yPercent: -7,
            filter: "brightness(0.52)",
            transformOrigin: "50% 40%",
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: incoming,
              start: "top bottom",
              end: "top top",
              scrub: 0.5,
            },
          }
        );
      };

      if (!reduce) {
        recede(hero, port);
        recede(port?.querySelector<HTMLElement>(".pf-ova-port-pin") ?? port, about);
        recede(about?.querySelector<HTMLElement>(".pf-ova-about-pin") ?? about, since);
        recede(since, footer);
      }

      if (port && !reduce) {
        const total = page.sectors.length;
        const runway = total * 0.92;
        ScrollTrigger.create({
          id: pinId,
          trigger: port,
          start: "top top",
          endTrigger: about || undefined,
          end: about ? "top top" : `+=${Math.round(window.innerHeight * runway)}`,
          pin: true,
          pinSpacing: false,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const internal = runway / (1 + runway);
            const t = Math.min(1, self.progress / internal);
            const next = Math.min(total - 1, Math.floor(t * total + 0.001));
            setSector((prev) => (prev === next ? prev : next));
          },
        });
      }

      if (about && !reduce) {
        const total = page.verbs.length;
        const steps = total - 1;
        const current = { index: 0 };
        let locked = false;
        let unlockTimer = 0;

        const st = ScrollTrigger.create({
          trigger: about,
          start: "top top",
          endTrigger: since || undefined,
          end: since ? "top top" : `+=${Math.round(window.innerHeight * steps)}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (locked) return;
            const internal = steps / (1 + steps);
            const t = Math.min(1, self.progress / Math.max(internal, 0.001));
            const next = Math.min(steps, Math.max(0, Math.round(t * steps)));
            if (next === current.index) return;
            current.index = next;
            setVerb(next);
          },
        });

        const scrollToIndex = (index: number) => {
          const next = Math.min(steps, Math.max(0, index));
          current.index = next;
          setVerb(next);
          locked = true;
          window.clearTimeout(unlockTimer);
          const internalSpan = (st.end - st.start) * (steps / (1 + steps));
          const y = st.start + (next / steps) * internalSpan;
          const release = () => {
            unlockTimer = window.setTimeout(() => {
              locked = false;
            }, 90);
          };
          if (lenis) {
            lenis.scrollTo(y, { duration: 0.62, onComplete: release });
          } else {
            window.scrollTo({ top: y, behavior: "smooth" });
            unlockTimer = window.setTimeout(() => {
              locked = false;
            }, 640);
          }
        };

        const onWheel = (event: WheelEvent) => {
          if (!st.isActive) return;
          const dir = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
          if (!dir) return;
          const leaving = (current.index <= 0 && dir < 0) || (current.index >= steps && dir > 0);
          if (leaving && !locked) return;
          event.preventDefault();
          event.stopImmediatePropagation();
          if (locked || leaving) return;
          scrollToIndex(current.index + dir);
        };

        window.addEventListener("wheel", onWheel, { passive: false, capture: true });
        aboutCleanup = () => {
          window.clearTimeout(unlockTimer);
          window.removeEventListener("wheel", onWheel, { capture: true });
        };
      }

      if (hero && port && !reduce) {
        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          endTrigger: port,
          end: "top top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }

      if (since && !reduce) {
        const title = since.querySelector<HTMLElement>("[data-since-title]");
        const copy = since.querySelector<HTMLElement>("[data-since-copy]");
        const media = since.querySelector<HTMLElement>("[data-since-media] img");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: since,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 1.25)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        if (media) tl.fromTo(media, { scale: 1.1 }, { scale: 1, ease: "none", duration: 1 }, 0);
        if (title) tl.fromTo(title, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -20, ease: "power2.inOut", duration: 0.2 }, 0.1);
        if (copy) tl.fromTo(copy, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.22 }, 0.2);
        tl.to({}, { duration: 0.48 });
      }
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 160);
    return () => {
      window.clearTimeout(refresh);
      aboutCleanup();
      ctx.revert();
    };
  }, [reduce, lenis, page.id, page.sectors.length, page.verbs.length, pinId]);

  useEffect(() => {
    const tick = tickRef.current;
    if (!tick) return;
    const slots = Math.max(1, page.sectors.length - 1);
    tick.style.top = `${(sector / slots) * 100}%`;
  }, [sector, page.sectors.length]);

  const goSector = (index: number) => {
    const st = ScrollTrigger.getById(pinId);
    if (!st) return;
    const total = page.sectors.length;
    const runway = window.innerHeight * total * 0.92;
    const target = st.start + (index / total) * runway + 12;
    if (lenis) lenis.scrollTo(target, { duration: 1.05 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const ctaIsExternal = page.ctaHref.startsWith("http");

  return (
    <div ref={rootRef} className={`pf-ova${reduce ? " is-static" : ""}`}>
      <section id="hero" className="pf-ova-hero">
        <div className="pf-ova-media" data-hero-media>
          <Image src={page.hero} alt="" fill sizes="100vw" unoptimized priority />
          <div className="pf-ova-veil" />
        </div>
        <div className="pf-ova-hero-copy">
          <h1 className="pf-ova-display">
            <span className="pf-ova-clip">
              <span data-rise>{page.heroLead}</span>
            </span>
            <span className="pf-ova-clip">
              <span data-rise>
                our{" "}
                <span className="pf-ova-cycle">
                  <span ref={cycleRef} className="pf-ova-cycle-track">
                    {page.words.map((word) => (
                      <em key={word}>{word}</em>
                    ))}
                  </span>
                </span>
              </span>
            </span>
          </h1>
          <span className="pf-ova-clip">
            {ctaIsExternal ? (
              <a data-rise href={page.ctaHref} target="_blank" rel="noopener noreferrer" className="pf-ova-cta">
                {page.ctaLabel}
                <span aria-hidden="true">→</span>
              </a>
            ) : (
              <Link data-rise href={page.ctaHref} className="pf-ova-cta">
                {page.ctaLabel}
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </span>
        </div>
      </section>

      <section ref={portRef} className="pf-ova-port" id="portfolio">
        <div className="pf-ova-port-pin">
          {page.sectors.map((item, i) => (
            <article key={item.index} className={`pf-ova-slide${i === sector ? " is-on" : ""}`}>
              <div className="pf-ova-media">
                <Image src={item.image} alt={item.alt} fill sizes="100vw" unoptimized />
                <div className="pf-ova-veil" />
              </div>
              <div className="pf-ova-slide-copy">
                <p className="pf-ova-lead">{item.lead}</p>
                <div className="pf-ova-slide-foot">
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
              </div>
            </article>
          ))}
          <nav className="pf-ova-rail" aria-label={`${page.brand} index`}>
            <span ref={tickRef} className="pf-ova-rail-tick" aria-hidden="true" />
            {page.sectors.map((item, i) => (
              <button
                key={item.index}
                type="button"
                className={i === sector ? "is-on" : undefined}
                onClick={() => goSector(i)}
              >
                {item.index}
              </button>
            ))}
          </nav>
        </div>
      </section>
      <div className="pf-ova-spacer" style={{ ["--ep-gap" as string]: String(page.sectors.length * 0.92) }} aria-hidden />

      <section ref={aboutRef} className="pf-ova-about" id="about">
        <div className="pf-ova-about-pin">
          <div className="pf-ova-media">
            <Image
              src={page.manifesto}
              alt={`${page.brand} practice`}
              fill
              sizes="100vw"
              unoptimized
              style={page.manifestoPosition ? { objectPosition: page.manifestoPosition } : undefined}
            />
            <div
              className="pf-ova-veil"
              style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.58) 100%)" }}
            />
          </div>
          <div className="pf-ova-about-copy" style={{ ["--ep-verb" as string]: String(verb) }}>
            <div className="pf-ova-verb">
              <b>{page.brand}</b>
              <span className="pf-ova-verb-cycle">
                <span className="pf-ova-verb-track">
                  {page.verbs.map((item) => (
                    <strong key={item.word}>{item.word}</strong>
                  ))}
                </span>
              </span>
            </div>
            <div className="pf-ova-about-side">
              <b className="pf-ova-about-align" aria-hidden="true">
                {page.brand}
              </b>
              <div className="pf-ova-about-body-cycle">
                <div className="pf-ova-about-body-track">
                  {page.verbs.map((item) => (
                    <p key={item.word} className="pf-ova-about-body">
                      {item.body}
                    </p>
                  ))}
                </div>
              </div>
              <p className="pf-ova-credit">
                {page.credit}
                <span>{page.creditSide}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="pf-ova-spacer" style={{ ["--ep-gap" as string]: String(page.verbs.length - 1) }} aria-hidden />

      <section ref={sinceRef} className="pf-ova-since" id="proof">
        <div className="pf-ova-since-pin">
          <div className="pf-ova-media" data-since-media>
            <Image src={page.since} alt="" fill sizes="100vw" unoptimized />
            <div className="pf-ova-veil" />
          </div>
          <h2 className="pf-ova-since-title" data-since-title>
            {page.sinceTitle.map((line) => (
              <React.Fragment key={line}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h2>
          <div className="pf-ova-since-copy" data-since-copy>
            {page.about.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {ctaIsExternal ? (
              <a href={page.ctaHref} target="_blank" rel="noopener noreferrer" className="pf-ova-cta">
                {page.ctaLabel}
                <span aria-hidden="true">→</span>
              </a>
            ) : (
              <Link href={page.ctaHref} className="pf-ova-cta">
                {page.ctaLabel}
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
