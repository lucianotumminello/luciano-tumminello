
import { BlogPostsStore } from "./types";
import initialBlogPosts from "./initialBlogPosts";

// In-memory data store that will be updated during the session
let updatedBlogPosts: BlogPostsStore = initialBlogPosts;

export { updatedBlogPosts };
