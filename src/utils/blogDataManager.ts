
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
  // Create a copy of the blog post data without the slug property
  const { slug: _, ...blogPostWithoutSlug } = blogPostData;
  
  // Remove the post from its current position
  const { [slug]: existingPost, ...remainingPosts } = updatedBlogPosts;
  
  // Create a new object with the updated post at the beginning
  updatedBlogPosts = {
    [slug]: blogPostWithoutSlug,
    ...remainingPosts
  };
  
  console.log(`Blog post ${slug} updated successfully`);
};

/**
 * Creates a new blog post in the in-memory data store
 * @param slug The slug of the new blog post
 * @param blogPostData The blog post data
 */
export const createBlogPost = (slug: string, blogPostData: BlogPost): void => {
  // Create a copy of the blog post data without the slug property
  const { slug: _, ...blogPostWithoutSlug } = blogPostData;
  
  // Add the new post to the beginning of the posts object
  updatedBlogPosts = {
    [slug]: blogPostWithoutSlug,
    ...updatedBlogPosts
  };
  
  console.log(`New blog post ${slug} created successfully`);
  console.log("Current blog posts:", Object.keys(updatedBlogPosts));
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
