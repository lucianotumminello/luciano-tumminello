import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const ValuePropositionCards = memo(() => {
  const { language } = useLanguage();
  const isItalian = language === "it";

  const leftCard = {
    headline: isItalian ? "Cosa offro" : "What I deliver",
    subheadline: isItalian
      ? "Competenza marketing senior, senza il costo di un ruolo full-time."
      : "Senior marketing expertise, without the full time overhead.",
    body: isItalian
      ? "Accetto un numero limitato di incarichi come fractional CMO, consulente e advisor. Ogni progetto riceve attenzione autentica a livello senior, non delegato a terzi."
      : "I take on a small number of fractional CMO, consulting, and advisory engagements each year. Each one gets genuine senior attention, not delegated delivery.",
    cta: isItalian ? "Esplora i servizi" : "Explore Services",
    ctaLink: "/services",
  };

  const rightCard = {
    headline: isItalian ? "Con chi lavoro" : "Who I work with",
    subheadline: isItalian
      ? "Organizzazioni che vogliono crescere, trasformarsi o performare meglio."
      : "Organizations that want to grow, transform, or perform better.",
    body: isItalian
      ? "Brand consumer, business dell'ospitalità, ONG e organizzazioni B2B in APAC, Europa e oltre. Dalla strategia all'esecuzione."
      : "Consumer brands, hospitality businesses, NGOs, and B2B organizations across APAC, Europe, and beyond. From strategy to execution.",
    cta: isItalian ? "Vedi i progetti" : "View Selected Work",
    ctaLink: "/selected-work",
  };

  return (
    <section className="px-4 pb-12 md:pb-20" aria-label={isItalian ? "Proposta di valore" : "Value proposition"}>
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left card — accent border */}
          <article className="relative flex flex-col h-full rounded-lg border border-border bg-card p-8 md:p-10 border-l-4 border-l-primary shadow-sm">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-card-foreground">
                {leftCard.headline}
              </h2>
              <p className="mt-3 text-base md:text-lg font-medium text-muted-foreground leading-relaxed">
                {leftCard.subheadline}
              </p>
              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                {leftCard.body}
              </p>
            </div>
            <div className="mt-8">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto min-w-[180px] border-primary text-primary hover:bg-primary/5"
              >
                <Link to={leftCard.ctaLink}>{leftCard.cta}</Link>
              </Button>
            </div>
          </article>

          {/* Right card — secondary background */}
          <article className="relative flex flex-col h-full rounded-lg border border-border bg-secondary p-8 md:p-10 shadow-sm">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-secondary-foreground">
                {rightCard.headline}
              </h2>
              <p className="mt-3 text-base md:text-lg font-medium text-muted-foreground leading-relaxed">
                {rightCard.subheadline}
              </p>
              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                {rightCard.body}
              </p>
            </div>
            <div className="mt-8">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto min-w-[180px] border-primary text-primary hover:bg-primary/5"
              >
                <Link to={rightCard.ctaLink}>{rightCard.cta}</Link>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
});

ValuePropositionCards.displayName = "ValuePropositionCards";

export default ValuePropositionCards;
