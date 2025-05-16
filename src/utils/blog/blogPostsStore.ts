
import { BlogPostsStore } from "./types";
import initialBlogPosts from "./initialBlogPosts";

// Storage key for blog posts in localStorage
const BLOG_POSTS_STORAGE_KEY = "luciano_tumminello_blog_posts";

// Function to load blog posts from localStorage or use the initial data if none exists
const loadBlogPostsFromStorage = (): BlogPostsStore => {
  try {
    const storedPosts = localStorage.getItem(BLOG_POSTS_STORAGE_KEY);
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      console.log("Loaded blog posts from localStorage:", Object.keys(parsedPosts).length);
      return parsedPosts;
    }
  } catch (error) {
    console.error("Error loading blog posts from localStorage:", error);
  }
  
  // If there are no stored posts or an error occurred, use the initial data
  console.log("Using initial blog posts as fallback");
  const initialPostsCopy = { ...initialBlogPosts };
  saveBlogPostsToStorage(initialPostsCopy); // Save initial posts to localStorage
  return initialPostsCopy;
};

// Function to save blog posts to localStorage
export const saveBlogPostsToStorage = (posts: BlogPostsStore) => {
  try {
    localStorage.setItem(BLOG_POSTS_STORAGE_KEY, JSON.stringify(posts));
    console.log("Saved blog posts to localStorage:", Object.keys(posts).length);
    
    // Update our in-memory store to match the stored data
    Object.keys(updatedBlogPosts).forEach(key => {
      delete updatedBlogPosts[key];
    });
    
    Object.entries(posts).forEach(([key, value]) => {
      updatedBlogPosts[key] = { ...value };
    });
    
    // Dispatch a custom event so other tabs/components can detect the change
    const storageEvent = new CustomEvent('blog-storage-updated', { detail: posts });
    window.dispatchEvent(storageEvent);
    
    // Also dispatch standard storage event for broader compatibility
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error("Error saving blog posts to localStorage:", error);
  }
};

// In-memory data store that will be updated during the session
export const updatedBlogPosts: BlogPostsStore = loadBlogPostsFromStorage();

// Force a refresh of posts from localStorage
export const refreshBlogPosts = (): BlogPostsStore => {
  const refreshedPosts = loadBlogPostsFromStorage();
  
  // Update our in-memory store to match the refreshed data
  Object.keys(updatedBlogPosts).forEach(key => {
    delete updatedBlogPosts[key];
  });
  
  Object.entries(refreshedPosts).forEach(([key, value]) => {
    updatedBlogPosts[key] = { ...value };
  });
  
  console.log("Blog posts refreshed from localStorage:", Object.keys(updatedBlogPosts).length);
  return { ...updatedBlogPosts };
};

// Make sure the initial blog posts are properly formatted and available
console.log("Blog posts loaded and ready to use:", Object.keys(updatedBlogPosts).length);
