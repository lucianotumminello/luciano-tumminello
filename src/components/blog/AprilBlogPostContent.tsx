
import React from "react";
import { insertMarketingImages, addAdditionalContent } from "@/utils/blogContentUtils";

interface AprilBlogPostContentProps {
  content: string;
}

const AprilBlogPostContent: React.FC<AprilBlogPostContentProps> = ({ content }) => {
  const processedContent = React.useMemo(() => {
    console.log("Processing the target blog post - April 13, 2025");
    
    // Look for the specific quote by Maya Johnson
    const hasMayaQuote = content.includes("Maya Johnson, Chief Customer Experience Officer at Deloitte Digital");
    console.log("Found Maya Johnson quote:", hasMayaQuote);
    
    let processedContent = content;
    
    if (hasMayaQuote) {
      console.log("Preparing to insert marketing transformation images");
      processedContent = insertMarketingImages(content);
      
      // Add additional content if needed for word count
      processedContent = addAdditionalContent(processedContent);
    }
    
    return processedContent;
  }, [content]);

  return processedContent;
};

export default AprilBlogPostContent;
