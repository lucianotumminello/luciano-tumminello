
// This file mocks a server API for blog posts
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import initialBlogPosts from "./initialBlogPosts";

// Local storage key
const STORAGE_KEY = "blog_posts_server_storage";

// Get blog posts from local storage or use initial posts
export const mockApiGetAllPosts = (): BlogPostsStore => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
    // No stored data found, return initial posts and save them
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBlogPosts));
    return { ...initialBlogPosts };
  } catch (error) {
    console.error("Error loading blog posts from mock API:", error);
    return { ...initialBlogPosts };
  }
};

// Save blog posts to local storage
export const mockApiSavePosts = (posts: BlogPostsStore): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    console.log("Blog posts saved to mock API");
  } catch (error) {
    console.error("Error saving blog posts to mock API:", error);
  }
};

// Update or create a blog post in local storage
export const mockApiUpdatePost = (slug: string, post: BlogPost): void => {
  try {
    const posts = mockApiGetAllPosts();
    posts[slug] = post;
    mockApiSavePosts(posts);
  } catch (error) {
    console.error(`Error updating blog post ${slug} in mock API:`, error);
  }
};

// Delete a blog post from local storage
export const mockApiDeletePost = (slug: string): void => {
  try {
    const posts = mockApiGetAllPosts();
    delete posts[slug];
    mockApiSavePosts(posts);
  } catch (error) {
    console.error(`Error deleting blog post ${slug} from mock API:`, error);
  }
};

// Method to integrate with Decap CMS
export const syncWithDecapCMS = async (): Promise<void> => {
  // This function would sync data between our mock API and Decap CMS
  // In a real implementation, this would pull from your git-based content
  console.log("Syncing with Decap CMS...");
};

// Adding mockApiReset for tests
export const mockApiReset = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBlogPosts));
    console.log("Blog posts reset to initial state");
  } catch (error) {
    console.error("Error resetting blog posts:", error);
  }
};
