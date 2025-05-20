
import React from "react";
import { Form } from "@/components/ui/form";
import { BlogFormProps } from "./BlogFormTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogMetadataSection } from "./form-sections/BlogMetadataSection";
import { BlogContentSection } from "./form-sections/BlogContentSection";
import { BlogDetailsSection } from "./form-sections/BlogDetailsSection";
import { BlogImageSection } from "./form-sections/BlogImageSection";
import { BlogFormActions } from "./form-sections/BlogFormActions";
import { BlogPreviewTab } from "./form-sections/BlogPreviewTab";
import { useBlogForm } from "./hooks/useBlogForm";

export { type BlogFormData } from "./BlogFormTypes";

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
  setMobileImageFile,
  onDuplicate,
  onMakePermanent
}: BlogFormProps) => {
  const {
    activeTab,
    setActiveTab,
    contentRef,
    fileInputRef,
    blogForm,
    handleFileUpload,
    previewContent
  } = useBlogForm(initialData);

  return (
    <Form {...blogForm}>
      <form onSubmit={blogForm.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="edit">Edit Post</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="space-y-6">
            <BlogMetadataSection blogForm={blogForm} />
            
            <BlogContentSection 
              blogForm={blogForm}
              contentRef={contentRef}
              fileInputRef={fileInputRef}
              onApplyLayout={onApplyLayout}
              handleFileUpload={handleFileUpload}
            />
            
            <BlogDetailsSection blogForm={blogForm} />
            
            <BlogImageSection 
              blogForm={blogForm}
              desktopImageRef={React.useRef<HTMLInputElement>(null)}
              mobileImageRef={React.useRef<HTMLInputElement>(null)}
              onImageUpload={onImageUpload}
              desktopImageFile={desktopImageFile}
              mobileImageFile={mobileImageFile}
              setDesktopImageFile={setDesktopImageFile}
              setMobileImageFile={setMobileImageFile}
            />
            
            <BlogFormActions 
              onApplyLayout={onApplyLayout}
              isPublishing={isPublishing}
              isUpdateMode={isUpdateMode}
              onDuplicate={onDuplicate}
              onMakePermanent={onMakePermanent}
            />
          </TabsContent>
          
          <TabsContent value="preview">
            <BlogPreviewTab previewContent={previewContent} />
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};
