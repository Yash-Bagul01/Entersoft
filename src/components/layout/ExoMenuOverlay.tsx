"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

interface ExoMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PrimaryNavItem {
  id: string;
  label: string;
  href: string;
  image: string;
}

interface SecondaryNavItem {
  id: string;
  label: string;
  href: string;
  image?: string;
}

const primaryNavItems: PrimaryNavItem[] = [
  {
    id: "platform",
    label: "Platform",
    href: ROUTES.platform.enprobe,
    image: "/images/menu/platform.png",
  },
  {
    id: "services",
    label: "Services",
    href: "/#services",
    image: "/images/menu/services.png",
  },
  {
    id: "solutions",
    label: "Solutions",
    href: "/#services",
    image: "/images/menu/solutions.png",
  },
];

const secondaryNavItems: SecondaryNavItem[] = [
  { id: "industries", label: "Industries", href: "/#services", image: "/images/menu/industries.png" },
  { id: "resources", label: "Resources", href: "/#insights", image: "/images/menu/platform.png" },
  { id: "company", label: "Company", href: ROUTES.company.accreditations, image: "/images/menu/services.png" },
  { id: "accreditations", label: "Accreditations", href: ROUTES.company.accreditations, image: "/images/menu/solutions.png" },
  { id: "contact", label: "Contact Us", href: ROUTES.contact, image: "/images/menu/services.png" },
];

const overlayVariants = {
  closed: {
    y: "-100%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  open: {
    y: "0%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const contentVariants = {
  closed: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3 },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ExoMenuOverlay({ isOpen, onClose }: ExoMenuOverlayProps) {
  const [activeImage, setActiveImage] = useState<string>(primaryNavItems[0].image);
  const [activeId, setActiveId] = useState<string>(primaryNavItems[0].id);

  // Lock body scroll when open and handle ESC key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={overlayVariants}
          style={{ colorScheme: "dark" }}
          className="fixed inset-0 z-[100] w-full h-full bg-[#0d0e12] !text-white flex flex-col justify-between overflow-hidden shadow-2xl selection:bg-white selection:text-black dark"
        >
          {/* Header Bar inside Overlay */}
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 py-8 flex items-center justify-between z-20 shrink-0">
            {/* Logo */}
            <Link href="/" onClick={onClose} className="flex items-center cursor-pointer">
              <Image
                src="https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg"
                alt="Entersoft Logo"
                width={130}
                height={26}
                className="h-6 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                priority
              />
            </Link>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm md:text-base font-sans !text-white/80 hover:!text-white transition-colors cursor-pointer group"
              aria-label="Close menu"
            >
              <span className="tracking-wide font-light">Close</span>
              <X className="w-4 h-4 !text-white/80 group-hover:!text-white transition-colors" />
            </button>
          </div>

          {/* Main Overlay Body: Grid layout (Left Portrait Image + Right Navigation Links Stack) */}
          <motion.div
            variants={contentVariants}
            className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-16 py-4 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-y-auto z-10 custom-scrollbar"
          >
            {/* Left Column: Portrait Visual Preview Card */}
            <div className="hidden lg:flex items-center justify-center lg:col-span-5">
              <div className="relative w-[300px] xl:w-[360px] aspect-[3/4] rounded-xl overflow-hidden bg-black/50 shadow-2xl border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={activeImage}
                      alt="Menu visual preview"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Navigation Links (Main Large Items + Small Secondary Items underneath) */}
            <div className="lg:col-span-7 flex flex-col justify-center pl-0 lg:pl-12">
              {/* Primary Large Links Stack */}
              <div className="flex flex-col space-y-1 md:space-y-2">
                {primaryNavItems.map((item) => {
                  const isHovered = activeId === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onClose}
                      onMouseEnter={() => {
                        setActiveId(item.id);
                        setActiveImage(item.image);
                      }}
                      className={cn(
                        "block font-display text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.08] transition-all duration-300 transform origin-left cursor-pointer w-fit",
                        isHovered ? "!text-white translate-x-2" : "!text-slate-400/60 hover:!text-white/80"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Secondary Small Headings Stack (Includes Industries) */}
              <div className="mt-8 md:mt-12 flex flex-col space-y-2">
                {secondaryNavItems.map((sec) => {
                  const isHovered = activeId === sec.id;
                  return (
                    <Link
                      key={sec.label}
                      href={sec.href}
                      onClick={onClose}
                      onMouseEnter={() => {
                        setActiveId(sec.id);
                        if (sec.image) setActiveImage(sec.image);
                      }}
                      className={cn(
                        "text-sm md:text-base font-sans transition-all duration-300 tracking-normal w-fit cursor-pointer hover:translate-x-1.5",
                        isHovered ? "!text-white font-medium" : "!text-slate-400/80 hover:!text-white"
                      )}
                    >
                      {sec.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Footer Bar inside Overlay */}
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 py-8 flex items-center justify-between text-xs md:text-sm !text-slate-400 font-sans tracking-wide border-t border-white/10 z-20 shrink-0">
            <Link
              href="/#hero"
              onClick={onClose}
              className="hover:!text-white transition-colors cursor-pointer"
            >
              Play Reel
            </Link>

            <Link
              href={ROUTES.company.accreditations}
              onClick={onClose}
              className="hover:!text-white transition-colors cursor-pointer"
            >
              Our Story
            </Link>

            <Link
              href={ROUTES.contact}
              onClick={onClose}
              className="hover:!text-white transition-colors cursor-pointer flex items-center gap-2 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
              <span className="underline underline-offset-4 font-medium !text-white/90 group-hover:!text-white">Now Hiring!</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
