import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Upload, FileText, Layout, Hash } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  getAllBlogPosts, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost 
} from "@/utils/blog";
import { BlogPost } from "@/types";
import { applyStandardLayout, textToHtml } from "@/utils/contentFormatter";

const SimpleCMS = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<Record<string, BlogPost>>({});
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    imageUrl: "",
    desktopImageUrl: ""
  });
  const [postDate, setPostDate] = useState<Date>(new Date());
  const [desktopImageFile, setDesktopImageFile] = useState<File | null>(null);
  const [mobileImageFile, setMobileImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const desktopImageRef = useRef<HTMLInputElement>(null);
  const mobileImageRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const ADMIN_PASSWORD = "VanBasten9!";

  useEffect(() => {
    if (isAuthenticated) {
      loadPosts();
    }
  }, [isAuthenticated]);

  const loadPosts = async () => {
    try {
      const allPosts = await getAllBlogPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive"
      });
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Successfully logged in to CMS"
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive"
      });
    }
  };

  const handleSelectPost = (slug: string) => {
    const post = posts[slug];
    if (post) {
      setSelectedPost(slug);
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        imageUrl: post.imageUrl,
        desktopImageUrl: post.desktopImageUrl
      });
      
      // Parse the date
      try {
        const parsedDate = new Date(post.date);
        if (!isNaN(parsedDate.getTime())) {
          setPostDate(parsedDate);
        }
      } catch (error) {
        console.error("Error parsing date:", error);
        setPostDate(new Date());
      }
      
      // Clear uploaded files when selecting a post
      setDesktopImageFile(null);
      setMobileImageFile(null);
    }
  };

  const handleNewPost = () => {
    setSelectedPost(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      imageUrl: "",
      desktopImageUrl: ""
    });
    setPostDate(new Date());
    setDesktopImageFile(null);
    setMobileImageFile(null);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>,
    imageType: 'desktop' | 'mobile'
  ) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      toast({
        title: "Image selected",
        description: `${imageType} image "${e.target.files[0].name}" selected for upload`,
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      
      fileReader.onload = async (e) => {
        if (e.target?.result) {
          try {
            if (file.type === "text/plain") {
              const content = e.target.result as string;
              setFormData(prev => ({ ...prev, content }));
              toast({
                title: "File imported",
                description: `Text file "${file.name}" has been imported successfully.`
              });
            } else {
              toast({
                title: "Document imported",
                description: `Please extract and paste the text content from "${file.name}".`,
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
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const applyLayout = () => {
    const formattedContent = applyStandardLayout(formData.content);
    setFormData(prev => ({ ...prev, content: formattedContent }));
    
    toast({
      title: "Layout applied",
      description: "Your content has been formatted with proper headings and spacing",
    });
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now();
  };

  const generateHashtags = (content: string): string[] => {
    // Extract potential topics from content
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    // Common business/marketing/operations keywords to look for
    const topicKeywords = {
      'marketing': ['marketing', 'brand', 'customer', 'audience', 'campaign', 'digital', 'social', 'advertising'],
      'operations': ['operations', 'process', 'efficiency', 'workflow', 'optimization', 'management', 'strategy'],
      'leadership': ['leadership', 'team', 'management', 'culture', 'collaboration', 'communication'],
      'technology': ['technology', 'digital', 'automation', 'software', 'platform', 'data', 'analytics'],
      'business': ['business', 'growth', 'revenue', 'profit', 'sales', 'performance', 'success'],
      'innovation': ['innovation', 'creative', 'solution', 'development', 'transformation', 'change']
    };
    
    const foundTopics = new Set<string>();
    
    // Check for topic matches
    Object.entries(topicKeywords).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => words.includes(keyword))) {
        foundTopics.add(topic);
      }
    });
    
    // Add some general hashtags based on content length and type
    if (content.includes('strategy') || content.includes('plan')) {
      foundTopics.add('strategy');
    }
    if (content.includes('experience') || content.includes('journey')) {
      foundTopics.add('experience');
    }
    if (content.includes('insight') || content.includes('lesson')) {
      foundTopics.add('insights');
    }
    
    // Convert to array and limit to 5 hashtags
    return Array.from(foundTopics).slice(0, 5);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const formattedDate = format(postDate, "d MMMM yyyy");
      const formattedContent = textToHtml(applyStandardLayout(formData.content));
      
      // Generate hashtags automatically
      const autoGeneratedTags = generateHashtags(formData.content);
      
      let desktopImageUrl = formData.desktopImageUrl;
      let mobileImageUrl = formData.imageUrl;

      if (desktopImageFile) {
        desktopImageUrl = URL.createObjectURL(desktopImageFile);
        toast({
          title: "Desktop image ready",
          description: "Upload the image to your server and replace the URL"
        });
      }

      if (mobileImageFile) {
        mobileImageUrl = URL.createObjectURL(mobileImageFile);
        toast({
          title: "Mobile image ready", 
          description: "Upload the image to your server and replace the URL"
        });
      }
      
      const postData: BlogPost = {
        title: formData.title,
        titleIT: formData.title,
        excerpt: formData.excerpt,
        excerptIT: formData.excerpt,
        content: formattedContent,
        contentIT: formattedContent,
        author: "Luciano Tumminello",
        authorImageUrl: "/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png",
        date: formattedDate,
        dateIT: formattedDate,
        category: formData.category,
        categoryIT: formData.category,
        imageUrl: mobileImageUrl,
        desktopImageUrl: desktopImageUrl,
        readingTime: "5 min read",
        readingTimeIT: "5 min di lettura",
        tags: autoGeneratedTags,
        tagsIT: autoGeneratedTags,
        published: true
      };

      if (selectedPost) {
        await updateBlogPost(selectedPost, postData);
        toast({
          title: "Success",
          description: "Blog post updated successfully"
        });
      } else {
        const slug = generateSlug(formData.title);
        await createBlogPost(postData, slug);
        toast({
          title: "Success",
          description: "Blog post created successfully"
        });
        setSelectedPost(slug);
      }
      
      await loadPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPost) return;
    
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteBlogPost(selectedPost);
        toast({
          title: "Success",
          description: "Blog post deleted successfully"
        });
        handleNewPost();
        await loadPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
        toast({
          title: "Error",
          description: "Failed to delete blog post",
          variant: "destructive"
        });
      }
    }
  };

  const handlePreview = () => {
    if (selectedPost) {
      window.open(`/blog/${selectedPost}`, '_blank');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>CMS Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Blog CMS</h1>
          <div className="space-x-2">
            <Button onClick={() => navigate('/blog')} variant="outline">
              View Blog
            </Button>
            <Button onClick={() => setIsAuthenticated(false)} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Posts List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Posts
                <Button onClick={handleNewPost} size="sm">
                  New Post
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {Object.entries(posts).map(([slug, post]) => (
                  <div
                    key={slug}
                    className={`p-3 rounded cursor-pointer border ${
                      selectedPost === slug ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelectPost(slug)}
                  >
                    <div className="font-medium truncate">{post.title}</div>
                    <div className="text-sm text-gray-500">{post.date}</div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Editor */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {selectedPost ? 'Edit Post' : 'New Post'}
                  <div className="space-x-2">
                    {selectedPost && (
                      <>
                        <Button onClick={handlePreview} variant="outline" size="sm">
                          Preview
                        </Button>
                        <Button onClick={handleDelete} variant="destructive" size="sm">
                          Delete
                        </Button>
                      </>
                    )}
                    <Button onClick={handleSave} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Post Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  />
                  
                  <div>
                    <Label htmlFor="post-date">Post Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !postDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {postDate ? format(postDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={postDate}
                          onSelect={(date) => date && setPostDate(date)}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <Textarea
                  placeholder="Excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows={3}
                />

                {/* Auto-generated hashtags preview */}
                {formData.content && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      Auto-generated hashtags
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {generateHashtags(formData.content).map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Image Upload Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="desktop-image">Desktop Image</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="desktop-image"
                        type="file"
                        accept="image/*"
                        ref={desktopImageRef}
                        onChange={(e) => handleImageUpload(e, setDesktopImageFile, 'desktop')}
                        className="flex-1"
                      />
                      {desktopImageFile && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
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
                      <div className="w-full h-32 relative rounded-md overflow-hidden border">
                        <img
                          src={URL.createObjectURL(desktopImageFile)}
                          alt="Desktop preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <Input
                      placeholder="Or enter desktop image URL"
                      value={formData.desktopImageUrl}
                      onChange={(e) => setFormData({...formData, desktopImageUrl: e.target.value})}
                      disabled={!!desktopImageFile}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mobile-image">Mobile Image</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="mobile-image"
                        type="file"
                        accept="image/*"
                        ref={mobileImageRef}
                        onChange={(e) => handleImageUpload(e, setMobileImageFile, 'mobile')}
                        className="flex-1"
                      />
                      {mobileImageFile && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
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
                      <div className="w-full h-32 relative rounded-md overflow-hidden border">
                        <img
                          src={URL.createObjectURL(mobileImageFile)}
                          alt="Mobile preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <Input
                      placeholder="Or enter mobile image URL"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      disabled={!!mobileImageFile}
                    />
                  </div>
                </div>
                
                {/* Content Formatting Tools */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="content">Content</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={applyLayout}
                      >
                        <Layout className="h-4 w-4 mr-2" />
                        Format Layout
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Import File
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".txt,.doc,.docx,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                  <Textarea
                    id="content"
                    placeholder="Content (supports markdown-style formatting: # for headers, ## for subheadings, ### for small titles, - for lists, etc.)"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-gray-500">
                    Tip: Use # for main headings, ## for subheadings, ### for small titles, - for bullet points, and leave blank lines between paragraphs
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCMS;
