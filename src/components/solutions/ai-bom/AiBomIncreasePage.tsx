"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications } from "@/data/certifications";
import { testimonials } from "@/data/testimonials";
import type { SolutionLanding } from "@/data/solutionLandings";
import SolutionArrivalMarker from "@/components/solutions/SolutionArrivalMarker";
import SolutionDemoForm from "@/components/solutions/SolutionDemoForm";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ROUTES } from "@/config/routes";
import "@/components/solutions/ai-bom/ai-bom-increase.css";

const QUOTE = testimonials[0];

const STEPS = [
  { time: "found", label: "Component found in the application" },
  { time: "classified", label: "Tagged by role: framework, agent, RAG or model" },
  { time: "tied", label: "Tied to the application where it was found" },
  { time: "review", label: "Ready for security, legal and procurement review" },
];

const TABLE = [
  { name: "LangChain", role: "Framework", app: "Application inventory" },
  { name: "LangGraph", role: "Agent runtime", app: "Application inventory" },
  { name: "Pinecone", role: "Vector store", app: "Application inventory" },
  { name: "OpenAI SDK", role: "Model provider", app: "Application inventory" },
];

export default function AiBomIncreasePage({ page }: { page: SolutionLanding }) {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root || reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".inc-hero__copy > *", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power2.out",
      });
      gsap.from(".inc-artifact", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.12,
        stagger: 0.1,
        ease: "power2.out",
      });
      gsap.utils.toArray<HTMLElement>(".inc-reveal").forEach((el) => {
        gsap.from(el, {
          y: 22,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <article ref={rootRef} className="inc">
      <SolutionArrivalMarker href={page.href} />

      <div className="inc-banner">
        <span>AI-BOM uses the same software inventory path as EnProbe SBOM</span>
        <Link href={ROUTES.platform.sbomLicenseRisk}>Read about SBOM</Link>
      </div>

      <header className="inc-hero">
        <div className="inc-shards" aria-hidden="true">
          <span className="inc-shard inc-shard--teal" />
          <span className="inc-shard inc-shard--lime" />
          <span className="inc-shard inc-shard--blue" />
          <span className="inc-shard inc-shard--orange" />
        </div>
        <div className="inc-wrap inc-hero__grid">
          <div className="inc-hero__copy">
            <h1>{page.heroTitle}.</h1>
            <p>{page.heroBody}</p>
            <div className="inc-hero__cta">
              <a className="inc-btn inc-btn--primary" href="#briefing">
                Contact sales
              </a>
              <a className="inc-btn inc-btn--ghost" href="#inventory">
                See the inventory
              </a>
            </div>
          </div>
          <div className="inc-hero__stage">
            <div className="inc-code inc-artifact" aria-hidden="true">
              <p>inventory.components.list</p>
              <pre>
                <code>
                  {`await inventory.components.list({
  kind: "ai",
  include: [
    "framework",
    "agent",
    "rag",
    "mcp",
    "model"
  ]
});`}
                </code>
              </pre>
            </div>
            <div className="inc-card inc-artifact">
              <p className="inc-card__kicker">AI component</p>
              <h3>LangChain</h3>
              <p>Framework · tied to the application where it was found</p>
              <div className="inc-card__meta">
                <span>classified</span>
                <span>in inventory</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="inc-trust" aria-label="Accreditations">
        <div className="inc-wrap inc-trust__row">
          {certifications.map((item) => (
            <span key={item.id}>{item.name}</span>
          ))}
        </div>
      </section>

      <section className="inc-statement">
        <div className="inc-wrap inc-reveal">
          <h2>Comprehensive inventory for the AI that actually runs.</h2>
          <p>{page.problemLead}</p>
        </div>
      </section>

      <section className="inc-products" id="inventory">
        <div className="inc-wrap">
          <article className="inc-block inc-reveal">
            <div>
              <h3>{page.detectTitle}</h3>
              <p>{page.detectLead}</p>
              <div className="inc-rails">
                {page.detections.map((item) => (
                  <span key={item.title}>{item.title}</span>
                ))}
              </div>
            </div>
            <div className="inc-code">
              <p>component.classify</p>
              <pre>
                <code>
                  {`classify({
  name: "langchain",
  role: "framework",
  provider: null,
  files: []
})`}
                </code>
              </pre>
              <ol className="inc-steps">
                {STEPS.map((step) => (
                  <li key={step.time}>
                    <strong>{step.time}</strong>
                    <span>{step.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </article>

          <div className="inc-mosaic">
            <article className="inc-tile inc-reveal">
              <h3>{page.features[0].title}</h3>
              <p>{page.features[0].body}</p>
              <div className="inc-darkcard">
                <p>role</p>
                <strong>framework</strong>
                <span>LangChain · LlamaIndex · PyTorch</span>
              </div>
            </article>
            <article className="inc-tile inc-reveal">
              <h3>Tied to the application</h3>
              <p>Each component stays attached to the application where it was found, not a disconnected spreadsheet.</p>
              <div className="inc-account">
                <span>Application inventory</span>
                <strong>AI components in scope</strong>
              </div>
            </article>
            <article className="inc-tile inc-reveal">
              <h3>{page.features[1].title}</h3>
              <p>{page.features[1].body}</p>
              <div className="inc-valid">
                <p>validation.status → ready</p>
                <span>Same path as EnProbe SBOM</span>
              </div>
            </article>
            <article className="inc-tile inc-tile--wide inc-reveal">
              <h3>What we look for</h3>
              <table>
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Role</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE.map((row) => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td>{row.role}</td>
                      <td>{row.app}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </div>
        </div>
      </section>

      <section className="inc-quote">
        <div className="inc-wrap inc-reveal">
          <blockquote>“{QUOTE.quote}”</blockquote>
          <p>
            {QUOTE.author}, {QUOTE.role}, {QUOTE.company}
          </p>
        </div>
      </section>

      <section className="inc-arch">
        <div className="inc-wrap">
          <h2 className="inc-reveal">{page.problemTitle}</h2>
          <p className="inc-lead inc-reveal">{page.problemLead}</p>
          <div className="inc-arch__grid">
            {page.features.map((feature) => (
              <article className="inc-reveal" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
                <ul>
                  {feature.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
            <article className="inc-reveal">
              <h3>Exportable for the reviews that ask</h3>
              <p>
                EU AI Act and NIST AI RMF both expect documented AI use. The inventory is built for security, legal
                and procurement reviews — not a one-off list.
              </p>
              <Link href={ROUTES.services.aiAst}>AI Security Testing</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="inc-split">
        <div className="inc-wrap inc-split__grid">
          {page.problems.map((item) => (
            <article className="inc-reveal" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="inc-detect">
        <div className="inc-wrap">
          <h2 className="inc-reveal">{page.detectTitle}</h2>
          <p className="inc-lead inc-reveal">{page.detectLead}</p>
          <div className="inc-detect__grid">
            {page.detections.map((item) => (
              <article className="inc-reveal" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="inc-updates">
        <div className="inc-wrap">
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

      <section className="inc-cta" id="briefing">
        <div className="inc-wrap inc-cta__box">
          <div>
            <h2>{page.ctaTitle}</h2>
            <p>{page.ctaBody}</p>
          </div>
          <SolutionDemoForm heading="Request a briefing" idPrefix="inc-cta" className="inc-form" />
        </div>
      </section>
    </article>
  );
}
