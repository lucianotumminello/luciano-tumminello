import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TranslatedText from "@/components/TranslatedText";
import { useIsMobile } from "@/hooks/use-mobile";
import DegreeCollapsible from "./DegreeCollapsible";
import { useLanguage } from "@/contexts/LanguageContext";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

const degrees = [
  {
    key: "commerce",
    titleKey: "education.masters.commerce.title",
    englishTitle: "Master of Commerce",
    institutionKey: "education.masters.commerce.institution",
    locationKey: "education.masters.commerce.location",
    periodKey: "education.masters.commerce.period",
    descKey: "education.masters.commerce.description"
  },
  {
    key: "advertising",
    titleKey: "education.masters.advertising.title",
    englishTitle: "Master of Advertising",
    institutionKey: "education.masters.advertising.institution",
    locationKey: "education.masters.advertising.location",
    periodKey: "education.masters.advertising.period",
    descKey: "education.masters.advertising.description"
  },
  {
    key: "relations",
    titleKey: "education.bachelors.relations.title",
    englishTitle: "Bachelor of International Relations",
    institutionKey: "education.bachelors.relations.institution",
    locationKey: "education.bachelors.relations.location",
    periodKey: "education.bachelors.relations.period",
    descKey: "education.bachelors.relations.description"
  },
  {
    key: "communications",
    titleKey: "education.bachelors.communications.title",
    englishTitle: "Bachelor of International Communications",
    institutionKey: "education.bachelors.communications.institution",
    locationKey: "education.bachelors.communications.location",
    periodKey: "education.bachelors.communications.period",
    descKey: "education.bachelors.communications.description"
  },
];

const UniversityEducation = () => {
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const [open, setOpen] = useState(
    Object.fromEntries(degrees.map((d) => [d.key, false]))
  );

  // Helper function to get the English titles if language is English
  const getDegreeTitle = (translationKey: string, englishTitle: string) => {
    if (language === "en") {
      return englishTitle;
    }
    return <TranslatedText textKey={translationKey} />;
  };

  // Collapsible for desktop
  if (!isMobile) {
    return (
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle>
            <TranslatedText textKey="education.university.title" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {degrees.map((deg, idx) => (
            <Collapsible
              key={deg.key}
              open={open[deg.key]}
              onOpenChange={() =>
                setOpen((prev) => ({ ...prev, [deg.key]: !prev[deg.key] }))
              }
              className="mb-4 last:mb-0 border-b last:border-b-0 bg-gradient-to-br from-white via-[#D3E4FD]/70 to-[#F2FCE2]/80 rounded-xl"
            >
              <CollapsibleTrigger className="w-full flex justify-between items-center px-4 py-3 text-left font-bold text-lg text-primary shadow-sm border border-gray-100 bg-primary/10 hover:bg-primary/20 rounded-t-xl transition-colors focus:outline-none">
                <div>
                  {getDegreeTitle(deg.titleKey, deg.englishTitle)}
                  <span className="block text-base font-medium mt-1">
                    <TranslatedText textKey={deg.institutionKey} />
                    <span className="ml-2 text-muted-foreground text-xs">
                      <TranslatedText textKey={deg.locationKey} />
                    </span>
                  </span>
                </div>
                {open[deg.key] ? (
                  <ChevronUp className="w-5 h-5 text-secondary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-secondary" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-3">
                  <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full h-6 inline-flex items-center justify-center text-center mb-2 w-fit">
                    <TranslatedText textKey={deg.periodKey} />
                  </span>
                  <p className="text-muted-foreground text-justify mt-1">
                    <TranslatedText textKey={deg.descKey} />
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Mobile - keep old collapsible
  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <CardTitle>
          <TranslatedText textKey="education.university.title" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <DegreeCollapsible
          title={getDegreeTitle("education.masters.commerce.title", "Master of Commerce")}
          summary={
            <>
              <TranslatedText textKey="education.masters.commerce.institution" />
              <span className="block text-muted-foreground text-xs">
                <TranslatedText textKey="education.masters.commerce.location" />
              </span>
            </>
          }
          period={<TranslatedText textKey="education.masters.commerce.period" />}
        >
          <TranslatedText textKey="education.masters.commerce.description" />
        </DegreeCollapsible>
        <DegreeCollapsible
          title={getDegreeTitle("education.masters.advertising.title", "Master of Advertising")}
          summary={
            <>
              <TranslatedText textKey="education.masters.advertising.institution" />
              <span className="block text-muted-foreground text-xs">
                <TranslatedText textKey="education.masters.advertising.location" />
              </span>
            </>
          }
          period={<TranslatedText textKey="education.masters.advertising.period" />}
        >
          <TranslatedText textKey="education.masters.advertising.description" />
        </DegreeCollapsible>
        <DegreeCollapsible
          title={getDegreeTitle("education.bachelors.relations.title", "Bachelor of International Relations")}
          summary={
            <>
              <TranslatedText textKey="education.bachelors.relations.institution" />
              <span className="block text-muted-foreground text-xs">
                <TranslatedText textKey="education.bachelors.relations.location" />
              </span>
            </>
          }
          period={<TranslatedText textKey="education.bachelors.relations.period" />}
        >
          <TranslatedText textKey="education.bachelors.relations.description" />
        </DegreeCollapsible>
        <DegreeCollapsible
          title={getDegreeTitle("education.bachelors.communications.title", "Bachelor of International Communications")}
          summary={
            <>
              <TranslatedText textKey="education.bachelors.communications.institution" />
              <span className="block text-muted-foreground text-xs">
                <TranslatedText textKey="education.bachelors.communications.location" />
              </span>
            </>
          }
          period={<TranslatedText textKey="education.bachelors.communications.period" />}
        >
          <TranslatedText textKey="education.bachelors.communications.description" />
        </DegreeCollapsible>
      </CardContent>
    </Card>
  );
};

export default UniversityEducation;
