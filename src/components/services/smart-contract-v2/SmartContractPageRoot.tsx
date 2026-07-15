"use client";

import React, { useEffect, useState } from "react";
import { servicePagesData } from "@/data/services";
import ServiceDeliverables from "@/components/services/ServiceDeliverables";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import custom sections
import SmartContractHero from "./sections/SmartContractHero";
import FuzzingSimulator from "./sections/FuzzingSimulator";
import CodeAnnotator from "./sections/CodeAnnotator";
import ProtocolSpectra from "./sections/ProtocolSpectra";
import Scroll3DCanvas from "./sections/Scroll3DCanvas";

export default function SmartContractPageRoot() {
  const data = servicePagesData["smart-contract-audits"];

  const [isPatched, setIsPatched] = useState(false);
  const [activeVuln, setActiveVuln] = useState<"none" | "unprotected-owner" | "reentrancy">("none");

  useEffect(() => {
    // Set theme variables on mount
    const prevTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.setAttribute("data-page", "smart-contract");

    return () => {
      if (prevTheme) {
        document.documentElement.setAttribute("data-theme", prevTheme);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      document.documentElement.removeAttribute("data-page");
    };
  }, []);

  return (
    <div 
      id="smart-contract-v2-container" 
      className="w-full bg-[#060606] text-[#f6f5f0] relative select-none"
      style={{ overflowAnchor: "none" }}
    >
      {/* 3D Scroll Ambient Canvas */}
      <Scroll3DCanvas isPatched={isPatched} activeVuln={activeVuln} />

      {/* 1. Hero Section */}
      <SmartContractHero />

      {/* 2. Interactive Fuzzing Simulator */}
      <FuzzingSimulator />

      {/* 3. Interactive Code Annotator */}
      <CodeAnnotator 
        isPatched={isPatched} 
        setIsPatched={setIsPatched} 
        activeVuln={activeVuln} 
        setActiveVuln={setActiveVuln} 
      />

      {/* 4. Protocol Standards (ERC-20, etc.) */}
      <ProtocolSpectra />

      {/* 5. Deliverables Section */}
      <ServiceDeliverables 
        deliverables={data.deliverables} 
        integrations={data.integrations} 
      />

      {/* 6. FAQ Accordion Section */}
      <ServiceFAQ 
        faqs={data.faqs} 
        isAccordion={true} 
      />

      {/* 7. Final CTA */}
      <ServiceCTA />

      {/* Force dark theme colors on generic layout components */}
      <style jsx global>{`
        [data-page='smart-contract'] {
          --bg-primary: #111111 !important;
          --bg-elevated: #2b2b2b !important;
          --border-subtle: #565656 !important;
          --text-primary: #f9f9f9 !important;
          --text-secondary: #9c9c9c !important;
          --text-tertiary: #565656 !important;
          --accent: #e5ff5d !important; /* Citrine Signal */
          --accent-dim: rgba(229, 255, 93, 0.12) !important;
          --accent-hover: #eeff8b !important;
          font-family: 'Neue Haas Grotesk Text', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        }

        [data-page='smart-contract'] body {
          background-color: #111111 !important;
          color: #f9f9f9 !important;
        }

        [data-page='smart-contract'] section {
          background-color: transparent !important;
        }

        [data-page='smart-contract'] .text-white {
          color: #f9f9f9 !important;
        }
        
        [data-page='smart-contract'] .text-zinc-300 {
          color: #d6d6d6 !important;
        }

        [data-page='smart-contract'] .text-zinc-400 {
          color: #9c9c9c !important;
        }

        [data-page='smart-contract'] .text-zinc-500 {
          color: #565656 !important;
        }

        [data-page='smart-contract'] .border-zinc-800 {
          border-color: #2b2b2b !important;
        }
        
        [data-page='smart-contract'] .border-zinc-900 {
          border-color: #565656 !important;
        }

        [data-page='smart-contract'] .bg-zinc-900\/\[0\.12\] {
          background-color: #2b2b2b !important;
        }
      `}</style>
    </div>
  );
}
