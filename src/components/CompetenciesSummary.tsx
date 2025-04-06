
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
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold mb-8 flex items-center">
          <CheckCircle className="mr-2 h-6 w-6 text-primary" />
          <TranslatedText textKey="competencies.title" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {competencies.map((competency, index) => (
            <Card key={index} className="bg-gray-50 border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <h3 className="font-bold text-sm text-primary mb-1">
                  <TranslatedText textKey={competency.titleKey} />
                </h3>
                <p className="text-sm text-gray-600">
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
