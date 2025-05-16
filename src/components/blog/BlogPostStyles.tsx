
import React from "react";

const BlogPostStyles: React.FC = () => {
  return (
    <style>
      {`
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
      
      /* Desktop images - important to ensure display */
      .desktop-image-container,
      .marketing-desktop-image {
        display: block !important;
        margin: 2rem 0;
        width: 100%;
      }
      
      /* Mobile images - important to ensure proper display */
      .mobile-image-container,
      .marketing-mobile-image {
        display: none !important;
        margin: 2rem 0;
        width: 100%;
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
      
      @media (max-width: 768px) {
        /* Hide desktop images on mobile */
        .desktop-image-container,
        .marketing-desktop-image,
        #marketing-desktop-image {
          display: none !important;
        }
        
        /* Show mobile images on mobile */
        .mobile-image-container,
        .marketing-mobile-image,
        #marketing-mobile-image {
          display: block !important;
        }
        
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
      }
      `}
    </style>
  );
};

export default BlogPostStyles;
