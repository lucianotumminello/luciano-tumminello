
import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import { supabase } from "@/integrations/supabase/client";

// In-memory cache of blog posts
let cachedBlogPosts: BlogPostsStore | null = null;

// Last fetch timestamp to control refresh frequency
let lastFetchTimestamp = 0;
const FETCH_COOLDOWN_MS = 2000; // Minimum time between fetches to prevent excessive calls

/**
 * Fetches all blog posts from Supabase
 * @returns A promise that resolves to all blog posts
 */
export const fetchBlogPostsFromServer = async (): Promise<BlogPostsStore> => {
  try {
    const now = Date.now();
    
    // Check if we've fetched recently to prevent excessive calls
    if (cachedBlogPosts && now - lastFetchTimestamp < FETCH_COOLDOWN_MS) {
      console.log("Using cached blog posts (fetch cooldown active)");
      return { ...cachedBlogPosts };
    }
    
    // Update timestamp whether we successfully fetch or not
    lastFetchTimestamp = now;
    
    console.log("Fetching blog posts from database");
    
    // Fetch from Supabase - anyone can read published posts
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching from Supabase:", error);
      throw error;
    }
    
    // Convert array to BlogPostsStore object keyed by slug
    const posts: BlogPostsStore = {};
    if (data) {
      data.forEach(post => {
        posts[post.slug] = {
          title: post.title,
          titleIT: post.title_it || post.title,
          excerpt: post.excerpt,
          excerptIT: post.excerpt_it || post.excerpt,
          content: post.content,
          contentIT: post.content_it || post.content,
          author: post.author,
          authorImageUrl: post.author_image_url || undefined,
          date: post.date,
          dateIT: post.date_it || post.date,
          category: post.category,
          categoryIT: post.category_it || post.category,
          imageUrl: post.image_url || undefined,
          desktopImageUrl: post.desktop_image_url || undefined,
          readingTime: post.reading_time || undefined,
          readingTimeIT: post.reading_time_it || undefined,
          tags: post.tags || [],
          tagsIT: post.tags_it || [],
          published: post.published
        };
      });
    }
    
    console.log("Fetched blog posts from database:", Object.keys(posts).length);
    
    // Update the cache
    cachedBlogPosts = { ...posts };
    
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts from database:", error);
    
    // If we have cached posts, use them
    if (cachedBlogPosts) {
      console.log("Using cached blog posts as fallback");
      return { ...cachedBlogPosts };
    }
    
    // Return empty object if we can't fetch and have no cache
    console.log("Returning empty blog posts");
    return {};
  }
};

/**
 * Saves blog posts to Supabase
 * @param posts The blog posts to save
 * @returns A promise that resolves when the posts have been saved
 */
export const saveBlogPostsToServer = async (posts: BlogPostsStore): Promise<void> => {
  try {
    console.log("Saving blog posts to database");
    
    // Update the cache
    cachedBlogPosts = { ...posts };
    
    // Dispatch an event to notify other components of the update
    const blogUpdateEvent = new CustomEvent('blog-server-updated', { detail: posts });
    window.dispatchEvent(blogUpdateEvent);
    
    console.log("Blog posts cache updated");
  } catch (error) {
    console.error("Error updating blog posts cache:", error);
    throw error;
  }
};

/**
 * Gets blog posts from the cache or fetches them if the cache is empty
 * @returns A promise that resolves to all blog posts
 */
export const getBlogPostsFromCache = async (): Promise<BlogPostsStore> => {
  if (cachedBlogPosts) {
    return { ...cachedBlogPosts };
  }
  
  // Cache is empty, fetch from server
  const posts = await fetchBlogPostsFromServer();
  cachedBlogPosts = { ...posts };
  return posts;
};

/**
 * Clears the cache to force a fresh fetch from the server
 */
export const invalidateBlogPostsCache = (): void => {
  cachedBlogPosts = null;
  console.log("Blog posts cache invalidated");
};

// Setup realtime listener for blog post changes
if (typeof window !== 'undefined') {
  // Listen for Supabase realtime updates
  const channel = supabase
    .channel('blog-posts-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'blog_posts'
      },
      (payload) => {
        console.log('Blog post changed in database:', payload);
        invalidateBlogPostsCache();
        // Dispatch event for components to refresh
        const blogUpdateEvent = new CustomEvent('blog-storage-updated');
        window.dispatchEvent(blogUpdateEvent);
      }
    )
    .subscribe();
}
