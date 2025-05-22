
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./blog/types";
import { saveBlogPostsToStorage, updatedBlogPosts } from "./blog/blogPostsStore";

// Initialize Netlify Identity for authentication when in non-admin routes
export const initializeNetlifyIdentity = (): void => {
  if (window.location.pathname !== '/admin/' && typeof document !== 'undefined') {
    // Load the Netlify Identity Widget script
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

// Sync Decap CMS entries with our blog post store
export const syncDecapCmsEntries = async (): Promise<void> => {
  try {
    // In a real implementation, this would fetch from the CMS API or Git
    // For now, we'll just log that this function was called
    console.log('Syncing blog posts from Decap CMS');
    
    // Future implementation would fetch entries and update the store:
    // const entries = await fetchEntriesFromCMS();
    // const updatedStore: BlogPostsStore = {};
    
    // entries.forEach(entry => {
    //   updatedStore[entry.slug] = {
    //     title: entry.title,
    //     titleIT: entry.titleIT,
    //     ...rest of fields...
    //   };
    // });
    
    // await saveBlogPostsToStorage(updatedStore);
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
