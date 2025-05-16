
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const { language } = useLanguage();
  const isItalian = language === "it";
  const isMobile = useIsMobile();
  
  // Format date for consistent display - if it's not already formatted
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    
    try {
      const date = new Date(dateStr);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return dateStr;
      }
      
      // Format to "DD Month YYYY"
      const day = date.getDate();
      const month = date.toLocaleString(isItalian ? 'it-IT' : 'en-US', { month: 'long' });
      const year = date.getFullYear();
      
      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateStr;
    }
  };
  
  const formattedDate = formatDate(date);
  
  return (
    <div className="mb-8">
      <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {isItalian ? "Torna al Blog" : "Back to Blog"}
      </Link>
      
      {/* Title Card - Displayed at the top */}
      <Card className="mb-6 border-0 shadow-lg">
        <CardContent className="p-4 md:p-6 bg-white">
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6 border-b border-gray-100 pb-4 md:pb-6">
            <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium text-sm">
              {category}
            </span>
            
            <div className="flex items-center text-gray-500 whitespace-nowrap text-sm">
              <CalendarIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              {formattedDate}
            </div>
            
            <div className="flex items-center text-gray-500 whitespace-nowrap text-sm">
              <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              {readingTime}
            </div>
          </div>
          
          {/* Main title clearly displayed at the top */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
            {title}
          </h1>
          
          <p className="text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">
            {excerpt}
          </p>
          
          <div className="flex items-center mt-3 md:mt-6">
            <Avatar className="h-8 w-8 mr-2 md:mr-3">
              <AvatarImage src={authorImageUrl} alt={author} />
              <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{author}</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Image Card - Displayed below the title */}
      <Card className="overflow-hidden border-0 shadow-md mb-8">
        <div className="w-full">
          <AspectRatio ratio={16/9} className="bg-gray-100">
            {/* Responsive image with proper loading and display attributes */}
            <img 
              src={isMobile ? imageUrl : desktopImageUrl} 
              alt={title}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              width={isMobile ? "640" : "1200"}
              height={isMobile ? "360" : "675"}
              style={{aspectRatio: "16/9"}}
            />
          </AspectRatio>
        </div>
      </Card>
    </div>
  );
};

export default BlogPostHeader;
