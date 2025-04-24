
import React from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  const getDegreeTitle = (translationKey: string, englishTitle: string) => {
    if (language === "en") {
      return englishTitle;
    }
    return <TranslatedText textKey={translationKey} />;
  };

  const renderPeriod = () => (
    <span className="text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full h-6 inline-flex items-center justify-center">
      <TranslatedText textKey={degree.periodKey} />
    </span>
  );

  if (isMobile) {
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={onOpenChange}
        className="mb-4 last:mb-0 border-b last:border-b-0"
      >
        <CollapsibleTrigger className="w-full flex justify-between items-center px-4 py-3 text-left font-bold text-lg text-primary shadow-sm border border-gray-100 bg-gray-50 hover:bg-gray-100 rounded-t-xl transition-colors focus:outline-none">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              {getDegreeTitle(degree.titleKey, degree.englishTitle)}
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </div>
            <div className="text-base font-medium mt-1">
              <TranslatedText textKey={degree.institutionKey} />
              <span className="ml-2 text-muted-foreground text-xs">
                <TranslatedText textKey={degree.locationKey} />
              </span>
            </div>
            <div className="mt-2 self-start">
              {renderPeriod()}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-3">
            <p className="text-muted-foreground text-justify mt-3">
              <TranslatedText textKey={degree.descKey} />
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onOpenChange}
      className="mb-4 last:mb-0 border-b last:border-b-0 bg-white rounded-xl shadow-sm"
    >
      <CollapsibleTrigger className="w-full flex justify-between items-center px-4 py-3 text-left font-bold text-lg text-primary shadow-sm border border-gray-100 bg-gray-50 hover:bg-gray-100 rounded-t-xl transition-colors focus:outline-none">
        <div className="flex justify-between items-center w-full">
          <div>
            {getDegreeTitle(degree.titleKey, degree.englishTitle)}
            <span className="block text-base font-medium mt-1">
              <TranslatedText textKey={degree.institutionKey} />
              <span className="ml-2 text-muted-foreground text-xs">
                <TranslatedText textKey={degree.locationKey} />
              </span>
            </div>
          <div className="flex items-center gap-4">
            {renderPeriod()}
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-3">
          <p className="text-muted-foreground text-justify mt-3">
            <TranslatedText textKey={degree.descKey} />
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default EducationDegree;

