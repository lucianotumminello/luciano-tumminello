
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Save } from "lucide-react";
import { BlogPost } from "@/types";
import { BlogPostList } from "./BlogPostList";
import { Badge } from "@/components/ui/badge";

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
  onDeletePost: (slug: string) => void;
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
  onDuplicatePost,
  onDeletePost
}: BlogBuilderHeaderProps) => {
  // Display the current count of posts in the memory
  const postCount = Object.keys(blogPosts).length;
  
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-2">Blog Builder</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-gray-600">Create and edit your blog posts</p>
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300 flex items-center gap-1">
            <Save className="h-3 w-3" />
            Auto-saving to browser storage ({postCount} posts stored)
          </Badge>
        </div>
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
          onDeletePost={onDeletePost}
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
