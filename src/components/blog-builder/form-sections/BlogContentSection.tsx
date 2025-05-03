
import React, { useRef } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ClipboardPaste, Save, Upload, FileText, FileType, File } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { BlogFormData } from "../BlogFormTypes";
import { useToast } from "@/hooks/use-toast";

interface BlogContentSectionProps {
  blogForm: UseFormReturn<BlogFormData>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  contentRef: React.RefObject<HTMLTextAreaElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onApplyLayout: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BlogContentSection = ({ 
  blogForm, 
  activeTab, 
  setActiveTab, 
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
          <div className="flex gap-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <TabsContent value="editor" className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
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
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={onApplyLayout}
              className="flex items-center gap-1 ml-auto text-primary hover:bg-primary/10"
            >
              <Save className="h-4 w-4" />
              Apply Layout
            </Button>
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
                      // Fixed the assignment to ref
                      field.ref(e);
                      // Only forward the ref if the element exists and contentRef is provided
                      if (e && contentRef) {
                        // This is the proper way to assign refs in React
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
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300 text-center space-y-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload className="h-10 w-10 text-gray-400" />
              <h3 className="font-medium text-lg">Upload document</h3>
              <p className="text-gray-500">Upload .txt, .docx or .pdf files</p>
            </div>
            
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Text (.txt)
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <FileType className="h-4 w-4" />
                Word (.docx)
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <File className="h-4 w-4" />
                PDF (.pdf)
              </Button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.docx,.pdf"
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-4">
              After importing, you may need to adjust formatting in the editor tab
            </p>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};
