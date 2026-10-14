"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Familjen_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROUTES } from "@/config/routes";
import { companyNav } from "@/data/companyPages";
import { industryNav } from "@/data/industries";
import { resourceNav } from "@/data/resources";
import { services } from "@/data/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import LinedWordmark from "./LinedWordmark";
import FooterLineLink from "./FooterLineLink";
import DiscussProjectModal from "./DiscussProjectModal";

function SocialIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d={d} />
    </svg>
  );
}

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/2479962/",
    d: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/EntersoftTeam",
    d: "M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.38 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.29 3.9A12.16 12.16 0 0 1 1.64 4.15a4.28 4.28 0 0 0 1.32 5.71 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.27 4.27 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.59 8.59 0 0 1 1 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2v-.56A8.72 8.72 0 0 0 22.46 6z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/entersoftteam/",
    d: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/EntersoftTeam",
    d: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCv3rXFSY1ODaSY_O-02-hCA",
    d: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.75 15.57V8.43L15.84 12l-6.09 3.57z",
  },
];

const serviceName = (slug: string) =>
  services.find((item) => item.slug === slug)?.displayName ?? slug;

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const COLUMNS: {
  title: string;
  wide?: boolean;
  links: { name: string; href: string }[];
}[] = [
  {
    title: "Services",
    links: [
      { name: serviceName("appsec"), href: ROUTES.services.appsec },
      { name: serviceName("vapt"), href: ROUTES.services.vapt },
      { name: serviceName("cloud-resilience"), href: ROUTES.services.cloud },
      { name: serviceName("compliance-management"), href: ROUTES.services.compliance },
      { name: serviceName("siem"), href: ROUTES.services.siem },
      { name: serviceName("smart-contract-audits"), href: ROUTES.services.smartContract },
      { name: serviceName("ai-ast"), href: ROUTES.services.aiAst },
    ],
  },
  {
    title: "Platform",
    wide: true,
    links: [
      { name: "EnProbe Overview", href: ROUTES.platform.enprobe },
      { name: "Static Security (SAST)", href: ROUTES.platform.sast },
      { name: "Open Source Risk (SCA)", href: ROUTES.platform.sca },
      { name: "SBOM & License Governance", href: ROUTES.platform.sbomLicenseRisk },
      { name: "Secrets Detection", href: ROUTES.platform.secrets },
      { name: "Infrastructure as Code", href: ROUTES.platform.iac },
      { name: "DAST & Dynamic Testing", href: ROUTES.platform.dast },
      { name: "Agentic Pentesting", href: ROUTES.platform.agenticPentesting },
      { name: "API Security Testing", href: ROUTES.platform.apiSecurity },
      { name: "Attack Surface Visibility", href: ROUTES.platform.attackSurfaceManagement },
      { name: "Cloud AppSec", href: ROUTES.platform.cloudAppsec },
      { name: "AI AppSec", href: ROUTES.platform.aiAppsec },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "API Discovery", href: ROUTES.solutionsPages.apiDiscovery },
      { name: "AI-BOM", href: ROUTES.solutionsPages.aiBom },
      { name: "Manage Vulnerabilities", href: ROUTES.solutionsPages.manageVulnerabilities },
      { name: "Automate Security Workflows", href: ROUTES.solutionsPages.automateWorkflows },
      { name: "Track AppSec KPIs", href: ROUTES.solutionsPages.trackKpis },
      { name: "Manage Open Source Risk", href: ROUTES.solutionsPages.openSourceRisk },
    ],
  },
  {
    title: "Industries",
    links: industryNav.map((item) => ({ name: item.label, href: item.href })),
  },
  {
    title: "Resources",
    links: resourceNav.map((item) => ({ name: item.label, href: item.href })),
  },
  {
    title: "Company",
    wide: true,
    links: [
      { name: "Accreditations", href: ROUTES.company.accreditations },
      ...companyNav.map((item) => ({ name: item.label, href: item.href })),
    ],
  },
];


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
    pathname === "/platform" ||
    pathname === "/solutions" ||
    pathname === "/services";
  const flushCloser =
    pathname === "/solutions/api-discovery" || pathname === "/solutions/track-appsec-kpis";

  useLayoutEffect(() => {
    const root = rootRef.current;
    const sheet = sheetRef.current;
    if (!root || !sheet || hideOn) return;

    gsap.registerPlugin(ScrollTrigger);
    const prev =
      document.querySelector<HTMLElement>("#certifications .ov-sheet") ||
      document.querySelector<HTMLElement>("#certifications") ||
      document.querySelector<HTMLElement>("main > section:last-of-type");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: flushCloser ? "top 100%" : "top 95%",
          end: flushCloser ? "top 55%" : "top 20%",
          scrub: 0.85,
        },
      });

      if (prev && !reduce && !flushCloser) {
        gsap.set(prev, { transformOrigin: "50% 100%" });
        tl.fromTo(prev, { scale: 1, borderRadius: 0 }, { scale: 0.9, borderRadius: 40, ease: "none" }, 0);
      }

      tl.fromTo(
        sheet,
        {
          yPercent: reduce || flushCloser ? 0 : 14,
          borderRadius: reduce || flushCloser ? "0px" : "56px 56px 0 0",
        },
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
              <FooterLineLink label="Book a 30-minute call" href={ROUTES.booking} />
            </div>
          </div>

          <div className="mt-20 border-t border-white/10 pt-12">
            <p className="max-w-[46ch] text-[13px] leading-[1.55] text-[#bdbbb5]">
              EnProbe finds the exposure. Entersoft experts validate it and stay with the fix.
            </p>
            <div className="site-footer-dir mt-12">
              {COLUMNS.map((column) => {
                const groups = column.wide
                  ? [column.links.slice(0, Math.ceil(column.links.length / 2)), column.links.slice(Math.ceil(column.links.length / 2))]
                  : [column.links];
                return (
                  <div key={column.title} className={`site-footer-dir-${column.title.toLowerCase()} min-w-0`}>
                    <p className="site-footer-kicker">{column.title}</p>
                    <div className={column.wide ? "mt-5 grid grid-cols-1 gap-x-10 gap-y-2.5 sm:grid-cols-2" : "mt-5"}>
                      {groups.map((group) => (
                        <ul key={group[0]?.href} className="flex flex-col gap-2.5">
                          {group.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href} className="site-footer-link">
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
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
              <div className="mt-3 flex flex-wrap gap-2 md:justify-end">
                {SOCIALS.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="site-footer-social"
                  >
                    <SocialIcon d={item.d} />
                  </a>
                ))}
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
