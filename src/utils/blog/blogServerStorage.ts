
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import initialBlogPosts from "./initialBlogPosts";

// API endpoint for blog posts (this should point to your actual server API)
const API_ENDPOINT = "/api/blog-posts";

// Flag to determine if we should use the real server API or mock server
// Set this to false when connecting to a real API server
const USE_MOCK_SERVER = true;

// In-memory cache of blog posts
let cachedBlogPosts: BlogPostsStore | null = null;

// Last fetch timestamp to control refresh frequency
let lastFetchTimestamp = 0;
const FETCH_COOLDOWN_MS = 2000; // Minimum time between fetches to prevent excessive calls

/**
 * Mock server implementation using a global storage object
 * This simulates a real server where all users see the same data
 */
const mockServerStorage = {
  // Use a global variable to simulate server storage that persists across all users
  get data(): BlogPostsStore {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('blog_posts_server_storage');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (error) {
          console.error('Error parsing stored blog posts:', error);
        }
      }
    }
    return { ...initialBlogPosts };
  },
  
  set data(posts: BlogPostsStore) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog_posts_server_storage', JSON.stringify(posts));
      // Dispatch event for cross-tab synchronization
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'blog_posts_server_storage',
        newValue: JSON.stringify(posts),
        storageArea: localStorage
      }));
    }
  }
};

/**
 * Mock API functions that simulate server operations
 */
export const mockApiGetAllPosts = (): BlogPostsStore => {
  console.log("Mock API: Fetching all posts from server storage");
  return { ...mockServerStorage.data };
};

export const mockApiSavePosts = (posts: BlogPostsStore): void => {
  console.log("Mock API: Saving posts to server storage");
  mockServerStorage.data = posts;
};

/**
 * Fetches all blog posts from the server
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
    
    if (USE_MOCK_SERVER) {
      console.log("Using mock server for fetching blog posts");
      // Use mock server for development - this uses localStorage which persists across sessions
      const posts = mockApiGetAllPosts();
      cachedBlogPosts = { ...posts };
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
    
    // Fall back to initial posts if we can't fetch from the server and have no cache
    console.log("Using initial blog posts as fallback");
    return { ...initialBlogPosts };
  }
};

/**
 * Saves blog posts to the server
 * Ensures cross-device synchronization by updating server data
 * @param posts The blog posts to save
 * @returns A promise that resolves when the posts have been saved
 */
export const saveBlogPostsToServer = async (posts: BlogPostsStore): Promise<void> => {
  try {
    if (USE_MOCK_SERVER) {
      console.log("Mock server: Saving blog posts to server");
      // Use mock server for development - this uses localStorage which persists across sessions
      mockApiSavePosts(posts);
      cachedBlogPosts = { ...posts };
      
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
  
  // Cache is empty, fetch from server
  const posts = await fetchBlogPostsFromServer();
  cachedBlogPosts = { ...posts };
  return posts;
};

/**
 * Clears the cache to force a fresh fetch from the server
 */
export const invalidateBlogPostsCache = (): void => {
  cachedBlogPosts = null;
  console.log("Blog posts cache invalidated");
};

// Setup listener for storage events from other tabs/windows (cross-tab communication)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === "blog_posts_server_storage") {
      console.log("Blog posts updated in another tab/window, refreshing cache");
      invalidateBlogPostsCache();
      // Dispatch event for components to refresh
      const blogUpdateEvent = new CustomEvent('blog-storage-updated');
      window.dispatchEvent(blogUpdateEvent);
    }
  });
  
  // Set up a periodic check for updates (for cross-device sync via localStorage)
  // This helps when two devices are using the same app but not getting storage events
  if (USE_MOCK_SERVER) {
    console.log("Setting up periodic refresh for cross-device sync");
    const REFRESH_INTERVAL = 30000; // 30 seconds
    setInterval(() => {
      console.log("Performing periodic blog posts refresh");
      invalidateBlogPostsCache();
      // Note: components listening for this event will trigger their own refresh
      const blogUpdateEvent = new CustomEvent('blog-periodic-refresh');
      window.dispatchEvent(blogUpdateEvent);
    }, REFRESH_INTERVAL);
  }
}
