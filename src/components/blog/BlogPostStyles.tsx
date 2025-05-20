
import React from 'react';

const BlogPostStyles: React.FC = () => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
      /* Enhanced styling for blog post content */
      .prose h2 {
        font-size: 1.75rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-weight: 700;
        color: #1f2937;
        line-height: 1.3;
      }
      
      .prose h3 {
        font-size: 1.4rem;
        margin-top: 1.75rem;
        margin-bottom: 0.75rem;
        font-weight: 600;
        color: #1f2937;
        line-height: 1.4;
      }
      
      .prose h4, .prose h5, .prose h6 {
        font-size: 1.2rem;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #1f2937;
        line-height: 1.4;
      }
      
      .prose p {
        margin-bottom: 1rem;
        line-height: 1.7;
      }
      
      .prose ul, .prose ol {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        padding-left: 1.5rem;
      }
      
      .prose li {
        margin-bottom: 0.25rem;
        position: relative;
        display: list-item !important;
      }
      
      .prose ul li {
        list-style-type: disc;
      }
      
      .prose ol li {
        list-style-type: decimal;
      }
      
      .prose li > ul, .prose li > ol {
        margin-top: 0.25rem;
        margin-bottom: 0.5rem;
        visibility: visible !important;
        display: block !important;
      }
      
      .prose blockquote {
        border-left: 4px solid #e5e7eb;
        padding-left: 1rem;
        font-style: italic;
        margin: 1rem 0;
      }
      
      .prose a {
        color: #2563eb;
        text-decoration: none;
      }
      
      .prose a:hover {
        text-decoration: underline;
      }
      
      .prose img {
        margin: 1.5rem 0;
        border-radius: 0.375rem;
        max-width: 100%;
      }
      
      .prose .related-resources {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid #e5e7eb;
      }
      
      /* Make sure all headers are visible and properly styled */
      .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
        display: block !important;
        visibility: visible !important;
      }
      
      /* Ensure nested elements in the blog post display properly */
      .prose ul, .prose ol, .prose li, .prose p, .prose blockquote {
        display: block !important;
        visibility: visible !important;
      }
    `
      }}
    />
  );
};

export default BlogPostStyles;
