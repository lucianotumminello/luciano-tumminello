
import { makeBlogPostPermanent } from './blogPostOperations';

// This file is automatically imported by the blog index to make sure
// the blog post is permanently available
const ensureBeyondRecognitionBlogPostIsPermanent = async () => {
  try {
    // Check if we need to make the post permanent
    console.log("Checking if Beyond Recognition blog post exists...");
    
    // The permanent slug for the post
    const permanentSlug = "beyond-recognition";
    
    // Ensure the post is permanent and published
    await makeBlogPostPermanent("beyond-recognition", permanentSlug, true);
    
    console.log("Beyond Recognition blog post is now permanent");
  } catch (error) {
    console.error("Error making Beyond Recognition blog post permanent:", error);
  }
};

// Run the function immediately
ensureBeyondRecognitionBlogPostIsPermanent();

export default ensureBeyondRecognitionBlogPostIsPermanent;
