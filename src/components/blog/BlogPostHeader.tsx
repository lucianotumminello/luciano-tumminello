
import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface BlogPostHeaderProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
  authorImageUrl: string;
  imageUrl: string;
  desktopImageUrl: string;
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  title,
  excerpt,
  category,
  date,
  readingTime,
  author,
  authorImageUrl,
  imageUrl,
  desktopImageUrl
}) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="pb-6 mb-8 border-b border-gray-200">
      <div className="mb-4">
        <span className="text-sm font-medium text-primary/90">
          {category}
        </span>
      </div>
      
      {/* The main title - this is the ONLY H1 in the document */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        {title}
      </h1>
      
      <p className="text-lg text-gray-700 mb-6">{excerpt}</p>
      
      {/* Featured Image - positioned properly below the text */}
      <div className="mb-6">
        <img
          src={isMobile ? imageUrl : desktopImageUrl}
          alt={title}
          className="w-full h-auto rounded-lg shadow-md object-cover"
          style={{ maxHeight: isMobile ? '260px' : '380px' }}
          loading="lazy"
        />
      </div>
      
      {/* Author information */}
      <div className="flex items-center">
        <img
          src={authorImageUrl}
          alt={author}
          className="w-10 h-10 rounded-full mr-3"
          loading="lazy"
        />
        <div>
          <p className="font-medium text-gray-900">{author}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span>{date}</span>
            <span className="mx-2">•</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BlogPostHeader;
