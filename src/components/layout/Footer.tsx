"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Familjen_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROUTES } from "@/config/routes";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import LinedWordmark from "./LinedWordmark";
import FooterLineLink from "./FooterLineLink";
import DiscussProjectModal from "./DiscussProjectModal";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const COLUMNS = [
  {
    title: "Services",
    links: [
      { name: "Application Security", href: ROUTES.services.appsec },
      { name: "Penetration Testing", href: ROUTES.services.vapt },
      { name: "Cloud Security", href: ROUTES.services.cloud },
      { name: "GRC & Compliance", href: ROUTES.services.compliance },
      { name: "Managed Detection", href: ROUTES.services.siem },
      { name: "Smart Contract Security", href: ROUTES.services.smartContract },
      { name: "AI Security Testing", href: ROUTES.services.aiAst },
    ],
  },
  {
    title: "Platform",
    links: [
      { name: "EnProbe Overview", href: ROUTES.platform.enprobe },
      { name: "SAST", href: ROUTES.platform.sast },
      { name: "SCA", href: ROUTES.platform.sca },
      { name: "SBOM & License Risk", href: ROUTES.platform.sbomLicenseRisk },
      { name: "Secrets Detection", href: ROUTES.platform.secrets },
      { name: "Infrastructure as Code", href: ROUTES.platform.iac },
      { name: "DAST", href: ROUTES.platform.dast },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "AppSec Transformation", href: ROUTES.services.appsec },
      { name: "Exposure Management", href: ROUTES.platform.enprobe },
      { name: "Cloud Transformation", href: ROUTES.services.cloud },
      { name: "Managed Cyber Defense", href: ROUTES.services.siem },
      { name: "Regulatory Readiness", href: ROUTES.services.compliance },
      { name: "Digital Asset Assurance", href: ROUTES.services.smartContract },
      { name: "AI Security Readiness", href: ROUTES.services.aiAst },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Research & Insights", href: "/#insights" },
      { name: "Security Advisories", href: "/#insights" },
      { name: "Sample Deliverables", href: ROUTES.contact },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Entersoft", href: ROUTES.home },
      { name: "Accreditations", href: ROUTES.company.accreditations },
      { name: "Contact", href: ROUTES.contact },
    ],
  },
] as const;

const CALL_HREF = "https://calendar.app.google/VZXgQpSpvyiG4P296";

function useIstClock() {
  const [label, setLabel] = useState("");
  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
      setLabel(`IST → ${parts}`);
    };
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);
  return label;
}

export default function Footer() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const clock = useIstClock();
  const [discussOpen, setDiscussOpen] = useState(false);

  const hideOn =
    pathname === "/platform/sast" ||
    pathname === "/platform/sbom-license-risk" ||
    pathname === "/platform/secrets" ||
    pathname === "/solutions";

  useLayoutEffect(() => {
    const root = rootRef.current;
    const sheet = sheetRef.current;
    if (!root || !sheet || hideOn) return;

    gsap.registerPlugin(ScrollTrigger);
    const prev =
      document.querySelector<HTMLElement>("#certifications") ||
      document.querySelector<HTMLElement>("main > section:last-of-type");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 95%",
          end: "top 20%",
          scrub: 0.6,
        },
      });

      if (prev && !reduce) {
        gsap.set(prev, { transformOrigin: "50% 100%" });
        tl.fromTo(prev, { scale: 1, borderRadius: 0 }, { scale: 0.9, borderRadius: 40, ease: "none" }, 0);
      }

      tl.fromTo(
        sheet,
        { yPercent: reduce ? 0 : 14, borderRadius: reduce ? "0px" : "56px 56px 0 0" },
        { yPercent: 0, borderRadius: "0px", ease: "none" },
        0
      );
    }, root);

    return () => {
      ctx.revert();
      if (prev) gsap.set(prev, { clearProps: "transform,border-radius" });
    };
  }, [hideOn, reduce, pathname]);

  if (hideOn) return null;

  return (
    <footer id="site-footer" ref={rootRef} className="site-footer relative z-20 w-full">
      <div ref={sheetRef} className="site-footer-sheet relative overflow-hidden">
        <div className="site-footer-smoke" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-6 pt-[18vh] md:px-12 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="site-footer-kicker">Let&apos;s build work that holds.</p>
              <h2
                className={cn(
                  familjen.className,
                  "mt-5 max-w-[16ch] text-[clamp(3.1rem,7.2vw,6.6rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-[#f3f1ec]"
                )}
              >
                Ready to close risk that matters?
              </h2>
            </div>

            <div className="flex w-full flex-col justify-center lg:col-span-5 lg:pl-4">
              <FooterLineLink label="Discuss your project" onClick={() => setDiscussOpen(true)} />
              <FooterLineLink label="Book a 30-minute call" href={CALL_HREF} external />
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-12 sm:grid-cols-3 lg:grid-cols-6">
            <div>
              <p className="site-footer-kicker">About</p>
              <p className="mt-4 max-w-[28ch] text-[13px] leading-[1.5] text-[#bdbbb5]">
                EnProbe finds the exposure. Entersoft experts validate it and stay with the fix.
              </p>
            </div>
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="site-footer-kicker">{column.title}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="site-footer-link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-12 items-end gap-x-6 gap-y-8 pb-6">
            <div className="col-span-12 md:col-span-4">
              <p className="text-[13px] text-[#f3f1ec]/80">© ENTERSOFT® {new Date().getFullYear()}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#f3f1ec]/40">
                Hover the lines.
              </p>
            </div>
            <div className="col-span-7 md:col-span-4">
              <p className="site-footer-kicker">Business enquiry</p>
              <a href="mailto:hello@entersoftsecurity.com" className="site-footer-link mt-3 block">
                E. hello@entersoftsecurity.com
              </a>
              <Link href={ROUTES.contact} className="site-footer-link mt-1.5 block">
                P. Book a briefing
              </Link>
            </div>
            <div className="col-span-5 md:col-span-4 md:text-right">
              <p className="site-footer-kicker">Social</p>
              <div className="mt-3 flex flex-col gap-1.5 md:items-end">
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="site-footer-link">
                  LinkedIn
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="site-footer-link">
                  GitHub
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="site-footer-link">
                  X
                </a>
              </div>
              {clock ? (
                <p className="mt-4 text-[11px] tracking-[0.14em] text-[#f3f1ec]/35">{clock}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full">
          <LinedWordmark reduce={reduce} />
        </div>
      </div>
      <DiscussProjectModal open={discussOpen} onClose={() => setDiscussOpen(false)} />
    </footer>
  );
}
