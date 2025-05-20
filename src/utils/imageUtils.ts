
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
  
  // Add loading="lazy", decoding="async", and fetchpriority attributes to all images
  processedContent = processedContent.replace(/<img\s+([^>]*)>/g, (match, attrs) => {
    // Skip if image already has proper attributes
    if (attrs.includes('loading="lazy"') && 
        attrs.includes('decoding="async"') && 
        attrs.includes('fetchpriority')) return match;
    
    let newAttrs = attrs;
    
    // Add loading attribute if missing
    if (!attrs.includes('loading=')) {
      newAttrs += ' loading="lazy"';
    }
    
    // Add decoding attribute if missing
    if (!attrs.includes('decoding=')) {
      newAttrs += ' decoding="async"';
    }
    
    // Add fetchpriority attribute if missing
    if (!attrs.includes('fetchpriority')) {
      newAttrs += ' fetchpriority="auto"';
    }
    
    // Add width and height attributes if missing to prevent layout shifts
    if (!attrs.includes('width=') && !attrs.includes('height=')) {
      newAttrs += ' width="800" height="auto"';
    }
    
    // Add explicit styles to prevent Content Layout Shifts
    if (!attrs.includes('style=')) {
      newAttrs += ' style="aspect-ratio: auto; max-width: 100%;"';
    }
    
    // Add cache busting
    if (!attrs.includes('?t=')) {
      const now = Date.now();
      if (attrs.includes('src="')) {
        newAttrs = newAttrs.replace(/src="([^"]+)"/, `src="$1?t=${now}"`);
      }
    }
    
    return `<img ${newAttrs}>`;
  });
  
  // Add srcset for responsive images when possible
  processedContent = processedContent.replace(/<img\s+([^>]*)src="([^"]+)"([^>]*)>/g, (match, before, imgSrc, after) => {
    // Skip already optimized images or SVGs
    if (match.includes('srcset=') || imgSrc.endsWith('.svg')) return match;
    
    // Only add srcset for local images
    if (imgSrc.startsWith('/') && !before.includes('srcset=') && !after.includes('srcset=')) {
      // Add cache busting parameter
      const cacheBuster = `?t=${Date.now()}`;
      const imgSrcWithCache = imgSrc.includes('?') ? imgSrc : imgSrc + cacheBuster;
      
      // Generate responsive srcset
      const srcset = `srcset="${imgSrcWithCache} 1x, ${imgSrcWithCache} 2x"`;
      
      // Add sizes attribute if missing
      let sizesAttr = '';
      if (!match.includes('sizes=')) {
        sizesAttr = ' sizes="(max-width: 768px) 100vw, 800px"';
      }
      
      return `<img ${before}src="${imgSrcWithCache}" ${srcset}${sizesAttr}${after}>`;
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
        console.log("Found marketing images in DOM, applying visibility styles");
        
        // Create style element for media queries
        const existingStyle = document.getElementById("responsive-image-styles");
        if (!existingStyle) {
          const styleEl = document.createElement('style');
          styleEl.id = "responsive-image-styles";
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
        }
        
        // Add cache busting to image sources
        const timestamp = Date.now();
        if (desktopImg instanceof HTMLImageElement && !desktopImg.src.includes('?t=')) {
          desktopImg.src = `${desktopImg.src.split('?')[0]}?t=${timestamp}`;
        }
        if (mobileImg instanceof HTMLImageElement && !mobileImg.src.includes('?t=')) {
          mobileImg.src = `${mobileImg.src.split('?')[0]}?t=${timestamp}`;
        }
        
        // Set initial state based on current device with important flag
        if (isMobile) {
          // Mobile display
          desktopImg.style.cssText = "display: none !important";
          mobileImg.style.cssText = "display: block !important";
        } else {
          // Desktop display
          desktopImg.style.cssText = "display: block !important";
          mobileImg.style.cssText = "display: none !important";
        }
        
        console.log(`Images visibility set for ${isMobile ? 'mobile' : 'desktop'} display`);
        
        // Force re-render with timeout to ensure styles are applied
        setTimeout(() => {
          if (isMobile) {
            desktopImg.style.cssText = "display: none !important";
            mobileImg.style.cssText = "display: block !important";
          } else {
            desktopImg.style.cssText = "display: block !important";
            mobileImg.style.cssText = "display: none !important";
          }
        }, 100);
      } else {
        console.log("Marketing images not found in DOM");
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
  
  // Set fetchpriority
  imgElement.setAttribute('fetchpriority', isAboveFold ? 'high' : 'auto');
  
  // Add explicit dimensions to prevent CLS
  if (!imgElement.hasAttribute('width') && !imgElement.hasAttribute('height') && 
      imgElement.naturalWidth && imgElement.naturalHeight) {
    imgElement.width = imgElement.naturalWidth;
    imgElement.height = imgElement.naturalHeight;
    
    // Set aspect ratio to prevent layout shifts
    imgElement.style.aspectRatio = `${imgElement.naturalWidth}/${imgElement.naturalHeight}`;
  }
  
  // Add cache busting
  if (!imgElement.src.includes('?t=')) {
    imgElement.src = `${imgElement.src.split('?')[0]}?t=${Date.now()}`;
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
