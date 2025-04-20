
/**
 * Converts plain text to HTML format
 */
export function textToHtml(text: string): string {
  if (!text) return '';
  
  // Split text into paragraphs
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  
  // Convert each paragraph to HTML
  const htmlParagraphs = paragraphs.map(p => {
    // Preserve line breaks within paragraphs
    const lines = p.split('\n').filter(line => line.trim());
    const formattedLines = lines.join('<br />');
    return `<p>${formattedLines}</p>`;
  });
  
  return htmlParagraphs.join('\n\n');
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
