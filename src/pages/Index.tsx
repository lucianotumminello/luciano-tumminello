
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProfileImage from "@/components/ProfileImage";
import CompetenciesSummary from "@/components/CompetenciesSummary";
import SelectedWork from "@/components/SelectedWork";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProfileImage />
        <CompetenciesSummary />
        <SelectedWork />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
