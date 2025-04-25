
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

const BlogPostLayout = ({
  children,
  title,
  description,
  imageUrl,
  pageUrl,
  keywords,
  schemaData,
}: BlogPostLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{title} | Luciano Tumminello</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Luciano Tumminello" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@luciano_tumminello" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Luciano Tumminello" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-1 pt-8 pb-16 px-4 bg-gray-50">
        {/* Adding fallback h1 in case the BlogPostHeader component doesn't provide one */}
        <h1 className="sr-only">{title}</h1>
        <div className="container mx-auto max-w-4xl">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostLayout;
