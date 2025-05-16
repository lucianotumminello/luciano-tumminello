
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Save, Copy } from "lucide-react";
import { BlogPost } from "@/types";

interface BlogPostListProps {
  blogPosts: Record<string, BlogPost>;
  publishStates: Record<string, boolean>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectPost: (slug: string) => void;
  onPublishStateChange: (slug: string, checked: boolean) => void;
  onSavePublishStates: () => void;
  onDuplicatePost: (slug: string) => void;
  isSaving: boolean;
}

export const BlogPostList = ({
  blogPosts,
  publishStates,
  isOpen,
  setIsOpen,
  onSelectPost,
  onPublishStateChange,
  onSavePublishStates,
  onDuplicatePost,
  isSaving
}: BlogPostListProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Existing Post</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select a post to edit</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-2 max-h-[65vh] overflow-y-auto">
          {Object.entries(blogPosts).length > 0 ? (
            Object.entries(blogPosts).map(([slug, post]) => (
              <div key={slug} className="flex items-center gap-2 border rounded-md p-3">
                <Checkbox 
                  id={`publish-${slug}`}
                  checked={publishStates[slug] !== false}
                  onCheckedChange={(checked) => onPublishStateChange(slug, !!checked)}
                />
                <Button 
                  variant="ghost" 
                  className="justify-start text-left h-auto py-3 flex-1"
                  onClick={() => {
                    onSelectPost(slug);
                    setIsOpen(false);
                  }}
                >
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-gray-500">{post.date}</p>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="flex-shrink-0"
                  onClick={() => onDuplicatePost(slug)}
                  title="Duplicate post"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No blog posts available</p>
          )}
        </div>
        <SheetFooter className="mt-6">
          <Button 
            onClick={onSavePublishStates}
            disabled={isSaving}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Blog Visibility Settings
              </>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
