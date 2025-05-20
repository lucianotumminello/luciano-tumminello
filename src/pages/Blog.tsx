
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useState, useEffect, useCallback } from "react";
import { getAllBlogPosts } from "@/utils/blog";
import { useToast } from "@/hooks/use-toast";
import { optimizeImagesInContent } from "@/utils/imageUtils";

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
  }, [language, fetchPosts]);
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return dateStr;
      }
      
      const day = date.getDate();
      const month = date.toLocaleString(isItalian ? 'it-IT' : 'en-US', { month: 'long' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error("Error formatting date:", error, dateStr);
      return dateStr;
    }
  };
  
  const totalPosts = blogPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  const placeholderPosts = [
    {
      title: "The Human + Tech Equation: Empowering Your Workforce in the Digital Transformation Era",
      titleIT: "L'Equazione Umano + Tecnologia: Potenziare la Forza Lavoro nell'Era della Trasformazione Digitale",
      excerpt: "In today's digital transformation landscape, technology alone isn't enough to drive operational excellence. The most successful organizations master what I call the \"Human + Tech Equation\", where cutting-edge technology amplifies human potential, and human insight maximizes technological impact.",
      excerptIT: "Nel panorama attuale della trasformazione digitale, la tecnologia da sola non è sufficiente per guidare l'eccellenza operativa. Le organizzazioni di maggior successo padroneggiano quella che chiamo \"L'Equazione Umano + Tecnologia\", dove la tecnologia all'avanguardia amplifica il potenziale umano, e l'intuizione umana massimizza l'impatto tecnologico.",
      date: "16 May 2022",
      dateIT: "16 Maggio 2022",
      category: "Digital Transformation",
      categoryIT: "Trasformazione Digitale",
      imageUrl: "/lovable-uploads/1c4f0abf-cb15-40e3-b058-28964ed52ed8.png",
      desktopImageUrl: "/lovable-uploads/1c4f0abf-cb15-40e3-b058-28964ed52ed8.png"
    },
    {
      title: "From Marketing Director to COO: Transfunctional Leadership Principles That Drive Organizational Growth",
      titleIT: "Da Direttore Marketing a COO: Principi di Leadership Transfunzionale che Guidano la Crescita Organizzativa",
      excerpt: "The evolution of executive careers and leadership trajectories rarely follow a linear path. My transition from Marketing Director to Chief Operating Officer represents one of those pivotal professional evolutions that challenges conventional career planning.",
      excerptIT: "L'evoluzione delle carriere dirigenziali e delle traiettorie di leadership raramente segue un percorso lineare. La mia transizione da Direttore Marketing a Chief Operating Officer rappresenta una di quelle evoluzioni professionali cruciali che sfidano la pianificazione convenzionale della carriera.",
      date: "2 May 2022",
      dateIT: "2 Maggio 2022",
      category: "Leadership",
      categoryIT: "Leadership",
      imageUrl: "/lovable-uploads/8acfc057-4507-4e63-b83a-78639ade9695.png",
      desktopImageUrl: "/lovable-uploads/8acfc057-4507-4e63-b83a-78639ade9695.png"
    },
    {
      title: "Beyond Technology: The Cultural Transformation Required for Successful AI Integration",
      titleIT: "Oltre la Tecnologia: La Trasformazione Culturale Necessaria per una Riuscita Integrazione dell'IA",
      excerpt: "The Evolving Challenge of AI Implementation: As we approach mid-2025, one thing has become abundantly clear: the technology behind AI transformation is often the easiest part of the equation.",
      excerptIT: "La Sfida in Evoluzione dell'Implementazione dell'IA: Avvicinandoci alla metà del 2025, una cosa è diventata abbondantemente chiara: la tecnologia dietro la trasformazione dell'IA è spesso la parte più facile dell'equazione.",
      date: "17 April 2022",
      dateIT: "17 Aprile 2022",
      category: "AI & Digital Transformation",
      categoryIT: "IA & Trasformazione Digitale",
      imageUrl: "/lovable-uploads/1f7719b4-812c-4079-9d7b-b4698fad762e.png",
      desktopImageUrl: "/lovable-uploads/1f7719b4-812c-4079-9d7b-b4698fad762e.png"
    }
  ];
  
  const neededPlaceholders = Math.max(0, POSTS_PER_PAGE - currentPosts.length);
  
  // When no actual posts are available, use all placeholders
  const allPosts = currentPosts.length > 0 ? 
    [...currentPosts, ...placeholderPosts.slice(0, neededPlaceholders)] : 
    placeholderPosts;

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
            <p className="text-lg text-gray-600 mx-auto max-w-3xl">
              {isItalian 
                ? "Approfondimenti strategici sulla trasformazione digitale, le operazioni globali e il marketing basato sui dati."
                : "Strategic insights on digital transformation, global operations, and data-driven marketing."
              }
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {allPosts.map((post, index) => (
                  <Card key={index} className="overflow-hidden border border-gray-100 shadow hover:shadow-md transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.imageUrl || (post.desktopImageUrl || "")} 
                        alt={isItalian ? post.titleIT : post.title} 
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded">
                          {isItalian ? post.categoryIT : post.category}
                        </span>
                        <span>•</span>
                        <div className="flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {formatDate(isItalian ? post.dateIT : post.date)}
                        </div>
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {'slug' in post ? (
                          <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                            {isItalian ? post.titleIT : post.title}
                          </Link>
                        ) : (
                          isItalian ? post.titleIT : post.title
                        )}
                      </h2>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-3">{isItalian ? post.excerptIT : post.excerpt}</p>
                      {'slug' in post ? (
                        <Link to={`/blog/${post.slug}`} className="text-primary font-medium text-sm hover:underline">
                          {isItalian ? "Leggi di più →" : "Read More →"}
                        </Link>
                      ) : (
                        <span className="text-gray-400 font-medium text-sm">
                          {isItalian ? "Leggi di più →" : "Read More →"}
                        </span>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                    
                    <PaginationItem>
                      <PaginationLink isActive>1</PaginationLink>
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationLink>2</PaginationLink>
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
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
