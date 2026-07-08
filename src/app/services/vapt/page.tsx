"use client";

import React, { useState, useEffect } from "react";
import VAPTHero from "@/components/services/VAPTHero";
import VAPTVisual from "@/components/services/visuals/VAPTVisual";
import ServiceCTA from "@/components/services/ServiceCTA";
import SectionLabel from "@/components/ui/SectionLabel";
import { servicePagesData } from "@/data/services";
import { ChevronRight, Plus, Minus, CheckCircle, ShieldAlert, BadgeAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";

// Custom FAQ Accordion Item matching Sui.io style
function FAQAccordionItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-zinc-800 w-full backdrop-blur-md">
      <button
        onClick={onToggle}
        className="w-full py-6 flex justify-between items-center text-left gap-4 group focus:outline-none select-none"
      >
        <span className={`font-display text-base md:text-lg font-medium transition-colors duration-300 ${isOpen ? "text-[#BD00FF]" : "text-zinc-300 group-hover:text-white"}`}>
          {question}
        </span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-[#BD00FF]/10 text-[#BD00FF] rotate-180" : "bg-zinc-900 text-zinc-500 group-hover:text-zinc-300"}`}>
          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-[300px] opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
        <p className="font-sans text-sm text-zinc-400 leading-relaxed max-w-[800px]">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function VAPTPage() {
  const data = servicePagesData.vapt;
  const canonicalUrl = getCanonicalUrl(ROUTES.services.vapt);

  // Active step index driven by scroll intersection & hover
  const [activeStep, setActiveStep] = useState(0);

  // FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // IntersectionObserver to detect scroll intersections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -30% 0px", // triggers when element reaches middle 40% of viewport
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idxAttr = entry.target.getAttribute("data-step-idx");
          if (idxAttr !== null) {
            setActiveStep(parseInt(idxAttr, 10));
          }
        }
      });
    }, observerOptions);

    const stepElements = document.querySelectorAll(".vapt-step-item");
    stepElements.forEach((el) => observer.observe(el));

    return () => {
      stepElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${APP_URL}/#organization`,
        "name": "Entersoft Security",
        "url": APP_URL,
        "logo": {
          "@type": "ImageObject",
          "@id": `${APP_URL}/#logo`,
          "url": "https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg",
          "caption": "Entersoft Security Logo"
        },
        "description": "One scan to know where you are exposed. One report to fix it fast. Award-winning cybersecurity including AppSec, VAPT, Managed Cloud Security, Compliance, SIEM, and Smart Contract audits."
      },
      {
        "@type": "WebSite",
        "@id": `${APP_URL}/#website`,
        "url": APP_URL,
        "name": "Entersoft Security",
        "publisher": {
          "@id": `${APP_URL}/#organization`
        }
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}/#webpage`,
        "url": canonicalUrl,
        "name": "VAPT Audit Services | Vulnerability Assessment & Pen Testing | Entersoft",
        "description": "Expert-driven vulnerability assessment and penetration testing (VAPT) providing real exploit proofs. CERT-In certified audit compliance with zero false-positive reports.",
        "inLanguage": "en",
        "isPartOf": {
          "@id": `${APP_URL}/#website`
        },
        "about": {
          "@id": `${canonicalUrl}/#service`
        },
        "breadcrumb": {
          "@id": `${canonicalUrl}/#breadcrumb`
        }
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}/#service`,
        "name": "Vulnerability Assessment & Pen Testing (VAPT)",
        "serviceType": "Vulnerability Assessment and Penetration Testing",
        "provider": {
          "@id": `${APP_URL}/#organization`
        },
        "description": "Expert penetration testing with active exploitation proof. CERT-In certified audit compliance with zero false-positive reports.",
        "areaServed": {
          "@type": "Country",
          "name": "Global"
        },
        "url": canonicalUrl
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": getCanonicalUrl(ROUTES.home)
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "VAPT Audit Services",
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}/#faq`,
        "mainEntity": data.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <main className="w-full flex flex-col relative overflow-hidden bg-[#030712]">
      {/* Sui technical grid overlay line structure */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-zinc-900/30" />
        <div className="absolute top-0 bottom-0 left-[80%] w-[1px] bg-zinc-900/30" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sui-style Hero */}
      <VAPTHero
        category={data.category}
        title={data.heroStatement}
        tagline={data.tagline}
        col2Description={data.col2Description}
        col3Metadata={data.col3Metadata}
        scrollTargetId="#vapt-stats"
      />

      {/* SECTION 1: Sui DeFi Stats Grid */}
      <section id="vapt-stats" className="relative w-full bg-[#030712] px-6 md:px-12 py-24 md:py-32 border-b border-zinc-900 overflow-hidden">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-16 relative z-10">
          
          {/* Header block */}
          <div className="flex flex-col gap-3 max-w-[800px] text-left">
            <SectionLabel color="secondary">01 / PERFORMANCE METRICS</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-display font-medium uppercase text-white tracking-tight">
              PROVABLE AUDIT RESOLUTION
            </h2>
            <p className="font-sans text-sm md:text-base text-zinc-400 leading-relaxed max-w-[620px]">
              Every penetration test runs active manual validation to eliminate false scanner noise, producing incontrovertible evidence.
            </p>
          </div>

          {/* Stats grid cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              {
                num: "0%",
                title: "FALSE POSITIVES",
                desc: "Every logic vulnerability is manually validated by security leads, eliminating automated scanner noise.",
                icon: <CheckCircle className="w-5 h-5 text-[#BD00FF]" />
              },
              {
                num: "100%",
                title: "EXPLOIT PROOFS",
                desc: "We provide Proof of Concept videos and exploit scripts proving target vulnerability impact.",
                icon: <ShieldAlert className="w-5 h-5 text-[#BD00FF]" />
              },
              {
                num: "90-DAY",
                title: "RETEST PERIOD",
                desc: "Get unlimited retesting of patch updates within 90 days to verify configuration stability.",
                icon: <BadgeAlert className="w-5 h-5 text-[#BD00FF]" />
              }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="group p-8 flex flex-col gap-6 text-left rounded-lg border border-zinc-800/80 bg-zinc-900/[0.15] backdrop-blur-md transition-all duration-300 hover:border-[#BD00FF]/40 border-t-2 hover:border-t-2 border-t-[#BD00FF]/60 hover:border-t-[#BD00FF]"
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight leading-none">
                    {stat.num}
                  </span>
                  <div className="p-2 rounded-full bg-[#BD00FF]/5 border border-[#BD00FF]/20 text-[#BD00FF]">
                    {stat.icon}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-widest leading-none">
                    {stat.title}
                  </h3>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 2: Sui DeFi-Style Pipeline Flow (with dynamic stacking cards on the right) */}
      <section id="vapt-pipeline" className="relative w-full bg-[#030712] px-6 md:px-12 py-24 md:py-32 border-b border-zinc-900 overflow-hidden">
        <div className="absolute right-[5%] bottom-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#BD00FF]/3 to-transparent blur-[120px] pointer-events-none z-0" />
        
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Column: Technical pipeline nodes connected by laser paths */}
          <div className="flex flex-col gap-12 text-left">
            <div className="flex flex-col gap-3">
              <SectionLabel color="secondary">02 / PIPELINE FLOW</SectionLabel>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium uppercase text-white tracking-tight">
                Project Process
              </h2>
            </div>

            {/* Pipeline items */}
            <div className="flex flex-col gap-8 relative pl-12">
              {/* Vertical connector line */}
              <div className="absolute top-0 bottom-0 left-[11px] w-[1px] bg-zinc-800" />
              
              {/* Laser track indicator inside the vertical path */}
              <div className="absolute top-0 bottom-0 left-[11px] w-[2px] overflow-hidden pointer-events-none">
                <div 
                  className="absolute w-[2px] h-[120px] bg-gradient-to-b from-transparent via-[#BD00FF] to-transparent top-0 animate-laser-v" 
                  style={{ 
                    animationDuration: "4s",
                    animationIterationCount: "infinite",
                    animationTimingFunction: "linear"
                  }} 
                />
              </div>

              {[
                {
                  step: "01",
                  title: "Scope & Surface Discovery",
                  desc: "We catalog and analyze exposed boundaries, endpoints, firewalls, and direct public gateway endpoints."
                },
                {
                  step: "02",
                  title: "Credentialed Logic Penetration",
                  desc: "We attempt privilege escalation, cross-tenant leaks, session hijacks, and code level vulnerabilities to prove impact."
                },
                {
                  step: "03",
                  title: "Signature & Retest Signoff",
                  desc: "We deliver full Proof of Concept exploits, configure a detailed remediation roadmap, and retest patches."
                }
              ].map((item, idx) => {
                const isActive = activeStep === idx;
                
                // Color accent styling mapping
                let activeBubbleBorder = "border-zinc-800 text-zinc-500";
                let activeTitleClass = "text-zinc-400 group-hover:text-zinc-200";
                if (isActive) {
                  if (idx === 0) {
                    activeBubbleBorder = "border-cyan-500 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]";
                    activeTitleClass = "text-cyan-400";
                  } else if (idx === 1) {
                    activeBubbleBorder = "border-amber-500 text-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.2)]";
                    activeTitleClass = "text-amber-500";
                  } else if (idx === 2) {
                    activeBubbleBorder = "border-emerald-500 text-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]";
                    activeTitleClass = "text-emerald-500";
                  }
                }

                return (
                  <div 
                    key={idx} 
                    data-step-idx={idx}
                    onMouseEnter={() => setActiveStep(idx)}
                    className="vapt-step-item relative flex flex-col gap-2 group cursor-pointer py-1"
                  >
                    {/* Glowing bubble anchor along the line */}
                    <div className={`absolute left-[-56px] top-1.5 w-6 h-6 rounded-full border bg-zinc-950 flex items-center justify-center font-mono text-[9px] font-bold transition-all duration-500 z-10 ${activeBubbleBorder}`}>
                      {item.step}
                    </div>
                    <h3 className={`font-display text-lg font-medium transition-colors duration-300 ${activeTitleClass}`}>
                      {item.title}
                    </h3>
                    <p className={`font-sans text-xs transition-colors duration-300 leading-relaxed max-w-[500px] ${isActive ? "text-zinc-300" : "text-zinc-500"}`}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: VAPTVisual selector showing Scroll Stacking Card Deck */}
          <div className="w-full flex justify-center lg:justify-end">
            <VAPTVisual activeStep={activeStep} />
          </div>
        </div>
      </section>

      {/* SECTION 3: FAQ Accordions */}
      <section id="vapt-faq" className="relative w-full bg-[#030712] px-6 md:px-12 py-24 md:py-32 border-b border-zinc-900 overflow-hidden">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Accordion sidebar */}
          <div className="flex flex-col gap-6 max-w-[380px] text-left sticky top-24">
            <div className="flex flex-col gap-3">
              <SectionLabel color="secondary">03 / FAQS</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-display font-medium uppercase text-white leading-tight">
                Consider before partnering.
              </h2>
            </div>
            <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed">
              Have questions about scan scopes, timelines, retesting parameters, or audit sign-offs? Reach out directly.
            </p>
            <div className="mt-4">
              <MagneticButton>
                <Button variant="primary" size="lg" asLink href="/#contact" className="gap-2">
                  Book a Briefing <ChevronRight className="w-4 h-4" />
                </Button>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Accordion list */}
          <div className="w-full flex flex-col border-t border-zinc-800">
            {data.faqs.map((faq, idx) => (
              <FAQAccordionItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIdx === idx}
                onToggle={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <ServiceCTA />
    </main>
  );
}
