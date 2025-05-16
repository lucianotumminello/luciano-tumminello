
import React from "react";
import { ensureOutgoingLinks } from "@/utils/blogContentUtils";

interface AprilBlogPostContentProps {
  content: string;
}

const AprilBlogPostContent = ({ content }: AprilBlogPostContentProps): string => {
  // Process the content for the April 13th blog post
  console.log("Processing the target blog post - April 13, 2025");
  
  let processedContent = content;
  
  // CRITICAL FIX: Remove duplicate titles for this specific post
  processedContent = processedContent.replace(/^\s*<h1[^>]*>[^<]+<\/h1>/i, '');
  processedContent = processedContent.replace(/^\s*<h2[^>]*>[^<]+<\/h2>/i, '');
  
  // Remove any known title patterns
  const specificTitles = [
    "Beyond Pattern Recognition",
    "Q2 2025",
    "New Wave of AI"
  ];
  
  specificTitles.forEach(title => {
    const h1Pattern = new RegExp(`<h1[^>]*>${title}[^<]*<\\/h1>`, 'gi');
    const h2Pattern = new RegExp(`<h2[^>]*>${title}[^<]*<\\/h2>`, 'gi');
    processedContent = processedContent.replace(h1Pattern, '');
    processedContent = processedContent.replace(h2Pattern, '');
  });
  
  // Final check: remove any remaining H1 tags entirely
  processedContent = processedContent.replace(/<h1[^>]*>([^<]+)<\/h1>/gi, '<h2>$1</h2>');
  
  // Always ensure outgoing links are present
  processedContent = ensureOutgoingLinks(processedContent);
  
  return processedContent;
};

export default AprilBlogPostContent;
