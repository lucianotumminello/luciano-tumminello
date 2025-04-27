
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
    
    // Check for numbered lists (1. 2. 3. etc)
    if (section.match(/^\d+\.\s/m)) {
      const items = section.split('\n')
        .filter(line => line.match(/^\d+\.\s/))
        .map(line => line.replace(/^\d+\.\s/, '').trim());
        
      if (items.length > 0) {
        return `<ol class="list-decimal pl-5 mb-4 space-y-2">
          ${items.map(item => `<li>${item}</li>`).join('\n')}
        </ol>`;
      }
    }
    
    // Check for bullet points
    if (section.match(/^-\s/m)) {
      const items = section.split('\n')
        .filter(line => line.match(/^-\s/))
        .map(line => line.replace(/^-\s/, '').trim());
        
      if (items.length > 0) {
        return `<ul class="list-disc pl-5 mb-4 space-y-2">
          ${items.map(item => `<li>${item}</li>`).join('\n')}
        </ul>`;
      }
    }
    
    // Regular paragraphs
    const lines = section.split('\n').filter(line => line.trim());
    const formattedLines = lines.join('<br />');
    return `<p class="mb-4">${formattedLines}</p>`;
  });
  
  return htmlSections.join('\n\n');
}

/**
 * Applies consistent styling and formatting to content
 */
export function applyStandardLayout(text: string): string {
  if (!text) return '';
  
  // Structure headings properly
  let formattedText = text.replace(/^# (.*?)$/gm, '# $1');
  formattedText = formattedText.replace(/^## (.*?)$/gm, '## $1');
  formattedText = formattedText.replace(/^### (.*?)$/gm, '### $1');
  
  // Ensure double line breaks between sections
  formattedText = formattedText.replace(/\n{3,}/g, '\n\n');
  
  // Add spacing after lists
  formattedText = formattedText.replace(/(\n- .*?)(\n[^-])/g, '$1\n$2');
  formattedText = formattedText.replace(/(\n\d+\. .*?)(\n[^\d])/g, '$1\n$2');
  
  // Format quotes
  formattedText = formattedText.replace(/"([^"]*)" — ([^"]*)/g, '"$1" — $2');
  
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
