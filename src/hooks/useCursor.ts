"use client";

import { useEffect, useRef, useState } from "react";

export type HoverType = "default" | "button" | "link" | "card" | "text" | "section";

export function useCursor() {
  const [hasMouse, setHasMouse] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (isFine) {
      setHasMouse(true);
    }

    const handleFirstMouseMove = () => {
      setHasMouse(true);
      window.removeEventListener("mousemove", handleFirstMouseMove);
    };

    if (!isFine) {
      window.addEventListener("mousemove", handleFirstMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleFirstMouseMove);
    };
  }, []);

  return { hasMouse };
}
