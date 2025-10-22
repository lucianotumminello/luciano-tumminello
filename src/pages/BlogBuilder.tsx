
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useBlogBuilder } from "@/hooks/useBlogBuilder";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormattingGuide from "@/components/blog/FormattingGuide";
import { BlogBuilderHeader } from "@/components/blog-builder/BlogBuilderHeader";
import { EditingNotice } from "@/components/blog-builder/EditingNotice";
import { BlogForm } from "@/components/blog-builder/BlogForm";
import { BlogPreview } from "@/components/blog-builder/BlogPreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BlogBuilder = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    selectedPost,
    isUpdateMode,
    desktopImageFile,
    setDesktopImageFile,
    mobileImageFile,
    setMobileImageFile,
    showPreview,
    setShowPreview,
    previewData,
    blogPosts,
    publishStates,
    isPublishing,
    isPostListOpen,
    setIsPostListOpen,
    isSaving,
    formValues,
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

  useEffect(() => {
    // Check authentication status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setLoading(false);
      
      if (!session) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "You have been logged out",
      });
      navigate("/auth");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
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
            onLogout={handleLogout}
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
