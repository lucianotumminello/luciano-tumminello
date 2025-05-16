
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import { updatedBlogPosts } from "./blogPostsStore";

/**
 * Updates a blog post in the in-memory data store
 * @param slug The slug of the blog post to update
 * @param blogPostData The updated blog post data
 */
export const updateBlogPost = (slug: string, blogPostData: BlogPost): void => {
  const { slug: _, ...blogPostWithoutSlug } = blogPostData;
  
  // Always ensure blog posts are published by default unless explicitly set to false
  if (blogPostWithoutSlug.published === undefined) {
    blogPostWithoutSlug.published = true;
  }
  
  // Update the in-memory store directly
  updatedBlogPosts[slug] = blogPostWithoutSlug;
  
  console.log(`Blog post ${slug} updated successfully`);
  console.log("Current blog posts:", Object.keys(updatedBlogPosts));
};

/**
 * Creates a new blog post in the in-memory data store
 * @param slug The slug of the new blog post
 * @param blogPostData The blog post data
 */
export const createBlogPost = (slug: string, blogPostData: BlogPost): void => {
  const { slug: _, ...blogPostWithoutSlug } = blogPostData;
  
  // ALWAYS ensure the blog post is published by default
  if (blogPostWithoutSlug.published === undefined) {
    blogPostWithoutSlug.published = true;
  }
  
  // Update the in-memory store with the new blog post
  updatedBlogPosts[slug] = blogPostWithoutSlug;
  
  console.log(`New blog post ${slug} created successfully`);
  console.log("Current blog posts:", Object.keys(updatedBlogPosts));
};

/**
 * Duplicates a blog post in the in-memory data store
 * @param sourceSlug The slug of the blog post to duplicate
 * @param newSlug The slug for the new duplicate blog post
 * @returns The duplicated blog post data or undefined if source not found
 */
export const duplicateBlogPost = (sourceSlug: string, newSlug: string): BlogPost | undefined => {
  // Check if the source blog post exists
  if (!updatedBlogPosts[sourceSlug]) {
    console.error(`Blog post ${sourceSlug} not found for duplication`);
    return undefined;
  }
  
  // Create a deep copy of the blog post
  const sourcePost = updatedBlogPosts[sourceSlug];
  const duplicatedPost: BlogPost = JSON.parse(JSON.stringify(sourcePost));
  
  // Update the title to indicate it's a copy
  duplicatedPost.title = `${duplicatedPost.title} (Copy)`;
  if (duplicatedPost.titleIT) {
    duplicatedPost.titleIT = `${duplicatedPost.titleIT} (Copia)`;
  }
  
  // Ensure the duplicated post is published
  duplicatedPost.published = true;
  
  // Store the duplicated post with the new slug
  updatedBlogPosts[newSlug] = duplicatedPost;
  
  console.log(`Blog post ${sourceSlug} duplicated to ${newSlug} successfully`);
  return { ...duplicatedPost, slug: newSlug };
};

/**
 * Deletes a blog post from the in-memory data store
 * @param slug The slug of the blog post to delete
 */
export const deleteBlogPost = (slug: string): void => {
  const newBlogPosts: BlogPostsStore = {};
  
  Object.entries(updatedBlogPosts).forEach(([key, value]) => {
    if (key !== slug) {
      newBlogPosts[key] = value;
    }
  });
  
  // Replace the entire in-memory store
  Object.keys(updatedBlogPosts).forEach(key => {
    delete updatedBlogPosts[key];
  });
  Object.assign(updatedBlogPosts, newBlogPosts);
  
  console.log(`Blog post ${slug} deleted successfully`);
};
