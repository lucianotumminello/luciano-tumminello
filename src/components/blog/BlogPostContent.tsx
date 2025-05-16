
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
      return processedContent; // We'll process this in the AprilBlogPostContent component
    }
    
    // CRITICAL FIX: Remove ALL potential title duplications at the beginning of content
    // This is the most important part of the fix - we scan the entire content
    // looking for heading elements that could be duplicating the main title
    
    // First, remove ALL h1 and h2 at the beginning that might duplicate the title
    processedContent = processedContent.replace(/^\s*<h1[^>]*>[^<]+<\/h1>/i, '');
    processedContent = processedContent.replace(/^\s*<h2[^>]*>[^<]+<\/h2>/i, '');
    
    // Then remove these specific titles that we know exist in our posts
    const titlesToRemove = [
      "Beyond Technology: The Cultural",
      "The Human \\+ Tech Equation",
      "Empowering Your Workforce",
      "Digital Transformation Era",
      "From Marketing Director to COO",
      "Beyond Pattern Recognition",
      "The AI Leadership Revolution"
    ];
    
    titlesToRemove.forEach(title => {
      const h1Pattern = new RegExp(`<h1[^>]*>${title}[^<]*<\\/h1>`, 'gi');
      const h2Pattern = new RegExp(`<h2[^>]*>${title}[^<]*<\\/h2>`, 'gi');
      processedContent = processedContent.replace(h1Pattern, '');
      processedContent = processedContent.replace(h2Pattern, '');
    });
    
    // Final check: remove any remaining H1 tags entirely (to enforce single H1 per page in header)
    processedContent = processedContent.replace(/<h1[^>]*>([^<]+)<\/h1>/gi, '<h2>$1</h2>');
    
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
