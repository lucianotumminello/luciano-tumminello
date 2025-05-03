
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types";
import { translateText, generateTags, estimateReadingTime } from "@/utils/blogUtils";
import { textToHtml, htmlToText, applyStandardLayout } from "@/utils/contentFormatter";
import FormattingGuide from "@/components/blog/FormattingGuide";
import { updateBlogPost, createBlogPost, getAllBlogPosts } from "@/utils/blogDataManager";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/blog-builder/AuthForm";
import { BlogPostList } from "@/components/blog-builder/BlogPostList";
import { BlogForm, BlogFormData } from "@/components/blog-builder/BlogForm";
import { BlogPreview } from "@/components/blog-builder/BlogPreview";

const SAVED_PASSWORD_KEY = "blog_builder_password";
const DEFAULT_AUTHOR = "Luciano Tumminello";
const DEFAULT_AUTHOR_IMAGE = "/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png";

const BlogBuilder = () => {
  const getCurrentFormattedDate = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('en-US', { month: 'long' });
    const year = now.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [desktopImageFile, setDesktopImageFile] = useState<File | null>(null);
  const [mobileImageFile, setMobileImageFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<BlogPost | null>(null);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [blogPosts, setBlogPosts] = useState<Record<string, BlogPost>>(getAllBlogPosts());
  const [publishStates, setPublishStates] = useState<Record<string, boolean>>({});
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPostListOpen, setIsPostListOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Default form values
  const defaultFormValues: BlogFormData = {
    title: "",
    excerpt: "",
    content: "",
    date: getCurrentFormattedDate(),
    category: "",
    tags: "",
    desktopImageUrl: "",
    imageUrl: ""
  };
  
  // State for form values
  const [formValues, setFormValues] = useState<BlogFormData>(defaultFormValues);

  useEffect(() => {
    try {
      const savedPassword = localStorage.getItem(SAVED_PASSWORD_KEY);
      if (savedPassword && savedPassword === "VanBasten9!") {
        console.log("Auto-login with saved password");
        setIsAuthenticated(true);
        setRememberPassword(true);
        toast({
          title: "Authentication successful",
          description: "Welcome to the blog builder!",
        });
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (!isUpdateMode) {
      setFormValues(defaultFormValues);
      setDesktopImageFile(null);
      setMobileImageFile(null);
    }
  }, [isUpdateMode]);

  useEffect(() => {
    if (selectedPost && blogPosts[selectedPost]) {
      const post = blogPosts[selectedPost];
      setFormValues({
        title: post.title,
        excerpt: post.excerpt,
        content: htmlToText(post.content),
        date: post.date,
        category: post.category,
        tags: post.tags.join(", "),
        desktopImageUrl: post.desktopImageUrl,
        imageUrl: post.imageUrl
      });
      
      // Clear any previously uploaded images when selecting a post to edit
      setDesktopImageFile(null);
      setMobileImageFile(null);
      
      // Update publish state for this post if needed
      setPublishStates(prev => ({
        ...prev,
        [selectedPost]: post.published !== false
      }));
      
      // Make sure we're in update mode
      setIsUpdateMode(true);
      
      toast({
        title: "Post loaded for editing",
        description: `Now editing: "${post.title}"`,
      });
    }
  }, [selectedPost, blogPosts]);

  useEffect(() => {
    if (isAuthenticated) {
      const posts = getAllBlogPosts();
      setBlogPosts(posts);
      
      const initialPublishStates: Record<string, boolean> = {};
      Object.entries(posts).forEach(([slug, post]) => {
        initialPublishStates[slug] = post.published !== false;
      });
      setPublishStates(initialPublishStates);
    }
  }, [isAuthenticated]);

  const handleRememberPasswordChange = (checked: boolean) => {
    setRememberPassword(checked);
    if (!checked) {
      localStorage.removeItem(SAVED_PASSWORD_KEY);
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      toast({
        title: "Image selected",
        description: `${e.target.files[0].name} selected for upload`,
      });
    }
  };

  const generateSlug = (title: string): string => {
    const timestamp = Date.now();
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    return `${baseSlug}-${timestamp}`;
  };

  const applyLayout = () => {
    const formattedContent = applyStandardLayout(formValues.content);
    setFormValues({ ...formValues, content: formattedContent });
    
    toast({
      title: "Layout applied",
      description: "Your content has been formatted with proper headings and spacing",
    });
  };

  const handlePublishStateChange = (slug: string, checked: boolean) => {
    setPublishStates(prev => ({
      ...prev,
      [slug]: checked
    }));
  };

  const savePublishStates = () => {
    setIsSaving(true);
    
    try {
      Object.entries(publishStates).forEach(([slug, isPublished]) => {
        if (blogPosts[slug]) {
          const updatedPost = {
            ...blogPosts[slug],
            published: isPublished
          };
          updateBlogPost(slug, updatedPost);
        }
      });
      
      setBlogPosts(getAllBlogPosts());
      
      toast({
        title: "Changes saved",
        description: "Blog visibility settings have been updated",
      });
    } catch (error) {
      console.error("Error saving publish states:", error);
      toast({
        title: "Error",
        description: "Failed to save blog visibility settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
      setIsPostListOpen(false);
    }
  };

  const onBlogSubmit = async (data: BlogFormData) => {
    setIsPublishing(true);
    toast({
      title: "Processing...",
      description: "Preparing your blog post data",
    });

    try {
      // Format the content with proper styling
      const formattedContent = textToHtml(applyStandardLayout(data.content));
      
      const slug = isUpdateMode && selectedPost ? selectedPost : generateSlug(data.title);
      
      const generatedTags = await generateTags(formattedContent);
      const tagsToUse = data.tags ? data.tags.split(',').map(tag => tag.trim()) : generatedTags;
      
      // Calculate reading time based on formatted content
      const readingTime = estimateReadingTime(formattedContent);
      const readingTimeText = `${readingTime} min read`;

      const translatedTitle = await translateText(data.title, 'en', 'it');
      const translatedExcerpt = await translateText(data.excerpt, 'en', 'it');
      const translatedContent = await translateText(formattedContent, 'en', 'it');
      const translatedCategory = await translateText(data.category, 'en', 'it');
      const translatedTags = await Promise.all(tagsToUse.map(tag => translateText(tag, 'en', 'it')));
      
      const dateObj = new Date(data.date);
      let italianDate = data.date;
      
      if (!isNaN(dateObj.getTime())) {
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('it-IT', { month: 'long' });
        const year = dateObj.getFullYear();
        italianDate = `${day} ${month} ${year}`;
      } else {
        italianDate = await translateText(data.date, 'en', 'it');
      }
      
      const translatedReadingTime = `${readingTime} min di lettura`;

      let desktopImageUrl = data.desktopImageUrl;
      let mobileImageUrl = data.imageUrl;

      if (desktopImageFile) {
        desktopImageUrl = URL.createObjectURL(desktopImageFile);
        toast({
          title: "Desktop image ready",
          description: "Upload the image to your server and replace the URL in the JSON"
        });
      }

      if (mobileImageFile) {
        mobileImageUrl = URL.createObjectURL(mobileImageFile);
        toast({
          title: "Mobile image ready",
          description: "Upload the image to your server and replace the URL in the JSON"
        });
      }

      const formattedDate = isUpdateMode ? data.date : getCurrentFormattedDate();

      const currentPublishedState = isUpdateMode && selectedPost 
        ? publishStates[selectedPost] !== undefined
          ? publishStates[selectedPost]
          : blogPosts[selectedPost]?.published !== false
        : true;

      const blogPost: BlogPost = {
        title: data.title,
        titleIT: translatedTitle,
        excerpt: data.excerpt,
        excerptIT: translatedExcerpt,
        content: formattedContent,
        contentIT: translatedContent,
        author: DEFAULT_AUTHOR,
        authorImageUrl: DEFAULT_AUTHOR_IMAGE,
        date: formattedDate,
        dateIT: italianDate,
        category: data.category,
        categoryIT: translatedCategory,
        imageUrl: mobileImageUrl,
        desktopImageUrl: desktopImageUrl,
        readingTime: readingTimeText,
        readingTimeIT: translatedReadingTime,
        tags: tagsToUse,
        tagsIT: translatedTags,
        published: currentPublishedState
      };

      setPreviewData(blogPost);
      setShowPreview(true);

      if (isUpdateMode && selectedPost) {
        updateBlogPost(selectedPost, blogPost);
        toast({
          title: "Blog post updated!",
          description: "Changes have been applied successfully.",
        });
      } else {
        createBlogPost(slug, blogPost);
        setPublishStates(prev => ({
          ...prev,
          [slug]: currentPublishedState
        }));
        toast({
          title: "Blog post created!",
          description: `New post "${data.title}" has been created successfully.`,
        });
      }

      setBlogPosts(getAllBlogPosts());

      setTimeout(() => {
        navigate(`/blog/${slug}`);
      }, 1500);

      const blogPostJson = JSON.stringify(blogPost, null, 2);
      navigator.clipboard.writeText(blogPostJson);
    } catch (error) {
      toast({
        title: "Error processing blog data",
        description: "There was an issue preparing your blog post",
        variant: "destructive",
      });
      console.error("Blog processing error:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  const selectPostToEdit = (slug: string) => {
    setSelectedPost(slug);
    setIsUpdateMode(true);
    const post = blogPosts[slug];
    if (post) {
      setFormValues({
        title: post.title,
        excerpt: post.excerpt,
        content: htmlToText(post.content),
        date: post.date,
        category: post.category,
        tags: post.tags.join(", "),
        desktopImageUrl: post.desktopImageUrl,
        imageUrl: post.imageUrl
      });
      
      // Clear any previously uploaded files
      setDesktopImageFile(null);
      setMobileImageFile(null);
      
      // Scroll to the top of the form
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Cancel editing and return to create mode
  const cancelEditing = () => {
    setIsUpdateMode(false);
    setSelectedPost(null);
    setFormValues(defaultFormValues);
    setDesktopImageFile(null);
    setMobileImageFile(null);
    
    toast({
      title: "Editing canceled",
      description: "Switched to create new blog post mode",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 py-16 px-4">
          <AuthForm 
            onAuthSuccess={() => setIsAuthenticated(true)}
            savedPassword={localStorage.getItem(SAVED_PASSWORD_KEY)}
            rememberPassword={rememberPassword}
            onRememberPasswordChange={handleRememberPasswordChange}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <h1 className="text-2xl font-bold">Blog Article Builder</h1>
            <div className="flex flex-wrap gap-3">
              <BlogPostList 
                blogPosts={blogPosts}
                publishStates={publishStates}
                isOpen={isPostListOpen}
                setIsOpen={setIsPostListOpen}
                onSelectPost={selectPostToEdit}
                onPublishStateChange={handlePublishStateChange}
                onSavePublishStates={savePublishStates}
                isSaving={isSaving}
              />
              {isUpdateMode ? (
                <Button 
                  variant="outline" 
                  onClick={cancelEditing}
                >
                  Cancel Editing
                </Button>
              ) : (
                <Button 
                  variant="secondary" 
                  disabled={true}
                >
                  Create New Post
                </Button>
              )}
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
            </div>
          </div>
          
          {isUpdateMode && selectedPost && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-700 font-medium">
                Editing: {blogPosts[selectedPost]?.title}
              </p>
            </div>
          )}
          
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
