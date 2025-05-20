
import { BlogPost } from "@/types";

export const getBlogPosts = async (): Promise<Record<string, BlogPost>> => {
  try {
    console.log("Getting blog posts from data source");
    
    // Absolute URLs to ensure images load properly
    const absoluteDesktopImageUrl = `${window.location.origin}/lovable-uploads/d5e3f45f-8a7d-4b07-bbb7-f08116f5abe0.png`;
    const absoluteMobileImageUrl = `${window.location.origin}/lovable-uploads/38137f5b-3d3e-4ccd-a77e-63481f021d09.png`;
    
    console.log("Image URLs being used:", {
      desktop: absoluteDesktopImageUrl,
      mobile: absoluteMobileImageUrl
    });
    
    // In a real app, this would fetch from a database or API
    // Import the blog post data with guaranteed image URLs
    const agileBackbone = await import('./blogs/agile-backbone.json').then(m => ({
      slug: 'agile-backbone-resilient-operational-models',
      ...m.default,
      published: true,
      featured: true,
      // Force absolute URLs for all image sources
      imageUrl: absoluteMobileImageUrl,
      desktopImageUrl: absoluteDesktopImageUrl
    }));
    
    // Ensure the agile backbone post has the most recent date to appear first
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('en-US', { month: 'long' })} ${currentDate.getFullYear()}`;
    
    agileBackbone.date = formattedDate;
    // Format Italian date (day month year)
    agileBackbone.dateIT = `${currentDate.getDate()} ${currentDate.toLocaleString('it-IT', { month: 'long' })} ${currentDate.getFullYear()}`;
    
    console.log("Agile backbone post prepared:", agileBackbone.title, "published:", agileBackbone.published);
    console.log("Blog post images (absolute URLs):", agileBackbone.imageUrl, agileBackbone.desktopImageUrl);
    
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
