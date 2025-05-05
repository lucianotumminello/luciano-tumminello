
import React, { lazy, Suspense, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const isItalian = language === "it";
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [isIntersectionSupported, setIsIntersectionSupported] = useState(false);

  // Check for IntersectionObserver support on mount
  useEffect(() => {
    setIsIntersectionSupported('IntersectionObserver' in window);
  }, []);

  // Only load content when needed - deferred loading for mobile
  useEffect(() => {
    const loadContentStrategy = () => {
      // Use different timing strategy for mobile vs desktop
      if (isMobile) {
        // For mobile, load content after a small delay to improve TTI
        setTimeout(() => setIsContentLoaded(true), 200);
      } else {
        // For desktop, load content during idle time
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => setIsContentLoaded(true), { timeout: 2000 });
        } else {
          setTimeout(() => setIsContentLoaded(true), 100);
        }
      }
    };
    
    loadContentStrategy();
  }, [isMobile]);

  // Use intersection observer for lazy loading footer - with fallback
  useEffect(() => {
    // Skip if no IntersectionObserver support
    if (!isIntersectionSupported) {
      // Use scroll event as fallback with throttling
      let scrollTimeout: number;
      const handleScroll = () => {
        if (scrollTimeout) return;
        
        scrollTimeout = window.setTimeout(() => {
          const element = document.getElementById('blog-post-footer-trigger');
          if (!element) return;
          
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight + 200) {
            setIsFooterVisible(true);
            window.removeEventListener('scroll', handleScroll);
          }
          scrollTimeout = 0;
        }, 200);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.clearTimeout(scrollTimeout);
      };
    }
    
    // Use IntersectionObserver if supported
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsFooterVisible(true);
          observer.disconnect();
        }
      });
    }, {
      rootMargin: isMobile ? '50px' : '200px', // Smaller margin on mobile
      threshold: 0.01
    });
    
    const element = document.getElementById('blog-post-footer-trigger');
    if (element) observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [isIntersectionSupported, isMobile]);

  // Mobile-optimized fallback content
  const renderContentSkeleton = () => (
    <div className="animate-pulse space-y-2 md:space-y-4">
      <div className="h-3 md:h-4 bg-gray-100 rounded-md w-full"></div>
      <div className="h-3 md:h-4 bg-gray-100 rounded-md w-3/4"></div>
      <div className="h-3 md:h-4 bg-gray-100 rounded-md w-5/6"></div>
    </div>
  );

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
        <Suspense fallback={renderContentSkeleton()}>
          <BlogPostContent 
            content={isItalian ? post.contentIT : post.content} 
          />
        </Suspense>
      ) : renderContentSkeleton()}
      
      {/* Footer visibility trigger element */}
      <div 
        id="blog-post-footer-trigger" 
        className="h-1 w-full" 
        aria-hidden="true"
        style={{ contain: 'strict', containIntrinsicSize: '0 1px' }}
      ></div>
      
      {isFooterVisible && (
        <Suspense fallback={<div className="h-16 md:h-20" aria-hidden="true"></div>}>
          <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 ${isMobile ? 'below-fold' : ''}`}>
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
      
      <div className={`mt-8 md:mt-10 text-center ${isMobile ? 'below-fold' : ''}`}>
        <Link to="/blog">
          <Button variant="secondary" className="px-4 py-2 md:px-6">
            {isItalian ? "Leggi Altri Articoli" : "Read More Articles"}
          </Button>
        </Link>
      </div>
    </>
  );
};

export default BlogPostContainer;
