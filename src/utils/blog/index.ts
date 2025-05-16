
export { getAllBlogPosts, getBlogPost } from './blogPostQueries';
export { createBlogPost, updateBlogPost, deleteBlogPost, duplicateBlogPost } from './blogPostOperations';
export { default as initialBlogPosts } from './initialBlogPosts';
export { updatedBlogPosts } from './blogPostsStore';
export type { BlogPostsStore } from './types';

/**
 * Creates a duplicate of the most recent blog post
 * @returns The slug of the duplicated post, or null if duplication failed
 */
export const duplicateMostRecentPost = (): string | null => {
  const allPosts = getAllBlogPosts();
  
  // If no posts exist, return null
  if (Object.keys(allPosts).length === 0) {
    console.error('No blog posts found to duplicate');
    return null;
  }
  
  // Find the most recent post by comparing dates
  let mostRecentSlug: string | null = null;
  let mostRecentDate: Date | null = null;
  
  Object.entries(allPosts).forEach(([slug, post]) => {
    const postDate = new Date(post.date);
    if (!mostRecentDate || postDate > mostRecentDate) {
      mostRecentDate = postDate;
      mostRecentSlug = slug;
    }
  });
  
  if (!mostRecentSlug) {
    console.error('Failed to determine most recent blog post');
    return null;
  }
  
  // Generate a new slug for the duplicated post
  const timestamp = Date.now();
  const newSlug = `${mostRecentSlug}-copy-${timestamp}`;
  
  // Use the duplicateBlogPost function to create the copy
  const success = duplicateBlogPost(mostRecentSlug, newSlug);
  
  return success ? newSlug : null;
};
