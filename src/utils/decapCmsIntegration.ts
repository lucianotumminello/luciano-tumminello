
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./blog/types";
import { saveBlogPostsToStorage, updatedBlogPosts } from "./blog/blogPostsStore";

// Initialize Netlify Identity for authentication when in non-admin routes
export const initializeNetlifyIdentity = (): void => {
  if (typeof document !== 'undefined') {
    // Check if the script is already loaded
    if (document.getElementById('netlify-identity-widget')) {
      console.log('Netlify Identity widget already loaded');
      return;
    }
    
    // Load the Netlify Identity Widget script
    const script = document.createElement('script');
    script.id = 'netlify-identity-widget';
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    
    script.onload = () => {
      console.log('Netlify Identity script loaded');
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on('init', (user) => {
          console.log('Netlify Identity initialized', user ? 'with user' : 'without user');
          
          // Only redirect to admin after login if not on the admin page
          const isAdminPage = window.location.pathname.includes('/admin');
          
          if (!user && !isAdminPage) {
            window.netlifyIdentity.on('login', () => {
              console.log('User logged in, redirecting to admin');
              document.location.href = '/admin/index.html';
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
  }
}
