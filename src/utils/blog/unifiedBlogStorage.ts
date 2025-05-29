
import { BlogPost } from '@/types';
import { BlogPostsStore } from './types';
import initialBlogPosts from './initialBlogPosts';

// Unified storage key for all blog posts
const UNIFIED_STORAGE_KEY = 'unified_blog_posts';
const BACKUP_STORAGE_KEY = 'unified_blog_posts_backup';

/**
 * Unified blog storage that combines Lovable-created posts with CMS/Content Editor posts
 * All posts are treated equally regardless of creation method
 */
class UnifiedBlogStorage {
  private static instance: UnifiedBlogStorage;
  private allPosts: BlogPostsStore = {};
  private initialized = false;

  private constructor() {}

  public static getInstance(): UnifiedBlogStorage {
    if (!UnifiedBlogStorage.instance) {
      UnifiedBlogStorage.instance = new UnifiedBlogStorage();
    }
    return UnifiedBlogStorage.instance;
  }

  /**
   * Initialize the unified storage system
   */
  public async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Start with Lovable-created posts as the base
      this.allPosts = { ...initialBlogPosts };
      
      // Load any additional posts from storage (CMS/Content Editor created)
      const storedPosts = this.loadFromStorage();
      
      // Merge stored posts with initial posts
      // Stored posts take precedence if there are conflicts (same slug)
      this.allPosts = { ...this.allPosts, ...storedPosts };
      
      // Save the unified collection back to storage
      await this.saveToStorage(this.allPosts);
      
      this.initialized = true;
      console.log("Unified blog storage initialized with", Object.keys(this.allPosts).length, "posts");
      
    } catch (error) {
      console.error("Error initializing unified blog storage:", error);
      this.allPosts = { ...initialBlogPosts };
      this.initialized = true;
    }
  }

  /**
   * Load posts from storage
   */
  private loadFromStorage(): BlogPostsStore {
    if (typeof window === 'undefined') return {};
    
    try {
      // Try main storage first
      const stored = localStorage.getItem(UNIFIED_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      
      // Try backup storage
      const backup = localStorage.getItem(BACKUP_STORAGE_KEY);
      if (backup) {
        return JSON.parse(backup);
      }
      
      return {};
    } catch (error) {
      console.error("Error loading from storage:", error);
      return {};
    }
  }

  /**
   * Save posts to storage with backup
   */
  private async saveToStorage(posts: BlogPostsStore): Promise<void> {
    if (typeof window === 'undefined') return;
    
    try {
      const postsJson = JSON.stringify(posts);
      
      // Save to main storage
      localStorage.setItem(UNIFIED_STORAGE_KEY, postsJson);
      
      // Save backup
      localStorage.setItem(BACKUP_STORAGE_KEY, postsJson);
      
      // Also save to sessionStorage as additional backup
      sessionStorage.setItem(UNIFIED_STORAGE_KEY, postsJson);
      
      // Dispatch events for cross-tab communication
      this.dispatchStorageEvents(posts);
      
    } catch (error) {
      console.error("Error saving to storage:", error);
      throw error;
    }
  }

  /**
   * Dispatch storage events for cross-tab communication
   */
  private dispatchStorageEvents(posts: BlogPostsStore): void {
    if (typeof window === 'undefined') return;

    // Dispatch storage event
    window.dispatchEvent(new StorageEvent('storage', {
      key: UNIFIED_STORAGE_KEY,
      newValue: JSON.stringify(posts),
      storageArea: localStorage
    }));

    // Dispatch custom events
    window.dispatchEvent(new CustomEvent('blog-storage-updated', { detail: posts }));
    window.dispatchEvent(new CustomEvent('blog-server-updated', { detail: posts }));
  }

  /**
   * Get all posts (both Lovable-created and CMS/Content Editor created)
   */
  public getAllPosts(): BlogPostsStore {
    return { ...this.allPosts };
  }

  /**
   * Get a specific post
   */
  public getPost(slug: string): BlogPost | undefined {
    return this.allPosts[slug] ? { ...this.allPosts[slug] } : undefined;
  }

  /**
   * Add or update a post (works for both creation methods)
   */
  public async setPost(slug: string, post: BlogPost): Promise<void> {
    this.allPosts[slug] = { ...post };
    await this.saveToStorage(this.allPosts);
  }

  /**
   * Delete a post
   */
  public async deletePost(slug: string): Promise<void> {
    if (this.allPosts[slug]) {
      delete this.allPosts[slug];
      await this.saveToStorage(this.allPosts);
    }
  }

  /**
   * Force refresh from storage and re-merge with initial posts
   */
  public async refresh(): Promise<BlogPostsStore> {
    // Reload from storage
    const storedPosts = this.loadFromStorage();
    
    // Re-merge with initial posts
    this.allPosts = { ...initialBlogPosts, ...storedPosts };
    
    // Save the merged result
    await this.saveToStorage(this.allPosts);
    
    return this.getAllPosts();
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
  public getCMSCreatedPosts(): BlogPostsStore {
    const cmsPosts: BlogPostsStore = {};
    
    Object.entries(this.allPosts).forEach(([slug, post]) => {
      if (!this.isLovableCreated(slug)) {
        cmsPosts[slug] = post;
      }
    });
    
    return cmsPosts;
  }
}

// Export the singleton instance
export const unifiedStorage = UnifiedBlogStorage.getInstance();

// Initialize on module load
if (typeof window !== 'undefined') {
  unifiedStorage.initialize().catch(error => {
    console.error("Failed to initialize unified blog storage:", error);
  });
}

export default unifiedStorage;
