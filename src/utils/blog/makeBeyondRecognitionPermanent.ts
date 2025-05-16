
import { makeBlogPostPermanent, createBlogPost } from "./blogPostOperations";
import { refreshBlogPosts } from "./blogPostsStore";
import { BlogPost } from "@/types";

/**
 * This utility function makes the "Beyond Pattern Recognition" blog post permanent
 * with a clean, permanent URL
 */
export const makeBeyondRecognitionPermanent = async (): Promise<void> => {
  try {
    // First refresh all blog posts from storage to ensure we have the latest data
    await refreshBlogPosts();
    
    // The current temporary slug
    const temporarySlug = "beyond-pattern-recognition-copy-1747394357064";
    
    // The new permanent slug to use (changed to avoid any conflict)
    // We're NOT using "beyond-pattern-recognition-ai-revolution" anymore
    const permanentSlug = "beyond-pattern-recognition-new-ai-wave";
    
    // Make the blog post permanent with published flag explicitly set to true
    const result = await makeBlogPostPermanent(temporarySlug, permanentSlug, true);
    
    if (result) {
      console.log("Successfully created permanent blog post:", permanentSlug);
      console.log("The original post at", temporarySlug, "is still available");
    } else {
      console.error("Failed to create permanent blog post");
    }

    // No longer create Human + Tech Equation post here as we're removing duplicates
    // This prevents recreation of the posts that we're trying to filter out
  } catch (error) {
    console.error("Error making blog posts permanent:", error);
  }
};

/**
 * Creates the "Human + Tech Equation" blog post
 * This is now disabled to prevent recreating posts we've filtered out
 */
const createHumanTechPost = async (): Promise<void> => {
  // Implementation removed to prevent recreating duplicate posts
  console.log("Human + Tech post creation disabled to prevent duplicates");
};

// Execute this function immediately when imported
makeBeyondRecognitionPermanent();
