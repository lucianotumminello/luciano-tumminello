
/**
 * Utility functions for image handling
 */

import { DEFAULT_AUTHOR_IMAGE } from './blog/constants';

/**
 * Optimizes the content by updating image attributes for better performance
 * @param content HTML content string
 * @param isMobile Whether the current device is mobile
 * @returns Optimized HTML content
 */
export const optimizeImagesInContent = (content: string, isMobile: boolean): string => {
  if (!content) return '';
  
  // Add loading="lazy" to all images except the first one
  let processedContent = content.replace(
    /<img((?!loading=["']lazy["']|loading=["']eager["']).)*?>/gi,
    (match, offset) => {
      if (offset > 1000) {
        return match.replace('<img', '<img loading="lazy"');
      }
      return match.replace('<img', '<img loading="eager"');
    }
  );
  
  return processedContent;
};

/**
 * Updates image visibility based on device type (mobile/desktop)
 * @param displayAll Whether to display all images or just device-specific ones
 * @param isMobile Whether the current device is mobile
 */
export const updateImageVisibility = (displayAll: boolean = false, isMobile: boolean = false): void => {
  // Implementation is on client side only
  if (typeof document === 'undefined') return;
  
  try {
    const mobileImages = document.querySelectorAll('.mobile-only-image');
    const desktopImages = document.querySelectorAll('.desktop-only-image');
    
    if (displayAll) {
      // Show all images
      mobileImages.forEach(img => {
        (img as HTMLElement).style.display = isMobile ? 'block' : 'none';
      });
      
      desktopImages.forEach(img => {
        (img as HTMLElement).style.display = isMobile ? 'none' : 'block';
      });
    } else {
      // Only show device-specific images
      mobileImages.forEach(img => {
        (img as HTMLElement).style.display = isMobile ? 'block' : 'none';
      });
      
      desktopImages.forEach(img => {
        (img as HTMLElement).style.display = isMobile ? 'none' : 'block';
      });
    }
  } catch (error) {
    console.error('Error updating image visibility:', error);
  }
};

/**
 * Updates all author avatar images in the blog post to use the default author image
 */
export const updateAuthorAvatars = (): void => {
  // Implementation is on client side only
  if (typeof document === 'undefined') return;
  
  try {
    // Find all author avatar images
    const avatarImages = document.querySelectorAll('.avatar-image, [alt*="author"], [alt*="Author"], img[src*="author"]');
    
    console.log(`Found ${avatarImages.length} author avatars to update`);
    
    // Update all avatar images to use the default author image
    avatarImages.forEach(img => {
      const imgElement = img as HTMLImageElement;
      if (imgElement.src && !imgElement.src.includes('19242fa3-00e7-4e41-8c2b-26680a3c9ec8')) {
        imgElement.src = DEFAULT_AUTHOR_IMAGE;
        imgElement.setAttribute('data-avatar-updated', 'true');
        console.log('Updated author avatar:', imgElement.src);
      }
    });
    
    // Additional selector for avatars in radix-ui components
    const radixAvatars = document.querySelectorAll('[data-radix-avatar-image]');
    radixAvatars.forEach(avatar => {
      const imgElement = avatar as HTMLImageElement;
      if (imgElement.src && !imgElement.src.includes('19242fa3-00e7-4e41-8c2b-26680a3c9ec8')) {
        imgElement.src = DEFAULT_AUTHOR_IMAGE;
        imgElement.setAttribute('data-avatar-updated', 'true');
        console.log('Updated radix avatar:', imgElement.src);
      }
    });
  } catch (error) {
    console.error('Error updating author avatars:', error);
  }
};
