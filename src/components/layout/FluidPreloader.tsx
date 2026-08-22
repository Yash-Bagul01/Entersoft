"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function FluidPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Lock body scroll during preloader sequence
    document.body.style.overflow = "hidden";

    // Hold loading screen for pure logo animation sequence (matching fluid.glass)
    const timer1 = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    const timer2 = setTimeout(() => {
      setIsFinished(true);
      document.body.style.overflow = "";
    }, 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.body.style.overflow = "";
    };
  }, []);

  if (isFinished) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="fluid-preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.95,
              ease: [0.76, 0, 0.24, 1], // fluid.glass signature upward curtain wipe cubic-bezier
            },
          }}
          style={{ backgroundColor: "#F4F3EF", color: "#111111" }}
          className="fixed inset-0 z-[99999] flex flex-col justify-center items-center select-none overflow-hidden"
        >
          {/* Centered Company Logo Animation Only (fluid.glass style) */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 12 }}
            animate={{ 
              scale: [0.88, 1.02, 1],
              opacity: [0, 1, 1],
              y: [12, 0, 0]
            }}
            transition={{ 
              duration: 1.0, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="relative flex items-center justify-center"
          >
            <Image
              src="https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg"
              alt="Entersoft Security"
              width={220}
              height={44}
              className="h-10 md:h-12 w-auto object-contain [filter:brightness(0)]"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
