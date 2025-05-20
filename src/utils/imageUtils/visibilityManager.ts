
/**
 * Updates image visibility based on screen size
 * @param contentContainsTargetPost - Whether the content contains the target post
 * @param isMobile - Whether the device is mobile
 */
export const updateImageVisibility = (contentContainsTargetPost: boolean, isMobile: boolean) => {
  if (contentContainsTargetPost) {
    try {
      // Force refresh of image URLs with timestamp to prevent caching issues
      const timestamp = new Date().getTime();
      
      // Find all blog images and update visibility
      const desktopImages = document.querySelectorAll('.desktop-blog-image');
      const mobileImages = document.querySelectorAll('.mobile-blog-image');
      
      console.log(`Found ${desktopImages.length} desktop and ${mobileImages.length} mobile images`);
      
      // Update desktop images
      desktopImages.forEach(img => {
        if (img instanceof HTMLImageElement) {
          // Force reload by adding timestamp
          const originalSrc = img.src.split('?')[0];
          img.src = `${originalSrc}?t=${timestamp}`;
          
          // Set visibility based on device
          img.style.display = isMobile ? 'none' : 'block';
          
          // Add width and height attributes to prevent layout shifts
          if (!img.width) img.width = 1200;
          if (!img.height) img.height = 675;
        }
      });
      
      // Update mobile images
      mobileImages.forEach(img => {
        if (img instanceof HTMLImageElement) {
          // Force reload by adding timestamp
          const originalSrc = img.src.split('?')[0];
          img.src = `${originalSrc}?t=${timestamp}`;
          
          // Set visibility based on device
          img.style.display = isMobile ? 'block' : 'none';
          
          // Add width and height attributes to prevent layout shifts
          if (!img.width) img.width = 640;
          if (!img.height) img.height = 360;
        }
      });
      
      // Add media query styles to head
      const styleId = 'responsive-blog-images';
      if (!document.getElementById(styleId)) {
        const styleEl = document.createElement('style');
        styleEl.id = styleId;
        styleEl.innerHTML = `
          @media (max-width: 768px) {
            .desktop-blog-image { display: none !important; }
            .mobile-blog-image { display: block !important; }
          }
          @media (min-width: 769px) {
            .desktop-blog-image { display: block !important; }
            .mobile-blog-image { display: none !important; }
          }
        `;
        document.head.appendChild(styleEl);
      }
      
      console.log("Image visibility updated based on device type");
    } catch (error) {
      console.error("Error updating image visibility:", error);
    }
  }
};
