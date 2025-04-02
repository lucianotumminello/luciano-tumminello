
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, FileTextIcon } from "lucide-react";

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
        <div className="text-center md:text-left mb-8">
          <h2 className="text-xl md:text-2xl font-medium tracking-wide text-primary uppercase">
            MARKETING & OPERATIONS LEADER
          </h2>
        </div>
        <div className="space-y-6 text-center md:text-left">
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
            15+ years driving growth across Asia-Pacific with expertise in operations, 
            marketing, and digital transformation. Currently leading strategic initiatives 
            at Spartan Health in the health and wellness industry.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              onClick={scrollToWork}
              size="lg" 
              className="min-w-[160px]"
            >
              My Expertise
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            </Button>
            <a href="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="min-w-[160px] group"
              >
                View Resume
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
};

export default HeroSection;
