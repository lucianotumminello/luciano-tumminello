
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
    
    // Specifically targeting the April 13 blog post
    const isTargetPost = content.includes("Beyond Pattern Recognition: What the New Wave of AI Means for Business Leaders in Q2 2025");
    console.log("Is target blog post (April 13):", isTargetPost);
    
    if (isTargetPost) {
      console.log("Processing the target blog post - April 13, 2025");
      
      // Look for the specific quote by Maya Johnson
      const hasMayaQuote = content.includes("Maya Johnson, Chief Customer Experience Officer at Deloitte Digital");
      console.log("Found Maya Johnson quote:", hasMayaQuote);
      
      if (hasMayaQuote) {
        console.log("Preparing to insert marketing transformation images");
        
        // Define the exact pattern to match
        const quotePattern = /" — Maya Johnson, Chief Customer Experience Officer at Deloitte Digital<\/p>/;
        const quoteMatch = processedContent.match(quotePattern);
        console.log("Quote pattern matched:", !!quoteMatch);
        
        // Define the desktop and mobile images with enhanced visibility styles
        const desktopImageHtml = `
          <div id="marketing-desktop-image" class="marketing-desktop-image" style="display: block; margin: 2rem 0; width: 100%; max-width: 100%;">
            <img 
              src="/lovable-uploads/1c4f0abf-cb15-40e3-b058-28964ed52ed8.png" 
              alt="Marketing Transformation Diagram - Desktop" 
              width="100%" 
              height="auto"
              style="display: block; max-width: 100%; margin: 2rem 0 1rem 0; border: 1px solid #eee;"
            />
          </div>
        `;
        
        const mobileImageHtml = `
          <div id="marketing-mobile-image" class="marketing-mobile-image" style="display: none; margin: 2rem 0; width: 100%; max-width: 100%;">
            <img 
              src="/lovable-uploads/9a7ea607-c8a4-4096-ae90-22f531489125.png" 
              alt="Marketing Transformation Diagram - Mobile" 
              width="100%" 
              height="auto"
              style="display: block; max-width: 100%; margin: 2rem 0 1rem 0; border: 1px solid #eee;"
            />
          </div>
        `;
        
        // Insert after Maya Johnson quote and before Operations Transformation heading
        if (quoteMatch) {
          processedContent = processedContent.replace(
            quotePattern,
            `" — Maya Johnson, Chief Customer Experience Officer at Deloitte Digital</p>${desktopImageHtml}${mobileImageHtml}`
          );
          console.log("Marketing transformation images inserted successfully");
        } else {
          console.error("Could not find the exact quote pattern to insert images");
          
          // Fallback approach - try to find a similar pattern
          const alternativePattern = /Maya Johnson.*?Deloitte Digital<\/p>/;
          const alternativeMatch = processedContent.match(alternativePattern);
          
          if (alternativeMatch) {
            console.log("Using alternative insertion point");
            processedContent = processedContent.replace(
              alternativeMatch[0],
              `${alternativeMatch[0]}${desktopImageHtml}${mobileImageHtml}`
            );
            console.log("Images inserted using alternative approach");
          } else {
            // Emergency fallback - just insert at the beginning of the content
            console.log("Using emergency fallback to insert images");
            processedContent = `${desktopImageHtml}${mobileImageHtml}${processedContent}`;
          }
        }
      }
    }
    
    return processedContent;
  }, [content, isMobile, isItalian]);
  
  // Effect to ensure proper image visibility after rendering
  React.useEffect(() => {
    if (content && content.includes("Beyond Pattern Recognition: What the New Wave of AI Means for Business Leaders in Q2 2025")) {
      // Ensure mobile/desktop visibility is correctly applied based on screen size
      setTimeout(() => {
        const desktopImg = document.getElementById("marketing-desktop-image");
        const mobileImg = document.getElementById("marketing-mobile-image");
        
        if (desktopImg && mobileImg) {
          console.log("Found marketing images in DOM, applying final visibility styles");
          if (isMobile) {
            desktopImg.style.display = "none";
            mobileImg.style.display = "block";
          } else {
            desktopImg.style.display = "block";
            mobileImg.style.display = "none";
          }
        } else {
          console.warn("Marketing images not found in DOM after rendering");
        }
      }, 100);
    }
  }, [content, isMobile]);
  
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
        
        /* Desktop images - important to ensure display */
        .desktop-image-container,
        .marketing-desktop-image {
          display: block !important;
          margin: 2rem 0;
          width: 100%;
        }
        
        /* Mobile images - important to ensure proper display */
        .mobile-image-container,
        .marketing-mobile-image {
          display: none !important;
          margin: 2rem 0;
          width: 100%;
        }
        
        @media (max-width: 768px) {
          /* Hide desktop images on mobile */
          .desktop-image-container,
          .marketing-desktop-image {
            display: none !important;
          }
          
          /* Show mobile images on mobile */
          .mobile-image-container,
          .marketing-mobile-image {
            display: block !important;
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
