
/**
 * Utility functions for blog management
 */

// This is a simplified mock translation function
// In a production environment, you would use a proper translation API
export async function translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
  // Mock translation for now - in production replace with actual API call
  if (!text) return "";
  
  // Very simple mock translation for Italian - this should be replaced with proper translation API
  if (targetLang === 'it') {
    // This is just for demonstration - use a real translation service in production
    const mockItalianTranslations: Record<string, string> = {
      'min read': 'min di lettura',
      'April': 'Aprile',
      'May': 'Maggio',
      'June': 'Giugno',
      'July': 'Luglio',
      'August': 'Agosto',
      'September': 'Settembre',
      'October': 'Ottobre',
      'November': 'Novembre',
      'December': 'Dicembre',
      'January': 'Gennaio',
      'February': 'Febbraio',
      'March': 'Marzo',
    };

    let translatedText = text;
    Object.entries(mockItalianTranslations).forEach(([en, it]) => {
      translatedText = translatedText.replace(new RegExp(en, 'g'), it);
    });
    
    // Add Italian-like modifications (simplified for demo)
    translatedText = translatedText
      .replace(/ing\b/g, 'ando')
      .replace(/tion/g, 'zione')
      .replace(/ty\b/g, 'tà')
      .replace(/\band\b/g, 'e')
      .replace(/\bthe\b/g, 'il')
      .replace(/\ba\b/g, 'un')
      .replace(/\bis\b/g, 'è')
      .replace(/\bto\b/g, 'a');
      
    return translatedText;
  }
  
  return text; // Return original if not translating to Italian
}

// Generate tags based on content using keyword extraction
export async function generateTags(content: string): Promise<string[]> {
  // In production, replace with a real NLP/keyword extraction service
  
  // Mock implementation - extract capitalized words and phrases as potential tags
  const words = content.split(/\s+/);
  const potentialTags = new Set<string>();
  const commonWords = new Set(['the', 'and', 'in', 'of', 'to', 'a', 'for', 'by', 'with', 'on', 'at']);
  
  // Find capitalized words that might be important terms
  for (let i = 0; i < words.length; i++) {
    const word = words[i].replace(/[.,;:?!()]/g, '');
    if (
      word.length > 1 &&
      /^[A-Z]/.test(word) && 
      !word.toUpperCase() === word && // not ALL CAPS (like acronyms)
      !commonWords.has(word.toLowerCase())
    ) {
      potentialTags.add(word.replace(/[.,;:?!()]/g, ''));
    }
  }
  
  // Look for common tech/business terms
  const keyTerms = [
    'AI', 'Artificial Intelligence', 'Machine Learning', 'Digital Transformation',
    'Leadership', 'Innovation', 'Strategy', 'Marketing', 'Technology',
    'Business', 'Management', 'Analytics', 'Data', 'Customer Experience'
  ];
  
  for (const term of keyTerms) {
    if (content.includes(term)) {
      potentialTags.add(term);
    }
  }
  
  // Convert to array, limit to 5 tags
  return Array.from(potentialTags).slice(0, 5);
}

// Estimate reading time based on content
export function estimateReadingTime(content: string): number {
  // Average reading speed is about 200-250 words per minute
  const WORDS_PER_MINUTE = 225;
  
  // Count words in the content (simplified)
  const wordCount = content.split(/\s+/).length;
  
  // Calculate reading time in minutes
  const readingTimeMinutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  
  // Return at least 1 minute
  return Math.max(1, readingTimeMinutes);
}
