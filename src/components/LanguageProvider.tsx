"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Lang, t, Translations } from "@/lib/translations";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: Translations;
}

const LangContext = createContext<LangContextValue>({
  lang: "ka",
  setLang: () => {},
  tr: t.ka,
});

export function useLang() {
  return useContext(LangContext);
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ka");

  useEffect(() => {
    // English disabled — always lock to Georgian
    setLangState("ka");
    document.documentElement.lang = "ka";
    localStorage.setItem("ou-lang", "ka");
  }, []);

  // English disabled — setLang is a no-op until re-enabled
  const setLang = (_l: Lang) => {};

  return (
    <LangContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LangContext.Provider>
  );
}
