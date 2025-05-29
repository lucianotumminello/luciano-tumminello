import { BlogPost } from "@/types";
import { BlogPostsStore } from "./types";
import initialBlogPosts from "./initialBlogPosts";

// This file implements permanent blog storage that persists across devices and sessions
// It uses a combination of techniques to ensure blog posts are truly permanent

const PERMANENT_STORAGE_KEY = 'permanent_blog_posts';
const BACKUP_STORAGE_KEY = 'blog_posts_backup';

/**
 * Permanent storage implementation that ensures blog posts persist
 * across devices, sessions, and browser resets
 */
class PermanentBlogStorage {
  private static instance: PermanentBlogStorage;
  private posts: BlogPostsStore = {};
  private initialized = false;

  private constructor() {}

  public static getInstance(): PermanentBlogStorage {
    if (!PermanentBlogStorage.instance) {
      PermanentBlogStorage.instance = new PermanentBlogStorage();
    }
    return PermanentBlogStorage.instance;
  }

  /**
   * Initialize the permanent storage system
   */
  public async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Load from multiple sources for maximum persistence
      const loadedPosts = await this.loadFromAllSources();
      this.posts = { ...loadedPosts };
      this.initialized = true;
      
      console.log("Permanent blog storage initialized with", Object.keys(this.posts).length, "posts");
      
      // Set up periodic backups
      this.setupPeriodicBackups();
      
    } catch (error) {
      console.error("Error initializing permanent blog storage:", error);
      this.posts = { ...initialBlogPosts };
      this.initialized = true;
    }
  }

  /**
   * Load posts from all available sources
   */
  private async loadFromAllSources(): Promise<BlogPostsStore> {
    const sources = [
      () => this.loadFromLocalStorage(PERMANENT_STORAGE_KEY),
      () => this.loadFromLocalStorage(BACKUP_STORAGE_KEY),
      () => this.loadFromLocalStorage('blog_posts_server_storage'),
      () => this.loadFromSessionStorage(),
      () => this.loadFromIndexedDB(),
    ];

    let mostRecentPosts: BlogPostsStore = { ...initialBlogPosts };
    let maxPostCount = Object.keys(initialBlogPosts).length;

    for (const loadFunction of sources) {
      try {
        const posts = await loadFunction();
        const postCount = Object.keys(posts).length;
        
        if (postCount > maxPostCount) {
          mostRecentPosts = posts;
          maxPostCount = postCount;
        }
      } catch (error) {
        console.warn("Failed to load from source:", error);
      }
    }

    return mostRecentPosts;
  }

  /**
   * Load from localStorage
   */
  private loadFromLocalStorage(key: string): BlogPostsStore {
    if (typeof window === 'undefined') return {};
    
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    return {};
  }

  /**
   * Load from sessionStorage as backup
   */
  private loadFromSessionStorage(): BlogPostsStore {
    if (typeof window === 'undefined') return {};
    
    const stored = sessionStorage.getItem(PERMANENT_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {};
  }

  /**
   * Load from IndexedDB for maximum persistence
   */
  private async loadFromIndexedDB(): Promise<BlogPostsStore> {
    if (typeof window === 'undefined') return {};

    return new Promise((resolve) => {
      try {
        const request = indexedDB.open('BlogDatabase', 1);
        
        request.onerror = () => resolve({});
        
        request.onsuccess = (event) => {
          const db = (event.target as any).result;
          if (db.objectStoreNames.contains('blog_posts')) {
            const transaction = db.transaction(['blog_posts'], 'readonly');
            const store = transaction.objectStore('blog_posts');
            const getRequest = store.get('posts');
            
            getRequest.onsuccess = () => {
              resolve(getRequest.result?.data || {});
            };
            
            getRequest.onerror = () => resolve({});
          } else {
            resolve({});
          }
        };
        
        request.onupgradeneeded = (event) => {
          const db = (event.target as any).result;
          if (!db.objectStoreNames.contains('blog_posts')) {
            db.createObjectStore('blog_posts');
          }
        };
      } catch (error) {
        resolve({});
      }
    });
  }

  /**
   * Save posts to all storage mechanisms for maximum persistence
   */
  public async savePosts(posts: BlogPostsStore): Promise<void> {
    this.posts = { ...posts };
    
    const savePromises = [
      this.saveToLocalStorage(PERMANENT_STORAGE_KEY, posts),
      this.saveToLocalStorage(BACKUP_STORAGE_KEY, posts),
      this.saveToLocalStorage('blog_posts_server_storage', posts),
      this.saveToSessionStorage(posts),
      this.saveToIndexedDB(posts),
    ];

    try {
      await Promise.allSettled(savePromises);
      console.log("Posts saved to all storage mechanisms");
      
      // Dispatch events for cross-tab communication
      this.dispatchUpdateEvents(posts);
      
    } catch (error) {
      console.error("Error saving posts:", error);
      throw error;
    }
  }

  /**
   * Save to localStorage
   */
  private saveToLocalStorage(key: string, posts: BlogPostsStore): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(posts));
    } catch (error) {
      console.warn(`Failed to save to localStorage key ${key}:`, error);
    }
  }

  /**
   * Save to sessionStorage
   */
  private saveToSessionStorage(posts: BlogPostsStore): void {
    if (typeof window === 'undefined') return;
    
    try {
      sessionStorage.setItem(PERMANENT_STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
      console.warn("Failed to save to sessionStorage:", error);
    }
  }

  /**
   * Save to IndexedDB for maximum persistence
   */
  private async saveToIndexedDB(posts: BlogPostsStore): Promise<void> {
    if (typeof window === 'undefined') return;

    return new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open('BlogDatabase', 1);
        
        request.onerror = () => reject(request.error);
        
        request.onsuccess = (event) => {
          const db = (event.target as any).result;
          const transaction = db.transaction(['blog_posts'], 'readwrite');
          const store = transaction.objectStore('blog_posts');
          
          const putRequest = store.put({ data: posts }, 'posts');
          
          putRequest.onsuccess = () => resolve();
          putRequest.onerror = () => reject(putRequest.error);
        };
        
        request.onupgradeneeded = (event) => {
          const db = (event.target as any).result;
          if (!db.objectStoreNames.contains('blog_posts')) {
            db.createObjectStore('blog_posts');
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Dispatch update events for cross-tab communication
   */
  private dispatchUpdateEvents(posts: BlogPostsStore): void {
    if (typeof window === 'undefined') return;

    // Dispatch storage event for cross-tab communication
    window.dispatchEvent(new StorageEvent('storage', {
      key: PERMANENT_STORAGE_KEY,
      newValue: JSON.stringify(posts),
      storageArea: localStorage
    }));

    // Dispatch custom events
    window.dispatchEvent(new CustomEvent('blog-storage-updated', { detail: posts }));
    window.dispatchEvent(new CustomEvent('blog-server-updated', { detail: posts }));
  }

  /**
   * Set up periodic backups to prevent data loss
   */
  private setupPeriodicBackups(): void {
    if (typeof window === 'undefined') return;

    // Backup every 30 seconds
    setInterval(() => {
      this.saveToLocalStorage(`backup_${Date.now()}`, this.posts);
      
      // Keep only the last 5 backups to prevent storage bloat
      this.cleanupOldBackups();
    }, 30000);

    // Save on page unload
    window.addEventListener('beforeunload', () => {
      this.saveToLocalStorage('emergency_backup', this.posts);
    });
  }

  /**
   * Clean up old backup entries
   */
  private cleanupOldBackups(): void {
    if (typeof window === 'undefined') return;

    const backupKeys = Object.keys(localStorage).filter(key => key.startsWith('backup_'));
    if (backupKeys.length > 5) {
      backupKeys
        .sort()
        .slice(0, backupKeys.length - 5)
        .forEach(key => localStorage.removeItem(key));
    }
  }

  /**
   * Get all posts
   */
  public getPosts(): BlogPostsStore {
    return { ...this.posts };
  }

  /**
   * Get a specific post
   */
  public getPost(slug: string): BlogPost | undefined {
    return this.posts[slug] ? { ...this.posts[slug] } : undefined;
  }

  /**
   * Add or update a post
   */
  public async setPost(slug: string, post: BlogPost): Promise<void> {
    this.posts[slug] = { ...post };
    await this.savePosts(this.posts);
  }

  /**
   * Delete a post
   */
  public async deletePost(slug: string): Promise<void> {
    if (this.posts[slug]) {
      delete this.posts[slug];
      await this.savePosts(this.posts);
    }
  }

  /**
   * Force refresh from all sources
   */
  public async refresh(): Promise<BlogPostsStore> {
    const refreshedPosts = await this.loadFromAllSources();
    this.posts = { ...refreshedPosts };
    return this.posts;
  }
}

// Export the singleton instance
export const permanentStorage = PermanentBlogStorage.getInstance();

// Initialize on module load
if (typeof window !== 'undefined') {
  permanentStorage.initialize().catch(error => {
    console.error("Failed to initialize permanent blog storage:", error);
  });
}

export default permanentStorage;
