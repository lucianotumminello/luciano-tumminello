
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import { refreshBlogPosts, updatedBlogPosts } from "./blogPostsStore";

/**
 * Gets all blog posts
 * @returns A promise that resolves to a record of blog posts
 */
export const getAllBlogPosts = async (): Promise<Record<string, BlogPost>> => {
  try {
    console.log("Getting all blog posts");
    
    // Check if we already have posts in memory
    const postCount = Object.keys(updatedBlogPosts).length;
    
    // If we don't have any posts yet, refresh from storage
    if (postCount === 0) {
      console.log("No posts in memory, refreshing from storage");
      await refreshBlogPosts(true);
    } else {
      console.log(`Found ${postCount} posts in memory`);
    }
    
    // Convert our internal blog posts store to the expected format
    const result: Record<string, BlogPost> = {};
    
    // Add the slug to each post
    Object.entries(updatedBlogPosts).forEach(([slug, post]) => {
      result[slug] = {
        ...post,
        slug,
        // Ensure published is defined (defaults to true if not specified)
        published: post.published !== false
      };
    });
    
    console.log(`Returning ${Object.keys(result).length} blog posts`);
    console.log("Available blog posts:", Object.keys(result).join(", "));
    
    return result;
  } catch (error) {
    console.error("Error getting all blog posts:", error);
    return {};
  }
};

/**
 * Gets a single blog post by slug
 * @param slug The slug of the blog post to get
 * @returns A promise that resolves to the blog post or null if not found
 */
export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    console.log(`Getting blog post with slug: ${slug}`);
    
    // Check if we already have the post in memory
    if (updatedBlogPosts[slug]) {
      console.log(`Found post ${slug} in memory`);
      
      // Return the post with the slug
      return {
        ...updatedBlogPosts[slug],
        slug,
        // Ensure published is defined (defaults to true if not specified)
        published: updatedBlogPosts[slug].published !== false
      };
    }
    
    // We don't have the post, so refresh all posts from storage
    console.log(`Post ${slug} not found in memory, refreshing from storage`);
    await refreshBlogPosts(true);
    
    // Check if we have the post now
    if (updatedBlogPosts[slug]) {
      console.log(`Found post ${slug} after refreshing`);
      
      // Return the post with the slug
      return {
        ...updatedBlogPosts[slug],
        slug,
        // Ensure published is defined (defaults to true if not specified)
        published: updatedBlogPosts[slug].published !== false
      };
    }
    
    // The post was not found
    console.log(`Blog post with slug ${slug} not found after refreshing`);
    return null;
  } catch (error) {
    console.error(`Error getting blog post with slug ${slug}:`, error);
    return null;
  }
};

/**
 * Gets all published blog posts
 * @returns A promise that resolves to a record of published blog posts
 */
export const getPublishedBlogPosts = async (): Promise<Record<string, BlogPost>> => {
  try {
    console.log("Getting all published blog posts");
    
    // Get all blog posts
    const allPosts = await getAllBlogPosts();
    
    // Filter out unpublished posts
    const publishedPosts: Record<string, BlogPost> = {};
    
    Object.entries(allPosts).forEach(([slug, post]) => {
      // Only include posts that have published set to true or undefined
      if (post.published !== false) {
        publishedPosts[slug] = post;
      }
    });
    
    console.log(`Returning ${Object.keys(publishedPosts).length} published blog posts`);
    
    return publishedPosts;
  } catch (error) {
    console.error("Error getting published blog posts:", error);
    return {};
  }
};

/**
 * Gets all featured blog posts
 * @returns A promise that resolves to a record of featured blog posts
 */
export const getFeaturedBlogPosts = async (): Promise<Record<string, BlogPost>> => {
  try {
    console.log("Getting all featured blog posts");
    
    // Get all published blog posts
    const publishedPosts = await getPublishedBlogPosts();
    
    // Filter for featured posts
    const featuredPosts: Record<string, BlogPost> = {};
    
    Object.entries(publishedPosts).forEach(([slug, post]) => {
      if (post.featured === true) {
        featuredPosts[slug] = post;
      }
    });
    
    console.log(`Returning ${Object.keys(featuredPosts).length} featured blog posts`);
    
    return featuredPosts;
  } catch (error) {
    console.error("Error getting featured blog posts:", error);
    return {};
  }
};
