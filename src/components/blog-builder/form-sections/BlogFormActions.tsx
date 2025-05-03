
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface BlogFormActionsProps {
  onApplyLayout: () => void;
  isPublishing: boolean;
  isUpdateMode: boolean;
}

export const BlogFormActions = ({
  onApplyLayout,
  isPublishing,
  isUpdateMode
}: BlogFormActionsProps) => {
  return (
    <div className="flex items-center justify-between">
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
      
      <Button 
        type="submit" 
        size="lg" 
        className="min-w-[200px]"
        disabled={isPublishing}
      >
        {isPublishing ? "Publishing..." : (isUpdateMode ? "Update Blog Post" : "Publish Blog")}
      </Button>
    </div>
  );
};
