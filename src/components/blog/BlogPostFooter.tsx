
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

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
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">{translationPrefix === "it" ? "Argomenti" : "Topics"}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-2 rounded-full text-sm text-gray-600">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="flex items-center">
        <Avatar className="h-12 w-12 mr-3">
          <AvatarImage src="/lovable-uploads/16736ca3-cf96-42d8-8e9b-214d90395f88.png" alt={authorName} />
          <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-gray-500">{translationPrefix === "it" ? "Scritto da" : "Written by"}</p>
          <p className="font-medium">{authorName}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostFooter;
