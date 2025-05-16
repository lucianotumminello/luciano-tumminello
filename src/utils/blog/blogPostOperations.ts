
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
  
  const newBlogPosts: BlogPostsStore = {
    ...updatedBlogPosts,
    [slug]: blogPostWithoutSlug
  };
  
  // Update the in-memory store with a fresh object to avoid reference issues
  Object.keys(updatedBlogPosts).forEach(key => {
    delete updatedBlogPosts[key];
  });
  Object.assign(updatedBlogPosts, newBlogPosts);
  
  console.log(`Blog post ${slug} updated successfully`);
};

/**
 * Creates a new blog post in the in-memory data store
 * @param slug The slug of the new blog post
 * @param blogPostData The blog post data
 */
export const createBlogPost = (slug: string, blogPostData: BlogPost): void => {
  const { slug: _, ...blogPostWithoutSlug } = blogPostData;
  
  const newBlogPosts: BlogPostsStore = {
    ...updatedBlogPosts,
    [slug]: blogPostWithoutSlug
  };
  
  // Update the in-memory store with a fresh object to avoid reference issues
  Object.keys(updatedBlogPosts).forEach(key => {
    delete updatedBlogPosts[key];
  });
  Object.assign(updatedBlogPosts, newBlogPosts);
  
  console.log(`New blog post ${slug} created successfully`);
  console.log("Current blog posts:", Object.keys(updatedBlogPosts));
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

/**
 * Duplicates an existing blog post with a new slug
 * @param originalSlug The slug of the blog post to duplicate
 * @param newSlug The slug for the duplicated blog post
 * @returns boolean indicating success or failure
 */
export const duplicateBlogPost = (originalSlug: string, newSlug: string): boolean => {
  // Check if the original post exists
  if (!updatedBlogPosts[originalSlug]) {
    console.error(`Cannot duplicate: Blog post with slug ${originalSlug} not found`);
    return false;
  }
  
  // Check if the new slug already exists
  if (updatedBlogPosts[newSlug]) {
    console.error(`Cannot duplicate: Blog post with slug ${newSlug} already exists`);
    return false;
  }
  
  // Clone the original blog post
  const originalPost = updatedBlogPosts[originalSlug];
  const duplicatedPost = JSON.parse(JSON.stringify(originalPost));
  
  // Update the title to indicate it's a copy
  duplicatedPost.title = `${duplicatedPost.title} (Copy)`;
  duplicatedPost.titleIT = `${duplicatedPost.titleIT} (Copia)`;
  
  // Add the duplicated post to the store
  const newBlogPosts: BlogPostsStore = {
    ...updatedBlogPosts,
    [newSlug]: duplicatedPost
  };
  
  // Update the in-memory store
  Object.keys(updatedBlogPosts).forEach(key => {
    delete updatedBlogPosts[key];
  });
  Object.assign(updatedBlogPosts, newBlogPosts);
  
  console.log(`Blog post ${originalSlug} duplicated successfully as ${newSlug}`);
  return true;
};
