
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import { updatedBlogPosts, saveBlogPostsToStorage } from "./blogPostsStore";

/**
 * Updates a blog post in the in-memory data store and localStorage
 * @param slug The slug of the blog post to update
 * @param blogPostData The updated blog post data
 */
export const updateBlogPost = (slug: string, blogPostData: BlogPost): void => {
  const { slug: _, ...blogPostWithoutSlug } = blogPostData;
  
  // Create a full copy of the current posts to avoid reference issues
  const updatedPosts: BlogPostsStore = { ...updatedBlogPosts };
  
  // Update the specific post
  updatedPosts[slug] = { ...blogPostWithoutSlug };
  
  // Save to localStorage to persist changes
  saveBlogPostsToStorage(updatedPosts);
  
  console.log(`Blog post ${slug} updated successfully`);
};

/**
 * Creates a new blog post in the in-memory data store and localStorage
 * @param slug The slug of the new blog post
 * @param blogPostData The blog post data
 */
export const createBlogPost = (slug: string, blogPostData: BlogPost): void => {
  const { slug: _, ...blogPostWithoutSlug } = blogPostData;
  
  // Create a full copy of the current posts to avoid reference issues
  const updatedPosts: BlogPostsStore = { ...updatedBlogPosts };
  
  // Add the new post
  updatedPosts[slug] = { ...blogPostWithoutSlug };
  
  // Save to localStorage to persist changes
  saveBlogPostsToStorage(updatedPosts);
  
  console.log(`New blog post ${slug} created successfully with slug: ${slug}`);
  console.log("Current blog posts:", Object.keys(updatedPosts));
};

/**
 * Deletes a blog post from the in-memory data store and localStorage
 * @param slug The slug of the blog post to delete
 */
export const deleteBlogPost = (slug: string): void => {
  // Create a full copy of the current posts to avoid reference issues
  const updatedPosts: BlogPostsStore = { ...updatedBlogPosts };
  
  // Remove the post
  delete updatedPosts[slug];
  
  // Save to localStorage to persist changes
  saveBlogPostsToStorage(updatedPosts);
  
  console.log(`Blog post ${slug} deleted successfully`);
};

/**
 * Duplicates a blog post in the in-memory data store and localStorage
 * @param originalSlug The slug of the blog post to duplicate
 * @param newSlug The slug for the duplicated blog post
 * @returns The duplicated blog post data or undefined if original not found
 */
export const duplicateBlogPost = (originalSlug: string, newSlug: string): BlogPost | undefined => {
  // Check if the original post exists
  if (!updatedBlogPosts[originalSlug]) {
    console.error(`Blog post ${originalSlug} not found for duplication`);
    return undefined;
  }

  // Create a deep copy of the blog post
  const originalPost = updatedBlogPosts[originalSlug];
  const duplicatedPost: BlogPost = JSON.parse(JSON.stringify(originalPost));
  
  // Modify the title to indicate it's a copy
  duplicatedPost.title = `${duplicatedPost.title} (Copy)`;
  if (duplicatedPost.titleIT) {
    duplicatedPost.titleIT = `${duplicatedPost.titleIT} (Copia)`;
  }
  
  // Update the date to current date
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString('en-US', { month: 'long' });
  const year = now.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  
  const monthIT = now.toLocaleString('it-IT', { month: 'long' });
  const formattedDateIT = `${day} ${monthIT} ${year}`;
  
  duplicatedPost.date = formattedDate;
  duplicatedPost.dateIT = formattedDateIT;
  
  // Create a full copy of the current posts to avoid reference issues
  const updatedPosts: BlogPostsStore = { ...updatedBlogPosts };
  
  // Add the duplicated post
  updatedPosts[newSlug] = { ...duplicatedPost };
  
  // Save to localStorage to persist changes
  saveBlogPostsToStorage(updatedPosts);
  
  console.log(`Blog post ${originalSlug} duplicated successfully as ${newSlug}`);
  
  return { ...duplicatedPost, slug: newSlug };
};
