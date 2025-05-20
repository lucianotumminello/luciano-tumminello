
import React from "react";
import BlogPostStyles from "@/components/blog/BlogPostStyles";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPreviewTabProps {
  previewContent: {
    title: string;
    date: string;
    content: string;
    category: string;
    desktopImageUrl?: string;
    imageUrl?: string;
  };
}

export const BlogPreviewTab: React.FC<BlogPreviewTabProps> = ({ previewContent }) => {
  const { title, date, content, category, desktopImageUrl, imageUrl } = previewContent;
  
  return (
    <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
      <BlogPostStyles />
      <Card className="bg-white shadow-sm overflow-hidden max-w-3xl mx-auto">
        <CardContent className="p-0">
          {(desktopImageUrl || imageUrl) && (
            <div className="desktop-image-container mb-6">
              <img 
                src={desktopImageUrl || imageUrl} 
                alt={title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium rounded-full px-3 py-1">
                {category}
              </span>
              <span className="text-sm text-gray-500 ml-4">{date}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
            
            <div 
              className="prose max-w-none" 
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
