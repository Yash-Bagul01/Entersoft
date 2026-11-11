"use client";

import type { RefObject } from "react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { APPSEC_BREADCRUMB, APPSEC_HERO } from "@/data/appsecPage";

type AppsecHeroProps = {
  kickerRef: RefObject<HTMLParagraphElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
};

export default function AppsecHero({ kickerRef, titleRef }: AppsecHeroProps) {
  const lastLine = APPSEC_HERO.h1Lines.length - 1;

  return (
    <header id="hero" className="as-hero">
      <div className="as-hero__media" aria-hidden="true">
        <svg className="as-hero__art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
          <defs>
            <radialGradient id="as-hero-violet" cx="82%" cy="6%" r="58%">
              <stop offset="0%" stopColor="#8b7cff" stopOpacity="0.95" />
              <stop offset="38%" stopColor="#3a2f86" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#070b16" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="as-hero-amber" cx="96%" cy="86%" r="42%">
              <stop offset="0%" stopColor="#ffc2a0" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#070b16" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="as-hero-teal" cx="4%" cy="96%" r="40%">
              <stop offset="0%" stopColor="#8ee7dc" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#070b16" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="900" fill="#070b16" />
          <rect width="1440" height="900" fill="url(#as-hero-violet)" />
          <rect width="1440" height="900" fill="url(#as-hero-amber)" />
          <rect width="1440" height="900" fill="url(#as-hero-teal)" />
          <g className="as-drift" fill="none" stroke="#ffffff" strokeOpacity="0.14">
            <rect x="980" y="120" width="280" height="180" rx="28" />
            <rect x="1040" y="220" width="240" height="150" rx="24" />
          </g>
          <circle cx="1180" cy="160" r="220" fill="none" stroke="#ffffff" strokeOpacity="0.08" />
        </svg>
      </div>
      <div className="as-hero__inner">
        <nav aria-label="Breadcrumb" className="as-crumbs" data-hero-rise>
          <ol>
            <li>
              <Link href={ROUTES.home}>{APPSEC_BREADCRUMB.home}</Link>
            </li>
            <li>
              <span className="as-crumbs__sep" aria-hidden="true"> / </span>
              <span aria-current="page">{APPSEC_BREADCRUMB.current}</span>
            </li>
          </ol>
        </nav>

        <div className="as-hero__copy">
          <p ref={kickerRef} className="sc-kicker">{APPSEC_HERO.overline}</p>
          <h1 ref={titleRef} className="sc-hero__title as-hero__title">
            {APPSEC_HERO.h1Lines.map((line, lineIndex) => {
              const words = line.split(" ");
              return (
                <span key={line} className="as-hero__line">
                  {words.map((word, i) => {
                    const trailing = i < words.length - 1 || lineIndex < lastLine;
                    return (
                      <span key={`${word}-${i}`} className="sc-hero__word-wrap">
                        <span className="sc-hero__word">
                          {word}
                          {trailing ? " " : null}
                        </span>
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </h1>
          <p className="as-hero__lead" data-hero-rise>{APPSEC_HERO.lead}</p>
          <p className="as-hero__proof" data-hero-rise>
            {APPSEC_HERO.proof.map((item, i) => (
              <span key={item} className="as-hero__proof-item">
                {i > 0 ? <span className="as-hero__proof-sep" aria-hidden="true"> • </span> : null}
                {item}
              </span>
            ))}
          </p>
          <div className="as-hero__ctas" data-hero-rise>
            <a href={APPSEC_HERO.primaryCta.href} className="as-btn as-btn--primary">
              {APPSEC_HERO.primaryCta.label}
              <span aria-hidden="true">→</span>
            </a>
            <a href={APPSEC_HERO.secondaryCta.href} className="as-btn">
              {APPSEC_HERO.secondaryCta.label}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <figure id="hero-visual" className="as-map" data-hero-rise>
          <svg className="as-map__schematic" viewBox="0 0 360 460" aria-hidden="true" focusable="false">
            <defs>
              <radialGradient id="as-map-glow" cx="78%" cy="12%" r="70%">
                <stop offset="0%" stopColor="#8b7cff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#8b7cff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="360" height="460" fill="url(#as-map-glow)" />
            <g fill="none" stroke="currentColor" strokeOpacity="0.28">
              <circle cx="300" cy="72" r="86" />
              <circle cx="48" cy="400" r="64" />
            </g>
          </svg>
          <ol className="as-map__flow" aria-label="Application trust map">
            {APPSEC_HERO.visualNodes.map((node, i) => (
              <li key={node} className="as-map__node">
                <span className="as-map__index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="as-map__label">{node}</span>
              </li>
            ))}
          </ol>
          <p className="as-map__band">
            <span className="as-map__band-mark" aria-hidden="true" />
            {APPSEC_HERO.visualBand}
          </p>
          <figcaption className="as-map__caption">{APPSEC_HERO.visualCaption}</figcaption>
        </figure>
      </div>
    </header>
  );
}
