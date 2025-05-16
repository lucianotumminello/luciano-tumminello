
import React from "react";
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
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
          {category}
        </span>
      </div>
      
      {/* Main Title - The ONLY H1 in the document */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {title}
      </h1>
      
      {/* Excerpt/Introduction */}
      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        {excerpt}
      </p>
      
      {/* Featured Image - positioned below title and excerpt */}
      <div className="mb-8 overflow-hidden rounded-lg shadow-md">
        <img
          src={isMobile ? imageUrl : desktopImageUrl}
          alt={title}
          className="w-full h-auto object-cover"
          style={{ maxHeight: '480px' }}
          loading="lazy"
        />
      </div>
      
      {/* Author information and metadata */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center">
          <img
            src={authorImageUrl}
            alt={author}
            className="w-10 h-10 rounded-full mr-3 border border-gray-200"
            loading="lazy"
          />
          <div>
            <p className="font-medium text-gray-900">{author}</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 flex items-center gap-4">
          <span>{date}</span>
          <span>•</span>
          <span>{readingTime}</span>
        </div>
      </div>
    </header>
  );
};

export default BlogPostHeader;
