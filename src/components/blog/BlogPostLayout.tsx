
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

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
    </div>
  );
};

export default BlogPostLayout;
