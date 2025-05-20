
import { BlogPostsStore } from './types';
import beyondRecognitionPost from './initialBlogPosts/beyondRecognitionPost';
import humanTechEquationPost from './initialBlogPosts/humanTechEquationPost';
import agileBackbonePost from './initialBlogPosts/agileBackbonePost';

// Initial blog posts data with both posts
const initialBlogPosts: BlogPostsStore = {
  'beyond-recognition': beyondRecognitionPost,
  'human-tech-equation': humanTechEquationPost,
  'agile-backbone-operational-models': agileBackbonePost
};

export default initialBlogPosts;
