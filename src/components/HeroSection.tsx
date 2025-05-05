
import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TranslatedText from "./TranslatedText";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = memo(() => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
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
      className="relative py-16 md:py-24 px-4" 
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-6">
          <p className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto ${isMobile ? 'text-center' : 'text-justify'}`}>
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
