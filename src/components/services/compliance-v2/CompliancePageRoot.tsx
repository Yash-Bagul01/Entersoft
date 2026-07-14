"use client";

import React, { useEffect, useState } from "react";
import { servicePagesData } from "@/data/services";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceDeliverables from "@/components/services/ServiceDeliverables";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Custom Compliance Modules
import ComplianceLoader from "./ComplianceLoader";
import ComplianceBackgroundCanvas from "./ComplianceBackgroundCanvas";
import FrameworkReveal from "./FrameworkReveal";
import ProcessWipe from "./ProcessWipe";
import ComplianceProof from "./ComplianceProof";

export default function CompliancePageRoot() {
  const [loading, setLoading] = useState(true);
  const data = servicePagesData["compliance-management"];

  useEffect(() => {
    // Set global data-page and heavy grain properties for theme overrides
    document.documentElement.setAttribute("data-page", "compliance-security");
    document.documentElement.setAttribute("data-grain-heavy", "true");

    return () => {
      document.documentElement.removeAttribute("data-page");
      document.documentElement.removeAttribute("data-grain-heavy");
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.registerPlugin(ScrollTrigger);

      let ctx: gsap.Context;

      const timer = setTimeout(() => {
        const targetSections = gsap.utils.toArray("#compliance-v2-container > section");
        ctx = gsap.context(() => {
          targetSections.forEach((sec: any, index: number) => {
            const inner = sec.firstElementChild;
            if (!inner) return;

            // Set transform origin for clean centered zooming
            gsap.set(inner, { transformOrigin: "center center" });

            // Create a single ScrollTrigger timeline for this section's viewport journey
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sec,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            });

            // 1. Entrance phase: Fade and scale up (skip for Hero since it starts in viewport)
            if (index > 0) {
              tl.fromTo(inner, 
                { scale: 0.94, opacity: 0.05 },
                { scale: 1, opacity: 1, duration: 1, ease: "none" }
              );
            }

            // 2. Middle focus phase: Keep fully visible while centered
            tl.to({}, { duration: 1.5 });

            // 3. Exit phase: Fade and scale down as it leaves (skip for final CTA)
            if (index < targetSections.length - 1) {
              tl.to(inner, {
                scale: 0.94,
                opacity: 0.05,
                duration: 1,
                ease: "none",
              });
            }
          });
        }, "#compliance-v2-container");

        // Recalculate ScrollTrigger positions once all triggers are registered
        ScrollTrigger.refresh();
      }, 1000); // 1000ms delay to let child components mount their pinned triggers first

      return () => {
        if (ctx) ctx.revert();
        clearTimeout(timer);
      };
    }
  }, [loading]);

  return (
    <div 
      id="compliance-v2-container" 
      className="w-full bg-[#060606] block relative text-[#F5F5F5] select-none"
      style={{ overflowAnchor: "none" }}
    >
      {/* 1. Custom Opening Sequence Loader */}
      <ComplianceLoader onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          {/* 2. Persistent Background WebGL Canvas */}
          <ComplianceBackgroundCanvas />

          {/* 3. Hero Section */}
          <ServiceHero
            category={data.category}
            title={"Compliance isn't a checkbox.\nIt's a structure."}
            tagline="Audit-ready governance driven by continuous evidence collection, not point-in-time snapshots."
            visual={<div className="w-full h-full bg-transparent min-h-[300px]" />}
            heroLayoutType="compliance"
            col2Description={data.col2Description}
            col3Metadata={data.col3Metadata}
          />

          {/* 4. Framework Panoramic Reveal Section */}
          <FrameworkReveal />

          {/* 5. Process Lifecycle Stages Section */}
          <ProcessWipe />

          {/* 6. Deliverables Section */}
          <ServiceDeliverables 
            deliverables={data.deliverables} 
            integrations={data.integrations} 
          />

          {/* 7. Proof Section */}
          <ComplianceProof />

          {/* 8. FAQ Accordion Section */}
          <ServiceFAQ 
            faqs={data.faqs} 
            isAccordion={true} 
          />

          {/* 9. Final CTA */}
          <ServiceCTA />
        </>
      )}

      {/* Force transparent background overrides on specific layout components */}
      <style jsx global>{`
        [data-page='compliance-security'] #compliance-v2-container {
          background-color: #060606 !important;
        }
        [data-page='compliance-security'] section {
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
}
