
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import initialBlogPosts from "./initialBlogPosts";

/**
 * Mock API functions that simulate server-side blog post storage
 * This replaces browser-only localStorage with a shared storage system
 */

const SERVER_STORAGE_KEY = 'blog_posts_server_storage';

/**
 * Gets all blog posts from mock server storage
 */
export const mockApiGetAllPosts = (): BlogPostsStore => {
  try {
    if (typeof window === 'undefined') {
      return { ...initialBlogPosts };
    }
    
    const stored = localStorage.getItem(SERVER_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("Mock API: Retrieved posts from server storage:", Object.keys(parsed).length);
      return parsed;
    }
    
    // Initialize with default posts if nothing is stored
    console.log("Mock API: Initializing server storage with default posts");
    const defaultPosts = { ...initialBlogPosts };
    localStorage.setItem(SERVER_STORAGE_KEY, JSON.stringify(defaultPosts));
    return defaultPosts;
  } catch (error) {
    console.error("Mock API: Error retrieving posts:", error);
    return { ...initialBlogPosts };
  }
};

/**
 * Saves all blog posts to mock server storage
 */
export const mockApiSavePosts = (posts: BlogPostsStore): void => {
  try {
    if (typeof window === 'undefined') {
      console.warn("Mock API: Cannot save posts on server side");
      return;
    }
    
    localStorage.setItem(SERVER_STORAGE_KEY, JSON.stringify(posts));
    console.log("Mock API: Saved posts to server storage:", Object.keys(posts).length);
    
    // Dispatch storage event for cross-tab communication
    window.dispatchEvent(new StorageEvent('storage', {
      key: SERVER_STORAGE_KEY,
      newValue: JSON.stringify(posts),
      storageArea: localStorage
    }));
  } catch (error) {
    console.error("Mock API: Error saving posts:", error);
    throw error;
  }
};

/**
 * Gets a specific blog post from mock server storage
 */
export const mockApiGetPost = (slug: string): BlogPost | undefined => {
  const allPosts = mockApiGetAllPosts();
  return allPosts[slug];
};

/**
 * Saves a specific blog post to mock server storage
 */
export const mockApiSavePost = (slug: string, post: BlogPost): void => {
  const allPosts = mockApiGetAllPosts();
  allPosts[slug] = post;
  mockApiSavePosts(allPosts);
};

/**
 * Deletes a specific blog post from mock server storage
 */
export const mockApiDeletePost = (slug: string): boolean => {
  const allPosts = mockApiGetAllPosts();
  if (allPosts[slug]) {
    delete allPosts[slug];
    mockApiSavePosts(allPosts);
    return true;
  }
  return false;
};
