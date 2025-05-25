
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  getAllBlogPosts, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost 
} from "@/utils/blog";
import { BlogPost } from "@/types";

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
  const [isLoading, setIsLoading] = useState(false);
  
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
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now();
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
      const now = new Date();
      const formattedDate = `${now.getDate()} ${now.toLocaleString('en-US', { month: 'long' })} ${now.getFullYear()}`;
      
      const postData: BlogPost = {
        title: formData.title,
        titleIT: formData.title, // You can add translation later
        excerpt: formData.excerpt,
        excerptIT: formData.excerpt,
        content: formData.content,
        contentIT: formData.content,
        author: "Luciano Tumminello",
        authorImageUrl: "/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png",
        date: formattedDate,
        dateIT: formattedDate,
        category: formData.category,
        categoryIT: formData.category,
        imageUrl: formData.imageUrl,
        desktopImageUrl: formData.desktopImageUrl,
        readingTime: "5 min read",
        readingTimeIT: "5 min di lettura",
        tags: [],
        tagsIT: [],
        published: true
      };

      if (selectedPost) {
        // Update existing post
        await updateBlogPost(selectedPost, postData);
        toast({
          title: "Success",
          description: "Blog post updated successfully"
        });
      } else {
        // Create new post
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
                
                <Input
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                />
                
                <Textarea
                  placeholder="Excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows={3}
                />
                
                <Input
                  placeholder="Featured Image URL"
                  value={formData.desktopImageUrl}
                  onChange={(e) => setFormData({...formData, desktopImageUrl: e.target.value})}
                />
                
                <Input
                  placeholder="Mobile Image URL"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                />
                
                <Textarea
                  placeholder="Content (HTML supported)"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={15}
                  className="font-mono"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCMS;
