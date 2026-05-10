
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import TranslatedText from "./TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";

const CompetenciesSummary = () => {
  const { t } = useLanguage();
  
  const competencies = [
    {
      titleKey: "competencies.strategic",
      descriptionKey: "competencies.strategic.desc"
    },
    {
      titleKey: "competencies.marketing",
      descriptionKey: "competencies.marketing.desc"
    },
    {
      titleKey: "competencies.operational",
      descriptionKey: "competencies.operational.desc"
    },
    {
      titleKey: "competencies.business",
      descriptionKey: "competencies.business.desc"
    },
    {
      titleKey: "competencies.digital",
      descriptionKey: "competencies.digital.desc"
    },
    {
      titleKey: "competencies.data",
      descriptionKey: "competencies.data.desc"
    },
    {
      titleKey: "competencies.sustainability",
      descriptionKey: "competencies.sustainability.desc"
    },
    {
      titleKey: "competencies.cultural",
      descriptionKey: "competencies.cultural.desc"
    }
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center">
          <CheckCircle className="mr-3 h-7 w-7 text-primary" />
          <TranslatedText textKey="competencies.title" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
          {competencies.map((competency, index) => (
            <Card key={index} className="bg-gray-50 border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-7 md:p-8">
                <h3 className="font-bold text-lg md:text-xl text-primary mb-3">
                  <TranslatedText textKey={competency.titleKey} />
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  <TranslatedText textKey={competency.descriptionKey} />
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompetenciesSummary;
