
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, Copy, Send, Link } from "lucide-react";

interface BlogFormActionsProps {
  onApplyLayout: () => void;
  isPublishing: boolean;
  isUpdateMode: boolean;
  onDuplicate?: () => void;
  onMakePermanent?: () => void;
}

export const BlogFormActions = ({
  onApplyLayout,
  isPublishing,
  isUpdateMode,
  onDuplicate,
  onMakePermanent
}: BlogFormActionsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onApplyLayout}
          className="flex items-center gap-2"
        >
          <Save className="h-5 w-5" />
          Format Content
        </Button>
        
        {isUpdateMode && onDuplicate && (
          <Button
            type="button"
            variant="outline"
            onClick={onDuplicate}
            className="flex items-center gap-2"
          >
            <Copy className="h-5 w-5" />
            Duplicate
          </Button>
        )}
        
        {isUpdateMode && onMakePermanent && (
          <Button
            type="button"
            variant="default"
            onClick={onMakePermanent}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700"
          >
            <Link className="h-5 w-5" />
            Make Permanent
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
