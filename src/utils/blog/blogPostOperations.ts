
import { BlogPost } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { invalidateBlogPostsCache } from './blogServerStorage';

/**
 * Creates a new blog post in Supabase
 * @param newPost The new blog post to create
 * @param slug The slug to use for the blog post
 * @returns A promise that resolves to a boolean indicating success
 */
export const createBlogPost = async (newPost: BlogPost, slug: string): Promise<boolean> => {
  try {
    console.log("Creating blog post in database:", slug);
    
    const { error } = await supabase
      .from('blog_posts')
      .insert({
        slug,
        title: newPost.title,
        title_it: newPost.titleIT,
        excerpt: newPost.excerpt,
        excerpt_it: newPost.excerptIT,
        content: newPost.content,
        content_it: newPost.contentIT,
        author: newPost.author,
        author_image_url: newPost.authorImageUrl,
        date: newPost.date,
        date_it: newPost.dateIT,
        category: newPost.category,
        category_it: newPost.categoryIT,
        image_url: newPost.imageUrl,
        desktop_image_url: newPost.desktopImageUrl,
        reading_time: newPost.readingTime,
        reading_time_it: newPost.readingTimeIT,
        tags: newPost.tags,
        tags_it: newPost.tagsIT,
        published: newPost.published !== false
      });
    
    if (error) {
      console.error("Error creating blog post:", error);
      return false;
    }
    
    // Invalidate cache to force refresh
    invalidateBlogPostsCache();
    
    console.log("Blog post created successfully");
    return true;
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
};

/**
 * Updates an existing blog post in Supabase
 * @param slug The slug of the blog post to update
 * @param updatedPost The updated blog post
 * @returns A promise that resolves to a boolean indicating success
 */
export const updateBlogPost = async (slug: string, updatedPost: BlogPost): Promise<boolean> => {
  try {
    console.log("Updating blog post in database:", slug);
    
    const { error } = await supabase
      .from('blog_posts')
      .update({
        title: updatedPost.title,
        title_it: updatedPost.titleIT,
        excerpt: updatedPost.excerpt,
        excerpt_it: updatedPost.excerptIT,
        content: updatedPost.content,
        content_it: updatedPost.contentIT,
        author: updatedPost.author,
        author_image_url: updatedPost.authorImageUrl,
        date: updatedPost.date,
        date_it: updatedPost.dateIT,
        category: updatedPost.category,
        category_it: updatedPost.categoryIT,
        image_url: updatedPost.imageUrl,
        desktop_image_url: updatedPost.desktopImageUrl,
        reading_time: updatedPost.readingTime,
        reading_time_it: updatedPost.readingTimeIT,
        tags: updatedPost.tags,
        tags_it: updatedPost.tagsIT,
        published: updatedPost.published !== undefined ? updatedPost.published : true
      })
      .eq('slug', slug);
    
    if (error) {
      console.error("Error updating blog post:", error);
      return false;
    }
    
    // Invalidate cache to force refresh
    invalidateBlogPostsCache();
    
    console.log("Blog post updated successfully");
    return true;
  } catch (error) {
    console.error(`Error updating blog post ${slug}:`, error);
    return false;
  }
};

/**
 * Deletes a blog post from Supabase
 * @param slug The slug of the blog post to delete
 * @returns A promise that resolves to a boolean indicating success
 */
export const deleteBlogPost = async (slug: string): Promise<boolean> => {
  try {
    console.log("Deleting blog post from database:", slug);
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('slug', slug);
    
    if (error) {
      console.error("Error deleting blog post:", error);
      return false;
    }
    
    // Invalidate cache to force refresh
    invalidateBlogPostsCache();
    
    console.log("Blog post deleted successfully");
    return true;
  } catch (error) {
    console.error(`Error deleting blog post ${slug}:`, error);
    return false;
  }
};

/**
 * Creates a duplicate of an existing blog post in Supabase
 * @param originalSlug The slug of the blog post to duplicate
 * @returns A promise that resolves to the duplicated post if successful, or null if failed
 */
export const duplicateBlogPost = async (originalSlug: string): Promise<BlogPost | null> => {
  try {
    console.log("Duplicating blog post from database:", originalSlug);
    
    // Fetch the original post
    const { data: originalData, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', originalSlug)
      .single();
    
    if (fetchError || !originalData) {
      console.error(`Blog post with slug ${originalSlug} not found.`);
      return null;
    }
    
    // Create a new slug with timestamp to ensure uniqueness
    const newSlug = `${originalSlug}-copy-${Date.now()}`;
    
    // Create the duplicate post
    const { data: newData, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        slug: newSlug,
        title: originalData.title,
        title_it: originalData.title_it,
        excerpt: originalData.excerpt,
        excerpt_it: originalData.excerpt_it,
        content: originalData.content,
        content_it: originalData.content_it,
        author: originalData.author,
        author_image_url: originalData.author_image_url,
        date: originalData.date,
        date_it: originalData.date_it,
        category: originalData.category,
        category_it: originalData.category_it,
        image_url: originalData.image_url,
        desktop_image_url: originalData.desktop_image_url,
        reading_time: originalData.reading_time,
        reading_time_it: originalData.reading_time_it,
        tags: originalData.tags,
        tags_it: originalData.tags_it,
        published: originalData.published
      })
      .select()
      .single();
    
    if (insertError || !newData) {
      console.error("Error creating duplicate post:", insertError);
      return null;
    }
    
    // Invalidate cache to force refresh
    invalidateBlogPostsCache();
    
    // Convert back to BlogPost format
    const newPost: BlogPost = {
      title: newData.title,
      titleIT: newData.title_it,
      excerpt: newData.excerpt,
      excerptIT: newData.excerpt_it,
      content: newData.content,
      contentIT: newData.content_it,
      author: newData.author,
      authorImageUrl: newData.author_image_url,
      date: newData.date,
      dateIT: newData.date_it,
      category: newData.category,
      categoryIT: newData.category_it,
      imageUrl: newData.image_url,
      desktopImageUrl: newData.desktop_image_url,
      readingTime: newData.reading_time,
      readingTimeIT: newData.reading_time_it,
      tags: newData.tags || [],
      tagsIT: newData.tags_it || [],
      published: newData.published,
      slug: newData.slug
    };
    
    console.log("Blog post duplicated successfully");
    return newPost;
  } catch (error) {
    console.error(`Error duplicating blog post ${originalSlug}:`, error);
    return null;
  }
};

/**
 * Makes a blog post permanent with a clean URL in Supabase
 * @param temporarySlug The original/temporary slug
 * @param permanentSlug The new permanent slug
 * @param published Optional flag to explicitly set published status (defaults to true)
 * @returns A promise that resolves to a boolean indicating success
 */
export const makeBlogPostPermanent = async (
  temporarySlug: string, 
  permanentSlug: string,
  published: boolean = true
): Promise<boolean> => {
  try {
    console.log(`Making blog post permanent: ${temporarySlug} -> ${permanentSlug}`);
    
    // Check if the original blog post exists
    const { data: originalData, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', temporarySlug)
      .single();
    
    if (fetchError || !originalData) {
      console.error(`Blog post with slug ${temporarySlug} not found.`);
      return false;
    }
    
    // Check if the permanent slug already exists
    const { data: existingData } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('slug', permanentSlug)
      .single();
    
    if (existingData) {
      console.log(`Permanent post ${permanentSlug} already exists, updating published status`);
      
      // Update published status
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ published })
        .eq('slug', permanentSlug);
      
      if (updateError) {
        console.error("Error updating published status:", updateError);
        return false;
      }
      
      // Invalidate cache
      invalidateBlogPostsCache();
      return true;
    }
    
    // Create a new post with the permanent slug
    const { error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        slug: permanentSlug,
        title: originalData.title,
        title_it: originalData.title_it,
        excerpt: originalData.excerpt,
        excerpt_it: originalData.excerpt_it,
        content: originalData.content,
        content_it: originalData.content_it,
        author: originalData.author,
        author_image_url: originalData.author_image_url,
        date: originalData.date,
        date_it: originalData.date_it,
        category: originalData.category,
        category_it: originalData.category_it,
        image_url: originalData.image_url,
        desktop_image_url: originalData.desktop_image_url,
        reading_time: originalData.reading_time,
        reading_time_it: originalData.reading_time_it,
        tags: originalData.tags,
        tags_it: originalData.tags_it,
        published: published
      });
    
    if (insertError) {
      console.error("Error creating permanent post:", insertError);
      return false;
    }
    
    // Invalidate cache
    invalidateBlogPostsCache();
    
    console.log(`Blog post made permanent successfully`);
    return true;
  } catch (error) {
    console.error(`Error making blog post permanent:`, error);
    return false;
  }
};
