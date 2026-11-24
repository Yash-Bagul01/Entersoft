import Link from "next/link";
import { DT_HERO } from "@/data/digitalTrustPage";
import DigitalTrustHeroCanvas from "@/components/services/digital-trust/DigitalTrustHeroCanvas";
import DigitalTrustMotion from "@/components/services/digital-trust/DigitalTrustMotion";

export default function DigitalTrustHero() {
  return (
    <header id="top" className="dt-hero">
      <DigitalTrustMotion />
      <div className="dt-hero__media" aria-hidden="true">
        <DigitalTrustHeroCanvas />
        <svg className="dt-hero__art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
          <defs>
            <radialGradient id="dt-hero-mint" cx="84%" cy="8%" r="52%">
              <stop offset="0%" stopColor="#f4f4f2" stopOpacity="0.4" />
              <stop offset="42%" stopColor="#6a6a6a" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0c0c0c" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dt-hero-warm" cx="98%" cy="88%" r="40%">
              <stop offset="0%" stopColor="#f5f4ef" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#0c0c0c" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#dt-hero-mint)" />
          <rect width="1440" height="900" fill="url(#dt-hero-warm)" />
          <g className="dt-hero__drift" fill="none" stroke="#f4f7f1" strokeOpacity="0.16">
            <rect x="980" y="110" width="300" height="188" rx="28" />
            <rect x="1050" y="210" width="250" height="156" rx="24" />
          </g>
          <circle className="dt-hero__spin" cx="1180" cy="168" r="220" fill="none" stroke="#f4f4f2" strokeOpacity="0.28" />
          <path
            className="dt-hero__flow"
            d="M860 520 C 1020 430, 1140 610, 1320 470"
            fill="none"
            stroke="#f4f4f2"
            strokeWidth="1.5"
            strokeDasharray="8 14"
          />
        </svg>
      </div>
      <div className="dt-wrap dt-hero__stage">
        <nav aria-label="Breadcrumb" className="dt-crumbs dt-rise" style={{ animationDelay: "0.05s" }}>
            <ol>
              <li>
                <Link href="/">{DT_HERO.breadcrumb[0]}</Link>
              </li>
              <li>
                <span className="dt-crumbs__sep" aria-hidden="true">
                  {" / "}
                </span>
                <Link href="/services">{DT_HERO.breadcrumb[1]}</Link>
              </li>
              <li>
                <span className="dt-crumbs__sep" aria-hidden="true">
                  {" / "}
                </span>
                <span aria-current="page">{DT_HERO.breadcrumb[2]}</span>
              </li>
            </ol>
        </nav>
        <div className="dt-hero__grid">
            <p className="dt-eyebrow dt-rise" style={{ animationDelay: "0.12s" }}>{DT_HERO.eyebrow}</p>
            <h1 className="dt-hero__title">
              <span className="dt-hero__line">
                {DT_HERO.h1[0].split(" ").map((word, index, words) => (
                  <span key={word} className="dt-hero__word-wrap">
                    <span className="dt-hero__word" style={{ animationDelay: `${0.16 + index * 0.08}s` }}>
                      {word}
                    </span>
                    {index < words.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>{" "}
              <span className="dt-hero__line">
                {DT_HERO.h1[1].split(" ").map((word, index, words) => (
                  <span key={word} className="dt-hero__word-wrap">
                    <span className="dt-hero__word" style={{ animationDelay: `${0.36 + index * 0.08}s` }}>
                      {word}
                    </span>
                    {index < words.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            </h1>
          <div className="dt-hero__copy">
            <p className="dt-hero__lead dt-rise" style={{ animationDelay: "0.62s" }}>{DT_HERO.lead}</p>
            <p className="dt-hero__proof dt-rise" style={{ animationDelay: "0.72s" }}>{DT_HERO.proof}</p>
            <p className="dt-hero__support dt-rise" style={{ animationDelay: "0.8s" }}>{DT_HERO.support}</p>
            <div className="dt-hero__actions dt-rise" style={{ animationDelay: "0.9s" }}>
            <a className="dt-btn dt-btn--primary" href={DT_HERO.primary.href}>
              {DT_HERO.primary.label}
              <span aria-hidden="true">→</span>
            </a>
            <a className="dt-btn" href={DT_HERO.secondary.href}>
              {DT_HERO.secondary.label}
              <span aria-hidden="true">↓</span>
            </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
