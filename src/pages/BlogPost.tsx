
import { useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import BlogPostContainer from "@/components/blog/BlogPostContainer";
import NotFoundMessage from "@/components/blog/NotFoundMessage";
import { useEffect } from "react";
import { trackPageView } from "@/utils/analytics";
import { getBlogPost } from "@/utils/blog"; // Updated import path

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getBlogPost(slug) : null;
  const { language } = useLanguage();
  const isItalian = language === "it";
  
  useEffect(() => {
    // Track specific blog post view
    if (post) {
      trackPageView(
        `/blog/${slug}`, 
        `${isItalian ? post.titleIT : post.title} | Luciano Tumminello`
      );
    }
  }, [slug, post, isItalian]);
  
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
