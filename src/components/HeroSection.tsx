import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = memo(() => {
  const { language } = useLanguage();

  const headline =
    language === "it"
      ? "Aiuto le organizzazioni a crescere, performare e trasformarsi attraverso marketing, operations e leadership digitale."
      : "I help organizations grow, perform, and transform through marketing, operations, and digital leadership.";

  const subheadline =
    language === "it"
      ? "Oltre 15 anni in APAC. Fractional CMO, Marketing Consultant e Commercial Advisor per organizzazioni in APAC, Europa e oltre."
      : "15+ years across APAC. Fractional CMO, Marketing Consultant, and Commercial Advisor for organizations across APAC, Europe, and beyond.";

  const ctaPrimary = language === "it" ? "Discuti un'opportunità" : "Discuss an Opportunity";
  const ctaExperience = language === "it" ? "Vedi la mia esperienza" : "View My Experience";
  const ctaServices = language === "it" ? "Esplora i servizi" : "Explore Services";

  return (
    <section
      className="relative px-4 pt-10 pb-12 md:pt-16 md:pb-20"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-6 md:space-y-8 text-center">
          <h1
            id="hero-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-primary max-w-4xl mx-auto"
          >
            {headline}
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto min-w-[200px] bg-[#0a1f44] text-white hover:bg-[#0a1f44]/90"
            >
              <Link to="/contact">{ctaPrimary}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto min-w-[200px] border-[#0a1f44] text-[#0a1f44] hover:bg-[#0a1f44]/5"
            >
              <Link to="/experience">{ctaExperience}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto min-w-[200px] border-[#0a1f44] text-[#0a1f44] hover:bg-[#0a1f44]/5"
            >
              <Link to="/services">{ctaServices}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
