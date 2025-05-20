
import { makeBlogPostPermanent } from './blogPostOperations';

// This script ensures the Agile Backbone blog post is permanently available
const initializeAgileBackbonePost = async () => {
  try {
    console.log('Initializing "The Agile Backbone" post as permanent...');
    const temporarySlug = 'the-agile-backbone-building-resilient-adaptive-operational-models';
    const permanentSlug = 'the-agile-backbone-building-resilient-adaptive-operational-models';
    
    await makeBlogPostPermanent(temporarySlug, permanentSlug, true);
    console.log('Successfully set "The Agile Backbone" post as permanent');
  } catch (error) {
    console.error('Error making "The Agile Backbone" post permanent:', error);
  }
};

// Execute this when the module is imported
initializeAgileBackbonePost().catch(error => {
  console.error('Failed to make Agile Backbone post permanent:', error);
});
