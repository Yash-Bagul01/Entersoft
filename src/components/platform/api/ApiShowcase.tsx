"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { platformPillars } from "@/data/platform";

const pillar = platformPillars["api-security"];

const PRODUCTS = [
  {
    title: pillar.whatItDoes[0].title,
    body: pillar.whatItDoes[0].description,
    kicker: "Every inventory in one place",
    lines: ["POST /internal/v3/billing", "GET /legacy/export", "gRPC · payout.Transfer"],
  },
  {
    title: pillar.whatItDoes[1].title,
    body: pillar.whatItDoes[1].description,
    kicker: "Authorization that actually holds",
    lines: ["BOLA · object 8841", "BFLA · admin.reset", "Cross-tenant read"],
  },
  {
    title: pillar.whatItDoes[2].title,
    body: pillar.whatItDoes[2].description,
    kicker: "Live traffic versus the contract",
    lines: ["OpenAPI 3.1 drift", "Undeclared field · ssn", "GraphQL depth 12"],
  },
];

const FLOWS = [
  {
    id: "discover",
    label: "Discover",
    title: pillar.howItWorks[0].title,
    body: `${pillar.howItWorks[0].description} ${pillar.howItWorks[1].description}`,
    status: "EnProbe is mapping this surface",
    rows: ["Gateway logs ingested", "Postman collection parsed", "OpenAPI spec attached"],
  },
  {
    id: "test",
    label: "Test",
    title: pillar.howItWorks[2].title,
    body: pillar.howItWorks[2].description,
    status: "EnProbe is running authorization attacks",
    rows: ["BOLA replay across tenants", "Mass assignment probe", "Injection on filter params"],
  },
  {
    id: "dispatch",
    label: "Dispatch",
    title: pillar.howItWorks[3].title,
    body: pillar.howItWorks[3].description,
    status: "Finding routed to backend owners",
    rows: ["Ticket · API-8841", "Owner · payments-api", "Severity · Critical"],
  },
];

export default function ApiShowcase() {
  const [active, setActive] = useState(0);
  const flow = FLOWS[active];

  return (
    <>
      <section className="api-products">
        <p className="api-mono">What it does</p>
        <h2 className="api-display">
          Fewer unknown endpoints.
          <br />
          More tested contracts.
        </h2>
        <p className="api-lede">{pillar.coreCapability}.</p>
        <div className="api-product-grid">
          {PRODUCTS.map((product) => (
            <article key={product.title} className="api-product">
              <div className="api-product-ui">
                <p className="api-mono">{product.kicker}</p>
                <ul>
                  {product.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <h3>{product.title}</h3>
              <p>{product.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="api-stats" aria-label="Coverage">
        <article>
          <p className="api-display">3</p>
          <p>Protocols in one inventory — REST, GraphQL, and gRPC</p>
        </article>
        <article>
          <p className="api-display">10</p>
          <p>OWASP API Top 10 classes in the test set</p>
        </article>
        <article>
          <p className="api-display">4</p>
          <p>Steps from traffic ingest to a remediation ticket</p>
        </article>
      </section>

      <section id="api-flow" className="api-flow">
        <p className="api-mono">How it works</p>
        <h2 className="api-display">
          APIs that get discovered,
          <br />
          tested, and closed
        </h2>
        <p className="api-lede">
          An EnProbe orchestration layer that takes action and keeps the SOC and the backend team in the loop.
        </p>
        <div className="api-flow-tabs" role="tablist" aria-label="API testing flow">
          {FLOWS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={index === active ? "is-active" : undefined}
              onClick={() => setActive(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="api-flow-stage">
          <div>
            <h3>{flow.title}</h3>
            <p>{flow.body}</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.aside
              key={flow.id}
              className="api-flow-panel"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="api-mono">Inbound call</p>
              <p className="api-flow-status">{flow.status}</p>
              <ul>
                {flow.rows.map((row) => (
                  <li key={row}>{row}</li>
                ))}
              </ul>
              <p className="api-flow-takeover">Take over</p>
            </motion.aside>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
