
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChartIcon, UsersIcon, ListChecksIcon, LightbulbIcon } from "lucide-react";
import TranslatedText from "./TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";

const CoreCompetencies = () => {
  const { t } = useLanguage();
  
  const skillCategories = [
    {
      titleKey: "skills.marketing.title",
      icon: <BarChartIcon className="h-6 w-6 text-primary" />,
      displayTitle: t("skills.marketing.title") || "Marketing & Growth Skills",
      skills: [
        "Google Analytics",
        "Data Analysis",
        "SEO",
        "SEM",
        "Social Media Marketing",
        "Video Ads",
        "Display Ads",
        "Programmatic Advertising",
        "Digital Marketing",
        "Data-Driven Marketing Strategies",
        "B2B Marketing",
        "B2C Marketing",
        "AI and Automation Proficiency",
        "ROI Optimization"
      ]
    },
    {
      titleKey: "skills.leadership.title",
      icon: <UsersIcon className="h-6 w-6 text-primary" />,
      displayTitle: t("skills.leadership.title") || "Strategic Leadership Skills",
      skills: [
        "Client Relationship Management",
        "Cross-Functional Project Leadership",
        "International Marketing Leadership",
        "Strategic Data-Driven Decision Making",
        "Team Leadership",
        "Team Development",
        "Strategic Vision",
        "Change Management",
        "Emotional Intelligence"
      ]
    },
    {
      titleKey: "skills.operational.title",
      icon: <ListChecksIcon className="h-6 w-6 text-primary" />,
      displayTitle: t("skills.operational.title") || "Operational Efficiency Skills",
      skills: [
        "Operational Optimization",
        "Process Automation",
        "Project Management",
        "Digital Transformation",
        "Supply Chain Management",
        "Resource Allocation",
        "Lean Methodologies",
        "Workflow Optimization",
        "Performance Metrics & KPIs",
        "Technology Integration"
      ]
    },
    {
      titleKey: "skills.business.title",
      icon: <LightbulbIcon className="h-6 w-6 text-primary" />,
      displayTitle: t("skills.business.title") || "Business Strategy & Financial Skills",
      skills: [
        "Strategic Planning",
        "Revenue Growth",
        "Financial Acumen",
        "Market Analysis",
        "Budgeting & Cost Control",
        "Strategic Partnerships & Alliances",
        "Business Development",
        "Negotiations"
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">
            <TranslatedText textKey="skills.section.title" />
          </h2>
          <Separator className="w-32 h-1 mx-auto mt-5 mb-12 bg-primary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="border shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <CardHeader className="pb-4 bg-gray-50">
                <div className="flex items-center gap-3">
                  {category.icon}
                  <CardTitle className="text-xl text-gray-800">
                    {category.displayTitle}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-6 bg-white">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex}
                      variant="outline"
                      className="bg-gray-50 hover:bg-gray-100 text-gray-700 py-1.5 px-3 font-medium border border-gray-200 rounded-full"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreCompetencies;
