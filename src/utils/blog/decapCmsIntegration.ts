
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import { getBlogPostsFromCache, saveBlogPostsToServer } from "./blogServerStorage";
import { updatedBlogPosts } from "./blogPostsStore";
import fs from 'fs';
import path from 'path';

// This file provides integration between Decap CMS and our blog system
// When running in the browser, filesystem operations will be skipped

/**
 * Synchronizes blog posts from Decap CMS content directory to our blog storage
 * This function is meant to be called during build time or by a serverless function
 */
export const syncFromDecapCms = async (): Promise<void> => {
  if (typeof window === 'undefined') {
    // Server-side execution
    try {
      const contentDir = path.resolve(process.cwd(), 'content/blog');
      const files = fs.readdirSync(contentDir);
      const blogPosts: BlogPostsStore = {};
      
      files.forEach(file => {
        if (file.endsWith('.md') || file.endsWith('.json')) {
          const filePath = path.join(contentDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          let post: BlogPost & { slug?: string };
          
          if (file.endsWith('.md')) {
            // Parse markdown frontmatter
            const frontmatter = content.split('---')[1];
            post = parseFrontmatter(frontmatter);
          } else {
            // Parse JSON file
            post = JSON.parse(content);
          }
          
          if (post.slug) {
            // Store the slug separately before removing it from the post object
            const slug = post.slug;
            
            // Create a new object without the slug property
            const { slug: _, ...postWithoutSlug } = post;
            
            // Store the post in the blog posts store using the slug as the key
            blogPosts[slug] = postWithoutSlug as BlogPost;
          }
        }
      });
      
      // Save to blog server storage
      await saveBlogPostsToServer(blogPosts);
      
    } catch (error) {
      console.error('Error syncing from Decap CMS:', error);
    }
  }
};

/**
 * Synchronizes blog posts from our blog storage to Decap CMS content directory
 * This function is meant to be called during build time or by a serverless function
 */
export const syncToDecapCms = async (): Promise<void> => {
  if (typeof window === 'undefined') {
    // Server-side execution
    try {
      const contentDir = path.resolve(process.cwd(), 'content/blog');
      // Ensure the directory exists
      if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
      }
      
      // Get blog posts from storage
      const blogPosts = await getBlogPostsFromCache();
      
      // Write each blog post to a file
      Object.entries(blogPosts).forEach(([slug, post]) => {
        const filePath = path.join(contentDir, `${slug}.json`);
        const postData = { ...post, slug };
        fs.writeFileSync(filePath, JSON.stringify(postData, null, 2), 'utf8');
      });
      
    } catch (error) {
      console.error('Error syncing to Decap CMS:', error);
    }
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
  window.addEventListener('DOMContentLoaded', () => {
    // Listen for Decap CMS events if available
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
          }
        }
      });
    }
  });
}

// Add global declaration for CMS
declare global {
  interface Window {
    CMS: any;
  }
}
