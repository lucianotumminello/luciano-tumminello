
// This file ensures the "Beyond Recognition" blog post is permanently available

import { getAllBlogPosts, getBlogPost } from './blogPostQueries';
import { saveBlogPostsToStorage, refreshBlogPosts } from './blogPostsStore';
import beyondRecognitionPost from './initialBlogPosts/beyondRecognitionPost';
import { BlogPost } from '@/types';

// Function to ensure the Beyond Recognition post is always available
const ensureBeyondRecognitionPostExists = async () => {
  try {
    const allPosts = await getAllBlogPosts();
    const beyondRecognitionSlug = "beyond-recognition-future-digital-identity-authentication";
    const beyondRecognitionExists = Object.keys(allPosts).includes(beyondRecognitionSlug);
    
    if (!beyondRecognitionExists) {
      console.log('Ensuring Beyond Recognition post is available');
      
      // Create a new object with the existing posts
      const updatedPosts = { ...allPosts };
      
      // Add the Beyond Recognition post with its slug as the key
      const { slug, ...postWithoutSlug } = beyondRecognitionPost;
      updatedPosts[beyondRecognitionSlug] = postWithoutSlug;
      
      await saveBlogPostsToStorage(updatedPosts);
      await refreshBlogPosts();
    }
  } catch (error) {
    console.error('Error ensuring Beyond Recognition post exists:', error);
  }
};

// Initialize when this module is imported
ensureBeyondRecognitionPostExists();

export default ensureBeyondRecognitionPostExists;
