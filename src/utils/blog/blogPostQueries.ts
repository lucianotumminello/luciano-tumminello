
import { updatedBlogPosts } from "./blogPostsStore";
import { BlogPostsStore } from "./types";

/**
 * Gets all blog posts from the in-memory data store
 * @returns All blog posts
 */
export const getAllBlogPosts = (): BlogPostsStore => {
  // Log the current state of the blog posts
  console.log("Getting all blog posts, count:", Object.keys(updatedBlogPosts).length);
  return { ...updatedBlogPosts };
};

/**
 * Gets a specific blog post from the in-memory data store
 * @param slug The slug of the blog post
 * @returns The blog post or undefined if not found
 */
export const getBlogPost = (slug: string): (Omit<import('@/types').BlogPost, "slug"> | undefined) => {
  return updatedBlogPosts[slug] ? { ...updatedBlogPosts[slug] } : undefined;
};
