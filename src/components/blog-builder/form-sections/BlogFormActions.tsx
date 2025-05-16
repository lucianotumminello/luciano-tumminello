
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, Copy, Send } from "lucide-react";

interface BlogFormActionsProps {
  onApplyLayout: () => void;
  isPublishing: boolean;
  isUpdateMode: boolean;
  onDuplicate?: () => void;
}

export const BlogFormActions = ({
  onApplyLayout,
  isPublishing,
  isUpdateMode,
  onDuplicate
}: BlogFormActionsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          size="lg"
          onClick={onApplyLayout}
          className="flex items-center gap-2"
        >
          <Save className="h-5 w-5" />
          Apply Layout
        </Button>
        
        {isUpdateMode && onDuplicate && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onDuplicate}
            className="flex items-center gap-2"
          >
            <Copy className="h-5 w-5" />
            Duplicate
          </Button>
        )}
      </div>
      
      <Button 
        type="submit" 
        size="lg" 
        className="min-w-[200px] bg-green-600 hover:bg-green-700"
        disabled={isPublishing}
      >
        <Send className="h-5 w-5 mr-2" />
        {isPublishing ? "Publishing..." : (isUpdateMode ? "Update & Publish" : "Publish to Blog")}
      </Button>
    </div>
  );
};
