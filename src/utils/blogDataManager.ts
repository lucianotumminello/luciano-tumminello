
// This file is kept for backward compatibility
// It re-exports everything from the new modular blog utilities

export { 
  getAllBlogPosts,
  getBlogPost
} from './blog/blogPostQueries';

export {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  duplicateBlogPost
} from './blog/blogPostOperations';

export {
  updatedBlogPosts,
  saveBlogPostsToStorage,
  refreshBlogPosts,
  initializeBlogPosts
} from './blog/blogPostsStore';

export {
  fetchBlogPostsFromServer,
  saveBlogPostsToServer,
  getBlogPostsFromCache,
  invalidateBlogPostsCache
} from './blog/blogServerStorage';

// Also export the updated blog posts as default for backward compatibility
import { updatedBlogPosts } from './blog/blogPostsStore';
export default updatedBlogPosts;
