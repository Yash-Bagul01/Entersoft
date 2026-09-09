"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AsmPreloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const hold = window.setTimeout(() => setExiting(true), 1400);
    const done = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 2300);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(done);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="asm-preloader"
          className="asm-preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="asm-preloader-sun" aria-hidden="true" />
          <motion.p
            className="asm-preloader-kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1.08, 0.38, 0.98] }}
          >
            Attack Surface Visibility
          </motion.p>
          <motion.p
            className="asm-display asm-preloader-word"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1.08, 0.38, 0.98] }}
          >
            Power on
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
