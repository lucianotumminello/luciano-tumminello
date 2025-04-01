
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Designing for Accessibility: A Practical Guide",
      excerpt: "Learn how to make your digital products more accessible to all users with these practical tips and techniques.",
      date: "April 15, 2023",
      category: "Design",
      imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "The Evolution of UI Design Trends in 2023",
      excerpt: "Exploring the latest design trends that are shaping user interfaces this year and what they mean for the future.",
      date: "March 22, 2023",
      category: "UI Design",
      imageUrl: "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "Optimizing React Performance for Large Applications",
      excerpt: "Technical insights on improving the performance of complex React applications through code optimization.",
      date: "February 8, 2023",
      category: "Development",
      imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 4,
      title: "Building Effective Design Systems from Scratch",
      excerpt: "A comprehensive guide to creating and implementing design systems that scale across products and teams.",
      date: "January 17, 2023",
      category: "Design Systems",
      imageUrl: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thoughts, insights, and perspectives on design, development, and the digital world.
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
