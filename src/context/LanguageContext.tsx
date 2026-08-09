"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LANGUAGES, DEFAULT_LANGUAGE } from "../i18n";
import en from "../i18n/translations/en";
import tr from "../i18n/translations/tr";
import zhCN from "../i18n/translations/zh-CN";
import ja from "../i18n/translations/ja";
import zhTW from "../i18n/translations/zh-TW";
import es from "../i18n/translations/es";
import fr from "../i18n/translations/fr";
import pt from "../i18n/translations/pt";
import ko from "../i18n/translations/ko";
import de from "../i18n/translations/de";
import hi from "../i18n/translations/hi";

type Dictionaries = Record<string, Record<string, string>>;

const dictionaries: Dictionaries = {
  en,
  tr,
  "zh-CN": zhCN,
  ja,
  "zh-TW": zhTW,
  es,
  fr,
  pt,
  ko,
  de,
  hi,
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t: (key, fallback) => fallback || key,
});

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax${secure}`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>(DEFAULT_LANGUAGE);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Initial auto-detection
    let initialLang = DEFAULT_LANGUAGE;

    const savedLocal = typeof window !== "undefined" ? localStorage.getItem("pheron_language") : null;
    const savedCookie = getCookie("pheron_language");

    if (savedLocal && LANGUAGES.some((l) => l.code === savedLocal)) {
      initialLang = savedLocal;
    } else if (savedCookie && LANGUAGES.some((l) => l.code === savedCookie)) {
      initialLang = savedCookie;
    } else if (typeof navigator !== "undefined" && navigator.language) {
      const bLang = navigator.language.toLowerCase();
      if (bLang.startsWith("tr")) initialLang = "tr";
      else if (bLang.startsWith("zh-tw") || bLang.startsWith("zh-hant") || bLang.startsWith("zh-hk")) initialLang = "zh-TW";
      else if (bLang.startsWith("zh")) initialLang = "zh-CN";
      else if (bLang.startsWith("ja")) initialLang = "ja";
      else if (bLang.startsWith("es")) initialLang = "es";
      else if (bLang.startsWith("fr")) initialLang = "fr";
      else if (bLang.startsWith("de")) initialLang = "de";
      else if (bLang.startsWith("pt")) initialLang = "pt";
      else if (bLang.startsWith("ko")) initialLang = "ko";
      else if (bLang.startsWith("hi")) initialLang = "hi";
      else initialLang = "en";
    }

    setLanguageState(initialLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("pheron_language", initialLang);
    }
    setCookie("pheron_language", initialLang);
  }, []);

  const changeLanguage = (newLang: string) => {
    const validLang = LANGUAGES.some((l) => l.code === newLang) ? newLang : DEFAULT_LANGUAGE;
    setLanguageState(validLang);

    if (typeof window !== "undefined") {
      localStorage.setItem("pheron_language", validLang);
    }
    setCookie("pheron_language", validLang);

    // If currently on a doc page, navigate to the updated language route
    if (pathname && pathname.startsWith("/resources/docs")) {
      const parts = pathname.split("/").filter(Boolean);
      // parts[0] = 'resources', parts[1] = 'docs'
      if (parts.length >= 3 && LANGUAGES.some((l) => l.code === parts[2])) {
        parts[2] = validLang;
        const newPath = "/" + parts.join("/");
        router.push(newPath);
      } else {
        router.push(`/resources/docs/${validLang}`);
      }
    }
  };

  const t = (key: string, fallback?: string): string => {
    const dict = dictionaries[language] || dictionaries[DEFAULT_LANGUAGE];
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    // Fallback to English dictionary if key missing in target language
    const defaultDict = dictionaries[DEFAULT_LANGUAGE];
    if (defaultDict && defaultDict[key] !== undefined) {
      return defaultDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
