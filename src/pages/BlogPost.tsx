
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarIcon, Clock, Share2, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock blog post data - in a real app, this would come from an API or CMS
const blogPostsData = {
  "ai-leadership-revolution": {
    title: "The AI Leadership Revolution: How Marketing Executives Are Navigating the 2025 AI Landscape",
    titleIT: "La Rivoluzione della Leadership nell'IA: Come i Dirigenti Marketing Stanno Navigando il Panorama dell'IA nel 2025",
    excerpt: "The AI race is transforming marketing strategies faster than ever before. Here's how forward-thinking leaders are leveraging these advancements to create competitive advantages in 2025.",
    excerptIT: "La corsa all'IA sta trasformando le strategie di marketing più rapidamente che mai. Ecco come i leader lungimiranti stanno sfruttando questi progressi per creare vantaggi competitivi nel 2025.",
    content: `
      <h2>Introduction: A New AI Paradigm in Marketing</h2>
      <p>The artificial intelligence landscape has undergone seismic shifts in the first quarter of 2025. Marketing executives aren't just witnessing these changes—they're actively recalibrating their strategies to harness AI's unprecedented potential. The competition between AI players continues to intensify, creating both challenges and opportunities for marketing leaders who understand how to leverage these innovations.</p>
      <p>But what separates the marketing visionaries from those merely keeping pace? Let's explore how the latest AI advancements are reshaping marketing leadership and what this means for your organization's competitive edge.</p>
      
      <h2>The Current State of AI Competition: More Than Just Tech Giants</h2>
      
      <h3>DeepSeek's Breakthrough Changes the Game</h3>
      <p>China's DeepSeek AI has made remarkable strides with their DeepSeek-V2 model, establishing themselves as a formidable challenger to OpenAI's market dominance. This isn't merely a technological milestone; it represents a fundamental shift in the global AI landscape.</p>
      <p>With China's massive investments in artificial intelligence infrastructure—reaching an estimated $50 billion in AI R&D for 2025 alone—the competition has evolved beyond simply developing superior models. The race now centers on which companies can most effectively integrate these advanced AI systems into practical business applications that deliver measurable results.</p>
      <p>Kai Chen, CEO of MarTech innovator NeuroSync, notes: "What we're seeing isn't just algorithmic improvements—it's about who can translate raw AI capability into solutions that solve real marketing problems. That's where the true competitive advantage lies in 2025."</p>
      
      <h3>OpenAI's Strategic Response</h3>
      <p>Meanwhile, OpenAI hasn't remained static. With GPT-5's anticipated release in Q3 2025, the company continues to push boundaries in multimodal AI advancements that seamlessly integrate text, voice, image, and video processing.</p>
      <p>Their recent partnership with Adobe to enhance creative workflows demonstrates how they're positioning themselves not just as an AI provider but as an essential component of the marketing technology stack.</p>
      
      <h2>Three Critical Ways AI Is Transforming Marketing Leadership in 2025</h2>
      
      <h3>1. AI-Powered Hyper-Personalization at Scale</h3>
      <p>Modern consumers don't just appreciate personalization—they expect it. The significant shift in 2025 is the ability to deliver truly individualized experiences at unprecedented scale and depth.</p>
      <p>What's changed in 2025:</p>
      <ul>
        <li>Neural networks now process customer data across hundreds of touchpoints in milliseconds</li>
        <li>Predictive intent models anticipate needs before customers explicitly express them</li>
        <li>Contextual awareness systems adapt messaging based on real-time emotional signals</li>
      </ul>
      <p>Leading brands are using AI-powered recommendation engines and conversational AI to facilitate genuine one-to-one customer interactions at scale previously impossible with traditional segmentation approaches.</p>
      <p>Morgan Research found that brands implementing advanced AI personalization in 2025 are seeing 37% higher customer lifetime values compared to those using basic personalization techniques.</p>
      <blockquote>
        "The personalization bar has been permanently raised. What was considered 'cutting-edge' in 2023 is now the baseline expectation. Marketing leaders who haven't moved beyond basic segmentation are already behind." — Elena Martinez, CMO at Quantum Retail
      </blockquote>
      
      <p><strong>Key Takeaway:</strong> Personalization has transitioned from competitive advantage to table stakes. Marketing leaders must implement advanced AI personalization strategies that blend data intelligence with empathetic understanding.</p>
      
      <h3>2. AI-Generated Content and the New Creative Partnership</h3>
      <p>Content creation has undergone a revolutionary transformation. AI systems now competently produce blogs, social media posts, email campaigns, and even video scripts within seconds. However, the most successful marketing leaders have discovered that the true competitive edge comes from a carefully orchestrated collaboration between AI efficiency and human creativity.</p>
      <p>What's changed in 2025:</p>
      <ul>
        <li>AI content generation has evolved from simple templates to nuanced brand voice adaptation</li>
        <li>Creative AI assistants now participate in brainstorming sessions, offering unexpected perspectives</li>
        <li>Multimodal AI enables seamless transitions between text, image, and video creation</li>
      </ul>
      <p>A recent study by the Global Marketing Institute revealed that marketing teams using collaborative AI-human workflows produce content that performs 43% better on engagement metrics than either purely AI-generated or solely human-created content.</p>
      <blockquote>
        "The most innovative marketing leaders aren't asking whether AI should create their content. They're asking how AI can elevate their team's creative capabilities while maintaining the authentic human connection that drives brand loyalty." — Jamal Washington, Creative Director at FutureScope Media
      </blockquote>
      
      <p><strong>Key Takeaway:</strong> While AI excels at content production efficiency, human creativity remains essential for emotional resonance and strategic insight. The winning formula combines AI-powered production with human-directed creativity and oversight.</p>
      
      <h3>3. AI-Driven Decision-Making and Predictive Analytics</h3>
      <p>Perhaps the most transformative impact of AI on marketing leadership lies in decision-making processes. Advanced AI systems don't merely automate existing workflows—they fundamentally enhance how leaders understand trends, allocate resources, and anticipate market shifts.</p>
      <p>What's changed in 2025:</p>
      <ul>
        <li>Multimodal forecasting models that integrate structured and unstructured data</li>
        <li>Scenario planning algorithms that simulate campaign outcomes with 89% accuracy</li>
        <li>Real-time optimization systems that autonomously adjust campaign parameters</li>
      </ul>
      <p>Forward-thinking marketing leaders are leveraging AI-powered analytics to optimize marketing budgets with unprecedented precision, improve targeting through pattern recognition impossible for humans to detect, and forecast customer behavior weeks or months before traditional signals would appear.</p>
      <blockquote>
        "The real competitive advantage isn't just having data—everyone has data. It's how quickly you can transform that data into actionable intelligence and execute against it. AI has compressed that timeline from weeks to minutes." — Carlos Dominguez, VP of Marketing Analytics at TechFusion
      </blockquote>
      
      <p><strong>Key Takeaway:</strong> Marketing leaders who master AI-driven insights while maintaining strategic vision will outperform competitors. The balance between algorithmic intelligence and human judgment is critical for making bold, informed decisions.</p>
      
      <h2>What This Means for Marketing Leadership in 2025</h2>
      <p>The intensifying AI competition between technology giants like OpenAI and DeepSeek represents more than a technological arms race—it's accelerating the transformation of marketing leadership itself. As these AI capabilities become more powerful and accessible, the difference between market leaders and laggards increasingly depends on implementation strategy rather than access to technology.</p>
      <p>Marketing leaders who will thrive in this new environment share three critical characteristics:</p>
      <ol>
        <li><strong>They integrate AI with human-centered strategies</strong> - Understanding that technology serves human connections rather than replacing them</li>
        <li><strong>They develop AI fluency across their organizations</strong> - Ensuring teams can effectively collaborate with AI systems</li>
        <li><strong>They maintain ethical oversight</strong> - Implementing governance frameworks that prevent algorithmic bias and protect consumer privacy</li>
      </ol>
      <p>Recent data from the Leadership Analytics Consortium shows that companies with AI-fluent marketing leadership have experienced 28% higher revenue growth in Q1 2025 compared to industry averages.</p>
      
      <h2>Conclusion: The Path Forward</h2>
      <p>The challenge for marketing leadership in 2025 isn't simply adopting AI—it's adopting it strategically and ethically. As the competition between AI providers intensifies, the most successful marketing leaders will be those who can:</p>
      <ul>
        <li>Harness AI for deeper customer understanding while respecting privacy</li>
        <li>Balance algorithmic efficiency with human creativity and judgment</li>
        <li>Build organizational cultures where humans and AI systems collaborate effectively</li>
        <li>Maintain a clear vision of how technology serves broader brand purpose</li>
      </ul>
      <p>The AI revolution in marketing isn't slowing down—it's accelerating. The question isn't whether to embrace these changes, but how quickly and thoughtfully you can integrate them into your leadership approach.</p>
      
      <p>What AI-driven marketing challenges is your organization facing? Share your experiences in the comments below or connect with me to discuss how these trends are affecting your industry specifically.</p>
      
      <h2>About the Author</h2> 
      <p>Luciano Tumminello has over 15 years of experience driving growth across Asia-Pacific, specializing in marketing, operations, and digital transformation, with a growing focus on leveraging artificial intelligence. With a proven track record of leading strategic initiatives and delivering measurable results, Luciano helps organizations navigate the complex intersection of technology and marketing leadership.</p>
      
      <p class="hashtags">#MarketingLeadership #AIStrategy #MarketingAI #FutureOfMarketing</p>
    `,
    contentIT: `
      <h2>Introduzione: Un Nuovo Paradigma dell'IA nel Marketing</h2>
      <p>Il panorama dell'intelligenza artificiale ha subito cambiamenti epocali nel primo trimestre del 2025. I dirigenti del marketing non si limitano a osservare questi cambiamenti: stanno attivamente ricalibrando le loro strategie per sfruttare il potenziale senza precedenti dell'IA. La competizione tra i player dell'IA continua a intensificarsi, creando sfide e opportunità per i leader del marketing che sanno come sfruttare queste innovazioni.</p>
      <p>Ma cosa distingue i visionari del marketing da quelli che si limitano a tenere il passo? Esploriamo come i più recenti progressi dell'IA stanno rimodellando la leadership di marketing e cosa questo significa per il vantaggio competitivo della vostra organizzazione.</p>
      
      <h2>Lo Stato Attuale della Competizione nell'IA: Oltre i Giganti della Tecnologia</h2>
      
      <h3>La Svolta di DeepSeek Cambia le Regole del Gioco</h3>
      <p>L'IA cinese DeepSeek ha fatto progressi straordinari con il loro modello DeepSeek-V2, affermandosi come un formidabile sfidante alla dominanza di mercato di OpenAI. Questo non è semplicemente una pietra miliare tecnologica; rappresenta un cambiamento fondamentale nel panorama globale dell'IA.</p>
      <p>Con gli investimenti massicci della Cina nell'infrastruttura di intelligenza artificiale—che raggiungono una stima di 50 miliardi di dollari solo per la R&S nell'IA nel 2025—la competizione si è evoluta oltre lo sviluppo di modelli superiori. La corsa ora si concentra su quali aziende possono integrare più efficacemente questi sistemi avanzati di IA in applicazioni aziendali pratiche che forniscono risultati misurabili.</p>
      <p>Kai Chen, CEO dell'innovatore MarTech NeuroSync, osserva: "Quello che stiamo vedendo non sono solo miglioramenti algoritmici—si tratta di chi può tradurre la capacità grezza dell'IA in soluzioni che risolvono problemi reali di marketing. È qui che risiede il vero vantaggio competitivo nel 2025."</p>
      
      <h3>La Risposta Strategica di OpenAI</h3>
      <p>Nel frattempo, OpenAI non è rimasta statica. Con l'attesa uscita di GPT-5 nel terzo trimestre del 2025, l'azienda continua a spingere i confini negli avanzamenti multimodali dell'IA che integrano perfettamente elaborazione di testo, voce, immagini e video.</p>
      <p>La loro recente partnership con Adobe per migliorare i flussi di lavoro creativi dimostra come si stanno posizionando non solo come fornitore di IA ma come componente essenziale dello stack tecnologico di marketing.</p>
      
      <h2>Tre Modi Critici in cui l'IA Sta Trasformando la Leadership di Marketing nel 2025</h2>
      
      <h3>1. Iperpersonalizzazione Alimentata dall'IA su Larga Scala</h3>
      <p>I consumatori moderni non apprezzano semplicemente la personalizzazione—la pretendono. Il cambiamento significativo nel 2025 è la capacità di offrire esperienze veramente individualizzate a una scala e profondità senza precedenti.</p>
      <p>Cosa è cambiato nel 2025:</p>
      <ul>
        <li>Le reti neurali ora elaborano i dati dei clienti attraverso centinaia di punti di contatto in millisecondi</li>
        <li>I modelli predittivi di intenzione anticipano le esigenze prima che i clienti le esprimano esplicitamente</li>
        <li>I sistemi di consapevolezza contestuale adattano i messaggi in base ai segnali emotivi in tempo reale</li>
      </ul>
      <p>I marchi leader stanno utilizzando motori di raccomandazione alimentati dall'IA e IA conversazionale per facilitare autentiche interazioni uno a uno con i clienti su una scala precedentemente impossibile con approcci di segmentazione tradizionali.</p>
      <p>Morgan Research ha scoperto che i marchi che implementano la personalizzazione avanzata dell'IA nel 2025 stanno registrando valori del ciclo di vita del cliente superiori del 37% rispetto a quelli che utilizzano tecniche di personalizzazione di base.</p>
      <blockquote>
        "L'asticella della personalizzazione è stata alzata in modo permanente. Ciò che era considerato 'all'avanguardia' nel 2023 è ora l'aspettativa di base. I leader del marketing che non sono andati oltre la segmentazione di base sono già in ritardo." — Elena Martinez, CMO di Quantum Retail
      </blockquote>
      
      <p><strong>Conclusione Chiave:</strong> La personalizzazione è passata da vantaggio competitivo a requisito base. I leader del marketing devono implementare strategie di personalizzazione avanzate basate sull'IA che combinano intelligenza dei dati con comprensione empatica.</p>
      
      <h3>2. Contenuti Generati dall'IA e la Nuova Partnership Creativa</h3>
      <p>La creazione di contenuti ha subito una trasformazione rivoluzionaria. I sistemi di IA ora producono con competenza blog, post sui social media, campagne e-mail e persino script video in pochi secondi. Tuttavia, i leader del marketing di maggior successo hanno scoperto che il vero vantaggio competitivo deriva da una collaborazione attentamente orchestrata tra l'efficienza dell'IA e la creatività umana.</p>
      <p>Cosa è cambiato nel 2025:</p>
      <ul>
        <li>La generazione di contenuti IA si è evoluta da semplici modelli all'adattamento sfumato della voce del brand</li>
        <li>Gli assistenti creativi IA ora partecipano a sessioni di brainstorming, offrendo prospettive inaspettate</li>
        <li>L'IA multimodale consente transizioni senza soluzione di continuità tra creazione di testo, immagini e video</li>
      </ul>
      <p>Un recente studio del Global Marketing Institute ha rivelato che i team di marketing che utilizzano flussi di lavoro collaborativi IA-umani producono contenuti che performano il 43% meglio sulle metriche di coinvolgimento rispetto ai contenuti puramente generati dall'IA o creati esclusivamente dall'uomo.</p>
      <blockquote>
        "I leader di marketing più innovativi non si chiedono se l'IA debba creare i loro contenuti. Si chiedono come l'IA possa elevare le capacità creative del loro team mantenendo la connessione umana autentica che guida la fedeltà al brand." — Jamal Washington, Direttore Creativo di FutureScope Media
      </blockquote>
      
      <p><strong>Conclusione Chiave:</strong> Mentre l'IA eccelle nell'efficienza della produzione di contenuti, la creatività umana rimane essenziale per la risonanza emotiva e l'intuizione strategica. La formula vincente combina la produzione alimentata dall'IA con la creatività e la supervisione dirette dall'uomo.</p>
      
      <h3>3. Processo Decisionale Guidato dall'IA e Analisi Predittiva</h3>
      <p>Forse l'impatto più trasformativo dell'IA sulla leadership di marketing risiede nei processi decisionali. I sistemi avanzati di IA non si limitano ad automatizzare i flussi di lavoro esistenti—migliorano fondamentalmente il modo in cui i leader comprendono le tendenze, allocano le risorse e anticipano i cambiamenti del mercato.</p>
      <p>Cosa è cambiato nel 2025:</p>
      <ul>
        <li>Modelli di previsione multimodali che integrano dati strutturati e non strutturati</li>
        <li>Algoritmi di pianificazione di scenari che simulano i risultati delle campagne con un'accuratezza dell'89%</li>
        <li>Sistemi di ottimizzazione in tempo reale che regolano autonomamente i parametri della campagna</li>
      </ul>
      <p>I leader di marketing lungimiranti stanno sfruttando l'analisi basata sull'IA per ottimizzare i budget di marketing con precisione senza precedenti, migliorare il targeting attraverso il riconoscimento di pattern impossibile per gli umani da rilevare, e prevedere il comportamento dei clienti settimane o mesi prima che i segnali tradizionali appaiano.</p>
      <blockquote>
        "Il vero vantaggio competitivo non è solo avere dati—tutti hanno dati. È quanto velocemente puoi trasformare quei dati in intelligence azionabile ed eseguirla. L'IA ha compresso quella tempistica da settimane a minuti." — Carlos Dominguez, VP di Marketing Analytics di TechFusion
      </blockquote>
      
      <p><strong>Conclusione Chiave:</strong> I leader di marketing che padroneggiano gli insight guidati dall'IA mantenendo la visione strategica supereranno i concorrenti. L'equilibrio tra intelligenza algoritmica e giudizio umano è fondamentale per prendere decisioni audaci e informate.</p>
      
      <h2>Cosa Significa Questo per la Leadership di Marketing nel 2025</h2>
      <p>L'intensificarsi della competizione IA tra giganti tecnologici come OpenAI e DeepSeek rappresenta più di una corsa agli armamenti tecnologica—sta accelerando la trasformazione della leadership di marketing stessa. Man mano che queste capacità di IA diventano più potenti e accessibili, la differenza tra leader e ritardatari di mercato dipende sempre più dalla strategia di implementazione piuttosto che dall'accesso alla tecnologia.</p>
      <p>I leader di marketing che prospereranno in questo nuovo ambiente condividono tre caratteristiche critiche:</p>
      <ol>
        <li><strong>Integrano l'IA con strategie centrate sull'uomo</strong> - Comprendendo che la tecnologia serve le connessioni umane piuttosto che sostituirle</li>
        <li><strong>Sviluppano la fluenza IA in tutta la loro organizzazione</strong> - Assicurando che i team possano collaborare efficacemente con i sistemi di IA</li>
        <li><strong>Mantengono la supervisione etica</strong> - Implementando framework di governance che prevengono pregiudizi algoritmici e proteggono la privacy dei consumatori</li>
      </ol>
      <p>Dati recenti del Leadership Analytics Consortium mostrano che le aziende con leadership di marketing fluente nell'IA hanno registrato una crescita dei ricavi superiore del 28% nel primo trimestre del 2025 rispetto alle medie del settore.</p>
      
      <h2>Conclusione: Il Percorso Futuro</h2>
      <p>La sfida per la leadership di marketing nel 2025 non è semplicemente adottare l'IA—è adottarla strategicamente ed eticamente. Mentre si intensifica la competizione tra i fornitori di IA, i leader di marketing di maggior successo saranno quelli che possono:</p>
      <ul>
        <li>Sfruttare l'IA per una comprensione più profonda del cliente rispettando la privacy</li>
        <li>Bilanciare l'efficienza algoritmica con la creatività e il giudizio umano</li>
        <li>Costruire culture organizzative dove umani e sistemi IA collaborano efficacemente</li>
        <li>Mantenere una chiara visione di come la tecnologia serve lo scopo più ampio del brand</li>
      </ul>
      <p>La rivoluzione dell'IA nel marketing non sta rallentando—sta accelerando. La domanda non è se abbracciare questi cambiamenti, ma quanto rapidamente e attentamente puoi integrarli nel tuo approccio alla leadership.</p>
      
      <p>Quali sfide di marketing guidate dall'IA sta affrontando la tua organizzazione? Condividi le tue esperienze nei commenti qui sotto o contattami per discutere come queste tendenze stanno influenzando specificamente il tuo settore.</p>
      
      <h2>Sull'Autore</h2> 
      <p>Luciano Tumminello ha oltre 15 anni di esperienza nella guida della crescita in Asia-Pacifico, specializzato in marketing, operazioni e trasformazione digitale, con un focus crescente sull'utilizzo dell'intelligenza artificiale. Con un comprovato track record nella guida di iniziative strategiche e nel conseguimento di risultati misurabili, Luciano aiuta le organizzazioni a navigare nella complessa intersezione tra tecnologia e leadership di marketing.</p>
      
      <p class="hashtags">#LeadershipMarketing #StrategiaIA #MarketingIA #FuturoDelMarketing</p>
    `,
    author: "Luciano Tumminello",
    date: "April 7, 2025",
    dateIT: "7 Aprile 2025",
    category: "AI & Marketing",
    categoryIT: "IA & Marketing",
    imageUrl: "/lovable-uploads/fd8fe34b-755d-463d-b6ca-42abd81723f5.png",
    readingTime: "8 min read",
    readingTimeIT: "8 min di lettura",
    tags: ["Artificial Intelligence", "Marketing Strategy", "Digital Transformation", "Leadership"],
    tagsIT: ["Intelligenza Artificiale", "Strategia di Marketing", "Trasformazione Digitale", "Leadership"]
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? blogPostsData[slug] : null;
  const { language } = useLanguage();
  const isItalian = language === "it";
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isItalian ? "Post del Blog Non Trovato" : "Blog Post Not Found"}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {isItalian 
                ? "Il post del blog che stai cercando non esiste o è stato rimosso." 
                : "The blog post you're looking for doesn't exist or has been removed."}
            </p>
            <Link to="/blog">
              <Button>
                {isItalian ? "Torna al Blog" : "Return to Blog"}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Extract schema markup for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": isItalian ? post.titleIT : post.title,
    "image": post.imageUrl,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Luciano Tumminello",
      "logo": {
        "@type": "ImageObject",
        "url": "https://luciano-tumminello.com/logo.png"
      }
    },
    "datePublished": post.date,
    "description": isItalian ? post.excerptIT : post.excerpt
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{isItalian ? post.titleIT : post.title} | Luciano Tumminello</title>
        <meta name="description" content={isItalian ? post.excerptIT : post.excerpt} />
        <meta name="keywords" content={(isItalian ? post.tagsIT : post.tags).join(", ")} />
        <meta property="og:title" content={isItalian ? post.titleIT : post.title} />
        <meta property="og:description" content={isItalian ? post.excerptIT : post.excerpt} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isItalian ? post.titleIT : post.title} />
        <meta name="twitter:description" content={isItalian ? post.excerptIT : post.excerpt} />
        <meta name="twitter:image" content={post.imageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-1 pt-8 pb-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {isItalian ? "Torna al Blog" : "Back to Blog"}
            </Link>
            
            <Card className="mb-8 overflow-hidden border-0 shadow-lg">
              <div className="h-72 md:h-80 w-full overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={isItalian ? post.titleIT : post.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <CardContent className="p-8 bg-white">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    {isItalian ? post.categoryIT : post.category}
                  </span>
                  <div className="flex items-center">
                    <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                    {isItalian ? post.dateIT : post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {isItalian ? post.readingTimeIT : post.readingTime}
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {isItalian ? post.titleIT : post.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                  {isItalian ? post.excerptIT : post.excerpt}
                </p>
                
                <div className="flex items-center mt-6">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <span className="font-medium">{post.author}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <article className="bg-white rounded-xl shadow-md p-6 md:p-10 mb-12">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-p:text-gray-600 prose-a:text-primary prose-a:font-medium prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-4 prose-blockquote:rounded-md prose-blockquote:text-gray-700 prose-blockquote:italic prose-li:text-gray-600 prose-img:rounded-lg">
              <div dangerouslySetInnerHTML={{ __html: isItalian ? post.contentIT : post.content }}></div>
            </div>
          </article>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{isItalian ? "Argomenti" : "Topics"}</h3>
              <div className="flex flex-wrap gap-2">
                {(isItalian ? post.tagsIT : post.tags).map((tag, index) => (
                  <span key={index} className="bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-2 rounded-full text-sm text-gray-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{isItalian ? "Scritto da" : "Written by"}</p>
                  <p className="font-medium">{post.author}</p>
                </div>
              </div>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                {isItalian ? "Condividi" : "Share"}
              </Button>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/blog">
              <Button variant="secondary" className="px-6">
                {isItalian ? "Leggi Altri Articoli" : "Read More Articles"}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
