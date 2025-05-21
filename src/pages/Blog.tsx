
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
import { Button } from "@/components/ui/button";

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
        'beyond-recognition'
      ];
      
      // Process posts from storage into an array format
      const postsArray = Object.entries(allPosts).map(([slug, post]) => ({
        ...post,
        slug
      }));
      
      // Sort posts by date (newest first)
      const sortedPosts = postsArray.sort((a, b) => {
        const dateA = new Date(a.date || '');
        const dateB = new Date(b.date || '');
        return dateB.getTime() - dateA.getTime();
      });
      
      // Filter out unpublished posts
      const publishedPosts = sortedPosts.filter(post => post.published !== false);
      
      setBlogPosts(publishedPosts);
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
      <div className="container mx-auto max-w-5xl flex justify-end gap-4 mb-8">
        <Link 
          to="/admin"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          CONTENT MANAGER
        </Link>
        <Link 
          to="/blog-builder"
          className="inline-flex items-center justify-center rounded-md bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          CLASSIC EDITOR
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
