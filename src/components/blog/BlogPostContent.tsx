
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMobile } from "@/hooks/use-mobile";

interface BlogPostContentProps {
  content: string;
}

const BlogPostContent = ({ content }: BlogPostContentProps) => {
  const { language } = useLanguage();
  const isMobile = useMobile();
  const isItalian = language === "it";
  
  const modifiedContent = React.useMemo(() => {
    if (!content) return "";
    
    // Identify Maya Johnson quote in both languages
    const englishQuote = `"The emotional intelligence gap between basic and advanced AI implementations is becoming a major competitive differentiator. Companies leading in this area are seeing significant loyalty improvements because customers feel genuinely understood." — Maya Johnson, Chief Customer Experience Officer at Deloitte Digital`;
    const italianQuote = `"Il divario di intelligenza emotiva tra implementazioni IA di base e avanzate sta diventando un importante fattore differenziante competitivo. Le aziende leader in quest'area stanno vedendo significativi miglioramenti nella fedeltà perché i clienti si sentono realmente compresi." — Maya Johnson, Chief Customer Experience Officer presso Deloitte Digital`;
    
    const quoteToFind = isItalian ? italianQuote : englishQuote;
    
    // Only proceed if the quote exists in the content
    if (content.includes(quoteToFind)) {
      const imageTag = `
        <div class="my-8">
          <img 
            src="${isMobile ? '/lovable-uploads/967b9111-a691-40f5-ad3f-d35c3981c5ce.png' : '/lovable-uploads/5f69a548-7e6d-43c4-a185-092caea7d41f.png'}" 
            alt="Marketing Transformation" 
            class="w-full rounded-lg shadow-md" 
          />
        </div>
      `;
      
      return content.replace(quoteToFind, `${quoteToFind}${imageTag}`);
    }
    
    return content;
  }, [content, isMobile, isItalian]);
  
  return (
    <article className="bg-white rounded-xl shadow-md p-6 md:p-10 mb-12">
      <div 
        className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-a:text-primary prose-a:font-medium prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-4 prose-blockquote:rounded-md prose-blockquote:text-gray-700 prose-blockquote:italic prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: modifiedContent }}
      />
      
      <style jsx global>{`
        .prose p {
          text-align: justify;
          color: rgb(75 85 99);
        }
        .prose li {
          text-align: justify;
          color: rgb(75 85 99);
        }
      `}</style>
    </article>
  );
};

export default BlogPostContent;
