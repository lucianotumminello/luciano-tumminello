
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
    <article className="bg-white rounded-lg p-5 mb-6">
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
      
      <style>
        {`
        /* Core content styling */
        .prose {
          width: 100%;
          color: #374151;
          line-height: 1.75;
        }
        
        .prose p {
          margin-bottom: 1.5rem;
          text-align: justify;
          font-size: 1.125rem;
          line-height: 1.75;
        }
        
        .prose h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #111827;
          line-height: 1.3;
        }
        
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: #1f2937;
        }
        
        .prose h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: #374151;
        }
        
        .prose a {
          color: #2563eb;
          text-decoration: underline;
          font-weight: 500;
          text-decoration-thickness: 0.05em;
          text-underline-offset: 2px;
        }
        
        .prose a:hover {
          color: #1d4ed8;
          text-decoration-thickness: 0.1em;
        }
        
        .prose ul {
          list-style-type: disc;
          padding-left: 1.75rem;
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .prose ol {
          list-style-type: decimal;
          padding-left: 1.75rem;
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
        }
        
        .prose img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 2rem auto;
          border-radius: 0.375rem;
        }
        
        .prose blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: #4b5563;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .prose pre {
          background-color: #f3f4f6;
          border-radius: 0.375rem;
          padding: 1rem;
          overflow-x: auto;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .prose code {
          font-family: monospace;
          background-color: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }
        
        /* Mobile optimization */
        @media (max-width: 768px) {
          .prose p {
            font-size: 1rem;
            margin-bottom: 1.25rem;
          }
          
          .prose h2 {
            font-size: 1.5rem;
            margin-top: 2rem;
          }
          
          .prose h3 {
            font-size: 1.25rem;
            margin-top: 1.5rem;
          }
          
          .prose img {
            margin: 1.5rem auto;
          }
        }
        `}
      </style>
    </article>
  );
};

export default BlogPostContent;
