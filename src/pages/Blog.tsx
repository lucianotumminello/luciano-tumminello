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
import { useState, useEffect } from "react";
import { getAllBlogPosts } from "@/utils/blogDataManager";

const Blog = () => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  const POSTS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<Array<{slug: string; [key: string]: any}>>([]);
  
  // Fetch and sort blog posts whenever the component mounts or language changes
  useEffect(() => {
    const fetchPosts = () => {
      const posts = Object.entries(getAllBlogPosts())
        .map(([slug, post]) => ({
          ...post,
          slug
        }))
        .filter(post => post.published !== false)
        .sort((a, b) => {
          // Parse dates correctly regardless of format
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime(); // Most recent first
        });
      
      setBlogPosts(posts);
    };
    
    fetchPosts();
    
    // Add an event listener to re-fetch posts when the window gets focus
    // This ensures that if you publish in another tab and come back, you'll see the latest posts
    const handleFocus = () => {
      fetchPosts();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [language]);
  
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
      id: 2,
      title: "Coming Soon",
      titleIT: "Prossimamente",
      excerpt: "Coming Soon",
      excerptIT: "Prossimamente",
      date: "March 22, 2023",
      dateIT: "22 Marzo 2023",
      category: "UI Design",
      categoryIT: "UI Design",
      imageUrl: "/lovable-uploads/c98a5c59-9ec0-4e2e-9cef-30dde0a7e15b.png",
      desktopImageUrl: "/lovable-uploads/c98a5c59-9ec0-4e2e-9cef-30dde0a7e15b.png"
    },
    {
      id: 3,
      title: "Coming Soon",
      titleIT: "Prossimamente",
      excerpt: "Coming Soon",
      excerptIT: "Prossimamente",
      date: "February 8, 2023",
      dateIT: "8 Febbraio 2023",
      category: "Development",
      categoryIT: "Sviluppo",
      imageUrl: "/lovable-uploads/c98a5c59-9ec0-4e2e-9cef-30dde0a7e15b.png",
      desktopImageUrl: "/lovable-uploads/c98a5c59-9ec0-4e2e-9cef-30dde0a7e15b.png"
    },
    {
      id: 4,
      title: "Coming Soon",
      titleIT: "Prossimamente",
      excerpt: "Coming Soon",
      excerptIT: "Prossimamente",
      date: "January 17, 2023",
      dateIT: "17 Gennaio 2023",
      category: "Design Systems",
      categoryIT: "Sistemi di Design",
      imageUrl: "/lovable-uploads/c98a5c59-9ec0-4e2e-9cef-30dde0a7e15b.png",
      desktopImageUrl: "/lovable-uploads/c98a5c59-9ec0-4e2e-9cef-30dde0a7e15b.png"
    }
  ];
  
  const neededPlaceholders = Math.max(0, POSTS_PER_PAGE - currentPosts.length);
  const allPosts = [
    ...currentPosts,
    ...placeholderPosts.slice(0, neededPlaceholders)
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{isItalian ? "Blog | Luciano Tumminello" : "Blog | Luciano Tumminello"}</title>
        <meta 
          name="description" 
          content={isItalian 
            ? "Approfondimenti strategici sulla trasformazione digitale, l'IA e le strategie di marketing basate sui dati di Luciano Tumminello." 
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
            <p className="text-lg text-gray-600 mx-auto max-w-3xl text-justify">
              {isItalian 
                ? "Approfondimenti strategici sulla trasformazione digitale, le operazioni globali e il marketing basato sui dati."
                : "Strategic insights on digital transformation, global operations, and data-driven marketing."
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {allPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img 
                    src={post.imageUrl || (post.desktopImageUrl || "")} 
                    alt={isItalian ? post.titleIT : post.title} 
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      {isItalian ? post.categoryIT : post.category}
                    </span>
                    <span>•</span>
                    <div className="flex items-center whitespace-nowrap">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {formatDate(isItalian ? post.dateIT : post.date)}
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
                    {'slug' in post ? (
                      <Link to={`/blog/${post.slug}`}>{isItalian ? post.titleIT : post.title}</Link>
                    ) : (
                      isItalian ? post.titleIT : post.title
                    )}
                  </h2>
                  <p className="text-gray-600 mb-4 text-justify">{isItalian ? post.excerptIT : post.excerpt}</p>
                  {'slug' in post ? (
                    <Link to={`/blog/${post.slug}`} className="text-primary font-medium text-sm hover:underline">
                      {isItalian ? "Leggi di più →" : "Read More →"}
                    </Link>
                  ) : (
                    <span className="text-gray-400 font-medium text-sm">
                      {isItalian ? "Prossimamente..." : "Coming Soon..."}
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
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
