"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { servicePagesData } from "@/data/services";

export default function ServiceBreadcrumb() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";
  const pageData = servicePagesData[slug];

  return (
    <nav className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--text-tertiary)] uppercase select-none mb-6">
      <Link href="/" className="hover:text-[var(--accent)] transition-colors duration-200">
        Home
      </Link>
      <span className="opacity-45">→</span>
      <Link href="/#services" className="hover:text-[var(--accent)] transition-colors duration-200">
        Services
      </Link>
      {pageData && (
        <>
          <span className="opacity-45">→</span>
          <span className="text-[var(--accent)]">{pageData.name}</span>
        </>
      )}
    </nav>
  );
}
