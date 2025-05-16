
import { makeBlogPostPermanent, createBlogPost } from "./blogPostOperations";
import { refreshBlogPosts } from "./blogPostsStore";
import { BlogPost } from "@/types";

/**
 * This utility function makes the "Beyond Pattern Recognition" blog post permanent
 * with a clean, permanent URL
 */
export const makeBeyondRecognitionPermanent = async (): Promise<void> => {
  try {
    // First refresh all blog posts from storage to ensure we have the latest data
    await refreshBlogPosts();
    
    // The current temporary URL slug
    const temporarySlug = "beyond-pattern-recognition-copy-1747394357064";
    
    // The new permanent slug to use (changed to avoid any conflict)
    const permanentSlug = "beyond-pattern-recognition-ai-revolution";
    
    // Make the blog post permanent with published flag explicitly set to true
    const result = await makeBlogPostPermanent(temporarySlug, permanentSlug, true);
    
    if (result) {
      console.log("Successfully created permanent blog post:", permanentSlug);
      console.log("The original post at", temporarySlug, "is still available");
    } else {
      console.error("Failed to create permanent blog post");
    }

    // Also create "Human + Tech Equation" post
    await createHumanTechPost();
  } catch (error) {
    console.error("Error making blog posts permanent:", error);
  }
};

/**
 * Creates the "Human + Tech Equation" blog post
 */
const createHumanTechPost = async (): Promise<void> => {
  try {
    const slug = "human-tech-equation-workforce-digital-transformation";
    
    // Create a placeholder blog post
    const newPost: BlogPost = {
      title: "The Human + Tech Equation: Empowering Your Workforce in the Digital Transformation Era",
      titleIT: "L'Equazione Umano + Tecnologia: Potenziare la Forza Lavoro nell'Era della Trasformazione Digitale",
      excerpt: "[Excerpt to be added]",
      excerptIT: "[Estratto da aggiungere]",
      content: "<p>Content will be added soon...</p>",
      contentIT: "<p>Il contenuto sarà aggiunto presto...</p>",
      author: "Luciano Tumminello",
      authorImageUrl: "/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png",
      date: "16 May 2025",
      dateIT: "16 Maggio 2025",
      category: "Digital Transformation",
      categoryIT: "Trasformazione Digitale",
      imageUrl: "/lovable-uploads/c84f0533-b497-45d8-926e-110ef0c411b9.png", // Mobile image
      desktopImageUrl: "/lovable-uploads/d8fa4965-641b-4df1-a21e-5096de4d4756.png", // Desktop image
      readingTime: "5 min read",
      readingTimeIT: "5 min di lettura",
      tags: ["Digital Transformation", "Workforce", "Technology", "AI"],
      tagsIT: ["Trasformazione Digitale", "Forza Lavoro", "Tecnologia", "IA"],
      published: true
    };
    
    // Create the blog post
    const success = await createBlogPost(newPost, slug);
    
    if (success) {
      console.log("Successfully created Human + Tech Equation blog post:", slug);
    } else {
      console.error("Failed to create Human + Tech Equation blog post");
    }
  } catch (error) {
    console.error("Error creating Human + Tech Equation blog post:", error);
  }
};

// Execute this function immediately when imported
makeBeyondRecognitionPermanent();
