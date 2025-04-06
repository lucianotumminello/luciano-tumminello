
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Language, getTranslation } from "@/translations";

// Define the context type
type LanguageContextType = {
  language: Language;
  t: (key: string) => string;
  changeLanguage: (lang: Language) => void;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  t: () => "",
  changeLanguage: () => {},
});

// Create the provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>("en");
  
  // Get the correct translation using the getTranslation utility
  const t = (key: string): string => {
    return getTranslation(language, key);
  };
  
  // Function to change the language
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };
  
  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
