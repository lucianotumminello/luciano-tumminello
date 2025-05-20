
// This file ensures the "Beyond Recognition" blog post is permanently available

import { getAllBlogPosts, getBlogPost } from './blogPostQueries';
import { saveBlogPostsToStorage, refreshBlogPosts } from './blogPostsStore';
import beyondRecognitionPost from './initialBlogPosts/beyondRecognitionPost';

// Function to ensure the Beyond Recognition post is always available
const ensureBeyondRecognitionPostExists = async () => {
  try {
    const allPosts = await getAllBlogPosts();
    const beyondRecognitionExists = allPosts.some(post => post.id === 'beyond-recognition');
    
    if (!beyondRecognitionExists) {
      console.log('Ensuring Beyond Recognition post is available');
      const updatedPosts = [beyondRecognitionPost, ...allPosts];
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
