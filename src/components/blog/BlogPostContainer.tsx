
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostFooter from "@/components/blog/BlogPostFooter";
import ShareButtons from "@/components/blog/ShareButtons";

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

const BlogPostContainer: React.FC<BlogPostContainerProps> = ({ post, pageUrl }) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const isItalian = language === "it";

  // Determine which content to display based on the selected language
  const title = isItalian ? post.titleIT : post.title;
  const excerpt = isItalian ? post.excerptIT : post.excerpt;
  const content = isItalian ? post.contentIT : post.content;
  const category = isItalian ? post.categoryIT : post.category;
  const date = isItalian ? post.dateIT : post.date;
  const readingTime = isItalian ? post.readingTimeIT : post.readingTime;
  const tags = isItalian ? post.tagsIT : post.tags;

  return (
    <div className="bg-white rounded-lg shadow p-0 md:p-6">
      <BlogPostHeader 
        title={title}
        excerpt={excerpt}
        category={category}
        date={date}
        readingTime={readingTime}
        author={post.author}
        authorImageUrl={post.authorImageUrl}
        imageUrl={post.imageUrl}
        desktopImageUrl={post.desktopImageUrl}
      />
      
      <BlogPostContent content={content} />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-2/3">
          <BlogPostFooter 
            tags={tags}
            authorName={post.author}
            authorImageUrl={post.authorImageUrl}
            translationPrefix={isItalian ? "it" : "en"}
          />
        </div>
        
        <div className="md:ml-auto">
          <ShareButtons 
            pageUrl={pageUrl}
            title={title}
            translationPrefix={isItalian ? "it" : "en"}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPostContainer;
