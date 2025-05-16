
import React from "react";
import { Button } from "@/components/ui/button";
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
  onCancelEditing: () => void;
  onLogout: () => void;
  onDuplicatePost: (slug: string) => void;
  isSaving: boolean;
}

export const BlogBuilderHeader: React.FC<BlogBuilderHeaderProps> = ({
  isUpdateMode,
  blogPosts,
  publishStates,
  isPostListOpen,
  setIsPostListOpen,
  onSelectPost,
  onPublishStateChange,
  onSavePublishStates,
  onCancelEditing,
  onLogout,
  onDuplicatePost,
  isSaving
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {isUpdateMode ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>
        <div className="flex gap-3">
          <BlogPostList
            blogPosts={blogPosts}
            publishStates={publishStates}
            isOpen={isPostListOpen}
            setIsOpen={setIsPostListOpen}
            onSelectPost={onSelectPost}
            onPublishStateChange={onPublishStateChange}
            onSavePublishStates={onSavePublishStates}
            onDuplicatePost={onDuplicatePost}
            isSaving={isSaving}
          />
          {isUpdateMode && (
            <Button variant="outline" color="secondary" onClick={onCancelEditing}>
              Cancel Editing
            </Button>
          )}
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
      <p className="text-gray-600 mb-4">
        Use this form to create and manage blog posts. All changes are saved automatically.
      </p>
    </div>
  );
};
