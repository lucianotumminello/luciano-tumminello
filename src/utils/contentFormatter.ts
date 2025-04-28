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
      // Apply specific styling based on header level
      switch(headerLevel) {
        case 1: // H1 - Large Title
          return `<h1 class="text-3xl font-bold mb-6">${headerText}</h1>`;
        case 2: // H2 - Medium Title
          return `<h2 class="text-2xl font-bold mb-4 mt-8">${headerText}</h2>`;
        case 3: // H3 - Small Title
          return `<h3 class="text-xl font-semibold mb-2 mt-6">${headerText}</h3>`;
        default:
          return `<h${headerLevel} class="text-lg font-semibold mb-2 mt-4">${headerText}</h${headerLevel}>`;
      }
    }
    
    // Check for bullet points
    if (section.match(/^-\s/m)) {
      const items = section.split('\n')
        .filter(line => line.match(/^-\s/))
        .map(line => line.replace(/^-\s/, '').trim());
        
      if (items.length > 0) {
        return `<ul class="list-disc pl-6 mb-4 space-y-2">
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
        return `<ol class="list-decimal pl-6 mb-4 space-y-2">
          ${items.map(item => `<li class="text-gray-700">${item}</li>`).join('\n')}
        </ol>`;
      }
    }
    
    // Handle quotes with citations
    const quoteMatch = section.match(/^"([^"]+)"\s*—\s*(.+)$/);
    if (quoteMatch) {
      const [_, quote, citation] = quoteMatch;
      return `<blockquote class="border-l-4 border-primary pl-4 py-2 my-6 text-gray-700 italic">
        <p class="mb-2">"${quote}"</p>
        <footer class="text-gray-600">— ${citation}</footer>
      </blockquote>`;
    }
    
    // Regular paragraphs
    const lines = section.split('\n').filter(line => line.trim());
    const formattedLines = lines.join('<br />');
    return `<p class="mb-4 text-gray-700 text-justify leading-relaxed">${formattedLines}</p>`;
  });
  
  return htmlSections.join('\n');
}

/**
 * Applies consistent formatting to text content
 */
export function applyStandardLayout(text: string): string {
  if (!text) return '';
  
  // Ensure proper header formatting
  let formattedText = text
    .replace(/^# (.*?)$/gm, '# $1\n')  // H1 titles
    .replace(/^## (.*?)$/gm, '## $1\n') // H2 titles
    .replace(/^### (.*?)$/gm, '### $1\n'); // H3 titles
  
  // Ensure double line breaks between sections
  formattedText = formattedText.replace(/\n{3,}/g, '\n\n');
  
  // Add spacing after lists
  formattedText = formattedText
    .replace(/(\n- .*?)(\n[^-])/g, '$1\n$2')
    .replace(/(\n\d+\. .*?)(\n[^\d])/g, '$1\n$2');
  
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
