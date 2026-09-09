"use client";

import React, { useState } from "react";
import Link from "next/link";
import { platformPillars } from "@/data/platform";
import { ROUTES } from "@/config/routes";

const pillar = platformPillars["attack-surface-management"];

const STEPS = [
  {
    id: "seed",
    kicker: "Step 1",
    title: pillar.howItWorks[0].title,
    subtitle: "A known starting map",
    body: pillar.howItWorks[0].description,
    rows: ["entersoftsecurity.com", "ASN · 14,208", "CIDR · 203.0.113.0/24"],
    chart: false,
  },
  {
    id: "map",
    kicker: "Step 2",
    title: "OSINT, DNS & fingerprint",
    subtitle: "EnProbe handles the sweep",
    body: `${pillar.howItWorks[1].description} ${pillar.howItWorks[2].description}`,
    rows: ["api.shadow.acme.dev", "s3://backup-open", "vpn.legacy.corp:443"],
    chart: false,
  },
  {
    id: "alert",
    kicker: "Step 3",
    title: pillar.howItWorks[3].title,
    subtitle: "The SOC stays powered",
    body: pillar.howItWorks[3].description,
    rows: ["CRIT · auth gateway", "HIGH · customer API", "MED · marketing CMS"],
    chart: true,
  },
];

function PhoneFace({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div className="asm-phone" data-step={step.id}>
      <div className="asm-phone-notch" aria-hidden="true" />
      <div className="asm-phone-bar">
        <span>9:41</span>
        <strong>EnProbe</strong>
        <span>Live</span>
      </div>
      <p className="asm-phone-title">Power on</p>
      <p className="asm-phone-kicker">{step.subtitle}</p>
      <ul>
        {step.rows.map((row) => (
          <li key={row}>{row}</li>
        ))}
      </ul>
      {step.chart && (
        <div className="asm-phone-chart" aria-hidden="true">
          <p className="asm-mono">Exposure curve</p>
          <svg viewBox="0 0 220 72" fill="none">
            <path d="M0 58 C 20 56, 32 40, 52 42 S 88 18, 110 24 S 150 8, 176 14 S 204 6, 220 10" />
          </svg>
          <div className="asm-phone-days">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AsmManifesto() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <section id="asm-manifesto" className="asm-works">
      <p className="asm-mono">How EnProbe works</p>
      <h2 className="asm-display">
        A new way to map
        <br />
        <em>your perimeter</em>
      </h2>
      <p className="asm-lede">
        {pillar.coreCapability}. Seed the domains you know. EnProbe finds the rest — subdomains, cloud leaks, open
        ports — and hands the SOC a live inventory.
      </p>
      <Link href={ROUTES.contact} className="asm-btn asm-btn-orange">
        See if you qualify
      </Link>

      <div className="asm-works-split">
        <ol className="asm-steps">
          {STEPS.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={index === active ? "is-active" : undefined}
                onClick={() => setActive(index)}
              >
                <span className="asm-mono">{item.kicker}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </button>
            </li>
          ))}
        </ol>
        <div className="asm-phone-wrap">
          <PhoneFace key={step.id} step={step} />
        </div>
      </div>
    </section>
  );
}
