
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
      featured: true,  // Mark as featured to ensure visibility
      // Add these image URLs for the blog post
      imageUrl: "/lovable-uploads/38137f5b-3d3e-4ccd-a77e-63481f021d09.png", // Mobile image
      desktopImageUrl: "/lovable-uploads/d5e3f45f-8a7d-4b07-bbb7-f08116f5abe0.png" // Desktop image
    }));
    
    // Ensure the agile backbone post has the most recent date to appear first
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('en-US', { month: 'long' })} ${currentDate.getFullYear()}`;
    
    agileBackbone.date = formattedDate;
    // Format Italian date (day month year)
    agileBackbone.dateIT = `${currentDate.getDate()} ${currentDate.toLocaleString('it-IT', { month: 'long' })} ${currentDate.getFullYear()}`;
    
    console.log("Agile backbone post prepared:", agileBackbone.title, "published:", agileBackbone.published);
    console.log("Blog post images:", agileBackbone.imageUrl, agileBackbone.desktopImageUrl);
    
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
