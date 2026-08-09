export interface Language {
  code: string;
  label: string;
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "zh-CN", label: "简体中文" },
  { code: "ja", label: "日本語" },
  { code: "zh-TW", label: "繁體中文" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "pt", label: "Português" },
  { code: "ko", label: "한국어" },
  { code: "de", label: "Deutsch" },
  { code: "hi", label: "हिन्दी" },
];

export const DEFAULT_LANGUAGE = "en";
