
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

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
  formatDate: (dateStr: string) => string;
}

const BlogList = ({ posts, lastRefresh, formatDate }: BlogListProps) => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {posts.map((post, index) => (
        <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="relative aspect-[16/9] overflow-hidden">
            {/* Add force refresh cache busting to images */}
            <img 
              src={`${isMobile ? post.imageUrl : (post.desktopImageUrl || post.imageUrl)}?t=${lastRefresh}`} 
              alt={isItalian ? post.titleIT : post.title} 
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              loading={index < 2 ? "eager" : "lazy"}
              fetchPriority={index < 2 ? "high" : "auto"}
            />
          </div>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
              <span className="bg-gray-100 px-2 py-1 rounded-full">
                {isItalian ? post.categoryIT : post.category}
              </span>
              <span>•</span>
              <div className="flex items-center whitespace-nowrap">
                <CalendarIcon className="h-3 w-3 mr-1" />
                {formatDate(isItalian ? post.dateIT : post.date)}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
              {'slug' in post ? (
                <Link to={`/blog/${post.slug}`}>{isItalian ? post.titleIT : post.title}</Link>
              ) : (
                isItalian ? post.titleIT : post.title
              )}
            </h2>
            <p className="text-gray-600 mb-4 text-justify">{isItalian ? post.excerptIT : post.excerpt}</p>
            {'slug' in post ? (
              <Link to={`/blog/${post.slug}`} className="text-primary font-medium text-sm hover:underline">
                {isItalian ? "Leggi di più →" : "Read More →"}
              </Link>
            ) : (
              <span className="text-gray-400 font-medium text-sm">
                {isItalian ? "Prossimamente..." : "Coming Soon..."}
              </span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogList;
