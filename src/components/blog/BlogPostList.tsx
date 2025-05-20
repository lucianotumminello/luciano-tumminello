
import React from "react";
import BlogPostCard from "./BlogPostCard";

interface BlogPostListProps {
  posts: Array<{
    slug?: string;
    title: string;
    titleIT: string;
    excerpt: string;
    excerptIT: string;
    date: string;
    dateIT: string;
    category: string;
    categoryIT: string;
    imageUrl: string;
    desktopImageUrl?: string;
    published?: boolean;
  }>;
  isItalian: boolean;
  formatDate: (dateStr: string) => string;
}

const BlogPostList = ({ posts, isItalian, formatDate }: BlogPostListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {posts.map((post, index) => (
        <BlogPostCard 
          key={index} 
          post={post} 
          isItalian={isItalian} 
          formatDate={formatDate}
        />
      ))}
    </div>
  );
};

export default BlogPostList;
