
import { BlogPostsStore } from "./types";
import initialBlogPosts from "./initialBlogPosts";

// This file simulates a server API for development and testing
// It uses sessionStorage instead of localStorage to simulate a server
// In production, this would be replaced with real API calls to your backend

const MOCK_API_STORAGE_KEY = "mock_server_blog_posts";

// Initialize the mock server with initial data
export const initializeMockServer = () => {
  try {
    const existingData = sessionStorage.getItem(MOCK_API_STORAGE_KEY);
    if (!existingData) {
      sessionStorage.setItem(MOCK_API_STORAGE_KEY, JSON.stringify(initialBlogPosts));
      console.log("Mock API server initialized with initial blog posts");
    }
  } catch (error) {
    console.error("Error initializing mock API server:", error);
  }
};

// Get all posts from the mock server
export const mockApiGetAllPosts = (): BlogPostsStore => {
  try {
    const data = sessionStorage.getItem(MOCK_API_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return { ...initialBlogPosts };
  } catch (error) {
    console.error("Error getting posts from mock API server:", error);
    return { ...initialBlogPosts };
  }
};

// Save posts to the mock server
export const mockApiSavePosts = (posts: BlogPostsStore): void => {
  try {
    sessionStorage.setItem(MOCK_API_STORAGE_KEY, JSON.stringify(posts));
    console.log("Posts saved to mock API server");
  } catch (error) {
    console.error("Error saving posts to mock API server:", error);
  }
};

// Reset the mock server to initial data
export const mockApiReset = (): void => {
  try {
    sessionStorage.setItem(MOCK_API_STORAGE_KEY, JSON.stringify(initialBlogPosts));
    console.log("Mock API server reset to initial data");
  } catch (error) {
    console.error("Error resetting mock API server:", error);
  }
};

// Initialize the mock server when this module is imported
initializeMockServer();
