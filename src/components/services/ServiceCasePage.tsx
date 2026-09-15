"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications } from "@/data/certifications";
import { ROUTES } from "@/config/routes";
import {
  otherServiceCases,
  SERVICE_CASES,
  type ServiceCaseSlug,
} from "@/data/serviceCases";
import { SERVICE_CASE_COPY } from "@/data/serviceCaseCopy";
import { useOptionalSolutionTransition } from "@/components/solutions/SolutionTransitionContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "@/components/solutions/solution-case.css";

export default function ServiceCasePage({ slug }: { slug: ServiceCaseSlug }) {
  const visual = SERVICE_CASES[slug];
  const copy = SERVICE_CASE_COPY[slug];
  const transition = useOptionalSolutionTransition();
  const reduce = useReducedMotion();
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const more = useMemo(() => otherServiceCases(slug), [slug]);
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

  const leadProse = copy.directionProse[0];
  const supportProse = copy.directionProse.slice(1);

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
          <p ref={kickerRef} className="sc-kicker">{copy.kicker}</p>
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
            <p>{copy.lede}</p>
            <p>{copy.ledeFaded}</p>
          </div>
          <div className="sc-tags">
            {copy.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        <section className="sc-section">
          <p className="sc-section__label">{copy.directionLabel}</p>
          <h2 className="sc-section__title">{copy.directionTitle}</h2>
          <p className="sc-prose">{leadProse}</p>
          {supportProse.map((paragraph) => (
            <p key={paragraph} className="sc-prose">{paragraph}</p>
          ))}
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
            <p className="sc-section__label">{copy.splitLabel}</p>
            <h2 className="sc-section__title">{visual.title}</h2>
          </div>
          <div>
            {copy.splitItems.map((item) => (
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
          <p className="sc-section__label">{copy.processLabel}</p>
          <h2 className="sc-section__title">{copy.processTitle}</h2>
          <p className="sc-prose">{copy.processIntro}</p>
          <div className="sc-process">
            {copy.process.map((step) => (
              <div key={step.step + step.title} className="sc-process__row">
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
          <p className="sc-section__label">{copy.fitsLabel}</p>
          <h2 className="sc-section__title">{copy.fitsTitle}</h2>
          <div className="sc-fits">
            {copy.fits.map((fit) => {
              const inner = (
                <>
                  <h3 className="sc-fits__name">{fit.name}</h3>
                  <p>{fit.description}</p>
                </>
              );
              return fit.href ? (
                <Link key={fit.name} href={fit.href}>{inner}</Link>
              ) : (
                <div key={fit.name} className="sc-fits__item">{inner}</div>
              );
            })}
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
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="sc-close">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top
          </button>
          <Link href={ROUTES.servicesHub}>All services</Link>
          <span>{certifications.map((item) => item.name).join(" · ")}</span>
        </div>
      </div>
    </article>
  );
}
