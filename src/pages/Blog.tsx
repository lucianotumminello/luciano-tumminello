
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogList from "@/components/blog/BlogList";
import { useBlogListData } from "@/hooks/useBlogListData";

const Blog: React.FC = () => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  const POSTS_PER_PAGE = 4;
  
  const { 
    allPosts, 
    currentPage, 
    setCurrentPage, 
    totalPages, 
    isLoading 
  } = useBlogListData(POSTS_PER_PAGE);

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
          <BlogHeader />
          
          <BlogList 
            posts={allPosts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            isLoading={isLoading}
          />
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
