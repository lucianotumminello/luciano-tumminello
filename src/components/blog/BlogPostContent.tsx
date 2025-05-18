
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
  
  // Enhanced detection for the Human + Tech Equation blog post
  const isHumanTechEquationPost = React.useMemo(() => {
    return content && (
      content.includes("Human + Tech Equation") || 
      content.includes("workforce-digital-transformation") || 
      content.includes("Empowering Your Workforce") ||
      content.includes("human-tech-equation") ||
      content.includes("L'Equazione Umano + Tecnologia") ||
      content.includes("L'equazione tra uomo e tecnologia")
    );
  }, [content]);
  
  // Generate a unique content key for the specific blog post
  const contentKey = isHumanTechEquationPost ? 
    `human-tech-equation-${language}` : 
    `blog-content-${Math.random().toString(36).substring(7)}`;
  
  React.useEffect(() => {
    // For the target blog post, always use the full translation from translateText
    if (isHumanTechEquationPost && isItalian && content) {
      const translate = async () => {
        try {
          console.log("Loading full Italian translation for Human + Tech Equation blog post");
          const result = await translateText(content, 'en', 'it');
          console.log("Translation completed, length:", result.length);
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
    
    // First apply general processing
    let processedContent = optimizeImagesInContent(translatedContent, isMobile);
    
    // Then handle the special case for the Human + Tech Equation post
    if (isHumanTechEquationPost) {
      console.log("Using dedicated component for Human + Tech Equation blog post");
      // Use the dedicated component for the target blog post
      return AprilBlogPostContent({ content: processedContent });
    }
    
    // Finally, ensure outgoing links exist in all posts
    return ensureOutgoingLinks(processedContent);
  }, [translatedContent, isMobile, isItalian, isHumanTechEquationPost]);
  
  // Effect to ensure proper image visibility after rendering
  React.useEffect(() => {
    if (isHumanTechEquationPost) {
      updateImageVisibility(true, isMobile);
      
      // Additional force-update in case the previous call didn't work
      setTimeout(() => {
        updateImageVisibility(true, isMobile);
      }, 500);
    }
  }, [content, isMobile, isHumanTechEquationPost]);
  
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
