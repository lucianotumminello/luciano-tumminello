
import { BlogPostsStore } from "./types";
import { 
  fetchBlogPostsFromServer, 
  saveBlogPostsToServer, 
  getBlogPostsFromCache,
  invalidateBlogPostsCache
} from "./blogServerStorage";

// In-memory data store that will be updated during the session
export const updatedBlogPosts: BlogPostsStore = {};

// Initialize the blog posts store
export const initializeBlogPosts = async (): Promise<void> => {
  try {
    console.log("Initializing blog posts store");
    const posts = await fetchBlogPostsFromServer(true); // Force fresh fetch
    
    // Clear the updatedBlogPosts object
    Object.keys(updatedBlogPosts).forEach(key => {
      delete updatedBlogPosts[key];
    });
    
    // Copy all fetched posts to the in-memory store
    Object.entries(posts).forEach(([key, value]) => {
      updatedBlogPosts[key] = { ...value };
    });
    
    console.log("Blog posts initialized:", Object.keys(updatedBlogPosts).length);
    console.log("Available blog posts after init:", Object.keys(updatedBlogPosts).join(", "));
    
    // Verify that the Agile backbone post has the correct image URLs
    const agilePost = updatedBlogPosts['agile-backbone-resilient-operational-models'];
    if (agilePost) {
      console.log("Agile post images:", {
        desktop: agilePost.desktopImageUrl,
        mobile: agilePost.imageUrl
      });
    }
  } catch (error) {
    console.error("Error initializing blog posts:", error);
  }
};

// Call this function immediately to load data
initializeBlogPosts().catch(error => {
  console.error("Failed to initialize blog posts:", error);
});

// Save blog posts to the server
export const saveBlogPostsToStorage = async (posts: BlogPostsStore): Promise<void> => {
  try {
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
    
    console.log("Blog posts saved successfully and events dispatched");
  } catch (error) {
    console.error("Error saving blog posts:", error);
    throw error;
  }
};

// Force a refresh of posts from the server
export const refreshBlogPosts = async (forceRefresh = false): Promise<BlogPostsStore> => {
  try {
    console.log(`Refreshing blog posts from server (force=${forceRefresh})`);
    
    // Always invalidate cache when forcing a refresh
    if (forceRefresh) {
      invalidateBlogPostsCache();
    }
    
    const refreshedPosts = await fetchBlogPostsFromServer(forceRefresh);
    
    // Update our in-memory store to match the refreshed data
    Object.keys(updatedBlogPosts).forEach(key => {
      delete updatedBlogPosts[key];
    });
    
    Object.entries(refreshedPosts).forEach(([key, value]) => {
      updatedBlogPosts[key] = { ...value };
    });
    
    console.log("Blog posts refreshed from server:", Object.keys(updatedBlogPosts).length);
    console.log("Available blog posts after refresh:", Object.keys(updatedBlogPosts).join(", "));
    
    // Verify image URLs after refresh
    const agilePost = updatedBlogPosts['agile-backbone-resilient-operational-models'];
    if (agilePost) {
      console.log("Agile post images after refresh:", {
        desktop: agilePost.desktopImageUrl,
        mobile: agilePost.imageUrl
      });
    }
    
    return { ...updatedBlogPosts };
  } catch (error) {
    console.error("Error refreshing blog posts:", error);
    return { ...updatedBlogPosts };
  }
};

// Listen for various storage update events
if (typeof window !== 'undefined') {
  // Listen for storage events from other tabs/windows
  window.addEventListener('storage', (event) => {
    if (event.key === "blog_posts_server_storage") {
      console.log("Blog posts updated in another tab/window, refreshing data");
      refreshBlogPosts().catch(error => {
        console.error("Error refreshing blog posts after storage event:", error);
      });
    }
  });
  
  // Listen for periodic refresh events
  window.addEventListener('blog-periodic-refresh', () => {
    console.log("Periodic refresh triggered, updating blog posts");
    refreshBlogPosts().catch(error => {
      console.error("Error during periodic refresh:", error);
    });
  });
}
