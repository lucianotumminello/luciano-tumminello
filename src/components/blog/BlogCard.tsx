
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogCardProps {
  post: {
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
  };
  index: number;
  formatDate: (dateStr: string) => string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index, formatDate }) => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  
  return (
    <Card className="overflow-hidden border border-gray-100 shadow hover:shadow-md transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.imageUrl || (post.desktopImageUrl || "")} 
          alt={isItalian ? post.titleIT : post.title} 
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          loading={index < 2 ? "eager" : "lazy"}
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
          <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded">
            {isItalian ? post.categoryIT : post.category}
          </span>
          <span>•</span>
          <div className="flex items-center">
            <CalendarIcon className="h-3 w-3 mr-1" />
            {formatDate(isItalian ? post.dateIT : post.date)}
          </div>
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {'slug' in post ? (
            <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
              {isItalian ? post.titleIT : post.title}
            </Link>
          ) : (
            isItalian ? post.titleIT : post.title
          )}
        </h2>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{isItalian ? post.excerptIT : post.excerpt}</p>
        {'slug' in post ? (
          <Link to={`/blog/${post.slug}`} className="text-primary font-medium text-sm hover:underline">
            {isItalian ? "Leggi di più →" : "Read More →"}
          </Link>
        ) : (
          <span className="text-gray-400 font-medium text-sm">
            {isItalian ? "Leggi di più →" : "Read More →"}
          </span>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogCard;
