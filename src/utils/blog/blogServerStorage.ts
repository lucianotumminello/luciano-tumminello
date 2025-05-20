import { BlogPostsStore } from "./types";
import { getBlogPosts } from "@/data/blogList";

// Key for storing blog posts in localStorage
const STORAGE_KEY = "blog_posts_server_storage";

// Keeping track of when we last fetched posts
let lastFetchTime = 0;
const CACHE_TTL = 60000; // 1 minute cache time

// In-memory cache of the last fetched posts
let postsCache: BlogPostsStore | null = null;

/**
 * Fetches blog posts from the server
 * @param forceRefresh Whether to force a refresh of the data
 * @returns A promise that resolves to a record of blog posts
 */
export const fetchBlogPostsFromServer = async (forceRefresh = false): Promise<BlogPostsStore> => {
  try {
    const now = Date.now();
    
    // Check if we can use the cache
    if (!forceRefresh && postsCache && now - lastFetchTime < CACHE_TTL) {
      console.log("Using cached blog posts");
      return { ...postsCache };
    }
    
    console.log("Fetching blog posts from server");
    
    // In a real app, this would be a network request to get blog posts from a server
    // For now we're using the data from getBlogPosts which simulates a server response
    const posts = await getBlogPosts();
    
    // Save to localStorage to persist across sessions
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    
    // Update cache
    postsCache = { ...posts };
    lastFetchTime = now;
    
    // Dispatch event to notify other components that blog data has been updated
    const event = new CustomEvent('blog-server-updated', { detail: posts });
    window.dispatchEvent(event);
    
    console.log("Fetched and stored posts:", Object.keys(posts).length);
    return { ...posts };
  } catch (error) {
    console.error("Error fetching blog posts from server:", error);
    
    // Try to get posts from localStorage as fallback
    const storedPosts = getBlogPostsFromCache();
    return storedPosts || {};
  }
};

/**
 * Gets blog posts from localStorage cache
 * @returns The cached blog posts or null if none exist
 */
export const getBlogPostsFromCache = (): BlogPostsStore | null => {
  try {
    const storedPosts = localStorage.getItem(STORAGE_KEY);
    
    if (storedPosts) {
      return JSON.parse(storedPosts);
    }
    
    return null;
  } catch (error) {
    console.error("Error getting blog posts from cache:", error);
    return null;
  }
};

/**
 * Invalidates the blog posts cache
 */
export const invalidateBlogPostsCache = (): void => {
  console.log("Invalidating blog posts cache");
  postsCache = null;
  lastFetchTime = 0;
};

/**
 * Saves blog posts to the server
 * @param posts The blog posts to save
 * @returns A promise that resolves when the save is complete
 */
export const saveBlogPostsToServer = async (posts: BlogPostsStore): Promise<void> => {
  try {
    console.log("Saving blog posts to server");
    
    // In a real app, this would be a network request to save blog posts to a server
    // For now we're just storing in localStorage to simulate persistence
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    
    // Update cache
    postsCache = { ...posts };
    lastFetchTime = Date.now();
    
    // Dispatch custom event to notify other components/tabs
    const event = new CustomEvent('blog-server-updated', { detail: posts });
    window.dispatchEvent(event);
    
    // Also dispatch a storage event for cross-tab communication
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEY,
      newValue: JSON.stringify(posts),
    }));
    
    console.log("Saved blog posts successfully");
  } catch (error) {
    console.error("Error saving blog posts to server:", error);
    throw error;
  }
};
