"use client";

import React, { useEffect, useRef, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SolutionLanding } from "@/data/solutionLandings";
import SolutionArrivalMarker from "@/components/solutions/SolutionArrivalMarker";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ROUTES } from "@/config/routes";
import PhoneMock, { PHONE_TABS } from "@/components/solutions/api-discovery/PhoneMock";
import "@/components/solutions/api-discovery/api-discovery-portal.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--adf-display",
});

const PILLARS = [
  {
    title: "Documented",
    body: "OpenAPI, Swagger, Postman collections and gateway logs become the first catalogue.",
  },
  {
    title: "Shadow",
    body: "Routes that never made the spec are marked for review instead of staying hidden.",
  },
  {
    title: "Live",
    body: "Discovery compares the catalogue with what the environment actually serves.",
  },
  {
    title: "Tested",
    body: "Object access, function-level authorization and schema drift are checked on those routes.",
  },
  {
    title: "Routed",
    body: "Findings go to the teams that own the services — on the same engagement path.",
  },
];

const SHOWCASES = [
  {
    eyebrow: "Inventory",
    title: "Build an API inventory from specs, gateways and traffic.",
    body: "Discovery starts with what engineering already has, then compares it with what the environment actually serves.",
    points: [
      "Ingest OpenAPI, Swagger, Postman collections and API-gateway logs",
      "Catalog endpoints, auth schemes, parameters and rate-limit posture",
      "Flag undocumented, stale and duplicate routes for review",
    ],
    tab: 0,
  },
  {
    eyebrow: "Validation",
    title: "Test live APIs the way an attacker would.",
    body: "Once the inventory is in place, Entersoft tests object-level access, function-level authorization, injection and data leakage on the endpoints that matter.",
    points: [
      "BOLA and BFLA testing on authenticated object and admin routes",
      "Schema checks against published OpenAPI contracts",
      "Findings routed to the teams that own the backend services",
    ],
    tab: 1,
  },
  {
    eyebrow: "Coverage",
    title: "What we inventory and test.",
    body: "API discovery is useful only if it covers the surfaces that actually move data.",
    points: [
      "REST, GraphQL and gRPC endpoints",
      "Shadow, stale and leftover partner hooks",
      "Auth, object access and schema drift",
    ],
    tab: 2,
  },
];

export default function ApiDiscoveryPortalPage({ page }: { page: SolutionLanding }) {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [pillar, setPillar] = useState(0);
  const [phone, setPhone] = useState(0);
  const [phoneLocked, setPhoneLocked] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: page.problemTitle,
      a: page.problemLead,
    },
    {
      q: page.problems[0].title,
      a: page.problems[0].body,
    },
    {
      q: page.problems[1].title,
      a: page.problems[1].body,
    },
    {
      q: page.detectTitle,
      a: `${page.detectLead} ${page.detections.map((item) => item.title).join(", ")}.`,
    },
  ];

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setPillar((current) => (current + 1) % PILLARS.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || phoneLocked) return;
    const id = window.setInterval(() => {
      setPhone((current) => (current + 1) % PHONE_TABS.length);
    }, 4800);
    return () => window.clearInterval(id);
  }, [reduceMotion, phoneLocked]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root || reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".adf-hero__copy > *", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".adf-orb", {
        scale: 0.6,
        opacity: 0,
        duration: 1.1,
        stagger: 0.06,
        ease: "power3.out",
      });
      gsap.utils.toArray<HTMLElement>(".adf-reveal").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 250);
    return () => {
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, [reduceMotion]);

  return (
    <article ref={rootRef} className={`adf ${display.variable}`}>
      <SolutionArrivalMarker href={page.href} />

      <header className="adf-hero">
        <div className="adf-orbs" aria-hidden="true">
          <span className="adf-orb adf-orb--blue" />
          <span className="adf-orb adf-orb--orange" />
          <span className="adf-orb adf-orb--green" />
          <span className="adf-orb adf-orb--yellow" />
          <span className="adf-orb adf-orb--rose" />
          <span className="adf-orb adf-orb--mint" />
          <span className="adf-orb adf-orb--peach" />
          <span className="adf-orb adf-orb--violet" />
          <span className="adf-orb adf-orb--gold" />
          <span className="adf-orb adf-orb--sky" />
          <span className="adf-orb adf-orb--lime" />
          <span className="adf-orb adf-orb--coral" />
        </div>
        <div className="adf-wrap adf-hero__copy">
          <h1>{page.heroTitle}.</h1>
          <p>{page.heroBody}</p>
          <div className="adf-hero__cta">
            <a className="adf-pill" href={ROUTES.contact}>
              Get a briefing
            </a>
          </div>
        </div>
        <div className="adf-hero__device adf-reveal">
          <PhoneMock />
        </div>
      </header>

      <section className="adf-explore" id="path">
        <div className="adf-wrap">
          <h2 className="adf-reveal">See the APIs that are actually reachable.</h2>
          <div className="adf-pillars">
            {PILLARS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={`adf-pillar${index === pillar ? " is-on" : ""}`}
                onClick={() => setPillar(index)}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="adf-trio" id="inventory">
        <div className="adf-wrap">
          <h2 className="adf-reveal">Inventory, validation, findings. All on one path.</h2>
          <div className="adf-tabs" role="tablist">
            {PHONE_TABS.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={phone === index}
                className={phone === index ? "is-on" : ""}
                onClick={() => {
                  setPhoneLocked(true);
                  setPhone(index);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="adf-trio__stage adf-reveal">
            <div className="adf-blob">
              <PhoneMock tab={phone} onTab={setPhone} onInteract={() => setPhoneLocked(true)} />
            </div>
          </div>
          <div className="adf-grid6">
            {page.detections.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {SHOWCASES.map((item, index) => (
        <section
          className={`adf-show ${index % 2 ? "adf-show--flip" : ""}`}
          id={index === 1 ? "validation" : undefined}
          key={item.eyebrow}
        >
          <div className="adf-wrap adf-show__grid">
            <div className="adf-reveal">
              <p className="adf-eyebrow">{item.eyebrow}</p>
              <h2>{item.title}</h2>
              <p className="adf-lead">{item.body}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="adf-blob adf-reveal">
              <PhoneMock tab={item.tab} />
            </div>
          </div>
        </section>
      ))}

      <section className="adf-secure">
        <div className="adf-wrap adf-show__grid">
          <div className="adf-reveal">
            <p className="adf-eyebrow">Secure</p>
            <h2>Shadow and zombie APIs stay untested. Authorization bugs hide in object access.</h2>
            <p className="adf-lead">
              Deprecated versions, internal admin routes and forgotten webhooks remain reachable. Discovery and
              testing stay on the same path so those routes are checked, not left off the catalogue.
            </p>
            <ul className="adf-checks">
              {page.problems.map((item) => (
                <li key={item.title}>{item.title}</li>
              ))}
              <li>Documented, shadow and stale APIs in one inventory</li>
              <li>Findings routed to the service owners</li>
            </ul>
          </div>
          <div className="adf-blob adf-blob--dark adf-reveal">
            <PhoneMock tab={2} />
          </div>
        </div>
      </section>

      <section className="adf-details">
        <div className="adf-wrap">
          <h2 className="adf-reveal">Details that matter.</h2>
          <p className="adf-lead adf-lead--center">We keep discovery and testing on the same engagement path.</p>
          <div className="adf-details__grid">
            {page.problems.map((item) => (
              <article className="adf-reveal" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
            <article className="adf-reveal">
              <h3>{page.features[0].kicker}</h3>
              <p>{page.features[0].body}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="adf-faq" id="detect">
        <div className="adf-wrap adf-wrap--narrow">
          <h2 className="adf-reveal">Frequently asked questions</h2>
          {faqs.map((item, index) => (
            <div className={`adf-faq__item${openFaq === index ? " is-on" : ""}`} key={item.q}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span>{item.q}</span>
                <i aria-hidden="true">{openFaq === index ? "–" : "+"}</i>
              </button>
              {openFaq === index ? <p>{item.a}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
