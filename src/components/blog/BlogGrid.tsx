
import React from "react";
import BlogPostCard from "./BlogPostCard";

interface BlogGridProps {
  posts: Array<any>;
  formatDate: (dateStr: string) => string;
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts, formatDate }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No blog posts available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
