
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
      skills: [
        { key: "skills.marketing.analytics", defaultText: "Google Analytics" },
        { key: "skills.marketing.dataAnalysis", defaultText: "Data Analysis" },
        { key: "skills.marketing.seo", defaultText: "SEO" },
        { key: "skills.marketing.sem", defaultText: "SEM" },
        { key: "skills.marketing.social", defaultText: "Social Media Marketing" },
        { key: "skills.marketing.videoAds", defaultText: "Video Ads" },
        { key: "skills.marketing.displayAds", defaultText: "Display Ads" },
        { key: "skills.marketing.programmatic", defaultText: "Programmatic Advertising" },
        { key: "skills.marketing.digital", defaultText: "Digital Marketing" },
        { key: "skills.marketing.dataStrategies", defaultText: "Data-Driven Marketing Strategies" },
        { key: "skills.marketing.b2b", defaultText: "B2B Marketing" },
        { key: "skills.marketing.b2c", defaultText: "B2C Marketing" },
        { key: "skills.marketing.ai", defaultText: "AI and Automation Proficiency" },
        { key: "skills.marketing.roi", defaultText: "ROI Optimization" }
      ]
    },
    {
      titleKey: "skills.leadership.title",
      icon: <UsersIcon className="h-6 w-6 text-primary" />,
      skills: [
        { key: "skills.leadership.clientRel", defaultText: "Client Relationship Management" },
        { key: "skills.leadership.crossFunc", defaultText: "Cross-Functional Project Leadership" },
        { key: "skills.leadership.international", defaultText: "International Marketing Leadership" },
        { key: "skills.leadership.strategic", defaultText: "Strategic Data-Driven Decision Making" },
        { key: "skills.leadership.team", defaultText: "Team Leadership" },
        { key: "skills.leadership.development", defaultText: "Team Development" },
        { key: "skills.leadership.vision", defaultText: "Strategic Vision" },
        { key: "skills.leadership.change", defaultText: "Change Management" },
        { key: "skills.leadership.emotional", defaultText: "Emotional Intelligence" }
      ]
    },
    {
      titleKey: "skills.operational.title",
      icon: <ListChecksIcon className="h-6 w-6 text-primary" />,
      skills: [
        { key: "skills.operational.optimization", defaultText: "Operational Optimization" },
        { key: "skills.operational.automation", defaultText: "Process Automation" },
        { key: "skills.operational.project", defaultText: "Project Management" },
        { key: "skills.operational.digital", defaultText: "Digital Transformation" },
        { key: "skills.operational.supplyChain", defaultText: "Supply Chain Management" },
        { key: "skills.operational.resource", defaultText: "Resource Allocation" },
        { key: "skills.operational.lean", defaultText: "Lean Methodologies" },
        { key: "skills.operational.workflow", defaultText: "Workflow Optimization" },
        { key: "skills.operational.metrics", defaultText: "Performance Metrics & KPIs" },
        { key: "skills.operational.tech", defaultText: "Technology Integration" }
      ]
    },
    {
      titleKey: "skills.business.title",
      icon: <LightbulbIcon className="h-6 w-6 text-primary" />,
      skills: [
        { key: "skills.business.planning", defaultText: "Strategic Planning" },
        { key: "skills.business.revenue", defaultText: "Revenue Growth" },
        { key: "skills.business.financial", defaultText: "Financial Acumen" },
        { key: "skills.business.market", defaultText: "Market Analysis" },
        { key: "skills.business.budgeting", defaultText: "Budgeting & Cost Control" },
        { key: "skills.business.partnerships", defaultText: "Strategic Partnerships & Alliances" },
        { key: "skills.business.development", defaultText: "Business Development" },
        { key: "skills.business.negotiations", defaultText: "Negotiations" }
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
                    <TranslatedText textKey={category.titleKey} />
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
                      <TranslatedText textKey={skill.key} fallback={skill.defaultText} />
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
