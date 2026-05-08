import { memo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const SectorBreadth = memo(() => {
  const { language } = useLanguage();
  const isItalian = language === "it";

  const title = isItalian
    ? "Settori in Cui Ho Lavorato"
    : "Industries I Have Worked Across";

  const industries = isItalian
    ? [
        "Ospitalità e Viaggi di Lusso",
        "Brand di Consumo Sostenibili",
        "ONG e Organizzazioni Mission-Driven",
        "Agenzie Digitali",
        "Salute e Benessere",
        "Retail ed Ecommerce",
        "Tecnologia B2B",
        "Food and Beverage",
        "Servizi Finanziari",
        "Telco",
        "Compagnie Aeree",
        "eCommerce",
        "Automotive",
        "Real Estate e Immobiliare",
        "e molti altri",
      ]
    : [
        "Luxury Hospitality and Travel",
        "Sustainable Consumer Brands",
        "NGOs and Mission Driven Organizations",
        "Digital Agencies",
        "Health and Wellness",
        "Retail and Ecommerce",
        "B2B Technology",
        "Food and Beverage",
        "Financial Services",
        "Telco",
        "Airlines",
        "eCommerce",
        "Automotive",
        "Real Estate and Property",
        "and many more",
      ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white" aria-label={title}>
      <div className="container mx-auto max-w-5xl">
        {/* Section title with underline accent */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight inline-block">
            {title}
            <span className="block mt-2 h-0.5 w-16 bg-[#0a1f44] rounded-full" />
          </h2>
        </div>

        {/* Industry tiles grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-14 rounded-full border border-[#0a1f44]/15 bg-[#f8f9fc] px-4 text-center text-sm font-medium text-[#0a1f44] leading-tight transition-colors hover:bg-[#0a1f44]/5"
            >
              <span className="line-clamp-2">{industry}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

SectorBreadth.displayName = "SectorBreadth";

export default SectorBreadth;
