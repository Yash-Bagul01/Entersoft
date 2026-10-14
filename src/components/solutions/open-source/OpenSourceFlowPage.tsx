"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Inter_Tight } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SolutionLanding } from "@/data/solutionLandings";
import SolutionArrivalMarker from "@/components/solutions/SolutionArrivalMarker";
import MagneticButton from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ROUTES } from "@/config/routes";
import "@/components/solutions/open-source/open-source-flow.css";

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--os-display",
});

const OS = (name: string) => `/images/solutions/open-source/${name}.jpg`;

const HERO_SLIDES = [
  { src: OS("hero-freight"), frame: "port" },
  { src: OS("hero-editor"), frame: "code" },
  { src: OS("hero-chip"), frame: "chip" },
];

const HERO_LINES = ["Know What You", "Inherited — And", "Whether You Can", "Still Ship It."];

const MANIFESTO_LINES = [
  "Most of your code did not",
  "come from your repo.",
  "Applications are assembled",
  "from packages. The risk lives",
  "in versions you did not write",
  "and licenses you did not",
  "negotiate.",
];

function Line({ children }: { children: React.ReactNode }) {
  return (
    <span className="os-mask">
      <span className="os-line">{children}</span>
    </span>
  );
}

export default function OpenSourceFlowPage({ page }: { page: SolutionLanding }) {
  const rootRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const cases = [
    {
      number: "1",
      title: "Find the\npackages",
      tags: "Software composition\n/ Transitive risk",
      thumb: OS("work-react"),
      image: OS("work-react"),
      view: "SCA",
      href: ROUTES.platform.sca,
    },
    {
      number: "2",
      title: "Keep a living\nSBOM",
      tags: "CycloneDX · SPDX\n/ License class",
      thumb: OS("work-charts"),
      image: OS("work-charts"),
      view: "SBOM",
      href: ROUTES.platform.sbomLicenseRisk,
    },
    {
      number: "3",
      title: "Rank the\nlicenses",
      tags: "Copyleft class\n/ Customer SBOM",
      thumb: OS("work-gavel"),
      image: OS("work-gavel"),
      view: "Licenses",
      href: ROUTES.platform.sbomLicenseRisk,
    },
  ];

  useEffect(() => {
    const root = rootRef.current;
    const work = workRef.current;
    if (!root || !work || reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const copyLines = gsap.utils.toArray<HTMLElement>(".os-hero__pair p, .os-hero h1 span");
      gsap.fromTo(
        copyLines,
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.95,
          stagger: 0.07,
          ease: "power4.out",
          delay: 0.06,
        }
      );
      gsap.fromTo(
        ".os-hero__word",
        { autoAlpha: 0.35 },
        { autoAlpha: 1, duration: 0.9, ease: "power2.out", delay: 0.15 }
      );

      const slides = gsap.utils.toArray<HTMLElement>(".os-hero__slide");
      const mediaOf = (slide: HTMLElement) => slide.querySelector<HTMLElement>("img, video");

      slides.forEach((slide, index) => {
        const media = mediaOf(slide);
        gsap.set(slide, {
          zIndex: index === 0 ? 2 : 1,
          clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
        });
        if (media) gsap.set(media, { x: 0, xPercent: 0, scale: index === 0 ? 1.06 : 1 });
      });

      const firstMedia = slides[0] ? mediaOf(slides[0]) : null;
      if (firstMedia) {
        gsap.to(firstMedia, { scale: 1, duration: 2.4, ease: "power2.out" });
      }

      gsap.fromTo(
        ".os-hero__index",
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.55, ease: "power2.out" }
      );

      if (slides.length > 1) {
        const reel = gsap.timeline({ repeat: -1, delay: 1.6, defaults: { ease: "power3.inOut" } });
        slides.forEach((slide, index) => {
          const next = slides[(index + 1) % slides.length];
          const nextMedia = mediaOf(next);
          reel
            .set(next, { zIndex: 4, clipPath: "inset(0% 100% 0% 0%)" }, "+=1.8")
            .set(slide, { zIndex: 2 })
            .to(next, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "power3.inOut" });
          if (nextMedia) {
            reel.fromTo(
              nextMedia,
              { x: 0, xPercent: 0, scale: 1.06 },
              { x: 0, xPercent: 0, scale: 1, duration: 1.05, ease: "power3.inOut" },
              "<"
            );
          }
          reel.set(slide, { zIndex: 1, clipPath: "inset(0% 100% 0% 0%)" });
        });
      }

      mm.add("(min-width: 901px)", () => {
        ScrollTrigger.create({
          trigger: ".os-hero",
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
        gsap.set(".os-hero", { zIndex: 1 });
        gsap.to(".os-hero__track", {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".os-hero",
            start: "top top",
            end: "+=100%",
            scrub: 0.35,
          },
        });
      });

      gsap.fromTo(
        ".os-manifesto figure img",
        { scale: 1.12 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".os-manifesto", start: "top 90%" },
        }
      );

      gsap.from(".os-since > *", {
        y: 36,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".os-since", start: "top 78%" },
      });

      const copies = gsap.utils.toArray<HTMLElement>(".os-work__copy-inner");
      const panels = gsap.utils.toArray<HTMLElement>(".os-work__panel");
      const shots = gsap.utils.toArray<HTMLElement>(".os-work__panel img");

      mm.add("(min-width: 901px)", () => {
        gsap.set(copies, { y: (i) => (i === 0 ? 0 : 96), autoAlpha: (i) => (i === 0 ? 1 : 0) });
        gsap.set(panels, {
          zIndex: (i) => i + 1,
          clipPath: (i) => (i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)"),
        });
        gsap.set(shots, { scale: (i) => (i === 0 ? 1 : 1.18) });

        const workTl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: work,
            start: "top top",
            end: "+=360%",
            pin: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        workTl.to({}, { duration: 0.38 });
        copies.forEach((copy, index) => {
          if (index === 0) return;
          const at = `swap-${index}`;
          workTl
            .to(copies[index - 1], { y: -96, autoAlpha: 0, duration: 1 }, at)
            .to(copy, { y: 0, autoAlpha: 1, duration: 1 }, at)
            .to(panels[index], { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, at)
            .to(shots[index], { scale: 1, duration: 1 }, at);
        });
        workTl.to({}, { duration: 0.42 });
      });

      mm.add("(max-width: 900px)", () => {
        gsap.set(copies, { y: 0, autoAlpha: 1, clearProps: "transform" });
        gsap.set(panels, { clipPath: "none", autoAlpha: 1 });
        gsap.set(shots, { scale: 1 });
      });

      gsap.from(".os-trust__copy > *", {
        y: 36,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".os-trust", start: "top 76%" },
      });
      gsap.fromTo(
        ".os-trust figure",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".os-trust figure", start: "top 86%" },
        }
      );
      gsap.fromTo(
        ".os-trust figure img",
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".os-trust figure", start: "top 86%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".os-words p").forEach((line, index) => {
        const from = index % 2 ? "20vw" : "-18vw";
        const to = index % 2 ? "-18vw" : "20vw";
        gsap.fromTo(
          line,
          { x: from },
          {
            x: to,
            ease: "none",
            scrollTrigger: {
              trigger: ".os-words",
              start: "top 90%",
              end: "bottom 10%",
              scrub: 0.55,
            },
          }
        );
      });

      gsap.fromTo(
        ".os-about figure",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".os-about", start: "top 78%" },
        }
      );
      gsap.fromTo(
        ".os-about figure img",
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".os-about", start: "top 78%" },
        }
      );
      gsap.from(".os-about .os-line, .os-about__copy p, .os-about__copy a", {
        y: 28,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: ".os-about", start: "top 76%" },
      });

    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const timers = [window.setTimeout(refresh, 160), window.setTimeout(refresh, 480)];

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      mm.revert();
      ctx.revert();
    };
  }, [reduceMotion]);

  return (
    <article ref={rootRef} className={`os ${display.variable}`}>
      <SolutionArrivalMarker href={page.href} />

      <header className="os-hero" id="top">
        <div className="os-hero__media">
          <div className="os-hero__track">
            {HERO_SLIDES.map((slide) => (
              <figure className={`os-hero__slide os-hero__slide--${slide.frame}`} key={slide.src}>
                <img src={slide.src} alt="" />
              </figure>
            ))}
          </div>
        </div>
        <div className="os-hero__copy">
          <div className="os-hero__pair">
            <p>
              Supply-chain
              <br />
              assurance
            </p>
            <p>
              + SCA · SBOM
              <br />
              License review
            </p>
          </div>
          <h1>
            {HERO_LINES.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
        </div>
        <div className="os-hero__brand">
          <p className="os-hero__index">(01)</p>
        </div>
        <p className="os-hero__word" aria-hidden="true">
          SBOM
        </p>
      </header>

      <section className="os-manifesto">
        <p className="os-manifesto__cap">
          Inherited graph
          <br />
          Declared and transitive
          <br />
          License class
        </p>
        <figure>
          <img src={OS("manifesto")} alt="" />
        </figure>
        <p className="os-manifesto__copy">
          {MANIFESTO_LINES.map((line) => (
            <Line key={line}>{line}</Line>
          ))}
        </p>
      </section>

      <section className="os-since">
        <h2>Entersoft is a supply-chain practice</h2>
        <div>
          <p>
            We take a single inventory of declared and transitive dependencies, then rank what is actually reachable — so engineering, legal and security argue from the same build.
          </p>
          <p>{page.heroBody}</p>
        </div>
        <span>(02)</span>
      </section>

      <section className="os-work" ref={workRef}>
        <div className="os-work__left">
          {cases.map((item) => (
            <div className="os-work__copy" key={item.number}>
              <div className="os-work__copy-inner">
                <p className="os-work__num">{item.number}</p>
                <h2>
                  {item.title.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h2>
                <p className="os-work__tags">
                  {item.tags.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
                <img src={item.thumb} alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className="os-work__right">
          {cases.map((item) => (
            <div className="os-work__panel" key={item.view}>
              <img src={item.image} alt="" />
              <div className="os-work__view">
                <MagneticButton strength={0.28} radius={110}>
                  <Link href={item.href}>
                    {item.view}
                    <span>(View)</span>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="os-trust">
        <div className="os-trust__copy">
          <h2>Build more trust combining the craft of SCA and the excellence of a living SBOM</h2>
          <MagneticButton>
            <Link href={ROUTES.platform.sca}>More about the platform</Link>
          </MagneticButton>
        </div>
        <figure>
          <img src={OS("trust")} alt="" />
          <figcaption>Open source review · declared and transitive</figcaption>
        </figure>
      </section>

      <section className="os-words" aria-hidden="true">
        <p>
          PACKAGES <i>(A)</i>
        </p>
        <p>
          LICENSES <i>(B)</i>
        </p>
        <p>
          INVENTORY <i>(C)</i>
        </p>
      </section>

      <section className="os-about" id="detections">
        <figure>
          <img src={OS("about")} alt="" />
          <figcaption>Supply chain · what you inherited</figcaption>
        </figure>
        <div className="os-about__copy">
          <p className="os-kicker">
            <Line>(About the risk)</Line>
          </p>
          <h2>
            <Line>{page.problemTitle}.</Line>
          </h2>
          <p>
            {page.problemLead} Direct dependencies, nested libraries, CVE-backed versions, copyleft class and release drift all have to be named before a customer asks for the SBOM.
          </p>
          <MagneticButton>
            <Link href={ROUTES.contact}>Learn more about a briefing</Link>
          </MagneticButton>
        </div>
      </section>
    </article>
  );
}
