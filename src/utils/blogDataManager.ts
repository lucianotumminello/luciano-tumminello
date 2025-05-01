
// This file is kept for backward compatibility
// It re-exports everything from the new modular blog utilities

export { 
  getAllBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  updatedBlogPosts as default
} from './blog';

// Re-export types
export { BlogPostsStore, addSlugToPost } from './blog/types';
