
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import TranslatedText from "./TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";

const CompetenciesSummary = () => {
  const { t } = useLanguage();
  
  const competencies = [
    {
      title: "Strategic Leadership",
      description: "Guiding diverse cross-functional teams and scaling organizations"
    },
    {
      title: "Results-Driven Marketing",
      description: "Developing and executing data-driven strategies with measurable impact"
    },
    {
      title: "Operational Efficiency",
      description: "Streamlining workflows and implementing tools to enhance productivity"
    },
    {
      title: "Business Development",
      description: "Identifying growth opportunities and building strong client relationships"
    },
    {
      title: "Digital Transformation",
      description: "Introducing new technologies including AI to maximize operations"
    },
    {
      title: "Data-Driven Decision-Making",
      description: "Using analytics to measure and optimize business outcomes"
    },
    {
      title: "Sustainability Leadership",
      description: "Guiding efforts to integrate sustainability into business strategy"
    },
    {
      title: "Cross-Cultural Competence",
      description: "Working effectively across diverse markets and multicultural teams"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold mb-8 flex items-center">
          <CheckCircle className="mr-2 h-6 w-6 text-primary" />
          Core Competencies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {competencies.map((competency, index) => (
            <Card key={index} className="bg-gray-50 border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <h3 className="font-bold text-sm text-primary mb-1">{competency.title}</h3>
                <p className="text-sm text-gray-600">{competency.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompetenciesSummary;
