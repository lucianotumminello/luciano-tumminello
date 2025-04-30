
import { updatedBlogPosts } from "./blogPostsStore";
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";

/**
 * Gets all blog posts from the in-memory data store
 * @returns All blog posts with slugs as keys
 */
export const getAllBlogPosts = (): Record<string, BlogPost> => {
  const result: Record<string, BlogPost> = {};
  
  // Convert the store's format to include slugs in the blog post objects
  Object.entries(updatedBlogPosts).forEach(([slug, post]) => {
    result[slug] = {
      ...post,
      slug
    };
  });
  
  return result;
};

/**
 * Gets a specific blog post from the in-memory data store
 * @param slug The slug of the blog post
 * @returns The blog post or undefined if not found
 */
export const getBlogPost = (slug: string): (BlogPost | undefined) => {
  const post = updatedBlogPosts[slug];
  if (!post) return undefined;
  
  // Add the slug to the post object
  return {
    ...post,
    slug
  };
};
