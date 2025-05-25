
import { BlogPost } from "@/types";

// Simple initialization for Netlify Identity
export const initializeNetlifyIdentity = (): void => {
  // Only initialize on non-admin pages to avoid conflicts
  if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin')) {
    console.log('Initializing Netlify Identity for login redirects');
    
    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    
    script.onload = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on('init', (user) => {
          if (!user) {
            window.netlifyIdentity.on('login', () => {
              document.location.href = '/admin/';
            });
          }
        });
      }
    };
    
    document.head.appendChild(script);
  }
};

// Simple redirect function
export const initializeDecapCMS = (): void => {
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/index.html';
  }
};

// Placeholder sync function
export const syncDecapCmsEntries = async (): Promise<void> => {
  console.log('Sync function placeholder');
};

// Helper type
declare global {
  interface Window {
    netlifyIdentity?: {
      on: (event: string, callback: (user?: any) => void) => void;
      open: (command?: string) => void;
    };
    CMS?: any;
  }
}
