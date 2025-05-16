
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

const BlogBuilder = () => {
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
    duplicatePost,
    deletePost
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
            onDeletePost={deletePost}
          />
          
          <EditingNotice 
            isUpdateMode={isUpdateMode}
            selectedPost={selectedPost}
            blogPosts={blogPosts}
          />
          
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
