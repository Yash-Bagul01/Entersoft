"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { services } from "@/data/services";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getServiceKeyFromSlug, getServiceRoute } from "@/config/routes";

const formatNavLabel = (name: string) => {
  const title = name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return title.replace(/\bAi\b/g, "AI");
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentSlug = pathSegments[pathSegments.length - 1] || "";
  const currentKey = getServiceKeyFromSlug(currentSlug);

  const noPadding = currentSlug === "vapt" || currentSlug === "appsec" || currentSlug === "managed-cloud-security" || currentSlug === "compliance-management" || currentSlug === "smart-contract-audits" || currentSlug === "ai-ast";

  // Get the other six services
  const otherServices = services.filter(
    (item) => item.slug !== currentKey
  );

  return (
    <>
      <Navbar />
      <div className={`w-full bg-[var(--bg-primary)] min-h-[80vh] flex flex-col justify-between ${noPadding ? "" : "pt-16 md:pt-20"}`}>
        {/* Spacer to push content down under the fixed header */}
        <div className={`flex-1 flex flex-col ${noPadding ? "" : "pt-12"}`}>
          {children}
        </div>

      {/* Inter-service navigation strip at the bottom (above footer) */}
      <nav className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 backdrop-blur-sm py-8 relative z-20 mt-16 md:mt-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-4">
          <span className="font-mono text-[9px] font-bold text-[var(--text-secondary)] tracking-widest uppercase">
            Explore Spectrum
          </span>
          <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-3 font-mono text-[10px] font-bold uppercase tracking-wider">
            {otherServices.map((service, index) => (
              <React.Fragment key={service.slug}>
                {index > 0 && <span className="hidden md:inline text-[var(--border-subtle)] select-none">·</span>}
                <Link
                  href={getServiceRoute(service.slug)}
                  className="text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-300"
                >
                  {formatNavLabel(service.displayName)}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>
    </div>
      <Footer />
    </>
  );
}
