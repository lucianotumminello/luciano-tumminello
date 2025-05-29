
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import { unifiedStorage } from "./unifiedBlogStorage";

// In-memory cache of blog posts
let cachedBlogPosts: BlogPostsStore | null = null;

// Last fetch timestamp to control refresh frequency
let lastFetchTimestamp = 0;
const FETCH_COOLDOWN_MS = 1000;

/**
 * Fetches all blog posts from unified storage
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
    
    // Ensure unified storage is initialized
    await unifiedStorage.initialize();
    
    // Get all posts from unified storage
    const posts = unifiedStorage.getAllPosts();
    cachedBlogPosts = { ...posts };
    
    console.log("Fetched blog posts from unified storage:", Object.keys(posts).length);
    return posts;
    
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    
    // If we have cached posts, use them
    if (cachedBlogPosts) {
      console.log("Using cached blog posts as fallback");
      return { ...cachedBlogPosts };
    }
    
    // Initialize and try again
    await unifiedStorage.initialize();
    const posts = unifiedStorage.getAllPosts();
    cachedBlogPosts = { ...posts };
    return posts;
  }
};

/**
 * Saves blog posts to unified storage
 * This works for both Lovable-created and CMS/Content Editor created posts
 */
export const saveBlogPostsToServer = async (posts: BlogPostsStore): Promise<void> => {
  try {
    console.log("Saving blog posts to unified storage");
    
    // Ensure unified storage is initialized
    await unifiedStorage.initialize();
    
    // Save each post individually to ensure proper handling
    for (const [slug, post] of Object.entries(posts)) {
      await unifiedStorage.setPost(slug, post);
    }
    
    // Update cache
    cachedBlogPosts = { ...posts };
    
    console.log("Successfully saved blog posts to unified storage:", Object.keys(posts).length);
    
    // Dispatch events for cross-tab communication
    const blogUpdateEvent = new CustomEvent('blog-server-updated', { detail: posts });
    window.dispatchEvent(blogUpdateEvent);
    
  } catch (error) {
    console.error("Error saving blog posts:", error);
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
  
  // Cache is empty, fetch from unified storage
  const posts = await fetchBlogPostsFromServer();
  cachedBlogPosts = { ...posts };
  return posts;
};

/**
 * Clears the cache to force a fresh fetch from unified storage
 */
export const invalidateBlogPostsCache = (): void => {
  cachedBlogPosts = null;
  console.log("Blog posts cache invalidated");
};

// Setup listener for storage events from other tabs/windows
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key?.includes('unified_blog') || event.key?.includes('blog')) {
      console.log("Blog posts updated in another tab/window, refreshing cache");
      invalidateBlogPostsCache();
      // Dispatch event for components to refresh
      const blogUpdateEvent = new CustomEvent('blog-storage-updated');
      window.dispatchEvent(blogUpdateEvent);
    }
  });
  
  // Set up periodic refresh for cross-device sync
  console.log("Setting up periodic refresh for unified blog storage");
  const REFRESH_INTERVAL = 10000; // 10 seconds
  setInterval(async () => {
    try {
      const freshPosts = await unifiedStorage.refresh();
      if (JSON.stringify(cachedBlogPosts) !== JSON.stringify(freshPosts)) {
        console.log("Detected changes during periodic refresh");
        invalidateBlogPostsCache();
        const blogUpdateEvent = new CustomEvent('blog-periodic-refresh');
        window.dispatchEvent(blogUpdateEvent);
      }
    } catch (error) {
      console.error("Error during periodic refresh:", error);
    }
  }, REFRESH_INTERVAL);
}
