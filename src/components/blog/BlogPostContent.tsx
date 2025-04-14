
import React from "react";

interface BlogPostContentProps {
  content: string;
}

const BlogPostContent = ({ content }: BlogPostContentProps) => {
  return (
    <article className="bg-white rounded-xl shadow-md p-6 md:p-10 mb-12">
      <div 
        className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-a:text-primary prose-a:font-medium prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-4 prose-blockquote:rounded-md prose-blockquote:text-gray-700 prose-blockquote:italic prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      <style jsx global>{`
        .prose p {
          text-align: justify;
          color: rgb(75 85 99);
        }
        .prose li {
          text-align: justify;
          color: rgb(75 85 99);
        }
      `}</style>
    </article>
  );
};

export default BlogPostContent;
