"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { platformPillars } from "@/data/platform";
import { certifications } from "@/data/certifications";

const pillar = platformPillars["api-security"];
const MARKS = [...certifications.map((item) => item.name), ...certifications.map((item) => item.name)];

export default function ApiHero() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 380),
      window.setTimeout(() => setPhase(2), 1100),
      window.setTimeout(() => setPhase(3), 1750),
    ];
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  return (
    <section id="hero-wrap" className="api-hero">
      <div className="api-hero-copy">
        <p className="api-mono">{pillar.descriptor}</p>
        <h1 className="api-display">
          Shadow APIs hide.
          <br />
          <em>Exposure doesn&apos;t.</em>
        </h1>
        <p className="api-lede">{pillar.summary}</p>
        <div className="api-hero-ctas">
          <Link href={ROUTES.contact} className="api-btn api-btn-dark">
            Book a briefing
          </Link>
          <a href="#api-flow" className="api-text-link">
            See how it works
          </a>
        </div>
      </div>

      <div className="api-thread" aria-live="polite">
        <p className="api-thread-kicker">Incoming request</p>
        <AnimatePresence>
          {phase >= 1 && (
            <motion.article
              className="api-bubble api-bubble-in"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <header>
                <strong>GET /v2/users/{"{id}"}</strong>
                <span>9:45 AM</span>
              </header>
              <p>Can this object be read across tenants? Authorization is a bearer token only.</p>
            </motion.article>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {phase >= 2 && (
            <motion.article
              className="api-bubble api-bubble-out"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <header>
                <strong>EnProbe</strong>
                <span>9:45 AM</span>
              </header>
              <p>BOLA confirmed. Object 8841 is readable across tenants.</p>
            </motion.article>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {phase >= 3 && (
            <motion.aside
              className="api-finding"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="api-mono">Finding scheduled</p>
              <p className="api-finding-title">Broken Object Level Authorization</p>
              <ul>
                <li>Endpoint · GET /v2/users/{"{id}"}</li>
                <li>Severity · Critical</li>
                <li>Class · OWASP API Top 10</li>
              </ul>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export function ApiTrusted() {
  return (
    <section className="api-trusted" aria-label="Independently verified credentials">
      <p className="api-mono">Trusted by</p>
      <div className="api-trusted-track">
        <div className="api-trusted-row">
          {MARKS.map((name, index) => (
            <span key={`${name}-${index}`}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
