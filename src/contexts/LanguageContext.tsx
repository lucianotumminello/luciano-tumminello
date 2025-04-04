
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the language type
export type Language = "en" | "it";

// Define the translation data structure
type TranslationData = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Our translations
export const translations: TranslationData = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.blog": "Blog",
    "nav.contact": "Contact Me",
    
    // Home Page
    "home.title": "Marketing & Operations Leader",
    "home.subtitle": "15+ years driving growth across Asia-Pacific with expertise in operations, marketing, and digital transformation. Currently leading strategic initiatives at Spartan Health in the health and wellness industry.",
    
    // About Page
    "about.title": "About Me",
    "about.role": "Chief Operating Officer",
    "about.location": "Remote, Spartan Health",
    "about.education": "Dual Master's in Commerce & Advertising",
    "about.experience": "15+ Years Experience",
    "about.journey": "Professional Journey",
    "about.competencies": "Core Competencies",
    
    // Skills
    "skills.title": "Core Skillset",
    "skills.strategy": "Strategic Leadership",
    "skills.marketing": "Results-Driven Marketing",
    "skills.operations": "Operational Efficiency",
    "skills.business": "Business Development",
    "skills.digital": "Digital Transformation",
    "skills.data": "Data-Driven Decision-Making",
    "skills.sustainability": "Sustainability Leadership",
    "skills.cultural": "Cross-Cultural Competence",
    
    // Contact Page
    "contact.title": "Contact Me",
    "contact.subtitle": "Have a project in mind or just want to say hello? I'd love to hear from you.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.location": "Location",
    "contact.follow": "Follow Me",
    
    // Blog Page
    "blog.title": "Blog",
    "blog.subtitle": "Thoughts, insights, and perspectives on design, development, and the digital world.",
    "blog.readmore": "Read More",
  },
  it: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "Chi Sono",
    "nav.blog": "Blog",
    "nav.contact": "Contattami",
    
    // Home Page
    "home.title": "Leader di Marketing e Operazioni",
    "home.subtitle": "Oltre 15 anni di esperienza nella promozione della crescita in Asia-Pacifico con competenze in operazioni, marketing e trasformazione digitale. Attualmente alla guida di iniziative strategiche presso Spartan Health nel settore della salute e del benessere.",
    
    // About Page
    "about.title": "Chi Sono",
    "about.role": "Direttore Operativo",
    "about.location": "Remoto, Spartan Health",
    "about.education": "Doppia Laurea Magistrale in Commercio e Pubblicità",
    "about.experience": "Oltre 15 Anni di Esperienza",
    "about.journey": "Percorso Professionale",
    "about.competencies": "Competenze Principali",
    
    // Skills
    "skills.title": "Competenze Principali",
    "skills.strategy": "Leadership Strategica",
    "skills.marketing": "Marketing Orientato ai Risultati",
    "skills.operations": "Efficienza Operativa",
    "skills.business": "Sviluppo del Business",
    "skills.digital": "Trasformazione Digitale",
    "skills.data": "Decisioni Basate sui Dati",
    "skills.sustainability": "Leadership nella Sostenibilità",
    "skills.cultural": "Competenza Interculturale",
    
    // Contact Page
    "contact.title": "Contattami",
    "contact.subtitle": "Hai un progetto in mente o vuoi semplicemente salutare? Mi piacerebbe sentirti.",
    "contact.name": "Nome",
    "contact.email": "Email",
    "contact.subject": "Oggetto",
    "contact.message": "Messaggio",
    "contact.send": "Invia Messaggio",
    "contact.sending": "Invio in corso...",
    "contact.location": "Posizione",
    "contact.follow": "Seguimi",
    
    // Blog Page
    "blog.title": "Blog",
    "blog.subtitle": "Pensieri, approfondimenti e prospettive su design, sviluppo e mondo digitale.",
    "blog.readmore": "Leggi di più",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
