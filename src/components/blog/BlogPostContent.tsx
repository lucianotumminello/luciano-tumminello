
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
    
    // Identify Maya Johnson quote in both languages
    const englishQuote = `"The emotional intelligence gap between basic and advanced AI implementations is becoming a major competitive differentiator. Companies leading in this area are seeing significant loyalty improvements because customers feel genuinely understood." — Maya Johnson, Chief Customer Experience Officer at Deloitte Digital`;
    const italianQuote = `"Il divario di intelligenza emotiva tra implementazioni IA di base e avanzate sta diventando un importante fattore differenziante competitivo. Le aziende leader in quest'area stanno vedendo significativi miglioramenti nella fedeltà perché i clienti si sentono realmente compresi." — Maya Johnson, Chief Customer Experience Officer presso Deloitte Digital`;
    
    const quoteToFind = isItalian ? italianQuote : englishQuote;
    
    // Process content for mobile optimization
    let processedContent = content;
    
    // Only proceed if the quote exists in the content
    if (processedContent.includes(quoteToFind)) {
      // Set the appropriate image URL based on device type
      const desktopImageUrl = "/lovable-uploads/c58f3f96-294d-41f7-8a9b-4dcefa5823ed.png";
      const mobileImageUrl = "/lovable-uploads/329dab58-64c7-4a2a-95fc-b22a6742091b.png";
      const imageUrl = isMobile ? mobileImageUrl : desktopImageUrl;
      
      // Add smaller size attributes for mobile devices
      const imageTag = `
        <div class="my-8">
          <img 
            src="${imageUrl}" 
            alt="Marketing Transformation" 
            class="w-full rounded-lg shadow-md" 
            loading="lazy"
            width="${isMobile ? "480" : "960"}"
            height="${isMobile ? "320" : "640"}"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 960px"
          />
        </div>
      `;
      
      processedContent = processedContent.replace(quoteToFind, `${quoteToFind}${imageTag}`);
    }
    
    // Add mobile optimizations for images
    if (isMobile) {
      // Replace all <img> tags with optimized versions
      processedContent = processedContent.replace(/<img\s+([^>]*)>/g, (match, attrs) => {
        // Don't modify if it already has loading="lazy"
        if (attrs.includes('loading="lazy"')) return match;
        
        return `<img ${attrs} loading="lazy" decoding="async">`;
      });
      
      // Use smaller font sizes for mobile
      processedContent = processedContent.replace(
        /<h([1-6])\s+([^>]*)>/g,
        (match, level, attrs) => `<h${level} class="mobile-heading" ${attrs}>`
      );
    }
    
    return processedContent;
  }, [content, isMobile, isItalian]);
  
  return (
    <article className={`bg-white rounded-xl shadow-md p-4 md:p-6 lg:p-10 mb-12 ${isMobile ? 'content-mobile-optimized' : ''}`}>
      <div 
        className="prose prose-base md:prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-a:text-primary prose-a:font-medium prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-4 prose-blockquote:rounded-md prose-blockquote:text-gray-700 prose-blockquote:italic prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: modifiedContent }}
      />
      
      <style>{`
        .prose p {
          text-align: justify;
          color: rgb(75 85 99);
          margin-bottom: 1.25rem;
        }
        .prose li {
          text-align: justify;
          color: rgb(75 85 99);
          margin-bottom: 0.5rem;
        }
        .prose h1 {
          font-size: 1.75rem;
          line-height: 2.25rem;
          margin-top: 2.25rem;
          margin-bottom: 1.25rem;
          color: rgb(31 41 55);
        }
        .prose h2 {
          font-size: 1.5rem;
          line-height: 2rem;
          margin-top: 1.75rem;
          margin-bottom: 1rem;
          color: rgb(31 41 55);
        }
        .prose h3 {
          font-size: 1.25rem;
          line-height: 1.75rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: rgb(31 41 55);
        }
        .prose blockquote {
          padding: 1rem 1.25rem;
          margin: 1.5rem 0;
          border-radius: 0.5rem;
          background-color: rgba(var(--primary-rgb), 0.05);
          border-left-width: 4px;
          border-color: var(--primary);
        }
        .prose blockquote p {
          margin-bottom: 0.5rem;
        }
        .prose ul, .prose ol {
          margin-top: 0.75rem;
          margin-bottom: 1.25rem;
        }
        /* Improve header spacing for better readability */
        .prose h1:first-child {
          margin-top: 0;
        }
        .prose h1 + h2 {
          margin-top: 1.25rem;
        }
        .prose h2 + h3 {
          margin-top: 1rem;
        }
        /* Optimize image rendering */
        .prose img {
          max-width: 100%;
          height: auto;
          display: block;
          will-change: transform;
          content-visibility: auto;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .content-mobile-optimized {
            padding: 1rem;
          }
          .mobile-heading {
            font-size: 90%;
            margin-top: 1.2rem;
            margin-bottom: 0.8rem;
          }
          .prose p {
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 1rem;
          }
          .prose blockquote {
            padding: 0.75rem 1rem;
            margin: 1rem 0;
          }
          .prose img {
            contain: paint;
          }
        }
      `}</style>
    </article>
  );
};

export default BlogPostContent;
