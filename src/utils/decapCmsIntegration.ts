
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
  
  // Check if CMS is already loaded
  if (window.CMS) {
    console.log('CMS already available in window object');
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
  }
  
  // Load Decap CMS script
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js';
  script.crossOrigin = 'anonymous';
  script.async = true;
  
  script.onload = () => {
    console.log('Decap CMS script loaded successfully');
    // Give it a moment to initialize
    setTimeout(() => {
      if (window.CMS) {
        console.log('CMS object available after script load');
        
        // Register success event listener
        window.CMS.registerEventListener({
          name: 'cms-loaded',
          handler: () => {
            console.log('CMS fully loaded and initialized');
          }
        });
        
      } else {
        console.error('CMS object not found after script load');
      }
    }, 1000);
  };
  
  script.onerror = () => {
    console.error('Failed to load Decap CMS script');
    
    // Try alternative CDN as fallback
    const fallbackScript = document.createElement('script');
    fallbackScript.src = 'https://cdn.jsdelivr.net/npm/decap-cms@^3.0.0/dist/decap-cms.js';
    fallbackScript.crossOrigin = 'anonymous';
    fallbackScript.async = true;
    
    fallbackScript.onload = () => {
      console.log('Fallback CMS script loaded successfully');
    };
    
    fallbackScript.onerror = () => {
      console.error('Even fallback CMS script failed to load');
    };
    
    document.body.appendChild(fallbackScript);
  };
  
  document.body.appendChild(script);
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
    };
  }
}
