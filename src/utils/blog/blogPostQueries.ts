
import { updatedBlogPosts, refreshBlogPosts } from "./blogPostsStore";
import { BlogPostsStore } from "./types";

/**
 * Gets all blog posts from the server
 * @returns All blog posts
 */
export const getAllBlogPosts = async (): Promise<BlogPostsStore> => {
  try {
    // First, refresh the blog posts from the server to ensure we have the latest data
    await refreshBlogPosts();
    
    // Log the current state of the blog posts
    console.log("Getting all blog posts, count:", Object.keys(updatedBlogPosts).length);
    console.log("Available blog post slugs:", Object.keys(updatedBlogPosts).join(", "));
    return { ...updatedBlogPosts };
  } catch (error) {
    console.error("Error getting all blog posts:", error);
    return { ...updatedBlogPosts };
  }
};

/**
 * Gets a specific blog post
 * @param slug The slug of the blog post
 * @returns The blog post or undefined if not found
 */
export const getBlogPost = async (slug: string): Promise<(Omit<import('@/types').BlogPost, "slug"> | undefined)> => {
  try {
    // First, refresh the blog posts from the server to ensure we have the latest data
    await refreshBlogPosts();
    
    console.log(`Getting blog post with slug ${slug}, exists: ${!!updatedBlogPosts[slug]}`);
    return updatedBlogPosts[slug] ? { ...updatedBlogPosts[slug] } : undefined;
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    return updatedBlogPosts[slug] ? { ...updatedBlogPosts[slug] } : undefined;
  }
};
