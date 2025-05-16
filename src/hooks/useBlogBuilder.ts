import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { BlogPost } from "@/types";
import { BlogFormData } from "@/components/blog-builder/BlogFormTypes";
import { updateBlogPost, createBlogPost, getAllBlogPosts, duplicateBlogPost } from "@/utils/blogDataManager";
import { textToHtml, htmlToText, applyStandardLayout } from "@/utils/contentFormatter";
import { translateText, generateTags, estimateReadingTime } from "@/utils/blogUtils";

export const SAVED_PASSWORD_KEY = "blog_builder_password";
export const DEFAULT_AUTHOR = "Luciano Tumminello";
export const DEFAULT_AUTHOR_IMAGE = "/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png";

export const useBlogBuilder = () => {
  const getCurrentFormattedDate = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('en-US', { month: 'long' });
    const year = now.getFullYear();
    return `${day} ${month} ${year}`;
  };

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
  const [formValues, setFormValues] = useState<BlogFormData>(defaultFormValues);

  const { toast } = useToast();
  const navigate = useNavigate();

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
        title: post.title || "",
        excerpt: post.excerpt || "",
        content: htmlToText(post.content || ""),
        date: post.date || getCurrentFormattedDate(),
        category: post.category || "",
        tags: post.tags ? post.tags.join(", ") : "",
        desktopImageUrl: post.desktopImageUrl || "",
        imageUrl: post.imageUrl || ""
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

      // Update the blog posts state immediately to reflect changes
      setBlogPosts(getAllBlogPosts());

      // Force update the blog posts store
      const newPosts = getAllBlogPosts();
      
      // A small delay before redirecting to the blog post
      setTimeout(() => {
        navigate(`/blog/${slug}`);
      }, 1500);

      // Copy the JSON to clipboard for backup purposes
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
        title: post.title || "",
        excerpt: post.excerpt || "",
        content: htmlToText(post.content || ""),
        date: post.date || getCurrentFormattedDate(),
        category: post.category || "",
        tags: post.tags ? post.tags.join(", ") : "",
        desktopImageUrl: post.desktopImageUrl || "",
        imageUrl: post.imageUrl || ""
      });
      
      // Clear any previously uploaded files
      setDesktopImageFile(null);
      setMobileImageFile(null);
      
      // Ensure we're in update mode
      setIsUpdateMode(true);
      
      // Scroll to the top of the form
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      toast({
        title: "Post loaded for editing",
        description: `Now editing: "${post.title}"`,
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

  /**
   * Duplicates the current blog post
   */
  const duplicateCurrentPost = () => {
    if (!selectedPost || !blogPosts[selectedPost]) {
      toast({
        title: "Error",
        description: "No blog post selected to duplicate",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a new slug for the duplicated post
    const newSlug = `${selectedPost}-copy-${Date.now()}`;
    
    // Duplicate the blog post
    const duplicatedPost = duplicateBlogPost(selectedPost, newSlug);
    
    if (duplicatedPost) {
      // Update the blog posts state
      setBlogPosts(getAllBlogPosts());
      
      // Set the duplicated post as the selected post
      setSelectedPost(newSlug);
      
      // Update form values with the duplicated post data
      setFormValues({
        title: duplicatedPost.title || "",
        excerpt: duplicatedPost.excerpt || "",
        content: htmlToText(duplicatedPost.content || ""),
        date: duplicatedPost.date || getCurrentFormattedDate(),
        category: duplicatedPost.category || "",
        tags: duplicatedPost.tags ? duplicatedPost.tags.join(", ") : "",
        desktopImageUrl: duplicatedPost.desktopImageUrl || "",
        imageUrl: duplicatedPost.imageUrl || ""
      });
      
      toast({
        title: "Blog post duplicated",
        description: `"${duplicatedPost.title}" has been created as a copy.`,
      });
    }
  };

  return {
    isAuthenticated,
    setIsAuthenticated,
    selectedPost,
    setSelectedPost,
    isUpdateMode,
    setIsUpdateMode,
    desktopImageFile,
    setDesktopImageFile,
    mobileImageFile,
    setMobileImageFile,
    showPreview,
    setShowPreview,
    previewData,
    setPreviewData,
    rememberPassword,
    setRememberPassword,
    blogPosts,
    setBlogPosts,
    publishStates,
    setPublishStates,
    isPublishing,
    setIsPublishing,
    isPostListOpen,
    setIsPostListOpen,
    isSaving,
    setIsSaving,
    formValues,
    setFormValues,
    handleRememberPasswordChange,
    handleImageUpload,
    applyLayout,
    handlePublishStateChange,
    savePublishStates,
    onBlogSubmit,
    selectPostToEdit,
    cancelEditing,
    getCurrentFormattedDate,
    duplicateCurrentPost
  };
};
