
import { BlogPost } from '@/types';
import { BlogPostsStore } from './types';
import initialBlogPosts from './initialBlogPosts';
import { 
  fetchBlogPostsFromSupabase, 
  saveBlogPostToSupabase, 
  deleteBlogPostFromSupabase,
  initializeSupabaseStorage
} from './supabaseBlogStorage';

/**
 * Supabase-backed unified blog storage that provides true cross-device permanence
 */
class SupabaseUnifiedBlogStorage {
  private static instance: SupabaseUnifiedBlogStorage;
  private initialized = false;

  private constructor() {}

  public static getInstance(): SupabaseUnifiedBlogStorage {
    if (!SupabaseUnifiedBlogStorage.instance) {
      SupabaseUnifiedBlogStorage.instance = new SupabaseUnifiedBlogStorage();
    }
    return SupabaseUnifiedBlogStorage.instance;
  }

  /**
   * Initialize the Supabase storage system
   */
  public async initialize(): Promise<void> => {
    if (this.initialized) return;

    try {
      console.log('Initializing Supabase unified storage...');
      
      // Initialize Supabase storage (with migration if needed)
      await initializeSupabaseStorage();
      
      // Ensure all initial posts exist in Supabase
      await this.ensureInitialPostsExist();
      
      this.initialized = true;
      console.log('Supabase unified storage initialized successfully');
      
    } catch (error) {
      console.error('Error initializing Supabase unified storage:', error);
      throw error;
    }
  }

  /**
   * Ensure all initial Lovable posts exist in Supabase
   */
  private async ensureInitialPostsExist(): Promise<void> {
    try {
      const existingPosts = await fetchBlogPostsFromSupabase();
      
      // Check each initial post and add if missing
      for (const [slug, post] of Object.entries(initialBlogPosts)) {
        if (!existingPosts[slug]) {
          console.log('Adding missing initial post to Supabase:', slug);
          await saveBlogPostToSupabase(slug, post);
        }
      }
    } catch (error) {
      console.error('Error ensuring initial posts exist:', error);
      throw error;
    }
  }

  /**
   * Get all posts from Supabase
   */
  public async getAllPosts(): Promise<BlogPostsStore> {
    await this.initialize();
    return await fetchBlogPostsFromSupabase();
  }

  /**
   * Get a specific post from Supabase
   */
  public async getPost(slug: string): Promise<BlogPost | undefined> {
    await this.initialize();
    const posts = await fetchBlogPostsFromSupabase();
    return posts[slug] ? { ...posts[slug] } : undefined;
  }

  /**
   * Add or update a post in Supabase
   */
  public async setPost(slug: string, post: BlogPost): Promise<void> {
    await this.initialize();
    await saveBlogPostToSupabase(slug, post);
  }

  /**
   * Delete a post from Supabase
   */
  public async deletePost(slug: string): Promise<void> {
    await this.initialize();
    await deleteBlogPostFromSupabase(slug);
  }

  /**
   * Force refresh from Supabase
   */
  public async refresh(): Promise<BlogPostsStore> {
    return await fetchBlogPostsFromSupabase();
  }

  /**
   * Check if a post was created with Lovable (exists in initial posts)
   */
  public isLovableCreated(slug: string): boolean {
    return slug in initialBlogPosts;
  }

  /**
   * Get only CMS/Content Editor created posts
   */
  public async getCMSCreatedPosts(): Promise<BlogPostsStore> {
    const allPosts = await this.getAllPosts();
    const cmsPosts: BlogPostsStore = {};
    
    Object.entries(allPosts).forEach(([slug, post]) => {
      if (!this.isLovableCreated(slug)) {
        cmsPosts[slug] = post;
      }
    });
    
    return cmsPosts;
  }
}

// Export the singleton instance
export const supabaseUnifiedStorage = SupabaseUnifiedBlogStorage.getInstance();

export default supabaseUnifiedStorage;
