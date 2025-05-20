
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogListProps {
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
    desktopImageUrl: string;
    [key: string]: any;
  }>;
  lastRefresh: number;
  formatDate: (date: string) => string;
}

const BlogList: React.FC<BlogListProps> = ({ posts, lastRefresh, formatDate }) => {
  const { language } = useLanguage();
  const isItalian = language === "it";

  // Force update of images with timestamp to prevent caching
  const getImageWithCache = (imageUrl: string) => {
    return `${imageUrl}?t=${lastRefresh}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {posts.map((post, index) => {
        const title = isItalian ? post.titleIT : post.title;
        const excerpt = isItalian ? post.excerptIT : post.excerpt;
        const date = isItalian ? post.dateIT : post.date;
        const category = isItalian ? post.categoryIT : post.category;
        const formattedDate = formatDate(date);
        
        // For placeholder posts (without slug), render a disabled card
        if (!post.slug) {
          return (
            <Card key={`placeholder-${index}`} className="overflow-hidden h-full opacity-75">
              <div className="relative">
                <AspectRatio ratio={16 / 9} className="bg-gray-100">
                  <img
                    src={getImageWithCache(post.imageUrl)}
                    alt={title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </AspectRatio>
                <div className="absolute top-4 right-4">
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {category}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold line-clamp-2 mb-2">{title}</h3>
                <p className="text-gray-600 line-clamp-3 mb-2 text-sm">{excerpt}</p>
                <p className="text-gray-400 text-sm">{formattedDate}</p>
              </CardContent>
            </Card>
          );
        }
        
        // For real posts with slug, render a clickable card
        return (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="block h-full">
            <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
              <div className="relative">
                <AspectRatio ratio={16 / 9} className="bg-gray-100">
                  <img
                    src={getImageWithCache(post.imageUrl)}
                    alt={title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </AspectRatio>
                <div className="absolute top-4 right-4">
                  <span className="bg-primary bg-opacity-90 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                    {category}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold line-clamp-2 mb-2">{title}</h3>
                <p className="text-gray-600 line-clamp-3 mb-2 text-sm">{excerpt}</p>
                <p className="text-gray-500 text-sm">{formattedDate}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;
