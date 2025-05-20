
import { BlogPostsStore } from "./types";
import beyondRecognitionPost from "./initialBlogPosts/beyondRecognitionPost";
import { agileBackbonePost } from "./initialBlogPosts/agileBackbonePost";
import { humanTechEquationPost } from "./initialBlogPosts/humanTechEquationPost";

const initialBlogPosts: BlogPostsStore = {
  // The Agile Backbone post - May 20th, 2025
  "the-agile-backbone-building-resilient-adaptive-operational-models": agileBackbonePost,
  
  // The Human + Tech Equation post - May 16th, 2025
  "human-tech-equation-empowering-workforce-digital-transformation": humanTechEquationPost,
  
  // Beyond Recognition post - April 17th, 2025
  "beyond-technology-cultural-transformation-required-for-successful-ai-integration": beyondRecognitionPost
};

export default initialBlogPosts;
