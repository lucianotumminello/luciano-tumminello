
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
  processedContent = processedContent.replace(/<img\s+([^>]*)src="([^"]+)"([^>]*)>/g, (match, before, src, after) => {
    // Skip already optimized images or SVGs
    if (match.includes('srcset=') || src.endsWith('.svg')) return match;
    
    // Only add srcset for local images
    if (src.startsWith('/') && !before.includes('srcset=') && !after.includes('srcset=')) {
      const srcset = `srcset="${src} 1x, ${src} 2x"`;
      return `<img ${before}src="${src}" ${srcset}${after}>`;
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
          // Mobile display
          desktopImg.style.cssText = "display: none !important";
          mobileImg.style.cssText = "display: block !important";
          
          // Add inline styles directly to the elements for maximum specificity
          const desktopImgElem = desktopImg as HTMLElement;
          const mobileImgElem = mobileImg as HTMLElement;
          if (desktopImgElem && mobileImgElem) {
            desktopImgElem.setAttribute("style", "display: none !important");
            mobileImgElem.setAttribute("style", "display: block !important");
          }
        } else {
          // Desktop display
          desktopImg.style.cssText = "display: block !important";
          mobileImg.style.cssText = "display: none !important";
          
          // Add inline styles directly to the elements for maximum specificity
          const desktopImgElem = desktopImg as HTMLElement;
          const mobileImgElem = mobileImg as HTMLElement;
          if (desktopImgElem && mobileImgElem) {
            desktopImgElem.setAttribute("style", "display: block !important");
            mobileImgElem.setAttribute("style", "display: none !important");
          }
        }
      }
    } catch (error) {
      console.error("Error updating image visibility:", error);
    }
  }
};
