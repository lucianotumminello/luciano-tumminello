import { BlogPostsStore } from './types';
import { 
  getAllBlogPosts, 
  getBlogPost 
} from './blogPostQueries';
import { 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost,
  duplicateBlogPost
} from './blogPostOperations';
import { unifiedStorage } from './unifiedBlogStorage';
import { BlogPost } from '@/types';

// Run this function from the browser console to test the blog system
export const runBlogTests = async () => {
  console.log("Running unified blog system tests...");
  
  try {
    console.log("1. Initializing unified storage");
    await unifiedStorage.initialize();
    
    console.log("2. Getting all blog posts");
    const initialPosts = await getAllBlogPosts();
    console.log("Initial posts count:", Object.keys(initialPosts).length);
    
    console.log("3. Creating a test blog post");
    const testPost: BlogPost = {
      title: "Test Post",
      titleIT: "Post di Test",
      excerpt: "This is a test post",
      excerptIT: "Questo è un post di test",
      content: "<p>Test content</p>",
      contentIT: "<p>Contenuto di test</p>",
      author: "Test Author",
      authorImageUrl: "/test-image.jpg",
      date: "15 May 2023",
      dateIT: "15 Maggio 2023",
      category: "Test",
      categoryIT: "Test",
      imageUrl: "/test-image.jpg",
      desktopImageUrl: "/test-desktop-image.jpg",
      readingTime: "1 min read",
      readingTimeIT: "1 min di lettura",
      tags: ["test"],
      tagsIT: ["test"]
    };
    
    const testSlug = "test-post-" + Date.now();
    const createResult = await createBlogPost(testPost, testSlug);
    console.log("Create result:", createResult);
    
    console.log("4. Verifying post was created");
    const postsAfterCreate = await getAllBlogPosts();
    console.log("Posts after create:", Object.keys(postsAfterCreate).length);
    console.log("Test post exists:", testSlug in postsAfterCreate);
    
    console.log("5. Getting the created post");
    const retrievedPost = await getBlogPost(testSlug);
    console.log("Retrieved post title:", retrievedPost?.title);
    
    console.log("6. Updating the test post");
    const updatedPost = { ...testPost, title: "Updated Test Title" };
    const updateResult = await updateBlogPost(testSlug, updatedPost);
    console.log("Update result:", updateResult);
    
    console.log("7. Verifying post was updated");
    const updatedRetrievedPost = await getBlogPost(testSlug);
    console.log("Updated post title:", updatedRetrievedPost?.title);
    
    console.log("8. Testing post duplication");
    const duplicatedPost = await duplicateBlogPost(testSlug);
    console.log("Duplication successful:", !!duplicatedPost);
    
    console.log("9. Checking if original post is Lovable-created");
    console.log("Is test post Lovable-created:", unifiedStorage.isLovableCreated(testSlug));
    
    console.log("10. Getting CMS-created posts only");
    const cmsOnlyPosts = unifiedStorage.getCMSCreatedPosts();
    console.log("CMS-created posts count:", Object.keys(cmsOnlyPosts).length);
    
    console.log("11. Cleaning up test posts");
    await deleteBlogPost(testSlug);
    if (duplicatedPost && duplicatedPost.slug) {
      await deleteBlogPost(duplicatedPost.slug);
    }
    
    console.log("12. Final verification");
    const finalPosts = await getAllBlogPosts();
    console.log("Final posts count:", Object.keys(finalPosts).length);
    
    console.log("✅ All unified blog system tests completed successfully!");
    
  } catch (error) {
    console.error("❌ Blog system test failed:", error);
  }
};

// Auto-run tests in development
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  console.log("Unified blog system tests available. Run runBlogTests() to test.");
}

// Export this function to make it available in the browser console
(window as any).runBlogTests = runBlogTests;
