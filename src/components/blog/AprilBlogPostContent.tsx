
import React from "react";
import { insertMarketingImages, addAdditionalContent, ensureOutgoingLinks } from "@/utils/blogContentUtils";

interface AprilBlogPostContentProps {
  content: string;
}

const AprilBlogPostContent = ({ content }: AprilBlogPostContentProps): string => {
  // Process the content for the April 13th blog post
  console.log("Processing the target blog post - April 13, 2025");
  
  // Look for the specific quote by Maya Johnson or any relevant content
  const hasMayaQuote = content.includes("Maya Johnson") || 
                       content.includes("Chief Customer Experience") || 
                       content.includes("Deloitte Digital");
  
  console.log("Found Maya Johnson quote or relevant content:", hasMayaQuote);
  
  let processedContent = content;
  
  // Skip inserting marketing transformation images for this specific post
  console.log("Skipping marketing transformation images for April 13 post");
  
  // Add additional content for word count and outgoing links
  console.log("Adding additional content with outgoing links");
  processedContent = addAdditionalContent(processedContent);
  
  // Always ensure outgoing links are present
  processedContent = ensureOutgoingLinks(processedContent);
  
  return processedContent;
};

export default AprilBlogPostContent;
