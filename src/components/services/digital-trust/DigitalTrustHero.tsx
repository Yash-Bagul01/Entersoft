import Link from "next/link";
import { DT_HERO } from "@/data/digitalTrustPage";
import DigitalTrustEvidencePanel from "@/components/services/digital-trust/DigitalTrustEvidencePanel";

export default function DigitalTrustHero() {
  return (
    <header id="top" className="dt-hero">
      <div className="dt-wrap dt-hero__grid">
        <div className="dt-hero__copy">
          <nav aria-label="Breadcrumb" className="dt-crumbs">
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
          <p className="dt-eyebrow">{DT_HERO.eyebrow}</p>
          <h1 className="dt-hero__title">
            <span className="dt-hero__line">{DT_HERO.h1[0]}</span>{" "}
            <span className="dt-hero__line">{DT_HERO.h1[1]}</span>
          </h1>
          <p className="dt-hero__lead">{DT_HERO.lead}</p>
          <p className="dt-hero__proof">{DT_HERO.proof}</p>
          <p className="dt-hero__support">{DT_HERO.support}</p>
          <div className="dt-hero__actions">
            <a className="dt-btn dt-btn--primary" href={DT_HERO.primary.href}>
              {DT_HERO.primary.label}
            </a>
            <a className="dt-btn" href={DT_HERO.secondary.href}>
              {DT_HERO.secondary.label}
            </a>
          </div>
        </div>
        <DigitalTrustEvidencePanel />
      </div>
    </header>
  );
}
