
// This file is kept for backward compatibility
// It re-exports everything from the new modular blog utilities

export { 
  getAllBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  duplicateBlogPost,
  updatedBlogPosts as default
} from './blog';
