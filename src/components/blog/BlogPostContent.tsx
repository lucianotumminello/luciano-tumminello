
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
    const isTargetPost = content.includes("Beyond Pattern Recognition") || 
                         content.includes("Q2 2025") ||
                         content.includes("New Wave of AI");
    console.log("Is target blog post (April 13):", isTargetPost);
    
    // First apply general processing
    let processedContent = optimizeImagesInContent(content, isMobile);
    
    // Then handle the special case for April 13 post
    if (isTargetPost) {
      console.log("Using dedicated component for April 13 blog post");
      // Use the dedicated component for April 13 blog post
      return AprilBlogPostContent({ content: processedContent });
    }
    
    // Finally, ensure outgoing links exist in all posts
    return ensureOutgoingLinks(processedContent);
  }, [content, isMobile, isItalian]);
  
  // Effect to ensure proper image visibility after rendering
  React.useEffect(() => {
    const isTargetPost = content && (
      content.includes("Beyond Pattern Recognition") || 
      content.includes("Q2 2025") ||
      content.includes("New Wave of AI") ||
      content.includes("The Human + Tech Equation") // Add this new post to special handling
    );
    
    if (isTargetPost) {
      updateImageVisibility(isTargetPost, isMobile);
      
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
