
// Export queries - now with unified storage
export { getAllBlogPosts, getBlogPost } from './blogPostQueries';

// Export operations - now with unified storage
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

// Export unified storage
export { unifiedStorage } from './unifiedBlogStorage';

// Export types
export type { BlogPostsStore } from './types';

// Force-import the utility to make the blog post permanent
import './makeBeyondRecognitionPermanent';
