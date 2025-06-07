
// Export queries - now with Supabase storage
export { getAllBlogPosts, getBlogPost } from './blogPostQueries';

// Export operations - now with Supabase storage
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

// Export Supabase storage
export { supabaseUnifiedStorage } from './supabaseUnifiedStorage';

// Export types
export type { BlogPostsStore } from './types';

// Export utility functions without auto-execution
export { default as makeAdaptabilityPostPermanent } from './makeAdaptabilityPostPermanent';
