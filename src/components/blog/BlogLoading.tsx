
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const BlogLoading = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export const BlogPostSkeleton = () => {
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Skeleton className="h-6 w-24" />
          <span>•</span>
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-8 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-6 w-24" />
      </CardContent>
    </Card>
  );
};

export default BlogLoading;
