
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./blog/types";
import { saveBlogPostsToStorage, updatedBlogPosts } from "./blog/blogPostsStore";

// Initialize Netlify Identity for authentication when in non-admin routes
export const initializeNetlifyIdentity = (): void => {
  if (typeof document !== 'undefined') {
    // Check if we're on the admin page
    const isAdminPage = window.location.pathname.includes('/admin');
    
    // Don't load Netlify Identity if we're already on the admin page
    if (isAdminPage) {
      console.log('Already on admin page, skipping Netlify Identity initialization');
      return;
    }
    
    // Check if the script is already loaded
    if (document.getElementById('netlify-identity-widget')) {
      console.log('Netlify Identity widget already loaded');
      return;
    }
    
    console.log('Loading Netlify Identity widget from non-admin page');
    
    // Load the Netlify Identity Widget script
    const script = document.createElement('script');
    script.id = 'netlify-identity-widget';
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      console.log('Netlify Identity script loaded');
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on('init', (user) => {
          console.log('Netlify Identity initialized', user ? 'with user' : 'without user');
          
          if (!user) {
            window.netlifyIdentity.on('login', () => {
              console.log('User logged in, redirecting to admin');
              // Use a timeout to ensure identity is fully processed
              setTimeout(() => {
                document.location.href = '/admin/?loginRedirect=true';
              }, 500);
            });
          }
        });
      }
    };
    
    script.onerror = () => {
      console.error('Failed to load Netlify Identity script');
    };
    
    document.head.appendChild(script);
  }
};

// This function will initialize Decap CMS manually (used in admin/index.html)
export const initializeDecapCMS = (): void => {
  if (typeof window === 'undefined') return;
  
  console.log('Manually initializing Decap CMS');
  
  // Clear caches and service workers that might be causing issues
  if ('caches' in window) {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        caches.delete(cacheName);
        console.log(`Cleared cache: ${cacheName}`);
      });
    });
  }
  
  // Check if CMS is already loaded
  if (window.CMS) {
    console.log('CMS already available in window object');
    try {
      window.CMS.init();
      console.log('Manual CMS initialization triggered');
    } catch (e) {
      console.error('Error initializing CMS:', e);
    }
    return;
  }
  
  // First, ensure config is loaded properly
  const configLink = document.querySelector('link[rel="cms-config-url"]');
  if (!configLink) {
    const link = document.createElement('link');
    link.rel = 'cms-config-url';
    link.type = 'text/yaml';
    link.href = `/admin/config.yml?t=${Date.now()}`;
    document.head.appendChild(link);
    console.log('Added missing config link to document head');
  } else {
    // Refresh the config link to force reload
    // Fix: Cast configLink to HTMLLinkElement to access href property
    (configLink as HTMLLinkElement).href = `/admin/config.yml?t=${Date.now()}`;
    console.log('Refreshed existing config link');
  }
  
  // Load Decap CMS script with retries
  const loadCmsScript = (retryCount = 0) => {
    if (retryCount >= 3) {
      console.error('Failed to load Decap CMS after multiple attempts');
      return;
    }
    
    const script = document.createElement('script');
    script.src = retryCount === 0 ? 
      'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js' : 
      'https://cdn.jsdelivr.net/npm/decap-cms@^3.0.0/dist/decap-cms.js';
    script.crossOrigin = 'anonymous';
    script.async = true;
    
    script.onload = () => {
      console.log(`Decap CMS script loaded successfully (attempt ${retryCount + 1})`);
      // Give it a moment to initialize
      setTimeout(() => {
        if (window.CMS) {
          console.log('CMS object available after script load');
          
          try {
            // Attempt initialization
            window.CMS.init();
            console.log('CMS initialization triggered');
            
            // Register success event listener
            window.CMS.registerEventListener({
              name: 'cms-loaded',
              handler: () => {
                console.log('CMS fully loaded and initialized');
              }
            });
          } catch (e) {
            console.error('Error during CMS init:', e);
          }
        } else {
          console.error('CMS object not found after script load');
          if (retryCount < 2) {
            console.log(`Retrying CMS script load (attempt ${retryCount + 2})`);
            loadCmsScript(retryCount + 1);
          }
        }
      }, 1000);
    };
    
    script.onerror = () => {
      console.error(`Failed to load Decap CMS script (attempt ${retryCount + 1})`);
      if (retryCount < 2) {
        console.log(`Retrying with alternative CDN (attempt ${retryCount + 2})`);
        loadCmsScript(retryCount + 1);
      }
    };
    
    document.body.appendChild(script);
  };
  
  // Start loading the script
  loadCmsScript();
};

// Sync Decap CMS entries with our blog post store
export const syncDecapCmsEntries = async (): Promise<void> => {
  try {
    // In a real implementation, this would fetch from the CMS API or Git
    console.log('Syncing blog posts from Decap CMS');
    
    // Future implementation would fetch entries and update the store
  } catch (error) {
    console.error('Error syncing with Decap CMS:', error);
  }
};

// Helper function to diagnose CMS loading issues
export const diagnoseCmsLoadingIssues = (): void => {
  console.log('Diagnosing CMS loading issues...');
  
  // Check for script loading
  const cmsScripts = document.querySelectorAll('script[src*="decap-cms"]');
  console.log(`Found ${cmsScripts.length} CMS script tags`);
  
  // Check for config link
  const configLinks = document.querySelectorAll('link[rel="cms-config-url"]');
  console.log(`Found ${configLinks.length} config links`);
  
  // Check for Netlify Identity
  const identityScripts = document.querySelectorAll('script[src*="netlify-identity"]');
  console.log(`Found ${identityScripts.length} Netlify Identity scripts`);
  
  // Output CMS status
  if (window.CMS) {
    console.log('CMS object is available in window');
  } else {
    console.log('CMS object is NOT available in window');
  }
  
  // Create a diagnostic report in the console
  console.log('CMS Diagnostic Report:');
  console.log('---------------------');
  console.log('URL:', window.location.href);
  console.log('Pathname:', window.location.pathname);
  console.log('User Agent:', navigator.userAgent);
  
  // Additional diagnostic info
  if (typeof window.bypassConfigValidation !== 'undefined') {
    console.log('bypassConfigValidation flag is set:', window.bypassConfigValidation);
  }
};

// Additional function to force CMS initialization even if other methods fail
export const forceLoadDecapCMS = (): void => {
  console.log('Force loading Decap CMS with all fallbacks...');
  
  // Set bypass flag
  window.bypassConfigValidation = true;
  
  // Clear any cached resources
  if ('caches' in window) {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => caches.delete(cacheName));
    });
  }
  
  // Always recreate the config link to ensure fresh config
  const existingLink = document.querySelector('link[rel="cms-config-url"]');
  if (existingLink) {
    document.head.removeChild(existingLink);
  }
  
  const link = document.createElement('link');
  link.rel = 'cms-config-url';
  link.type = 'text/yaml';
  link.href = `/admin/config.yml?force=true&t=${Date.now()}`;
  document.head.appendChild(link);
  
  // Remove any existing CMS scripts - FIX: Check parent node before removal
  document.querySelectorAll('script[src*="decap-cms"]').forEach(script => {
    // Safety check: Only remove if it's actually a child of its parent
    if (script.parentNode) {
      try {
        script.parentNode.removeChild(script);
        console.log('Removed existing CMS script');
      } catch (e) {
        console.error('Error removing script:', e);
      }
    }
  });
  
  // Load the script directly from CDN
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js';
  script.onload = () => {
    console.log('Force loaded CMS script, initializing...');
    setTimeout(() => {
      if (window.CMS) {
        try {
          window.CMS.init();
          console.log('Forced CMS initialization complete');
        } catch (e) {
          console.error('Force init error:', e);
          alert('CMS initialization failed. Please refresh the page and try again.');
        }
      } else {
        console.error('CMS object not available after forced load');
      }
    }, 1000);
  };
  document.body.appendChild(script);
};

// Helper type for the window object to include Netlify Identity
declare global {
  interface Window {
    netlifyIdentity?: {
      on: (event: string, callback: (user?: any) => void) => void;
      open: (command?: string) => void;
    };
    CMS?: any; // Decap CMS global object
    cmsValidation?: {
      validate: () => void;
      showError: (message: string) => void;
      forceInitCMS: () => void;
    };
    bypassConfigValidation?: boolean;
  }
}
