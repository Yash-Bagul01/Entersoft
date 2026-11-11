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
            <radialGradient id="as-hero-violet" cx="70%" cy="20%" r="55%">
              <stop offset="0%" stopColor="#7c6bff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#7c6bff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="as-hero-amber" cx="88%" cy="70%" r="45%">
              <stop offset="0%" stopColor="#ff8a3d" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="as-hero-teal" cx="12%" cy="80%" r="40%">
              <stop offset="0%" stopColor="#3ec6d6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#3ec6d6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="900" fill="#100c28" />
          <rect width="1440" height="900" fill="url(#as-hero-violet)" />
          <rect width="1440" height="900" fill="url(#as-hero-amber)" />
          <rect width="1440" height="900" fill="url(#as-hero-teal)" />
          <g fill="#ffffff" opacity="0.28">
            {Array.from({ length: 18 }, (_, row) =>
              Array.from({ length: 28 }, (_, col) => (
                <circle key={`${row}-${col}`} cx={40 + col * 52} cy={30 + row * 50} r={col % 5 === 0 ? 1.6 : 0.9} />
              )),
            )}
          </g>
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
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M28 28 H332 M28 28 V432 M180 28 V432 M332 28 V432" />
              <path className="as-map__trace" d="M28 78 H150 V168 H250 V258 H120 V348 H300" />
              <circle cx="150" cy="168" r="3" fill="currentColor" stroke="none" />
              <circle cx="250" cy="258" r="3" fill="currentColor" stroke="none" />
              <circle cx="120" cy="348" r="3" fill="currentColor" stroke="none" />
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
