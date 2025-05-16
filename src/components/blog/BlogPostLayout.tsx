
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
        
        {/* ContentsSquare Tracking Script */}
        <script type="text/javascript">
          {`
            (function (c, s, q, u, a, r, e) {
                c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};
                c._hjSettings = { hjid: a };
                r = s.getElementsByTagName('head')[0];
                e = s.createElement('script');
                e.async = true;
                e.src = q + c._hjSettings.hjid + u;
                r.appendChild(e);
            })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', 6391574);
          `}
        </script>
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={optimizedDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Luciano Tumminello" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@luciano_tumminello" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={optimizedDescription} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Luciano Tumminello" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Custom meta tags for Human + Tech Equation article */}
        {title.includes("Human + Tech Equation") && (
          <>
            <meta name="article:published_time" content="2025-05-13T09:00:00+00:00" />
            <meta name="article:modified_time" content="2025-05-13T09:00:00+00:00" />
            <meta name="article:section" content="Digital Transformation" />
            <meta name="article:tag" content="Digital Transformation, Workforce Development, Technology, Leadership" />
          </>
        )}
        
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
