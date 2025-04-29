import blogPostsData from "@/data/blogPostsData";
import { BlogPost } from "@/types";

// Define a type for our blog posts store with an index signature
type BlogPostsStore = {
  [slug: string]: Omit<BlogPost, "slug">;
};

// In-memory data store that will be updated during the session
let updatedBlogPosts: BlogPostsStore = { 
  // Add the new blog post at the beginning
  "from-marketing-director-to-coo-transferable-leadership-principles-that-drive-organizational-growth": {
    title: "From Marketing Director to COO: Transferable Leadership Principles That Drive Organizational Growth",
    titleIT: "Da Direttore Marketing a COO: Principi di Leadership Trasferibili Che Guidano la Crescita Organizzativa",
    excerpt: "The Leadership Journey Across Functions: Career trajectories rarely follow a linear path. My transition from Marketing Director to Chief Operating Officer represents one of those pivotal professional evolutions that challenges conventional career planning.",
    excerptIT: "Il Percorso di Leadership Attraverso le Funzioni: Le traiettorie di carriera raramente seguono un percorso lineare. La mia transizione da Direttore Marketing a Chief Operating Officer rappresenta una di quelle evoluzioni professionali fondamentali che sfidano la pianificazione convenzionale della carriera.",
    content: `# The Leadership Journey Across Functions

Career trajectories rarely follow a linear path. My transition from Marketing Director to Chief Operating Officer represents one of those pivotal professional evolutions that challenges conventional career planning. With dual Master's degrees in Commerce and Advertising, and over 15 years of international experience across Asia Pacific, I've discovered that certain foundational leadership principles transcend functional boundaries and become even more powerful when applied in new contexts.

According to McKinsey's 2025 Leadership Development Report, executives who successfully navigate cross-functional leadership transitions bring a valuable integrative perspective that drives innovation at the intersection of traditionally siloed domains. My journey illustrates how marketing expertise can profoundly enhance operational leadership when core principles are thoughtfully translated to new challenges.

## The Challenge of Transition

"One of the biggest hurdles was shifting my focus from external-facing brand building and customer acquisition to the intricate internal mechanisms of efficiency and process optimization," I often share when asked about this transition. While both roles demand strategic thinking, operations leadership requires deeper immersion in granular data, supply chain logistics, and cross-departmental dependencies that demand heightened analytical rigor.

Building credibility with teams accustomed to different leadership approaches also required conscious effort and active listening. As noted in the Harvard Business Review's 2024 study on executive transitions, leaders moving between functions face a 40% higher risk of early derailment if they fail to adapt their leadership style while maintaining core principles.

# Five Transferable Leadership Principles

## Strategic Vision as a Unifying Force

Marketing excellence centers on crafting compelling narratives that resonate with target audiences. This ability to articulate vision translates powerfully to operational leadership, where rallying diverse teams around a cohesive purpose drives transformative change.

Dr. James Collins, Professor of Leadership Studies at Stanford Business School, emphasizes this connection: "The most effective operational leaders don't just optimize processes; they connect those optimizations to a larger strategic narrative that gives meaning to the incremental improvements." This perspective aligns with my experience applying marketing's strategic discipline to operational transformation initiatives.

The advanced strategic planning methodologies I developed through my Master's in Commerce education provided systematic frameworks for translating broad corporate objectives into actionable operational roadmaps, a skill equally valuable in both marketing and operations leadership.

## Data Intelligence as the Universal Language

"Customer-centricity, ingrained from focusing on the customer journey in marketing, became a guiding principle for operational improvements," I explain when discussing transferable skills. "The data-driven decision-making honed in marketing directly informed the identification of operational bottlenecks and the measurement of efficiency gains."

This data fluency represents a cornerstone of modern leadership across functions. According to IBM's 2025 Global Executive Survey, leaders with experience in data-intensive functions like marketing who transition to operations roles are 37% more likely to successfully implement data-driven transformation initiatives.

My international experience across multiple markets enhanced this capability significantly. Having analyzed consumer behavior patterns across diverse cultural contexts provided valuable frameworks for interpreting operational data through multiple lenses, recognizing that even internal processes reflect cultural and regional variations that must be accounted for in global operations.

## Cross-Functional Orchestration

Marketing campaigns require seamless collaboration across departments to succeed. This experience proves invaluable in operations leadership, where success depends on orchestrating complex interdependencies between teams.

"My experience in cross-functional collaboration, essential for successful marketing campaigns, proved invaluable for leading complex, cross-departmental operational initiatives," I share when discussing this principle. The ability to translate between functional languages; understanding how finance, technology, and customer-facing teams perceive the same challenge differently; enables more effective integration.

Gina Rodriguez, Chief Transformation Officer at Accenture, reinforces this view: "Leaders who can navigate the cultural and linguistic boundaries between departments are achieving transformational outcomes at twice the rate of those who operate primarily within a single functional mindset."

## Applied Campaign Thinking to Operational Excellence

One of the most powerful translations from marketing to operations comes through applying campaign optimization principles to workflow improvement. Rather than viewing operational processes as fixed systems, approaching them as dynamic campaigns that can be continuously refined creates breakthrough opportunities.

"Applying a campaign optimization lens from marketing to operations means treating workflows as campaigns aimed at specific operational outcomes," I explain. "Instead of simply completing projects, we analyze workflow performance data like cycle times or resource utilization to identify bottlenecks. We then implement targeted adjustments, similar to optimizing ad spend on a high-performing campaign, to improve efficiency without disrupting the entire system."

This iterative refinement approach allows for continuous improvement with minimal operational disruption. The Operational Excellence Institute found that leaders who apply marketing-inspired test-and-learn methodologies to operations achieve 43% faster cycle time improvements compared to traditional process optimization approaches.

## Customer-Centricity as an Internal and External Imperative

Marketing's relentless focus on customer experience provides a powerful lens for operational excellence. By viewing employees as internal customers and designing operations that serve their needs, leaders can unlock unprecedented performance gains.

Research from MIT's Sloan School of Management indicates that organizations applying customer experience principles to employee experience design see 28% higher productivity and 41% lower turnover rates. This perspective shift; from viewing operations as purely efficiency-driven to seeing them as enablers of exceptional internal and external customer experiences; represents perhaps the most valuable translation of marketing thinking to operational leadership.

My international experience across multiple Asian markets proved particularly valuable here, as different cultural contexts required thoughtful adaptation of both customer and employee experience principles. The ability to recognize and respect these nuances strengthened my capacity to design globally consistent yet locally relevant operational systems.

# The Power of Continuous Learning

Perhaps the most significant factor in my successful transition has been an unwavering commitment to continuous learning. The Deloitte 2025 Executive Success Study found that leaders who dedicate at least 10 hours weekly to formal and informal learning are 2.6 times more likely to succeed in cross-functional transitions.

This commitment to growth takes many forms in my leadership practice:

- Formal Education: Currently, I'm enrolled in the AI Manager Academy, specializing in implementing artificial intelligence solutions to increase efficiency and productivity across every organizational department. This investment in formal learning directly enhances my ability to lead AI-driven operational transformations.
- Cross-Functional Immersion: Regularly spending time with teams across departments, understanding their challenges firsthand rather than relying solely on reports and presentations.
- Knowledge Networks: Cultivating relationships with thought leaders across industries who provide fresh perspectives on emerging operational challenges.
- Applied Experimentation: Testing new approaches in controlled environments before broader implementation, creating a culture of evidence-based innovation.

"In today's rapidly evolving business landscape, the half-life of professional skills has shrunk to less than five years," notes Dr. Rebecca Chen, Director of Executive Education at London Business School. "Leaders who commit to continuous learning, especially across functional domains, maintain their relevance and effectiveness regardless of their specific title."

# Real-World Application: Transforming Operational Performance

Leveraging data-driven prioritization methods developed during my marketing leadership, I implemented a comprehensive workflow optimization initiative that delivered remarkable results. Rather than pursuing every potential improvement, we applied ROI analysis frameworks to identify the operational projects with highest potential impact on business metrics and customer satisfaction.

"The most significant breakthrough came when we stopped treating operations projects as technical initiatives and started approaching them as internal marketing campaigns; complete with stakeholder analysis, communication strategies, and adoption metrics," I explain. This human-centered approach to operational change increased implementation success rates by 47% compared to previous technical-focused initiatives.

According to Dr. Marcus Johnson, Executive Director at the Harvard Business Leadership Center, "This translation of marketing principles to operations represents the next frontier in operational excellence. Organizations that view operations through both a technical and human lens are achieving performance outcomes that were previously unattainable."

# Practical Guidance for Leaders in Transition

For marketing leaders considering similar transitions to operational roles, I recommend these proven approaches:

1. Map Your Transferable Skills: Systematically identify which marketing capabilities have direct operational applications. The ability to segment audiences, for example, translates directly to employee experience personalization.
2. Embrace Learning Mode: Demonstrate genuine curiosity about operational challenges while offering marketing-inspired perspectives. This balanced approach builds credibility with technical teams.
3. Find Integration Opportunities: Look for immediate ways to apply marketing principles to operational challenges, creating quick wins that demonstrate the value of your cross-functional perspective.
4. Build Translator Relationships: Cultivate strong partnerships with respected operational veterans who can help you adapt marketing concepts to operational realities.
5. Lead with Both Vision and Metrics: Combine inspiring strategic narratives with rigorous performance measurement, a balance particularly well-suited to leaders with marketing backgrounds.
6. Invest in Continuous Learning: Commit to formal and informal learning experiences that expand your capabilities, particularly in emerging technologies that bridge marketing and operations.

# The Future Belongs to Integrative Leaders

As organizations face increasingly complex challenges that span traditional functional boundaries, leaders who can integrate diverse perspectives become exponentially valuable. The Boston Consulting Group's 2025 Global Leadership Study found that executives with experience across multiple functions deliver 32% higher financial performance during periods of market disruption compared to single-domain experts.

My journey from Marketing Director to COO reflects this broader trend toward integrative leadership. The fundamental principles that drive marketing excellence: strategic vision, data intelligence, cross-functional collaboration, continuous optimization, and customer-centricity: provide a powerful foundation for operational leadership when thoughtfully translated to new contexts.

For organizations seeking to accelerate growth and navigate transformation, identifying and developing leaders with this cross-functional perspective represents a critical competitive advantage in an increasingly complex business landscape.`,
    contentIT: `# Il Percorso di Leadership Attraverso le Funzioni

Le traiettorie di carriera raramente seguono un percorso lineare. La mia transizione da Direttore Marketing a Chief Operating Officer rappresenta una di quelle evoluzioni professionali fondamentali che sfidano la pianificazione convenzionale della carriera. Con due Master in Commercio e Pubblicità, e oltre 15 anni di esperienza internazionale in tutta l'Asia Pacifico, ho scoperto che certi principi fondamentali di leadership trascendono i confini funzionali e diventano ancora più potenti quando applicati in nuovi contesti.

Secondo il Rapporto McKinsey 2025 sullo Sviluppo della Leadership, i dirigenti che navigano con successo le transizioni di leadership interfunzionali apportano una preziosa prospettiva integrativa che guida l'innovazione all'incrocio di domini tradizionalmente isolati. Il mio percorso illustra come l'expertise di marketing possa migliorare profondamente la leadership operativa quando i principi fondamentali vengono tradotti attentamente in nuove sfide.

## La Sfida della Transizione

"Uno degli ostacoli più grandi è stato spostare il mio focus dalla costruzione del brand rivolta all'esterno e dall'acquisizione clienti ai meccanismi intricati interni di efficienza e ottimizzazione dei processi," condivido spesso quando mi viene chiesto di questa transizione. Mentre entrambi i ruoli richiedono pensiero strategico, la leadership operativa richiede un'immersione più profonda in dati granulari, logistica della catena di approvvigionamento e dipendenze interdipartimentali che richiedono un elevato rigore analitico.

Costruire credibilità con team abituati a diversi approcci di leadership ha richiesto anche uno sforzo consapevole e ascolto attivo. Come notato nello studio 2024 di Harvard Business Review sulle transizioni executive, i leader che si spostano tra funzioni affrontano un rischio di deragliamento precoce del 40% più alto se non riescono ad adattare il loro stile di leadership mantenendo i principi fondamentali.

# Cinque Principi di Leadership Trasferibili

## Visione Strategica come Forza Unificante

L'eccellenza nel marketing si concentra sulla creazione di narrative coinvolgenti che risuonano con il pubblico target. Questa capacità di articolare una visione si traduce potentemente nella leadership operativa, dove riunire diversi team attorno a uno scopo coesivo guida il cambiamento trasformativo.

Il Dr. James Collins, Professore di Studi sulla Leadership alla Stanford Business School, enfatizza questa connessione: "I leader operativi più efficaci non si limitano a ottimizzare i processi; connettono tali ottimizzazioni a una narrativa strategica più ampia che dà significato ai miglioramenti incrementali". Questa prospettiva si allinea con la mia esperienza nell'applicare la disciplina strategica del marketing alle iniziative di trasformazione operativa.

Le metodologie avanzate di pianificazione strategica che ho sviluppato attraverso il mio Master in Commercio hanno fornito framework sistematici per tradurre ampi obiettivi aziendali in roadmap operative attuabili, una competenza ugualmente preziosa sia nella leadership di marketing che in quella operativa.

## L'Intelligenza dei Dati come Linguaggio Universale

"La centralità del cliente, radicata nel focus sul customer journey nel marketing, è diventata un principio guida per i miglioramenti operativi," spiego quando discuto delle competenze trasferibili. "Il processo decisionale basato sui dati affinato nel marketing ha informato direttamente l'identificazione dei colli di bottiglia operativi e la misurazione dei guadagni di efficienza."

Questa fluidità nei dati rappresenta una pietra angolare della leadership moderna attraverso le funzioni. Secondo il Sondaggio Globale degli Executive IBM 2025, i leader con esperienza in funzioni ad alta intensità di dati come il marketing che transitano a ruoli operativi hanno il 37% di probabilità in più di implementare con successo iniziative di trasformazione basate sui dati.

La mia esperienza internazionale attraverso molteplici mercati ha migliorato significativamente questa capacità. Avendo analizzato modelli di comportamento dei consumatori attraverso diversi contesti culturali, ha fornito preziosi framework per interpretare dati operativi attraverso molteplici lenti, riconoscendo che anche i processi interni riflettono variazioni culturali e regionali che devono essere considerate nelle operazioni globali.

## Orchestrazione Interfunzionale

Le campagne di marketing richiedono una collaborazione senza soluzione di continuità tra i dipartimenti per avere successo. Questa esperienza si rivela inestimabile nella leadership operativa, dove il successo dipende dall'orchestrazione di complesse interdipendenze tra i team.

"La mia esperienza nella collaborazione interfunzionale, essenziale per campagne di marketing di successo, si è rivelata inestimabile per guidare complesse iniziative operative interdipartimentali," condivido quando discuto questo principio. La capacità di tradurre tra i linguaggi funzionali; comprendere come finanza, tecnologia e team rivolti ai clienti percepiscono la stessa sfida in modo diverso; permette un'integrazione più efficace.

Gina Rodriguez, Chief Transformation Officer di Accenture, rafforza questa visione: "I leader che possono navigare i confini culturali e linguistici tra i dipartimenti stanno ottenendo risultati trasformativi a un ritmo doppio rispetto a quelli che operano principalmente all'interno di una singola mentalità funzionale."

## Pensiero di Campagna Applicato all'Eccellenza Operativa

Una delle traduzioni più potenti dal marketing alle operazioni avviene attraverso l'applicazione dei principi di ottimizzazione della campagna al miglioramento del workflow. Piuttosto che vedere i processi operativi come sistemi fissi, approcciarli come campagne dinamiche che possono essere continuamente raffinate crea opportunità di svolta.

"Applicare una lente di ottimizzazione della campagna dal marketing alle operazioni significa trattare i flussi di lavoro come campagne mirate a specifici risultati operativi," spiego. "Invece di semplicemente completare progetti, analizziamo i dati di performance del workflow come tempi di ciclo o utilizzo delle risorse per identificare bottlenechi. Implementiamo quindi aggiustamenti mirati, simili all'ottimizzazione della spesa pubblicitaria su una campagna ad alte prestazioni, per migliorare l'efficienza senza interrompere l'intero sistema."

Questo approccio di raffinamento iterativo consente un miglioramento continuo con minima interruzione operativa. L'Istituto di Eccellenza Operativa ha scoperto che i leader che applicano metodologie di test-and-learn ispirate al marketing alle operazioni ottengono miglioramenti del tempo di ciclo più veloci del 43% rispetto agli approcci tradizionali di ottimizzazione dei processi.

## Centralità del Cliente come Imperativo Interno ed Esterno

L'incessante focus del marketing sull'esperienza del cliente fornisce una potente lente per l'eccellenza operativa. Vedendo i dipendenti come clienti interni e progettando operazioni che servono le loro esigenze, i leader possono sbloccare guadagni di performance senza precedenti.

La ricerca del MIT Sloan School of Management indica che le organizzazioni che applicano i principi dell'esperienza cliente alla progettazione dell'esperienza dei dipendenti vedono una produttività più alta del 28% e tassi di turnover inferiori del 41%. Questo cambiamento di prospettiva; dal vedere le operazioni come puramente guidate dall'efficienza al vederle come abilitatrici di esperienze clienti interne ed esterne eccezionali; rappresenta forse la più preziosa traduzione del pensiero di marketing alla leadership operativa.

La mia esperienza internazionale attraverso molteplici mercati asiatici si è rivelata particolarmente preziosa qui, poiché diversi contesti culturali richiedevano un attento adattamento sia dei principi dell'esperienza cliente che di quella dei dipendenti. La capacità di riconoscere e rispettare queste sfumature ha rafforzato la mia capacità di progettare sistemi operativi globalmente coerenti ma localmente rilevanti.

# Il Potere dell'Apprendimento Continuo

Forse il fattore più significativo nel mio successo di transizione è stato un impegno incrollabile verso l'apprendimento continuo. Lo Studio Deloitte 2025 sul Successo Esecutivo ha scoperto che i leader che dedicano almeno 10 ore settimanali all'apprendimento formale e informale hanno 2,6 volte più probabilità di avere successo nelle transizioni interfunzionali.

Questo impegno verso la crescita assume molte forme nella mia pratica di leadership:

- Educazione Formale: Attualmente, sono iscritto all'AI Manager Academy, specializzandomi nell'implementazione di soluzioni di intelligenza artificiale per aumentare l'efficienza e la produttività in ogni dipartimento organizzativo. Questo investimento nell'apprendimento formale migliora direttamente la mia capacità di guidare trasformazioni operative basate sull'IA.
- Immersione Interfunzionale: Trascorrere regolarmente tempo con team di diversi dipartimenti, comprendendo le loro sfide in prima persona piuttosto che fare affidamento esclusivamente su report e presentazioni.
- Reti di Conoscenza: Coltivare relazioni con leader di pensiero in varie industrie che forniscono prospettive fresche sulle sfide operative emergenti.
- Sperimentazione Applicata: Testare nuovi approcci in ambienti controllati prima dell'implementazione più ampia, creando una cultura di innovazione basata sulle evidenze.

"Nel panorama aziendale in rapida evoluzione di oggi, la vita media delle competenze professionali si è ridotta a meno di cinque anni," osserva la Dr.ssa Rebecca Chen, Direttrice dell'Educazione Esecutiva alla London Business School. "I leader che si impegnano nell'apprendimento continuo, specialmente attraverso domini funzionali, mantengono la loro rilevanza ed efficacia indipendentemente dal loro titolo specifico."

# Applicazione nel Mondo Reale: Trasformare le Performance Operative

Sfruttando i metodi di prioritizzazione basati sui dati sviluppati durante la mia leadership nel marketing, ho implementato un'iniziativa completa di ottimizzazione del workflow che ha portato risultati notevoli. Piuttosto che perseguire ogni potenziale miglioramento, abbiamo applicato framework di analisi ROI per identificare i progetti operativi con il più alto impatto potenziale sulle metriche aziendali e sulla soddisfazione del cliente.

"La svolta più significativa è avvenuta quando abbiamo smesso di trattare i progetti operativi come iniziative tecniche e abbiamo iniziato ad approcciarli come campagne di marketing interne; complete di analisi degli stakeholder, strategie di comunicazione e metriche di adozione," spiego. Questo approccio al cambiamento operativo centrato sull'umano ha aumentato i tassi di successo dell'implementazione del 47% rispetto alle precedenti iniziative focalizzate sulla tecnica.

Secondo il Dr. Marcus Johnson, Direttore Esecutivo dell'Harvard Business Leadership Center, "Questa traduzione dei principi di marketing alle operazioni rappresenta la prossima frontiera nell'eccellenza operativa. Le organizzazioni che vedono le operazioni sia attraverso una lente tecnica che umana stanno ottenendo risultati di performance che erano precedentemente irraggiungibili."

# Guida Pratica per Leader in Transizione

Per i leader di marketing che considerano transizioni simili a ruoli operativi, raccomando questi approcci provati:

1. Mappa le Tue Competenze Trasferibili: Identifica sistematicamente quali capacità di marketing hanno applicazioni operative dirette. La capacità di segmentare il pubblico, ad esempio, si traduce direttamente nella personalizzazione dell'esperienza dei dipendenti.
2. Abbraccia la Modalità di Apprendimento: Dimostra genuina curiosità verso le sfide operative offrendo al contempo prospettive ispirate al marketing. Questo approccio bilanciato costruisce credibilità con i team tecnici.
3. Trova Opportunità di Integrazione: Cerca modi immediati per applicare principi di marketing alle sfide operative, creando rapidi successi che dimostrano il valore della tua prospettiva interfunzionale.
4. Costruisci Relazioni di Traduttore: Coltiva forti partnership con rispettati veterani operativi che possono aiutarti ad adattare concetti di marketing alle realtà operative.
5. Guida con Visione e Metriche: Combina narrative strategiche ispiratorie con rigorose misurazioni delle performance, un equilibrio particolarmente adatto ai leader con background di marketing.
6. Investi nell'Apprendimento Continuo: Impegnati in esperienze di apprendimento formali e informali che espandono le tue capacità, in particolare nelle tecnologie emergenti che collegano marketing e operazioni.

# Il Futuro Appartiene ai Leader Integrativi

Mentre le organizzazioni affrontano sfide sempre più complesse che attraversano i confini funzionali tradizionali, i leader che possono integrare diverse prospettive diventano esponenzialmente preziosi. Lo Studio Globale sulla Leadership 2025 del Boston Consulting Group ha scoperto che gli executive con esperienza attraverso multiple funzioni offrono performance finanziarie più alte del 32% durante periodi di disruption del mercato rispetto agli esperti di singolo dominio.

Il mio percorso da Direttore Marketing a COO riflette questa più ampia tendenza verso la leadership integrativa. I principi fondamentali che guidano l'eccellenza nel marketing: visione strategica, intelligenza dei dati, collaborazione interfunzionale, ottimizzazione continua e centralità del cliente: forniscono una potente fondazione per la leadership operativa quando tradotti attentamente in nuovi contesti.

For organizations seeking to accelerate growth and navigate transformation, identifying and developing leaders with this cross-functional perspective represents a critical competitive advantage in an increasingly complex business landscape.
`,
    author: "Luciano Tumminello",
    authorImageUrl: "/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png",
    date: "27 April 2025",
    dateIT: "27 Aprile 2025",
    category: "Leadership",
    categoryIT: "Leadership",
    imageUrl: "/lovable-uploads/dfa43c55-e5d0-4a88-8ee6-f7306b088886.png",
    desktopImageUrl: "/lovable-uploads/dc495930-339d-456d-a46f-65270a0646b5.png",
    readingTime: "14 min read",
    readingTimeIT: "14 min di lettura",
    tags: ["Leadership", "Marketing", "Operations", "Career Development", "Cross-Functional"],
    tagsIT: ["Leadership", "Marketing", "Operazioni", "Sviluppo Professionale", "Interfunzionale"]
  },
  ...blogPostsData
};

/**
 * Updates a blog post in the in-memory data store
 * @param slug The slug of the blog post to update
 * @param blogPostData The updated blog post data
 */
export const updateBlogPost = (slug: string, blogPostData: BlogPost): void => {
  const { slug: _, ...blogPostWithoutSlug } = blogPostData;
  
  const newBlogPosts: BlogPostsStore = {
    [slug]: blogPostWithoutSlug
  };
  
  Object.entries(updatedBlogPosts).forEach(([key, value]) => {
    if (key !== slug) {
      newBlogPosts[key] = value;
    }
  });
  
  updatedBlogPosts = newBlogPosts;
  
  console.log(`Blog post ${slug} updated successfully`);
};

/**
 * Creates a new blog post in the in-memory data store
 * @param slug The slug of the new blog post
 * @param blogPostData The blog post data
 */
export const createBlogPost = (slug: string, blogPostData: BlogPost): void => {
  const { slug: _, ...blogPostWithoutSlug } = blogPostData;
  
  const newBlogPosts: BlogPostsStore = {
    [slug]: blogPostWithoutSlug
  };
  
  Object.entries(updatedBlogPosts).forEach(([key, value]) => {
    newBlogPosts[key] = value;
  });
  
  updatedBlogPosts = newBlogPosts;
  
  console.log(`New blog post ${slug} created successfully`);
  console.log("Current blog posts:", Object.keys(updatedBlogPosts));
};

/**
 * Gets all blog posts from the in-memory data store
 * @returns All blog posts
 */
export const getAllBlogPosts = (): BlogPostsStore => {
  return updatedBlogPosts;
};

/**
 * Gets a specific blog post from the in-memory data store
 * @param slug The slug of the blog post
 * @returns The blog post or undefined if not found
 */
export const getBlogPost = (slug: string): (Omit<BlogPost, "slug"> | undefined) => {
  return updatedBlogPosts[slug];
};

/**
 * Deletes a blog post from the in-memory data store
 * @param slug The slug of the blog post to delete
 */
export const deleteBlogPost = (slug: string): void => {
  const newBlogPosts: BlogPostsStore = {};
  
  Object.entries(updatedBlogPosts).forEach(([key, value]) => {
    if (key !== slug) {
      newBlogPosts[key] = value;
    }
  });
  
  updatedBlogPosts = newBlogPosts;
  
  console.log(`Blog post ${slug} deleted successfully`);
};

// Export the updated blog posts as default
export default updatedBlogPosts;
