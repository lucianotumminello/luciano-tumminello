
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface BlogPostContentProps {
  content: string;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ content }) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const isItalian = language === "it";
  
  const processedContent = React.useMemo(() => {
    if (!content) return "";
    
    // Remove any potential duplicate titles at beginning of content
    let cleanedContent = content
      // Remove h1 tags to prevent duplicate titles
      .replace(/<h1[^>]*>([^<]+)<\/h1>/gi, '')
      // Convert any remaining h1 tags to h2
      .replace(/<h1/gi, '<h2')
      .replace(/<\/h1>/gi, '</h2>');
      
    return cleanedContent;
  }, [content]);

  return (
    <article className={`bg-white rounded-lg shadow-md p-4 md:p-6 mb-8 ${isMobile ? 'content-mobile-optimized' : ''}`}>
      <div 
        className="prose prose-base max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-a:text-primary prose-a:font-medium"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
      
      {/* Critical styles for blog content */}
      <style>
        {`
        /* Blog content styles */
        .prose p {
          text-align: justify;
          color: rgb(75 85 99);
          margin-bottom: 1rem;
        }
        
        .prose h2, .prose h3 {
          color: rgb(31 41 55);
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .prose img {
          max-width: 100%;
          height: auto;
          margin: 1.5rem 0;
        }
        
        .prose a {
          color: #2563eb;
          text-decoration: underline;
          font-weight: 500;
        }
        
        .prose a:hover {
          color: #1d4ed8;
        }
        
        /* Mobile optimization */
        @media (max-width: 768px) {
          .content-mobile-optimized p {
            font-size: 0.95rem;
            line-height: 1.5;
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
