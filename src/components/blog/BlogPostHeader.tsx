
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { updateMay16BlogPostImages } from "@/utils/imageUtils";

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

const BlogPostHeader = ({
  title,
  excerpt,
  category,
  date,
  readingTime,
  author,
  authorImageUrl,
  imageUrl,
  desktopImageUrl
}: BlogPostHeaderProps) => {
  const isMobile = useIsMobile();
  
  // Add special handling for the May 16, 2025 blog post
  const isMay16Post = date.includes("16 May 2025") || 
                     date.includes("16 Maggio 2025") || 
                     title.includes("Human + Tech") ||
                     title.includes("Digital Transformation Era");
  
  // Special image URLs for May 16 blog post
  const may16DesktopImage = "/lovable-uploads/6ca4ab8f-5ca0-4f53-8f16-9fcdeb0394f8.png";
  const may16MobileImage = "/lovable-uploads/3de9471b-87c3-4da4-9052-7db78cfa8464.png";
  
  // Determine which images to use
  const actualDesktopImageUrl = isMay16Post ? may16DesktopImage : desktopImageUrl;
  const actualMobileImageUrl = isMay16Post ? may16MobileImage : imageUrl;
  
  // Effect to update images for May 16 post when it loads
  useEffect(() => {
    if (isMay16Post) {
      updateMay16BlogPostImages();
    }
  }, [isMay16Post]);

  return (
    <header className="pb-8 mb-8 border-b border-gray-200">
      <div className="mb-4">
        <span className="text-sm font-medium text-primary/90">
          {category}
        </span>
      </div>
      
      {/* The main title - this should be the only H1 in the document */}
      <h1 className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4",
        isMobile ? "mobile-heading" : ""
      )}>
        {title}
      </h1>
      
      <div className="blog-header">
        {/* Desktop Image - hidden on mobile */}
        <img
          id="marketing-desktop-image"
          src={actualDesktopImageUrl}
          alt={`${title} - Desktop Version`}
          className="hidden md:block w-full h-auto max-h-[420px] object-cover rounded-lg shadow-md mb-6"
          loading="eager"
          decoding="async"
          style={{ display: isMobile ? 'none' : 'block' }}
          fetchPriority="high"
        />
        
        {/* Mobile Image - hidden on desktop */}
        <img
          id="marketing-mobile-image"
          src={actualMobileImageUrl}
          alt={`${title} - Mobile Version`}
          className="md:hidden w-full h-auto max-h-[260px] object-cover rounded-lg shadow-md mb-4"
          loading="eager" 
          decoding="async"
          style={{ display: isMobile ? 'block' : 'none' }}
          fetchPriority="high"
        />
      </div>
      
      <p className="text-lg text-gray-700 mb-6">{excerpt}</p>
      
      <div className="flex items-center justify-between flex-wrap gap-4">
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
      </div>
    </header>
  );
};

export default BlogPostHeader;
