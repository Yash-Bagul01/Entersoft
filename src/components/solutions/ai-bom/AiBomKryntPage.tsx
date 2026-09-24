"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications } from "@/data/certifications";
import type { SolutionLanding } from "@/data/solutionLandings";
import SolutionArrivalMarker from "@/components/solutions/SolutionArrivalMarker";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ROUTES } from "@/config/routes";
import "@/components/solutions/ai-bom/ai-bom-krynt.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--kr-sans-face",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--kr-serif-face",
});

const IMG = (name: string) => `/images/solutions/ai-bom/${name}.jpg?v=4`;

function KrBtn({
  href,
  children,
  className = "",
}: {
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <Link className={`kr-btn ${className}`.trim()} href={href}>
      <span className="kr-btn__text">
        <em>{children}</em>
        <em aria-hidden="true">{children}</em>
      </span>
      <span className="kr-btn__icon">
        <i>↗</i>
        <i aria-hidden="true">↗</i>
      </span>
    </Link>
  );
}

const PROCESS = [
  "Entersoft starts from the applications you already run and looks for AI packages in the software inventory.",
  "Each package is classified by role — framework, agent, RAG, MCP or model — instead of sitting in a flat SBOM.",
  "The component stays tied to the application where it was found, so security can see what actually runs.",
  "The same inventory path as EnProbe SBOM carries vulnerability and license treatment with the record.",
  "Security, legal and procurement get an exportable list for the reviews that now ask for documented AI use.",
];

export default function AiBomKryntPage({ page }: { page: SolutionLanding }) {
  const rootRef = useRef<HTMLElement>(null);
  const workClipRef = useRef<HTMLDivElement>(null);
  const workImgRef = useRef<HTMLImageElement>(null);
  const reduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(0);
  const [workIndex, setWorkIndex] = useState(0);

  const services = [
    { num: "01", title: page.features[0].kicker },
    { num: "02", title: page.features[1].kicker },
    { num: "03", title: page.detectTitle },
    { num: "04", title: "Review" },
  ];

  const works = useMemo(
    () =>
      page.detections.map((item, index) => ({
        num: `0${index + 1}. ${item.title}`,
        body: item.body,
        src: IMG(`work${index + 1}`),
      })),
    [page.detections],
  );

  const faqs = [
    { q: page.problemTitle, a: page.problemLead },
    { q: page.problems[0].title, a: page.problems[0].body },
    { q: page.problems[1].title, a: page.problems[1].body },
    { q: page.problems[2].title, a: page.problems[2].body },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const desktop = window.matchMedia("(min-width: 981px)").matches;

      if (reduceMotion || !desktop) {
        gsap.set(".kr-hero__content .kr-hero__top, .kr-hero__content .kr-hero__bot", { height: desktop ? "50%" : "auto" });
        gsap.set(".kr-hero__line", { height: "100%" });
        gsap.set(".kr-hero__title, .kr-hero__italic", { y: "0%", opacity: 1 });
        gsap.set(".kr-hero__cta-box", { height: desktop ? "100%" : "auto" });
        gsap.set(".kr-about__fig--1, .kr-about__fig--4", { height: "20vw" });
        gsap.set(".kr-about__fig--2", { height: "25vw" });
        gsap.set(".kr-about__fig--3", { height: "15vw" });
        gsap.set(".kr-work__clip", { height: "38vw" });
        if (reduceMotion) return;
      }

      if (desktop) {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            ".kr-hero__content .kr-hero__top, .kr-hero__content .kr-hero__bot",
            { height: 0 },
            { height: "50%", duration: 0.95, stagger: 0.2, ease: "expo.out" },
            0,
          )
          .fromTo(
            ".kr-hero__line",
            { height: 0 },
            { height: "100%", duration: 0.72, stagger: { amount: 0.5 }, ease: "none" },
            0.95,
          )
          .fromTo(
            ".kr-hero__title, .kr-hero__italic",
            { y: "150%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.84, stagger: { amount: 0.5 }, ease: "power3.out" },
            1.19,
          )
          .fromTo(
            ".kr-hero__cta-box",
            { height: 0 },
            { height: "100%", duration: 0.86, ease: "power3.out" },
            1.67,
          );
      }

      gsap.fromTo(
        ".kr-hero__slice img",
        { height: "110%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: { trigger: ".kr-hero", start: "top top", end: "bottom top", scrub: 0.25 },
        },
      );

      gsap.fromTo(
        ".kr-hero__wipe",
        { height: "0%" },
        {
          height: "100%",
          stagger: { amount: 0.35 },
          ease: "none",
          scrollTrigger: { trigger: ".kr-hero", start: "top top", end: "bottom top", scrub: 0.8 },
        },
      );

      const figHeights = ["20vw", "25vw", "15vw", "20vw"];
      gsap.utils.toArray<HTMLElement>(".kr-about__fig").forEach((el, index) => {
        gsap.fromTo(
          el,
          { height: 0 },
          {
            height: figHeights[index],
            ease: "none",
            scrollTrigger: {
              trigger: ".kr-about__stage",
              start: "top 85%",
              end: "top 45%",
              scrub: 0.6,
            },
          },
        );
      });

      gsap.fromTo(
        ".kr-about__lede, .kr-about__notes p",
        { y: "75%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.52,
          stagger: { amount: 0.3 },
          ease: "none",
          scrollTrigger: { trigger: ".kr-about__intro", start: "top 85%" },
        },
      );

      if (desktop) {
        gsap.fromTo(
          ".kr-services__photo",
          { height: "32vw" },
          {
            height: "38vw",
            ease: "none",
            scrollTrigger: { trigger: ".kr-services", start: "top 80%", end: "top 35%", scrub: 0.6 },
          },
        );

        gsap.fromTo(
          ".kr-work__clip",
          { height: 0 },
          {
            height: "38vw",
            ease: "none",
            scrollTrigger: { trigger: ".kr-work", start: "top 80%", end: "top 40%", scrub: 0.6 },
          },
        );
      }

      gsap.fromTo(
        ".kr-process__cell",
        { y: "40%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: { amount: 0.28 },
          ease: "none",
          scrollTrigger: { trigger: ".kr-process", start: "top 80%", end: "center 45%", scrub: 0.8 },
        },
      );

      gsap.fromTo(
        ".kr-banner__clip h2",
        { yPercent: 120 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: ".kr-banner", start: "top 85%", end: "top 35%", scrub: 0.8 },
        },
      );

      gsap.fromTo(
        ".kr-banner__photo img",
        { yPercent: 0 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: ".kr-banner", start: "top bottom", end: "bottom top", scrub: 0.8 },
        },
      );
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 400);
    return () => {
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, [reduceMotion]);

  useEffect(() => {
    const clip = workClipRef.current;
    const img = workImgRef.current;
    if (!clip || !img) return;
    if (reduceMotion) {
      gsap.set(clip, { clipPath: "inset(0% 0 0 0)" });
      gsap.set(img, { opacity: 1, scale: 1 });
      return;
    }
    gsap.fromTo(
      clip,
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 0.72, ease: "power3.out" },
    );
    gsap.fromTo(
      img,
      { scale: 1.12, opacity: 0.35 },
      { scale: 1, opacity: 1, duration: 0.85, ease: "power2.out" },
    );
  }, [workIndex, reduceMotion]);

  const activeWork = works[workIndex] ?? works[0];

  return (
    <article ref={rootRef} className={`kr ${sans.variable} ${serif.variable} ${sans.className}`}>
      <SolutionArrivalMarker href={page.href} />

      <div className="kr-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <header className="kr-hero">
        <div className="kr-hero__content">
          <div className="kr-hero__top">
            <div className="kr-hero__titlebox">
              <div className="kr-hero__heading">
                <div className="kr-hero__main">
                  <h1 className="kr-hero__title">AI-BOM</h1>
                </div>
                <div className="kr-hero__sub">
                  <p className="kr-hero__italic">
                    <em>See every </em>component
                  </p>
                </div>
              </div>
            </div>
            <div className="kr-hero__col" aria-hidden="true">
              <span className="kr-hero__line" />
            </div>
            <div className="kr-hero__col" aria-hidden="true">
              <span className="kr-hero__line" />
            </div>
            <div className="kr-hero__col" aria-hidden="true">
              <span className="kr-hero__line" />
            </div>
            <div className="kr-hero__col" aria-hidden="true" />
          </div>
          <div className="kr-hero__bot">
            <div className="kr-hero__col" aria-hidden="true">
              <span className="kr-hero__wipe" />
            </div>
            <div className="kr-hero__col" aria-hidden="true">
              <span className="kr-hero__wipe" />
            </div>
            <div className="kr-hero__col" aria-hidden="true">
              <span className="kr-hero__wipe" />
            </div>
            <div className="kr-hero__col kr-hero__col--cta">
              <div className="kr-hero__cta-box">
                <p className="kr-hero__lede">{page.heroBody}</p>
                <KrBtn href={ROUTES.contact} className="kr-btn--light">Get a briefing</KrBtn>
              </div>
            </div>
          </div>
        </div>
        <div className="kr-hero__photo">
          {[0, 1, 2, 3].map((index) => (
            <div className="kr-hero__slice" key={index}>
              <img src={IMG("hero")} alt="" />
            </div>
          ))}
        </div>
      </header>

      <section className="kr-about" id="inventory">
        <div className="kr-about__intro">
          <p className="kr-about__lede">{page.problemLead}</p>
          <div className="kr-about__notes">
            <p>{page.features[0].body}</p>
            <p>{page.features[1].body}</p>
          </div>
        </div>
        <div className="kr-about__stage">
          <div className="kr-about__grid">
            {["about1", "about2", "about3", "about4"].map((name, index) => (
              <figure key={name} className={`kr-about__fig kr-about__fig--${index + 1}`}>
                <img src={IMG(name)} alt="" />
              </figure>
            ))}
          </div>
          <div className="kr-stats__row">
            {certifications.map((item) => (
              <article key={item.id}>
                <strong>{item.name}</strong>
                <span>{item.authority}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-services">
        <div className="kr-services__pin">
          <div className="kr-services__left">
            <h2>What the AI-BOM covers.</h2>
            <p>{page.detectLead}</p>
            <div className="kr-services__photo">
              <img src={IMG("service")} alt="" />
              <KrBtn href="#work" className="kr-btn--light">Explore the inventory</KrBtn>
            </div>
          </div>
          <div className="kr-services__right">
            {services.map((item) => (
              <div className="kr-services__item" key={item.num}>
                <span>{item.num}.</span>
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-work" id="work">
        <div className="kr-work__pin">
          <div className="kr-work__left">
            <h2>What we look for</h2>
            <div className="kr-work__list">
              {works.map((item, index) => (
                <button
                  type="button"
                  key={item.num}
                  className={index === workIndex ? "is-on" : ""}
                  onMouseEnter={() => setWorkIndex(index)}
                  onFocus={() => setWorkIndex(index)}
                >
                  <span className="kr-work__num">{item.num}</span>
                  {index === workIndex ? <p className="kr-work__body">{item.body}</p> : null}
                </button>
              ))}
            </div>
            <KrBtn href={page.related[0]?.href ?? ROUTES.contact} className="kr-btn--ghost">
              View details
            </KrBtn>
          </div>
          <div className="kr-work__right">
            <div className="kr-work__clip" ref={workClipRef}>
              <img ref={workImgRef} src={activeWork.src} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="kr-process">
        <h2 className="kr-process__title">Process</h2>
        <div className="kr-process__grid">
          <figure className="kr-process__cell kr-process__photo kr-process__photo--a">
            <img src={IMG("duo1")} alt="" />
          </figure>
          <div className="kr-process__stack">
            {PROCESS.slice(0, 3).map((item, index) => (
              <div className="kr-process__cell" key={item}>
                <span>0{index + 1}.</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <figure className="kr-process__cell kr-process__photo kr-process__photo--b">
            <img src={IMG("duo2")} alt="" />
          </figure>
          {PROCESS.slice(3).map((item, index) => (
            <div className="kr-process__cell" key={item}>
              <span>0{index + 4}.</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="kr-banner">
        <div className="kr-banner__photo" aria-hidden="true">
          <img src={IMG("banner")} alt="" />
        </div>
        <div className="kr-banner__copy">
          <div className="kr-banner__clip">
            <h2>{page.ctaTitle}</h2>
          </div>
          <KrBtn href={ROUTES.contact} className="kr-btn--light">Get a briefing</KrBtn>
        </div>
      </section>

      <section className="kr-faq" id="detect">
        <h2>F.A.Q</h2>
        <div>
          {faqs.map((item, index) => (
            <div className={`kr-faq__item${openFaq === index ? " is-on" : ""}`} key={item.q}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <i aria-hidden="true">↗</i>
                <span>{item.q}</span>
              </button>
              <div className="kr-faq__answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
