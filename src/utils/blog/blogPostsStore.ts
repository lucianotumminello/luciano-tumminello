
import { BlogPostsStore } from './types';
import { initialBlogPosts } from './initialBlogPosts';

// Create a copy of the initial blog posts to use for updates
export const updatedBlogPosts: BlogPostsStore = {};

// Initialize with the default blog posts
Object.assign(updatedBlogPosts, initialBlogPosts);
