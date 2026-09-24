"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SolutionLanding } from "@/data/solutionLandings";
import SolutionArrivalMarker from "@/components/solutions/SolutionArrivalMarker";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ROUTES } from "@/config/routes";
import "@/components/solutions/manage-vuln/manage-vuln.css";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--mv-sans-face",
});

const IMG = (name: string) => `/images/solutions/manage-vuln/${name}.jpg?v=3`;

const STATS = [
  { value: 7, suffix: "+", label: "Sources correlated" },
  { value: 1, suffix: "", label: "Engineering queue" },
  { value: 6, suffix: "", label: "Finding classes" },
  { value: 100, suffix: "%", label: "Owner-routed" },
];

export default function ManageVulnPage({ page }: { page: SolutionLanding }) {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [capIndex, setCapIndex] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);

  const capabilities = [
    { title: "Correlation", body: page.features[0].body, src: IMG("cap1") },
    { title: "Ownership", body: page.features[1].body, src: IMG("cap2") },
    { title: "Validation", body: page.features[1].points[1], src: IMG("cap3") },
    { title: "Tracking", body: page.features[1].points[2], src: IMG("cap4") },
  ];

  const portfolio = page.detections.map((item, index) => ({
    title: item.title,
    src: IMG(`port${index + 1}`),
  }));

  const cases = page.problems.map((item, index) => ({
    title: item.title,
    body: item.body,
    src: IMG(`case${(index % 2) + 1}`),
    pill: ["Duplicates", "Exposure", "Evidence"][index],
  }));

  const activeCase = cases[caseIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const play = () => {
      video.play().catch(() => undefined);
    };
    play();
    video.addEventListener("canplay", play);
    video.addEventListener("loadeddata", play);
    return () => {
      video.removeEventListener("canplay", play);
      video.removeEventListener("loadeddata", play);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const desktop = window.matchMedia("(min-width: 981px)").matches;

      gsap.set(".mv-reveal", { y: reduceMotion ? 0 : 36, opacity: reduceMotion ? 1 : 0 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.fromTo(
        ".mv-hero__video",
        { scale: reduceMotion ? 1 : 1.12 },
        { scale: 1, duration: 1.55 },
        0,
      );
      intro.fromTo(
        ".mv-hero__copy",
        { y: reduceMotion ? 0 : 18 },
        { y: 0, duration: 0.85 },
        0.2,
      );

      if (!reduceMotion) {
        gsap.fromTo(
          ".mv-hero__video",
          { scale: 1.08 },
          {
            scale: 1.18,
            ease: "none",
            scrollTrigger: {
              trigger: ".mv-hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>(".mv-reveal").forEach((el) => {
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        gsap.utils.toArray<HTMLElement>(".mv-clip").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(18% 14% 18% 14% round 32px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 32px)",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                end: "top 48%",
                scrub: 0.75,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".mv-parallax img").forEach((img) => {
          const frame = img.closest("figure") ?? img;
          gsap.fromTo(
            img,
            { scale: 1.16, yPercent: -8 },
            {
              scale: 1,
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".mv-stat").forEach((el, index) => {
          const stat = STATS[index];
          const node = el.querySelector("strong");
          if (!node || !stat) return;
          const counter = { n: 0 };
          gsap.to(counter, {
            n: stat.value,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
            onStart: () => {
              counter.n = 0;
            },
            onUpdate: () => {
              node.textContent = `${Math.round(counter.n)}${stat.suffix}`;
            },
          });
        });

        gsap.fromTo(
          ".mv-port__card, .mv-port__text",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".mv-port__grid", start: "top 82%" },
          },
        );
      }

      if (desktop && !reduceMotion) {
        const brandTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".mv-brand",
            start: "top 82%",
            end: "bottom 22%",
            scrub: 0.7,
          },
        });
        brandTl.fromTo(
          ".mv-brand__fig--left",
          { height: "28vh", y: 90, clipPath: "inset(18% 10% 4% 10% round 32px)" },
          { height: "64vh", y: -48, clipPath: "inset(0% 0% 0% 0% round 32px)", ease: "none" },
          0,
        );
        brandTl.fromTo(
          ".mv-brand__fig--right",
          { height: "28vh", y: -90, clipPath: "inset(4% 10% 18% 10% round 32px)" },
          { height: "64vh", y: 48, clipPath: "inset(0% 0% 0% 0% round 32px)", ease: "none" },
          0,
        );
        brandTl.fromTo(
          ".mv-brand__fig img",
          { scale: 1.22 },
          { scale: 1, ease: "none" },
          0,
        );

        const shots = gsap.utils.toArray<HTMLElement>(".mv-cap__shot");
        gsap.set(shots, { clipPath: "inset(100% 0% 0% 0%)", zIndex: (i) => i + 1 });
        if (shots[0]) gsap.set(shots[0], { clipPath: "inset(0% 0% 0% 0%)" });

        const capTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".mv-caps__pin",
            start: "top top+=88",
            end: "+=220%",
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            onUpdate: (self) => {
              const next = Math.min(shots.length - 1, Math.floor(self.progress * shots.length));
              setCapIndex((prev) => (prev === next ? prev : next));
            },
          },
        });

        shots.forEach((shot, index) => {
          if (index === 0) return;
          capTl.fromTo(
            shot,
            { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 },
            { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1, ease: "none" },
            index - 0.05,
          );
        });
        capTl.to({}, { duration: 0.25 });
      } else {
        gsap.set(".mv-cap__shot", { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 0 });
        const first = root.querySelector<HTMLElement>(".mv-cap__shot");
        if (first) gsap.set(first, { autoAlpha: 1 });
      }
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 240);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (window.matchMedia("(min-width: 981px)").matches && !reduceMotion) return;
    const shots = rootRef.current?.querySelectorAll<HTMLElement>(".mv-cap__shot");
    shots?.forEach((shot, index) => {
      gsap.to(shot, { autoAlpha: index === capIndex ? 1 : 0, duration: 0.35, ease: "power2.out" });
    });
  }, [capIndex, reduceMotion]);

  useEffect(() => {
    const stage = rootRef.current?.querySelector(".mv-case__visual");
    if (!stage || reduceMotion) return;
    gsap.fromTo(
      stage.querySelectorAll(".mv-case__shot.is-active, .mv-pill"),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.05 },
    );
  }, [caseIndex, reduceMotion]);

  return (
    <main ref={rootRef} className={`mv ${sans.variable} ${sans.className}`}>
      <SolutionArrivalMarker href={page.href} />

      <section className="mv-hero">
        <div className="mv-hero__frame">
          <div className="mv-hero__media">
            <div className="mv-hero__video">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={IMG("focusA")}
              >
                <source src="/videos/manage-vuln/hero.mp4?v=4" type="video/mp4" />
              </video>
            </div>
            <div className="mv-hero__shade" />
            <div className="mv-hero__copy">
              <h1>
                <span>See, prioritize</span>
                <span>and reduce AppSec risk.</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mv-intro" id="intro">
        <h2 className="mv-intro__lead mv-reveal">{page.problemTitle}</h2>
        <div className="mv-intro__grid">
          <figure className="mv-intro__fig mv-clip mv-parallax">
            <img src={IMG("intro")} alt="Engineer reviewing correlated findings across monitors" />
          </figure>
          <div className="mv-intro__copy mv-reveal">
            <p>{page.problemLead}</p>
            <p>{page.heroBody}</p>
          </div>
        </div>
      </section>

      <section className="mv-stats">
        {STATS.map((stat) => (
          <article key={stat.label} className="mv-stat mv-reveal">
            <strong>
              {stat.value}
              {stat.suffix}
            </strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <section className="mv-focus" id="focus">
        <h2 className="mv-focus__title mv-reveal">Vulnerability work with a human focus approach</h2>
        <div className="mv-focus__row">
          <figure className="mv-focus__fig mv-clip mv-parallax">
            <img src={IMG("focusA")} alt="Security interface used to correlate findings" />
          </figure>
          <div className="mv-focus__copy mv-reveal">
            <p className="mv-kicker">{page.features[0].kicker}</p>
            <h3>{page.features[0].title}</h3>
            <p>{page.features[0].body}</p>
          </div>
        </div>
        <div className="mv-focus__row mv-focus__row--flip">
          <div className="mv-focus__copy mv-reveal">
            <p className="mv-kicker">{page.features[1].kicker}</p>
            <h3>{page.features[1].title}</h3>
            <p>{page.features[1].body}</p>
          </div>
          <figure className="mv-focus__fig mv-clip mv-parallax">
            <img src={IMG("focusB")} alt="Analyst workstation used to route ownership" />
          </figure>
        </div>
      </section>

      <section className="mv-caps" id="capabilities">
        <h2 className="mv-caps__title mv-reveal">Capabilities</h2>
        <div className="mv-caps__pin">
          <div className="mv-caps__sticky">
            <div className="mv-cap__list">
              {capabilities.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={`mv-cap__item${capIndex === index ? " is-active" : ""}`}
                  onClick={() => setCapIndex(index)}
                >
                  <h3>{item.title}</h3>
                  <p>
                    <span>{item.body}</span>
                  </p>
                </button>
              ))}
            </div>
            <div className="mv-cap__visual">
              {capabilities.map((item, index) => (
                <img
                  key={item.title}
                  className={`mv-cap__shot${capIndex === index ? " is-active" : ""}`}
                  src={item.src}
                  alt={item.title}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mv-brand">
        <figure className="mv-brand__fig mv-brand__fig--left">
          <img src={IMG("brandL")} alt="Server infrastructure feeding the finding inventory" />
        </figure>
        <div className="mv-brand__copy mv-reveal">
          <p className="mv-kicker">The EnProbe brand</p>
          <h2>EnProbe ASPM</h2>
          <p>
            EnProbe is Entersoft’s AppSec platform — a growing inventory of correlated findings
            from the tools you already run. Each record is shaped by its asset and backed by
            Entersoft’s full testing platform: scored, routed, and managed with an owner’s
            accountability.
          </p>
          <p>{page.features[0].points[2]}</p>
        </div>
        <figure className="mv-brand__fig mv-brand__fig--right">
          <img src={IMG("brandR")} alt="Operations floor used to manage the AppSec queue" />
        </figure>
      </section>

      <section className="mv-port" id="portfolio">
        <h2 className="mv-reveal">What lands in the queue</h2>
        <div className="mv-port__grid">
          {portfolio.slice(0, 4).map((item) => (
            <article key={item.title} className="mv-port__card">
              <img src={item.src} alt={item.title} />
              <span>{item.title}</span>
            </article>
          ))}
          <article className="mv-port__text">
            <p>
              Entersoft centralizes SAST, DAST, SCA, secrets, containers, cloud and manual testing,
              then correlates duplicates so engineering gets a single, risk-ordered queue instead of
              five scanner inboxes.
            </p>
          </article>
          {portfolio.slice(4).map((item) => (
            <article key={item.title} className="mv-port__card">
              <img src={item.src} alt={item.title} />
              <span>{item.title}</span>
            </article>
          ))}
          <article className="mv-port__card">
            <img src={IMG("port7")} alt="Unified AppSec queue across tools" />
            <span>Unified queue</span>
          </article>
        </div>
      </section>

      <section className="mv-cases" id="cases">
        <h2 className="mv-reveal">Programme case study</h2>
        <div className="mv-cases__stage">
          <div className="mv-case__copy mv-reveal">
            <p className="mv-case__kicker">{page.kicker}</p>
            <h3>{activeCase.title}</h3>
            <p>{activeCase.body}</p>
            <Link className="mv-link" href={ROUTES.contact}>
              Read study
            </Link>
            <div className="mv-case__nav">
              <button
                type="button"
                aria-label="Previous case"
                onClick={() => setCaseIndex((i) => (i === 0 ? cases.length - 1 : i - 1))}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next case"
                onClick={() => setCaseIndex((i) => (i === cases.length - 1 ? 0 : i + 1))}
              >
                →
              </button>
            </div>
          </div>
          <div className="mv-case__visual">
            {cases.map((item, index) => (
              <img
                key={item.title}
                className={`mv-case__shot${caseIndex === index ? " is-active" : ""}`}
                src={item.src}
                alt={item.title}
              />
            ))}
            <span className="mv-pill">{activeCase.pill}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
