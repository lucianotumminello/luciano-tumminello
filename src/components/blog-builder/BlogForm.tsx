
import React from "react";
import { Form } from "@/components/ui/form";
import { BlogFormProps } from "./BlogFormTypes";
import { BlogMetadataSection } from "./form-sections/BlogMetadataSection";
import { BlogContentSection } from "./form-sections/BlogContentSection";
import { BlogDetailsSection } from "./form-sections/BlogDetailsSection";
import { BlogImageSection } from "./form-sections/BlogImageSection";
import { BlogFormActions } from "./form-sections/BlogFormActions";
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
  onDuplicate
}: BlogFormProps) => {
  const {
    activeTab,
    setActiveTab,
    contentRef,
    fileInputRef,
    blogForm,
    handleFileUpload
  } = useBlogForm(initialData);

  return (
    <Form {...blogForm}>
      <form onSubmit={blogForm.handleSubmit(onSubmit)} className="space-y-6">
        <BlogMetadataSection blogForm={blogForm} />
        
        <BlogContentSection 
          blogForm={blogForm}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
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
        />
      </form>
    </Form>
  );
};
