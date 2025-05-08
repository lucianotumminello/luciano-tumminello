
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
        console.log("Found Maya Johnson quote, inserting marketing transformation images");
        
        const quotePattern = /" — Maya Johnson, Chief Customer Experience Officer at Deloitte Digital<\/p>/;
        
        // Define the desktop and mobile images with specific styles to ensure visibility
        const desktopImageHtml = `
          <div class="marketing-desktop-image">
            <img 
              src="/lovable-uploads/1c4f0abf-cb15-40e3-b058-28964ed52ed8.png" 
              alt="Marketing Transformation Diagram - Desktop" 
              width="100%" 
              height="auto"
              style="display: block; max-width: 100%; margin: 2rem 0 1rem 0; border: 0;"
            />
          </div>
        `;
        
        const mobileImageHtml = `
          <div class="marketing-mobile-image">
            <img 
              src="/lovable-uploads/9a7ea607-c8a4-4096-ae90-22f531489125.png" 
              alt="Marketing Transformation Diagram - Mobile" 
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
        
        console.log("Marketing transformation images inserted after Maya Johnson quote");
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
        
        /* Desktop images */
        .desktop-image-container,
        .marketing-desktop-image {
          display: block;
          margin: 2rem 0;
          width: 100%;
        }
        
        /* Mobile images */
        .mobile-image-container,
        .marketing-mobile-image {
          display: none;
          margin: 2rem 0;
          width: 100%;
        }
        
        @media (max-width: 768px) {
          /* Hide desktop images on mobile */
          .desktop-image-container,
          .marketing-desktop-image {
            display: none;
          }
          
          /* Show mobile images on mobile */
          .mobile-image-container,
          .marketing-mobile-image {
            display: block;
          }
          
          /* Mobile content optimization */
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
