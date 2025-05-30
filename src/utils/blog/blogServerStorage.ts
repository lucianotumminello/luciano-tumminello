
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import { supabaseUnifiedStorage } from "./supabaseUnifiedStorage";

// In-memory cache of blog posts
let cachedBlogPosts: BlogPostsStore | null = null;

// Last fetch timestamp to control refresh frequency
let lastFetchTimestamp = 0;
const FETCH_COOLDOWN_MS = 1000;

/**
 * Fetches all blog posts from Supabase
 * This includes both Lovable-created and CMS/Content Editor created posts
 */
export const fetchBlogPostsFromServer = async (): Promise<BlogPostsStore> => {
  try {
    const now = Date.now();
    
    // Check if we've fetched recently to prevent excessive calls
    if (cachedBlogPosts && now - lastFetchTimestamp < FETCH_COOLDOWN_MS) {
      console.log("Using cached blog posts (fetch cooldown active)");
      return { ...cachedBlogPosts };
    }
    
    // Update timestamp
    lastFetchTimestamp = now;
    
    // Get all posts from Supabase
    const posts = await supabaseUnifiedStorage.getAllPosts();
    cachedBlogPosts = { ...posts };
    
    console.log("Fetched blog posts from Supabase:", Object.keys(posts).length);
    return posts;
    
  } catch (error) {
    console.error("Error fetching blog posts from Supabase:", error);
    
    // If we have cached posts, use them
    if (cachedBlogPosts) {
      console.log("Using cached blog posts as fallback");
      return { ...cachedBlogPosts };
    }
    
    // Try once more
    const posts = await supabaseUnifiedStorage.getAllPosts();
    cachedBlogPosts = { ...posts };
    return posts;
  }
};

/**
 * Saves blog posts to Supabase
 * This works for both Lovable-created and CMS/Content Editor created posts
 */
export const saveBlogPostsToServer = async (posts: BlogPostsStore): Promise<void> => {
  try {
    console.log("Saving blog posts to Supabase");
    
    // Save each post individually to Supabase
    for (const [slug, post] of Object.entries(posts)) {
      await supabaseUnifiedStorage.setPost(slug, post);
    }
    
    // Update cache
    cachedBlogPosts = { ...posts };
    
    console.log("Successfully saved blog posts to Supabase:", Object.keys(posts).length);
    
    // Dispatch events for UI updates
    const blogUpdateEvent = new CustomEvent('blog-server-updated', { detail: posts });
    window.dispatchEvent(blogUpdateEvent);
    
  } catch (error) {
    console.error("Error saving blog posts to Supabase:", error);
    throw error;
  }
};

/**
 * Gets blog posts from cache or fetches them if cache is empty
 */
export const getBlogPostsFromCache = async (): Promise<BlogPostsStore> => {
  if (cachedBlogPosts) {
    return { ...cachedBlogPosts };
  }
  
  // Cache is empty, fetch from Supabase
  const posts = await fetchBlogPostsFromServer();
  cachedBlogPosts = { ...posts };
  return posts;
};

/**
 * Clears the cache to force a fresh fetch from Supabase
 */
export const invalidateBlogPostsCache = (): void => {
  cachedBlogPosts = null;
  console.log("Blog posts cache invalidated");
};

// Set up periodic refresh for real-time updates
if (typeof window !== 'undefined') {
  console.log("Setting up periodic refresh for Supabase blog storage");
  const REFRESH_INTERVAL = 30000; // 30 seconds
  setInterval(async () => {
    try {
      const freshPosts = await supabaseUnifiedStorage.refresh();
      if (JSON.stringify(cachedBlogPosts) !== JSON.stringify(freshPosts)) {
        console.log("Detected changes during periodic refresh from Supabase");
        invalidateBlogPostsCache();
        const blogUpdateEvent = new CustomEvent('blog-periodic-refresh');
        window.dispatchEvent(blogUpdateEvent);
      }
    } catch (error) {
      console.error("Error during periodic refresh:", error);
    }
  }, REFRESH_INTERVAL);
}
