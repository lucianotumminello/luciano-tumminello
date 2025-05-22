
import React, { createContext, useContext, useState } from 'react';
import translations from '@/translations';

type Language = 'en' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const defaultContextValue: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get language from localStorage, fallback to 'en'
  const getInitialLanguage = (): Language => {
    try {
      const savedLanguage = localStorage.getItem('language');
      return (savedLanguage === 'it' || savedLanguage === 'en') ? savedLanguage : 'en';
    } catch (error) {
      return 'en';
    }
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    try {
      localStorage.setItem('language', newLanguage);
    } catch (error) {
      console.error('Error saving language to localStorage:', error);
    }
  };

  const translate = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];

    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // Return the key if translation not found
      }
    }

    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
