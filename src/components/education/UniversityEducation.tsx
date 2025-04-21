
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TranslatedText from "@/components/TranslatedText";
import { useIsMobile } from "@/hooks/use-mobile";
import DegreeCollapsible from "./DegreeCollapsible";
import { useLanguage } from "@/contexts/LanguageContext";

const UniversityEducation = () => {
  const isMobile = useIsMobile();
  const { language } = useLanguage();

  // Helper function to get the English titles if language is English
  const getDegreeTitle = (translationKey: string, englishTitle: string) => {
    if (language === "en") {
      return englishTitle;
    }
    return <TranslatedText textKey={translationKey} />;
  };

  if (isMobile) {
    return (
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle>
            <TranslatedText textKey="education.university.title" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {/* Master of Commerce */}
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
          {/* Master of Advertising */}
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
          {/* Bachelor of International Relations */}
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
          {/* Bachelor of International Communications */}
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
  }

  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <CardTitle>
          <TranslatedText textKey="education.university.title" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-8">
        {/* Master of Commerce */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-bold text-primary mb-2">
            {getDegreeTitle("education.masters.commerce.title", "Master of Commerce")}
          </h3>
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
            <div className="order-2 md:order-1">
              <div className="mb-4">
                <p className="font-medium">
                  <TranslatedText textKey="education.masters.commerce.institution" />
                </p>
                <p className="text-muted-foreground text-sm">
                  <TranslatedText textKey="education.masters.commerce.location" />
                </p>
              </div>
            </div>
            <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full h-6 flex items-center justify-center text-center self-start order-1 md:order-2 mb-2 md:mb-0 w-fit">
              <TranslatedText textKey="education.masters.commerce.period" />
            </span>
          </div>
          <p className="text-muted-foreground text-justify">
            <TranslatedText textKey="education.masters.commerce.description" />
          </p>
        </div>
        
        {/* Master of Advertising */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-bold text-primary mb-2">
            {getDegreeTitle("education.masters.advertising.title", "Master of Advertising")}
          </h3>
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
            <div className="order-2 md:order-1">
              <div className="mb-4">
                <p className="font-medium">
                  <TranslatedText textKey="education.masters.advertising.institution" />
                </p>
                <p className="text-muted-foreground text-sm">
                  <TranslatedText textKey="education.masters.advertising.location" />
                </p>
              </div>
            </div>
            <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full h-6 flex items-center justify-center text-center self-start order-1 md:order-2 mb-2 md:mb-0 w-fit">
              <TranslatedText textKey="education.masters.advertising.period" />
            </span>
          </div>
          <p className="text-muted-foreground text-justify">
            <TranslatedText textKey="education.masters.advertising.description" />
          </p>
        </div>
        
        {/* Bachelor of International Relations */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-bold text-primary mb-2">
            {getDegreeTitle("education.bachelors.relations.title", "Bachelor of International Relations")}
          </h3>
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
            <div className="order-2 md:order-1">
              <div className="mb-4">
                <p className="font-medium">
                  <TranslatedText textKey="education.bachelors.relations.institution" />
                </p>
                <p className="text-muted-foreground text-sm">
                  <TranslatedText textKey="education.bachelors.relations.location" />
                </p>
              </div>
            </div>
            <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full h-6 flex items-center justify-center text-center self-start order-1 md:order-2 mb-2 md:mb-0 w-fit">
              <TranslatedText textKey="education.bachelors.relations.period" />
            </span>
          </div>
          <p className="text-muted-foreground text-justify">
            <TranslatedText textKey="education.bachelors.relations.description" />
          </p>
        </div>
        
        {/* Bachelor of International Communications */}
        <div>
          <h3 className="text-xl font-bold text-primary mb-2">
            {getDegreeTitle("education.bachelors.communications.title", "Bachelor of International Communications")}
          </h3>
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
            <div className="order-2 md:order-1">
              <div className="mb-4">
                <p className="font-medium">
                  <TranslatedText textKey="education.bachelors.communications.institution" />
                </p>
                <p className="text-muted-foreground text-sm">
                  <TranslatedText textKey="education.bachelors.communications.location" />
                </p>
              </div>
            </div>
            <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full h-6 flex items-center justify-center text-center self-start order-1 md:order-2 mb-2 md:mb-0 w-fit">
              <TranslatedText textKey="education.bachelors.communications.period" />
            </span>
          </div>
          <p className="text-muted-foreground text-justify">
            <TranslatedText textKey="education.bachelors.communications.description" />
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversityEducation;
