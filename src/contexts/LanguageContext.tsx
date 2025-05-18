
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Language, getTranslation } from "@/translations";
import { translateText } from "@/utils/blogUtils";

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

// Translation cache to improve performance
const translationCache: Record<string, string> = {};

// Create the provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>("en");
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Effect to detect user's country and set initial language
  useEffect(() => {
    // First, check if there's a stored language preference
    const storedLanguage = localStorage.getItem("preferredLanguage");
    if (storedLanguage === "en" || storedLanguage === "it") {
      setLanguage(storedLanguage);
      setIsInitialized(true);
      return;
    }
    
    // If no stored preference, detect country based on IP
    const detectUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // Set Italian as default for users in Italy
        if (data.country_code === 'IT') {
          setLanguage('it');
          localStorage.setItem("preferredLanguage", "it");
        }
      } catch (error) {
        console.error('Error detecting user country:', error);
      } finally {
        setIsInitialized(true);
      }
    };
    
    detectUserCountry();
  }, []);
  
  // Get the correct translation using the getTranslation utility
  const t = (key: string): string => {
    // For blog post special handling with human-tech-equation post
    if (key.startsWith('human-tech-equation') && language === 'it') {
      // Check if we have this in cache first
      const cacheKey = `human-tech-equation-it`;
      if (translationCache[cacheKey]) {
        return translationCache[cacheKey];
      }
      return key; // Will use fallback in component
    }
    
    return getTranslation(language, key);
  };
  
  // Function to change the language
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
  };
  
  // Wait until country detection is complete before rendering children
  if (!isInitialized) {
    return null;
  }
  
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
