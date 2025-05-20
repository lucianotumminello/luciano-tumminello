import { useToast } from "@/hooks/use-toast";

/**
 * Translates text from one language to another
 * @param text The text to translate
 * @param sourceLanguage The source language code (e.g., 'en', 'it')
 * @param targetLanguage The target language code (e.g., 'en', 'it')
 * @returns A promise that resolves to the translated text
 */
export const translateText = async (
  text: string,
  sourceLanguage: string = "en",
  targetLanguage: string = "it"
): Promise<string> => {
  try {
    // For now, we're keeping this simple since we're not making actual API calls
    // In a real app, this would call a translation API
    
    // To avoid excessive logging, truncate large contents
    const truncatedText = text.length > 100 
      ? `${text.substring(0, 100)}... (${text.length} chars total)` 
      : text;
    
    console.log(`Translating text (${sourceLanguage} to ${targetLanguage}): ${truncatedText}`);
    
    // For simplicity in this demo, we return the original text for English
    // and add an Italian prefix for other translations
    if (sourceLanguage === targetLanguage) {
      return text;
    }
    
    // In a real app, we would call a translation service here
    // For demonstration purposes, we're returning special cases for some known strings
    // and the original text for everything else
    
    // For Italian translations
    if (targetLanguage === "it" && sourceLanguage === "en") {
      // Translation map for common terms
      const italianTranslations: Record<string, string> = {
        "Digital Transformation": "Trasformazione Digitale",
        "Leadership": "Leadership",
        "Artificial Intelligence": "Intelligenza Artificiale",
        "Technology": "Tecnologia",
        "Innovation": "Innovazione",
        "Business Strategy": "Strategia Aziendale",
        "Operations": "Operazioni",
        "Operational Excellence": "Eccellenza Operativa",
        "Strategic Planning": "Pianificazione Strategica",
        "Change Management": "Gestione del Cambiamento",
        "Digital Strategy": "Strategia Digitale",
        "Business Agility": "Agilità Aziendale",
        "min read": "min di lettura"
      };
      
      // Check if the text matches any of our known translations
      if (italianTranslations[text]) {
        return italianTranslations[text];
      }
      
      // If this is HTML content, just return it as is - we're not doing real translation in this demo
      if (text.includes("<h1") || text.includes("<p>")) {
        return text;
      }
      
      // For specific blog posts, we already have translations in the blog data
      return text;
    }
    
    // For any other language combinations, just return the original text
    return text;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Return original text on error
  }
};

/**
 * Generates tags based on content
 * @param content The content to analyze
 * @returns A promise that resolves to an array of tags
 */
export const generateTags = async (content: string): Promise<string[]> => {
  try {
    // In a real app, this would use NLP or AI to extract relevant tags
    // For now, we'll return some default tags
    return ["business strategy", "operations", "leadership", "digital transformation"];
  } catch (error) {
    console.error("Error generating tags:", error);
    return ["business"];
  }
};

/**
 * Estimates reading time based on the content length
 * @param content The content to analyze
 * @returns The estimated reading time in minutes
 */
export const estimateReadingTime = (content: string): number => {
  // Average reading speed: 200 words per minute
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  return Math.max(1, readingTime); // Minimum 1 minute
};

/**
 * Checks if a blog post exists
 * @param slug The slug to check
 * @returns A promise that resolves to a boolean indicating if the post exists
 */
export const checkBlogPostExists = async (slug: string): Promise<boolean> => {
  try {
    const storedPosts = localStorage.getItem("blog_posts_server_storage");
    if (!storedPosts) return false;
    
    const posts = JSON.parse(storedPosts);
    return !!posts[slug];
  } catch (error) {
    console.error("Error checking if blog post exists:", error);
    return false;
  }
};

/**
 * Formats a date string to be consistent and localized
 * @param dateStr The date string to format
 * @param locale The locale to use for formatting (e.g., 'en-US', 'it-IT')
 * @returns The formatted date string
 */
export const formatDateLocalized = (dateStr: string, locale: string = 'en-US'): string => {
  try {
    // Try to parse the date
    const date = new Date(dateStr);
    
    // If the date is invalid, return the original string
    if (isNaN(date.getTime())) {
      return dateStr;
    }
    
    // Format to "DD Month YYYY"
    const day = date.getDate();
    const month = date.toLocaleString(locale, { month: 'long' });
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateStr;
  }
};

/**
 * Ensures that a URL is absolute
 * @param url The URL to process
 * @returns An absolute URL
 */
export const ensureAbsoluteUrl = (url: string): string => {
  if (!url) return '';
  
  // Check if the URL is already absolute
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Check if it's a data URL
  if (url.startsWith('data:')) {
    return url;
  }
  
  // Handle relative URLs
  if (url.startsWith('/')) {
    return `${window.location.origin}${url}`;
  }
  
  // Otherwise, assume it's a relative URL
  return `${window.location.origin}/${url}`;
};
