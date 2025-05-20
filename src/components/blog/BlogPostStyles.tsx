
import React from 'react';

const BlogPostStyles = () => {
  return (
    <style jsx global>{`
      /* Responsive image handling */
      @media (max-width: 768px) {
        #blog-desktop-image {
          display: none !important;
        }
        #blog-mobile-image {
          display: block !important;
        }
      }
      
      @media (min-width: 769px) {
        #blog-desktop-image {
          display: block !important;
        }
        #blog-mobile-image {
          display: none !important;
        }
      }
      
      /* Enhanced blog content styling */
      .prose {
        max-width: 100%;
      }
      
      .prose img {
        max-width: 100%;
        height: auto;
        border-radius: 0.375rem;
        margin: 1.5rem 0;
      }
      
      .prose h2 {
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: 700;
      }
      
      .prose h3 {
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
        font-size: 1.25rem;
        font-weight: 600;
      }
      
      .prose ul, .prose ol {
        margin-top: 1rem;
        margin-bottom: 1rem;
        padding-left: 1.5rem;
      }
      
      .prose li {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
      
      .prose strong {
        font-weight: 600;
      }
      
      .related-resources {
        margin-top: 3rem;
        padding-top: 1.5rem;
        border-top: 1px solid #e5e7eb;
      }
    `}</style>
  );
};

export default BlogPostStyles;
