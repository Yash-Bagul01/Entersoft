"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { platformPillars } from "@/data/platform";
import { certifications } from "@/data/certifications";
import { ROUTES } from "@/config/routes";

const pillar = platformPillars["api-security"];

const FEATURES = [
  {
    title: "REST, GraphQL, and gRPC in one pass",
    body: pillar.summary,
  },
  {
    title: "Shadow and zombie APIs surface first",
    body: pillar.whatItDoes[0].description,
  },
  {
    title: "Authorization is the test, not a checkbox",
    body: pillar.whatItDoes[1].description,
  },
  {
    title: "The spec and the live path have to agree",
    body: pillar.whatItDoes[2].description,
  },
  {
    title: pillar.whereItFits[0].serviceName,
    body: pillar.whereItFits[0].description,
    href: ROUTES.services.appsec,
  },
  {
    title: pillar.whereItFits[1].serviceName,
    body: pillar.whereItFits[1].description,
    href: ROUTES.services.vapt,
  },
];

const FAQS = [
  {
    q: "What API types does EnProbe test?",
    a: "REST, GraphQL, and gRPC endpoints — including undocumented, rogue, and zombie APIs discovered across cloud networks and application environments.",
  },
  {
    q: "How does discovery start?",
    a: pillar.howItWorks[0].description + " " + pillar.howItWorks[1].description,
  },
  {
    q: "Which authorization flaws are in scope?",
    a: pillar.whatItDoes[1].description,
  },
  {
    q: "How do findings reach developers?",
    a: pillar.howItWorks[3].description,
  },
  {
    q: "Where does API security testing fit?",
    a: `${pillar.whereItFits[0].description} ${pillar.whereItFits[1].description}`,
  },
];

export default function ApiProof() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <section className="api-grid-wrap">
        <h2 className="api-display">
          Fewer unknown paths.
          <br />
          Fewer gaps in the contract.
        </h2>
        <p className="api-lede">
          Every request gets resolved: by automated discovery when it can be, by targeted tests when it should be.
        </p>
        <div className="api-grid">
          {FEATURES.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              {"href" in item && item.href && (
                <Link href={item.href} className="api-text-link">
                  View practice
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="api-trust">
        <h2 className="api-display">Security-grade testing you can trust.</h2>
        <p className="api-lede">
          We protect findings and evidence with the same operating controls Entersoft already runs — so teams can
          focus on the fix.
        </p>
        <ul>
          {certifications.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="api-faq">
        <p className="api-mono">Frequently asked questions</p>
        <h2 className="api-display">Answers about API security testing</h2>
        <div>
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <article key={item.q}>
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : index)}>
                  <span>{item.q}</span>
                  <i aria-hidden="true">{isOpen ? "–" : "+"}</i>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {item.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </section>

      <section className="api-close">
        <h2 className="api-display">
          Every endpoint tested,
          <br />
          starting with a briefing
        </h2>
        <p className="api-lede">
          See how EnProbe discovers shadow APIs, tests BOLA and schema drift, and routes fixes to the teams who own
          the service.
        </p>
        <Link href={ROUTES.contact} className="api-btn api-btn-dark">
          Book a briefing
        </Link>
      </section>
    </>
  );
}
