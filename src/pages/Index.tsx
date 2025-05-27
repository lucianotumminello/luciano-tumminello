
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProfileImage from "@/components/ProfileImage";
import CompetenciesSummary from "@/components/CompetenciesSummary";
import TranslatedText from "@/components/TranslatedText";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Index = () => {
  // The URL to the image that will be used for social media sharing
  const shareImageUrl = "/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png";
  const pageUrl = "https://www.lucianotumminello.com/";
  
  // Structured data for the homepage
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Luciano Tumminello",
    "jobTitle": "Chief Operating Officer",
    "worksFor": {
      "@type": "Organization",
      "name": "Spartan Health"
    },
    "description": "Marketing & Operations Leader with expertise in digital transformation and data-driven strategies across APAC.",
    "image": `https://www.lucianotumminello.com${shareImageUrl}`,
    "url": pageUrl,
    "sameAs": [
      "https://linkedin.com/in/lucianotumminello",
      "https://twitter.com/luciano_tumminello"
    ],
    "knowsAbout": [
      "Digital Marketing",
      "Operations Management",
      "Strategic Planning",
      "Data Analytics",
      "Team Leadership"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>Luciano Tumminello | Marketing & Operations Leader</title>
        <meta name="description" content="Seasoned Marketing & Operations Leader with extensive experience in digital transformation, global operations, and data-driven marketing strategies across APAC." />
        <meta name="keywords" content="Luciano Tumminello, Chief Operating Officer, COO, Marketing Leader, Digital Transformation, Operations, APAC, Strategic Planning, Data-Driven Marketing" />
        <link rel="canonical" href={pageUrl} />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Luciano Tumminello | Marketing & Operations Leader" />
        <meta property="og:description" content="Seasoned Marketing & Operations Leader with extensive experience in digital transformation and data-driven strategies across APAC." />
        <meta property="og:image" content={`https://www.lucianotumminello.com${shareImageUrl}`} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Luciano Tumminello" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@luciano_tumminello" />
        <meta name="twitter:title" content="Luciano Tumminello | Marketing & Operations Leader" />
        <meta name="twitter:description" content="Seasoned Marketing & Operations Leader with extensive experience in digital transformation and data-driven strategies across APAC." />
        <meta name="twitter:image" content={`https://www.lucianotumminello.com${shareImageUrl}`} />
        
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>
      <Header />
      <main className="flex-1">
        {/* H1 heading */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-primary uppercase text-center py-8">
          <TranslatedText textKey="home.title" />
        </h1>
        <HeroSection />
        <ProfileImage />
        <section id="core-competencies">
          <CompetenciesSummary />
        </section>
        
        {/* Explore More section with proper translations */}
        <section className="py-8 px-4 bg-gray-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              <TranslatedText textKey="explore.title" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  <TranslatedText textKey="explore.professional.title" />
                </h3>
                <p className="text-gray-600 mb-4">
                  <TranslatedText textKey="explore.professional.description" />
                </p>
                <Link to="/career" className="text-primary font-medium hover:underline">
                  <TranslatedText textKey="explore.professional.cta" />
                </Link>
              </div>
              <div className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  <TranslatedText textKey="explore.education.title" />
                </h3>
                <p className="text-gray-600 mb-4">
                  <TranslatedText textKey="explore.education.description" />
                </p>
                <Link to="/education" className="text-primary font-medium hover:underline">
                  <TranslatedText textKey="explore.education.cta" />
                </Link>
              </div>
              <div className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="text-xl font-medium mb-2">
                  <TranslatedText textKey="explore.insights.title" />
                </h3>
                <p className="text-gray-600 mb-4">
                  <TranslatedText textKey="explore.insights.description" />
                </p>
                <Link to="/blog" className="text-primary font-medium hover:underline">
                  <TranslatedText textKey="explore.insights.cta" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
