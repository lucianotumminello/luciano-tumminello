
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAllBlogPosts } from "@/utils/blogDataManager";

export const useBlogPosts = (postsPerPage = 4) => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<Array<{slug: string; [key: string]: any}>>([]);
  
  useEffect(() => {
    const posts = Object.entries(getAllBlogPosts())
      .map(([slug, post]) => ({
        ...post,
        slug
      }))
      // Make sure we only include posts that are explicitly published
      .filter(post => post.published !== false)
      // Sort by date (most recent first)
      .sort((a, b) => {
        // Ensure we have valid date strings
        const dateA = new Date(a.date || "");
        const dateB = new Date(b.date || "");
        
        // If dates are invalid, use string comparison as fallback
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          return String(b.date).localeCompare(String(a.date));
        }
        
        return dateB.getTime() - dateA.getTime();
      });
    
    console.log("Found blog posts:", posts.length);
    posts.forEach(post => console.log(" - Post:", post.title, "Published:", post.published, "Date:", post.date));
    
    setBlogPosts(posts);
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
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
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
  
  const neededPlaceholders = Math.max(0, postsPerPage - currentPosts.length);
  const allPosts = [
    ...currentPosts,
    ...placeholderPosts.slice(0, neededPlaceholders)
  ];

  return {
    allPosts,
    currentPage,
    setCurrentPage,
    totalPages,
    formatDate
  };
};
