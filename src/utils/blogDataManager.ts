
import blogPostsData from "@/data/blogPostsData";
import { BlogPost } from "@/types";

// In-memory data store that will be updated during the session
let updatedBlogPosts = { ...blogPostsData };

/**
 * Updates a blog post in the in-memory data store
 * @param slug The slug of the blog post to update
 * @param blogPostData The updated blog post data
 */
export const updateBlogPost = (slug: string, blogPostData: BlogPost): void => {
  updatedBlogPosts[slug] = blogPostData;
  
  // Log for debugging purposes
  console.log(`Blog post ${slug} updated successfully`);
};

/**
 * Creates a new blog post in the in-memory data store
 * @param slug The slug of the new blog post
 * @param blogPostData The blog post data
 */
export const createBlogPost = (slug: string, blogPostData: BlogPost): void => {
  updatedBlogPosts[slug] = blogPostData;
  
  // Log for debugging purposes
  console.log(`New blog post ${slug} created successfully`);
};

/**
 * Gets all blog posts from the in-memory data store
 * @returns All blog posts
 */
export const getAllBlogPosts = (): Record<string, BlogPost> => {
  return updatedBlogPosts;
};

/**
 * Gets a specific blog post from the in-memory data store
 * @param slug The slug of the blog post
 * @returns The blog post or undefined if not found
 */
export const getBlogPost = (slug: string): BlogPost | undefined => {
  return updatedBlogPosts[slug];
};

// Export the updated blog posts as default
export default updatedBlogPosts;
