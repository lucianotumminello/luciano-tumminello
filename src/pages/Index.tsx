
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ValuePropositionCards from "@/components/ValuePropositionCards";
import CredibilityStrip from "@/components/CredibilityStrip";
import OutcomesSection from "@/components/OutcomesSection";
import SectorBreadth from "@/components/SectorBreadth";
import ProfileImage from "@/components/ProfileImage";
import CompetenciesSummary from "@/components/CompetenciesSummary";
import SelectedWorkPreview from "@/components/SelectedWorkPreview";
import Testimonials from "@/components/Testimonials";

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
        <HeroSection />
        <ProfileImage />
        <ValuePropositionCards />
        <CredibilityStrip />
        <OutcomesSection />
        <SectorBreadth />
        <SelectedWorkPreview />
        <Testimonials />

        {/* Conversion CTA block */}
        <section className="py-16 md:py-20 px-4 bg-[#0a1f44]">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-5">
              Let's discuss how I can help your organization grow.
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether you're exploring a fractional CMO engagement, a consulting project, or a commercial advisory partnership, I'd be glad to talk.
            </p>
            <div className="flex justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md bg-white text-[#0a1f44] hover:bg-gray-100 px-8 py-4 text-base font-semibold transition-colors min-w-[220px]"
              >
                Discuss an Opportunity
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
