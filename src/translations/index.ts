import en from './en';
import it from './it';

export type Language = "en" | "it";
export type TranslationKey = keyof typeof en;

export const translations = {
  en,
  it
};

// Function to ensure home.title is always in English
export const getTranslation = (language: Language, key: string): string => {
  // Special case for home.title - always return English version
  if (key === "home.title") {
    return translations.en[key as TranslationKey] || key;
  }
  
  // Otherwise use the selected language
  return translations[language]?.[key as TranslationKey] || 
         translations.en[key as TranslationKey] || 
         key;
};
