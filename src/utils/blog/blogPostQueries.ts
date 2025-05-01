
import { updatedBlogPosts } from "./blogPostsStore";
import { BlogPostsStore } from "./types";
import { BlogPost } from "@/types";

/**
 * Gets all blog posts from the in-memory data store
 * @returns All blog posts
 */
export const getAllBlogPosts = (): Record<string, BlogPost> => {
  // Convert the store format to include slugs in each post object
  const postsWithSlugs: Record<string, BlogPost> = {};
  
  Object.entries(updatedBlogPosts).forEach(([slug, postData]) => {
    postsWithSlugs[slug] = {
      ...postData,
      slug
    };
  });
  
  return postsWithSlugs;
};

/**
 * Gets a specific blog post from the in-memory data store
 * @param slug The slug of the blog post
 * @returns The blog post with slug included or undefined if not found
 */
export const getBlogPost = (slug: string): (BlogPost | undefined) => {
  const post = updatedBlogPosts[slug];
  
  if (!post) {
    return undefined;
  }
  
  return {
    ...post,
    slug
  };
};
