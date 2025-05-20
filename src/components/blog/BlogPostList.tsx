
import React from "react";
import BlogPostCard from "./BlogPostCard";
import { BlogPost } from "./types";

interface BlogPostListProps {
  posts: Array<Pick<BlogPost, 'slug' | 'title' | 'titleIT' | 'excerpt' | 'excerptIT' | 'date' | 'dateIT' | 'category' | 'categoryIT' | 'imageUrl' | 'desktopImageUrl' | 'published'>>;
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
