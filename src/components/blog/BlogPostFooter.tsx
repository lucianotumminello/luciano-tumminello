
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
      {/* About the Author Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {translationPrefix === "it" ? "Chi è l'autore" : "About the Author"}
        </h2>
        <p className="text-gray-600 mb-4">
          Luciano Tumminello has over 15 years of experience driving growth across Asia-Pacific, specializing in
          marketing, operations, and digital transformation, with a growing focus on leveraging artificial
          intelligence. With a proven track record of leading strategic initiatives and delivering measurable
          results, Luciano helps organizations navigate the complex intersection of technology and business
          leadership.
        </p>
        
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={authorImageUrl} alt={authorName} />
              <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-gray-500">
                {translationPrefix === "it" ? "Scritto da" : "Written by"}
              </p>
              <p className="font-medium">{authorName}</p>
            </div>
          </div>
          <div className="text-right">
            <Link to="/contact" className="text-blue-600 hover:text-blue-800 transition-colors">
              {translationPrefix === "it" ? "Contattami" : "Contact me"}
            </Link>
            <span className="text-gray-600"> {translationPrefix === "it" ? "per ulteriori informazioni su questo argomento." : "for more information on this topic."}</span>
          </div>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      {/* Topics Section */}
      <div>
        <h3 className="text-xl font-semibold mb-3">{translationPrefix === "it" ? "Argomenti" : "Topics"}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-2 rounded-full text-sm text-gray-600">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostFooter;
