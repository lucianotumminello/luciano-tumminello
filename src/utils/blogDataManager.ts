
// This file might not exist yet, or have a different implementation.
// I'm providing a full implementation that supports the published status.

import blogPostsData from "@/data/blogPostsData";
import { BlogPost } from "@/types";

// Store the blog posts in memory
let blogPosts: Record<string, BlogPost> = { ...blogPostsData };

/**
 * Get all blog posts
 */
export function getAllBlogPosts(): Record<string, BlogPost> {
  return { ...blogPosts };
}

/**
 * Get a specific blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | null {
  return blogPosts[slug] || null;
}

/**
 * Create a new blog post
 */
export function createBlogPost(slug: string, post: BlogPost): void {
  // Ensure the post has published status (default to true if not specified)
  const postWithPublished = {
    ...post,
    published: post.published !== false
  };
  
  blogPosts = {
    ...blogPosts,
    [slug]: postWithPublished
  };
  
  // In a real app, you would save to localStorage or an API here
  try {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  } catch (error) {
    console.error('Failed to save blog posts to localStorage:', error);
  }
}

/**
 * Update an existing blog post
 */
export function updateBlogPost(slug: string, post: BlogPost): void {
  if (!blogPosts[slug]) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }
  
  blogPosts = {
    ...blogPosts,
    [slug]: post
  };
  
  // In a real app, you would save to localStorage or an API here
  try {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  } catch (error) {
    console.error('Failed to save blog posts to localStorage:', error);
  }
}

/**
 * Delete a blog post
 */
export function deleteBlogPost(slug: string): void {
  const { [slug]: _, ...rest } = blogPosts;
  blogPosts = rest;
  
  // In a real app, you would save to localStorage or an API here
  try {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  } catch (error) {
    console.error('Failed to save blog posts to localStorage:', error);
  }
}

// Initialize blog posts from localStorage if available
try {
  const storedPosts = localStorage.getItem('blogPosts');
  if (storedPosts) {
    const parsedPosts = JSON.parse(storedPosts);
    if (parsedPosts && typeof parsedPosts === 'object') {
      blogPosts = parsedPosts;
    }
  }
} catch (error) {
  console.error('Failed to load blog posts from localStorage:', error);
}
