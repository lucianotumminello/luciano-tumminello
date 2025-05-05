
import React, { lazy, Suspense, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import { useLanguage } from "@/contexts/LanguageContext";

// Lazy load components that are not immediately visible
const BlogPostContent = lazy(() => import("@/components/blog/BlogPostContent"));
const BlogPostFooter = lazy(() => import("@/components/blog/BlogPostFooter"));
const ShareButtons = lazy(() => import("@/components/blog/ShareButtons"));

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
  const isItalian = language === "it";
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  // Preload content after initial render but before scrolling
  useEffect(() => {
    // Use requestIdleCallback to load content during idle time
    const idleLoadContent = () => {
      setIsContentLoaded(true);
    };
    
    if ('requestIdleCallback' in window) {
      // Use requestIdleCallback if available
      const idleCallbackId = requestIdleCallback(idleLoadContent, { timeout: 2000 });
      return () => cancelIdleCallback(idleCallbackId);
    } else {
      // Fallback to setTimeout
      const timeoutId = setTimeout(idleLoadContent, 200);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  // Use intersection observer for lazy loading footer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsFooterVisible(true);
          observer.disconnect();
        }
      });
    }, {
      rootMargin: '200px', // Start loading 200px before it comes into view
      threshold: 0.01
    });
    
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
        authorImageUrl={post.authorImageUrl}
        imageUrl={post.imageUrl}
        desktopImageUrl={post.desktopImageUrl}
      />
      
      {isContentLoaded ? (
        <Suspense fallback={
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-100 rounded-md w-full"></div>
            <div className="h-4 bg-gray-100 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded-md w-5/6"></div>
          </div>
        }>
          <BlogPostContent 
            content={isItalian ? post.contentIT : post.content} 
          />
        </Suspense>
      ) : (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-100 rounded-md w-full"></div>
          <div className="h-4 bg-gray-100 rounded-md w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded-md w-5/6"></div>
        </div>
      )}
      
      {/* Footer visibility trigger element */}
      <div id="blog-post-footer-trigger" className="h-1 w-full" aria-hidden="true"></div>
      
      {isFooterVisible && (
        <Suspense fallback={<div className="h-20" aria-hidden="true"></div>}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <BlogPostFooter 
              tags={isItalian ? post.tagsIT : post.tags}
              authorName={post.author}
              authorImageUrl={post.authorImageUrl}
              translationPrefix={isItalian ? "it" : "en"}
            />
            
            <div className="md:ml-auto">
              <ShareButtons 
                pageUrl={pageUrl}
                title={isItalian ? post.titleIT : post.title}
                translationPrefix={isItalian ? "it" : "en"}
              />
            </div>
          </div>
        </Suspense>
      )}
      
      <div className="mt-10 text-center">
        <Link to="/blog">
          <Button variant="secondary" className="px-6">
            {isItalian ? "Leggi Altri Articoli" : "Read More Articles"}
          </Button>
        </Link>
      </div>
    </>
  );
};

export default BlogPostContainer;
