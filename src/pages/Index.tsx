
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProfileImage from "@/components/ProfileImage";
import CompetenciesSummary from "@/components/CompetenciesSummary";
import { Helmet } from "react-helmet-async";

const Index = () => {
  // The URL to the image that will be used for social media sharing
  const shareImageUrl = "/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png";
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <meta property="og:image" content={`https://lucianotumminello.com${shareImageUrl}`} />
        <meta name="twitter:image" content={`https://lucianotumminello.com${shareImageUrl}`} />
      </Helmet>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProfileImage />
        <CompetenciesSummary />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
