
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, FileTextIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TranslatedText from "./TranslatedText";
import { memo, useCallback } from "react";

const HeroSection = memo(() => {
  const { t } = useLanguage();
  
  const scrollToProfile = useCallback(() => {
    const profileSection = document.querySelector('section:nth-of-type(2)');
    if (profileSection) {
      profileSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section className="relative py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-primary uppercase text-center">
            <TranslatedText textKey="home.title" />
          </h2>
        </div>
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center text-justify">
            <TranslatedText textKey="home.subtitle" />
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              onClick={scrollToProfile}
              size="lg" 
              className="min-w-[160px]"
            >
              <TranslatedText textKey="home.expertise" />
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            </Button>
            <a href="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="min-w-[160px] group"
              >
                <TranslatedText textKey="home.viewResume" />
                <FileTextIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="h-20 w-px bg-gradient-to-b from-transparent to-gray-200"></div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
