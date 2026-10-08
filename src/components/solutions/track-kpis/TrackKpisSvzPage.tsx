"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SolutionLanding } from "@/data/solutionLandings";
import SolutionArrivalMarker from "@/components/solutions/SolutionArrivalMarker";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ROUTES } from "@/config/routes";
import "@/components/solutions/track-kpis/track-kpis-svz.css";

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--tk-display",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--tk-serif",
});

const IMG = (name: string) => `/images/solutions/hub/${name}.jpg`;

const KEYS = ["REPORTING", "EXPOSURE", "VELOCITY", "COVERAGE", "EVIDENCE", "ASSURANCE"] as const;

const MANIFESTO =
  "SCAN COUNTS ARE NOT A SECURITY PROGRAMME. LEADERSHIP DOES NOT NEED TO KNOW HOW MANY TOOLS RAN. THEY NEED TO KNOW WHETHER RISK IS FALLING AND WHETHER THE STORY WILL SURVIVE AN AUDIT. ENTERSOFT TURNS TESTING, ENPROBE TELEMETRY AND REMEDIATION STATUS INTO EXECUTIVE REPORTING: EXPOSURE TRENDS, FIX VELOCITY, CONTROL COVERAGE AND EVIDENCE PACKS MAPPED TO ISO 27001, SOC 2, PCI-DSS AND RELATED OBLIGATIONS. NUMBERS STAY TIED TO VALIDATED WORK, SO ASSURANCE IS HONEST.";

const tokens = MANIFESTO.split(/\s+/).map((raw) => {
  const letters = raw.replace(/[^A-Z]/g, "");
  if (KEYS.includes(letters as (typeof KEYS)[number])) {
    return { word: letters, key: true, glue: false };
  }
  return { word: raw, key: false, glue: false };
});

const SHOTS = [
  { src: IMG("track-appsec-kpis-try-265087"), label: "BOARD VIEW", year: "®2026", slot: "a", start: 0.46, end: 0.64 },
  { src: IMG("kpi-try-32845700"), label: "CONTROL ROOM", year: "®2026", slot: "d", start: 0.56, end: 0.74 },
  { src: IMG("track-appsec-kpis-try-186461"), label: "EXPOSURE", year: "®2026", slot: "c", start: 0.66, end: 0.82 },
  { src: IMG("kpi-try-6801648"), label: "FIX VELOCITY", year: "®2026", slot: "b", start: 0.76, end: 0.9 },
  { src: IMG("kpi-try-1181465"), label: "PROGRAMME MIX", year: "®2026", slot: "e", start: 0.86, end: 0.99 },
];

const STRIP = [
  IMG("track-appsec-kpis-try-265087"),
  IMG("kpi-try-7688336"),
  IMG("kpi-try-7947663"),
  IMG("track-appsec-kpis"),
  IMG("kpi-try-669615"),
  IMG("track-appsec-kpis-try-186461"),
  IMG("kpi-try-6801648"),
  IMG("kpi-try-32845700"),
  IMG("kpi-try-1181465"),
  IMG("kpi-try-577271"),
  IMG("kpi-try-590016"),
  IMG("kpi-try-590020"),
  IMG("kpi-try-669619"),
  IMG("track-appsec-kpis-try-590041"),
];

const FRAMEWORKS = ["ISO 27001", "SOC 2", "PCI-DSS", "HIPAA", "RBI", "CERT-In", "CREST", "GDPR"];

function syncTrackKpisNav() {
  const header = document.querySelector("header");
  const previous = header instanceof HTMLElement ? header.style.pointerEvents : "";
  if (header instanceof HTMLElement) header.style.pointerEvents = "none";
  const sample = document.elementFromPoint(Math.min(window.innerWidth / 2, 420), 72);
  if (header instanceof HTMLElement) header.style.pointerEvents = previous;
  if (!sample) return;
  document.documentElement.setAttribute(
    "data-tk-nav",
    sample.closest(".tk-hub, .tk-cells") ? "dark" : "light"
  );
}

export default function TrackKpisSvzPage({ page }: { page: SolutionLanding }) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    { q: page.problemTitle, a: page.problemLead },
    { q: page.problems[0].title, a: page.problems[0].body },
    { q: page.problems[1].title, a: page.problems[1].body },
    { q: page.problems[2].title, a: page.problems[2].body },
    { q: page.detectTitle, a: page.detectLead },
  ];

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin || reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    let stopLantern: (() => void) | null = null;
    const ctx = gsap.context(() => {
      gsap.from(".tk-hero__copy > *", {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".tk-hero__mark", {
        scale: 0.4,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
      });

      const hero = root.querySelector<HTMLElement>(".tk-hero");
      let targetX = 0.5;
      let targetY = 0.46;
      let currentX = 0.5;
      let currentY = 0.46;
      let lanternFrame = 0;
      const moveLantern = (event: MouseEvent) => {
        if (!hero) return;
        const bounds = hero.getBoundingClientRect();
        targetX = gsap.utils.clamp(0.08, 0.92, (event.clientX - bounds.left) / bounds.width);
        targetY = gsap.utils.clamp(0.12, 0.88, (event.clientY - bounds.top) / bounds.height);
      };
      const tickLantern = () => {
        currentX += (targetX - currentX) * 0.07;
        currentY += (targetY - currentY) * 0.07;
        if (hero) {
          hero.style.setProperty("--lantern-x", `${currentX * 100}%`);
          hero.style.setProperty("--lantern-y", `${currentY * 100}%`);
        }
        lanternFrame = window.requestAnimationFrame(tickLantern);
      };
      hero?.addEventListener("mousemove", moveLantern);
      lanternFrame = window.requestAnimationFrame(tickLantern);
      stopLantern = () => {
        hero?.removeEventListener("mousemove", moveLantern);
        window.cancelAnimationFrame(lanternFrame);
      };

      const bodyWords = gsap.utils.toArray<HTMLElement>(".tk-word:not(.is-key)");
      const keys = gsap.utils.toArray<HTMLElement>(".tk-word.is-key");
      const slots = gsap.utils.toArray<HTMLElement>(".tk-stack span");
      const shots = gsap.utils.toArray<HTMLElement>(".tk-shot");
      const bridge = pin.querySelector<HTMLElement>(".tk-bridge-layer");
      const manifesto = pin.querySelector<HTMLElement>(".tk-manifesto");
      const stack = pin.querySelector<HTMLElement>(".tk-stack");
      const pill = pin.querySelector<HTMLElement>(".tk-pill--abs");
      const span = (value: number, start: number, end: number) =>
        gsap.utils.clamp(0, 1, (value - start) / Math.max(end - start, 0.001));

      const travel = () => {
        slots.forEach((slot) => gsap.set(slot, { x: 0, y: 0, scale: 1, clearProps: "transform" }));
        if (stack) gsap.set(stack, { opacity: 0, visibility: "visible" });
        return keys.map((key, index) => {
          const slot = slots[index];
          if (!slot) return { x: 0, y: 0, s: 0.22 };
          const from = key.getBoundingClientRect();
          const to = slot.getBoundingClientRect();
          return {
            x: from.left + from.width / 2 - (to.left + to.width / 2),
            y: from.top + from.height / 2 - (to.top + to.height / 2),
            s: gsap.utils.clamp(0.14, 0.36, from.height / Math.max(to.height, 1)),
          };
        });
      };

      let paths = travel();
      const apply = (progress: number) => {
        const weare = span(progress, 0, 0.26);
        const reveal = span(progress, 0.16, 0.3);
        const fade = span(progress, 0.34, 0.56);
        const gather = span(progress, 0.4, 0.86);
        const zoom = gsap.parseEase("power2.in")(weare);
        if (bridge) {
          gsap.set(bridge, {
            opacity: 1 - span(weare, 0.58, 1),
            y: `${zoom * 22}vh`,
            filter: "none",
          });
          const title = bridge.querySelector("p");
          if (title) {
            gsap.set(title, {
              scale: 1 + zoom * 1.85,
              filter: `blur(${zoom * 38}px)`,
              y: zoom * 36,
              opacity: 1 - span(weare, 0.64, 1),
              transformOrigin: "center center",
              force3D: true,
            });
          }
        }
        if (manifesto) gsap.set(manifesto, { opacity: reveal });
        if (pill) {
          const showPill = reveal > 0.4;
          gsap.set(pill, {
            opacity: showPill ? Math.max(reveal, 0.92) : 0,
            pointerEvents: showPill ? "auto" : "none",
            color: "#ffffff",
          });
        }
        gsap.set(bodyWords, { opacity: (1 - fade) * reveal });

        keys.forEach((key, index) => {
          const path = paths[index];
          const slot = slots[index];
          if (!path || !slot) return;
          const local = gsap.utils.clamp(0, 1, (gather - index * 0.12) / 0.38);
          const grow = gsap.parseEase("power2.out")(span(local, 0, 0.55));
          const home = gsap.parseEase("power2.inOut")(span(local, 0.4, 1));
          const active = local > 0.012;
          gsap.set(key, { opacity: active ? 0 : reveal });
          gsap.set(slot, {
            x: path.x * (1 - home),
            y: path.y * (1 - home),
            scale: path.s + (1 - path.s) * grow,
            opacity: active ? 1 : 0,
            transformOrigin: "center center",
            force3D: true,
          });
        });
        if (stack) {
          const anyLift = gather > 0.01;
          gsap.set(stack, { opacity: anyLift ? 1 : 0, visibility: "visible" });
        }

        shots.forEach((shot, index) => {
          const motion = SHOTS[index];
          if (!motion) return;
          const travelY = span(progress, motion.start, motion.end);
          const visible = span(travelY, 0, 0.1) * (1 - span(travelY, 0.88, 1));
          gsap.set(shot, {
            x: 0,
            y: `${gsap.utils.interpolate(96, -96, travelY)}vh`,
            opacity: visible * 0.88,
            force3D: true,
          });
        });
        syncTrackKpisNav();
      };

      ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: "+=640%",
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          paths = travel();
        },
        onUpdate: (self) => apply(self.progress),
      });

      apply(0);

      gsap.from(".tk-hub__title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".tk-hub", start: "top 78%" },
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 280);
    return () => {
      window.clearTimeout(timer);
      stopLantern?.();
      ctx.revert();
    };
  }, [reduceMotion]);

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 420);
    return () => window.clearTimeout(id);
  }, [openFaq]);

  useEffect(() => {
    document.documentElement.setAttribute("data-tk-nav", "light");
    const sync = () => syncTrackKpisNav();
    window.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      window.removeEventListener("scroll", sync);
      document.documentElement.removeAttribute("data-tk-nav");
    };
  }, []);

  return (
    <article ref={rootRef} className={`tk ${display.variable} ${serif.variable}`}>
      <SolutionArrivalMarker href={page.href} />

      <header className="tk-hero" id="top">
        <div className="tk-hero__scene" aria-hidden="true">
          <div className="tk-hero__photo">
            <img src={IMG("track-appsec-kpis-try-590041")} alt="" />
          </div>
          <div className="tk-hero__glow" />
          <div className="tk-hero__veil" />
        </div>
        <div className="tk-hero__marks" aria-hidden="true">
          <i className="tk-hero__mark tk-hero__mark--dot" />
          <i className="tk-hero__mark tk-hero__mark--sq" />
          <i className="tk-hero__mark tk-hero__mark--bar" />
          <i className="tk-hero__mark tk-hero__mark--rule" />
        </div>
        <div className="tk-hero__copy">
          <p className="tk-kicker">Entersoft · AppSec KPIs</p>
          <h1>
            <em>showing</em> WHAT APPSEC <em>is actually</em>
            <span>CHANGING</span>
          </h1>
          <a className="tk-enter" href="#programme">
            Enter the programme <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <section className="tk-pin" id="programme" ref={pinRef}>
        {SHOTS.map((shot) => (
          <figure className={`tk-shot tk-shot--${shot.slot}`} key={shot.slot}>
            <img src={shot.src} alt="" />
            <figcaption>
              <span>{shot.label}</span>
              <span>{shot.year}</span>
            </figcaption>
          </figure>
        ))}

        <div className="tk-stack" aria-hidden="true">
          {KEYS.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </div>

        <p className="tk-manifesto">
          {tokens.map((item, index) => (
            <span className={`tk-word${item.key ? " is-key" : ""}`} key={`${item.word}-${index}`}>
              {`${item.word} `}
            </span>
          ))}
        </p>

        <div className="tk-bridge-layer" aria-hidden="true">
          <p>
            <span>we</span>
            <em>measure</em>
          </p>
        </div>

        <a className="tk-pill tk-pill--abs" href="#board">
          Check the programme
        </a>
      </section>

      <section className="tk-hub" id="board">
        <p className="tk-kicker tk-kicker--dark">The reporting layer</p>
        <h2 className="tk-hub__title">
          THE BOAR<span>D</span>
        </h2>
        <div className="tk-logos" aria-label="Frameworks">
          {[...FRAMEWORKS, ...FRAMEWORKS].map((name, index) => (
            <span key={`${name}-${index}`}>{name}</span>
          ))}
        </div>
        <div className="tk-strip" aria-hidden="true">
          <div className="tk-strip__track">
            {[...STRIP, ...STRIP].map((src, index) => (
              <img src={src} alt="" key={`${src}-${index}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="tk-cells">
        <article className="tk-cell tk-cell--photo">
          <img src={IMG("track-appsec-kpis-try-265087")} alt="" />
          <Link href="#outcomes" className="tk-cell__label">
            Reporting <span aria-hidden="true">↗</span>
          </Link>
        </article>
        <article className="tk-cell tk-cell--tiles">
          <div>
            {page.detections.map((item) => (
              <p key={item.title}>{item.title}</p>
            ))}
          </div>
          <Link href="#outcomes" className="tk-cell__label">
            Outcomes <span aria-hidden="true">↗</span>
          </Link>
        </article>
      </section>

      <section className="tk-closer" id="outcomes">
        <p className="tk-kicker">Entersoft · AppSec KPIs</p>
        <h2>
          <em>backing</em> PROGRAMMES MEASURED <em>by the</em>
          <br />
          FRAMEWORKS THEY REPORT
        </h2>
        <a className="tk-pill" href={ROUTES.contact}>
          See the evidence pack
        </a>
        <div className="tk-stats" id="evidence">
          {page.detections.slice(0, 4).map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tk-faq" id="faq">
        <h2>
          you asked.
          <em> we answer.</em>
        </h2>
        {faqs.map((item, index) => {
          const open = openFaq === index;
          return (
            <div className={`tk-faq__item${open ? " is-on" : ""}`} key={item.q}>
              <button type="button" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : index)}>
                <span>{item.q}</span>
                <i aria-hidden="true">+</i>
              </button>
              <div className="tk-faq__answer">
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </section>
    </article>
  );
}
