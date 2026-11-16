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
            <radialGradient id="av-hero-copper" cx="88%" cy="6%" r="54%">
              <stop offset="0%" stopColor="#e7a27a" stopOpacity="0.62" />
              <stop offset="38%" stopColor="#6a2e22" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#070b12" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="av-hero-ink" cx="4%" cy="100%" r="42%">
              <stop offset="0%" stopColor="#f2d3b6" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#070b12" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="900" fill="#070b12" />
          <rect width="1440" height="900" fill="url(#av-hero-copper)" />
          <rect width="1440" height="900" fill="url(#av-hero-ink)" />
          <g className="av-hero__trace" fill="none" stroke="#f3d2b8" strokeWidth="1.25">
            <path d="M140 680 L390 540 L700 590 L980 310 L1260 210" />
            <path d="M980 310 L1120 420" opacity="0.45" />
          </g>
          <g className="av-hero__drift" fill="none" stroke="#ffffff" strokeOpacity="0.18">
            <path d="M1040 140 H1300 V250 H1140 Z" />
            <path d="M1110 210 H1340 V330 H1200 Z" />
          </g>
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

        <div className="av-hero__copy">
          <p className="av-hero__overline">{AV_HERO.overline}</p>
          <h1 className="av-hero__title">{AV_HERO.h1}</h1>
          <p className="av-hero__statement">
            <span className="av-hero__statement-line">{AV_HERO.statement[0]}</span>
            <span className="av-hero__statement-line">{AV_HERO.statement[1]}</span>
          </p>
          <p className="av-hero__lead">{AV_HERO.lead}</p>
          <p className="av-hero__proof">{AV_HERO.proof}</p>
          <div className="av-hero__ctas">
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
