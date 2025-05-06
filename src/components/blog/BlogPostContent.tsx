
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface BlogPostContentProps {
  content: string;
}

const BlogPostContent = ({ content }: BlogPostContentProps) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const isItalian = language === "it";
  
  const modifiedContent = React.useMemo(() => {
    if (!content) return "";
    
    // Process content for mobile optimization
    let processedContent = content;
    
    // Add mobile optimizations for images
    if (isMobile) {
      // Replace all <img> tags with optimized versions
      processedContent = processedContent.replace(/<img\s+([^>]*)>/g, (match, attrs) => {
        // Don't modify if it already has loading="lazy"
        if (attrs.includes('loading="lazy"')) return match;
        
        return `<img ${attrs} loading="lazy" decoding="async">`;
      });
    }
    
    // Add the specific images before the Operations Transformation header
    // This is for the blog post published on 13 April 2025
    if (processedContent.includes("Operations Transformation: Decision Intelligence at Enterprise Scale")) {
      console.log("Found Operations Transformation header, adding images");
      const operationsHeader = "<h2>Operations Transformation: Decision Intelligence at Enterprise Scale</h2>";
      const imageForDesktop = `<div class="operations-transformation-image desktop-only"><img src="/lovable-uploads/83fa2f21-049b-4888-a2f2-3d40fb7bc9e2.png" alt="Operations Transformation - Desktop" loading="lazy" decoding="async" class="w-full"></div>`;
      const imageForMobile = `<div class="operations-transformation-image mobile-only"><img src="/lovable-uploads/233bb7d0-18cd-4897-877a-ef4f6d00391f.png" alt="Operations Transformation - Mobile" loading="lazy" decoding="async" class="w-full"></div>`;
      
      processedContent = processedContent.replace(
        operationsHeader, 
        `${imageForDesktop}${imageForMobile}${operationsHeader}`
      );
    }
    
    return processedContent;
  }, [content, isMobile, isItalian]);
  
  return (
    <article className={`bg-white rounded-lg shadow-md p-4 md:p-6 mb-8 ${isMobile ? 'content-mobile-optimized' : ''}`}>
      <div 
        className="prose prose-base max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-a:text-primary prose-a:font-medium"
        dangerouslySetInnerHTML={{ __html: modifiedContent }}
      />
      
      <style>
        {`
        .prose p {
          text-align: justify;
          color: rgb(75 85 99);
          margin-bottom: 1rem;
        }
        
        .prose h1, .prose h2, .prose h3 {
          color: rgb(31 41 55);
        }
        
        .prose img {
          max-width: 100%;
          height: auto;
        }
        
        .desktop-only {
          display: block;
        }
        
        .mobile-only {
          display: none;
        }
        
        .operations-transformation-image {
          margin-bottom: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .operations-transformation-image img {
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }
          
          .mobile-only {
            display: block;
          }
          
          .content-mobile-optimized p {
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 0.75rem;
          }
          
          .content-mobile-optimized img {
            height: auto !important;
            width: 100% !important;
          }
        }
        `}
      </style>
    </article>
  );
};

export default BlogPostContent;
