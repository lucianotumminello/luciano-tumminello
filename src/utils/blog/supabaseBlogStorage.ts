
import { BlogPost } from '@/types';
import { BlogPostsStore } from './types';
import { supabase } from './supabaseClient';

export interface BlogPostRow {
  slug: string;
  title: string;
  title_it: string;
  excerpt: string;
  excerpt_it: string;
  content: string;
  content_it: string;
  author: string;
  author_image_url: string;
  date: string;
  date_it: string;
  category: string;
  category_it: string;
  image_url: string;
  desktop_image_url: string;
  reading_time: string;
  reading_time_it: string;
  tags: string[];
  tags_it: string[];
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Converts a database row to a BlogPost object
 */
const rowToBlogPost = (row: BlogPostRow): BlogPost => ({
  title: row.title,
  titleIT: row.title_it,
  excerpt: row.excerpt,
  excerptIT: row.excerpt_it,
  content: row.content,
  contentIT: row.content_it,
  author: row.author,
  authorImageUrl: row.author_image_url,
  date: row.date,
  dateIT: row.date_it,
  category: row.category,
  categoryIT: row.category_it,
  imageUrl: row.image_url,
  desktopImageUrl: row.desktop_image_url,
  readingTime: row.reading_time,
  readingTimeIT: row.reading_time_it,
  tags: row.tags,
  tagsIT: row.tags_it,
  slug: row.slug,
  published: row.published
});

/**
 * Converts a BlogPost to a database row
 */
const blogPostToRow = (slug: string, post: BlogPost): Omit<BlogPostRow, 'created_at' | 'updated_at'> => ({
  slug,
  title: post.title,
  title_it: post.titleIT,
  excerpt: post.excerpt,
  excerpt_it: post.excerptIT,
  content: post.content,
  content_it: post.contentIT,
  author: post.author,
  author_image_url: post.authorImageUrl,
  date: post.date,
  date_it: post.dateIT,
  category: post.category,
  category_it: post.categoryIT,
  image_url: post.imageUrl,
  desktop_image_url: post.desktopImageUrl,
  reading_time: post.readingTime,
  reading_time_it: post.readingTimeIT,
  tags: post.tags,
  tags_it: post.tagsIT,
  published: post.published !== false
});

/**
 * Fetch all blog posts from Supabase
 */
export const fetchBlogPostsFromSupabase = async (): Promise<BlogPostsStore> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    const posts: BlogPostsStore = {};
    data?.forEach((row: BlogPostRow) => {
      const { slug, ...postData } = rowToBlogPost(row);
      posts[slug!] = postData;
    });

    console.log('Fetched blog posts from Supabase:', Object.keys(posts).length);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts from Supabase:', error);
    throw error;
  }
};

/**
 * Save a blog post to Supabase
 */
export const saveBlogPostToSupabase = async (slug: string, post: BlogPost): Promise<void> => {
  try {
    const row = blogPostToRow(slug, post);
    
    const { error } = await supabase
      .from('blog_posts')
      .upsert(row, { onConflict: 'slug' });

    if (error) {
      throw error;
    }

    console.log('Saved blog post to Supabase:', slug);
  } catch (error) {
    console.error('Error saving blog post to Supabase:', error);
    throw error;
  }
};

/**
 * Delete a blog post from Supabase
 */
export const deleteBlogPostFromSupabase = async (slug: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('slug', slug);

    if (error) {
      throw error;
    }

    console.log('Deleted blog post from Supabase:', slug);
  } catch (error) {
    console.error('Error deleting blog post from Supabase:', error);
    throw error;
  }
};

/**
 * Migrate localStorage posts to Supabase
 */
export const migrateLocalStorageToSupabase = async (): Promise<void> => {
  try {
    console.log('Starting migration from localStorage to Supabase...');
    
    // Get posts from localStorage
    const localPosts = localStorage.getItem('unified_blog_posts');
    if (!localPosts) {
      console.log('No localStorage posts to migrate');
      return;
    }

    const posts: BlogPostsStore = JSON.parse(localPosts);
    
    // Save each post to Supabase
    for (const [slug, post] of Object.entries(posts)) {
      await saveBlogPostToSupabase(slug, post);
    }

    console.log('Migration completed successfully:', Object.keys(posts).length, 'posts migrated');
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
};

/**
 * Initialize Supabase storage with migration
 */
export const initializeSupabaseStorage = async (): Promise<void> => {
  try {
    // Check if we have existing posts in Supabase
    const existingPosts = await fetchBlogPostsFromSupabase();
    
    // If no posts exist, try to migrate from localStorage
    if (Object.keys(existingPosts).length === 0) {
      await migrateLocalStorageToSupabase();
    }
    
    console.log('Supabase storage initialized successfully');
  } catch (error) {
    console.error('Error initializing Supabase storage:', error);
    throw error;
  }
};
