import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TranslatedText from "@/components/TranslatedText";
import { useIsMobile } from "@/hooks/use-mobile";
import DegreeCollapsible from "./DegreeCollapsible";
import { useLanguage } from "@/contexts/LanguageContext";
import EducationDegree from "./EducationDegree";

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
  const [openDegrees, setOpenDegrees] = useState<Record<string, boolean>>(
    Object.fromEntries(degrees.map((d) => [d.key, false]))
  );

  const handleDegreeToggle = (degreeKey: string) => {
    setOpenDegrees((prev) => ({
      ...prev,
      [degreeKey]: !prev[degreeKey],
    }));
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100">
      <CardHeader className="bg-gray-50 border-b border-gray-100">
        <CardTitle>
          <TranslatedText textKey="education.university.title" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {degrees.map((degree) => (
          <EducationDegree
            key={degree.key}
            degree={degree}
            isOpen={openDegrees[degree.key]}
            onOpenChange={() => handleDegreeToggle(degree.key)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default UniversityEducation;
