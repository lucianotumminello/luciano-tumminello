
import { makeBlogPostPermanent } from './blogPostOperations';

// This script ensures the Beyond Recognition blog post is permanently available
const initializeBeyondRecognitionPost = async () => {
  try {
    console.log('Initializing "Beyond Recognition" post as permanent...');
    const temporarySlug = 'beyond-technology-cultural-transformation-required-for-successful-ai-integration';
    const permanentSlug = 'beyond-technology-cultural-transformation-required-for-successful-ai-integration';
    
    await makeBlogPostPermanent(temporarySlug, permanentSlug, true);
    console.log('Successfully set "Beyond Recognition" post as permanent');
  } catch (error) {
    console.error('Error making "Beyond Recognition" post permanent:', error);
  }
};

// Execute this when the module is imported
initializeBeyondRecognitionPost().catch(error => {
  console.error('Failed to make Beyond Recognition post permanent:', error);
});
