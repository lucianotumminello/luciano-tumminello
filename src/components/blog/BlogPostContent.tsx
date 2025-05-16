
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { optimizeImagesInContent, updateImageVisibility } from "@/utils/imageUtils";
import { ensureOutgoingLinks } from "@/utils/blogContentUtils";
import AprilBlogPostContent from "./AprilBlogPostContent";
import BlogPostStyles from "./BlogPostStyles";

interface BlogPostContentProps {
  content: string;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ content }) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const isItalian = language === "it";
  
  const modifiedContent = React.useMemo(() => {
    if (!content) return "";
    
    // Check if this is the April 13 blog post
    const isAprilPost = content.includes("Beyond Pattern Recognition") || 
                         content.includes("Q2 2025") ||
                         content.includes("New Wave of AI");
    
    // Check if this is the May 16 blog post
    const isMayPost = content.includes("Human + Tech Equation") || 
                      content.includes("Digital Transformation Era");
    
    console.log("Is April 13 blog post:", isAprilPost);
    console.log("Is May 16 blog post:", isMayPost);
    
    // First apply general processing
    let processedContent = optimizeImagesInContent(content, isMobile);
    
    // Then handle the special case for April 13 post
    if (isAprilPost) {
      console.log("Using dedicated component for April 13 blog post");
      // Use the dedicated component for April 13 blog post
      return AprilBlogPostContent({ content: processedContent });
    }
    
    // Critical fix: Remove ALL H1 and H2 elements that duplicate the main title
    // This is the most important part of the fix - we scan the entire content
    // looking for heading elements that could be duplicating the main title
    if (processedContent) {
      // Remove any H1 or H2 at the beginning of content that might duplicate the main title
      processedContent = processedContent.replace(/^\s*<h1[^>]*>[^<]+<\/h1>/i, '');
      processedContent = processedContent.replace(/^\s*<h2[^>]*>[^<]+<\/h2>/i, '');
      
      // Also remove any duplicated titles anywhere in the content (comprehensive list of known titles)
      processedContent = processedContent.replace(/<h1[^>]*>Beyond Technology: The Cultural[^<]*<\/h1>/gi, '');
      processedContent = processedContent.replace(/<h2[^>]*>Beyond Technology: The Cultural[^<]*<\/h2>/gi, '');
      processedContent = processedContent.replace(/<h1[^>]*>The Human \+ Tech Equation[^<]*<\/h1>/gi, '');
      processedContent = processedContent.replace(/<h2[^>]*>The Human \+ Tech Equation[^<]*<\/h2>/gi, '');
      processedContent = processedContent.replace(/<h1[^>]*>Empowering Your Workforce[^<]*<\/h1>/gi, '');
      processedContent = processedContent.replace(/<h2[^>]*>Empowering Your Workforce[^<]*<\/h2>/gi, '');
      processedContent = processedContent.replace(/<h1[^>]*>Digital Transformation Era[^<]*<\/h1>/gi, '');
      processedContent = processedContent.replace(/<h2[^>]*>Digital Transformation Era[^<]*<\/h2>/gi, '');
      processedContent = processedContent.replace(/<h1[^>]*>From Marketing Director to COO[^<]*<\/h1>/gi, '');
      processedContent = processedContent.replace(/<h2[^>]*>From Marketing Director to COO[^<]*<\/h2>/gi, '');
      processedContent = processedContent.replace(/<h1[^>]*>Beyond Pattern Recognition[^<]*<\/h1>/gi, '');
      processedContent = processedContent.replace(/<h2[^>]*>Beyond Pattern Recognition[^<]*<\/h2>/gi, '');
      processedContent = processedContent.replace(/<h1[^>]*>The AI Leadership Revolution[^<]*<\/h1>/gi, '');
      processedContent = processedContent.replace(/<h2[^>]*>The AI Leadership Revolution[^<]*<\/h2>/gi, '');
      
      // Also remove any duplicated H1/H2 within the first 500 characters (catch-all for other posts)
      const firstPartOfContent = processedContent.substring(0, 500);
      const h1Match = firstPartOfContent.match(/<h1[^>]*>([^<]+)<\/h1>/i);
      const h2Match = firstPartOfContent.match(/<h2[^>]*>([^<]+)<\/h2>/i);
      
      if (h1Match && h1Match[1]) {
        // Remove this H1 title from the entire content as it's likely a duplicate
        const titlePattern = new RegExp(`<h1[^>]*>${h1Match[1]}<\\/h1>`, 'gi');
        processedContent = processedContent.replace(titlePattern, '');
      }
      
      if (h2Match && h2Match[1]) {
        // Remove this H2 title from the entire content as it's likely a duplicate
        const titlePattern = new RegExp(`<h2[^>]*>${h2Match[1]}<\\/h2>`, 'gi');
        processedContent = processedContent.replace(titlePattern, '');
      }
      
      // Final check: remove any remaining H1 tags entirely (to enforce single H1 per page in header)
      processedContent = processedContent.replace(/<h1[^>]*>([^<]+)<\/h1>/gi, '<h2>$1</h2>');
    }
    
    // Finally, ensure outgoing links exist in all posts
    return ensureOutgoingLinks(processedContent);
  }, [content, isMobile, isItalian]);
  
  // Effect to ensure proper image visibility after rendering
  React.useEffect(() => {
    const isAprilPost = content && (
      content.includes("Beyond Pattern Recognition") || 
      content.includes("Q2 2025") ||
      content.includes("New Wave of AI")
    );
    
    const isMayPost = content && (
      content.includes("Human + Tech Equation") || 
      content.includes("Digital Transformation Era")
    );
    
    if (isAprilPost || isMayPost) {
      updateImageVisibility(true, isMobile);
      
      // Additional force-update in case the previous call didn't work
      setTimeout(() => {
        updateImageVisibility(true, isMobile);
      }, 500);
    }
  }, [content, isMobile]);
  
  return (
    <article className={`bg-white rounded-lg shadow-md p-4 md:p-6 mb-8 ${isMobile ? 'content-mobile-optimized' : ''}`}>
      <div 
        className="prose prose-base max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-a:text-primary prose-a:font-medium"
        dangerouslySetInnerHTML={{ __html: modifiedContent }}
      />
      <BlogPostStyles />
    </article>
  );
};

export default BlogPostContent;
