
import { BlogPost } from "@/types";

// Define a type for our blog posts store with an index signature
export type BlogPostsStore = {
  [slug: string]: Omit<BlogPost, "slug">;
};

// Helper function to add slug to a post from the store
export const addSlugToPost = (slug: string, post: Omit<BlogPost, "slug">): BlogPost => {
  return {
    ...post,
    slug
  };
};
