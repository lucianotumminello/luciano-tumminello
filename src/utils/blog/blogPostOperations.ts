
import { BlogPost } from "@/types";
import { BlogPostsStore, addSlugToPost } from "./types";
import { updatedBlogPosts } from "./blogPostsStore";

/**
 * Updates a blog post in the in-memory data store
 * @param slug The slug of the blog post to update
 * @param blogPostData The updated blog post data
 */
export const updateBlogPost = (slug: string, blogPostData: BlogPost): void => {
  const { slug: _, ...blogPostWithoutSlug } = blogPostData;
  
  const newBlogPosts: BlogPostsStore = {
    [slug]: blogPostWithoutSlug
  };
  
  Object.entries(updatedBlogPosts).forEach(([key, value]) => {
    if (key !== slug) {
      newBlogPosts[key] = value;
    }
  });
  
  // Update the in-memory store
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
  
  // Update the in-memory store
  Object.keys(updatedBlogPosts).forEach(key => {
    delete updatedBlogPosts[key];
  });
  Object.assign(updatedBlogPosts, newBlogPosts);
  
  console.log(`New blog post ${slug} created successfully`);
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
