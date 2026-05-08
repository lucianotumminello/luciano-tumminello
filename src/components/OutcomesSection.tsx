import { memo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface OutcomeCard {
  metric: string;
  label: string;
  context: string;
}

const OutcomesSection = memo(() => {
  const { language } = useLanguage();
  const isItalian = language === "it";

  const title = isItalian ? "Cosa Ho Consegnato" : "What I Have Delivered";

  const cards: OutcomeCard[] = isItalian
    ? [
        {
          metric: "60%",
          label: "Aumento del Thought Leadership e Brand Awareness",
          context: "Slow / Krakakoa — marchio sostenibile di caffè e cioccolato, Europa e Indonesia",
        },
        {
          metric: "80%",
          label: "Crescita dei ricavi",
          context: "444 Media — agenzia digitale co-fondata e scalata a 30 dipendenti",
        },
        {
          metric: "35%",
          label: "Miglioramento del click-through rate",
          context: "Greenpeace Southeast Asia — mentor di marketing digitale in quattro paesi ASEAN",
        },
        {
          metric: "20%",
          label: "Aumento dei ricavi online",
          context: "Accor — cluster di 5 hotel in Thailandia",
        },
      ]
    : [
        {
          metric: "60%",
          label: "Thought Leadership and Brand awareness increase",
          context: "Slow / Krakakoa — sustainable coffee and chocolate brand, Europe & Indonesia",
        },
        {
          metric: "80%",
          label: "Revenue growth",
          context: "444 Media — digital agency co-founded and scaled to 30 staff",
        },
        {
          metric: "35%",
          label: "Click-through rate improvement",
          context: "Greenpeace Southeast Asia — digital marketing mentor across four ASEAN countries",
        },
        {
          metric: "20%",
          label: "Online revenue increase",
          context: "Accor — cluster of 5 hotels in Thailand",
        },
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <article
              key={index}
              className="relative rounded-lg border border-border bg-card p-6 md:p-8 border-l-4 border-l-[#0a1f44] shadow-sm"
            >
              <div className="flex flex-col">
                {/* Large metric number */}
                <span className="font-serif text-4xl md:text-5xl font-bold text-[#0a1f44] tracking-tight leading-none">
                  {card.metric}
                </span>

                {/* Label in medium weight */}
                <span className="mt-3 text-base md:text-lg font-medium text-foreground leading-snug">
                  {card.label}
                </span>

                {/* Context in small italic */}
                <span className="mt-2 text-sm italic text-muted-foreground leading-relaxed">
                  {card.context}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

OutcomesSection.displayName = "OutcomesSection";

export default OutcomesSection;
