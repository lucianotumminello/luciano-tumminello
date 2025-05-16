
/**
 * Optimizes images in HTML content for better loading performance and responsive display
 * @param content - HTML content to process
 * @param isMobile - Whether the device is mobile
 * @returns Processed HTML content with optimized images
 */
export const optimizeImagesInContent = (content: string, isMobile: boolean): string => {
  if (!content) return "";
  
  // Process content for mobile optimization
  let processedContent = content;
  
  // Add loading="lazy" and decoding="async" to all images that don't have them
  processedContent = processedContent.replace(/<img\s+([^>]*)>/g, (match, attrs) => {
    // Don't modify if it already has loading="lazy"
    if (attrs.includes('loading="lazy"') && attrs.includes('decoding="async"')) return match;
    
    let newAttrs = attrs;
    if (!attrs.includes('loading=')) {
      newAttrs += ' loading="lazy"';
    }
    if (!attrs.includes('decoding=')) {
      newAttrs += ' decoding="async"';
    }
    
    // Add width and height attributes if missing to prevent layout shifts
    if (!attrs.includes('width=') && !attrs.includes('height=')) {
      newAttrs += ' width="800" height="auto"';
    }
    
    return `<img ${newAttrs}>`;
  });
  
  // Add srcset for responsive images when possible
  processedContent = processedContent.replace(/<img\s+([^>]*)src="([^"]+)"([^>]*)>/g, (match, before, imageSrc, after) => {
    // Skip already optimized images or SVGs
    if (match.includes('srcset=') || imageSrc.endsWith('.svg')) return match;
    
    // Only add srcset for local images
    if (imageSrc.startsWith('/') && !before.includes('srcset=') && !after.includes('srcset=')) {
      const srcset = `srcset="${imageSrc} 1x, ${imageSrc} 2x"`;
      return `<img ${before}src="${imageSrc}" ${srcset}${after}>`;
    }
    return match;
  });
  
  return processedContent;
};

/**
 * Updates image visibility based on screen size
 * @param contentContainsTargetPost - Whether the content contains the target post
 * @param isMobile - Whether the device is mobile
 */
export const updateImageVisibility = (contentContainsTargetPost: boolean, isMobile: boolean) => {
  if (contentContainsTargetPost) {
    try {
      const desktopImg = document.getElementById("marketing-desktop-image");
      const mobileImg = document.getElementById("marketing-mobile-image");
      
      if (desktopImg && mobileImg) {
        console.log("Found marketing images in DOM, applying final visibility styles");
        
        if (isMobile) {
          // Mobile display - force visibility with !important inline styles
          desktopImg.setAttribute("style", "display: none !important");
          mobileImg.setAttribute("style", "display: block !important");
        } else {
          // Desktop display - force visibility with !important inline styles
          desktopImg.setAttribute("style", "display: block !important");
          mobileImg.setAttribute("style", "display: none !important");
        }
      }
    } catch (error) {
      console.error("Error updating image visibility:", error);
    }
  }
};

/**
 * Updates the specific blog post images for the May 16, 2025 post
 */
export const updateMay16BlogPostImages = () => {
  // Set the desktop and mobile images for the specific blog post
  const desktopImageUrl = "/lovable-uploads/6ca4ab8f-5ca0-4f53-8f16-9fcdeb0394f8.png";
  const mobileImageUrl = "/lovable-uploads/3de9471b-87c3-4da4-9052-7db78cfa8464.png";
  
  try {
    // Check if we're on the correct blog post page
    const pageContent = document.body.textContent || "";
    const isMay16BlogPost = pageContent.includes("The Human + Tech Equation") && 
                           pageContent.includes("Digital Transformation Era") &&
                           pageContent.includes("May 2025");
    
    if (isMay16BlogPost) {
      console.log("Detected May 16, 2025 blog post, updating images");
      
      // Find the desktop and mobile images in the DOM
      const desktopImgElem = document.getElementById("marketing-desktop-image");
      const mobileImgElem = document.getElementById("marketing-mobile-image");
      
      // Update image sources if elements exist
      if (desktopImgElem && desktopImgElem instanceof HTMLImageElement) {
        desktopImgElem.src = desktopImageUrl;
        desktopImgElem.setAttribute("style", window.innerWidth >= 768 ? "display: block !important" : "display: none !important");
      }
      
      if (mobileImgElem && mobileImgElem instanceof HTMLImageElement) {
        mobileImgElem.src = mobileImageUrl;
        mobileImgElem.setAttribute("style", window.innerWidth < 768 ? "display: block !important" : "display: none !important");
      }
      
      // For all blog post images that might be referencing this content
      const allImages = document.querySelectorAll('img[alt*="Human + Tech"], img[alt*="Digital Transformation"]');
      allImages.forEach(img => {
        if (img instanceof HTMLImageElement) {
          const isMobileView = window.innerWidth < 768;
          img.src = isMobileView ? mobileImageUrl : desktopImageUrl;
        }
      });
    }
  } catch (error) {
    console.error("Error updating May 16 blog post images:", error);
  }
};
