
import React from "react";
import { BlogPost } from "@/types";

interface EditingNoticeProps {
  isUpdateMode: boolean;
  selectedPost: string | null;
  blogPosts: Record<string, BlogPost>;
}

export const EditingNotice = ({ 
  isUpdateMode, 
  selectedPost, 
  blogPosts
}: EditingNoticeProps) => {
  if (!isUpdateMode || !selectedPost) {
    return null;
  }

  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
      <p className="text-blue-700 font-medium">
        Editing: {blogPosts[selectedPost]?.title}
      </p>
    </div>
  );
};
