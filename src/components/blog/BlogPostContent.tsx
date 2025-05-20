
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
  const [translatedContent, setTranslatedContent] = React.useState<string>(content || "");
  
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
  
  // Detection for the Agile Backbone blog post
  const isAgileBackbonePost = React.useMemo(() => {
    return content && (
      content.includes("The Agile Backbone") || 
      content.includes("Building Resilient and Adaptive") ||
      content.includes("agile-backbone") ||
      content.includes("La Spina Dorsale Agile")
    );
  }, [content]);
  
  // Generate a unique content key for the specific blog post
  const contentKey = React.useMemo(() => {
    if (isHumanTechEquationPost) {
      return `human-tech-equation-${language}`;
    } else if (isAgileBackbonePost) {
      return `agile-backbone-${language}`;
    } else {
      return `blog-content-${Math.random().toString(36).substring(7)}`;
    }
  }, [isHumanTechEquationPost, isAgileBackbonePost, language]);
  
  React.useEffect(() => {
    // For special blog posts, always use the full translation from translateText
    if ((isHumanTechEquationPost || isAgileBackbonePost) && isItalian && content) {
      const translate = async () => {
        try {
          console.log(`Loading full Italian translation for ${isHumanTechEquationPost ? 'Human + Tech Equation' : 'Agile Backbone'} blog post`);
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
  }, [content, isItalian, isHumanTechEquationPost, isAgileBackbonePost]);
  
  // Process and enhance the content for proper display
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
  }, [translatedContent, isMobile, isHumanTechEquationPost]);
  
  // Effect to ensure proper image visibility after rendering
  React.useEffect(() => {
    if (isHumanTechEquationPost || isAgileBackbonePost) {
      updateImageVisibility(true, isMobile);
      
      // Additional force-update in case the previous call didn't work
      setTimeout(() => {
        updateImageVisibility(true, isMobile);
      }, 500);
      
      // Additional fix for nested lists
      const fixNestedLists = () => {
        const nestedLists = document.querySelectorAll('li > ul, li > ol');
        nestedLists.forEach(list => {
          list.setAttribute('style', 'display: block !important; margin-top: 0.5rem; visibility: visible !important;');
        });
        
        // Ensure all list items are properly displayed
        const listItems = document.querySelectorAll('ul > li, ol > li');
        listItems.forEach(item => {
          item.setAttribute('style', 'display: list-item !important; visibility: visible !important;');
        });
        
        // Fix parent lists
        const parentLists = document.querySelectorAll('ul, ol');
        parentLists.forEach(list => {
          list.setAttribute('style', 'display: block !important; visibility: visible !important;');
        });
        
        // Fix heading styles to ensure consistent formatting
        const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
        headings.forEach(heading => {
          heading.classList.add('font-bold', 'mt-6', 'mb-3');
          
          if (heading.tagName === 'H2') {
            heading.classList.add('text-2xl', 'text-gray-800', 'border-b', 'border-gray-200', 'pb-2');
          } else if (heading.tagName === 'H3') {
            heading.classList.add('text-xl', 'text-gray-700');
          }
        });
        
        // Fix image display
        const images = document.querySelectorAll('.prose img');
        images.forEach(img => {
          img.setAttribute('style', 'display: block !important; visibility: visible !important; max-width: 100%; height: auto; margin: 1.5rem auto;');
        });
      };
      
      fixNestedLists();
      setTimeout(fixNestedLists, 1000);
    }
  }, [content, isMobile, isHumanTechEquationPost, isAgileBackbonePost, language]);
  
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
