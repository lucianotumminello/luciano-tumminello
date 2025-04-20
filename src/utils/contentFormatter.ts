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
        1: 'text-3xl font-bold mb-6',
        2: 'text-2xl font-bold mb-4',
        3: 'text-xl font-semibold mb-2'
      }[headerLevel] || 'text-lg font-semibold mb-2';
      
      return `<h${headerLevel} class="${headerClasses}">${headerText}</h${headerLevel}>`;
    }
    
    // Regular paragraphs
    const lines = section.split('\n').filter(line => line.trim());
    const formattedLines = lines.join('<br />');
    return `<p class="mb-4">${formattedLines}</p>`;
  });
  
  return htmlSections.join('\n\n');
}

/**
 * Converts HTML format back to plain text
 */
export function htmlToText(html: string): string {
  if (!html) return '';
  
  return html
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '\n\n')
    .replace(/<br \/>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .trim();
}
