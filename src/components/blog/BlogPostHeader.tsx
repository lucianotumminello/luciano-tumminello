
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
  
  // Force image loading and visibility on component mount
  useEffect(() => {
    const timestamp = Date.now();
    
    // Force reload all images
    const loadAndForceImages = () => {
      console.log("Forcing image refresh with timestamp:", timestamp);
      
      // Create new image elements to force browser to load fresh copies
      const preloadDesktopImage = new Image();
      preloadDesktopImage.src = `${desktopImageUrl}?t=${timestamp}`;
      
      const preloadMobileImage = new Image();
      preloadMobileImage.src = `${imageUrl}?t=${timestamp}`;
      
      // Update existing images in the DOM
      setTimeout(() => {
        const desktopImg = document.querySelector('.desktop-blog-image') as HTMLImageElement;
        const mobileImg = document.querySelector('.mobile-blog-image') as HTMLImageElement;
        
        if (desktopImg) {
          desktopImg.src = `${desktopImageUrl}?t=${timestamp}`;
          desktopImg.style.display = isMobile ? 'none' : 'block';
          console.log("Desktop image updated:", desktopImg.src);
        }
        
        if (mobileImg) {
          mobileImg.src = `${imageUrl}?t=${timestamp}`;
          mobileImg.style.display = isMobile ? 'block' : 'none';
          console.log("Mobile image updated:", mobileImg.src);
        }
      }, 100);
    };
    
    // Run multiple times to ensure images are loaded
    loadAndForceImages();
    const timer1 = setTimeout(loadAndForceImages, 500);
    const timer2 = setTimeout(loadAndForceImages, 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [imageUrl, desktopImageUrl, isMobile]);
  
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
      
      <Card className="mb-8 overflow-hidden border-0 shadow-lg blog-header">
        <div className="w-full">
          <AspectRatio ratio={16/9} className="bg-gray-100">
            {/* Desktop image - explicit styling to force display */}
            <img 
              src={`${desktopImageUrl}?t=${Date.now()}`} 
              alt={title}
              className="desktop-blog-image w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              width="1200"
              height="675"
              style={{
                aspectRatio: "16/9",
                display: isMobile ? 'none !important' : 'block !important'
              }}
            />
            
            {/* Mobile image - explicit styling to force display */}
            <img 
              src={`${imageUrl}?t=${Date.now()}`} 
              alt={title}
              className="mobile-blog-image w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              width="640"
              height="360"
              style={{
                aspectRatio: "16/9",
                display: isMobile ? 'block !important' : 'none !important'
              }}
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
