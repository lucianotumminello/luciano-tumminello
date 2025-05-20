
/**
 * Ensures all outgoing links in the content have proper attributes
 * @param content The HTML content
 * @returns The content with properly formatted links
 */
export const ensureOutgoingLinks = (content: string): string => {
  if (!content) return '';
  
  // This is a simplistic approach - in a real app, consider using a proper HTML parser
  return content.replace(
    /<a([^>]*)href="http([^>]*)"([^>]*)>/g,
    (match, before, url, after) => {
      // Don't modify if already has required attributes
      if (match.includes('target="_blank"') && match.includes('rel="noopener"')) {
        return match;
      }
      
      // Add target and rel if not present
      const hasTarget = match.includes('target=');
      const hasRel = match.includes('rel=');
      
      let newMatch = match;
      
      if (!hasTarget) {
        newMatch = newMatch.replace(">", ' target="_blank">');
      }
      
      if (!hasRel) {
        newMatch = newMatch.replace(">", ' rel="noopener noreferrer">');
      }
      
      return newMatch;
    }
  );
};

/**
 * Enhances content formatting for better readability
 * @param content The HTML content to enhance
 * @returns The enhanced content
 */
export const enhanceContentFormatting = (content: string): string => {
  if (!content) return '';
  
  let enhancedContent = content;
  
  // Add proper spacing around headings if needed
  enhancedContent = enhancedContent.replace(
    /(<\/p>)(<h[1-6])/g,
    '$1\n$2'
  );
  
  enhancedContent = enhancedContent.replace(
    /(<\/h[1-6]>)(<p)/g,
    '$1\n$2'
  );
  
  // Ensure lists have proper formatting
  enhancedContent = enhancedContent.replace(
    /(<ul|<ol)/g,
    '\n$1'
  );
  
  enhancedContent = enhancedContent.replace(
    /(<\/ul>|<\/ol>)/g,
    '$1\n'
  );
  
  // Ensure blockquotes are properly formatted
  enhancedContent = enhancedContent.replace(
    /(<blockquote)/g,
    '\n$1'
  );
  
  enhancedContent = enhancedContent.replace(
    /(<\/blockquote>)/g,
    '$1\n'
  );
  
  return enhancedContent;
};

/**
 * Extracts a plain text excerpt from HTML content
 * @param htmlContent The HTML content
 * @param maxLength The maximum length of the excerpt
 * @returns A plain text excerpt
 */
export const extractExcerpt = (htmlContent: string, maxLength: number = 200): string => {
  if (!htmlContent) return '';
  
  // Remove all HTML tags
  const text = htmlContent.replace(/<[^>]*>/g, ' ');
  
  // Remove excess whitespace
  const cleanText = text.replace(/\s+/g, ' ').trim();
  
  // Truncate to maxLength
  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  
  // Find the last space before maxLength
  const lastSpace = cleanText.lastIndexOf(' ', maxLength);
  if (lastSpace === -1) {
    return cleanText.substring(0, maxLength) + '...';
  }
  
  return cleanText.substring(0, lastSpace) + '...';
};

/**
 * Extracts the reading time from HTML content
 * @param htmlContent The HTML content
 * @returns The estimated reading time in minutes
 */
export const extractReadingTime = (htmlContent: string): number => {
  if (!htmlContent) return 1;
  
  // Remove all HTML tags
  const text = htmlContent.replace(/<[^>]*>/g, ' ');
  
  // Remove excess whitespace
  const cleanText = text.replace(/\s+/g, ' ').trim();
  
  // Count words
  const words = cleanText.split(' ').length;
  
  // Average reading speed is 200-250 words per minute
  const readingTime = Math.ceil(words / 225);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
};

/**
 * Inserts marketing images into the content at appropriate locations
 * @param content The HTML content
 * @returns The content with marketing images inserted
 */
export const insertMarketingImages = (content: string): string => {
  if (!content) return '';
  
  // This is a simplified implementation
  // In a real application, you would have more sophisticated logic
  // to determine where and which marketing images to insert
  
  // For now, we'll just add a placeholder comment
  // This allows the function to exist without changing behavior
  console.log("Marketing images would be inserted here in a production environment");
  
  return content;
};

/**
 * Adds additional content to the blog post for SEO and user engagement
 * @param content The HTML content
 * @returns The content with additional elements
 */
export const addAdditionalContent = (content: string): string => {
  if (!content) return '';
  
  // This is a simplified implementation
  // In a real application, you might add related articles, 
  // calls to action, or other engagement elements
  
  // For now, we'll just return the original content
  console.log("Additional content would be added here in a production environment");
  
  return content;
};
