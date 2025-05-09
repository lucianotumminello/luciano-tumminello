
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface BlogPostFooterProps {
  tags: string[];
  authorName: string;
  authorImageUrl: string;
  translationPrefix: string;
}

const BlogPostFooter = ({
  tags,
  authorName,
  authorImageUrl,
  translationPrefix,
}: BlogPostFooterProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">{translationPrefix === "it" ? "Argomenti" : "Topics"}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Link 
              to={`/blog?tag=${tag}`} 
              key={index} 
              className="bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-2 rounded-full text-sm text-gray-600"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostFooter;
