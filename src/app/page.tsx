import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ValueProposition from "@/components/sections/ValueProposition";
import StatsCounter from "@/components/sections/StatsCounter";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import Differentiators from "@/components/sections/Differentiators";
import Testimonials from "@/components/sections/Testimonials";
import CaseStudies from "@/components/sections/CaseStudies";
import InsightsBlog from "@/components/sections/InsightsBlog";
import CertificationsMarquee from "@/components/sections/CertificationsMarquee";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import AnimatedDivider from "@/components/ui/AnimatedDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col w-full relative z-10">
        <Hero />
        <AnimatedDivider />
        <ValueProposition />
        <AnimatedDivider />
        <StatsCounter />
        <AnimatedDivider />
        <ServicesShowcase />
        <AnimatedDivider />
        <Differentiators />
        <AnimatedDivider />
        <Testimonials />
        <AnimatedDivider />
        <CaseStudies />
        <AnimatedDivider />
        <InsightsBlog />
        <AnimatedDivider />
        <CertificationsMarquee />
        <AnimatedDivider />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
