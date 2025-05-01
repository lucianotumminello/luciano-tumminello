
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
export type { BlogPostsStore } from './blog/types';
export { addSlugToPost } from './blog/types';
