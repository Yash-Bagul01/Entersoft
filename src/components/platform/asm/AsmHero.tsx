"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { platformPillars } from "@/data/platform";

const pillar = platformPillars["attack-surface-management"];

const PILLARS = [
  { kicker: "Discover", title: pillar.whatItDoes[0].title, line: pillar.whatItDoes[0].description },
  { kicker: "Detect", title: pillar.whatItDoes[1].title, line: pillar.whatItDoes[1].description },
  { kicker: "Control", title: pillar.whatItDoes[2].title, line: pillar.whatItDoes[2].description },
];

function HeroMeters() {
  const [assets, setAssets] = useState(1842);
  const [critical, setCritical] = useState(14);

  useEffect(() => {
    const id = window.setInterval(() => {
      setAssets((n) => Math.min(2210, n + (Math.random() > 0.55 ? 1 : 0)));
      setCritical((n) => Math.max(9, Math.min(18, n + (Math.random() > 0.7 ? 1 : -1))));
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="asm-meters">
      <article className="asm-meter">
        <p className="asm-mono">Assets found</p>
        <p className="asm-meter-value">
          {assets.toLocaleString("en-US")}
          <span> live</span>
        </p>
      </article>
      <article className="asm-meter">
        <p className="asm-mono">Critical open</p>
        <p className="asm-meter-value">{critical}</p>
      </article>
      <article className="asm-meter asm-meter-temp">
        <p className="asm-mono">Risk index</p>
        <p className="asm-meter-value">
          68
          <span>° expo</span>
        </p>
      </article>
    </div>
  );
}

export default function AsmHero() {
  return (
    <section id="hero" className="asm-hero">
      <div className="asm-hero-copy">
        <p className="asm-mono">Visibility you control</p>
        <h1 className="asm-display">
          See your surface
          <br />
          <em>before they do</em>
        </h1>
        <p className="asm-lede">{pillar.summary}</p>
        <Link href={ROUTES.contact} className="asm-btn asm-btn-dark">
          Book a briefing
        </Link>
      </div>

      <div className="asm-hero-stage">
        <div className="asm-hero-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
            alt=""
          />
          <div className="asm-hero-sun" aria-hidden="true" />
        </div>
        <HeroMeters />
      </div>

      <div className="asm-benefits">
        {PILLARS.map((item) => (
          <article key={item.kicker} className="asm-benefit">
            <p className="asm-mono">{item.kicker}</p>
            <h2 className="asm-display">{item.title}</h2>
            <p>{item.line}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
