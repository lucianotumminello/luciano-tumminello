
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type AuthFormData = {
  password: string;
};

type BlogFormData = {
  title: string;
  titleIT: string;
  excerpt: string;
  excerptIT: string;
  content: string;
  contentIT: string;
  date: string;
  dateIT: string;
  category: string;
  categoryIT: string;
  tags: string;
  tagsIT: string;
  desktopImageUrl: string;
  imageUrl: string;
  readingTime: string;
  readingTimeIT: string;
};

const ADMIN_PASSWORD = "your-secure-password-here"; // Change this to your desired password

const BlogBuilder = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const authForm = useForm<AuthFormData>();
  const blogForm = useForm<BlogFormData>();

  const onAuthSubmit = (data: AuthFormData) => {
    if (data.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Authentication successful",
        description: "Welcome to the blog builder!",
      });
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  const onBlogSubmit = (data: BlogFormData) => {
    // Convert tags string to array
    const tags = data.tags.split(',').map(tag => tag.trim());
    const tagsIT = data.tagsIT.split(',').map(tag => tag.trim());

    // Create the blog post object
    const blogPost = {
      ...data,
      tags,
      tagsIT,
      author: "Luciano Tumminello",
      authorImageUrl: "/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png",
    };

    // Convert to JSON string for copying
    const blogPostJson = JSON.stringify(blogPost, null, 2);

    // Copy to clipboard
    navigator.clipboard.writeText(blogPostJson).then(() => {
      toast({
        title: "Blog post data copied!",
        description: "Paste this in your blogPostsData.ts file with the appropriate slug",
      });
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 py-16 px-4">
          <div className="container mx-auto max-w-md">
            <h1 className="text-2xl font-bold text-center mb-8">Blog Builder Authentication</h1>
            <Form {...authForm}>
              <form onSubmit={authForm.handleSubmit(onAuthSubmit)} className="space-y-4">
                <FormField
                  control={authForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </Form>
          </div>
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Blog Article Builder</h1>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
          </div>
          
          <Form {...blogForm}>
            <form onSubmit={blogForm.handleSubmit(onBlogSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={blogForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (English)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="titleIT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (Italian)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt (English)</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="excerptIT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt (Italian)</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content (English)</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[300px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="contentIT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content (Italian)</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[300px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date (English)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="dateIT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date (Italian)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category (English)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="categoryIT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category (Italian)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (English, comma-separated)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="tagsIT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (Italian, comma-separated)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="readingTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reading Time (English)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="readingTimeIT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reading Time (Italian)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="desktopImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desktop Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={blogForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full md:w-auto">
                Generate Blog Post Data
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogBuilder;
