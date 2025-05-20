
import { BlogPost } from "@/types";

export const getBlogPosts = async (): Promise<Record<string, BlogPost>> => {
  try {
    console.log("Getting blog posts from data source");
    
    // In a real app, this would fetch from a database or API
    // Import the blog post data
    const agileBackbone = await import('./blogs/agile-backbone.json').then(m => ({
      slug: 'agile-backbone-resilient-operational-models',
      ...m.default,
      published: true, // Explicitly set published to true
      featured: true   // Mark as featured to ensure visibility
    }));
    
    // Ensure the agile backbone post has the most recent date to appear first
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('en-US', { month: 'long' })} ${currentDate.getFullYear()}`;
    
    agileBackbone.date = formattedDate;
    // Format Italian date (day month year)
    agileBackbone.dateIT = `${currentDate.getDate()} ${currentDate.toLocaleString('it-IT', { month: 'long' })} ${currentDate.getFullYear()}`;
    
    // Update image URLs to use the newly uploaded images
    agileBackbone.imageUrl = "/lovable-uploads/774dee17-e52b-4ce1-aedc-5467f7d73e4e.png";
    agileBackbone.desktopImageUrl = "/lovable-uploads/b54e2da2-5be2-4293-a2ba-77f343e1c1ad.png";
    
    console.log("Agile backbone post prepared:", agileBackbone.title, "published:", agileBackbone.published);
    
    // Return all posts with agile backbone guaranteed to be included
    return {
      'agile-backbone-resilient-operational-models': agileBackbone as BlogPost,
      // Add other posts here as needed
    };
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return {};
  }
};
