
// Export queries
export { getAllBlogPosts, getBlogPost } from './blogPostQueries';

// Export operations
export { 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost,
  duplicateBlogPost 
} from './blogPostOperations';

// Export initial data
export { default as initialBlogPosts } from './initialBlogPosts';

// Export store
export { updatedBlogPosts, saveBlogPostsToStorage } from './blogPostsStore';

// Export types
export type { BlogPostsStore } from './types';
