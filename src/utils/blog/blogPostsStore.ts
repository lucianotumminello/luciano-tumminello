
import { BlogPostsStore } from "./types";
import { 
  fetchBlogPostsFromServer, 
  saveBlogPostsToServer, 
  getBlogPostsFromCache,
  invalidateBlogPostsCache
} from "./blogServerStorage";
import { supabaseUnifiedStorage } from "./supabaseUnifiedStorage";

// In-memory data store that will be updated during the session
export const updatedBlogPosts: BlogPostsStore = {};

// Initialize the blog posts store with Supabase
export const initializeBlogPosts = async (): Promise<void> => {
  try {
    // Initialize Supabase storage first
    await supabaseUnifiedStorage.initialize();
    
    // Fetch posts from Supabase
    const posts = await fetchBlogPostsFromServer();
    
    // Clear the updatedBlogPosts object
    Object.keys(updatedBlogPosts).forEach(key => {
      delete updatedBlogPosts[key];
    });
    
    // Copy all fetched posts to the in-memory store
    Object.entries(posts).forEach(([key, value]) => {
      updatedBlogPosts[key] = { ...value };
    });
    
    console.log("Blog posts initialized with Supabase:", Object.keys(updatedBlogPosts).length);
  } catch (error) {
    console.error("Error initializing blog posts:", error);
  }
};

// Call this function immediately to load data
initializeBlogPosts().catch(error => {
  console.error("Failed to initialize blog posts:", error);
});

// Save blog posts to Supabase
export const saveBlogPostsToStorage = async (posts: BlogPostsStore): Promise<void> => {
  try {
    // Save to Supabase
    await saveBlogPostsToServer(posts);
    
    // Update our in-memory store to match the stored data
    Object.keys(updatedBlogPosts).forEach(key => {
      delete updatedBlogPosts[key];
    });
    
    Object.entries(posts).forEach(([key, value]) => {
      updatedBlogPosts[key] = { ...value };
    });
    
    // Dispatch events for other components to detect the change
    const storageEvent = new CustomEvent('blog-storage-updated', { detail: posts });
    window.dispatchEvent(storageEvent);
    
    console.log("Blog posts saved to Supabase and events dispatched");
  } catch (error) {
    console.error("Error saving blog posts:", error);
    throw error;
  }
};

// Force a refresh of posts from Supabase
export const refreshBlogPosts = async (): Promise<BlogPostsStore> => {
  try {
    // Invalidate cache to force a fresh fetch
    invalidateBlogPostsCache();
    
    // Refresh from Supabase
    const refreshedPosts = await supabaseUnifiedStorage.refresh();
    
    // Update our in-memory store to match the refreshed data
    Object.keys(updatedBlogPosts).forEach(key => {
      delete updatedBlogPosts[key];
    });
    
    Object.entries(refreshedPosts).forEach(([key, value]) => {
      updatedBlogPosts[key] = { ...value };
    });
    
    console.log("Blog posts refreshed from Supabase:", Object.keys(updatedBlogPosts).length);
    return { ...updatedBlogPosts };
  } catch (error) {
    console.error("Error refreshing blog posts:", error);
    return { ...updatedBlogPosts };
  }
};

// Listen for various storage update events
if (typeof window !== 'undefined') {
  // Listen for periodic refresh events
  window.addEventListener('blog-periodic-refresh', () => {
    console.log("Periodic refresh triggered, updating blog posts from Supabase");
    refreshBlogPosts().catch(error => {
      console.error("Error during periodic refresh:", error);
    });
  });
}
