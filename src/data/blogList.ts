
import { BlogPost } from "@/types";

export const getBlogPosts = async (): Promise<Record<string, BlogPost>> => {
  try {
    console.log("Getting blog posts from data source");
    
    // In a real app, this would fetch from a database or API
    // Import the blog post data
    const agileBackbone = await import('./blogs/agile-backbone.json').then(m => ({
      slug: 'agile-backbone-resilient-operational-models',
      ...m.default,
      published: true // Explicitly set published to true
    }));
    
    // Ensure the agile backbone post has the most recent date to appear first
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('en-US', { month: 'long' })} ${currentDate.getFullYear()}`;
    
    agileBackbone.date = formattedDate;
    // Format Italian date (day month year)
    agileBackbone.dateIT = `${currentDate.getDate()} ${currentDate.toLocaleString('it-IT', { month: 'long' })} ${currentDate.getFullYear()}`;
    
    console.log("Agile backbone post prepared:", agileBackbone.title);
    
    // Return all posts
    return {
      'agile-backbone-resilient-operational-models': agileBackbone as BlogPost,
      // Add other posts here as needed
    };
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return {};
  }
};
