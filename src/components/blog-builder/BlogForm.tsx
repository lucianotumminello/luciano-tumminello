import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { FileText, Save, Upload, Copy, Paste, FileWord, FilePdf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  tags: string;
  desktopImageUrl: string;
  imageUrl: string;
}

interface BlogFormProps {
  initialData: BlogFormData;
  isPublishing: boolean;
  isUpdateMode: boolean;
  onSubmit: (data: BlogFormData) => void;
  onApplyLayout: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, setImageFile: React.Dispatch<React.SetStateAction<File | null>>) => void;
  desktopImageFile: File | null;
  mobileImageFile: File | null;
  setDesktopImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setMobileImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const BlogForm = ({
  initialData,
  isPublishing,
  isUpdateMode,
  onSubmit,
  onApplyLayout,
  onImageUpload,
  desktopImageFile,
  mobileImageFile,
  setDesktopImageFile,
  setMobileImageFile
}: BlogFormProps) => {
  const desktopImageRef = useRef<HTMLInputElement>(null);
  const mobileImageRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("editor");

  const blogForm = useForm<BlogFormData>({
    defaultValues: initialData
  });
  
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
  
  // Handle file upload (Word, PDF, Text)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      
      fileReader.onload = async (e) => {
        if (e.target?.result) {
          let content = "";
          
          try {
            // For plain text files
            if (file.type === "text/plain") {
              content = e.target.result as string;
              blogForm.setValue("content", content);
              toast({
                title: "File imported",
                description: `Text file "${file.name}" has been imported successfully.`
              });
              
            } else {
              // For Word/PDF, we'll just let user know they need to extract text
              // In a real implementation, we'd use a document parsing library
              toast({
                title: "Document imported",
                description: `Please extract and paste the text content from "${file.name}". Full document parsing requires additional libraries.`,
                variant: "default"
              });
            }
          } catch (error) {
            toast({
              title: "Import failed",
              description: "Unable to process the file. Please try copying and pasting the content directly.",
              variant: "destructive"
            });
          }
        }
      };
      
      fileReader.readAsText(file);
    }
    
    // Reset the file input so the same file can be uploaded again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  // Update content ref when form value changes
  useEffect(() => {
    const subscription = blogForm.watch((value) => {
      // This keeps our ref updated with the latest form values
    });
    return () => subscription.unsubscribe();
  }, [blogForm.watch]);

  return (
    <Form {...blogForm}>
      <form onSubmit={blogForm.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="bg-white shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={blogForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} className="font-medium" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={blogForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={blogForm.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="h-24" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
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
                  <Paste className="h-4 w-4" /> Paste
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
                          field.ref(e);
                          contentRef.current = e;
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
                    <FileWord className="h-4 w-4" />
                    Word (.docx)
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <FilePdf className="h-4 w-4" />
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
        
        <Card className="bg-white shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={blogForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={blogForm.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma-separated, or leave blank for automatic)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label htmlFor="desktopImage">Desktop Image</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="desktopImage"
                    type="file"
                    accept="image/*"
                    ref={desktopImageRef}
                    onChange={(e) => onImageUpload(e, setDesktopImageFile)}
                    className="flex-1"
                  />
                  {desktopImageFile && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => {
                        setDesktopImageFile(null);
                        if (desktopImageRef.current) desktopImageRef.current.value = "";
                      }}
                    >
                      Clear
                    </Button>
                  )}
                </div>
                {desktopImageFile && (
                  <div className="w-full h-40 relative rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(desktopImageFile)}
                      alt="Desktop preview"
                      className="h-full object-contain"
                    />
                  </div>
                )}
                <FormField
                  control={blogForm.control}
                  name="desktopImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Or enter desktop image URL directly</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!!desktopImageFile} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="mobileImage">Mobile Image</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="mobileImage"
                    type="file"
                    accept="image/*"
                    ref={mobileImageRef}
                    onChange={(e) => onImageUpload(e, setMobileImageFile)}
                    className="flex-1"
                  />
                  {mobileImageFile && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => {
                        setMobileImageFile(null);
                        if (mobileImageRef.current) mobileImageRef.current.value = "";
                      }}
                    >
                      Clear
                    </Button>
                  )}
                </div>
                {mobileImageFile && (
                  <div className="w-full h-40 relative rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(mobileImageFile)}
                      alt="Mobile preview"
                      className="h-full object-contain"
                    />
                  </div>
                )}
                <FormField
                  control={blogForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Or enter mobile image URL directly</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!!mobileImageFile} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
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
      </form>
    </Form>
  );
};
