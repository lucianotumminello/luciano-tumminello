
/**
 * Utility functions for website performance optimization
 */

/**
 * Preloads critical resources for faster page rendering
 * @param resources Array of URLs to preload
 */
export const preloadCriticalResources = (resources: string[]) => {
  if (typeof document === 'undefined') return;
  
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    
    if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (resource.match(/\.(woff2?|ttf|otf|eot)/i)) {
      link.as = 'font';
      link.crossOrigin = 'anonymous';
    } else if (resource.match(/\.(jpe?g|png|gif|webp|avif)/i)) {
      link.as = 'image';
    } else if (resource.endsWith('.js')) {
      link.as = 'script';
    }
    
    link.href = resource;
    document.head.appendChild(link);
  });
};

/**
 * Lazy loads images when they enter the viewport
 */
export const setupLazyLoading = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '200px', // Start loading before the image is visible
    threshold: 0.01
  });
  
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
};

/**
 * Defers non-critical scripts and stylesheets
 * @param urls Array of URLs to defer
 * @param type 'script' or 'style'
 */
export const deferNonCriticalResources = (urls: string[], type: 'script' | 'style') => {
  if (typeof document === 'undefined') return;
  
  // Delay loading of non-critical resources
  setTimeout(() => {
    urls.forEach(url => {
      if (type === 'script') {
        const script = document.createElement('script');
        script.src = url;
        script.defer = true;
        document.body.appendChild(script);
      } else if (type === 'style') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
      }
    });
  }, 2000); // 2-second delay for non-critical resources
};

/**
 * Optimizes Core Web Vitals by reducing layout shifts and improving LCP
 */
export const optimizeCoreWebVitals = () => {
  if (typeof document === 'undefined') return;

  // Set explicit dimensions on common elements to reduce CLS
  const setElementDimensions = () => {
    document.querySelectorAll('img:not([width]):not([height])').forEach((img: HTMLImageElement) => {
      if (img.naturalWidth && img.naturalHeight) {
        img.setAttribute('width', img.naturalWidth.toString());
        img.setAttribute('height', img.naturalHeight.toString());
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setElementDimensions);
  } else {
    setElementDimensions();
  }
  
  // Improve LCP by prioritizing main image
  const heroImages = document.querySelectorAll('.hero-image, .profile-image, [id^="marketing"]');
  heroImages.forEach(img => {
    // @ts-ignore
    if (img.tagName === 'IMG') {
      // @ts-ignore
      img.fetchPriority = 'high';
      // @ts-ignore
      img.loading = 'eager';
      // @ts-ignore
      img.decoding = 'sync';
    }
  });
};

/**
 * Initializes all performance optimizations
 */
export const initPerformanceOptimizations = () => {
  // Critical resources to preload
  const criticalResources = [
    '/assets/css/main.css',
    '/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png',
    '/lovable-uploads/2598eb07-464e-4495-a4bd-acc4b5070f3a.png'
  ];
  
  // Set up performance optimizations
  preloadCriticalResources(criticalResources);
  setupLazyLoading();
  optimizeCoreWebVitals();
};
