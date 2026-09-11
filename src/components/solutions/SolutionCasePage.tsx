"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { platformPillars } from "@/data/platform";
import { certifications } from "@/data/certifications";
import {
  otherSolutionCases,
  SOLUTION_CASES,
  tagsForCase,
  type SolutionCaseSlug,
} from "@/data/solutionCases";
import { useOptionalSolutionTransition } from "@/components/solutions/SolutionTransitionContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "@/components/solutions/solution-case.css";

export default function SolutionCasePage({ slug }: { slug: SolutionCaseSlug }) {
  const visual = SOLUTION_CASES[slug];
  const pillar = platformPillars[slug];
  const transition = useOptionalSolutionTransition();
  const reduce = useReducedMotion();
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const more = useMemo(() => otherSolutionCases(slug), [slug]);
  const tags = useMemo(() => (pillar ? tagsForCase(visual, pillar) : visual.tags), [pillar, visual]);
  const titleWords = useMemo(() => visual.showcaseTitle.split(" "), [visual.showcaseTitle]);

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

  useLayoutEffect(() => {
    if (reduce || !articleRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const headings = articleRef.current.querySelectorAll<HTMLElement>(
      ".sc-section__label, .sc-section__title"
    );
    const tweens: gsap.core.Tween[] = [];
    headings.forEach((el) => {
      gsap.set(el, { autoAlpha: 0, y: 28 });
      tweens.push(
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        })
      );
    });
    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, [reduce, slug]);

  if (!pillar) return null;

  const lead = pillar.whatItDoes[0];
  const support = pillar.whatItDoes.slice(1);

  return (
    <article id="solution-case" ref={articleRef} className="dark-panel">
      <header className="sc-hero">
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
          <p ref={kickerRef} className="sc-kicker">View</p>
          <h1 ref={titleRef} className="sc-hero__title">
            {titleWords.map((word, i) => (
              <span key={`${word}-${i}`} className="sc-hero__word-wrap">
                <span className="sc-hero__word">{word}</span>
              </span>
            ))}
          </h1>
        </div>
      </header>

      <div className="sc-wrap">
        <section className="sc-intro">
          <div className="sc-intro__lede">
            <p>{pillar.summary}</p>
            <p>{pillar.summary}</p>
          </div>
          <div className="sc-tags">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        <section className="sc-section">
          <p className="sc-section__label">Art Direction</p>
          <h2 className="sc-section__title">{lead?.title ?? pillar.coreCapability}</h2>
          <p className="sc-prose">{lead?.description}</p>
          <p className="sc-prose">{pillar.coreCapability}. {pillar.descriptor}.</p>
        </section>
      </div>

      <div className="sc-wrap">
        <div className="sc-grid">
          {visual.gallery.slice(0, 2).map((image) => (
            <figure key={image.src} className="sc-frame sc-frame--tall">
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
            </figure>
          ))}
        </div>
      </div>

      <div className="sc-wrap">
        <section className="sc-section sc-split">
          <div>
            <p className="sc-section__label">{pillar.cluster}</p>
            <h2 className="sc-section__title">{pillar.title}</h2>
          </div>
          <div>
            {support.map((item) => (
              <p key={item.title} className="sc-prose">
                <strong className="block text-[var(--sc-ink)] mb-2">{item.title}.</strong>
                {item.description}
              </p>
            ))}
          </div>
        </section>
      </div>

      <div className="sc-wrap">
        <div className="sc-grid">
          {visual.gallery.slice(2, 6).map((image) => (
            <figure key={image.src} className="sc-frame">
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
            </figure>
          ))}
        </div>
      </div>

      <div className="sc-wrap">
        <section className="sc-section">
          <p className="sc-section__label">Creative Process</p>
          <h2 className="sc-section__title">How the system holds together</h2>
          <p className="sc-prose">{pillar.summary}</p>
          <div className="sc-process">
            {pillar.howItWorks.map((step) => (
              <div key={step.step} className="sc-process__row">
                <span className="sc-process__step">{step.step}</span>
                <h3 className="sc-process__name">{step.title}</h3>
                <p className="sc-prose" style={{ margin: 0 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="sc-wrap">
        <figure className="sc-frame sc-frame--wide">
          <Image
            src={visual.wide.src}
            alt={visual.wide.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </figure>
      </div>

      <div className="sc-wrap">
        <section className="sc-section">
          <p className="sc-section__label">Where it fits</p>
          <h2 className="sc-section__title">In the operating model</h2>
          <div className="sc-fits">
            {pillar.whereItFits.map((fit) => (
              <Link key={fit.serviceHref} href={fit.serviceHref}>
                <h3 className="sc-fits__name">{fit.serviceName}</h3>
                <p>{fit.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="sc-more">
          <p className="sc-section__label">See more projects</p>
          <div className="sc-more__grid">
            {more.map((item) => (
              <Link key={item.slug} href={item.href} className="sc-more__card">
                <Image
                  src={item.hero.src}
                  alt={item.hero.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className="object-cover"
                />
                <span>{item.showcaseTitle}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="sc-close">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top
          </button>
          <Link href="/solutions">All solutions</Link>
          <span>{certifications.map((item) => item.name).join(" · ")}</span>
        </div>
      </div>
    </article>
  );
}
