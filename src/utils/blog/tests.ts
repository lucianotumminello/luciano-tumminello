
import { createBlogPost, getAllBlogPosts, getBlogPost, refreshBlogPosts } from './index';
import { BlogPost } from '@/types';

/**
 * Tests the blog post persistence functionality
 * @returns A test report
 */
export const testBlogPersistence = (): string => {
  console.log("Running blog persistence test...");
  
  try {
    // Get the initial count of blog posts
    const initialPosts = getAllBlogPosts();
    const initialCount = Object.keys(initialPosts).length;
    console.log(`Initial blog post count: ${initialCount}`);
    
    // Create a test blog post
    const testSlug = `test-post-${Date.now()}`;
    const testPost: BlogPost = {
      slug: testSlug,
      title: "Test Post",
      titleIT: "Post di Test",
      excerpt: "This is a test post",
      excerptIT: "Questo è un post di test",
      content: "<p>Test content</p>",
      contentIT: "<p>Contenuto di test</p>",
      author: "Test Author",
      authorImageUrl: "/test-image.png",
      date: "1 January 2025",
      dateIT: "1 Gennaio 2025",
      category: "Test",
      categoryIT: "Test",
      imageUrl: "/test-image.png",
      desktopImageUrl: "/test-image.png",
      readingTime: "1 min read",
      readingTimeIT: "1 min di lettura",
      tags: ["test"],
      tagsIT: ["test"],
      published: true
    };
    
    // Create the test post
    createBlogPost(testSlug, testPost);
    console.log(`Created test post with slug: ${testSlug}`);
    
    // Force refresh from localStorage
    refreshBlogPosts();
    
    // Check if the post exists
    const retrievedPost = getBlogPost(testSlug);
    if (!retrievedPost) {
      return "❌ Test FAILED: Post was not retrieved after creation";
    }
    
    // Get all posts and check the count
    const updatedPosts = getAllBlogPosts();
    const updatedCount = Object.keys(updatedPosts).length;
    console.log(`Updated blog post count: ${updatedCount}`);
    
    if (updatedCount !== initialCount + 1) {
      return `❌ Test FAILED: Expected ${initialCount + 1} posts, but got ${updatedCount}`;
    }
    
    // Check localStorage directly
    const localStorageContent = localStorage.getItem("luciano_tumminello_blog_posts");
    if (!localStorageContent) {
      return "❌ Test FAILED: No blog posts found in localStorage";
    }
    
    const localStoragePosts = JSON.parse(localStorageContent);
    if (!localStoragePosts[testSlug]) {
      return "❌ Test FAILED: Test post not found in localStorage";
    }
    
    // All tests passed!
    return `✅ Test PASSED: Blog post persistence is working correctly!
    • Initial post count: ${initialCount}
    • Final post count: ${updatedCount}
    • Test post created and retrieved successfully
    • LocalStorage contains the test post
    
    The blog post persistence system is working as expected. Blog posts will now
    be permanently stored in the browser's localStorage and will persist across
    page refreshes and browser sessions.`;
  } catch (error) {
    console.error("Test error:", error);
    return `❌ Test FAILED with error: ${error}`;
  }
};
