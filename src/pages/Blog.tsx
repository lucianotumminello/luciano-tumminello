
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Coming Soon",
      excerpt: "Coming Soon",
      date: "April 15, 2023",
      category: "Design",
      imageUrl: "/lovable-uploads/c98a5c59-9ec0-4e2e-9cef-30dde0a7e15b.png"
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
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-lg text-gray-600 max-w-full mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
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
                    <a href="#">{post.title}</a>
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <a href="#" className="text-primary font-medium text-sm hover:underline">
                    Read More →
                  </a>
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
