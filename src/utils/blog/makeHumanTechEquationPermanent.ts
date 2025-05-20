
import { makeBlogPostPermanent } from './blogPostOperations';

// This script ensures the Human + Tech Equation blog post is permanently available
const initializeHumanTechEquationPost = async () => {
  try {
    console.log('Initializing "Human + Tech Equation" post as permanent...');
    const temporarySlug = 'human-tech-equation-empowering-workforce-digital-transformation';
    const permanentSlug = 'human-tech-equation-empowering-workforce-digital-transformation';
    
    await makeBlogPostPermanent(temporarySlug, permanentSlug, true);
    console.log('Successfully set "Human + Tech Equation" post as permanent');
  } catch (error) {
    console.error('Error making "Human + Tech Equation" post permanent:', error);
  }
};

// Execute this when the module is imported
initializeHumanTechEquationPost().catch(error => {
  console.error('Failed to make Human + Tech Equation post permanent:', error);
});
