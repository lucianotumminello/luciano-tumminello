
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProfileImage from "@/components/ProfileImage";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProfileImage />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
