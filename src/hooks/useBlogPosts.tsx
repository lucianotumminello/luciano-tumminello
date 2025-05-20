
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAllBlogPosts, refreshBlogPosts } from "@/utils/blog";
import { useToast } from "@/hooks/use-toast";

export const useBlogPosts = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const isItalian = language === "it";
  const [blogPosts, setBlogPosts] = useState<Array<{
    slug: string;
    title: string;
    titleIT: string;
    excerpt: string;
    excerptIT: string;
    date: string;
    dateIT: string;
    category: string;
    categoryIT: string;
    imageUrl: string;
    desktopImageUrl: string;
    [key: string]: any;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<number>(Date.now());
  
  // Function to fetch and sort blog posts
  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("Fetching blog posts from server");
      
      // Force refresh posts first
      await refreshBlogPosts(true);
      
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
  
  // Format date for consistent display
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
  
  return {
    blogPosts,
    isLoading,
    lastRefresh,
    formatDate,
    fetchPosts
  };
};

export default useBlogPosts;
