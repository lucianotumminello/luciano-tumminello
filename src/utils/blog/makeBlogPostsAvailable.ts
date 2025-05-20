
import { publishAgileBlogPost } from "./blogPostOperations";
import { refreshBlogPosts } from "./blogPostsStore";

// This function ensures the blog post is published
const ensureBlogPostsAvailable = async (): Promise<void> => {
  try {
    console.log("Ensuring 'Agile Backbone' blog post is available");
    // First refresh to get the latest state
    await refreshBlogPosts();
    
    // Publish the blog post
    await publishAgileBlogPost();
    
    console.log("Finished ensuring blog posts are available");
  } catch (error) {
    console.error("Error ensuring blog posts are available:", error);
  }
};

// Call the function immediately
ensureBlogPostsAvailable().catch(error => {
  console.error("Failed to ensure blog posts are available:", error);
});

// Export for potential reuse
export default ensureBlogPostsAvailable;
