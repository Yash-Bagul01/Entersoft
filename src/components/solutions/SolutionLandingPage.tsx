import React from "react";
import Link from "next/link";
import { certifications } from "@/data/certifications";
import { testimonials } from "@/data/testimonials";
import type { SolutionLanding } from "@/data/solutionLandings";
import SolutionDemoForm from "@/components/solutions/SolutionDemoForm";
import SolutionArrivalMarker from "@/components/solutions/SolutionArrivalMarker";
import "@/components/solutions/solution-landing.css";

const QUOTES = testimonials.slice(0, 3);

export default function SolutionLandingPage({ page }: { page: SolutionLanding }) {
  return (
    <article className="sl-page">
      <SolutionArrivalMarker href={page.href} />
      <header className="sl-hero">
        <div className="sl-wrap sl-hero__grid">
          <div>
            <p className="sl-kicker">{page.kicker}</p>
            <h1>{page.heroTitle}</h1>
            <p className="sl-hero__body">{page.heroBody}</p>
          </div>
          <SolutionDemoForm heading="Get a briefing" idPrefix="sl-hero" />
        </div>
      </header>

      <section className="sl-trust" aria-label="Accreditations">
        <div className="sl-wrap">
          <p>Security programmes trust Entersoft</p>
          <ul>
            {certifications.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sl-problem">
        <div className="sl-wrap">
          <h2>{page.problemTitle}</h2>
          <p className="sl-problem__lead">{page.problemLead}</p>
          <div className="sl-problem__grid">
            {page.problems.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {page.features.map((feature, index) => (
        <section className={index % 2 ? "sl-feature sl-feature--alt" : "sl-feature"} key={feature.title}>
          <div className="sl-wrap">
            <p className="sl-feature__kicker">{feature.kicker}</p>
            <h2>{feature.title}</h2>
            <p className="sl-feature__body">{feature.body}</p>
            <ul>
              {feature.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="sl-detect">
        <div className="sl-wrap">
          <h2>{page.detectTitle}</h2>
          <p className="sl-detect__lead">{page.detectLead}</p>
          <div className="sl-detect__grid">
            {page.detections.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sl-quotes">
        <div className="sl-wrap">
          <h2>What customers say</h2>
          <div className="sl-quotes__grid">
            {QUOTES.map((item) => (
              <article key={item.id}>
                <blockquote>“{item.quote}”</blockquote>
                <figcaption>
                  {item.author}
                  <br />
                  {item.role}, {item.company}
                </figcaption>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sl-related">
        <div className="sl-wrap">
          <h2>Continue in platform and services</h2>
          <ul>
            {page.related.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/solutions">All solutions</Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="sl-cta">
        <div className="sl-wrap sl-cta__box">
          <div>
            <h2>{page.ctaTitle}</h2>
            <p>{page.ctaBody}</p>
          </div>
          <SolutionDemoForm heading="Request a briefing" idPrefix="sl-cta" />
        </div>
      </section>
    </article>
  );
}
