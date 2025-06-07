
import { makeBlogPostPermanent } from './blogPostOperations';

/**
 * Makes the Adaptability Leadership blog post permanent with a clean URL
 * This ensures the post is permanently stored in Supabase and accessible across all devices
 */
const makeAdaptabilityPostPermanent = async (): Promise<void> => {
  try {
    console.log('Making Adaptability Leadership blog post permanent...');
    
    // The temporary slug from the URL
    const temporarySlug = 'your-most-valuable-leadership-skill-in-2025-adaptability-in-the-age-of-ai-and-operations-1749195070736';
    
    // Clean permanent slug
    const permanentSlug = 'adaptability-leadership-skill-2025-ai-operations';
    
    // Make the post permanent with published status set to true
    const success = await makeBlogPostPermanent(temporarySlug, permanentSlug, true);
    
    if (success) {
      console.log(`✅ Adaptability Leadership blog post made permanent!`);
      console.log(`🔗 New permanent URL: /blog/${permanentSlug}`);
      console.log(`📱 Post is now accessible from any browser and device`);
    } else {
      console.error('❌ Failed to make Adaptability Leadership blog post permanent');
    }
    
  } catch (error) {
    console.error('Error making Adaptability Leadership blog post permanent:', error);
  }
};

// Execute after a delay to ensure React context is ready
if (typeof window !== 'undefined') {
  setTimeout(() => {
    makeAdaptabilityPostPermanent().catch(error => {
      console.error('Failed to execute makeAdaptabilityPostPermanent:', error);
    });
  }, 5000);
}

export default makeAdaptabilityPostPermanent;
