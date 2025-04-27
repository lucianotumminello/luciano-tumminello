
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useLanguage } from "@/contexts/LanguageContext";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSortedBlogPosts } from "@/utils/blogDataManager";
import { trackPageView } from "@/utils/analytics";
import { Helmet } from "react-helmet-async";
import { generateSlug } from '@/utils/blogUtils';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Blog = () => {
  console.log("Blog component rendering");
  const { language } = useLanguage();
  const isItalian = language === "it";
  const title = isItalian ? "Blog | Luciano Tumminello" : "Blog | Luciano Tumminello";
  const description = isItalian 
    ? "Articoli, riflessioni e approfondimenti nel campo del marketing, dell'intelligenza artificiale e della leadership." 
    : "Articles, reflections, and insights in marketing, artificial intelligence, and leadership.";
  
  useEffect(() => {
    console.log("Blog useEffect running");
    trackPageView(
      "/blog", 
      title
    );
  }, [title]);
  
  try {
    console.log("Fetching blog posts");
    const blogPosts = getSortedBlogPosts();
    console.log(`Found ${blogPosts.length} blog posts`);
    
    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="website" />
        </Helmet>
        
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-8 pb-16">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {isItalian ? "Blog" : "Blog"}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {isItalian 
                  ? "Scopri approfondimenti nel marketing, AI e leadership da Luciano Tumminello" 
                  : "Discover insights on marketing, AI and leadership from Luciano Tumminello"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => {
                // Generate slug from title
                const slug = generateSlug(post.title);
                
                return (
                  <Card 
                    key={slug} 
                    className="overflow-hidden border border-gray-200 transition-shadow hover:shadow-lg"
                  >
                    <div>
                      <AspectRatio ratio={16/9} className="bg-gray-100">
                        <img 
                          src={post.imageUrl} 
                          alt={isItalian ? post.titleIT : post.title}
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      </AspectRatio>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">
                          {isItalian ? post.categoryIT : post.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {isItalian ? post.dateIT : post.date}
                        </span>
                      </div>
                      
                      <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                        {isItalian ? post.titleIT : post.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {isItalian ? post.excerptIT : post.excerpt}
                      </p>
                      
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500">
                          {isItalian ? post.readingTimeIT : post.readingTime}
                        </span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-6 pt-0">
                      <Link to={`/blog/${slug}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          {isItalian ? "Leggi l'articolo" : "Read Article"}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </main>
          
          <Footer />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error rendering Blog component:", error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <Header />
        <div className="max-w-lg w-full my-12">
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              We're having trouble loading the blog. Please try again later.
            </AlertDescription>
          </Alert>
          <Link to="/">
            <Button variant="default">Return to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Blog;
