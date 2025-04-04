
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
    "about.viewResume": "My Resume",
    
    // Skills
    "skills.title": "Core Skillset",
    "skills.strategy": "Strategic Leadership",
    "skills.strategy.desc": "Leading diverse, cross-functional teams and scaling businesses for growth",
    "skills.marketing": "Results-Driven Marketing",
    "skills.marketing.desc": "Developing and executing data-driven strategies with measurable results",
    "skills.operations": "Operational Efficiency",
    "skills.operations.desc": "Streamlining workflows and implementing tools to enhance productivity",
    "skills.business": "Business Development",
    "skills.business.desc": "Identifying growth opportunities and building strong client relationships",
    "skills.digital": "Digital Transformation",
    "skills.digital.desc": "Implementing new technologies including AI to modernize operations",
    "skills.data": "Data-Driven Decision-Making",
    "skills.data.desc": "Leveraging analytics to measure and optimize business outcomes",
    "skills.sustainability": "Sustainability Leadership",
    "skills.sustainability.desc": "Integrating purpose and sustainability into business strategy",
    "skills.cultural": "Cross-Cultural Competence",
    "skills.cultural.desc": "Working effectively across diverse markets and multicultural teams",
    
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
    
    // Footer
    "footer.privacy": "Privacy Policy",
    "footer.cookies": "Cookie Policy",
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
    "about.viewResume": "Il Mio Curriculum",
    
    // Skills
    "skills.title": "Competenze Principali",
    "skills.strategy": "Leadership Strategica",
    "skills.strategy.desc": "Guidare team interfunzionali diversi e scalare le aziende per la crescita",
    "skills.marketing": "Marketing Orientato ai Risultati",
    "skills.marketing.desc": "Sviluppare ed eseguire strategie basate sui dati con risultati misurabili",
    "skills.operations": "Efficienza Operativa",
    "skills.operations.desc": "Ottimizzare i flussi di lavoro e implementare strumenti per migliorare la produttività",
    "skills.business": "Sviluppo del Business",
    "skills.business.desc": "Identificare opportunità di crescita e costruire solide relazioni con i clienti",
    "skills.digital": "Trasformazione Digitale",
    "skills.digital.desc": "Implementare nuove tecnologie, inclusa l'IA, per modernizzare le operazioni",
    "skills.data": "Decisioni Basate sui Dati",
    "skills.data.desc": "Sfruttare l'analisi per misurare e ottimizzare i risultati aziendali",
    "skills.sustainability": "Leadership nella Sostenibilità",
    "skills.sustainability.desc": "Integrare scopo e sostenibilità nella strategia aziendale",
    "skills.cultural": "Competenza Interculturale",
    "skills.cultural.desc": "Lavorare efficacemente in mercati diversi e team multiculturali",
    
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
    
    // Footer
    "footer.privacy": "Informativa sulla Privacy",
    "footer.cookies": "Informativa sui Cookie",
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
