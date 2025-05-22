
import { BlogPost } from "@/types";

// Convert Decap CMS data format to our application's BlogPost format
export const adaptDecapPostToBlogPost = (decapPost: any): BlogPost => {
  return {
    title: decapPost.title || "",
    titleIT: decapPost.titleIT || "",
    excerpt: decapPost.excerpt || "",
    excerptIT: decapPost.excerptIT || "",
    content: decapPost.content || "",
    contentIT: decapPost.contentIT || "",
    author: decapPost.author || "Luciano Tumminello",
    authorImageUrl: decapPost.authorImageUrl || "/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png",
    date: decapPost.date || new Date().toISOString(),
    dateIT: decapPost.dateIT || "",
    category: decapPost.category || "",
    categoryIT: decapPost.categoryIT || "",
    imageUrl: decapPost.imageUrl || "",
    desktopImageUrl: decapPost.desktopImageUrl || "",
    readingTime: decapPost.readingTime || "5 min read",
    readingTimeIT: decapPost.readingTimeIT || "5 min di lettura",
    tags: decapPost.tags || [],
    tagsIT: decapPost.tagsIT || [],
    published: decapPost.published !== false,
  };
};

// Generate a slug from a title
export const generateSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// This function would fetch posts from the CMS content directory
export const fetchPostsFromCMS = async (): Promise<Record<string, BlogPost>> => {
  // In a real implementation, this would fetch from your API or content files
  // For now, we'll return an empty object as posts will be loaded from the CMS
  return {};
};
