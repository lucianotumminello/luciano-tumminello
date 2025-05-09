
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">{translationPrefix === "it" ? "Chi sono" : "About the Author"}</h3>
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="h-12 w-12 mr-3">
            <AvatarImage src={authorImageUrl} alt={authorName} />
            <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium mb-2">{authorName}</p>
            <p className="text-sm text-gray-600">
              {translationPrefix === "it" 
                ? "Leader nel marketing e nelle operazioni con esperienza in trasformazione digitale, operazioni globali e strategie di marketing basate sui dati." 
                : "Marketing & Operations Leader with expertise in digital transformation, global operations, and data-driven marketing strategies."}
            </p>
          </div>
        </div>
        <div className="text-right">
          <Link to="/contact" className="text-primary text-sm hover:underline">
            {translationPrefix === "it" 
              ? "Contattami per maggiori informazioni su questo argomento" 
              : "Contact me for more information on this topic"}
          </Link>
        </div>
      </div>
      
      <Separator className="my-6" />
      
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
