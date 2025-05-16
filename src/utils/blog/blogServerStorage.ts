
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import initialBlogPosts from "./initialBlogPosts";
import { mockApiGetAllPosts, mockApiSavePosts } from "./mockApi";

// API endpoint for blog posts (this should point to your actual server API)
const API_ENDPOINT = "/api/blog-posts";

// Flag to determine if we should use the real server API or mock server
// Set this to false when connecting to a real API server
const USE_MOCK_SERVER = true;

// In-memory cache of blog posts
let cachedBlogPosts: BlogPostsStore | null = null;

/**
 * Fetches all blog posts from the server
 * @returns A promise that resolves to all blog posts
 */
export const fetchBlogPostsFromServer = async (): Promise<BlogPostsStore> => {
  try {
    if (USE_MOCK_SERVER) {
      console.log("Using mock server for fetching blog posts");
      // Use mock server for development
      const posts = mockApiGetAllPosts();
      cachedBlogPosts = { ...posts };
      return posts;
    }
    
    // Real API implementation
    const response = await fetch(API_ENDPOINT);
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
    
    // Fall back to initial posts if we can't fetch from the server
    console.log("Using initial blog posts as fallback");
    return { ...initialBlogPosts };
  }
};

/**
 * Saves blog posts to the server
 * @param posts The blog posts to save
 * @returns A promise that resolves when the posts have been saved
 */
export const saveBlogPostsToServer = async (posts: BlogPostsStore): Promise<void> => {
  try {
    if (USE_MOCK_SERVER) {
      console.log("Mock server: Saving blog posts to server");
      // Use mock server for development
      mockApiSavePosts(posts);
      cachedBlogPosts = { ...posts };
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
