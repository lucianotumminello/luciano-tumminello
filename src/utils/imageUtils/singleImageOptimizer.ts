
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
  
  // Mark as optimized
  imgElement.setAttribute('data-optimized', 'true');
};

/**
 * Checks if element is in viewport
 * @param element - Element to check
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
