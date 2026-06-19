"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    // Check local storage on mount
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "light";
    
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    // Dispatch a custom theme change event to ensure any listener modules catch it
    window.dispatchEvent(new CustomEvent("themeChange", { detail: nextTheme }));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-[4px] border border-[var(--border-subtle)] hover:border-[var(--text-primary)] hover:bg-white/[0.04] text-[var(--text-primary)] transition-all duration-300 flex items-center justify-center bg-white/[0.01]"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      data-cursor="link"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-[#ffb700] animate-[spin_8s_linear_infinite]" />
      ) : (
        <Moon className="w-4 h-4 text-[#00A3FF]" />
      )}
    </button>
  );
}
