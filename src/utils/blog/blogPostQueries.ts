
import { updatedBlogPosts, refreshBlogPosts } from "./blogPostsStore";
import { BlogPostsStore } from "./types";

/**
 * Gets all blog posts from the server
 * @returns All blog posts
 */
export const getAllBlogPosts = async (): Promise<BlogPostsStore> => {
  try {
    // First, refresh the blog posts from the server to ensure we have the latest data
    await refreshBlogPosts();
    
    // Log the current state of the blog posts
    console.log("Getting all blog posts, count:", Object.keys(updatedBlogPosts).length);
    console.log("Available blog post slugs:", Object.keys(updatedBlogPosts).join(", "));
    
    // Add additional logging for debugging
    Object.entries(updatedBlogPosts).forEach(([slug, post]) => {
      console.log(`Post ${slug}: title=${post.title}, published=${post.published !== false}, featured=${post.featured || false}`);
    });
    
    // Check if we have the agile backbone post, if not, force a re-initialization
    if (!updatedBlogPosts['agile-backbone-resilient-operational-models']) {
      console.warn("Agile backbone post not found in store, forcing re-initialization");
      await refreshBlogPosts(true); // Force refresh
      
      // If still not found after refresh, import directly from data source
      if (!updatedBlogPosts['agile-backbone-resilient-operational-models']) {
        console.warn("Agile backbone still not found after refresh, importing directly");
        const { getBlogPosts } = await import('@/data/blogList');
        const dataPosts = await getBlogPosts();
        
        // Merge with existing posts
        Object.entries(dataPosts).forEach(([slug, post]) => {
          updatedBlogPosts[slug] = post;
        });
      }
    }
    
    return { ...updatedBlogPosts };
  } catch (error) {
    console.error("Error getting all blog posts:", error);
    return { ...updatedBlogPosts };
  }
};

/**
 * Gets a specific blog post
 * @param slug The slug of the blog post
 * @returns The blog post or undefined if not found
 */
export const getBlogPost = async (slug: string): Promise<(Omit<import('@/types').BlogPost, "slug"> | undefined)> => {
  try {
    // First, refresh the blog posts from the server to ensure we have the latest data
    await refreshBlogPosts();
    
    // If the requested slug is for agile backbone but not found, import directly
    if (slug === 'agile-backbone-resilient-operational-models' && !updatedBlogPosts[slug]) {
      console.warn("Agile backbone post requested but not found, importing directly");
      const { getBlogPosts } = await import('@/data/blogList');
      const dataPosts = await getBlogPosts();
      
      if (dataPosts[slug]) {
        updatedBlogPosts[slug] = dataPosts[slug];
      }
    }
    
    console.log(`Getting blog post with slug ${slug}, exists: ${!!updatedBlogPosts[slug]}`);
    return updatedBlogPosts[slug] ? { ...updatedBlogPosts[slug] } : undefined;
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    return updatedBlogPosts[slug] ? { ...updatedBlogPosts[slug] } : undefined;
  }
};
