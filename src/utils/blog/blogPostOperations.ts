
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
  
  updatedBlogPosts[slug] = blogPostWithoutSlug;
  
  console.log(`Blog post ${slug} updated successfully`);
};

/**
 * Creates a new blog post in the in-memory data store
 * @param slug The slug of the new blog post
 * @param blogPostData The blog post data
 */
export const createBlogPost = (slug: string, blogPostData: BlogPost): void => {
  const { slug: _, ...blogPostWithoutSlug } = blogPostData;
  
  updatedBlogPosts[slug] = blogPostWithoutSlug;
  
  console.log(`New blog post ${slug} created successfully`);
  console.log("Current blog posts:", Object.keys(updatedBlogPosts));
};

/**
 * Deletes a blog post from the in-memory data store
 * @param slug The slug of the blog post to delete
 */
export const deleteBlogPost = (slug: string): void => {
  if (slug in updatedBlogPosts) {
    delete updatedBlogPosts[slug];
    console.log(`Blog post ${slug} deleted successfully`);
  } else {
    console.warn(`Blog post ${slug} not found for deletion`);
  }
};
