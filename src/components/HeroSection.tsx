import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = memo(() => {
  const { language } = useLanguage();

  const headline =
    language === "it"
      ? "La leadership di marketing e revenue di cui la tua organizzazione ha bisogno, senza il costo di una struttura interna."
      : "The Marketing and Revenue Leadership Your Organization Needs, Without the Overhead.";

  const subheadline =
    language === "it"
      ? "Aiuto le organizzazioni a crescere, performare e trasformarsi attraverso marketing, operations e leadership digitale."
      : "I help organizations grow, perform, and transform through marketing, operations, and digital leadership.";

  const credentials =
    language === "it"
      ? "Fractional CMO, Marketing Consultant e Commercial Advisor per organizzazioni in APAC, Europa e oltre."
      : "Fractional CMO, Marketing Consultant, and Commercial Advisor for organizations across APAC, Europe, and beyond.";

  const ctaPrimary = language === "it" ? "Discuti un'opportunità" : "Discuss an Opportunity";

  return (
    <section
      className="relative px-4 pt-10 pb-12 md:pt-16 md:pb-20"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-5 md:space-y-7 text-center">
          <h1
            id="hero-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-primary max-w-4xl mx-auto"
          >
            {headline}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          <p className="text-sm md:text-base text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            {credentials}
          </p>

          <div className="pt-2 flex justify-center">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto min-w-[220px] bg-[#0a1f44] text-white hover:bg-[#0a1f44]/90"
            >
              <Link to="/contact">{ctaPrimary}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
