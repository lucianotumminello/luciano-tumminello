
import React from 'react';

const BlogPostStyles = () => {
  const styles = `
    .prose h1 { font-size: 2.25rem; margin-top: 2rem; margin-bottom: 1rem; font-weight: 700; color: #1f2937; }
    .prose h2 { font-size: 1.75rem; margin-top: 1.75rem; margin-bottom: 0.75rem; font-weight: 700; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.375rem; }
    .prose h3 { font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 0.75rem; font-weight: 600; color: #374151; }
    .prose h4 { font-size: 1.25rem; margin-top: 1.25rem; margin-bottom: 0.5rem; font-weight: 600; color: #4b5563; }
    .prose p { margin-top: 1rem; margin-bottom: 1rem; line-height: 1.7; }
    .prose strong { font-weight: 600; color: #111827; }
    .prose ul { margin-top: 1rem; margin-bottom: 1rem; padding-left: 1.5rem; list-style-type: disc; }
    .prose ol { margin-top: 1rem; margin-bottom: 1rem; padding-left: 1.5rem; list-style-type: decimal; }
    .prose li { margin-top: 0.5rem; margin-bottom: 0.5rem; }
    .prose li > ul, .prose li > ol { margin-top: 0.5rem; margin-bottom: 0.5rem; }
    .prose blockquote { margin: 1.5rem 0; padding-left: 1rem; border-left: 4px solid #e5e7eb; font-style: italic; color: #6b7280; }
    .prose img { margin: 1.5rem auto; border-radius: 0.375rem; }
    .prose a { color: #2563eb; text-decoration: none; }
    .prose a:hover { text-decoration: underline; }
    .prose code { font-family: monospace; font-size: 0.875em; color: #111827; background-color: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 0.25rem; }
    .prose pre { margin: 1.5rem 0; padding: 1rem; background-color: #1f2937; color: #e5e7eb; border-radius: 0.375rem; overflow-x: auto; }
    .prose pre code { background-color: transparent; padding: 0; color: inherit; }
    .prose table { width: 100%; margin: 1.5rem 0; border-collapse: collapse; }
    .prose th { padding: 0.5rem; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
    .prose td { padding: 0.5rem; border-bottom: 1px solid #e5e7eb; }
    .content-mobile-optimized img { width: 100% !important; height: auto !important; }
    #marketing-desktop-image img, #marketing-mobile-image img { max-width: 100%; height: auto; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
    .related-resources { margin-top: 3rem; padding: 1.5rem; background-color: #f9fafb; border-radius: 0.5rem; }
    .related-resources h3 { margin-top: 0 !important; }
    @media (max-width: 768px) {
      .prose h1 { font-size: 1.875rem; }
      .prose h2 { font-size: 1.5rem; }
      .prose h3 { font-size: 1.25rem; }
      .prose h4 { font-size: 1.125rem; }
    }
  `;

  return (
    <style dangerouslySetInnerHTML={{ __html: styles }} />
  );
};

export default BlogPostStyles;
