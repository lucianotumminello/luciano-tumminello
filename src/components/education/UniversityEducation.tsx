
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TranslatedText from "@/components/TranslatedText";

const UniversityEducation = () => {
  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <CardTitle>
          <TranslatedText textKey="education.university.title" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-8">
        {/* Master in Commerce */}
        <div className="border-b pb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-primary">
              <TranslatedText textKey="education.masters.commerce.title" />
            </h3>
            <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full h-6 flex items-center justify-center text-center mt-1 md:mt-0">
              <TranslatedText textKey="education.masters.commerce.period" />
            </span>
          </div>
          <div className="mb-4">
            <p className="font-medium">
              <TranslatedText textKey="education.masters.commerce.institution" />
            </p>
            <p className="text-muted-foreground text-sm">
              <TranslatedText textKey="education.masters.commerce.location" />
            </p>
          </div>
          <p className="text-muted-foreground text-justify">
            <TranslatedText textKey="education.masters.commerce.description" />
          </p>
        </div>
        
        {/* Master in Advertising */}
        <div className="border-b pb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-primary">
              <TranslatedText textKey="education.masters.advertising.title" />
            </h3>
            <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full h-6 flex items-center justify-center text-center mt-1 md:mt-0">
              <TranslatedText textKey="education.masters.advertising.period" />
            </span>
          </div>
          <div className="mb-4">
            <p className="font-medium">
              <TranslatedText textKey="education.masters.advertising.institution" />
            </p>
            <p className="text-muted-foreground text-sm">
              <TranslatedText textKey="education.masters.advertising.location" />
            </p>
          </div>
          <p className="text-muted-foreground text-justify">
            <TranslatedText textKey="education.masters.advertising.description" />
          </p>
        </div>
        
        {/* Bachelor in International Relations */}
        <div className="border-b pb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-primary">
              <TranslatedText textKey="education.bachelors.relations.title" />
            </h3>
            <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full h-6 flex items-center justify-center text-center mt-1 md:mt-0">
              <TranslatedText textKey="education.bachelors.relations.period" />
            </span>
          </div>
          <div className="mb-4">
            <p className="font-medium">
              <TranslatedText textKey="education.bachelors.relations.institution" />
            </p>
            <p className="text-muted-foreground text-sm">
              <TranslatedText textKey="education.bachelors.relations.location" />
            </p>
          </div>
          <p className="text-muted-foreground text-justify">
            <TranslatedText textKey="education.bachelors.relations.description" />
          </p>
        </div>
        
        {/* Bachelor in International Communications */}
        <div>
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-primary">
              <TranslatedText textKey="education.bachelors.communications.title" />
            </h3>
            <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full h-6 flex items-center justify-center text-center mt-1 md:mt-0">
              <TranslatedText textKey="education.bachelors.communications.period" />
            </span>
          </div>
          <div className="mb-4">
            <p className="font-medium">
              <TranslatedText textKey="education.bachelors.communications.institution" />
            </p>
            <p className="text-muted-foreground text-sm">
              <TranslatedText textKey="education.bachelors.communications.location" />
            </p>
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
