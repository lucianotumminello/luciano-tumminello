
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import initialBlogPosts from "./initialBlogPosts";
import { permanentStorage } from "./permanentBlogStorage";

// API endpoint for blog posts (this should point to your actual server API)
const API_ENDPOINT = "/api/blog-posts";

// Flag to determine if we should use the real server API or permanent storage
// Set this to false when connecting to a real API server
const USE_PERMANENT_STORAGE = true;

// In-memory cache of blog posts
let cachedBlogPosts: BlogPostsStore | null = null;

// Last fetch timestamp to control refresh frequency
let lastFetchTimestamp = 0;
const FETCH_COOLDOWN_MS = 1000; // Reduced cooldown for better responsiveness

/**
 * Fetches all blog posts from permanent storage or server
 * Ensures cross-device synchronization by always getting the latest data
 * @returns A promise that resolves to all blog posts
 */
export const fetchBlogPostsFromServer = async (): Promise<BlogPostsStore> => {
  try {
    const now = Date.now();
    
    // Check if we've fetched recently to prevent excessive calls
    if (cachedBlogPosts && now - lastFetchTimestamp < FETCH_COOLDOWN_MS) {
      console.log("Using cached blog posts (fetch cooldown active)");
      return { ...cachedBlogPosts };
    }
    
    // Update timestamp whether we successfully fetch or not
    lastFetchTimestamp = now;
    
    if (USE_PERMANENT_STORAGE) {
      console.log("Using permanent storage for fetching blog posts");
      // Ensure permanent storage is initialized
      await permanentStorage.initialize();
      
      // Get posts from permanent storage
      const posts = permanentStorage.getPosts();
      cachedBlogPosts = { ...posts };
      
      console.log("Fetched blog posts from permanent storage:", Object.keys(posts).length);
      return posts;
    }
    
    // Real API implementation - for production use
    const response = await fetch(API_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      },
      // Prevent caching to always get fresh data
      cache: "no-store"
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
    }
    
    const posts: BlogPostsStore = await response.json();
    console.log("Fetched blog posts from server:", Object.keys(posts).length);
    
    // Update the cache
    cachedBlogPosts = { ...posts };
    
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts from server:", error);
    
    // If we have cached posts, use them
    if (cachedBlogPosts) {
      console.log("Using cached blog posts as fallback");
      return { ...cachedBlogPosts };
    }
    
    // Fall back to initial posts if we can't fetch and have no cache
    console.log("Using initial blog posts as fallback");
    return { ...initialBlogPosts };
  }
};

/**
 * Saves blog posts to permanent storage or server
 * Ensures cross-device synchronization by updating permanent data
 * @param posts The blog posts to save
 * @returns A promise that resolves when the posts have been saved
 */
export const saveBlogPostsToServer = async (posts: BlogPostsStore): Promise<void> => {
  try {
    if (USE_PERMANENT_STORAGE) {
      console.log("Permanent storage: Saving blog posts permanently");
      
      // Ensure permanent storage is initialized
      await permanentStorage.initialize();
      
      // Save to permanent storage
      await permanentStorage.savePosts(posts);
      cachedBlogPosts = { ...posts };
      
      console.log("Successfully saved blog posts to permanent storage:", Object.keys(posts).length);
      
      // Dispatch an event to notify other tabs/windows of the update
      const blogUpdateEvent = new CustomEvent('blog-server-updated', { detail: posts });
      window.dispatchEvent(blogUpdateEvent);
      return;
    }
    
    // Real API implementation
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posts),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save blog posts: ${response.statusText}`);
    }
    
    console.log("Saved blog posts to server:", Object.keys(posts).length);
    
    // Update the cache after successful save
    cachedBlogPosts = { ...posts };
    
    // Dispatch an event to notify other components of the update
    const blogUpdateEvent = new CustomEvent('blog-server-updated', { detail: posts });
    window.dispatchEvent(blogUpdateEvent);
    
  } catch (error) {
    console.error("Error saving blog posts to server:", error);
    throw error;
  }
};

/**
 * Gets blog posts from the cache or fetches them if the cache is empty
 * @returns A promise that resolves to all blog posts
 */
export const getBlogPostsFromCache = async (): Promise<BlogPostsStore> => {
  if (cachedBlogPosts) {
    return { ...cachedBlogPosts };
  }
  
  // Cache is empty, fetch from permanent storage or server
  const posts = await fetchBlogPostsFromServer();
  cachedBlogPosts = { ...posts };
  return posts;
};

/**
 * Clears the cache to force a fresh fetch from permanent storage or server
 */
export const invalidateBlogPostsCache = (): void => {
  cachedBlogPosts = null;
  console.log("Blog posts cache invalidated");
};

// Setup listener for storage events from other tabs/windows (cross-tab communication)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key?.includes('blog') || event.key?.includes('permanent')) {
      console.log("Blog posts updated in another tab/window, refreshing cache");
      invalidateBlogPostsCache();
      // Dispatch event for components to refresh
      const blogUpdateEvent = new CustomEvent('blog-storage-updated');
      window.dispatchEvent(blogUpdateEvent);
    }
  });
  
  // Set up a periodic check for updates (for cross-device sync)
  console.log("Setting up periodic refresh for cross-device sync");
  const REFRESH_INTERVAL = 10000; // 10 seconds for better responsiveness
  setInterval(async () => {
    console.log("Performing periodic blog posts refresh");
    try {
      const freshPosts = await permanentStorage.refresh();
      if (JSON.stringify(cachedBlogPosts) !== JSON.stringify(freshPosts)) {
        console.log("Detected changes during periodic refresh");
        invalidateBlogPostsCache();
        // Note: components listening for this event will trigger their own refresh
        const blogUpdateEvent = new CustomEvent('blog-periodic-refresh');
        window.dispatchEvent(blogUpdateEvent);
      }
    } catch (error) {
      console.error("Error during periodic refresh:", error);
    }
  }, REFRESH_INTERVAL);
}
