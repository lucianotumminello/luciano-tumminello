
// Export queries - now with async functions
export { getAllBlogPosts, getBlogPost } from './blogPostQueries';

// Export operations - now with async functions
export { 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost,
  duplicateBlogPost,
  makeBlogPostPermanent
} from './blogPostOperations';

// Export initial data
export { default as initialBlogPosts } from './initialBlogPosts';

// Export store
export { 
  updatedBlogPosts, 
  saveBlogPostsToStorage,
  refreshBlogPosts,
  initializeBlogPosts
} from './blogPostsStore';

// Export server storage
export {
  fetchBlogPostsFromServer,
  saveBlogPostsToServer,
  getBlogPostsFromCache,
  invalidateBlogPostsCache
} from './blogServerStorage';

// Export types
export type { BlogPostsStore } from './types';

// Force-import the utility to make the blog post permanent
import './makeBeyondRecognitionPermanent';

// Force refresh blog posts on initial load
import { refreshBlogPosts } from './blogPostsStore';
console.log("Initializing blog posts refresh on index load");
refreshBlogPosts().catch(error => console.error("Error refreshing blog posts on initial load:", error));
