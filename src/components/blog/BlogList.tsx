
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogPost {
  slug: string;
  title: string;
  titleIT?: string;
  excerpt: string;
  excerptIT?: string;
  category: string;
  categoryIT?: string;
  date: string;
  dateIT?: string;
  imageUrl: string;
  desktopImageUrl?: string;
}

interface BlogListProps {
  blogPosts: BlogPost[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  postsPerPage: number;
  formatDate: (date: string) => string;
}

const BlogList: React.FC<BlogListProps> = ({ 
  blogPosts,
  currentPage,
  setCurrentPage,
  postsPerPage,
  formatDate
}) => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {currentPosts.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.slug} className="block">
            <Card className="h-full overflow-hidden transition-transform hover:scale-[1.01] hover:shadow-md">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={isItalian && post.titleIT ? post.titleIT : post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary rounded-full">
                    {isItalian && post.categoryIT ? post.categoryIT : post.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {isItalian && post.dateIT ? formatDate(post.dateIT) : formatDate(post.date)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {isItalian && post.titleIT ? post.titleIT : post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {isItalian && post.excerptIT ? post.excerptIT : post.excerpt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? "bg-primary text-primary-foreground" : ""}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
