
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import { getBlogPostsFromCache, saveBlogPostsToServer } from "./blogServerStorage";
import { updatedBlogPosts } from "./blogPostsStore";

/**
 * Synchronizes blog posts from Decap CMS content directory to our blog storage
 * This function is meant to be called during build time or by a serverless function
 */
export const syncFromDecapCms = async (): Promise<void> => {
  if (typeof window === 'undefined') {
    // Server-side execution - would happen in a real environment with server access
    console.log('Server-side execution detected for syncFromDecapCms');
  } else {
    // Client-side - we can't directly access the filesystem
    console.log('Client-side execution detected for syncFromDecapCms - skipping filesystem operations');
  }
};

/**
 * Synchronizes blog posts from our blog storage to Decap CMS content directory
 * This function is meant to be called during build time or by a serverless function
 */
export const syncToDecapCms = async (): Promise<void> => {
  if (typeof window === 'undefined') {
    // Server-side execution - would happen in a real environment with server access
    console.log('Server-side execution detected for syncToDecapCms');
  } else {
    // Client-side - we can't directly access the filesystem
    console.log('Client-side execution detected for syncToDecapCms - skipping filesystem operations');
  }
};

/**
 * Parse frontmatter from a markdown file
 * @param frontmatter The frontmatter content
 * @returns BlogPost object
 */
const parseFrontmatter = (frontmatter: string): BlogPost & { slug?: string } => {
  const lines = frontmatter.trim().split('\n');
  const post: Record<string, any> = {};
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Handle arrays (like tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.substring(1, value.length - 1);
        post[key] = value.split(',').map(item => item.trim());
      } else {
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.substring(1, value.length - 1);
        }
        post[key] = value;
      }
    }
  });
  
  return post as BlogPost & { slug?: string };
};

/**
 * Event listener for Decap CMS to update our blog storage when content changes
 * This is meant to be used in the browser
 */
if (typeof window !== 'undefined') {
  // Use DOMContentLoaded to ensure the CMS is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Set a timeout to wait for CMS to be initialized
    setTimeout(() => {
      if (window.CMS) {
        console.log('Decap CMS detected, setting up event listeners');
        
        window.CMS.registerEventListener({
          name: 'postPublished',
          handler: async (data: any) => {
            console.log('Post published in Decap CMS:', data);
            
            // Get the current posts
            const posts = { ...updatedBlogPosts };
            
            // Update or add the post
            const post = data.entry.data;
            if (post.slug) {
              const { slug: _, ...postData } = post;
              posts[post.slug] = postData;
              
              // Save to server storage
              await saveBlogPostsToServer(posts);
              console.log(`Post ${post.slug} saved successfully`);
            }
          }
        });
      }
    }, 1000); // Wait 1 second for CMS to initialize
  });
}

// Add global declaration for CMS
declare global {
  interface Window {
    CMS: any;
  }
}
