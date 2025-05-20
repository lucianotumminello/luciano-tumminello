
import React from "react";
import BlogCard from "./BlogCard";
import BlogPagination from "./BlogPagination";
import { useLanguage } from "@/contexts/LanguageContext";
import { BlogPost } from "@/types";

interface BlogListProps {
  posts: BlogPost[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  isLoading: boolean;
}

const BlogList: React.FC<BlogListProps> = ({ 
  posts, 
  currentPage, 
  setCurrentPage, 
  totalPages,
  isLoading
}) => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  
  // Date formatting function
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
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {posts.map((post, index) => (
          <BlogCard
            key={post.slug || index}
            post={post}
            index={index}
            formatDate={formatDate}
          />
        ))}
      </div>
      
      <BlogPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default BlogList;
