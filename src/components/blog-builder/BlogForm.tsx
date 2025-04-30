
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const blogForm = useForm<BlogFormData>({
    defaultValues: initialData
  });

  return (
    <Form {...blogForm}>
      <form onSubmit={blogForm.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={blogForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={blogForm.control}
            name="content"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <div className="flex justify-between items-center">
                  <FormLabel>Content (Write in plain text, paragraphs will be formatted automatically)</FormLabel>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={onApplyLayout}
                    className="flex items-center gap-1 text-primary hover:bg-primary/10"
                  >
                    <FileText className="h-4 w-4" />
                    Apply Layout
                  </Button>
                </div>
                <FormControl>
                  <Textarea 
                    className="min-h-[300px] font-sans text-base" 
                    placeholder="Write your content here... Use double line breaks for new paragraphs"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
              <div className="w-full h-40 relative">
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
              <div className="w-full h-40 relative">
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
        
        <Button 
          type="submit" 
          size="lg" 
          className="w-full md:w-auto"
          disabled={isPublishing}
        >
          {isPublishing ? "Publishing..." : (isUpdateMode ? "Update Blog Post" : "Publish Blog")}
        </Button>
      </form>
    </Form>
  );
};
