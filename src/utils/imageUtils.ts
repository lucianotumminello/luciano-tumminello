
/**
 * Updates image visibility based on device type
 * @param force Whether to force the update regardless of current state
 * @param isMobile Whether the current device is mobile
 */
export const updateImageVisibility = (force: boolean = false, isMobile: boolean = false): void => {
  // Find all desktop and mobile images
  const desktopImages = document.querySelectorAll('.desktop-blog-image');
  const mobileImages = document.querySelectorAll('.mobile-blog-image');
  
  if (desktopImages.length || mobileImages.length || force) {
    console.log(`Updating image visibility for ${desktopImages.length} desktop and ${mobileImages.length} mobile images. Mobile mode: ${isMobile}`);
    
    // Handle desktop images
    desktopImages.forEach(img => {
      if (img instanceof HTMLImageElement) {
        img.style.display = isMobile ? 'none' : 'block';
        img.style.visibility = 'visible';
        img.style.opacity = '1';
      }
    });
    
    // Handle mobile images
    mobileImages.forEach(img => {
      if (img instanceof HTMLImageElement) {
        img.style.display = isMobile ? 'block' : 'none';
        img.style.visibility = 'visible';
        img.style.opacity = '1';
      }
    });
    
    // Also handle any responsive images that should change based on device
    const responsiveImages = document.querySelectorAll('.responsive-blog-image');
    responsiveImages.forEach(img => {
      if (img instanceof HTMLImageElement) {
        const mobileUrl = img.dataset.mobileUrl;
        const desktopUrl = img.dataset.desktopUrl;
        
        if (mobileUrl && desktopUrl) {
          img.src = isMobile ? mobileUrl : desktopUrl;
          img.style.display = 'block';
          img.style.visibility = 'visible';
          img.style.opacity = '1';
        }
      }
    });
  }
};

/**
 * Optimizes images in HTML content for mobile or desktop
 * @param content The HTML content containing images
 * @param isMobile Whether the content should be optimized for mobile
 * @returns The content with optimized images
 */
export const optimizeImagesInContent = (content: string, isMobile: boolean = false): string => {
  if (!content) return '';
  
  // This is a simplistic approach - in a real app, consider using a proper HTML parser
  let optimizedContent = content;
  
  // Add responsive classes to images
  optimizedContent = optimizedContent.replace(
    /<img([^>]*)>/g, 
    (match, attributes) => {
      // Don't modify if already has responsive classes
      if (attributes.includes('desktop-blog-image') || attributes.includes('mobile-blog-image')) {
        return match;
      }
      
      // Add responsive styles
      return `<img${attributes} class="w-full h-auto" style="max-width:100%;">`;
    }
  );
  
  // Add lazy loading to images that don't already have it
  optimizedContent = optimizedContent.replace(
    /<img([^>]*)(?!loading=)([^>]*)>/g,
    (match, attributesBefore, attributesAfter) => {
      if (match.includes('loading=')) {
        return match; // Skip if already has loading attribute
      }
      return `<img${attributesBefore} loading="lazy"${attributesAfter}>`;
    }
  );
  
  return optimizedContent;
};

/**
 * Gets the optimal image URL based on device type
 * @param mobileUrl The URL for mobile devices
 * @param desktopUrl The URL for desktop devices
 * @param isMobile Whether the current device is mobile
 * @returns The optimal image URL
 */
export const getOptimalImageUrl = (
  mobileUrl: string, 
  desktopUrl: string,
  isMobile: boolean = false
): string => {
  if (isMobile) {
    return mobileUrl || desktopUrl; // Fallback to desktop if mobile not available
  }
  return desktopUrl || mobileUrl; // Fallback to mobile if desktop not available
};
