
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { optimizeImagesInContent, updateImageVisibility } from "@/utils/imageUtils";
import { ensureOutgoingLinks } from "@/utils/blogContentUtils";
import AprilBlogPostContent from "./AprilBlogPostContent";
import BlogPostStyles from "./BlogPostStyles";
import { translateText } from "@/utils/blogUtils";
import TranslatedText from "../TranslatedText";

interface BlogPostContentProps {
  content: string;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ content }) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const isItalian = language === "it";
  const [translatedContent, setTranslatedContent] = React.useState<string>("");
  
  // More reliable detection of the specific Human + Tech Equation blog post
  const isHumanTechEquationPost = 
    content?.includes("Human + Tech Equation") || 
    content?.includes("workforce-digital-transformation") || 
    content?.includes("Empowering Your Workforce") ||
    content?.includes("human-tech-equation");
  
  // Generate a unique content key for the specific blog post
  const contentKey = isHumanTechEquationPost ? 
    `human-tech-equation-${language}` : 
    `blog-content-${Math.random().toString(36).substring(7)}`;
  
  React.useEffect(() => {
    // Only attempt translation for the targeted blog post
    if (isHumanTechEquationPost && isItalian && content) {
      const translate = async () => {
        try {
          console.log("Translating Human + Tech Equation blog post to Italian");
          const result = await translateText(content, 'en', 'it');
          console.log("Translation completed");
          setTranslatedContent(result);
        } catch (error) {
          console.error("Translation error:", error);
          setTranslatedContent(content); // Fallback to original content
        }
      };
      
      translate();
    } else {
      setTranslatedContent(content);
    }
  }, [content, isItalian, isHumanTechEquationPost]);
  
  const modifiedContent = React.useMemo(() => {
    if (!translatedContent) return "";
    
    // Enhanced detection for the special blog post (both original and permanent version)
    const isTargetPost = 
      translatedContent.includes("Beyond Pattern Recognition") || 
      translatedContent.includes("Q2 2025") ||
      translatedContent.includes("New Wave of AI") ||
      translatedContent.includes("AI Revolution") ||
      translatedContent.includes("The Human + Tech Equation") ||
      translatedContent.includes("L'Equazione Umano + Tecnologia") ||
      translatedContent.includes("Empowering Your Workforce") ||
      translatedContent.includes("human-tech-equation") ||
      translatedContent.includes("workforce-digital-transformation");
    
    console.log("Is target blog post:", isTargetPost);
    
    // First apply general processing
    let processedContent = optimizeImagesInContent(translatedContent, isMobile);
    
    // Then handle the special case for the target post
    if (isTargetPost) {
      console.log("Using dedicated component for target blog post");
      // Use the dedicated component for the target blog post
      return AprilBlogPostContent({ content: processedContent });
    }
    
    // Finally, ensure outgoing links exist in all posts
    return ensureOutgoingLinks(processedContent);
  }, [translatedContent, isMobile, isItalian]);
  
  // Effect to ensure proper image visibility after rendering
  React.useEffect(() => {
    const isTargetPost = content && (
      content.includes("Beyond Pattern Recognition") || 
      content.includes("Q2 2025") ||
      content.includes("New Wave of AI") ||
      content.includes("AI Revolution") ||
      content.includes("The Human + Tech Equation") ||
      content.includes("Empowering Your Workforce") ||
      content.includes("L'Equazione Umano + Tecnologia") ||
      content.includes("human-tech-equation") ||
      content.includes("workforce-digital-transformation")
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
      <TranslatedText
        textKey={contentKey}
        fallback={modifiedContent}
        className="prose prose-base max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-a:text-primary prose-a:font-medium"
        as="div"
        dangerouslySetInnerHTML={true}
      />
      <BlogPostStyles />
    </article>
  );
};

export default BlogPostContent;
