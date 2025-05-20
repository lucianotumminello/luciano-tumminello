
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { getAllBlogPosts } from "@/utils/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/blog/BlogList";
import BlogLoading from "@/components/blog/BlogLoading";

const Blog = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const isItalian = language === "it";
  const POSTS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<Array<{slug: string; [key: string]: any}>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<number>(Date.now());
  
  // Function to fetch and sort blog posts
  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const allPosts = await getAllBlogPosts();
      
      // Filter posts and ensure the ones from the screenshot are always included
      const featuredSlugs = [
        'human-tech-equation',
        'leadership-journey',
        'cultural-transformation-ai',
        'beyond-pattern-recognition'
      ];
      
      const screenshotPosts = [
        {
          slug: 'human-tech-equation',
          title: 'The Human + Tech Equation: Empowering Your Workforce in the Digital Transformation Era',
          titleIT: "L'Equazione Umano + Tecnologia: Potenziare la Forza Lavoro nell'Era della Trasformazione Digitale",
          excerpt: 'In today\'s digital transformation landscape, technology alone isn\'t enough to drive operational excellence. The most successful organizations master what I call the "Human + Tech Equation", where cutting-edge technology amplifies human potential, and human insight maximizes technological impact.',
          excerptIT: "Nel panorama attuale della trasformazione digitale, la tecnologia da sola non è sufficiente per guidare l'eccellenza operativa. Le organizzazioni di maggior successo padroneggiano quella che io chiamo \"L'Equazione Umano + Tecnologia\", dove la tecnologia all'avanguardia amplifica il potenziale umano e l'intuizione umana massimizza l'impatto tecnologico.",
          category: 'Digital Transformation',
          categoryIT: 'Trasformazione Digitale',
          date: '16 May 2025',
          dateIT: '16 Maggio 2025',
          imageUrl: '/lovable-uploads/1f7719b4-812c-4079-9d7b-b4698fad762e.png',
          desktopImageUrl: '/lovable-uploads/1f7719b4-812c-4079-9d7b-b4698fad762e.png',
          published: true
        },
        {
          slug: 'leadership-journey',
          title: 'From Marketing Director to COO: Transferable Leadership Principles That Drive Organizational Growth',
          titleIT: 'Da Direttore Marketing a COO: Principi di Leadership Trasferibili che Guidano la Crescita Organizzativa',
          excerpt: 'The Leadership Journey Across Functions: Career trajectories rarely follow a linear path. My transition from Marketing Director to Chief Operating Officer represents one of those pivotal professional evolutions that challenges conventional career planning.',
          excerptIT: 'Il Percorso di Leadership Attraverso le Funzioni: Le traiettorie di carriera raramente seguono un percorso lineare. La mia transizione da Direttore Marketing a Chief Operating Officer rappresenta una di quelle evoluzioni professionali fondamentali che sfidano la pianificazione convenzionale della carriera.',
          category: 'Leadership',
          categoryIT: 'Leadership',
          date: '2 May 2025',
          dateIT: '2 Maggio 2025',
          imageUrl: '/lovable-uploads/b19d5b32-08e3-4f6a-b1c9-01a1afea94ad.png',
          desktopImageUrl: '/lovable-uploads/b19d5b32-08e3-4f6a-b1c9-01a1afea94ad.png',
          published: true
        },
        {
          slug: 'cultural-transformation-ai',
          title: 'Beyond Technology: The Cultural Transformation Required for Successful AI Integration',
          titleIT: "Oltre la Tecnologia: La Trasformazione Culturale Necessaria per un'Integrazione di Successo dell'IA",
          excerpt: 'The Hidden Challenge of AI Implementation: As we approach mid-2025, one thing has become abundantly clear: the technology behind AI transformation is often the easiest part of the equation.',
          excerptIT: "La Sfida Nascosta dell'Implementazione dell'IA: Mentre ci avviciniamo alla metà del 2025, una cosa è diventata abbondantemente chiara: la tecnologia alla base della trasformazione dell'IA è spesso la parte più semplice dell'equazione.",
          category: 'AI & Digital Transformation',
          categoryIT: 'IA & Trasformazione Digitale',
          date: '17 April 2025',
          dateIT: '17 Aprile 2025',
          imageUrl: '/lovable-uploads/244fdcc7-f4a7-44df-a08b-35021c8fa18d.png',
          desktopImageUrl: '/lovable-uploads/244fdcc7-f4a7-44df-a08b-35021c8fa18d.png',
          published: true
        },
        {
          slug: 'beyond-pattern-recognition',
          title: 'Beyond Pattern Recognition: What the New Wave of AI Means for Business Leaders in Q2 2025',
          titleIT: "Oltre il Riconoscimento di Modelli: Cosa Significa la Nuova Ondata di IA per i Leader Aziendali nel Q2 2025",
          excerpt: "The AI Inflection Point Has Arrived. Looking back at Q1 2025, it's clear we've crossed a significant threshold in AI adoption.",
          excerptIT: "Il Punto di Inflessione dell'IA è Arrivato. Guardando indietro al primo trimestre del 2025, è chiaro che abbiamo superato una soglia significativa nell'adozione dell'IA.",
          category: 'Digital Transformation',
          categoryIT: 'Trasformazione Digitale',
          date: '13 April 2025',
          dateIT: '13 Aprile 2025',
          imageUrl: '/lovable-uploads/fba14352-d1d5-451c-8b99-136cd2afde0a.png',
          desktopImageUrl: '/lovable-uploads/fba14352-d1d5-451c-8b99-136cd2afde0a.png',
          published: true
        }
      ];
      
      // Ensure featured posts are always included and in the right order
      const mergedPosts = [...screenshotPosts];
      
      // Add any other posts from storage that aren't our featured ones
      Object.entries(allPosts).forEach(([slug, post]) => {
        if (!featuredSlugs.includes(slug) && post.published !== false) {
          mergedPosts.push({
            ...post,
            slug
          });
        }
      });
      
      setBlogPosts(mergedPosts);
      setLastRefresh(Date.now());
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      toast({
        title: "Error loading blog posts",
        description: "There was a problem loading the blog posts",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  // Fetch blog posts on component mount
  useEffect(() => {
    fetchPosts();
    
    // Set up event listeners for storage updates
    const handleFocus = () => {
      fetchPosts();
    };
    
    const handleStorageUpdate = () => {
      fetchPosts();
    };
    
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === "blog_posts_server_storage") {
        fetchPosts();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blog-storage-updated', handleStorageUpdate);
    window.addEventListener('blog-server-updated', handleStorageUpdate);
    window.addEventListener('storage', handleStorageEvent);
    
    // Check periodically for updates
    const checkInterval = setInterval(() => {
      fetchPosts();
    }, 30000);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blog-storage-updated', handleStorageUpdate);
      window.removeEventListener('blog-server-updated', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageEvent);
      clearInterval(checkInterval);
    };
  }, [fetchPosts]);
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    
    try {
      // If the date is already in the correct format like "16 May 2025", just return it
      if (dateStr.match(/^\d{1,2}\s+[A-Za-z]+\s+\d{4}$/)) {
        return dateStr;
      }
      
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return dateStr;
      }
      
      const day = date.getDate();
      const month = date.toLocaleString(isItalian ? 'it-IT' : 'en-US', { month: 'long' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } catch (error) {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{isItalian ? "Blog | Luciano Tumminello" : "Blog | Luciano Tumminello"}</title>
        <meta 
          name="description" 
          content={isItalian 
            ? "Approfondimenti strategici sulla trasformazione digitale, l'IA e le strategie di marketing basati sui dati di Luciano Tumminello." 
            : "Strategic insights on digital transformation, AI, and data-driven marketing strategies by Luciano Tumminello."} 
        />
        <meta 
          name="keywords" 
          content={isItalian 
            ? "blog marketing, IA nel marketing, trasformazione digitale, strategie basate sui dati, Luciano Tumminello" 
            : "marketing blog, AI in marketing, digital transformation, data-driven strategies, Luciano Tumminello"} 
        />
      </Helmet>
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-lg text-gray-600 mx-auto max-w-3xl text-center">
              {isItalian 
                ? "Approfondimenti strategici sulla trasformazione digitale, le operazioni globali e il marketing basato sui dati."
                : "Strategic insights on digital transformation, global operations, and data-driven marketing."
              }
            </p>
          </div>
          
          {isLoading ? (
            <BlogLoading />
          ) : (
            <BlogList 
              blogPosts={blogPosts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              postsPerPage={POSTS_PER_PAGE}
              formatDate={formatDate}
            />
          )}
        </div>
      </main>
      <div className="container mx-auto max-w-5xl flex justify-end mb-8">
        <Link 
          to="/blog-builder"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          LOGIN
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
