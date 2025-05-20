
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
      newAttrs += ' style="aspect-ratio: auto; max-width: 100%; object-fit: cover;"';
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
  
  // Apply specific classes for responsive images based on device
  processedContent = processedContent.replace(/<img\s+([^>]*)src="([^"]+)"([^>]*)>/g, (match, before, imgSrc, after) => {
    // Add responsive classes if not present already
    if (!match.includes('class="') || 
        (!match.includes('desktop-blog-image') && !match.includes('mobile-blog-image'))) {
      
      // Determine if this is likely a main content image (not an icon or small image)
      const isMainImage = !imgSrc.includes('icon') && !imgSrc.includes('avatar');
      
      if (isMainImage) {
        // Add display style to ensure correct visibility based on device type
        const displayStyle = isMobile ? 
          'style="display: block !important; width: 100%; object-fit: cover;"' : 
          'style="display: block !important; width: 100%; object-fit: cover;"';
        
        // Add responsive class
        const responsiveClass = isMobile ? 'mobile-blog-image' : 'desktop-blog-image';
        
        if (!match.includes('class=')) {
          after = `class="${responsiveClass}" ${displayStyle} ${after}`;
        } else {
          after = after.replace(/class="([^"]*)"/, `class="$1 ${responsiveClass}" ${displayStyle}`);
        }
      }
    }
    return `<img ${before}src="${imgSrc}"${after}>`;
  });
  
  return processedContent;
};
