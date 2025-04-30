
import type { BlogPost } from '@/types';

export function getAllBlogPosts(): Record<string, BlogPost> {
  try {
    const blogsJson = localStorage.getItem('blog_posts');
    return blogsJson ? JSON.parse(blogsJson) : {};
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return {};
  }
}

export function getPublishedBlogPosts(): Record<string, BlogPost> {
  const allPosts = getAllBlogPosts();
  return Object.entries(allPosts).reduce((acc, [slug, post]) => {
    if (!post.unpublished) {
      acc[slug] = post;
    }
    return acc;
  }, {} as Record<string, BlogPost>);
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const blogs = getAllBlogPosts();
    return blogs[slug] || null;
  } catch (error) {
    console.error('Error getting blog post:', error);
    return null;
  }
}

export function updateBlogPost(slug: string, updatedPost: BlogPost): void {
  try {
    const blogs = getAllBlogPosts();
    blogs[slug] = updatedPost;
    localStorage.setItem('blog_posts', JSON.stringify(blogs));
  } catch (error) {
    console.error('Error updating blog post:', error);
  }
}

export function createBlogPost(slug: string, newPost: BlogPost): void {
  try {
    const blogs = getAllBlogPosts();
    blogs[slug] = newPost;
    localStorage.setItem('blog_posts', JSON.stringify(blogs));
  } catch (error) {
    console.error('Error creating blog post:', error);
  }
}

export function deleteBlogPost(slug: string): void {
  try {
    const blogs = getAllBlogPosts();
    delete blogs[slug];
    localStorage.setItem('blog_posts', JSON.stringify(blogs));
  } catch (error) {
    console.error('Error deleting blog post:', error);
  }
}
