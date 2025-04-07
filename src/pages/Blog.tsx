
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The AI Leadership Revolution: How Marketing Executives Are Navigating the 2025 AI Landscape",
      excerpt: "The AI race is transforming marketing strategies faster than ever before. Here's how forward-thinking leaders are leveraging these advancements to create competitive advantages in 2025.",
      date: "April 7, 2025",
      category: "AI & Marketing",
      imageUrl: "/lovable-uploads/1db0010c-c081-459d-b696-8806b76cd0b5.png",
      slug: "ai-leadership-revolution"
    },
    {
      id: 2,
      title: "Coming Soon",
      excerpt: "Coming Soon",
      date: "March 22, 2023",
      category: "UI Design",
      imageUrl: "/lovable-uploads/c98a5c59-9ec0-4e2e-9cef-30dde0a7e15b.png"
    },
    {
      id: 3,
      title: "Coming Soon",
      excerpt: "Coming Soon",
      date: "February 8, 2023",
      category: "Development",
      imageUrl: "/lovable-uploads/c98a5c59-9ec0-4e2e-9cef-30dde0a7e15b.png"
    },
    {
      id: 4,
      title: "Coming Soon",
      excerpt: "Coming Soon",
      date: "January 17, 2023",
      category: "Design Systems",
      imageUrl: "/lovable-uploads/c98a5c59-9ec0-4e2e-9cef-30dde0a7e15b.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>Blog | Luciano Tumminello</title>
        <meta name="description" content="Strategic insights on digital transformation, AI, and data-driven marketing strategies by Luciano Tumminello." />
        <meta name="keywords" content="marketing blog, AI in marketing, digital transformation, data-driven strategies, Luciano Tumminello" />
      </Helmet>
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-lg text-gray-600 mx-auto max-w-3xl">
              Strategic insights on digital transformation, global operations, and data-driven marketing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">{post.category}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
                    {post.slug ? (
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    ) : (
                      post.title
                    )}
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  {post.slug ? (
                    <Link to={`/blog/${post.slug}`} className="text-primary font-medium text-sm hover:underline">
                      Read More →
                    </Link>
                  ) : (
                    <span className="text-gray-400 font-medium text-sm">Coming Soon...</span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
