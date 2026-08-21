import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "Book a Security Briefing | Contact Entersoft";
const DESCRIPTION =
  "Discuss your application security, cloud posture, or compliance roadmap with senior technical practice leads. Response within 2 business hours.";
const CANONICAL = getCanonicalUrl(ROUTES.contact);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Entersoft Security",
    locale: "en_US",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-[#030712] text-white pt-16">
        <FinalCTA theme="dark" />
      </main>
      <Footer />
    </>
  );
}
