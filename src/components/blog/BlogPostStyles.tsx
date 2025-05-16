
import React from "react";

const BlogPostStyles: React.FC = () => {
  return (
    <style>
      {`
      /* Critical fix for blog layout */
      .prose p {
        text-align: justify;
        color: rgb(75 85 99);
        margin-bottom: 1rem;
      }
      
      .prose h1, .prose h2, .prose h3 {
        color: rgb(31 41 55);
        margin-top: 1.5rem;
        margin-bottom: 1rem;
      }
      
      .prose img {
        max-width: 100%;
        height: auto;
      }
      
      /* Desktop images - ensure proper display */
      .desktop-image-container,
      .marketing-desktop-image,
      #marketing-desktop-image {
        width: 100%;
        margin: 2rem 0;
      }
      
      /* Mobile images  */
      .mobile-image-container,
      .marketing-mobile-image,
      #marketing-mobile-image {
        width: 100%;
        margin: 2rem 0;
      }
      
      /* Link styling for better visibility */
      .prose a {
        color: #2563eb;
        text-decoration: underline;
        font-weight: 500;
      }
      
      .prose a:hover {
        color: #1d4ed8;
        text-decoration: underline;
      }
      
      /* Related resources section styling */
      .related-resources {
        padding-top: 1.5rem;
        margin-top: 2rem;
        border-top: 1px solid #e5e7eb;
      }
      
      .related-resources h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }
      
      .related-resources ul {
        list-style-type: disc;
        padding-left: 1.5rem;
      }
      
      .related-resources li {
        margin-bottom: 0.5rem;
      }
      
      /* Blog title fix - critical to correct layout */
      .blog-post-title {
        display: block !important;
        margin-bottom: 1.5rem !important;
      }
      
      /* Hide ALL duplicate titles in content */
      .prose h1:first-child,
      .prose h2:first-child {
        display: none !important;
      }
      
      /* Fix blog header spacing */
      .blog-header {
        margin-bottom: 2rem !important;
        display: block !important;
      }
      
      @media (max-width: 768px) {
        /* Mobile content optimization */
        .content-mobile-optimized p {
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }
        
        .content-mobile-optimized img {
          height: auto !important;
          width: 100% !important;
        }
        
        /* Mobile specific heading styles */
        .mobile-heading {
          font-size: 1.75rem !important;
          line-height: 1.3 !important;
        }
        
        /* Mobile image display */
        #marketing-desktop-image {
          display: none !important;
        }
        #marketing-mobile-image {
          display: block !important;
        }
      }
      
      /* Desktop image display */
      @media (min-width: 769px) {
        #marketing-desktop-image {
          display: block !important;
        }
        #marketing-mobile-image {
          display: none !important;
        }
      }
      
      /* Final fix for over-specificity issues */
      @media (max-width: 768px) {
        #marketing-desktop-image {
          display: none !important;
        }
        #marketing-mobile-image {
          display: block !important;
        }
      }
      `}
    </style>
  );
};

export default BlogPostStyles;
