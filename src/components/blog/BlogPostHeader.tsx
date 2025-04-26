
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogPostHeaderProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
  authorImageUrl: string;
  imageUrl: string;
  desktopImageUrl: string;
}

const BlogPostHeader = ({
  title,
  excerpt,
  category,
  date,
  readingTime,
  author,
  authorImageUrl,
  imageUrl,
  desktopImageUrl,
}: BlogPostHeaderProps) => {
  return (
    <div className="mb-8">
      <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Blog
      </Link>
      
      <Card className="mb-8 overflow-hidden border-0 shadow-lg">
        <div className="w-full">
          <AspectRatio ratio={16/9} className="bg-gray-100">
            <picture>
              {/* Desktop image (displayed at 768px and above) */}
              <source media="(min-width: 768px)" srcSet={desktopImageUrl} />
              {/* Mobile image (displayed below 768px) */}
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover"
                loading="eager"
              />
            </picture>
          </AspectRatio>
        </div>
        
        <CardContent className="p-8 bg-white">
          <div className="flex flex-wrap items-center gap-4 mb-6 border-b border-gray-100 pb-6">
            <span className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium">
              {category}
            </span>
            
            <div className="flex items-center text-gray-500">
              <CalendarIcon className="h-4 w-4 mr-2" />
              {date}
            </div>
            
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              {readingTime}
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-4 leading-relaxed text-justify">
            {excerpt}
          </p>
          
          <div className="flex items-center mt-6">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={authorImageUrl} alt={author} />
              <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{author}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPostHeader;
