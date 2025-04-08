
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostFooter from "@/components/blog/BlogPostFooter";
import ShareButtons from "@/components/blog/ShareButtons";
import { useLanguage } from "@/contexts/LanguageContext";

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
      
      <BlogPostContent 
        content={isItalian ? post.contentIT : post.content} 
      />
      
      <div className="flex justify-between items-center mb-6">
        <BlogPostFooter 
          tags={isItalian ? post.tagsIT : post.tags}
          authorName={post.author}
          authorImageUrl={post.authorImageUrl}
          translationPrefix={isItalian ? "it" : "en"}
        />
        
        <div className="ml-auto">
          <ShareButtons 
            pageUrl={pageUrl}
            title={isItalian ? post.titleIT : post.title}
            translationPrefix={isItalian ? "it" : "en"}
          />
        </div>
      </div>
      
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
