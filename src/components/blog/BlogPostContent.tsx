
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
    
    // Add images before the Operations Transformation heading for the specific blog post
    if (content.includes("Beyond Pattern Recognition: What the New Wave of AI Means for Business Leaders in Q2 2025")) {
      console.log("Found target blog post - April 13, 2025");
      
      // Search specifically for the quote by Maya Johnson which appears right before our target insertion point
      if (content.includes("Maya Johnson, Chief Customer Experience Officer at Deloitte Digital")) {
        console.log("Found Maya Johnson quote, adding images before Operations Transformation heading");
        
        const quotePattern = /" — Maya Johnson, Chief Customer Experience Officer at Deloitte Digital<\/p>/;
        
        // Define the desktop and mobile images with specific styles to ensure visibility
        const desktopImageHtml = `
          <div class="desktop-image-container">
            <img 
              src="/lovable-uploads/8c548369-87f9-4eb6-94a8-07def48e6de6.png" 
              alt="Operations Transformation Diagram" 
              width="100%" 
              height="auto"
              style="display: block; max-width: 100%; margin: 2rem 0 1rem 0; border: 0;"
            />
          </div>
        `;
        
        const mobileImageHtml = `
          <div class="mobile-image-container">
            <img 
              src="/lovable-uploads/fba14352-d1d5-451c-8b99-136cd2afde0a.png" 
              alt="Operations Transformation Diagram Mobile" 
              width="100%" 
              height="auto"
              style="display: block; max-width: 100%; margin: 2rem 0 1rem 0; border: 0;"
            />
          </div>
        `;
        
        // Insert after Maya Johnson quote and before Operations Transformation heading
        processedContent = processedContent.replace(
          quotePattern,
          `" — Maya Johnson, Chief Customer Experience Officer at Deloitte Digital</p>${desktopImageHtml}${mobileImageHtml}`
        );
        
        console.log("Images inserted after Maya Johnson quote");
      }
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
        
        .desktop-image-container {
          display: block;
          margin: 2rem 0;
          width: 100%;
        }
        
        .mobile-image-container {
          display: none;
          margin: 2rem 0;
          width: 100%;
        }
        
        @media (max-width: 768px) {
          .desktop-image-container {
            display: none;
          }
          
          .mobile-image-container {
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
