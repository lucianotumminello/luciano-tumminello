
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";

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
  
  // Add mobile optimizations for images
  if (isMobile) {
    // Replace all <img> tags with optimized versions
    processedContent = processedContent.replace(/<img\s+([^>]*)>/g, (match, attrs) => {
      // Don't modify if it already has loading="lazy"
      if (attrs.includes('loading="lazy"')) return match;
      
      return `<img ${attrs} loading="lazy" decoding="async">`;
    });
  }
  
  return processedContent;
};

/**
 * Updates image visibility based on screen size
 * @param contentContainsTargetPost - Whether the content contains the target post
 * @param isMobile - Whether the device is mobile
 */
export const updateImageVisibility = (contentContainsTargetPost: boolean, isMobile: boolean) => {
  if (contentContainsTargetPost) {
    setTimeout(() => {
      const desktopImg = document.getElementById("marketing-desktop-image");
      const mobileImg = document.getElementById("marketing-mobile-image");
      
      if (desktopImg && mobileImg) {
        console.log("Found marketing images in DOM, applying final visibility styles");
        if (isMobile) {
          desktopImg.style.display = "none !important";
          mobileImg.style.display = "block !important";
          
          // Force the style with setAttribute as a fallback
          desktopImg.setAttribute("style", "display: none !important");
          mobileImg.setAttribute("style", "display: block !important");
          
          // Try direct CSS manipulation
          const desktopImgElem = desktopImg as HTMLElement;
          const mobileImgElem = mobileImg as HTMLElement;
          if (desktopImgElem && mobileImgElem) {
            desktopImgElem.style.cssText = "display: none !important";
            mobileImgElem.style.cssText = "display: block !important";
          }
        } else {
          desktopImg.style.display = "block !important";
          mobileImg.style.display = "none !important";
          
          // Force the style with setAttribute as a fallback
          desktopImg.setAttribute("style", "display: block !important");
          mobileImg.setAttribute("style", "display: none !important");
          
          // Try direct CSS manipulation
          const desktopImgElem = desktopImg as HTMLElement;
          const mobileImgElem = mobileImg as HTMLElement;
          if (desktopImgElem && mobileImgElem) {
            desktopImgElem.style.cssText = "display: block !important";
            mobileImgElem.style.cssText = "display: none !important";
          }
        }
      } else {
        console.warn("Marketing images not found in DOM after rendering");
      }
    }, 100);
  }
};
