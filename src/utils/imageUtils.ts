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
  
  // Add loading="lazy", decoding="async", and other attributes to all images with better browser compatibility
  processedContent = processedContent.replace(/<img\s+([^>]*)>/g, (match, attrs) => {
    // Skip if image already has proper attributes
    if (attrs.includes('loading="lazy"') && attrs.includes('decoding="async"')) return match;
    
    let newAttrs = attrs;
    
    // Add loading attribute if missing
    if (!attrs.includes('loading=')) {
      newAttrs += ' loading="lazy"';
    }
    
    // Add decoding attribute if missing
    if (!attrs.includes('decoding=')) {
      newAttrs += ' decoding="async"';
    }
    
    // Add importance attribute for broader compatibility
    if (!attrs.includes('importance=')) {
      newAttrs += ' importance="auto"';
    }
    
    // Add width and height attributes if missing to prevent layout shifts
    if (!attrs.includes('width=') && !attrs.includes('height=')) {
      newAttrs += ' width="800" height="auto"';
    }
    
    // Add explicit styles to prevent Content Layout Shifts
    if (!attrs.includes('style=')) {
      newAttrs += ' style="max-width: 100%;"';
    }
    
    return `<img ${newAttrs}>`;
  });
  
  // Add srcset for responsive images when possible
  processedContent = processedContent.replace(/<img\s+([^>]*)src="([^"]+)"([^>]*)>/g, (match, before, imgSrc, after) => {
    // Skip already optimized images or SVGs
    if (match.includes('srcset=') || imgSrc.endsWith('.svg')) return match;
    
    // Only add srcset for local images
    if (imgSrc.startsWith('/') && !before.includes('srcset=') && !after.includes('srcset=')) {
      // Generate responsive srcset
      const srcset = `srcset="${imgSrc} 1x, ${imgSrc} 2x"`;
      
      // Add sizes attribute if missing
      let sizesAttr = '';
      if (!match.includes('sizes=')) {
        sizesAttr = ' sizes="(max-width: 768px) 100vw, 800px"';
      }
      
      return `<img ${before}src="${imgSrc}" ${srcset}${sizesAttr}${after}>`;
    }
    return match;
  });
  
  // Convert large images to WebP format when possible - but keep original format as fallback
  processedContent = processedContent.replace(/<img\s+([^>]*)src="([^"]+\.(jpe?g|png))"([^>]*)>/g, (match, before, imgSrc, ext, after) => {
    if (!imgSrc.includes('?format=') && !imgSrc.includes('data:image')) {
      // Create picture element with webp and original format
      return `<picture>
  <source srcset="${imgSrc}?format=webp" type="image/webp">
  <img ${before}src="${imgSrc}"${after}>
</picture>`;
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
        
        // Create style element for media queries - compatible with all browsers
        const styleEl = document.createElement('style');
        styleEl.innerHTML = `
          @media (max-width: 768px) {
            #marketing-desktop-image { display: none !important; }
            #marketing-mobile-image { display: block !important; }
          }
          @media (min-width: 769px) {
            #marketing-desktop-image { display: block !important; }
            #marketing-mobile-image { display: none !important; }
          }
        `;
        document.head.appendChild(styleEl);
        
        if (isMobile) {
          // Mobile display
          desktopImg.style.display = "none";
          mobileImg.style.display = "block";
          
          // Add explicit dimensions to prevent layout shifts
          if (mobileImg instanceof HTMLImageElement) {
            mobileImg.setAttribute('width', '100%');
            mobileImg.setAttribute('height', 'auto');
          }
        } else {
          // Desktop display
          desktopImg.style.display = "block";
          mobileImg.style.display = "none";
          
          // Add explicit dimensions to prevent layout shifts
          if (desktopImg instanceof HTMLImageElement) {
            desktopImg.setAttribute('width', '100%');
            desktopImg.setAttribute('height', 'auto');
          }
        }
      }
    } catch (error) {
      console.error("Error updating image visibility:", error);
    }
  }
};

/**
 * Optimizes a specific image for loading performance
 * @param imgElement - Image element to optimize
 */
export const optimizeSingleImage = (imgElement: HTMLImageElement) => {
  // Skip if already optimized
  if (imgElement.hasAttribute('data-optimized')) return;
  
  // Set loading strategy
  const isAboveFold = isElementInViewport(imgElement);
  imgElement.loading = isAboveFold ? 'eager' : 'lazy';
  imgElement.decoding = isAboveFold ? 'sync' : 'async';
  
  // Set importance attribute (better browser compatibility than fetchpriority)
  imgElement.setAttribute('importance', isAboveFold ? 'high' : 'auto');
  
  // Add explicit dimensions to prevent CLS
  if (!imgElement.hasAttribute('width') && !imgElement.hasAttribute('height') && 
      imgElement.naturalWidth && imgElement.naturalHeight) {
    imgElement.width = imgElement.naturalWidth;
    imgElement.height = imgElement.naturalHeight;
    
    // Set width/height explicitly rather than aspect ratio for better Edge compatibility
    imgElement.style.maxWidth = '100%';
    imgElement.style.height = 'auto';
  }
  
  // Mark as optimized
  imgElement.setAttribute('data-optimized', 'true');
};

/**
 * Checks if element is in viewport
 * @param element - Element to check
 */
const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
