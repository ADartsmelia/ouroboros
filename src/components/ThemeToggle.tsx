"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
      style={{
        color: "var(--text-secondary)",
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
      }}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark"
        ? <Sun size={14} strokeWidth={2} />
        : <Moon size={14} strokeWidth={2} />
      }
    </button>
  );
}
