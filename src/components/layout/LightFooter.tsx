"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LightFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "SAST Platform", href: "/platform/sast" },
        { label: "ASPM Integration", href: "/platform/aspm" },
        { label: "API Security", href: "/platform/api-security" },
        { label: "Secrets Detection", href: "/platform/secrets" },
      ],
    },
    {
      title: "Offerings",
      links: [
        { label: "Application Assurance", href: "/services/appsec" },
        { label: "Adversarial Validation", href: "/services/vapt" },
        { label: "Cloud Resilience", href: "/services/managed-cloud-security" },
        { label: "Digital Trust", href: "/services/compliance-management" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Entersoft", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-[var(--lt-gray)] border-t border-[var(--lt-border)] py-16 px-6 md:px-12 text-[var(--lt-text)]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-6">
          <Link href="/" className="inline-block">
            <Image
              src="https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg"
              alt="Entersoft Security Logo"
              width={140}
              height={28}
              className="h-6 w-auto object-contain [filter:brightness(0)] opacity-100"
            />
          </Link>
          <p className="font-sans text-sm text-[var(--lt-text-body)] leading-relaxed max-w-[320px]">
            Entersoft Security is a leading cybersecurity provider, delivering expert-led application assurance, adversarial validation, and continuous resilience.
          </p>
          <div className="font-mono text-[10px] text-[var(--lt-text-hint)] tracking-wider">
            © {currentYear} ENTERSOFT SECURITY. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Links Columns */}
        {footerLinks.map((group) => (
          <div key={group.title} className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-[var(--lt-text-hint)] uppercase tracking-wider">
              {group.title}
            </h4>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-[var(--lt-text-body)] hover:text-[var(--lt-text)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
