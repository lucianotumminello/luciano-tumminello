
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

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Effect to detect user's country and set initial language
  useEffect(() => {
    // First, check if there's a stored language preference
    const storedLanguage = localStorage.getItem("preferredLanguage");
    if (storedLanguage === "en" || storedLanguage === "it") {
      setLanguage(storedLanguage as Language);
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
  
  // Pre-load Italian translation for the Human + Tech blog post
  useEffect(() => {
    if (language === 'it') {
      const preloadTranslation = async () => {
        try {
          // This will trigger the translation and cache it
          const dummyContent = "Human + Tech Equation"; // Just enough to trigger the translation
          const translation = await translateText(dummyContent, 'en', 'it');
          
          // Cache the translation with a consistent key
          if (translation && translation.length > 2000) {
            translationCache['human-tech-equation-it'] = translation;
            console.log("Successfully cached Italian translation for Human + Tech blog post");
          }
        } catch (error) {
          console.error("Failed to preload translation:", error);
        }
      };
      
      preloadTranslation();
    }
  }, [language]);
  
  // Get the correct translation using the getTranslation utility
  const t = (key: string): string => {
    // Special handling for Human + Tech Equation blog post
    if ((key.includes('human-tech-equation') || key.includes('workforce-digital-transformation')) && language === 'it') {
      const cacheKey = `human-tech-equation-it`;
      
      // Check if we have this in cache
      if (translationCache[cacheKey] && translationCache[cacheKey].length > 2000) {
        console.log("Using cached Italian translation for Human + Tech Equation");
        return translationCache[cacheKey];
      }
      
      // For this specific blog post, we'll return the key to use the fallback in TranslatedText
      // This allows the full pre-translated content from translateText to be used
      console.log("No cached translation or incomplete cache - using fallback for Human+Tech post");
      return key;
    }
    
    return getTranslation(language, key);
  };
  
  // Function to change the language
  const changeLanguage = (lang: Language) => {
    console.log(`Changing language to: ${lang}`);
    setLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
    
    // Only clear translations for the language that's not being switched to
    // This ensures we keep the translations for the current language
    const otherLang = lang === 'en' ? 'it' : 'en';
    Object.keys(translationCache).forEach(key => {
      if (key.includes(otherLang)) {
        delete translationCache[key];
      }
    });
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
