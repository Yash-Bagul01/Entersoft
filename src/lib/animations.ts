import { Variants } from "framer-motion";

export const EASE = {
  smooth: "cubic-bezier(0.22, 1, 0.36, 1)",   // standard reveal ease
  weighted: "cubic-bezier(0.16, 1, 0.3, 1)",  // slower, heavier — hero/large elements
  snap: "cubic-bezier(0.65, 0, 0.35, 1)",     // for fast micro-interactions only (buttons)
};

export const DURATION = { fast: 0.3, base: 0.6, slow: 0.9, hero: 1.4 };
export const STAGGER = { tight: 0.04, base: 0.08, loose: 0.14 };

// Signature Palantir transition ease curve
export const PALANTIR_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]; // cubic-bezier

/**
 * Shared layout fade and slide up animation variants
 */
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: PALANTIR_EASE,
    },
  },
};

/**
 * Parent container to trigger staggered child reveals
 */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

/**
 * Text reveal animations line-by-line / clip-mask
 */
export const clipPathRevealVariants: Variants = {
  hidden: {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    y: "30%",
  },
  visible: {
    clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
    y: "0%",
    transition: {
      duration: 0.9,
      ease: PALANTIR_EASE,
    },
  },
};

/**
 * Simple fade in
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/**
 * Scroll reveal animation variants (Fade up + Translate + Scale)
 */
export const scrollRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as const, // EASE.weighted
    },
  },
};
