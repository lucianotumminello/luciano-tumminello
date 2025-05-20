
import { BlogPost } from "@/types";

export const getBlogPosts = async (): Promise<Record<string, BlogPost>> => {
  try {
    console.log("Getting blog posts from data source");
    
    // Absolute URLs to ensure images load properly
    const absoluteDesktopImageUrl = `${window.location.origin}/lovable-uploads/d5e3f45f-8a7d-4b07-bbb7-f08116f5abe0.png`;
    const absoluteMobileImageUrl = `${window.location.origin}/lovable-uploads/38137f5b-3d3e-4ccd-a77e-63481f021d09.png`;
    
    // Tech + Human Equation image
    const techHumanImageUrl = `${window.location.origin}/lovable-uploads/1c4f0abf-cb15-40e3-b058-28964ed52ed8.png`;
    
    // Leadership image
    const leadershipImageUrl = `${window.location.origin}/lovable-uploads/8acfc057-4507-4e63-b83a-78639ade9695.png`;
    
    // AI Transformation image
    const aiTransformationImageUrl = `${window.location.origin}/lovable-uploads/1f7719b4-812c-4079-9d7b-b4698fad762e.png`;
    
    // Define the tech+human equation post
    const techHumanEquation = {
      slug: 'human-tech-equation',
      title: 'The Human + Tech Equation: Empowering Your Workforce in Digital Transformation',
      titleIT: 'L'Equazione Umano + Tecnologia: Potenziare la Forza Lavoro nella Trasformazione Digitale',
      excerpt: 'Discover how the right balance of human expertise and technology creates successful digital transformation.',
      excerptIT: 'Scopri come il giusto equilibrio tra competenza umana e tecnologia crea una trasformazione digitale di successo.',
      date: '10 May 2025',
      dateIT: '10 Maggio 2025',
      category: 'Digital Transformation',
      categoryIT: 'Trasformazione Digitale',
      content: 'Content for Human + Tech Equation blog post',
      contentIT: 'Contenuto per il blog post sull\'Equazione Umano + Tecnologia',
      author: 'Luciano Tumminello',
      authorImageUrl: `${window.location.origin}/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png`,
      imageUrl: techHumanImageUrl,
      desktopImageUrl: techHumanImageUrl,
      readingTime: '8 min read',
      readingTimeIT: '8 min di lettura',
      tags: ['digital transformation', 'workforce', 'technology adoption', 'change management'],
      tagsIT: ['trasformazione digitale', 'forza lavoro', 'adozione tecnologica', 'gestione del cambiamento'],
      published: true,
      featured: true
    };
    
    // Define the leadership post
    const leadershipPost = {
      slug: 'adaptive-leadership-volatile-markets',
      title: 'Adaptive Leadership in Volatile Markets: Steering Through Uncertainty',
      titleIT: 'Leadership Adattiva nei Mercati Volatili: Guidare Attraverso l\'Incertezza',
      excerpt: 'Learn how adaptive leadership approaches can help navigate increasingly volatile business environments.',
      excerptIT: 'Scopri come gli approcci di leadership adattiva possono aiutare a navigare in ambienti di business sempre più volatili.',
      date: '15 May 2025',
      dateIT: '15 Maggio 2025',
      category: 'Leadership',
      categoryIT: 'Leadership',
      content: 'Content for Adaptive Leadership blog post',
      contentIT: 'Contenuto per il blog post sulla Leadership Adattiva',
      author: 'Luciano Tumminello',
      authorImageUrl: `${window.location.origin}/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png`,
      imageUrl: leadershipImageUrl,
      desktopImageUrl: leadershipImageUrl,
      readingTime: '10 min read',
      readingTimeIT: '10 min di lettura',
      tags: ['leadership', 'volatility', 'business strategy', 'resilience'],
      tagsIT: ['leadership', 'volatilità', 'strategia aziendale', 'resilienza'],
      published: true,
      featured: false
    };
    
    // Define the AI transformation post
    const aiTransformationPost = {
      slug: 'ai-transformation-practical-roadmap',
      title: 'AI Transformation: A Practical Roadmap for Business Leaders',
      titleIT: 'Trasformazione AI: Una Roadmap Pratica per Leader Aziendali',
      excerpt: 'Explore a step-by-step approach to implementing AI transformation in your organization.',
      excerptIT: 'Esplora un approccio passo-passo per implementare la trasformazione AI nella tua organizzazione.',
      date: '5 May 2025',
      dateIT: '5 Maggio 2025',
      category: 'Artificial Intelligence',
      categoryIT: 'Intelligenza Artificiale',
      content: 'Content for AI Transformation blog post',
      contentIT: 'Contenuto per il blog post sulla Trasformazione AI',
      author: 'Luciano Tumminello',
      authorImageUrl: `${window.location.origin}/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png`,
      imageUrl: aiTransformationImageUrl,
      desktopImageUrl: aiTransformationImageUrl,
      readingTime: '9 min read',
      readingTimeIT: '9 min di lettura',
      tags: ['artificial intelligence', 'digital transformation', 'technology implementation', 'business strategy'],
      tagsIT: ['intelligenza artificiale', 'trasformazione digitale', 'implementazione tecnologica', 'strategia aziendale'],
      published: true,
      featured: false
    };
    
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
      'human-tech-equation': techHumanEquation as BlogPost,
      'adaptive-leadership-volatile-markets': leadershipPost as BlogPost,
      'ai-transformation-practical-roadmap': aiTransformationPost as BlogPost
    };
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return {};
  }
};
