
import { BlogPost } from "@/types";

// Define a type for our blog posts store with an index signature
export type BlogPostsStore = {
  [slug: string]: Omit<BlogPost, "slug">;
};

// For use with arrays of blog posts
export type BlogPostWithId = BlogPost & { id?: string };
