
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";

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
  
  // Add useEffect to ensure images are properly loaded and displayed
  useEffect(() => {
    // Function to update image visibility based on screen size
    const updateImageVisibility = () => {
      const desktopImg = document.getElementById("blog-desktop-image");
      const mobileImg = document.getElementById("blog-mobile-image");
      
      if (desktopImg && mobileImg) {
        if (window.innerWidth <= 768) {
          desktopImg.style.display = "none";
          mobileImg.style.display = "block";
        } else {
          desktopImg.style.display = "block";
          mobileImg.style.display = "none";
        }
      }
    };
    
    // Call initially
    updateImageVisibility();
    
    // Set up listener for window resizes
    window.addEventListener("resize", updateImageVisibility);
    
    // Add a small delay to ensure images are properly displayed after render
    const timer = setTimeout(updateImageVisibility, 100);
    
    // Additional force updates at different intervals
    const additionalTimers = [500, 1000, 2000].map(delay => 
      setTimeout(updateImageVisibility, delay)
    );
    
    return () => {
      window.removeEventListener("resize", updateImageVisibility);
      clearTimeout(timer);
      additionalTimers.forEach(clearTimeout);
    };
  }, [isMobile]);
  
  // Force reload images with timestamp to prevent caching
  const timestamp = new Date().getTime();
  const desktopImageWithCache = `${desktopImageUrl}?t=${timestamp}`;
  const mobileImageWithCache = `${imageUrl}?t=${timestamp}`;
  
  return (
    <div className="mb-8">
      <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {isItalian ? "Torna al Blog" : "Back to Blog"}
      </Link>
      
      <Card className="mb-8 overflow-hidden border-0 shadow-lg blog-header">
        <div className="w-full">
          <AspectRatio ratio={16/9} className="bg-gray-100 relative">
            {/* Desktop image */}
            <img 
              id="blog-desktop-image"
              src={desktopImageWithCache} 
              alt={title}
              className="w-full h-full object-cover absolute top-0 left-0"
              loading="eager"
              fetchPriority="high"
              width="1200"
              height="675"
            />
            
            {/* Mobile image */}
            <img 
              id="blog-mobile-image"
              src={mobileImageWithCache} 
              alt={title}
              className="w-full h-full object-cover absolute top-0 left-0"
              loading="eager"
              fetchPriority="high"
              width="640"
              height="360"
            />
          </AspectRatio>
        </div>
        
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
          
          {/* Mobile-optimized header text sizes */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
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
    </div>
  );
};

export default BlogPostHeader;
