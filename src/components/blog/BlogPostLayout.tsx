
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { updateBlogPostSpecificImages } from "@/utils/imageUtils";

interface BlogPostLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
  pageUrl: string;
  keywords: string;
  schemaData: any;
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({
  children,
  title,
  description,
  imageUrl,
  pageUrl,
  keywords,
  schemaData,
}) => {
  // Ensure description is not too long (fixes "Meta description too long" issue)
  const optimizedDescription = description && description.length > 155 
    ? `${description.substring(0, 152)}...` 
    : description;
  
  const { slug } = useParams();
  const isMobile = useIsMobile();
  
  // Handle special cases for specific blog posts
  useEffect(() => {
    if (slug) {
      updateBlogPostSpecificImages(slug, isMobile);
    }
  }, [slug, isMobile]);
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{title} | Luciano Tumminello</title>
        <meta name="description" content={optimizedDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={optimizedDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Luciano Tumminello" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={optimizedDescription} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-1 pt-8 pb-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          {children}
        </div>
      </main>
      
      <Footer />
      
      {/* Global blog styles */}
      <style jsx global>{`
        /* Critical fixes for blog layout */
        .prose p {
          text-align: justify;
          color: rgb(75 85 99);
          margin-bottom: 1rem;
        }
        
        .prose h2, .prose h3 {
          color: rgb(31 41 55);
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .prose img {
          max-width: 100%;
          height: auto;
          margin: 1.5rem 0;
          border-radius: 0.375rem;
        }
        
        .blog-responsive-image {
          max-width: 100%;
          height: auto;
        }
        
        /* Link styling for better visibility */
        .prose a {
          color: #2563eb;
          text-decoration: underline;
          font-weight: 500;
        }
        
        .prose a:hover {
          color: #1d4ed8;
        }
        
        /* Remove any potential duplicate titles */
        .prose h1:first-child {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default BlogPostLayout;
