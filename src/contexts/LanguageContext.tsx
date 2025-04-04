
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
    "home.expertise": "My Expertise",
    "home.viewResume": "View Resume",
    
    // About Page
    "about.title": "About Me",
    "about.role": "Chief Operating Officer",
    "about.location": "Remote, Spartan Health",
    "about.education": "Dual Master's in Commerce & Advertising",
    "about.experience": "15+ Years Experience",
    "about.journey": "Professional Journey",
    "about.competencies": "Core Competencies",
    "about.viewResume": "My Resume",
    "about.story": "My story begins in Palermo, Sicily. Growing up on this southern Italian island in the 1980s sparked my interest in the world beyond. Learning English from age three equipped me with one of the main tools that would eventually allow me to travel the world and leave Italy and Europe.",
    "about.academic": "My academic journey began with Bachelor Degrees in International Communications and International Relations at the University for Foreigners of Perugia. In 2007, seeking wider horizons, I embarked for Australia. Melbourne, with its vibrant energy, became my home as I earned dual Master's degrees in Commerce and Advertising from RMIT University, setting the stage for my journey in the dynamic world of marketing.",
    "about.asia": "The allure of Southeast Asia beckoned in 2013, immersing me in the region's diverse markets where I navigated the complexities of marketing and advertising across Singapore, Malaysia, Indonesia, and Thailand. These years in senior regional positions, both agency and client-side, served as a masterclass in driving strategic growth and achieving tangible results across varied cultural landscapes. My professional journey was further enriched by co-founding and building a full-scope digital agency from the ground up. This venture encompassed web and app development, creative services, and performance marketing, serving dozens of clients with offices in Bangkok and Phuket and a team of approximately 30 professionals. This entrepreneurial chapter provided invaluable insight into the intricacies of business development and leadership, solidifying my ability to transform vision into measurable success.",
    "about.today": "Today, I reside in Bangkok, channeling my experience remotely as the Chief Operating Officer for Spartan Health, an Italian company dedicated to health and wellness. My focus here is on strategic direction, streamlining operations, and fostering a culture of efficiency through redesigned workflows. I am particularly passionate about leading our digital transformation, integrating cutting-edge software and AI to enhance productivity and leverage data for insightful decision-making.",
    "about.personal": "Besides my professional duties, I cultivate discipline and well-being through bodybuilding and fitness, a non-negotiable part of my daily life. I find inspiration and rejuvenation in exploring the diverse landscapes of Asia and Europe, with a particular fondness for the serenity of tropical islands. And, of course, a quiet moment spent delving into the intricacies of geopolitics or savoring a perfectly brewed espresso, a nod to my Italian heritage, brings me a sense of balance. It's in this interplay of professional rigor and personal passion that I find my equilibrium.",
    
    // Job Descriptions
    "job.spartan": "Currently driving strategic direction, streamlining operations, and leading digital transformation efforts across all departments.",
    "job.slow": "Led marketing teams across Europe and Asia, drove a 20% increase in brand awareness and improved team productivity by 40%. Managed budgets to maximize ROI while promoting sustainability through regenerative agriculture practices.",
    "job.444": "Built the business from the ground up, achieving a 95% client and employee retention rate, growing client accounts by 40%, and reducing operational costs by 30% while scaling the team to 20 employees across two locations.",
    "job.greenpeace": "Improved campaign performance by up to 30%, trained cross-functional teams, and streamlined digital operations, creating lasting impact across four countries.",
    "job.accor": "Managed marketing for five luxury hotels in Thailand, increasing online revenue by 20%.",
    "job.lion": "Led multi-country teams, improved campaign ROI by 18% and raised client retention rates to over 90%. My leadership efforts drove account growth by 30% annually.",
    "job.cadreon": "Spearheaded programmatic advertising across ASEAN markets, contributing to 30% revenue growth for high-profile clients like Microsoft, KFC, and Cathay Pacific.",
    "job.sensis": "Optimized over 140 SEM campaigns in Australia, significantly improving performance and client retention.",
    
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
    "home.expertise": "Le Mie Competenze",
    "home.viewResume": "Vedi Curriculum",
    
    // About Page
    "about.title": "Chi Sono",
    "about.role": "Direttore Operativo",
    "about.location": "Remoto, Spartan Health",
    "about.education": "Doppia Laurea Magistrale in Commercio e Pubblicità",
    "about.experience": "Oltre 15 Anni di Esperienza",
    "about.journey": "Percorso Professionale",
    "about.competencies": "Competenze Principali",
    "about.viewResume": "Il Mio Curriculum",
    "about.story": "La mia storia inizia a Palermo, in Sicilia. Crescere in questa isola del sud Italia negli anni '80 ha acceso il mio interesse per il mondo esterno. Imparare l'inglese dall'età di tre anni mi ha dotato di uno degli strumenti principali che mi avrebbe permesso di viaggiare per il mondo e lasciare l'Italia e l'Europa.",
    "about.academic": "Il mio percorso accademico è iniziato con lauree in Comunicazione Internazionale e Relazioni Internazionali presso l'Università per Stranieri di Perugia. Nel 2007, alla ricerca di orizzonti più ampi, sono partito per l'Australia. Melbourne, con la sua energia vibrante, è diventata la mia casa mentre conseguivo una doppia laurea magistrale in Commercio e Pubblicità presso la RMIT University, preparando il terreno per il mio viaggio nel dinamico mondo del marketing.",
    "about.asia": "Il richiamo del Sud-est asiatico mi ha attratto nel 2013, immergendomi nei diversi mercati della regione dove ho navigato le complessità del marketing e della pubblicità tra Singapore, Malesia, Indonesia e Thailandia. Questi anni in posizioni regionali senior, sia dal lato dell'agenzia che del cliente, sono stati un corso magistrale nella guida della crescita strategica e nel raggiungimento di risultati tangibili attraverso paesaggi culturali variegati. Il mio percorso professionale è stato ulteriormente arricchito dalla co-fondazione e costruzione di un'agenzia digitale a servizio completo da zero. Questa impresa comprendeva sviluppo web e app, servizi creativi e marketing delle prestazioni, servendo decine di clienti con uffici a Bangkok e Phuket e un team di circa 30 professionisti. Questo capitolo imprenditoriale ha fornito una preziosa visione delle complessità dello sviluppo del business e della leadership, consolidando la mia capacità di trasformare la visione in successo misurabile.",
    "about.today": "Oggi risiedo a Bangkok, incanalando la mia esperienza da remoto come Chief Operating Officer per Spartan Health, un'azienda italiana dedicata alla salute e al benessere. Il mio focus qui è sulla direzione strategica, la semplificazione delle operazioni e la promozione di una cultura di efficienza attraverso flussi di lavoro riprogettati. Sono particolarmente appassionato nel guidare la nostra trasformazione digitale, integrando software all'avanguardia e AI per migliorare la produttività e sfruttare i dati per un processo decisionale perspicace.",
    "about.personal": "Oltre ai miei doveri professionali, coltivo disciplina e benessere attraverso il bodybuilding e il fitness, una parte non negoziabile della mia vita quotidiana. Trovo ispirazione e ringiovanimento nell'esplorare i diversi paesaggi dell'Asia e dell'Europa, con una particolare predilezione per la serenità delle isole tropicali. E, naturalmente, un momento tranquillo trascorso a scavare nelle complessità della geopolitica o a gustare un espresso perfettamente preparato, un cenno alla mia eredità italiana, mi porta un senso di equilibrio. È in questa interazione di rigore professionale e passione personale che trovo il mio equilibrio.",
    
    // Job Descriptions
    "job.spartan": "Attualmente guido la direzione strategica, semplifico le operazioni e conduco sforzi di trasformazione digitale in tutti i dipartimenti.",
    "job.slow": "Ho guidato team di marketing in Europa e Asia, ho aumentato la brand awareness del 20% e migliorato la produttività del team del 40%. Ho gestito budget per massimizzare il ROI mentre promuovevo la sostenibilità attraverso pratiche di agricoltura rigenerativa.",
    "job.444": "Ho costruito l'azienda da zero, raggiungendo un tasso di fidelizzazione dei clienti e dei dipendenti del 95%, facendo crescere gli account dei clienti del 40% e riducendo i costi operativi del 30% mentre scalavo il team a 20 dipendenti in due sedi.",
    "job.greenpeace": "Ho migliorato le prestazioni delle campagne fino al 30%, formato team interfunzionali e ottimizzato le operazioni digitali, creando un impatto duraturo in quattro paesi.",
    "job.accor": "Ho gestito il marketing per cinque hotel di lusso in Thailandia, aumentando le entrate online del 20%.",
    "job.lion": "Ho guidato team multinazionali, migliorato il ROI delle campagne del 18% e aumentato i tassi di fidelizzazione dei clienti oltre il 90%. I miei sforzi di leadership hanno portato a una crescita annuale degli account del 30%.",
    "job.cadreon": "Ho guidato la pubblicità programmatica nei mercati ASEAN, contribuendo a una crescita dei ricavi del 30% per clienti di alto profilo come Microsoft, KFC e Cathay Pacific.",
    "job.sensis": "Ho ottimizzato oltre 140 campagne SEM in Australia, migliorando significativamente le prestazioni e la fidelizzazione dei clienti.",
    
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
