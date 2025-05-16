
import { makeBlogPostPermanent } from "./blogPostOperations";
import { refreshBlogPosts } from "./blogPostsStore";

/**
 * This utility function makes the "Beyond Pattern Recognition" blog post permanent
 * with a clean, permanent URL
 */
export const makeBeyondRecognitionPermanent = async (): Promise<void> => {
  try {
    // First refresh all blog posts from storage to ensure we have the latest data
    await refreshBlogPosts();
    
    // The current temporary URL slug
    const temporarySlug = "beyond-pattern-recognition-copy-1747394357064";
    
    // The new permanent slug to use (changed to avoid any conflict)
    const permanentSlug = "beyond-pattern-recognition-ai-revolution";
    
    // Make the blog post permanent with published flag explicitly set to true
    const result = await makeBlogPostPermanent(temporarySlug, permanentSlug, true);
    
    if (result) {
      console.log("Successfully created permanent blog post:", permanentSlug);
      console.log("The original post at", temporarySlug, "is still available");
    } else {
      console.error("Failed to create permanent blog post");
    }
  } catch (error) {
    console.error("Error making blog post permanent:", error);
  }
};

// Execute this function immediately when imported
makeBeyondRecognitionPermanent();
