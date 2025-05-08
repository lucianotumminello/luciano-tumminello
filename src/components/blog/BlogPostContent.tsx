
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
    if (content.includes("Beyond Pattern Recognition: What the New Wave of AI Means for Business Leaders in Q2 2025")) {
      console.log("Found target blog post - April 13, 2025");
      
      if (content.includes("Operations Transformation: Decision Intelligence at Enterprise Scale")) {
        console.log("Found Operations Transformation header, adding images now");
        
        const headerPattern = "<h2>Operations Transformation: Decision Intelligence at Enterprise Scale</h2>";
        
        // Define the image HTML with explicit styling to ensure visibility
        const desktopImageHtml = `
          <div class="operations-image-desktop">
            <img 
              src="/lovable-uploads/8c548369-87f9-4eb6-94a8-07def48e6de6.png" 
              alt="Operations Transformation Desktop" 
              width="100%" 
              style="display: block; max-width: 100%; margin: 1rem 0;"
            />
          </div>
        `;
        
        const mobileImageHtml = `
          <div class="operations-image-mobile">
            <img 
              src="/lovable-uploads/fba14352-d1d5-451c-8b99-136cd2afde0a.png" 
              alt="Operations Transformation Mobile" 
              width="100%" 
              style="display: block; max-width: 100%; margin: 1rem 0;"
            />
          </div>
        `;
        
        // Replace the header with the images followed by the header
        processedContent = processedContent.replace(
          headerPattern,
          `${desktopImageHtml}${mobileImageHtml}${headerPattern}`
        );
        
        console.log("Images inserted before Operations Transformation header");
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
        
        .operations-image-desktop {
          display: block;
          margin: 2rem 0;
          width: 100%;
        }
        
        .operations-image-mobile {
          display: none;
          margin: 2rem 0;
          width: 100%;
        }
        
        @media (max-width: 768px) {
          .operations-image-desktop {
            display: none;
          }
          
          .operations-image-mobile {
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
