
import { BlogPost } from '@/types';
import { BlogPostsStore } from './types';
import { updatedBlogPosts, saveBlogPostsToStorage } from './blogPostsStore';

/**
 * Creates a new blog post
 * @param newPost The new blog post to create
 * @param slug The slug to use for the blog post
 * @returns A promise that resolves to a boolean indicating success
 */
export const createBlogPost = async (newPost: BlogPost, slug: string): Promise<boolean> => {
  try {
    // Make sure the published flag is set to true by default if not specified
    const postWithPublishedFlag = {
      ...newPost,
      published: newPost.published !== false
    };
    
    // Add the new post to the updated blog posts
    updatedBlogPosts[slug] = { ...postWithPublishedFlag };
    
    // Save the updated blog posts to storage
    await saveBlogPostsToStorage({ ...updatedBlogPosts });
    
    return true;
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
};

/**
 * Updates an existing blog post
 * @param slug The slug of the blog post to update
 * @param updatedPost The updated blog post
 * @returns A promise that resolves to a boolean indicating success
 */
export const updateBlogPost = async (slug: string, updatedPost: BlogPost): Promise<boolean> => {
  try {
    // Check if the blog post exists
    if (!updatedBlogPosts[slug]) {
      console.error(`Blog post with slug ${slug} not found.`);
      return false;
    }
    
    // Ensure the published flag is preserved unless explicitly set
    const postWithPublishedFlag = {
      ...updatedPost,
      published: updatedPost.published !== undefined 
        ? updatedPost.published 
        : (updatedBlogPosts[slug].published !== false)
    };
    
    // Update the blog post
    updatedBlogPosts[slug] = { ...postWithPublishedFlag };
    
    // Save the updated blog posts to storage
    await saveBlogPostsToStorage({ ...updatedBlogPosts });
    
    return true;
  } catch (error) {
    console.error(`Error updating blog post ${slug}:`, error);
    return false;
  }
};

/**
 * Deletes a blog post
 * @param slug The slug of the blog post to delete
 * @returns A promise that resolves to a boolean indicating success
 */
export const deleteBlogPost = async (slug: string): Promise<boolean> => {
  try {
    // Check if the blog post exists
    if (!updatedBlogPosts[slug]) {
      console.error(`Blog post with slug ${slug} not found.`);
      return false;
    }
    
    // Delete the blog post
    delete updatedBlogPosts[slug];
    
    // Save the updated blog posts to storage
    await saveBlogPostsToStorage({ ...updatedBlogPosts });
    
    return true;
  } catch (error) {
    console.error(`Error deleting blog post ${slug}:`, error);
    return false;
  }
};

/**
 * Creates a duplicate of an existing blog post
 * @param originalSlug The slug of the blog post to duplicate
 * @returns A promise that resolves to the duplicated post if successful, or null if failed
 */
export const duplicateBlogPost = async (originalSlug: string): Promise<BlogPost | null> => {
  try {
    // Check if the original blog post exists
    if (!updatedBlogPosts[originalSlug]) {
      console.error(`Blog post with slug ${originalSlug} not found.`);
      return null;
    }
    
    // Create a new slug with timestamp to ensure uniqueness
    const newSlug = `${originalSlug}-copy-${Date.now()}`;
    
    // Create a copy of the original blog post
    const originalPost = updatedBlogPosts[originalSlug];
    const newPost: BlogPost = { 
      ...originalPost, 
      slug: newSlug,
      published: originalPost.published !== false // Ensure published flag is preserved
    };
    
    // Add the new post to the updated blog posts
    updatedBlogPosts[newSlug] = newPost;
    
    // Save the updated blog posts to storage
    await saveBlogPostsToStorage({ ...updatedBlogPosts });
    
    return newPost;
  } catch (error) {
    console.error(`Error duplicating blog post ${originalSlug}:`, error);
    return null;
  }
};

/**
 * Makes a blog post permanent with a clean URL
 * @param temporarySlug The original/temporary slug
 * @param permanentSlug The new permanent slug
 * @param published Optional flag to explicitly set published status (defaults to true)
 * @returns A promise that resolves to a boolean indicating success
 */
export const makeBlogPostPermanent = async (
  temporarySlug: string, 
  permanentSlug: string,
  published: boolean = true
): Promise<boolean> => {
  try {
    // Check if the original blog post exists
    if (!updatedBlogPosts[temporarySlug]) {
      console.error(`Blog post with slug ${temporarySlug} not found.`);
      return false;
    }
    
    // Check if the permanent slug already exists to avoid overwriting
    if (updatedBlogPosts[permanentSlug]) {
      console.log(`Permanent post ${permanentSlug} already exists, no action needed.`);
      
      // Ensure published flag is set to true for the permanent post
      if (updatedBlogPosts[permanentSlug].published !== published) {
        console.log(`Updating published status of ${permanentSlug} to ${published}`);
        updatedBlogPosts[permanentSlug] = {
          ...updatedBlogPosts[permanentSlug],
          published: published
        };
        
        // Save the updated blog posts to storage
        await saveBlogPostsToStorage({ ...updatedBlogPosts });
      }
      
      return true;
    }
    
    // Create a copy of the original blog post
    const originalPost = updatedBlogPosts[temporarySlug];
    const permanentPost = { 
      ...originalPost,
      published: published // Explicitly set the published flag
    };
    
    // Add the permanent post to the updated blog posts
    updatedBlogPosts[permanentSlug] = permanentPost;
    
    // Save the updated blog posts to storage
    await saveBlogPostsToStorage({ ...updatedBlogPosts });
    
    console.log(`Blog post made permanent: ${temporarySlug} -> ${permanentSlug}`);
    console.log(`Published status set to: ${published}`);
    
    return true;
  } catch (error) {
    console.error(`Error making blog post permanent: ${temporarySlug} -> ${permanentSlug}`, error);
    return false;
  }
};
