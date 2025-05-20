
import { BlogPost } from '@/types';
import { BlogPostsStore } from './types';
import { updatedBlogPosts, saveBlogPostsToStorage } from './blogPostsStore';

/**
 * Creates a new blog post
 * @param newPost The new blog post to create
 * @param slug The slug to use for the blog post
 * @returns A promise that resolves to a boolean indicating success
 */
export const createBlogPost = async (newPost: BlogPost, slug: string): Promise<boolean> => {
  try {
    // Make sure the published flag is set to true by default if not specified
    const postWithPublishedFlag = {
      ...newPost,
      published: newPost.published !== false
    };
    
    // Add the new post to the updated blog posts
    updatedBlogPosts[slug] = { ...postWithPublishedFlag };
    
    // Save the updated blog posts to storage
    await saveBlogPostsToStorage({ ...updatedBlogPosts });
    
    return true;
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
};

/**
 * Updates an existing blog post
 * @param slug The slug of the blog post to update
 * @param updatedPost The updated blog post
 * @returns A promise that resolves to a boolean indicating success
 */
export const updateBlogPost = async (slug: string, updatedPost: BlogPost): Promise<boolean> => {
  try {
    // Check if the blog post exists
    if (!updatedBlogPosts[slug]) {
      console.error(`Blog post with slug ${slug} not found.`);
      return false;
    }
    
    // Ensure the published flag is preserved unless explicitly set
    const postWithPublishedFlag = {
      ...updatedPost,
      published: updatedPost.published !== undefined 
        ? updatedPost.published 
        : (updatedBlogPosts[slug].published !== false)
    };
    
    // Update the blog post
    updatedBlogPosts[slug] = { ...postWithPublishedFlag };
    
    // Save the updated blog posts to storage
    await saveBlogPostsToStorage({ ...updatedBlogPosts });
    
    return true;
  } catch (error) {
    console.error(`Error updating blog post ${slug}:`, error);
    return false;
  }
};

/**
 * Deletes a blog post
 * @param slug The slug of the blog post to delete
 * @returns A promise that resolves to a boolean indicating success
 */
export const deleteBlogPost = async (slug: string): Promise<boolean> => {
  try {
    // Check if the blog post exists
    if (!updatedBlogPosts[slug]) {
      console.error(`Blog post with slug ${slug} not found.`);
      return false;
    }
    
    // Delete the blog post
    delete updatedBlogPosts[slug];
    
    // Save the updated blog posts to storage
    await saveBlogPostsToStorage({ ...updatedBlogPosts });
    
    return true;
  } catch (error) {
    console.error(`Error deleting blog post ${slug}:`, error);
    return false;
  }
};

/**
 * Creates a duplicate of an existing blog post
 * @param originalSlug The slug of the blog post to duplicate
 * @returns A promise that resolves to the duplicated post if successful, or null if failed
 */
export const duplicateBlogPost = async (originalSlug: string): Promise<BlogPost | null> => {
  try {
    // Check if the original blog post exists
    if (!updatedBlogPosts[originalSlug]) {
      console.error(`Blog post with slug ${originalSlug} not found.`);
      return null;
    }
    
    // Create a new slug with timestamp to ensure uniqueness
    const newSlug = `${originalSlug}-copy-${Date.now()}`;
    
    // Create a copy of the original blog post
    const originalPost = updatedBlogPosts[originalSlug];
    const newPost: BlogPost = { 
      ...originalPost, 
      slug: newSlug,
      published: originalPost.published !== false // Ensure published flag is preserved
    };
    
    // Add the new post to the updated blog posts
    updatedBlogPosts[newSlug] = newPost;
    
    // Save the updated blog posts to storage
    await saveBlogPostsToStorage({ ...updatedBlogPosts });
    
    return newPost;
  } catch (error) {
    console.error(`Error duplicating blog post ${originalSlug}:`, error);
    return null;
  }
};

/**
 * Makes a blog post permanent with a clean URL
 * @param temporarySlug The original/temporary slug
 * @param permanentSlug The new permanent slug
 * @param published Optional flag to explicitly set published status (defaults to true)
 * @returns A promise that resolves to a boolean indicating success
 */
export const makeBlogPostPermanent = async (
  temporarySlug: string, 
  permanentSlug: string,
  published: boolean = true
): Promise<boolean> => {
  try {
    // Check if the original blog post exists
    if (!updatedBlogPosts[temporarySlug]) {
      console.error(`Blog post with slug ${temporarySlug} not found.`);
      return false;
    }
    
    // Check if the permanent slug already exists to avoid overwriting
    if (updatedBlogPosts[permanentSlug]) {
      console.log(`Permanent post ${permanentSlug} already exists, no action needed.`);
      
      // Ensure published flag is set to true for the permanent post
      if (updatedBlogPosts[permanentSlug].published !== published) {
        console.log(`Updating published status of ${permanentSlug} to ${published}`);
        updatedBlogPosts[permanentSlug] = {
          ...updatedBlogPosts[permanentSlug],
          published: published
        };
        
        // Save the updated blog posts to storage
        await saveBlogPostsToStorage({ ...updatedBlogPosts });
      }
      
      return true;
    }
    
    // Create a copy of the original blog post
    const originalPost = updatedBlogPosts[temporarySlug];
    const permanentPost = { 
      ...originalPost,
      published: published // Explicitly set the published flag
    };
    
    // Add the permanent post to the updated blog posts
    updatedBlogPosts[permanentSlug] = permanentPost;
    
    // Save the updated blog posts to storage
    await saveBlogPostsToStorage({ ...updatedBlogPosts });
    
    console.log(`Blog post made permanent: ${temporarySlug} -> ${permanentSlug}`);
    console.log(`Published status set to: ${published}`);
    
    return true;
  } catch (error) {
    console.error(`Error making blog post permanent: ${temporarySlug} -> ${permanentSlug}`, error);
    return false;
  }
};

// Add the new agile backbone blog post
export const publishAgileBlogPost = async (): Promise<boolean> => {
  try {
    const slug = "agile-backbone";
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('en-US', { month: 'long' });
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    const italianDate = `${day} ${currentDate.toLocaleString('it-IT', { month: 'long' })} ${year}`;
    
    const blogPost: BlogPost = {
      title: "The Agile Backbone: Building Resilient and Adaptive Operational Models for a Volatile World",
      titleIT: "La Spina Dorsale Agile: Costruire Modelli Operativi Resilienti e Adattivi per un Mondo Volatile",
      excerpt: "Discover how to build resilient and adaptive operational models that can withstand volatility and uncertainty in today's rapidly changing business environment.",
      excerptIT: "Scopri come costruire modelli operativi resilienti e adattivi in grado di resistere alla volatilità e all'incertezza nell'ambiente aziendale in rapida evoluzione di oggi.",
      content: `<h2>Introduction</h2>
<p>In today's rapidly evolving business landscape, organizations face unprecedented levels of volatility, uncertainty, complexity, and ambiguity. Traditional operational models built on stability and predictability are increasingly inadequate. This article explores how building an "Agile Backbone" can help organizations develop the resilience and adaptability needed to thrive in this new reality.</p>

<h2>The Need for Resilient Operations</h2>
<p>The global disruptions of recent years have demonstrated that operational resilience is no longer optional—it's essential. Organizations with rigid operational structures have struggled to adapt to rapid changes in supply chains, customer behaviors, and workforce dynamics. An Agile Backbone provides the structural support organizations need while maintaining the flexibility to bend without breaking under pressure.</p>

<h2>Core Components of an Agile Backbone</h2>

<h3>1. Modular Organizational Design</h3>
<p>Rather than traditional hierarchical structures, agile organizations implement modular designs where teams can be reconfigured based on changing priorities. This enables rapid reallocation of resources and skills where they're most needed. Modular designs allow for parts of the organization to evolve independently while maintaining overall structural integrity.</p>

<h3>2. Distributed Decision-Making</h3>
<p>Pushing decision authority to the edges of the organization—where information is richest and response time is fastest—accelerates adaptation. This requires clear decision frameworks, transparent information sharing, and a culture that empowers teams while maintaining alignment with strategic objectives.</p>

<h3>3. Dynamic Resource Allocation</h3>
<p>Agile organizations treat resources—whether human, financial, or technological—as a portfolio of investments that can be continuously rebalanced. They implement lightweight governance mechanisms that allow for rapid reallocation based on shifting priorities and emerging opportunities.</p>

<h3>4. Sensing Capabilities</h3>
<p>Organizations need systematic ways to detect weak signals of change before they become disruptive forces. This includes both technological sensing (data analytics, AI) and human sensing networks (customer-facing employees, external partnerships) to provide early warnings of emerging trends.</p>

<h2>Building Your Agile Backbone</h2>

<h3>Start with Strategic Clarity</h3>
<p>Before redesigning operational models, ensure absolute clarity on strategic priorities. An agile backbone must support the organization's core purpose while enabling adaptation in how that purpose is fulfilled. Define the few critical elements that must remain stable, then introduce flexibility around them.</p>

<h3>Map Your End-to-End Value Streams</h3>
<p>Understand how value flows through your organization to customers. Identify bottlenecks, dependencies, and fragilities in these flows. Redesign operations around value delivery rather than functional silos, creating cross-functional teams organized around customer outcomes.</p>

<h3>Implement Rapid Learning Cycles</h3>
<p>Build feedback loops into operational processes, with regular retrospectives and adaptation points. Treat operational designs as hypotheses to be tested and refined rather than fixed solutions. Celebrate learning as much as execution excellence.</p>

<h3>Invest in Technological Enablers</h3>
<p>Cloud-based platforms, API ecosystems, and flexible technology architecture provide the technical foundation for operational agility. Implement technologies that connect rather than isolate different parts of the organization.</p>

<h2>Common Pitfalls to Avoid</h2>

<h3>Confusing Agility with Chaos</h3>
<p>Agility requires discipline and structure—just different from traditional models. Without clear boundaries and alignment mechanisms, efforts to increase adaptability can lead to organizational chaos.</p>

<h3>Underinvesting in Capability Building</h3>
<p>New operational models require new skills and mindsets. Organizations often focus on structural changes while underinvesting in developing the capabilities needed to work effectively in more adaptive ways.</p>

<h3>Maintaining Legacy Metrics</h3>
<p>If you change operational models but continue measuring success using legacy metrics optimized for stability and efficiency, you'll create conflicting incentives that undermine transformation efforts.</p>

<h2>Conclusion</h2>
<p>Building an Agile Backbone isn't a one-time transformation but an ongoing evolution. The organizations that thrive in volatile environments will be those that can continuously reconfigure their operational models to address emerging challenges and opportunities while maintaining core strategic focus. By designing operations with both stability and adaptability in mind, leaders can create organizations capable of not just surviving but thriving amidst continuous change.</p>
`,
      contentIT: `<h2>Introduzione</h2>
<p>Nel panorama aziendale in rapida evoluzione di oggi, le organizzazioni affrontano livelli senza precedenti di volatilità, incertezza, complessità e ambiguità. I modelli operativi tradizionali basati sulla stabilità e prevedibilità sono sempre più inadeguati. Questo articolo esplora come costruire una "Spina Dorsale Agile" può aiutare le organizzazioni a sviluppare la resilienza e l'adattabilità necessarie per prosperare in questa nuova realtà.</p>

<h2>La Necessità di Operazioni Resilienti</h2>
<p>Le interruzioni globali degli ultimi anni hanno dimostrato che la resilienza operativa non è più opzionale, ma essenziale. Le organizzazioni con strutture operative rigide hanno faticato ad adattarsi ai rapidi cambiamenti nelle catene di approvvigionamento, nei comportamenti dei clienti e nelle dinamiche della forza lavoro. Una Spina Dorsale Agile fornisce il supporto strutturale di cui le organizzazioni hanno bisogno, mantenendo la flessibilità per piegarsi senza rompersi sotto pressione.</p>

<h2>Componenti Fondamentali di una Spina Dorsale Agile</h2>

<h3>1. Design Organizzativo Modulare</h3>
<p>Piuttosto che strutture gerarchiche tradizionali, le organizzazioni agili implementano design modulari dove i team possono essere riconfigurati in base alle priorità in evoluzione. Ciò consente una rapida riallocazione di risorse e competenze dove sono più necessarie. I design modulari permettono a parti dell'organizzazione di evolversi indipendentemente mantenendo l'integrità strutturale complessiva.</p>

<h3>2. Processo Decisionale Distribuito</h3>
<p>Spingere l'autorità decisionale ai margini dell'organizzazione—dove le informazioni sono più ricche e il tempo di risposta è più veloce—accelera l'adattamento. Ciò richiede chiari quadri decisionali, condivisione trasparente delle informazioni e una cultura che responsabilizzi i team mantenendo l'allineamento con gli obiettivi strategici.</p>

<h3>3. Allocazione Dinamica delle Risorse</h3>
<p>Le organizzazioni agili trattano le risorse—siano esse umane, finanziarie o tecnologiche—come un portafoglio di investimenti che può essere continuamente riequilibrato. Implementano meccanismi di governance leggeri che consentono una rapida riallocazione in base alle priorità mutevoli e alle opportunità emergenti.</p>

<h3>4. Capacità di Rilevamento</h3>
<p>Le organizzazioni necessitano di modi sistematici per rilevare i segnali deboli di cambiamento prima che diventino forze dirompenti. Ciò include sia il rilevamento tecnologico (analisi dei dati, IA) che le reti di rilevamento umano (dipendenti a contatto con i clienti, partnership esterne) per fornire avvisi precoci di tendenze emergenti.</p>

<h2>Costruire la Tua Spina Dorsale Agile</h2>

<h3>Inizia con la Chiarezza Strategica</h3>
<p>Prima di riprogettare i modelli operativi, assicura una chiarezza assoluta sulle priorità strategiche. Una spina dorsale agile deve supportare lo scopo centrale dell'organizzazione consentendo l'adattamento nel modo in cui tale scopo viene realizzato. Definisci i pochi elementi critici che devono rimanere stabili, quindi introduci flessibilità intorno a essi.</p>

<h3>Mappa i Tuoi Flussi di Valore End-to-End</h3>
<p>Comprendi come il valore fluisce attraverso la tua organizzazione verso i clienti. Identifica colli di bottiglia, dipendenze e fragilità in questi flussi. Riprogetta le operazioni attorno alla consegna di valore piuttosto che a silos funzionali, creando team interfunzionali organizzati intorno ai risultati per i clienti.</p>

<h3>Implementa Cicli di Apprendimento Rapidi</h3>
<p>Incorpora cicli di feedback nei processi operativi, con retrospettive regolari e punti di adattamento. Tratta i design operativi come ipotesi da testare e perfezionare piuttosto che come soluzioni fisse. Celebra l'apprendimento tanto quanto l'eccellenza nell'esecuzione.</p>

<h3>Investi in Abilitatori Tecnologici</h3>
<p>Piattaforme basate su cloud, ecosistemi API e architetture tecnologiche flessibili forniscono le basi tecniche per l'agilità operativa. Implementa tecnologie che connettono piuttosto che isolare diverse parti dell'organizzazione.</p>

<h2>Errori Comuni da Evitare</h2>

<h3>Confondere Agilità con Caos</h3>
<p>L'agilità richiede disciplina e struttura—solo diverse dai modelli tradizionali. Senza confini chiari e meccanismi di allineamento, gli sforzi per aumentare l'adattabilità possono portare al caos organizzativo.</p>

<h3>Sottoinvestire nello Sviluppo delle Capacità</h3>
<p>I nuovi modelli operativi richiedono nuove competenze e mentalità. Le organizzazioni spesso si concentrano sui cambiamenti strutturali sottoinvestendo nello sviluppo delle capacità necessarie per lavorare efficacemente in modi più adattivi.</p>

<h3>Mantenere Metriche Legacy</h3>
<p>Se cambi i modelli operativi ma continui a misurare il successo utilizzando metriche legacy ottimizzate per stabilità ed efficienza, creerai incentivi contrastanti che minano gli sforzi di trasformazione.</p>

<h2>Conclusione</h2>
<p>Costruire una Spina Dorsale Agile non è una trasformazione una tantum ma un'evoluzione continua. Le organizzazioni che prosperano in ambienti volatili saranno quelle che possono riconfigurare continuamente i loro modelli operativi per affrontare sfide e opportunità emergenti mantenendo il focus strategico centrale. Progettando operazioni con in mente sia stabilità che adattabilità, i leader possono creare organizzazioni capaci non solo di sopravvivere ma di prosperare in mezzo al cambiamento continuo.</p>
`,
      author: "Luciano Tumminello",
      authorImageUrl: "/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png",
      date: formattedDate,
      dateIT: italianDate,
      category: "Business Strategy",
      categoryIT: "Strategia Aziendale",
      imageUrl: "/lovable-uploads/0795e919-47ea-421e-ba21-847e333ea389.png",
      desktopImageUrl: "/lovable-uploads/b5786aee-9384-481d-80f7-d4f9f00e9f84.png", 
      readingTime: "8 min read",
      readingTimeIT: "8 min di lettura",
      tags: ["agile", "operations", "resilience", "strategy", "organizational design"],
      tagsIT: ["agile", "operazioni", "resilienza", "strategia", "design organizzativo"],
      published: true
    };
    
    // Check if the blog post already exists
    if (updatedBlogPosts[slug]) {
      console.log("Blog post already exists, updating it");
      return await updateBlogPost(slug, blogPost);
    } else {
      console.log("Creating new blog post");
      return await createBlogPost(blogPost, slug);
    }
  } catch (error) {
    console.error("Error publishing agile backbone blog post:", error);
    return false;
  }
};
