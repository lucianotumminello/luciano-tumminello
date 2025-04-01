
import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react";

const HeroSection = () => {
  const scrollToWork = () => {
    const workSection = document.getElementById("selected-work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            <span className="block">Hello, I'm Luciano Tumminello</span>
            <span className="text-primary">Marketing & Operations Expert</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
            I help businesses optimize their marketing strategies and streamline operations to drive growth and maximize efficiency.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="min-w-[160px]">
              View Portfolio
            </Button>
            <Button 
              onClick={scrollToWork}
              variant="outline" 
              size="lg" 
              className="min-w-[160px] group"
            >
              Services
              <ArrowDownIcon className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="h-20 w-px bg-gradient-to-b from-transparent to-gray-200"></div>
      </div>
    </section>
  );
};

export default HeroSection;
