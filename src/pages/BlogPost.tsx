
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarIcon, Clock, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

// Mock blog post data - in a real app, this would come from an API or CMS
const blogPostsData = {
  "ai-leadership-revolution": {
    title: "The AI Leadership Revolution: How Marketing Executives Are Navigating the 2025 AI Landscape",
    excerpt: "The AI race is transforming marketing strategies faster than ever before. Here's how forward-thinking leaders are leveraging these advancements to create competitive advantages in 2025.",
    content: `
      <p class="lead">As we navigate through 2025, artificial intelligence has firmly established itself as the defining technology reshaping how marketing teams operate, strategize, and deliver value.</p>
      
      <p>The past year has witnessed an unprecedented acceleration in AI adoption across marketing departments globally. No longer relegated to experimental initiatives, AI now powers core marketing functions from content creation to customer journey optimization and predictive analytics.</p>
      
      <h2>The New Marketing Leadership Paradigm</h2>
      
      <p>The most successful marketing executives in 2025 share a common trait: they've embraced AI not merely as a tool but as a strategic partner. This shift represents more than technological adoption—it's a fundamental rethinking of how marketing leadership functions.</p>
      
      <p>"The AI revolution has transformed what it means to be an effective marketing leader," explains Dr. Sarah Chen, Chief Marketing Officer at Horizon Innovations. "Today's CMOs need to be part technologist, part strategist, and part ethicist—understanding not just what AI can do, but how to deploy it responsibly while maintaining the human creativity that drives breakthrough brand moments."</p>
      
      <h2>Key AI Applications Transforming Marketing in 2025</h2>
      
      <ol>
        <li><strong>Hyper-personalization at scale:</strong> AI systems now process billions of customer data points in real-time, enabling truly individualized experiences that evolve with each interaction.</li>
        <li><strong>Predictive customer journey mapping:</strong> Beyond responding to customer behaviors, leading marketing teams now anticipate needs before customers themselves recognize them.</li>
        <li><strong>Automated creative optimization:</strong> AI doesn't just generate content—it continuously tests, learns, and refines creative assets across channels without human intervention.</li>
        <li><strong>Real-time market intelligence:</strong> AI-powered systems monitor competitor activities, market shifts, and emerging trends with unprecedented accuracy and speed.</li>
      </ol>
      
      <h2>Overcoming Implementation Challenges</h2>
      
      <p>Despite the clear advantages, many organizations continue to struggle with AI implementation. The most common barriers include data fragmentation, talent shortages, and integration challenges with legacy systems.</p>
      
      <p>Forward-thinking companies are addressing these challenges through dedicated AI centers of excellence, strategic partnerships with specialized vendors, and comprehensive upskilling programs for existing marketing teams.</p>
      
      <h2>The Human Element Remains Critical</h2>
      
      <p>While AI handles increasingly sophisticated marketing functions, the human element remains irreplaceable. The most successful organizations maintain a careful balance—leveraging AI for scalability, efficiency, and data processing while relying on human creativity, emotional intelligence, and ethical judgment.</p>
      
      <p>"We've found the sweet spot isn't about replacing people with AI, but rather freeing marketers from repetitive tasks so they can focus on strategic thinking and creative problem-solving," notes Marcus Johnson, VP of Digital Transformation at Global Brands Group.</p>
      
      <h2>Looking Ahead: The Next Frontier</h2>
      
      <p>As we look toward late 2025 and beyond, several emerging trends are poised to further transform marketing leadership:</p>
      
      <ul>
        <li>AI systems that not only execute but help formulate marketing strategy</li>
        <li>Deeper integration between marketing and product development through AI-powered feedback loops</li>
        <li>Enhanced privacy-preserving AI that delivers personalization while respecting evolving data regulations</li>
        <li>More sophisticated sentiment analysis that captures subtle emotional responses to marketing initiatives</li>
      </ul>
      
      <p>The marketing executives who thrive in this rapidly evolving landscape will be those who view AI not as a threat but as an opportunity to elevate their teams' capabilities and redefine what's possible in customer engagement and brand building.</p>
      
      <p>As we've seen throughout this transformation, technology changes rapidly, but the fundamental goal of marketing remains constant: connecting with customers in meaningful ways that drive sustainable business growth.</p>
    `,
    author: "Luciano Tumminello",
    date: "April 7, 2025",
    category: "AI & Marketing",
    imageUrl: "/lovable-uploads/1db0010c-c081-459d-b696-8806b76cd0b5.png",
    readingTime: "8 min read",
    tags: ["Artificial Intelligence", "Marketing Strategy", "Digital Transformation", "Leadership"]
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? blogPostsData[slug] : null;
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog">
              <Button>Return to Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{post.title} | Luciano Tumminello</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.imageUrl} />
      </Helmet>
      
      <Header />
      
      <main className="flex-1 pt-8 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="flex items-center space-x-3 text-sm text-gray-500 mb-4">
              <span className="bg-gray-100 px-3 py-1 rounded-full">{post.category}</span>
              <div className="flex items-center">
                <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {post.readingTime}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>
            
            <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
          </div>
          
          <div className="rounded-lg overflow-hidden mb-10">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <article className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </article>
          
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
              
              <Button variant="outline" className="flex items-center">
                <Share2 className="h-4 w-4 mr-2" />
                Share This Post
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
