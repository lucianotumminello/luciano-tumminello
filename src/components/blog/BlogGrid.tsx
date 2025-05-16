
import React from "react";
import BlogPostCard from "./BlogPostCard";

interface BlogGridProps {
  posts: Array<any>;
  formatDate: (dateStr: string) => string;
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts, formatDate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {posts.map((post, index) => (
        <BlogPostCard 
          key={post.slug || index} 
          post={post} 
          formatDate={formatDate} 
        />
      ))}
    </div>
  );
};

export default BlogGrid;
