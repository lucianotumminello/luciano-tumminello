
import { BlogPostsStore } from './types';
import { 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost,
  duplicateBlogPost, 
  getAllBlogPosts, 
  getBlogPost 
} from './blogPostQueries';
import { mockApiReset } from './mockApi';

// Run this function from the browser console to test the blog system
export const testBlogSystem = async () => {
  console.log("======= BLOG SYSTEM TEST =======");
  
  // Reset the mock API to ensure we start with clean data
  mockApiReset();
  
  // Step 1: Get all posts
  console.log("Step 1: Get all posts");
  const allPosts = await getAllBlogPosts();
  console.log(`- Found ${Object.keys(allPosts).length} posts`);
  
  // Step 2: Create a new post
  console.log("Step 2: Create a new post");
  const newPost = {
    slug: "test-post",
    title: "Test Post",
    titleIT: "Post di Prova",
    excerpt: "This is a test post",
    excerptIT: "Questo è un post di prova",
    content: "<p>This is the content of the test post</p>",
    contentIT: "<p>Questo è il contenuto del post di prova</p>",
    author: "Test Author",
    authorImageUrl: "/placeholder.svg",
    date: "1 May 2025",
    dateIT: "1 Maggio 2025",
    category: "Test",
    categoryIT: "Prova",
    imageUrl: "/placeholder.svg",
    desktopImageUrl: "/placeholder.svg",
    readingTime: "1 min read",
    readingTimeIT: "1 min di lettura",
    tags: ["test", "blog"],
    tagsIT: ["prova", "blog"]
  };
  
  await createBlogPost("test-post", newPost);
  
  // Step 3: Get the created post
  console.log("Step 3: Get the created post");
  const createdPost = await getBlogPost("test-post");
  console.log("- Created post:", createdPost ? "Found" : "Not found");
  
  // Step 4: Update the post
  console.log("Step 4: Update the post");
  await updateBlogPost("test-post", {
    ...newPost,
    title: "Updated Test Post",
    titleIT: "Post di Prova Aggiornato"
  });
  
  // Step 5: Get the updated post
  console.log("Step 5: Get the updated post");
  const updatedPost = await getBlogPost("test-post");
  console.log(`- Updated post title: ${updatedPost?.title}`);
  
  // Step 6: Duplicate the post
  console.log("Step 6: Duplicate the post");
  const duplicatedPost = await duplicateBlogPost("test-post", "duplicated-test-post");
  console.log(`- Duplicated post title: ${duplicatedPost?.title}`);
  
  // Step 7: Delete the post
  console.log("Step 7: Delete the original post");
  await deleteBlogPost("test-post");
  
  // Step 8: Check if the post was deleted
  console.log("Step 8: Check if the post was deleted");
  const deletedPost = await getBlogPost("test-post");
  console.log("- Deleted post:", deletedPost ? "Still exists" : "Successfully deleted");
  
  // Step 9: Get all posts again to verify our changes
  console.log("Step 9: Get all posts again");
  const finalPosts = await getAllBlogPosts();
  console.log(`- Final post count: ${Object.keys(finalPosts).length}`);
  
  console.log("======= TEST COMPLETED =======");
  return {
    success: true,
    postsCount: Object.keys(finalPosts).length,
    duplicatedPostExists: await getBlogPost("duplicated-test-post") !== undefined
  };
};

// Run this function from the browser console to see if a different tab/window can see the posts
export const verifyBlogPostsVisible = async () => {
  const posts = await getAllBlogPosts();
  return {
    postsCount: Object.keys(posts).length,
    posts: Object.keys(posts).map(slug => ({
      slug,
      title: posts[slug].title
    }))
  };
};
