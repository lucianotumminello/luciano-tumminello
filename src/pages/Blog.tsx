
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogPagination from "@/components/blog/BlogPagination";
import AdminLoginButton from "@/components/blog/AdminLoginButton";

const POSTS_PER_PAGE = 4;

const Blog: React.FC = () => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  
  const { 
    allPosts, 
    currentPage, 
    setCurrentPage, 
    totalPages, 
    formatDate 
  } = useBlogPosts(POSTS_PER_PAGE);

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
          <BlogHeader />
          <BlogGrid posts={allPosts} formatDate={formatDate} />
          <BlogPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </main>
      
      <AdminLoginButton />
      <Footer />
    </div>
  );
};

export default Blog;
