
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
    
    // Set the new images for desktop and mobile
    agileBackbone.desktopImageUrl = "/lovable-uploads/cabc3c79-ffbe-47d3-9df8-d239c623489c.png";
    agileBackbone.imageUrl = "/lovable-uploads/ff27eefe-310f-4f6c-98ec-5c57cbc05b5c.png";
    
    console.log("Agile backbone post prepared:", agileBackbone.title, "published:", agileBackbone.published);
    console.log("Image URLs set - Desktop:", agileBackbone.desktopImageUrl, "Mobile:", agileBackbone.imageUrl);
    
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
