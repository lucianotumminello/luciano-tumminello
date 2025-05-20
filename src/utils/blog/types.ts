
import { BlogPost } from "@/types";

// Define a type for our blog posts store with an index signature
export type BlogPostsStore = {
  [slug: string]: Omit<BlogPost, "slug">;
};
