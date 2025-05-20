
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ClipboardPaste, Save, Upload, FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { BlogFormData } from "../BlogFormTypes";
import { useToast } from "@/hooks/use-toast";

interface BlogContentSectionProps {
  blogForm: UseFormReturn<BlogFormData>;
  contentRef: React.RefObject<HTMLTextAreaElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onApplyLayout: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BlogContentSection = ({ 
  blogForm, 
  contentRef, 
  fileInputRef,
  onApplyLayout, 
  handleFileUpload 
}: BlogContentSectionProps) => {
  const { toast } = useToast();

  // Copy content to clipboard
  const handleCopyContent = () => {
    if (contentRef.current) {
      const content = blogForm.getValues("content");
      navigator.clipboard.writeText(content);
      toast({
        title: "Content copied",
        description: "Blog content has been copied to clipboard"
      });
    }
  };
  
  // Paste content from clipboard
  const handlePasteContent = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        blogForm.setValue("content", clipboardText);
        toast({
          title: "Content pasted",
          description: "Content has been pasted from clipboard"
        });
      }
    } catch (error) {
      toast({
        title: "Paste failed",
        description: "Unable to access clipboard. Please check browser permissions.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardContent className="pt-6">
        <div className="mb-4 flex items-center justify-between">
          <FormLabel className="text-base font-medium">Content</FormLabel>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1"
            >
              <Upload className="h-4 w-4" /> Import
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.docx,.pdf"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyContent}
              className="flex items-center gap-1"
            >
              <Copy className="h-4 w-4" /> Copy
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePasteContent}
              className="flex items-center gap-1"
            >
              <ClipboardPaste className="h-4 w-4" /> Paste
            </Button>
          </div>
        </div>
        
        <FormField
          control={blogForm.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea 
                  {...field} 
                  ref={(e) => {
                    field.ref(e);
                    if (e && contentRef) {
                      (contentRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = e;
                    }
                  }}
                  className="min-h-[400px] font-sans text-base" 
                  placeholder="Write your content here... Use double line breaks for new paragraphs. Use # for headings (# Title, ## Subtitle, etc.)"
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500 mt-1">Write in plain text, paragraphs will be formatted automatically</p>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
