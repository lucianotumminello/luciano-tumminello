
import { BlogPost } from "@/types";
import beyondPatternRecognition from "@/data/blog-posts/beyond-pattern-recognition";
import aiLeadershipRevolution from "@/data/blog-posts/ai-leadership-revolution";
import comingSoon from "@/data/blog-posts/coming-soon";

interface BlogPostsData {
  [key: string]: BlogPost;
}

const blogPostsData: BlogPostsData = {
  "beyond-pattern-recognition-new-ai-wave": beyondPatternRecognition,
  "ai-leadership-revolution": aiLeadershipRevolution,
  "beyond-pattern-recognition": comingSoon
};

export default blogPostsData;
