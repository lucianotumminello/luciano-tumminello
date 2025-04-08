
import { useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import BlogPostContainer from "@/components/blog/BlogPostContainer";
import NotFoundMessage from "@/components/blog/NotFoundMessage";
import blogPostsData from "@/data/blogPostsData";

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? blogPostsData[slug] : null;
  const { language } = useLanguage();
  const isItalian = language === "it";
  
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

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": isItalian ? post.titleIT : post.title,
    "image": fullImageUrl,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Luciano Tumminello",
      "logo": {
        "@type": "ImageObject",
        "url": "https://luciano-tumminello.com/logo.png"
      }
    },
    "datePublished": post.date,
    "description": isItalian ? post.excerptIT : post.excerpt
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
