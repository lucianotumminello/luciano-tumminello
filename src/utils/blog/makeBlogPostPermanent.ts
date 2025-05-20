
import { makeBlogPostPermanent } from './blogPostOperations';

// This file is automatically imported by the blog index to make sure
// the blog post is permanently available
const ensureAgileBackboneBlogPostIsPermanent = async () => {
  try {
    // Check if we need to make the post permanent
    console.log("Checking if Agile Backbone blog post exists...");
    
    // The permanent slug for the post
    const permanentSlug = "agile-backbone-operational-models";
    
    // Ensure the post is permanent and published
    await makeBlogPostPermanent("agile-backbone-operational-models", permanentSlug, true);
    
    console.log("Agile Backbone blog post is now permanent");
  } catch (error) {
    console.error("Error making Agile Backbone blog post permanent:", error);
  }
};

// Run the function immediately
ensureAgileBackboneBlogPostIsPermanent();

export default ensureAgileBackboneBlogPostIsPermanent;
