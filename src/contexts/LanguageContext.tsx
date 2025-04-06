
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
  "nav.about": "About Me",
  "nav.journey": "Career",
  "nav.blog": "Blog",
  "nav.contact": "Contact",
  
  // Hero Section
  "hero.title": "Luciano Tumminello",
  "hero.subtitle": "Marketing & Operations Executive",
  "hero.cta": "Get in Touch",
  
  // Home Page
  "home.title": "MARKETING & OPERATIONS LEADER",
  "home.subtitle": "15+ years driving growth across Asia-Pacific with expertise in operations, marketing and digital transformation. Currently leading strategic initiatives at Spartan Health in the health and wellness industry.",
  "home.expertise": "My Expertise",
  "home.viewResume": "View Resume",
  
  // Core Competencies
  "competencies.title": "Core Competencies",
  "competencies.strategic": "Strategic Leadership",
  "competencies.strategic.desc": "Guiding diverse cross-functional teams and scaling organizations",
  "competencies.marketing": "Results-Driven Marketing",
  "competencies.marketing.desc": "Developing and executing data-driven strategies with measurable impact",
  "competencies.operational": "Operational Efficiency",
  "competencies.operational.desc": "Streamlining workflows and implementing tools to enhance productivity",
  "competencies.business": "Business Development",
  "competencies.business.desc": "Identifying growth opportunities and building strong client relationships",
  "competencies.digital": "Digital Transformation",
  "competencies.digital.desc": "Introducing new technologies including AI to maximize operations",
  "competencies.data": "Data-Driven Decision-Making",
  "competencies.data.desc": "Using analytics to measure and optimize business outcomes",
  "competencies.sustainability": "Sustainability Leadership",
  "competencies.sustainability.desc": "Guiding efforts to integrate sustainability into business strategy",
  "competencies.cultural": "Cross-Cultural Competence",
  "competencies.cultural.desc": "Working effectively across diverse markets and multicultural teams",
  
  // About Page
  "about.title": "About Me",
  "about.me.para1": "My story begins in Palermo, Sicily. Growing up on this southern Italian island in the 1980s sparked my interest in the world beyond. Learning English from age three equipped me with one of the main tools that would eventually allow me to travel the world and leave Italy and Europe.",
  "about.me.para2": "My academic journey began with Bachelor Degrees in International Communications and International Relations at the University for Foreigners in Perugia in 2007. Seeking wider horizons, I embarked for Australia. Melbourne, with its vibrant energy, became my home as I earned dual Master's degrees in Commerce and Advertising from RMIT University, setting the stage for my journey in the dynamic world of marketing.",
  "about.me.para3": "The allure of Southeast Asia beckoned in 2012, immersing me in the region's diverse markets where I navigated the complexities of marketing and advertising across Singapore, Malaysia, Indonesia, and Thailand. These years in senior regional positions, both agency and client-side, served as a masterclass in driving strategic growth and achieving tangible results across varied cultural landscapes. My professional journey was further enriched by co-founding and building a full-scope digital agency from the ground up. This venture encompassed web and app development, creative services, and performance marketing, serving dozens of clients with offices in Bangkok and Phuket and a team of approximately 30 professionals. This entrepreneurial chapter provided invaluable insight into the intricacies of business development and leadership, solidifying my ability to transform vision into measurable success.",
  "about.me.para4": "Today, I reside in Bangkok, channeling my experience remotely as the Chief Operating Officer for Spartan Health, an Italian company dedicated to health and wellness. My focus here is on strategic direction, streamlining operations, and fostering a culture of efficiency through redesigned workflows. I am particularly passionate about leading our digital transformation, integrating cutting-edge software and AI to enhance productivity and leverage data for insightful decision-making.",
  "about.me.para5": "Besides my professional duties, I cultivate discipline and well-being through bodybuilding and fitness, a non-negotiable part of my daily life. I find inspiration and rejuvenation in exploring the diverse landscapes of Asia and Europe, with a particular fondness for the serenity of tropical islands. And, of course, a quiet moment spent delving into the intricacies of geopolitics or savoring a perfectly brewed espresso, a nod to my Italian heritage, brings me a sense of balance. It's in this interplay of professional rigor and personal passion that I find my equilibrium.",
  "about.journey": "Professional Journey",
  "about.education": "Dual Master's in Advertising & Commerce, RMIT",
  "about.experience": "15+ Years in Marketing & Operations",
  "about.viewResume": "View Professional Journey",
  
  // Contact
  "contact.title": "Contact",
  "contact.subtitle": "I'm always open to discussing new projects, opportunities, or partnerships.",
  "contact.name": "Name",
  "contact.namePlaceholder": "Your name",
  "contact.email": "Email",
  "contact.emailPlaceholder": "Your email address",
  "contact.subject": "Subject",
  "contact.subjectPlaceholder": "What is this regarding?",
  "contact.message": "Message",
  "contact.messagePlaceholder": "Your message",
  "contact.sendMessage": "Send Message",
  "contact.sending": "Sending...",
  "contact.success": "Message sent!",
  "contact.success.description": "Thanks for reaching out. I'll get back to you soon.",
  "contact.error": "There was an error sending your message. Please try again.",
  "contact.info.title": "Contact Information",
  "contact.info.email": "Email",
  "contact.info.location": "Location",
  "contact.follow": "Follow Me",
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
  "skills.marketing.title": "Marketing & Growth Skills",
  "skills.leadership.title": "Strategic Leadership Skills",
  "skills.operational.title": "Operational Efficiency Skills",
  "skills.business.title": "Business Strategy & Financial Skills",
  
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
  
  // About Me Section
  "about.me.title": "My Story",
};

// Italian translations
const it = {
  // Navigation
  "nav.home": "Home",
  "nav.about": "Chi Sono",
  "nav.journey": "Carriera",
  "nav.blog": "Blog",
  "nav.contact": "Contatti",
  
  // Hero Section
  "hero.title": "Luciano Tumminello",
  "hero.subtitle": "Dirigente Marketing & Operazioni",
  "hero.cta": "Contattami",
  
  // Home Page
  "home.title": "LEADER DI MARKETING & OPERAZIONI",
  "home.subtitle": "15+ anni di crescita in Asia-Pacifico con competenza in operazioni, marketing e trasformazione digitale. Attualmente alla guida di iniziative strategiche presso Spartan Health nel settore salute e benessere.",
  "home.expertise": "Le Mie Competenze",
  "home.viewResume": "Visualizza Curriculum",
  
  // Core Competencies
  "competencies.title": "Competenze Principali",
  "competencies.strategic": "Leadership Strategica",
  "competencies.strategic.desc": "Guidare team interfunzionali diversificati e organizzazioni in crescita",
  "competencies.marketing": "Marketing Orientato ai Risultati",
  "competencies.marketing.desc": "Sviluppare ed eseguire strategie basate sui dati con impatto misurabile",
  "competencies.operational": "Efficienza Operativa",
  "competencies.operational.desc": "Semplificare i flussi di lavoro e implementare strumenti per migliorare la produttività",
  "competencies.business": "Sviluppo del Business",
  "competencies.business.desc": "Identificare opportunità di crescita e costruire solide relazioni con i clienti",
  "competencies.digital": "Trasformazione Digitale",
  "competencies.digital.desc": "Introdurre nuove tecnologie, inclusa l'IA, per massimizzare le operazioni",
  "competencies.data": "Decisioni Basate sui Dati",
  "competencies.data.desc": "Utilizzare l'analisi per misurare e ottimizzare i risultati aziendali",
  "competencies.sustainability": "Leadership nella Sostenibilità",
  "competencies.sustainability.desc": "Guidare gli sforzi per integrare la sostenibilità nella strategia aziendale",
  "competencies.cultural": "Competenza Interculturale",
  "competencies.cultural.desc": "Lavorare efficacemente in mercati diversi e con team multiculturali",
  
  // About Page
  "about.title": "Chi Sono",
  "about.me.para1": "La mia storia inizia a Palermo, in Sicilia. Crescere nell'isola italiana meridionale negli anni '80 ha acceso il mio interesse per il mondo oltre i confini nazionali. Imparare l'inglese dall'età di tre anni mi ha fornito uno degli strumenti principali che mi avrebbe permesso di viaggiare per il mondo e lasciare l'Italia e l'Europa.",
  "about.me.para2": "Il mio percorso accademico è iniziato con lauree in Comunicazioni Internazionali e Relazioni Internazionali presso l'Università per Stranieri di Perugia nel 2007. Alla ricerca di orizzonti più ampi, mi sono trasferito in Australia. Melbourne, con la sua energia vibrante, è diventata la mia casa mentre conseguivo due Master in Commercio e Pubblicità presso l'RMIT University, gettando le basi per il mio percorso nel dinamico mondo del marketing.",
  "about.me.para3": "Il fascino del Sud-est asiatico mi ha attratto nel 2012, immergendomi nei diversi mercati della regione dove ho navigato tra le complessità del marketing e della pubblicità attraverso Singapore, Malesia, Indonesia e Thailandia. Questi anni in posizioni regionali senior, sia in agenzia che lato cliente, hanno rappresentato una masterclass nel guidare la crescita strategica e raggiungere risultati tangibili attraverso diversi paesaggi culturali. Il mio percorso professionale è stato ulteriormente arricchito dalla co-fondazione e costruzione di un'agenzia digitale a servizio completo da zero. Questa impresa comprendeva sviluppo web e di app, servizi creativi e marketing delle performance, servendo decine di clienti con uffici a Bangkok e Phuket e un team di circa 30 professionisti. Questo capitolo imprenditoriale mi ha fornito una preziosa visione delle complessità dello sviluppo aziendale e della leadership, consolidando la mia capacità di trasformare la visione in successo misurabile.",
  "about.me.para4": "Oggi risiedo a Bangkok, incanalando la mia esperienza da remoto come Chief Operating Officer di Spartan Health, un'azienda italiana dedicata alla salute e al benessere. Il mio focus qui è sulla direzione strategica, la semplificazione delle operazioni e la promozione di una cultura di efficienza attraverso flussi di lavoro ridisegnati. Sono particolarmente appassionato nel guidare la nostra trasformazione digitale, integrando software all'avanguardia e AI per migliorare la produttività e sfruttare i dati per processi decisionali illuminati.",
  "about.me.para5": "Oltre ai miei doveri professionali, coltivo disciplina e benessere attraverso il bodybuilding e il fitness, una parte non negoziabile della mia vita quotidiana. Trovo ispirazione e ringiovanimento nell'esplorare i diversi paesaggi dell'Asia e dell'Europa, con una particolare predilezione per la serenità delle isole tropicali. E, naturalmente, un momento tranquillo dedicato ad approfondire le complessità della geopolitica o a gustare un espresso perfettamente preparato, un cenno alla mia eredità italiana, mi porta un senso di equilibrio. È in questa interazione tra rigore professionale e passione personale che trovo il mio equilibrio.",
  "about.journey": "Percorso Professionale",
  "about.education": "Doppio Master in Pubblicità e Commercio, RMIT",
  "about.experience": "Oltre 15 Anni in Marketing & Operazioni",
  "about.viewResume": "Visualizza Percorso Professionale",
  
  // Contact
  "contact.title": "Contatti",
  "contact.subtitle": "Sono sempre aperto a discutere nuovi progetti, opportunità o collaborazioni.",
  "contact.name": "Nome",
  "contact.namePlaceholder": "Il tuo nome",
  "contact.email": "Email",
  "contact.emailPlaceholder": "Il tuo indirizzo email",
  "contact.subject": "Oggetto",
  "contact.subjectPlaceholder": "Di cosa si tratta?",
  "contact.message": "Messaggio",
  "contact.messagePlaceholder": "Il tuo messaggio",
  "contact.sendMessage": "Invia Messaggio",
  "contact.sending": "Inviando...",
  "contact.success": "Messaggio inviato!",
  "contact.success.description": "Grazie per avermi contattato. Ti risponderò al più presto.",
  "contact.error": "Si è verificato un errore nell'invio del messaggio. Per favore riprova.",
  "contact.info.title": "Informazioni di Contatto",
  "contact.info.email": "Email",
  "contact.info.location": "Posizione",
  "contact.follow": "Seguimi",
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
  "skills.marketing.title": "Competenze di Marketing e Crescita",
  "skills.leadership.title": "Competenze di Leadership Strategica",
  "skills.operational.title": "Competenze di Efficienza Operativa",
  "skills.business.title": "Competenze di Strategia e Finanza Aziendale",
  
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
  
  // About Me Section
  "about.me.title": "La Mia Storia",
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
