"use client";

import { useLang } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      className="flex items-center rounded-full overflow-hidden"
      style={{
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-card)",
        fontSize: "0.58rem",
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        letterSpacing: "0.1em",
      }}
    >
      {(["ka", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="px-3 py-1.5 transition-all duration-200"
          style={{
            color: lang === l ? "#fff" : "var(--text-secondary)",
            background: lang === l ? "var(--accent-gold)" : "transparent",
          }}
          aria-label={l === "ka" ? "Switch to Georgian" : "Switch to English"}
        >
          {l === "ka" ? "ქარ" : "ENG"}
        </button>
      ))}
    </div>
  );
}
