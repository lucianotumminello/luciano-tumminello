
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const BlogLoading: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="h-full overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="h-4 bg-gray-200 rounded-full w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-full w-16 animate-pulse"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12 mb-1 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogLoading;
