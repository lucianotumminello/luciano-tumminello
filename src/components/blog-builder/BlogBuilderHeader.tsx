
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { BlogPost } from "@/types";
import { BlogPostList } from "./BlogPostList";

interface BlogBuilderHeaderProps {
  isUpdateMode: boolean;
  blogPosts: Record<string, BlogPost>;
  publishStates: Record<string, boolean>;
  isPostListOpen: boolean;
  setIsPostListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectPost: (slug: string) => void;
  onPublishStateChange: (slug: string, checked: boolean) => void;
  onSavePublishStates: () => void;
  isSaving: boolean;
  onCancelEditing: () => void;
  onLogout: () => void;
  onDuplicatePost: (slug: string) => void;
}

export const BlogBuilderHeader = ({
  isUpdateMode,
  blogPosts,
  publishStates,
  isPostListOpen,
  setIsPostListOpen,
  onSelectPost,
  onPublishStateChange,
  onSavePublishStates,
  isSaving,
  onCancelEditing,
  onLogout,
  onDuplicatePost
}: BlogBuilderHeaderProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-2">Blog Builder</h1>
        <p className="text-gray-600">Create and edit your blog posts</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <BlogPostList 
          blogPosts={blogPosts}
          publishStates={publishStates}
          isOpen={isPostListOpen}
          setIsOpen={setIsPostListOpen}
          onSelectPost={onSelectPost}
          onPublishStateChange={onPublishStateChange}
          onSavePublishStates={onSavePublishStates}
          isSaving={isSaving}
          onDuplicatePost={onDuplicatePost}
        />
        
        {isUpdateMode && (
          <Button variant="outline" onClick={onCancelEditing}>
            Cancel Editing
          </Button>
        )}
        
        <Button variant="ghost" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};
