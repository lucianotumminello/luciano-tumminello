
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import BlogList from "@/components/blog/BlogList";
import BlogPagination from "@/components/blog/BlogPagination";
import useBlogPosts from "@/hooks/useBlogPosts";

const Blog = () => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  const POSTS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use the custom hook to handle blog posts
  const { blogPosts, isLoading, lastRefresh, formatDate } = useBlogPosts();
  
  const totalPosts = blogPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Placeholder posts for when there are not enough real posts
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
            <p className="text-lg text-gray-600 mx-auto max-w-3xl text-justify">
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
              <BlogList 
                posts={allPosts} 
                lastRefresh={lastRefresh} 
                formatDate={formatDate} 
              />

              <BlogPagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            </>
          )}
          
          {/* Visual debug indicator (hidden in production) */}
          {process.env.NODE_ENV !== 'production' && (
            <div className="text-xs text-gray-400 text-center mt-4">
              Last refreshed: {new Date(lastRefresh).toLocaleTimeString()} | 
              Posts in memory: {blogPosts.length}
            </div>
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
