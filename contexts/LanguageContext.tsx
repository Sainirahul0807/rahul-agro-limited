"use client";
import React, { createContext, useContext, useState } from "react";
import { type Locale, type Dictionary, dictionaries } from "@/locales/dictionary";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: dictionaries.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const t = dictionaries[locale];
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
