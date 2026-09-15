"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  SERVICE_CASES,
  type ServiceCaseSlug,
} from "@/data/serviceCases";
import { useOptionalSolutionTransition } from "@/components/solutions/SolutionTransitionContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "@/components/solutions/solution-case.css";

export default function ServiceCaseHero({ slug }: { slug: ServiceCaseSlug }) {
  const visual = SERVICE_CASES[slug];
  const transition = useOptionalSolutionTransition();
  const reduce = useReducedMotion();
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleWords = useMemo(() => visual.title.split(" "), [visual.title]);

  useLayoutEffect(() => {
    const kicker = kickerRef.current;
    const title = titleRef.current;
    if (!kicker || !title) return;

    const words = title.querySelectorAll<HTMLElement>(".sc-hero__word");
    const incoming = transition?.phase === "covering" || transition?.phase === "expanding";

    if (reduce) {
      gsap.set([kicker, words], { autoAlpha: 1, y: 0 });
      transition?.markArrived(visual.href);
      return;
    }

    gsap.set(kicker, { autoAlpha: 0, y: 16 });
    gsap.set(words, { autoAlpha: 0, y: "108%" });
    transition?.markArrived(visual.href);

    const tl = gsap.timeline({ delay: incoming ? 0.24 : 0.06 });
    tl.to(kicker, {
      autoAlpha: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
    }, 0).to(words, {
      autoAlpha: 1,
      y: "0%",
      duration: 1.15,
      stagger: 0.1,
      ease: "power3.out",
    }, 0.14);

    return () => {
      tl.kill();
    };
  }, [reduce, transition, visual.href]);

  return (
    <header className="sc-hero dark-panel">
      <div className="sc-hero__media">
        <Image
          src={visual.hero.src}
          alt={visual.hero.alt}
          fill
          priority
          unoptimized
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="sc-hero__shade" />
      <div className="sc-hero__copy">
        <p ref={kickerRef} className="sc-kicker">{visual.category}</p>
        <h1 ref={titleRef} className="sc-hero__title">
          {titleWords.map((word, i) => (
            <span key={`${word}-${i}`} className="sc-hero__word-wrap">
              <span className="sc-hero__word">{word}</span>
            </span>
          ))}
        </h1>
      </div>
    </header>
  );
}
