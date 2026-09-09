import React from "react";
import Link from "next/link";
import { platformPillars } from "@/data/platform";
import { certifications } from "@/data/certifications";
import { ROUTES } from "@/config/routes";

const pillar = platformPillars["attack-surface-management"];

const RISKS = [
  {
    title: "Unknown assets stay live",
    body: "Exposed apps, forgotten subdomains, and leftover certificates sit on the public internet with no owner in the room.",
  },
  {
    title: "Shadow IT hides in cloud",
    body: pillar.whatItDoes[1].description,
  },
  {
    title: "Open ports wait for no one",
    body: "Active services and unmanaged portals remain reachable until someone maps them — or someone else does.",
  },
];

export default function AsmGallery() {
  return (
    <section id="asm-gallery" className="asm-why-block">
      <div className="asm-why">
        <p className="asm-mono">Why visibility</p>
        <h2 className="asm-display">
          Today&apos;s perimeter was built
          <br />
          for yesterday&apos;s network
        </h2>
      </div>

      <div className="asm-risks">
        <p className="asm-mono">The risks</p>
        <ul>
          {RISKS.map((risk) => (
            <li key={risk.title}>
              <h3 className="asm-display">{risk.title}</h3>
              <p>{risk.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="asm-network">
        <p className="asm-mono">A growing map</p>
        <h2 className="asm-display">
          Every asset makes
          <br />
          the network stronger
        </h2>
        <p className="asm-lede">
          EnProbe homes in on the live edge — generate, store, and share exposure locally with the SOC and cloud
          teams. The map scales with every new find.
        </p>
        <div className="asm-network-visual" aria-hidden="true">
          <span className="n n1" />
          <span className="n n2" />
          <span className="n n3" />
          <span className="n n4" />
          <span className="n n5" />
          <span className="n n6" />
        </div>
        <ul className="asm-network-marks">
          {certifications.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <Link href={ROUTES.platform.enprobe} className="asm-btn asm-btn-dark">
          See the platform
        </Link>
      </div>
    </section>
  );
}
