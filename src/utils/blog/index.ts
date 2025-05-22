
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

// Import CMS integration
import { syncDecapCmsEntries } from '../decapCmsIntegration';

// Perform initial sync with CMS (will be expanded in a full implementation)
if (typeof window !== 'undefined') {
  // Wait for the page to load before syncing
  window.addEventListener('load', () => {
    setTimeout(() => {
      syncDecapCmsEntries().catch(error => {
        console.error('Error syncing with Decap CMS on initial load:', error);
      });
    }, 2000);
  });
}
