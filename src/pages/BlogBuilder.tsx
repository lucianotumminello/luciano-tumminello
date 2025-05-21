
import { useState } from "react";
import { SAVED_PASSWORD_KEY, useBlogBuilder } from "@/hooks/useBlogBuilder";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormattingGuide from "@/components/blog/FormattingGuide";
import { AuthenticationSection } from "@/components/blog-builder/AuthenticationSection";
import { BlogBuilderHeader } from "@/components/blog-builder/BlogBuilderHeader";
import { EditingNotice } from "@/components/blog-builder/EditingNotice";
import { BlogForm } from "@/components/blog-builder/BlogForm";
import { BlogPreview } from "@/components/blog-builder/BlogPreview";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BlogBuilder = () => {
  const { toast } = useToast();
  const {
    isAuthenticated,
    setIsAuthenticated,
    selectedPost,
    isUpdateMode,
    desktopImageFile,
    setDesktopImageFile,
    mobileImageFile,
    setMobileImageFile,
    showPreview,
    setShowPreview,
    previewData,
    rememberPassword,
    blogPosts,
    publishStates,
    isPublishing,
    isPostListOpen,
    setIsPostListOpen,
    isSaving,
    formValues,
    handleRememberPasswordChange,
    handleImageUpload,
    applyLayout,
    handlePublishStateChange,
    savePublishStates,
    onBlogSubmit,
    selectPostToEdit,
    cancelEditing,
    duplicateCurrentPost,
    duplicatePost
  } = useBlogBuilder();

  if (!isAuthenticated) {
    return (
      <AuthenticationSection
        onAuthSuccess={() => setIsAuthenticated(true)}
        savedPassword={localStorage.getItem(SAVED_PASSWORD_KEY)}
        rememberPassword={rememberPassword}
        onRememberPasswordChange={handleRememberPasswordChange}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <BlogBuilderHeader
            isUpdateMode={isUpdateMode}
            blogPosts={blogPosts}
            publishStates={publishStates}
            isPostListOpen={isPostListOpen}
            setIsPostListOpen={setIsPostListOpen}
            onSelectPost={selectPostToEdit}
            onPublishStateChange={handlePublishStateChange}
            onSavePublishStates={savePublishStates}
            isSaving={isSaving}
            onCancelEditing={cancelEditing}
            onLogout={() => setIsAuthenticated(false)}
            onDuplicatePost={duplicatePost}
          />
          
          <div className="flex justify-between items-center mb-6">
            <EditingNotice 
              isUpdateMode={isUpdateMode}
              selectedPost={selectedPost}
              blogPosts={blogPosts}
            />
            
            <Link to="/admin">
              <Button variant="outline" className="flex items-center gap-2">
                <span>Use New CMS</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </Button>
            </Link>
          </div>
          
          <BlogForm 
            initialData={formValues}
            isPublishing={isPublishing}
            isUpdateMode={isUpdateMode}
            onSubmit={onBlogSubmit}
            onApplyLayout={applyLayout}
            onImageUpload={handleImageUpload}
            desktopImageFile={desktopImageFile}
            mobileImageFile={mobileImageFile}
            setDesktopImageFile={setDesktopImageFile}
            setMobileImageFile={setMobileImageFile}
            onDuplicate={isUpdateMode ? duplicateCurrentPost : undefined}
          />

          <BlogPreview 
            isOpen={showPreview}
            onOpenChange={setShowPreview}
            previewData={previewData}
          />

          <FormattingGuide />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogBuilder;
