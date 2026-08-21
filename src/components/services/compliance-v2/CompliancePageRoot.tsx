"use client";

import React, { useEffect } from "react";
import DT0_Hero from "./sections/DT0_Hero";
import DT1_ExecutiveThesis from "./sections/DT1_ExecutiveThesis";
import DT2_PillarsGrid from "./sections/DT2_PillarsGrid";
import DT3_OperatingModel from "./sections/DT3_OperatingModel";
import DT6_FrameworkMatrix from "./sections/DT6_FrameworkMatrix";
import DT4_ContinuousVsPointInTime from "./sections/DT4_ContinuousVsPointInTime";
import DT7_CertificationRoadmap from "./sections/DT7_CertificationRoadmap";
import DT8_EnterpriseProof from "./sections/DT8_EnterpriseProof";
import DT9_ExecutiveFAQ from "./sections/DT9_ExecutiveFAQ";
import DT10_ExecutiveCTA from "./sections/DT10_ExecutiveCTA";

export default function CompliancePageRoot() {
  useEffect(() => {
    // Set global data-page, dark theme, and heavy grain properties for theme overrides
    const prevTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.setAttribute("data-page", "compliance-security");
    document.documentElement.setAttribute("data-grain-heavy", "true");

    return () => {
      if (prevTheme) {
        document.documentElement.setAttribute("data-theme", prevTheme);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      document.documentElement.removeAttribute("data-page");
      document.documentElement.removeAttribute("data-grain-heavy");
    };
  }, []);

  return (
    <div
      id="digital-trust-root"
      data-page="compliance-security"
      data-grain-heavy="true"
      className="w-full bg-[#060606] text-[#F5F5F5] relative flex flex-col overflow-x-hidden select-none"
      style={{ overflowAnchor: "none" }}
    >
      {/* 01 — Executive Hero */}
      <DT0_Hero />

      {/* 02 — Executive Thesis & Problem Framing */}
      <DT1_ExecutiveThesis />

      {/* 03 — Four Digital Trust Pillars (#pillars) */}
      <DT2_PillarsGrid />

      {/* 04 — Delivery Operating Model (#operating-model) */}
      <DT3_OperatingModel />

      {/* 05 — Regulatory Framework Matrix (#frameworks) */}
      <DT6_FrameworkMatrix />

      {/* 06 — Continuous Evidence vs. Point-in-Time */}
      <DT4_ContinuousVsPointInTime />

      {/* 07 — Certification & Engagement Roadmap (#roadmap) */}
      <DT7_CertificationRoadmap />

      {/* 08 — Enterprise Proof & Verified Outcomes */}
      <DT8_EnterpriseProof />

      {/* 09 — CISO & General Counsel FAQ (#faq) */}
      <DT9_ExecutiveFAQ />

      {/* 10 — Executive Briefing CTA */}
      <DT10_ExecutiveCTA />
    </div>
  );
}
