/**
 * Converts plain text to HTML format with advanced formatting
 */
export function textToHtml(text: string): string {
  if (!text) return '';
  
  // Split text into sections and remove empty ones
  const sections = text.split('\n\n').filter(s => s.trim());
  
  // Convert each section to HTML with advanced formatting
  const htmlSections = sections.map(section => {
    // First check if the section is a heading
    if (section.startsWith('#')) {
      const match = section.match(/^(#+)\s*(.+)$/);
      if (match) {
        const level = match[1].length;
        const content = match[2].trim();
        switch(level) {
          case 1:
            return `<h1 class="text-4xl font-bold mb-8 mt-12 text-gray-900">${content}</h1>`;
          case 2:
            return `<h2 class="text-3xl font-bold mb-6 mt-12 text-gray-800">${content}</h2>`;
          case 3:
            return `<h3 class="text-2xl font-semibold mb-4 mt-8 text-gray-800">${content}</h3>`;
          default:
            return `<h${level} class="text-xl font-semibold mb-4 mt-6 text-gray-800">${content}</h${level}>`;
        }
      }
    }
    
    // Check for bullet points
    if (section.match(/^-\s/m)) {
      const items = section.split('\n')
        .filter(line => line.trim().startsWith('- '))
        .map(line => line.replace(/^-\s+/, '').trim());
        
      if (items.length > 0) {
        return `<ul class="list-disc pl-6 mb-6 space-y-3 text-gray-700">
          ${items.map(item => `<li class="text-gray-700">${item}</li>`).join('\n')}
        </ul>`;
      }
    }
    
    // Check for numbered lists
    if (section.match(/^\d+\.\s/m)) {
      const items = section.split('\n')
        .filter(line => line.match(/^\d+\.\s/))
        .map(line => line.replace(/^\d+\.\s+/, '').trim());
        
      if (items.length > 0) {
        return `<ol class="list-decimal pl-6 mb-6 space-y-3 text-gray-700">
          ${items.map(item => `<li class="text-gray-700">${item}</li>`).join('\n')}
        </ol>`;
      }
    }
    
    // Handle quotes with citations
    const quoteMatch = section.match(/^"([^"]+)"\s*—\s*(.+)$/);
    if (quoteMatch) {
      const [_, quote, citation] = quoteMatch;
      return `<blockquote class="border-l-4 border-primary pl-6 py-4 my-8 bg-gray-50 rounded-r">
        <p class="mb-3 text-lg italic text-gray-700">"${quote}"</p>
        <footer class="text-sm text-gray-600">— ${citation}</footer>
      </blockquote>`;
    }
    
    // Regular paragraphs with improved spacing and text styling
    return `<p class="mb-6 text-gray-700 text-justify leading-relaxed">${section.trim()}</p>`;
  });
  
  return htmlSections.join('\n\n');
}

/**
 * Applies consistent formatting to text content
 */
export function applyStandardLayout(text: string): string {
  if (!text) return '';
  
  let formattedText = text;
  
  // Ensure proper header formatting with space after #
  formattedText = formattedText
    .replace(/^(#+)([^\s])/gm, '$1 $2')  // Add space after # if missing
    .replace(/^(#+)\s+/gm, '$1 ');  // Normalize spaces after #
  
  // Ensure lists have proper spacing
  formattedText = formattedText
    .replace(/^(-|\d+\.)\s*/gm, '$1 ')  // Normalize list item spacing
    .replace(/\n{3,}/g, '\n\n');  // Remove extra blank lines
  
  // Format quotes consistently
  formattedText = formattedText
    .replace(/^"([^"]*)"(\s*)—(\s*)([^"]*)/gm, '"$1" — $4');
  
  return formattedText;
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
