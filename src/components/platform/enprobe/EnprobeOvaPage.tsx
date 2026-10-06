"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { ENPROBE_SITE, OVA_ABOUT, OVA_SECTORS, OVA_VERBS, OVA_WORDS } from "@/components/platform/enprobe/enprobeOva";
import "@/components/platform/enprobe/enprobe-ova.css";

export default function EnprobeOvaPage() {
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

  useEffect(() => {
    if (reduce || !cycleRef.current) return;
    const track = cycleRef.current;
    const id = window.setInterval(() => {
      wordIndex.current = (wordIndex.current + 1) % OVA_WORDS.length;
      gsap.to(track, {
        y: `${-wordIndex.current * 0.96}em`,
        duration: 0.7,
        ease: "power3.inOut",
      });
    }, 2300);
    return () => window.clearInterval(id);
  }, [reduce]);

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
        recede(port?.querySelector<HTMLElement>(".ep-ova-port-pin") ?? port, about);
        recede(about?.querySelector<HTMLElement>(".ep-ova-about-pin") ?? about, since);
        recede(since, footer);
      }

      if (port && !reduce) {
        const total = OVA_SECTORS.length;
        const runway = total * 0.92;
        ScrollTrigger.create({
          id: "ep-ova-port",
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
        const total = OVA_VERBS.length;
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
  }, [reduce, lenis]);

  useEffect(() => {
    const tick = tickRef.current;
    if (!tick) return;
    const slots = Math.max(1, OVA_SECTORS.length - 1);
    tick.style.top = `${(sector / slots) * 100}%`;
  }, [sector]);

  const goSector = (index: number) => {
    const st = ScrollTrigger.getById("ep-ova-port");
    if (!st) return;
    const total = OVA_SECTORS.length;
    const runway = window.innerHeight * total * 0.92;
    const target = st.start + (index / total) * runway + 12;
    if (lenis) lenis.scrollTo(target, { duration: 1.05 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div ref={rootRef} className={`ep-ova${reduce ? " is-static" : ""}`}>
      <section id="hero" className="ep-ova-hero">
        <div className="ep-ova-media" data-hero-media>
          <Image src="/images/platform/enprobe-ova/hero.jpg?v=2" alt="" fill sizes="100vw" unoptimized priority />
          <div className="ep-ova-veil" />
        </div>
        <div className="ep-ova-hero-copy">
          <h1 className="ep-ova-display">
            <span className="ep-ova-clip">
              <span data-rise>Visible, that is</span>
            </span>
            <span className="ep-ova-clip">
              <span data-rise>
                our{" "}
                <span className="ep-ova-cycle">
                  <span ref={cycleRef} className="ep-ova-cycle-track">
                    {OVA_WORDS.map((word) => (
                      <em key={word}>{word}</em>
                    ))}
                  </span>
                </span>
              </span>
            </span>
          </h1>
          <span className="ep-ova-clip">
            <a
              data-rise
              href={ENPROBE_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="ep-ova-cta"
            >
              Visit EnProbe
              <span aria-hidden="true">→</span>
            </a>
          </span>
        </div>
      </section>

      <section ref={portRef} className="ep-ova-port" id="portfolio">
        <div className="ep-ova-port-pin">
          {OVA_SECTORS.map((item, i) => (
            <article key={item.index} className={`ep-ova-slide${i === sector ? " is-on" : ""}`}>
              <div className="ep-ova-media">
                <Image src={item.image} alt={item.alt} fill sizes="100vw" unoptimized />
                <div className="ep-ova-veil" />
              </div>
              <div className="ep-ova-slide-copy">
                <p className="ep-ova-lead">{item.lead}</p>
                <div className="ep-ova-slide-foot">
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
              </div>
            </article>
          ))}
          <nav className="ep-ova-rail" aria-label="Portfolio index">
            <span ref={tickRef} className="ep-ova-rail-tick" aria-hidden="true" />
            {OVA_SECTORS.map((item, i) => (
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
      <div className="ep-ova-spacer" style={{ ["--ep-gap" as string]: String(OVA_SECTORS.length * 0.92) }} aria-hidden />

      <section ref={aboutRef} className="ep-ova-about" id="about">
        <div className="ep-ova-about-pin">
          <div className="ep-ova-media">
            <Image
              src="/images/platform/enprobe-ova/manifesto.jpg?v=4"
              alt="EnProbe practice"
              fill
              sizes="100vw"
              unoptimized
              style={{ objectPosition: "center 12%" }}
            />
            <div className="ep-ova-veil" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.58) 100%)" }} />
          </div>
          <div className="ep-ova-about-copy" style={{ ["--ep-verb" as string]: String(verb) }}>
            <div className="ep-ova-verb">
              <b>EnProbe</b>
              <span className="ep-ova-verb-cycle">
                <span className="ep-ova-verb-track">
                  {OVA_VERBS.map((item) => (
                    <strong key={item.word}>{item.word}</strong>
                  ))}
                </span>
              </span>
            </div>
            <div className="ep-ova-about-side">
              <b className="ep-ova-about-align" aria-hidden="true">EnProbe</b>
              <div className="ep-ova-about-body-cycle">
                <div className="ep-ova-about-body-track">
                  {OVA_VERBS.map((item) => (
                    <p key={item.word} className="ep-ova-about-body">
                      {item.body}
                    </p>
                  ))}
                </div>
              </div>
              <p className="ep-ova-credit">
                EnProbe practice
                <span>Exposure assurance</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="ep-ova-spacer" style={{ ["--ep-gap" as string]: String(OVA_VERBS.length - 1) }} aria-hidden />

      <section ref={sinceRef} className="ep-ova-since" id="proof">
        <div className="ep-ova-since-pin">
          <div className="ep-ova-media" data-since-media>
            <Image src="/images/platform/enprobe-ova/since.jpg?v=2" alt="" fill sizes="100vw" unoptimized />
            <div className="ep-ova-veil" />
          </div>
          <h2 className="ep-ova-since-title" data-since-title>
            Since
            <br />
            its creation,
          </h2>
          <div className="ep-ova-since-copy" data-since-copy>
            {OVA_ABOUT.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <a
              href={ENPROBE_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="ep-ova-cta"
            >
              Visit EnProbe
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
