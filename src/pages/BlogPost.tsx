
import { useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import BlogPostContainer from "@/components/blog/BlogPostContainer";
import NotFoundMessage from "@/components/blog/NotFoundMessage";
import { useEffect, useState } from "react";
import { trackPageView } from "@/utils/analytics";
import { getBlogPost, refreshBlogPosts } from "@/utils/blog"; 

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const isItalian = language === "it";
  
  // Effect to fetch post data when the component mounts or the slug changes
  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        setIsLoading(true);
        try {
          // First refresh all posts from the server
          await refreshBlogPosts();
          
          // Then get the specific post
          const fetchedPost = await getBlogPost(slug);
          setPost(fetchedPost);
          
          if (!fetchedPost) {
            console.log(`Blog post with slug "${slug}" not found`);
          }
        } catch (error) {
          console.error(`Error fetching blog post ${slug}:`, error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchPost();
    
    // Set up refresh mechanisms for cross-device updates
    const handleFocus = () => {
      console.log("Window focus detected, refreshing blog post");
      fetchPost();
    };
    
    const handleStorageUpdate = () => {
      console.log("Blog storage updated, refreshing post");
      fetchPost();
    };
    
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === "blog_posts_server_storage") {
        console.log("LocalStorage updated in another tab/window, refreshing post");
        fetchPost();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blog-storage-updated', handleStorageUpdate);
    window.addEventListener('blog-server-updated', handleStorageUpdate);
    window.addEventListener('storage', handleStorageEvent);
    
    // Periodic check as fallback for cross-device sync
    const interval = setInterval(() => {
      fetchPost();
    }, 60000); // Check every minute
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blog-storage-updated', handleStorageUpdate);
      window.removeEventListener('blog-server-updated', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageEvent);
      clearInterval(interval);
    };
  }, [slug]);
  
  useEffect(() => {
    // Track specific blog post view
    if (post) {
      trackPageView(
        `/blog/${slug}`, 
        `${isItalian ? post.titleIT : post.title} | Luciano Tumminello`
      );
    }
  }, [slug, post, isItalian]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 py-16 px-4">
          <div className="container mx-auto max-w-4xl flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 py-16 px-4">
          <NotFoundMessage isItalian={isItalian} />
        </main>
      </div>
    );
  }

  const pageUrl = window.location.href;
  // Use the desktop image URL for sharing preview as it appears above the title
  const fullImageUrl = new URL(post.desktopImageUrl, window.location.origin).href;

  // Enhanced structured data with more complete information
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": isItalian ? post.titleIT : post.title,
    "image": fullImageUrl,
    "wordCount": (isItalian ? post.contentIT : post.content).split(/\s+/).length,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://www.lucianotumminello.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Luciano Tumminello",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.lucianotumminello.com/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": pageUrl,
    "description": isItalian ? post.excerptIT : post.excerpt,
    "keywords": (isItalian ? post.tagsIT : post.tags).join(", "),
    "articleSection": isItalian ? post.categoryIT : post.category,
    "inLanguage": isItalian ? "it" : "en"
  };

  return (
    <BlogPostLayout
      title={isItalian ? post.titleIT : post.title}
      description={isItalian ? post.excerptIT : post.excerpt}
      imageUrl={fullImageUrl}
      pageUrl={pageUrl}
      keywords={(isItalian ? post.tagsIT : post.tags).join(", ")}
      schemaData={schemaData}
    >
      <BlogPostContainer 
        post={post} 
        pageUrl={pageUrl} 
      />
    </BlogPostLayout>
  );
};

export default BlogPost;
