
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the language type
type Language = "en" | "it";

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

// English translations
const en = {
  // Navigation
  "nav.home": "Home",
  "nav.about": "About",
  "nav.journey": "Journey",
  "nav.blog": "Blog",
  "nav.contact": "Contact",
  
  // Hero Section
  "hero.title": "Luciano Tumminello",
  "hero.subtitle": "Marketing & Operations Executive",
  "hero.cta": "Get in Touch",
  
  // About Page
  "about.title": "About Luciano",
  "about.story": "With over 15 years of experience in digital marketing and business operations, I've had the privilege of working across multiple industries and markets. My career path has been driven by a passion for innovation, strategic thinking, and delivering impactful results.",
  "about.academic": "My academic background combines a Bachelor's degree in Political Science and a Master's in International Relations, providing a unique perspective on global business dynamics, consumer behavior, and cross-cultural marketing strategies.",
  "about.asia": "Based in Asia for over a decade, I've developed a deep understanding of APAC markets, leading successful digital initiatives for both global brands and regional players. This experience has been instrumental in honing my ability to navigate complex business environments and build meaningful connections with diverse stakeholders.",
  "about.today": "Today, as COO at Spartan Health, I leverage my expertise in marketing and operations to drive business growth, optimize processes, and foster a culture of excellence. My approach combines analytical thinking with creative problem-solving, always keeping user experience and brand integrity at the forefront.",
  "about.personal": "Beyond professional pursuits, I'm an avid traveler and photography enthusiast. These personal interests fuel my creativity and provide valuable insights into different cultures and consumer preferences, which I bring to my professional work.",
  "about.journey": "Professional Journey",
  "about.education": "Political Science & International Relations",
  "about.experience": "15+ Years in Marketing & Operations",
  "about.viewResume": "View Professional Journey",
  
  // Contact
  "contact.title": "Contact",
  "contact.subtitle": "I'm always open to discussing new projects, opportunities, or partnerships.",
  "contact.nameLabel": "Name",
  "contact.namePlaceholder": "Your name",
  "contact.emailLabel": "Email",
  "contact.emailPlaceholder": "your.email@example.com",
  "contact.messageLabel": "Message",
  "contact.messagePlaceholder": "How can I help you?",
  "contact.submit": "Send Message",
  "contact.success": "Your message has been sent successfully!",
  "contact.error": "There was an error sending your message. Please try again.",
  "contact.info.title": "Contact Information",
  "contact.info.email": "Email",
  "contact.info.location": "Location",
  "contact.info.social": "Social Media",
  "contact.required": "Required",
  "contact.validation.name": "Please enter your name",
  "contact.validation.email": "Please enter a valid email",
  "contact.validation.message": "Please enter your message",
  
  // Core Competencies
  "core.title": "Core Competencies",
  "core.marketing": "Digital Marketing",
  "core.operations": "Business Operations",
  "core.analytics": "Data Analytics",
  "core.leadership": "Team Leadership",
  "core.strategy": "Strategic Planning",
  "core.tech": "MarTech & AdTech",
  
  // Job Descriptions
  "job.spartan": "Driving operational excellence and strategic growth for a leading health tech company across APAC markets.",
  "job.slow": "Led marketing initiatives for a sustainable fashion brand, implementing eco-conscious campaigns that increased brand awareness by 45% while maintaining brand integrity.",
  "job.444": "Co-founded a digital media agency specializing in marketing automation and programmatic advertising for SMEs, securing over $1.5M in client contracts within the first year.",
  "job.greenpeace": "Developed and executed digital marketing strategies across Southeast Asia, increasing supporter engagement by 32% and optimizing campaign performance.",
  "job.accor": "Directed marketing operations for a cluster of premium hotels, overseeing branding, promotions, and digital marketing initiatives that resulted in a 25% revenue increase.",
  
  // Y-Digital job descriptions
  "job.ydigital.retention": "Achieved a 90% client retention rate and 30% average account growth.",
  "job.ydigital.relationships": "Strengthened relationships with major clients, driving increased revenue and engagement.",
  
  // Lion & Lion job descriptions
  "job.lion.strategies": "Spearheaded digital marketing strategies, driving a 65% improvement in pitch close rates by leveraging innovative AdTech solutions.",
  "job.lion.campaigns": "Optimized campaigns with data-driven insights, boosting ROI by 18% and improving client retention.",
  "job.lion.analytics": "Optimized marketing with advanced analytics, boosting conversion rates by 25%.",
  
  // DWA job descriptions
  "job.dwa.strategies": "Developed B2B marketing strategies, proposals and quotations for pitching to clients or in response to their briefs.",
  "job.dwa.relationships": "Acquired, retained, and built business relationships with clients.",
  "job.dwa.liaison": "Acted as the key liaison between the client and the agency.",
  "job.dwa.vendors": "Sourced vendors and negotiated to maintain low cost and profit margins.",
  "job.dwa.project": "Managed projects including retro-planning, timelines, and budgeting.",
  
  "job.cadreon": "Spearheaded programmatic advertising across ASEAN markets, contributing to 30% revenue growth for high-profile clients like Microsoft, KFC, and Cathay Pacific.",
  "job.sensis": "Optimized over 140 SEM campaigns in Australia, significantly improving performance and client retention.",
  
  // Skills Section
  "skills.section.title": "Expertise & Skills",
  
  // Professional Summary Card
  "summary.title": "Professional Summary",
  "summary.description": "Accomplished marketing and operations executive with expertise in building high-performing teams, implementing data-driven strategies, and driving business growth.",
  "summary.button": "View Full Journey",
  
  // Footer
  "footer.rights": "All Rights Reserved",
  "footer.privacy": "Privacy Policy",
  "footer.cookies": "Cookie Policy",
  
  // Not Found Page
  "notFound.title": "Page Not Found",
  "notFound.description": "The page you are looking for doesn't exist or has been moved.",
  "notFound.button": "Back to Home",
  
  // Privacy Policy
  "privacy.title": "Privacy Policy",
  "privacy.lastUpdated": "Last Updated",
  
  // Cookie Policy
  "cookie.title": "Cookie Policy",
  "cookie.lastUpdated": "Last Updated",
};

// Italian translations
const it = {
  // Navigation
  "nav.home": "Home",
  "nav.about": "Chi Sono",
  "nav.journey": "Percorso",
  "nav.blog": "Blog",
  "nav.contact": "Contatti",
  
  // Hero Section
  "hero.title": "Luciano Tumminello",
  "hero.subtitle": "Dirigente Marketing & Operazioni",
  "hero.cta": "Contattami",
  
  // About Page
  "about.title": "Chi è Luciano",
  "about.story": "Con oltre 15 anni di esperienza nel marketing digitale e nelle operazioni aziendali, ho avuto il privilegio di lavorare in diversi settori e mercati. Il mio percorso professionale è stato guidato dalla passione per l'innovazione, il pensiero strategico e il raggiungimento di risultati significativi.",
  "about.academic": "Il mio background accademico combina una laurea in Scienze Politiche e un Master in Relazioni Internazionali, offrendo una prospettiva unica sulle dinamiche aziendali globali, sul comportamento dei consumatori e sulle strategie di marketing interculturale.",
  "about.asia": "Basato in Asia per oltre un decennio, ho sviluppato una profonda comprensione dei mercati APAC, guidando iniziative digitali di successo sia per marchi globali che per attori regionali. Questa esperienza è stata fondamentale per affinare la mia capacità di navigare in ambienti aziendali complessi e costruire connessioni significative con diverse parti interessate.",
  "about.today": "Oggi, come COO di Spartan Health, sfrutto la mia esperienza nel marketing e nelle operazioni per guidare la crescita aziendale, ottimizzare i processi e promuovere una cultura dell'eccellenza. Il mio approccio combina pensiero analitico con problem-solving creativo, mantenendo sempre l'esperienza utente e l'integrità del marchio in primo piano.",
  "about.personal": "Oltre agli impegni professionali, sono un appassionato viaggiatore e fotografo. Questi interessi personali alimentano la mia creatività e forniscono preziose informazioni su diverse culture e preferenze dei consumatori, che porto nel mio lavoro professionale.",
  "about.journey": "Percorso Professionale",
  "about.education": "Scienze Politiche & Relazioni Internazionali",
  "about.experience": "Oltre 15 Anni in Marketing & Operazioni",
  "about.viewResume": "Visualizza Percorso Professionale",
  
  // Contact
  "contact.title": "Contatti",
  "contact.subtitle": "Sono sempre aperto a discutere nuovi progetti, opportunità o collaborazioni.",
  "contact.nameLabel": "Nome",
  "contact.namePlaceholder": "Il tuo nome",
  "contact.emailLabel": "Email",
  "contact.emailPlaceholder": "tua.email@esempio.com",
  "contact.messageLabel": "Messaggio",
  "contact.messagePlaceholder": "Come posso aiutarti?",
  "contact.submit": "Invia Messaggio",
  "contact.success": "Il tuo messaggio è stato inviato con successo!",
  "contact.error": "Si è verificato un errore nell'invio del messaggio. Per favore riprova.",
  "contact.info.title": "Informazioni di Contatto",
  "contact.info.email": "Email",
  "contact.info.location": "Posizione",
  "contact.info.social": "Social Media",
  "contact.required": "Obbligatorio",
  "contact.validation.name": "Per favore inserisci il tuo nome",
  "contact.validation.email": "Per favore inserisci una email valida",
  "contact.validation.message": "Per favore inserisci il tuo messaggio",
  
  // Core Competencies
  "core.title": "Competenze Chiave",
  "core.marketing": "Marketing Digitale",
  "core.operations": "Operazioni Aziendali",
  "core.analytics": "Analisi dei Dati",
  "core.leadership": "Leadership di Team",
  "core.strategy": "Pianificazione Strategica",
  "core.tech": "MarTech & AdTech",
  
  // Job Descriptions
  "job.spartan": "Guida all'eccellenza operativa e alla crescita strategica per un'azienda leader nel settore della tecnologia sanitaria nei mercati APAC.",
  "job.slow": "Ho guidato iniziative di marketing per un marchio di moda sostenibile, implementando campagne eco-consapevoli che hanno aumentato la consapevolezza del marchio del 45% mantenendo l'integrità del brand.",
  "job.444": "Co-fondatore di un'agenzia di media digitali specializzata in automazione marketing e pubblicità programmatica per PMI, con oltre 1,5 milioni di dollari in contratti clienti nel primo anno.",
  "job.greenpeace": "Ho sviluppato ed eseguito strategie di marketing digitale in tutto il Sud-est asiatico, aumentando il coinvolgimento dei sostenitori del 32% e ottimizzando le prestazioni delle campagne.",
  "job.accor": "Ho diretto le operazioni di marketing per un gruppo di hotel premium, supervisionando branding, promozioni e iniziative di marketing digitale che hanno portato a un aumento del 25% dei ricavi.",
  
  // Y-Digital job descriptions
  "job.ydigital.retention": "Ho raggiunto un tasso di fidelizzazione dei clienti del 90% e una crescita media degli account del 30%.",
  "job.ydigital.relationships": "Ho rafforzato le relazioni con i principali clienti, aumentando i ricavi e il coinvolgimento.",
  
  // Lion & Lion job descriptions
  "job.lion.strategies": "Ho guidato strategie di marketing digitale, ottenendo un miglioramento del 65% nei tassi di chiusura delle presentazioni sfruttando soluzioni AdTech innovative.",
  "job.lion.campaigns": "Ho ottimizzato le campagne con approfondimenti basati sui dati, aumentando il ROI del 18% e migliorando la fidelizzazione dei clienti.",
  "job.lion.analytics": "Ho ottimizzato il marketing con analisi avanzate, aumentando i tassi di conversione del 25%.",
  
  // DWA job descriptions
  "job.dwa.strategies": "Ho sviluppato strategie di marketing B2B, proposte e preventivi per presentazioni ai clienti o in risposta alle loro richieste.",
  "job.dwa.relationships": "Ho acquisito, mantenuto e costruito relazioni commerciali con i clienti.",
  "job.dwa.liaison": "Ho agito come collegamento principale tra il cliente e l'agenzia.",
  "job.dwa.vendors": "Ho ricercato fornitori e negoziato per mantenere bassi costi e margini di profitto.",
  "job.dwa.project": "Ho gestito progetti includendo retro-pianificazione, tempistiche e budget.",
  
  "job.cadreon": "Ho guidato la pubblicità programmatica nei mercati ASEAN, contribuendo a una crescita dei ricavi del 30% per clienti di alto profilo come Microsoft, KFC e Cathay Pacific.",
  "job.sensis": "Ho ottimizzato oltre 140 campagne SEM in Australia, migliorando significativamente le prestazioni e la fidelizzazione dei clienti.",
  
  // Skills Section
  "skills.section.title": "Competenze e Specializzazioni",
  
  // Professional Summary Card
  "summary.title": "Profilo Professionale",
  "summary.description": "Dirigente esperto di marketing e operazioni con competenza nella creazione di team ad alte prestazioni, nell'implementazione di strategie basate sui dati e nella guida della crescita aziendale.",
  "summary.button": "Visualizza Percorso Completo",
  
  // Footer
  "footer.rights": "Tutti i Diritti Riservati",
  "footer.privacy": "Informativa sulla Privacy",
  "footer.cookies": "Politica dei Cookie",
  
  // Not Found Page
  "notFound.title": "Pagina Non Trovata",
  "notFound.description": "La pagina che stai cercando non esiste o è stata spostata.",
  "notFound.button": "Torna alla Home",
  
  // Privacy Policy
  "privacy.title": "Informativa sulla Privacy",
  "privacy.lastUpdated": "Ultimo Aggiornamento",
  
  // Cookie Policy
  "cookie.title": "Politica dei Cookie",
  "cookie.lastUpdated": "Ultimo Aggiornamento",
};

// Create the provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>("en");
  
  // Get the correct translation based on the current language
  const t = (key: string): string => {
    if (language === "en") {
      return (en as Record<string, string>)[key] || key;
    } else {
      return (it as Record<string, string>)[key] || (en as Record<string, string>)[key] || key;
    }
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
