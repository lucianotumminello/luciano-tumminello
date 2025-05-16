
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface BlogPostContentProps {
  content: string;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ content }) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  
  const processedContent = React.useMemo(() => {
    if (!content) return "";
    
    // Remove any potential duplicate titles at beginning of content
    let cleanedContent = content
      // Remove h1 tags completely to prevent duplicate titles
      .replace(/<h1[^>]*>([^<]+)<\/h1>/gi, '')
      // Convert any h2 tags at the start that might duplicate the title to h3
      .replace(/^(\s*)<h2([^>]*)>([^<]+)<\/h2>/i, '$1<h3$2>$3</h3>');
      
    return cleanedContent;
  }, [content]);

  return (
    <article className="bg-white rounded-lg shadow-md p-5 mb-8">
      <div 
        className={`prose prose-base max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-a:text-primary prose-a:font-medium ${isMobile ? 'content-mobile-optimized' : ''}`}
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
        
        /* Blog title fix - critical to correct layout */
        .blog-post-title {
          display: block !important;
          margin-bottom: 1.5rem !important;
        }
                
        /* Fix blog header spacing */
        .blog-header {
          margin-bottom: 2rem !important;
          display: block !important;
        }
        
        @media (max-width: 768px) {
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
