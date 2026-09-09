import React from "react";
import Link from "next/link";
import { platformPillars } from "@/data/platform";
import { ROUTES } from "@/config/routes";

const pillar = platformPillars["attack-surface-management"];

export default function AsmFits() {
  return (
    <section id="asm-fits" className="asm-close">
      <div className="asm-close-sun" aria-hidden="true" />
      <p className="asm-mono">Step into visibility</p>
      <h2 className="asm-display">
        The surface
        <br />
        <em>is known</em>
      </h2>
      <p className="asm-lede">
        Ready to take control of the perimeter? Step out of the unknown and into a live map the SOC can work.
      </p>
      <div className="asm-close-actions">
        <Link href={ROUTES.contact} className="asm-btn asm-btn-dark">
          See if you qualify
        </Link>
        <Link href={ROUTES.services.siem} className="asm-text-link">
          {pillar.whereItFits[0].serviceName}
        </Link>
        <Link href={ROUTES.services.cloud} className="asm-text-link">
          {pillar.whereItFits[1].serviceName}
        </Link>
      </div>
    </section>
  );
}
