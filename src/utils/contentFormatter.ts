
/**
 * Converts plain text to HTML format with advanced formatting
 */
export function textToHtml(text: string): string {
  if (!text) return '';
  
  // Split text into sections
  const sections = text.split('\n\n').filter(s => s.trim());
  
  // Convert each section to HTML with advanced formatting
  const htmlSections = sections.map(section => {
    // Check if the section starts with a header
    const headerMatch = section.match(/^(#+)\s(.+)/);
    if (headerMatch) {
      const headerLevel = headerMatch[1].length;
      const headerText = headerMatch[2];
      const headerClasses = {
        1: 'text-4xl font-bold mb-8 mt-8 text-gray-900',
        2: 'text-3xl font-bold mb-6 mt-12 text-gray-800',
        3: 'text-2xl font-semibold mb-4 mt-8 text-gray-800'
      }[headerLevel] || 'text-xl font-semibold mb-4 mt-6 text-gray-800';
      
      return `<h${headerLevel} class="${headerClasses}">${headerText}</h${headerLevel}>`;
    }
    
    // Check for bullet points
    if (section.match(/^-\s/m)) {
      const items = section.split('\n')
        .filter(line => line.match(/^-\s/))
        .map(line => line.replace(/^-\s/, '').trim());
        
      if (items.length > 0) {
        return `<ul class="list-disc pl-6 mb-8 space-y-2 text-gray-700">
          ${items.map(item => `<li class="text-gray-700">${item}</li>`).join('\n')}
        </ul>`;
      }
    }
    
    // Check for numbered lists
    if (section.match(/^\d+\.\s/m)) {
      const items = section.split('\n')
        .filter(line => line.match(/^\d+\.\s/))
        .map(line => line.replace(/^\d+\.\s/, '').trim());
        
      if (items.length > 0) {
        return `<ol class="list-decimal pl-6 mb-8 space-y-2 text-gray-700">
          ${items.map(item => `<li class="text-gray-700">${item}</li>`).join('\n')}
        </ol>`;
      }
    }
    
    // Handle quotes with citations
    const quoteMatch = section.match(/^"([^"]+)"\s*—\s*(.+)$/);
    if (quoteMatch) {
      const [_, quote, citation] = quoteMatch;
      return `<blockquote class="border-l-4 border-primary pl-4 py-2 my-8 text-gray-700 italic">
        <p class="mb-2">"${quote}"</p>
        <footer class="text-gray-600">— ${citation}</footer>
      </blockquote>`;
    }
    
    // Regular paragraphs
    const lines = section.split('\n').filter(line => line.trim());
    const formattedLines = lines.join('<br />');
    return `<p class="mb-6 text-gray-700 text-justify leading-relaxed">${formattedLines}</p>`;
  });
  
  return htmlSections.join('\n\n');
}

/**
 * Applies consistent styling and formatting to content
 */
export function applyStandardLayout(text: string): string {
  if (!text) return '';
  
  // First, normalize line breaks to ensure consistent processing
  let formattedText = text.replace(/\r\n/g, '\n');
  
  // Identify existing headings and ensure proper formatting
  formattedText = formattedText.replace(/^(#+)(?:\s*)(.+)$/gm, (match, hashes, content) => {
    // Ensure exactly one space after the hash(es)
    return `${hashes} ${content.trim()}`;
  });
  
  // Add proper spacing between different sections
  
  // Ensure double line breaks between sections and avoid excessive line breaks
  formattedText = formattedText.replace(/\n{3,}/g, '\n\n');
  
  // Ensure proper spacing after headings
  formattedText = formattedText.replace(/^(#+\s.+)$/gm, '$1\n');
  
  // Fix list formatting - ensure proper indentation and spacing
  // For bullet points
  formattedText = formattedText.replace(/^-(?:\s*)(.+)$/gm, '- $1');
  
  // For numbered lists
  formattedText = formattedText.replace(/^(\d+\.)(?:\s*)(.+)$/gm, '$1 $2');
  
  // Add spacing after lists
  formattedText = formattedText.replace(/(\n- .*?)(\n[^-\n])/g, '$1\n$2');
  formattedText = formattedText.replace(/(\n\d+\. .*?)(\n[^\d\n])/g, '$1\n$2');
  
  // Format quotes consistently
  formattedText = formattedText.replace(/"([^"]*)"(?:\s*)—(?:\s*)([^"]*)/, (match, quote, citation) => {
    return `"${quote.trim()}" — ${citation.trim()}`;
  });
  
  // Ensure paragraphs have proper spacing
  formattedText = formattedText.replace(/([^\n])(\n)([^\n#-\d"])/g, '$1\n\n$3');
  
  // Make sure headings have consistent hierarchy and spacing
  const lines = formattedText.split('\n');
  let processedLines = [];
  let prevLineIsHeading = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isHeading = /^#+\s/.test(line);
    
    // If this line is a heading and the previous line was also a heading
    // add an extra line break for better spacing
    if (isHeading && prevLineIsHeading) {
      processedLines.push('');
    }
    
    // If this is a heading and the previous line wasn't a blank line
    if (isHeading && i > 0 && lines[i-1].trim() !== '') {
      processedLines.push('');
    }
    
    processedLines.push(line);
    
    // Add blank line after heading if next line isn't blank
    if (isHeading && i < lines.length - 1 && lines[i+1].trim() !== '') {
      processedLines.push('');
    }
    
    prevLineIsHeading = isHeading;
  }
  
  return processedLines.join('\n');
}

/**
 * Converts HTML format back to plain text
 */
export function htmlToText(html: string): string {
  if (!html) return '';
  
  return html
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g, (match, content) => {
      const level = match.charAt(2);
      return '#'.repeat(parseInt(level)) + ' ' + content + '\n\n';
    })
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/g, (match, content) => {
      const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/g) || [];
      return items.map(item => '- ' + item.replace(/<li[^>]*>([\s\S]*?)<\/li>/, '$1')).join('\n') + '\n\n';
    })
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/g, (match, content) => {
      const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/g) || [];
      return items.map((item, index) => `${index + 1}. ` + item.replace(/<li[^>]*>([\s\S]*?)<\/li>/, '$1')).join('\n') + '\n\n';
    })
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/g, '$1\n\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Estimate reading time based on content
 */
export function estimateReadingTime(content: string): number {
  // Average reading speed is about 200-250 words per minute
  const WORDS_PER_MINUTE = 225;
  
  // Count words in the content (simplified)
  const text = content.replace(/<[^>]*>/g, ' '); // Remove HTML tags
  const wordCount = text.split(/\s+/).filter(word => word.trim().length > 0).length;
  
  // Calculate reading time in minutes
  const readingTimeMinutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  
  // Return at least 1 minute
  return Math.max(1, readingTimeMinutes);
}
