
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./blog/types";
import { saveBlogPostsToStorage, updatedBlogPosts } from "./blog/blogPostsStore";

// Simple initialization for Netlify Identity on non-admin pages
export const initializeNetlifyIdentity = (): void => {
  if (typeof document !== 'undefined') {
    const isAdminPage = window.location.pathname.includes('/admin');
    
    if (isAdminPage) {
      console.log('Already on admin page, skipping Netlify Identity initialization');
      return;
    }
    
    if (document.getElementById('netlify-identity-widget')) {
      console.log('Netlify Identity widget already loaded');
      return;
    }
    
    console.log('Loading Netlify Identity widget from non-admin page');
    
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

// Clean CMS initialization function
export const initializeDecapCMS = (): void => {
  if (typeof window === 'undefined') return;
  
  console.log('Redirecting to clean CMS implementation');
  
  // Simply redirect to the admin page - let the admin page handle everything
  window.location.href = `/admin/index.html?t=${Date.now()}`;
};

// Sync function placeholder
export const syncDecapCmsEntries = async (): Promise<void> => {
  try {
    console.log('Syncing blog posts from Decap CMS');
    // Future implementation would fetch entries and update the store
  } catch (error) {
    console.error('Error syncing with Decap CMS:', error);
  }
};

// Helper type for the window object
declare global {
  interface Window {
    netlifyIdentity?: {
      on: (event: string, callback: (user?: any) => void) => void;
      open: (command?: string) => void;
    };
    CMS?: any;
  }
}
