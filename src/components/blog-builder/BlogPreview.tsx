
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface BlogPreviewProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  previewData: BlogPost | null;
}

export const BlogPreview = ({ isOpen, onOpenChange, previewData }: BlogPreviewProps) => {
  const { toast } = useToast();

  const handleCopyJson = () => {
    if (previewData) {
      try {
        const blogPostJson = JSON.stringify(previewData, null, 2);
        navigator.clipboard.writeText(blogPostJson)
          .then(() => {
            toast({
              title: "Copied!",
              description: "Blog post data copied to clipboard (for backup purposes)"
            });
          })
          .catch(err => {
            console.error("Clipboard write failed:", err);
            // Fallback for browsers with restricted clipboard access
            const textArea = document.createElement("textarea");
            textArea.value = blogPostJson;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            toast({
              title: "Copied!",
              description: "Blog post data copied to clipboard (for backup purposes)"
            });
          });
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        toast({
          title: "Error",
          description: "Could not copy data to clipboard",
          variant: "destructive"
        });
      }
    }
  };

  if (!previewData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Blog Post Preview</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Title</h2>
            <p>{previewData.title}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Excerpt</h2>
            <p>{previewData.excerpt}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Category</h2>
            <p>{previewData.category}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Date</h2>
            <p>{previewData.date}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Reading Time</h2>
            <p>{previewData.readingTime}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {previewData.tags.map((tag: string, index: number) => (
                <span key={index} className="bg-gray-100 px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Images</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Desktop</p>
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  {previewData.desktopImageUrl ? (
                    <img 
                      src={previewData.desktopImageUrl} 
                      alt="Desktop preview" 
                      className="max-h-full object-contain"
                      loading="eager"
                      importance="high"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </div>
              </div>
              <div>
                <p className="font-medium">Mobile</p>
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  {previewData.imageUrl ? (
                    <img 
                      src={previewData.imageUrl} 
                      alt="Mobile preview" 
                      className="max-h-full object-contain"
                      loading="eager"
                      importance="high"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t">
            <Button 
              onClick={handleCopyJson}
              className="w-full"
            >
              Copy JSON (For Backup)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
