
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { getAllBlogPosts } from "@/utils/blog";
import { BlogPost } from "@/types";

export const useBlogListData = (postsPerPage: number) => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<Array<{slug: string} & BlogPost>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<number>(Date.now());
  
  // Function to fetch and sort blog posts
  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("Fetching blog posts from server");
      
      const allPosts = await getAllBlogPosts();
      
      // Log all posts to debug which ones are available
      console.log("All posts in storage:", Object.keys(allPosts).join(", "));
      
      const posts = Object.entries(allPosts)
        .map(([slug, post]) => ({
          ...post,
          slug
        }))
        .filter(post => {
          // Only include posts that don't explicitly have published set to false
          const isPublished = post.published !== false;
          console.log(`Post ${post.slug}: published = ${isPublished}`);
          return isPublished;
        })
        .sort((a, b) => {
          // Parse dates correctly regardless of format
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          
          // If dates can't be parsed properly, use string comparison as fallback
          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return b.date.localeCompare(a.date);
          }
          
          return dateB.getTime() - dateA.getTime(); // Most recent first
        });
      
      console.log("Fetched posts before filtering:", Object.entries(allPosts).length);
      console.log("Posts after filtering for published:", posts.length);
      console.log("Visible post slugs:", posts.map(post => post.slug).join(", "));
      
      setBlogPosts(posts);
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
  
  // Fetch and sort blog posts whenever the component mounts or language changes
  useEffect(() => {
    // Force refresh immediately when the component mounts
    fetchPosts();
    
    // Add an event listener to re-fetch posts when the window gets focus
    const handleFocus = () => {
      console.log("Window focus detected, refreshing blog posts");
      fetchPosts();
    };
    
    // Add an event listener for our custom storage event
    const handleStorageUpdate = () => {
      console.log("Blog storage updated, refreshing posts");
      fetchPosts();
    };
    
    // Add listener for cross-tab/window updates
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === "blog_posts_server_storage") {
        console.log("LocalStorage updated in another tab/window, refreshing posts");
        fetchPosts();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blog-storage-updated', handleStorageUpdate);
    window.addEventListener('blog-server-updated', handleStorageUpdate);
    window.addEventListener('storage', handleStorageEvent);
    
    // Also set up an interval to periodically check for updates
    const checkInterval = setInterval(() => {
      console.log("Periodic check for blog updates");
      fetchPosts();
    }, 30000); // Check every 30 seconds for better cross-device sync
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blog-storage-updated', handleStorageUpdate);
      window.removeEventListener('blog-server-updated', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageEvent);
      clearInterval(checkInterval);
    };
  }, [fetchPosts]);
  
  const totalPosts = blogPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Placeholder posts for empty state or to fill grid - now fully implementing BlogPost interface
  const placeholderPosts: Array<{slug: string} & BlogPost> = [
    {
      slug: "human-tech-equation-placeholder",
      title: "The Human + Tech Equation: Empowering Your Workforce in the Digital Transformation Era",
      titleIT: "L'Equazione Umano + Tecnologia: Potenziare la Forza Lavoro nell'Era della Trasformazione Digitale",
      excerpt: "In today's digital transformation landscape, technology alone isn't enough to drive operational excellence. The most successful organizations master what I call the \"Human + Tech Equation\", where cutting-edge technology amplifies human potential, and human insight maximizes technological impact.",
      excerptIT: "Nel panorama attuale della trasformazione digitale, la tecnologia da sola non è sufficiente per guidare l'eccellenza operativa. Le organizzazioni di maggior successo padroneggiano quella che chiamo \"L'Equazione Umano + Tecnologia\", dove la tecnologia all'avanguardia amplifica il potenziale umano, e l'intuizione umana massimizza l'impatto tecnologico.",
      content: "Full content for The Human + Tech Equation blog post",
      contentIT: "Contenuto completo per il post del blog L'Equazione Umano + Tecnologia",
      author: "Luciano Tumminello",
      authorImageUrl: `${window.location.origin}/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png`,
      date: "16 May 2022",
      dateIT: "16 Maggio 2022",
      category: "Digital Transformation",
      categoryIT: "Trasformazione Digitale",
      imageUrl: "/lovable-uploads/1c4f0abf-cb15-40e3-b058-28964ed52ed8.png",
      desktopImageUrl: "/lovable-uploads/1c4f0abf-cb15-40e3-b058-28964ed52ed8.png",
      readingTime: "8 min read",
      readingTimeIT: "8 min di lettura",
      tags: ["digital transformation", "workforce", "technology"],
      tagsIT: ["trasformazione digitale", "forza lavoro", "tecnologia"],
      published: true
    },
    {
      slug: "marketing-to-coo-placeholder",
      title: "From Marketing Director to COO: Transfunctional Leadership Principles That Drive Organizational Growth",
      titleIT: "Da Direttore Marketing a COO: Principi di Leadership Transfunzionale che Guidano la Crescita Organizzativa",
      excerpt: "The evolution of executive careers and leadership trajectories rarely follow a linear path. My transition from Marketing Director to Chief Operating Officer represents one of those pivotal professional evolutions that challenges conventional career planning.",
      excerptIT: "L'evoluzione delle carriere dirigenziali e delle traiettorie di leadership raramente segue un percorso lineare. La mia transizione da Direttore Marketing a Chief Operating Officer rappresenta una di quelle evoluzioni professionali cruciali che sfidano la pianificazione convenzionale della carriera.",
      content: "Full content for From Marketing Director to COO blog post",
      contentIT: "Contenuto completo per il post del blog Da Direttore Marketing a COO",
      author: "Luciano Tumminello",
      authorImageUrl: `${window.location.origin}/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png`,
      date: "2 May 2022",
      dateIT: "2 Maggio 2022",
      category: "Leadership",
      categoryIT: "Leadership",
      imageUrl: "/lovable-uploads/8acfc057-4507-4e63-b83a-78639ade9695.png",
      desktopImageUrl: "/lovable-uploads/8acfc057-4507-4e63-b83a-78639ade9695.png",
      readingTime: "10 min read",
      readingTimeIT: "10 min di lettura",
      tags: ["leadership", "career growth", "organizational development"],
      tagsIT: ["leadership", "crescita professionale", "sviluppo organizzativo"],
      published: true
    },
    {
      slug: "beyond-technology-placeholder",
      title: "Beyond Technology: The Cultural Transformation Required for Successful AI Integration",
      titleIT: "Oltre la Tecnologia: La Trasformazione Culturale Necessaria per una Riuscita Integrazione dell'IA",
      excerpt: "The Evolving Challenge of AI Implementation: As we approach mid-2025, one thing has become abundantly clear: the technology behind AI transformation is often the easiest part of the equation.",
      excerptIT: "La Sfida in Evoluzione dell'Implementazione dell'IA: Avvicinandoci alla metà del 2025, una cosa è diventata abbondantemente chiara: la tecnologia dietro la trasformazione dell'IA è spesso la parte più facile dell'equazione.",
      content: "Full content for Beyond Technology blog post",
      contentIT: "Contenuto completo per il post del blog Oltre la Tecnologia",
      author: "Luciano Tumminello",
      authorImageUrl: `${window.location.origin}/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png`,
      date: "17 April 2022",
      dateIT: "17 Aprile 2022",
      category: "AI & Digital Transformation",
      categoryIT: "IA & Trasformazione Digitale",
      imageUrl: "/lovable-uploads/1f7719b4-812c-4079-9d7b-b4698fad762e.png",
      desktopImageUrl: "/lovable-uploads/1f7719b4-812c-4079-9d7b-b4698fad762e.png",
      readingTime: "9 min read",
      readingTimeIT: "9 min di lettura",
      tags: ["artificial intelligence", "cultural transformation", "change management"],
      tagsIT: ["intelligenza artificiale", "trasformazione culturale", "gestione del cambiamento"],
      published: true
    }
  ];
  
  const neededPlaceholders = Math.max(0, postsPerPage - currentPosts.length);
  
  // When no actual posts are available, use all placeholders
  const allPosts = currentPosts.length > 0 ? 
    [...currentPosts, ...placeholderPosts.slice(0, neededPlaceholders)] : 
    placeholderPosts;
    
  return {
    allPosts,
    currentPage,
    setCurrentPage,
    totalPages,
    isLoading,
    lastRefresh
  };
};
