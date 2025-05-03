
import React from "react";
import { Button } from "@/components/ui/button";
import { BlogPostList } from "@/components/blog-builder/BlogPostList";
import { BlogPost } from "@/types";

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
  onLogout
}: BlogBuilderHeaderProps) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
      <h1 className="text-2xl font-bold">Blog Article Builder</h1>
      <div className="flex flex-wrap gap-3">
        <BlogPostList 
          blogPosts={blogPosts}
          publishStates={publishStates}
          isOpen={isPostListOpen}
          setIsOpen={setIsPostListOpen}
          onSelectPost={onSelectPost}
          onPublishStateChange={onPublishStateChange}
          onSavePublishStates={onSavePublishStates}
          isSaving={isSaving}
        />
        {isUpdateMode ? (
          <Button 
            variant="outline" 
            onClick={onCancelEditing}
          >
            Cancel Editing
          </Button>
        ) : (
          <Button 
            variant="secondary" 
            disabled={true}
          >
            Create New Post
          </Button>
        )}
        <Button variant="outline" onClick={onLogout}>Logout</Button>
      </div>
    </div>
  );
};
