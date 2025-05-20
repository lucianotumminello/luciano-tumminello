/**
 * Inserts marketing-related images into the blog content
 * @param content - HTML content to process
 * @returns Processed HTML content with inserted marketing images
 */
export const insertMarketingImages = (content: string): string => {
  // Add marketing transformation images
  const desktopImageHtml = `
    <div id="marketing-desktop-image" class="marketing-desktop-image">
      <img src="/lovable-uploads/c55bb2b1-05a5-45ac-bbbf-cc6b91fb736a.png" 
           alt="Digital Marketing Transformation" 
           loading="lazy" 
           width="800" 
           height="450"
           style="display: block !important; width: 100%; max-width: 800px; margin: 2rem auto;" />
    </div>
  `;
  
  const mobileImageHtml = `
    <div id="marketing-mobile-image" class="marketing-mobile-image">
      <img src="/lovable-uploads/c74c218a-484f-41d3-b0f4-c8275873c98c.png" 
           alt="Digital Marketing Transformation Mobile" 
           loading="lazy" 
           width="400" 
           height="300"
           style="display: none !important; width: 100%; max-width: 400px; margin: 2rem auto;" />
    </div>
  `;
  
  // Insert after the first paragraph
  const firstParagraphEnd = content.indexOf('</p>') + 4;
  if (firstParagraphEnd > 4) {
    return content.slice(0, firstParagraphEnd) + desktopImageHtml + mobileImageHtml + content.slice(firstParagraphEnd);
  }
  
  return content;
};

/**
 * Adds additional content to blog post to meet word count requirements
 * @param content - HTML content to process
 * @returns Processed HTML content with additional sections
 */
export const addAdditionalContent = (content: string): string => {
  // Don't add if content is already substantial
  if (content.length > 5000) return content;
  
  const additionalContent = `
    <h2>Further Reading and Resources</h2>
    <p>If you found this article insightful, you may want to explore these related topics:</p>
    <ul>
      <li><a href="/blog/beyond-technology-ai-culture" class="text-primary hover:underline">Beyond Technology: Building an AI-Driven Culture</a></li>
      <li><a href="/blog/ai-leadership-revolution" class="text-primary hover:underline">The AI Leadership Revolution: Adapting to the New Paradigm</a></li>
      <li><a href="/career" class="text-primary hover:underline">Learn more about my professional journey in digital transformation</a></li>
      <li><a href="/contact" class="text-primary hover:underline">Connect with me for consultations on AI implementation strategies</a></li>
    </ul>
  `;
  
  // Add before the closing article tag if it exists
  if (content.includes('</article>')) {
    return content.replace('</article>', additionalContent + '</article>');
  }
  
  // Otherwise add to the end
  return content + additionalContent;
};

/**
 * Ensures that blog posts have outgoing links by adding a related resources section if needed
 * @param content - HTML content to process
 * @returns Processed HTML content with ensured outgoing links
 */
export const ensureOutgoingLinks = (content: string): string => {
  // Check if content already has links
  const hasLinks = content.includes('<a href=');
  
  // If content already has links, return it unchanged - no longer adding Related Resources section
  if (hasLinks) {
    console.log("Outgoing links already found in content, not adding related resources section");
    return content;
  }
  
  // If no links found, we still need to add at least one outgoing link for SEO purposes
  // but we'll add it more subtly at the end of the content without the Related Resources header
  console.log("No outgoing links found in content, adding minimal outgoing link");
  
  const minimalLink = `
    <p class="mt-8">
      <a href="/contact" class="text-primary hover:underline">Contact me</a> for more information on this topic.
    </p>
  `;
  
  // Add before the closing body tag if it exists
  if (content.includes('</body>')) {
    return content.replace('</body>', minimalLink + '</body>');
  }
  
  // Otherwise add to the end
  return content + minimalLink;
};
