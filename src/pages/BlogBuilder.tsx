
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { makeBlogPostPermanent } from "@/utils/blog";

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
    refreshBlogPosts
  } = useBlogBuilder();

  const [permanentSlugDialogOpen, setPermanentSlugDialogOpen] = useState(false);
  const [permanentSlug, setPermanentSlug] = useState("");
  const [isPermanentSaving, setIsPermanentSaving] = useState(false);

  const handleMakePermanent = () => {
    // Generate a clean slug from the title
    const suggestedSlug = formValues.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
      
    setPermanentSlug(suggestedSlug);
    setPermanentSlugDialogOpen(true);
  };

  const confirmMakePermanent = async () => {
    if (!selectedPost || !permanentSlug) return;
    
    setIsPermanentSaving(true);
    
    try {
      // Call the utility function to make the post permanent
      const success = await makeBlogPostPermanent(
        selectedPost,
        permanentSlug,
        true // Always publish the permanent post
      );
      
      if (success) {
        // Refresh the blog posts list
        await refreshBlogPosts();
        
        // Select the new permanent post for editing
        selectPostToEdit(permanentSlug);
        
        // Close the dialog
        setPermanentSlugDialogOpen(false);
      }
    } catch (error) {
      console.error("Error making blog post permanent:", error);
    } finally {
      setIsPermanentSaving(false);
    }
  };

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
            onMakePermanent={isUpdateMode ? handleMakePermanent : undefined}
          />

          <BlogPreview 
            isOpen={showPreview}
            onOpenChange={setShowPreview}
            previewData={previewData}
          />

          <FormattingGuide />
          
          <Dialog open={permanentSlugDialogOpen} onOpenChange={setPermanentSlugDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Make Post Permanent</DialogTitle>
                <DialogDescription>
                  Create a clean, permanent URL for this post. This will make the post accessible across all devices and browsers.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="permanentSlug" className="text-sm font-medium">
                    Permanent URL Slug
                  </label>
                  <Input 
                    id="permanentSlug"
                    value={permanentSlug}
                    onChange={(e) => setPermanentSlug(e.target.value)}
                    placeholder="your-post-title"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    The post will be accessible at: yoursite.com/blog/{permanentSlug}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPermanentSlugDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={confirmMakePermanent}
                  disabled={!permanentSlug || isPermanentSaving}
                >
                  {isPermanentSaving ? "Saving..." : "Confirm & Publish"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogBuilder;
