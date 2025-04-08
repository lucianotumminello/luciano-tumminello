
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import TranslatedText from "@/components/TranslatedText";

const Blog = () => {
  const { language } = useLanguage();
  const isItalian = language === "it";
  
  const blogPosts = [
    {
      id: 1,
      title: "The AI Leadership Revolution: How Marketing Executives Are Navigating the 2025 AI Landscape",
      titleIT: "La Rivoluzione della Leadership nell'IA: Come i Dirigenti Marketing Stanno Navigando il Panorama dell'IA nel 2025",
      excerpt: "The AI race is transforming marketing strategies faster than ever before. Here's how forward-thinking leaders are leveraging these advancements to create competitive advantages in 2025.",
      excerptIT: "La corsa all'IA sta trasformando le strategie di marketing più rapidamente che mai. Ecco come i leader lungimiranti stanno sfruttando questi progressi per creare vantaggi competitivi nel 2025.",
      date: "April 7, 2025",
      dateIT: "7 Aprile 2025",
      category: "AI & Marketing",
      categoryIT: "IA & Marketing",
      imageUrl: "/lovable-uploads/fd8fe34b-755d-463d-b6ca-42abd81723f5.png",
      slug: "ai-leadership-revolution"
    },
    {
      id: 2,
      title: "Coming Soon",
      titleIT: "Prossimamente",
      excerpt: "Coming Soon",
      excerptIT: "Prossimamente",
      date: "March 22, 2023",
      dateIT: "22 Marzo 2023",
      category: "UI Design",
      categoryIT: "UI Design",
      imageUrl: "/lovable-uploads/c98a5c59-9ec0-4e2e-9cef-30dde0a7e15b.png"
    },
    {
      id: 3,
      title: "Coming Soon",
      titleIT: "Prossimamente",
      excerpt: "Coming Soon",
      excerptIT: "Prossimamente",
      date: "February 8, 2023",
      dateIT: "8 Febbraio 2023",
      category: "Development",
      categoryIT: "Sviluppo",
      imageUrl: "/lovable-uploads/c98a5c59-9ec0-4e2e-9cef-30dde0a7e15b.png"
    },
    {
      id: 4,
      title: "Coming Soon",
      titleIT: "Prossimamente",
      excerpt: "Coming Soon",
      excerptIT: "Prossimamente",
      date: "January 17, 2023",
      dateIT: "17 Gennaio 2023",
      category: "Design Systems",
      categoryIT: "Sistemi di Design",
      imageUrl: "/lovable-uploads/c98a5c59-9ec0-4e2e-9cef-30dde0a7e15b.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{isItalian ? "Blog | Luciano Tumminello" : "Blog | Luciano Tumminello"}</title>
        <meta 
          name="description" 
          content={isItalian 
            ? "Approfondimenti strategici sulla trasformazione digitale, l'IA e le strategie di marketing basate sui dati di Luciano Tumminello." 
            : "Strategic insights on digital transformation, AI, and data-driven marketing strategies by Luciano Tumminello."} 
        />
        <meta 
          name="keywords" 
          content={isItalian 
            ? "blog marketing, IA nel marketing, trasformazione digitale, strategie basate sui dati, Luciano Tumminello" 
            : "marketing blog, AI in marketing, digital transformation, data-driven strategies, Luciano Tumminello"} 
        />
      </Helmet>
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-lg text-gray-600 mx-auto max-w-3xl text-justify">
              {isItalian 
                ? "Approfondimenti strategici sulla trasformazione digitale, le operazioni globali e il marketing basato sui dati."
                : "Strategic insights on digital transformation, global operations, and data-driven marketing."
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={isItalian ? post.titleIT : post.title} 
                    className="object-cover w-full h-full object-top transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      {isItalian ? post.categoryIT : post.category}
                    </span>
                    <span>•</span>
                    <div className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {isItalian ? post.dateIT : post.date}
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
                    {post.slug ? (
                      <Link to={`/blog/${post.slug}`}>{isItalian ? post.titleIT : post.title}</Link>
                    ) : (
                      isItalian ? post.titleIT : post.title
                    )}
                  </h2>
                  <p className="text-gray-600 mb-4 text-justify">{isItalian ? post.excerptIT : post.excerpt}</p>
                  {post.slug ? (
                    <Link to={`/blog/${post.slug}`} className="text-primary font-medium text-sm hover:underline">
                      {isItalian ? "Leggi di più →" : "Read More →"}
                    </Link>
                  ) : (
                    <span className="text-gray-400 font-medium text-sm">
                      {isItalian ? "Prossimamente..." : "Coming Soon..."}
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
