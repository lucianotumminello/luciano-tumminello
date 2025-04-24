
import React from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";

interface EducationDegreeProps {
  degree: {
    key: string;
    titleKey: string;
    englishTitle: string;
    institutionKey: string;
    locationKey: string;
    periodKey: string;
    descKey: string;
  };
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const EducationDegree: React.FC<EducationDegreeProps> = ({
  degree,
  isOpen,
  onOpenChange,
}) => {
  const { language } = useLanguage();

  const getDegreeTitle = (translationKey: string, englishTitle: string) => {
    if (language === "en") {
      return englishTitle;
    }
    return <TranslatedText textKey={translationKey} />;
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onOpenChange}
      className="mb-4 last:mb-0 border-b last:border-b-0 bg-white rounded-xl shadow-sm"
    >
      <CollapsibleTrigger className="w-full flex justify-between items-center px-4 py-3 text-left font-bold text-lg text-primary shadow-sm border border-gray-100 bg-gray-50 hover:bg-gray-100 rounded-t-xl transition-colors focus:outline-none">
        <div>
          {getDegreeTitle(degree.titleKey, degree.englishTitle)}
          <span className="block text-base font-medium mt-1">
            <TranslatedText textKey={degree.institutionKey} />
            <span className="ml-2 text-muted-foreground text-xs">
              <TranslatedText textKey={degree.locationKey} />
            </span>
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-3">
          <span className="text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full h-6 inline-flex items-center justify-center text-center mb-2 w-fit">
            <TranslatedText textKey={degree.periodKey} />
          </span>
          <p className="text-muted-foreground text-justify mt-1">
            <TranslatedText textKey={degree.descKey} />
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default EducationDegree;
