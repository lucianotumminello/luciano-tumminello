
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
  
  // Function to ensure absolute URLs
  const getAbsoluteUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    return `${window.location.origin}${url}`;
  };
  
  // Processed post data with absolute URLs
  const processedPost = {
    ...post,
    authorImageUrl: getAbsoluteUrl(post.authorImageUrl),
    imageUrl: getAbsoluteUrl(post.imageUrl),
    desktopImageUrl: getAbsoluteUrl(post.desktopImageUrl)
  };
  
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
        title={isItalian ? processedPost.titleIT : processedPost.title}
        excerpt={isItalian ? processedPost.excerptIT : processedPost.excerpt}
        category={isItalian ? processedPost.categoryIT : processedPost.category}
        date={isItalian ? processedPost.dateIT : processedPost.date}
        readingTime={isItalian ? processedPost.readingTimeIT : processedPost.readingTime}
        author={processedPost.author}
        authorImageUrl={processedPost.authorImageUrl}
        imageUrl={processedPost.imageUrl}
        desktopImageUrl={processedPost.desktopImageUrl}
      />
      
      <BlogPostContent 
        content={isItalian ? processedPost.contentIT : processedPost.content} 
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
                tags={isItalian ? processedPost.tagsIT : processedPost.tags}
                authorName={processedPost.author}
                authorImageUrl={processedPost.authorImageUrl}
                translationPrefix={isItalian ? "it" : "en"}
              />
            </div>
            
            <div className="md:ml-auto">
              <ShareButtons 
                pageUrl={pageUrl}
                title={isItalian ? processedPost.titleIT : processedPost.title}
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
