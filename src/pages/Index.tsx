
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProfileImage from "@/components/ProfileImage";
import CoreCompetencies from "@/components/CoreCompetencies";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProfileImage />
        <CoreCompetencies />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
