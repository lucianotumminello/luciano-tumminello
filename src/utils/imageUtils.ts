
/**
 * Optimizes images in HTML content for better loading performance and responsive display
 * @param content - HTML content to process
 * @param isMobile - Whether the device is mobile
 * @returns Processed HTML content with optimized images
 */
export const optimizeImagesInContent = (content: string, isMobile: boolean): string => {
  if (!content) return "";
  
  // Process content for optimization
  let processedContent = content;
  
  // Add loading="lazy" and decoding="async" to all images that don't have them
  processedContent = processedContent.replace(/<img\s+([^>]*)>/g, (match, attrs) => {
    // Don't modify if it already has loading="lazy"
    if (attrs.includes('loading="lazy"')) return match;
    
    let newAttrs = attrs;
    if (!attrs.includes('loading=')) {
      newAttrs += ' loading="lazy"';
    }
    
    return `<img ${newAttrs}>`;
  });
  
  // Add class for responsive images
  processedContent = processedContent.replace(/<img\s+([^>]*)>/g, (match, attrs) => {
    if (attrs.includes('class=')) {
      return match.replace(/class="([^"]*)"/, 'class="$1 blog-responsive-image"');
    } else {
      return match.replace('<img ', '<img class="blog-responsive-image" ');
    }
  });
  
  return processedContent;
};

/**
 * Updates specific blog post images when needed
 * @param slug - The blog post slug
 * @param isMobile - Whether the device is mobile
 */
export const updateBlogPostSpecificImages = (slug: string, isMobile: boolean) => {
  // Set special images for specific posts if needed
  if (slug === "human-tech-equation-digital-transformation") {
    const desktopImageUrl = "/lovable-uploads/6ca4ab8f-5ca0-4f53-8f16-9fcdeb0394f8.png";
    const mobileImageUrl = "/lovable-uploads/3de9471b-87c3-4da4-9052-7db78cfa8464.png";
    
    try {
      // Find the main blog image
      const mainImage = document.querySelector('.blog-post-header-image');
      if (mainImage instanceof HTMLImageElement) {
        mainImage.src = isMobile ? mobileImageUrl : desktopImageUrl;
        mainImage.style.maxHeight = isMobile ? '260px' : '380px';
      }
    } catch (error) {
      console.error("Error updating blog post images:", error);
    }
  }
};
