
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
      
      /* Ensure consistent styling between English and Italian versions */
      [lang="it"] h1, 
      [lang="en"] h1 {
        font-size: 2.25rem;
        line-height: 1.3;
        font-weight: 700;
        margin-top: 2rem;
        margin-bottom: 1rem;
      }
      
      [lang="it"] h2, 
      [lang="en"] h2 {
        font-size: 1.75rem;
        line-height: 1.3;
        font-weight: 600;
        margin-top: 1.75rem;
        margin-bottom: 1rem;
      }
      
      [lang="it"] h3, 
      [lang="en"] h3 {
        font-size: 1.5rem;
        line-height: 1.3;
        font-weight: 600;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
      }
      
      /* Ensure list items are properly displayed in both languages */
      [lang="it"] ul,
      [lang="en"] ul {
        list-style-type: disc;
        padding-left: 1.5rem;
        margin: 1rem 0;
      }
      
      [lang="it"] ol,
      [lang="en"] ol {
        list-style-type: decimal;
        padding-left: 1.5rem;
        margin: 1rem 0;
      }
      
      [lang="it"] li,
      [lang="en"] li {
        margin-bottom: 0.5rem;
        display: list-item !important;
      }
      
      /* Force visibility of nested lists */
      [lang="it"] li > ul,
      [lang="it"] li > ol,
      [lang="en"] li > ul,
      [lang="en"] li > ol {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        display: block !important;
      }
      
      [lang="it"] p,
      [lang="it"] li,
      [lang="en"] p,
      [lang="en"] li {
        line-height: 1.6;
      }
      
      [lang="it"] ul,
      [lang="it"] ol,
      [lang="en"] ul,
      [lang="en"] ol {
        margin-top: 0.75rem;
        margin-bottom: 1rem;
      }
      
      /* Force heading consistency regardless of language */
      [lang="it"] h1, [lang="it"] h2, [lang="it"] h3,
      [lang="en"] h1, [lang="en"] h2, [lang="en"] h3 {
        display: block !important;
        visibility: visible !important;
        font-family: inherit !important;
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

