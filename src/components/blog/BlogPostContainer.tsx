
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostFooter from "@/components/blog/BlogPostFooter";
import ShareButtons from "@/components/blog/ShareButtons";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface BlogPostContainerProps {
  post: {
    title: string;
    titleIT: string;
    excerpt: string;
    excerptIT: string;
    content: string;
    contentIT: string;
    author: string;
    authorImageUrl: string;
    date: string;
    dateIT: string;
    category: string;
    categoryIT: string;
    imageUrl: string;
    desktopImageUrl: string;
    readingTime: string;
    readingTimeIT: string;
    tags: string[];
    tagsIT: string[];
  };
  pageUrl: string;
}

const BlogPostContainer = ({ post, pageUrl }: BlogPostContainerProps) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const isItalian = language === "it";
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  
  // Ensure author image URL is valid and consistent
  const authorImageUrl = post.authorImageUrl || "/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png";
  
  // Ensure image URLs are valid
  const imageUrl = post.imageUrl || "/lovable-uploads/774dee17-e52b-4ce1-aedc-5467f7d73e4e.png";
  const desktopImageUrl = post.desktopImageUrl || "/lovable-uploads/b54e2da2-5be2-4293-a2ba-77f343e1c1ad.png";
  
  // Simplified intersection observer for better mobile performance
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      setIsFooterVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsFooterVisible(true);
          observer.disconnect();
        }
      });
    }, { rootMargin: '100px' });
    
    const element = document.getElementById('blog-post-footer-trigger');
    if (element) observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <BlogPostHeader 
        title={isItalian ? post.titleIT : post.title}
        excerpt={isItalian ? post.excerptIT : post.excerpt}
        category={isItalian ? post.categoryIT : post.category}
        date={isItalian ? post.dateIT : post.date}
        readingTime={isItalian ? post.readingTimeIT : post.readingTime}
        author={post.author}
        authorImageUrl={authorImageUrl}
        imageUrl={isMobile ? imageUrl : desktopImageUrl}
        desktopImageUrl={desktopImageUrl}
      />
      
      <BlogPostContent 
        content={isItalian ? post.contentIT : post.content} 
      />
      
      {/* Moved: Read More Articles button - placed after content but before footer */}
      <div className="mt-8 mb-12 text-center">
        <Link to="/blog">
          <Button variant="secondary" className="px-4 py-2">
            {isItalian ? "Leggi Altri Articoli" : "Read More Articles"}
          </Button>
        </Link>
      </div>
      
      {/* Footer visibility trigger element */}
      <div 
        id="blog-post-footer-trigger" 
        className="h-1 w-full" 
        aria-hidden="true"
      ></div>
      
      {isFooterVisible && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="w-full md:w-2/3">
              <BlogPostFooter 
                tags={isItalian ? post.tagsIT : post.tags}
                authorName={post.author}
                authorImageUrl={authorImageUrl}
                translationPrefix={isItalian ? "it" : "en"}
              />
            </div>
            
            <div className="md:ml-auto">
              <ShareButtons 
                pageUrl={pageUrl}
                title={isItalian ? post.titleIT : post.title}
                translationPrefix={isItalian ? "it" : "en"}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BlogPostContainer;
