import Link from "next/link";
import { AV_BREADCRUMB, AV_HERO, AV_NAV } from "@/data/adversarialValidationPage";
import AssessmentPath from "@/components/services/adversarial-validation/AssessmentPath";
import "@/components/services/adversarial-validation/adversarial-validation.css";

export default function AdversarialValidationHero() {
  return (
    <header className="av-hero">
      <div className="av-hero__media" aria-hidden="true">
        <svg className="av-hero__art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
          <defs>
            <radialGradient id="av-hero-violet" cx="78%" cy="6%" r="54%">
              <stop offset="0%" stopColor="#9aa3ff" stopOpacity="0.85" />
              <stop offset="38%" stopColor="#5e6ad2" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#08090a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="av-hero-warm" cx="98%" cy="86%" r="42%">
              <stop offset="0%" stopColor="#ffc2a0" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#08090a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="av-hero-teal" cx="4%" cy="96%" r="38%">
              <stop offset="0%" stopColor="#8ee7dc" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#08090a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="900" fill="#08090a" />
          <rect width="1440" height="900" fill="url(#av-hero-violet)" />
          <rect width="1440" height="900" fill="url(#av-hero-warm)" />
          <rect width="1440" height="900" fill="url(#av-hero-teal)" />
          <g className="av-hero__drift" fill="none" stroke="#ffffff" strokeOpacity="0.16">
            <rect x="960" y="100" width="320" height="200" rx="28" />
            <rect x="1040" y="200" width="260" height="160" rx="24" />
          </g>
          <circle className="av-hero__spin" cx="1160" cy="160" r="230" fill="none" stroke="#ffffff" strokeOpacity="0.08" />
          <path
            className="av-hero__flow"
            d="M980 430 C 1100 360, 1180 500, 1320 390 S 1560 300, 1680 360"
            fill="none"
            stroke="#9aa3ff"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="10 16"
          />
        </svg>
      </div>
      <div className="av-hero__inner">
        <nav aria-label="Breadcrumb" className="av-crumbs">
          <ol>
            <li>
              <Link href={AV_BREADCRUMB.homeHref}>{AV_BREADCRUMB.home}</Link>
            </li>
            <li>
              <span className="av-crumbs__sep" aria-hidden="true">
                {" / "}
              </span>
              <span aria-current="page">{AV_BREADCRUMB.current}</span>
            </li>
          </ol>
        </nav>

        <div className="av-hero__layout">
        <div className="av-hero__copy">
          <p className="av-hero__overline av-rise" style={{ animationDelay: "0.04s" }}>{AV_HERO.overline}</p>
          <h1 className="av-hero__title">
            {AV_HERO.h1.split(" ").map((word, index) => (
              <span key={word} className="av-hero__line">
                <span className="av-hero__word" style={{ animationDelay: `${0.12 + index * 0.1}s` }}>{word}</span>
              </span>
            ))}
          </h1>
          <p className="av-hero__statement">
            <span className="av-hero__statement-line av-rise" style={{ animationDelay: "0.34s" }}>{AV_HERO.statement[0]}</span>
            <span className="av-hero__statement-line av-rise" style={{ animationDelay: "0.44s" }}>{AV_HERO.statement[1]}</span>
          </p>
          <p className="av-hero__lead av-rise" style={{ animationDelay: "0.52s" }}>{AV_HERO.lead}</p>
          <p className="av-hero__proof av-rise" style={{ animationDelay: "0.62s" }}>{AV_HERO.proof}</p>
          <div className="av-hero__ctas av-rise" style={{ animationDelay: "0.72s" }}>
            <a className="av-btn av-btn--primary" href={AV_HERO.primaryCta.href}>
              {AV_HERO.primaryCta.label}
              <span aria-hidden="true">→</span>
            </a>
            <a className="av-btn" href={AV_HERO.secondaryCta.href}>
              {AV_HERO.secondaryCta.label}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
          <AssessmentPath />
        </div>

        <nav aria-label="On this page" className="av-nav">
          <ul className="av-nav__list">
            {AV_NAV.map((item) => (
              <li key={item.href}>
                <a className="av-nav__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
