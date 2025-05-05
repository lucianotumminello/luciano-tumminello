
import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TranslatedText from "./TranslatedText";
import { memo, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = memo(() => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Add visibility effect for smoother rendering
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timeoutId);
  }, []);
  
  const scrollToCompetencies = useCallback(() => {
    const competenciesSection = document.getElementById('core-competencies');
    if (competenciesSection) {
      competenciesSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const navigateToCareer = useCallback(() => {
    navigate('/career');
  }, [navigate]);

  return (
    <section 
      className={`relative py-12 md:py-20 px-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-labelledby="hero-heading"
      style={{ willChange: "opacity" }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-6">
          <p className={`text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto ${isMobile ? 'text-center' : 'text-justify'}`}>
            <TranslatedText textKey="home.subtitle" />
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              onClick={scrollToCompetencies}
              size="lg" 
              className="min-w-[160px]"
              aria-label={t("home.expertise")}
            >
              <TranslatedText textKey="home.expertise" />
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={navigateToCareer}
              className="min-w-[160px]"
              aria-label={t("home.professionalJourney")}
            >
              <TranslatedText textKey="home.professionalJourney" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="h-16 w-px bg-gradient-to-b from-transparent to-gray-200"></div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
